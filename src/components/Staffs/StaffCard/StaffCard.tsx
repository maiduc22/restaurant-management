import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  Container,
  Grid,
  Group,
  Menu,
  Text,
  rem,
  Space,
  Stack,
  Modal,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react';
import React from 'react';
import { Staff } from '../../../types/models/staff';
import { formatCurrency, formatDateFromISOString, getColorByRole, parserRole } from '../../../utils/helpers';
import EditStaffModal from '../EditStaffModal/EditStaffModal';
import { useDisclosure } from '@mantine/hooks';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { staffActions } from '../../../reducers/staff/staff.action';

interface Props {
  staff: Staff | null;
}

const renderLabel = (string: string) => (
  <Text fz="md" fw={600}>
    {string}
  </Text>
);

const renderField = (children: string) => <Text fz="md">{children}</Text>;

const StaffCard: React.FC<Props> = ({ staff }) => {
  const dispatch = useAppDispatch();
  const [editOpened, { close: closeEditModal, open: openEditModal }] = useDisclosure();

  const handleClickDeleteStaff = () => {
    if (!staff) return;
    dispatch(
      staffActions.deleteStaff(staff?.id, {
        onSuccess: () => {
          dispatch(staffActions.getAllStaffs());
        },
      })
    );
  };

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section withBorder inheritPadding py="xs">
          <Group position="apart">
            <Text weight={500}>{staff?.fullname || '(Đang cập nhật...)'}</Text>
            <Menu withinPortal position="bottom-end" shadow="sm">
              <Menu.Target>
                <ActionIcon>
                  <IconDots size="1rem" />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item icon={<IconEdit size={rem(14)} />} onClick={openEditModal}>
                  Sửa thông tin
                </Menu.Item>
                <Menu.Item icon={<IconTrash size={rem(14)} />} color="red" onClick={handleClickDeleteStaff}>
                  Xoá nhân viên
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Card.Section>

        <Group mt="md" mb="xs">
          <Avatar src={staff?.image || ''} size={150} />

          <Grid m="xs" gutter={32} style={{ flex: '1' }}>
            <Grid.Col span={5}>
              <Stack spacing={'sm'}>
                {renderLabel('Tài khoản')}
                {renderLabel('Chức vụ')}
                {renderLabel('Vào làm')}
                {renderLabel('Lương')}
              </Stack>
            </Grid.Col>

            <Grid.Col span={7} px={0}>
              <Stack spacing={'sm'}>
                {renderField(staff?.username || '(Đang cập nhật...)')}
                {renderField(parserRole(staff?.role) || '(Đang cập nhật...)')}
                {renderField(formatDateFromISOString(staff?.hiredDate) || '(Đang cập nhật...)')}
                {renderField(formatCurrency(staff?.salary) || '(Đang cập nhật...)')}
              </Stack>
            </Grid.Col>
          </Grid>
        </Group>
      </Card>

      {staff ? (
        <Modal centered opened={editOpened} onClose={closeEditModal} title="Sửa Thông Tin Nhân Viên">
          <EditStaffModal close={closeEditModal} staff={staff} />
        </Modal>
      ) : (
        ''
      )}
    </>
  );
};

export default StaffCard;
