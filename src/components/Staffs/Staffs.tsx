import { Button, Grid, Group, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { randomArray } from '../../utils/helpers';
import AddStaffModal from './AddStaffModal/AddStaffModal';
import StaffCard from './StaffCard';
import { RootState } from '../../redux/reducer';
import { useSelector } from 'react-redux';

const Staffs = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const { staffs, isFetching } = useSelector((state: RootState) => state.staff);

  return (
    <>
      <Stack>
        <Group position="apart">
          <Text fw={700} fz="xl">
            Quản lý nhân viên
          </Text>
          <Button leftIcon={<IconPlus />} onClick={open}>
            Thêm
          </Button>
        </Group>
        <Grid>
          {staffs.map((_, index) => (
            <Grid.Col key={`food-card-${index}`} span={6}>
              <StaffCard staff={_} />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
      <Modal centered opened={opened} onClose={close} title="Thêm Nhân Viên">
        <AddStaffModal close={close} />
      </Modal>
    </>
  );
};

export default Staffs;
