import { Button, Grid, Group, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import AddTableModal from './AddTableModal';
import TableCard from './TableCard/TableCard';

const Tables = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { tables, isFetching } = useSelector((state: RootState) => state.table);

  return (
    <>
      <Stack>
        <Group position="apart">
          <Text fw={700} fz="xl">
            Danh sách bàn
          </Text>
          <Button leftIcon={<IconPlus />} onClick={open}>
            Thêm
          </Button>
        </Group>
        <Grid>
          {tables.map((item, index) => (
            <Grid.Col key={`food-card-${index}`} span={4}>
              <TableCard item={item} />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
      <Modal centered opened={opened} onClose={close} title="Thêm Bàn">
        <AddTableModal close={close} />
      </Modal>
    </>
  );
};

export default Tables;
