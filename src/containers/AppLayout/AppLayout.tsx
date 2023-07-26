import { Anchor, AppShell, Button, Group, Header, Image, LoadingOverlay, Navbar, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconLogout } from '@tabler/icons-react';
import { Suspense, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import ROUTER from '../../config/router';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import AuthRoutes from '../../pages/AuthRoutes/AuthRoutes';
import { customerActions } from '../../reducers/customer/customer.action';
import { foodActions } from '../../reducers/food/food.action';
import { orderActions } from '../../reducers/order/order.action';
import { profileAction } from '../../reducers/profile/profile.action';
import { staffActions } from '../../reducers/staff/staff.action';
import { tableActions } from '../../reducers/table/table.action';
import { decodeToken, isManager } from '../../utils/helpers';
import MainLinks from '../MainLinks';
import User from '../User';

export default function AppLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const decodedToken = decodeToken();

  useEffect(() => {
    dispatch(foodActions.getAllFoods());
    dispatch(tableActions.getAllTables());

    if (isManager()) {
      dispatch(staffActions.getAllStaffs());
      dispatch(customerActions.getAllCustomers());
    }

    dispatch(orderActions.getAllOrders());
    if (decodedToken.username) {
      dispatch(profileAction.getProfileByUsername(decodedToken.username));
    }
  }, []);

  const handleLogout = () => {
    modals.openConfirmModal({
      title: 'Xác Nhận Rời Khỏi',
      centered: true,
      children: <Text size="sm">Bạn có chắc muốn đăng xuất không?</Text>,
      labels: { confirm: 'Đồng ý', cancel: 'Huỷ bỏ' },
      confirmProps: { color: 'red' },
      onCancel: () => {},
      onConfirm: () => {
        localStorage.clear();
        navigate(ROUTER.AUTH.LOGIN);
        notifications.show({
          withCloseButton: true,
          title: 'Thông báo',
          message: 'Bạn đã đăng xuất thành công!',
          color: 'green',
          icon: <IconCheck size={16} />,
          autoClose: 1200,
        });
      },
    });
  };

  return (
    <>
      <AppShell
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <Navbar.Section grow mt="0">
              <MainLinks />
            </Navbar.Section>
            <Navbar.Section>
              <User />
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Header height={60}>
            <Group position="apart" sx={{ height: '100%' }} px={20}>
              <Group>
                <Anchor href={ROUTER.HOME.INDEX}>
                  <Image src={logo} height={48} />
                </Anchor>
              </Group>
              <Button onClick={handleLogout} variant="subtle" color="red" leftIcon={<IconLogout size={20} />}>
                Đăng xuất
              </Button>
            </Group>
          </Header>
        }
      >
        <Suspense fallback={<LoadingOverlay visible />}>
          <AuthRoutes>
            <Outlet />
          </AuthRoutes>
        </Suspense>
      </AppShell>
    </>
  );
}
