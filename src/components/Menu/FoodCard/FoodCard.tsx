import { ActionIcon, Badge, Button, Card, Group, Image, Menu, Modal, Text, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import {
  IconCheck,
  IconDots,
  IconEdit,
  IconLock,
  IconLockOff,
  IconMinus,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { foodActions } from '../../../reducers/food/food.action';
import { Food, FoodStatus, foodTypeDict } from '../../../types/models/food';
import EditFoodModal from '../EditFoodModal';

interface Props {
  item: Food | null;
}

const FoodCard: React.FC<Props> = ({ item }) => {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useAppDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [editOpened, { close: closeEditModal, open: openEditModal }] = useDisclosure();

  const isActive = item?.status === FoodStatus.active;

  const openDeleteFoodModal = () =>
    modals.openConfirmModal({
      title: 'Thay Đổi Trạng Thái Món Ăn',
      centered: true,
      children: (
        <Text size="sm">
          Bạn có chắc muốn thay dổi trạng thái trong thực đơn của món{' '}
          <Text color="blue.9" span inherit>
            {item?.name}
          </Text>{' '}
          không?
        </Text>
      ),
      labels: { confirm: 'Đồng ý', cancel: 'Huỷ bỏ' },
      confirmProps: { color: 'red' },
      onCancel: () => {},
      onConfirm: () => {
        if (!item) return;
        const refreshFoods = () => dispatch(foodActions.getAllFoods());
        if (isActive) {
          dispatch(foodActions.inActiveFood(item.id, { onSuccess: refreshFoods }));
          return;
        }
        dispatch(foodActions.activeFood(item.id, { onSuccess: refreshFoods }));
      },
    });

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section withBorder inheritPadding py="xs">
          <Group position="apart">
            <Text weight={500}>{item?.name}</Text>
            <Group>
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <ActionIcon>
                    <IconDots size="1rem" />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item onClick={openEditModal} icon={<IconEdit size={rem(14)} />}>
                    Sửa thông tin
                  </Menu.Item>
                  <Menu.Item
                    onClick={openDeleteFoodModal}
                    icon={isActive ? <IconLock size={rem(14)} /> : <IconLockOff size={rem(14)} />}
                    color={!isActive ? 'green' : 'red'}
                  >
                    {isActive ? 'Bỏ món ăn' : 'Đưa về lại thực đơn'}
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
        </Card.Section>
        <Card.Section>
          <Image withPlaceholder src={item?.image || ''} height={160} alt={`Food: ${name}`} />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text color={item ? foodTypeDict[item.type].color : undefined} weight={500}>
            {item ? foodTypeDict[item.type].label : null}
          </Text>
          {item && item.status === FoodStatus.inactive ? (
            <Text c={'red'}>Không Hoạt Động</Text>
          ) : (
            <Badge color="pink" size="lg" variant="light">
              {item?.price}
            </Badge>
          )}
        </Group>

        <Text size="sm" color="dimmed" lineClamp={2}>
          {item?.description}
        </Text>
      </Card>

      <Modal centered opened={opened} onClose={close} title="Nhập số lượng">
        <Group grow>
          <Group grow>
            <ActionIcon disabled={quantity <= 0} onClick={() => setQuantity((prev) => prev - 1)}>
              <IconMinus />
            </ActionIcon>
            <Text align="center">{quantity}</Text>
            <ActionIcon onClick={() => setQuantity((prev) => prev + 1)}>
              <IconPlus />
            </ActionIcon>
          </Group>
          <Button
            disabled={quantity <= 0}
            onClick={() => {
              notifications.show({
                withCloseButton: true,
                title: 'Thông báo',
                message: 'Thêm sản phẩm vào đơn hàng thành công!!',
                color: 'green',
                icon: <IconCheck size={16} />,
                autoClose: 1200,
              });
            }}
          >
            Xác nhận
          </Button>
        </Group>
      </Modal>

      {item ? (
        <Modal centered opened={editOpened} onClose={closeEditModal} title="Sửa Món Ăn">
          <EditFoodModal close={closeEditModal} item={item} />
        </Modal>
      ) : null}
    </>
  );
};

export default FoodCard;
