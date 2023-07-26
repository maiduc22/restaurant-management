import { ActionIcon, Badge, Card, Group, Menu, Modal, Text, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconDots, IconEdit, IconLock, IconLockOff, IconTrash } from '@tabler/icons-react';
import React from 'react';
import { Table, TableStatus } from '../../../types/models/table';
import { TableDict } from '../../../utils/models/table';
import EditTableModal from '../EditTableModal';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { tableActions } from '../../../reducers/table/table.action';

interface Props {
  item: Table | null;
}

const TableCard: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();
  const [editOpened, { close: closeEditModal, open: openEditModal }] = useDisclosure();

  const isBlocked = item && item.status === TableStatus.BLOCKED;

  const openDeleteTableModal = () =>
    modals.openConfirmModal({
      title: 'Thay Đổi Trạng Thái Bàn',
      centered: true,
      children: (
        <Text size="sm">
          Bạn có chắc muốn thay đổi trạng thái khoá/mở khoá của bàn{' '}
          <Text color="blue.9" span inherit>
            {item?.name}
          </Text>{' '}
          không?
        </Text>
      ),
      labels: { confirm: 'Đồng ý', cancel: 'Huỷ bỏ' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        if (!item) return;
        const refreshTables = () => dispatch(tableActions.getAllTables());
        if (isBlocked) {
          dispatch(tableActions.unblockTable(item.id, { onSuccess: refreshTables }));
          return;
        }
        dispatch(tableActions.blockTable(item.id, { onSuccess: refreshTables }));
      },
    });

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section withBorder inheritPadding py="xs">
          <Group position="apart">
            <Text weight={500}>Bàn {item?.name}</Text>
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
                {item && item.status !== TableStatus.BOOKED && (
                  <Menu.Item
                    onClick={openDeleteTableModal}
                    icon={isBlocked ? <IconLock size={rem(14)} /> : <IconLockOff size={rem(14)} />}
                    color={isBlocked ? 'green' : 'red'}
                  >
                    {isBlocked ? 'Mở khoá bàn' : 'Khoá bàn'}
                  </Menu.Item>
                )}
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text>{item?.capacity} chỗ ngồi</Text>
          <Badge color={item ? (TableDict[item.status].badgeColor as any) : undefined} size="lg" variant="light">
            {item ? TableDict[item.status].localeStatus : null}
          </Badge>
        </Group>
      </Card>
      <Modal centered opened={editOpened} onClose={closeEditModal} title="Sửa Thông Tin Bàn">
        {item ? <EditTableModal close={closeEditModal} item={item} /> : null}
      </Modal>
    </>
  );
};

export default TableCard;
