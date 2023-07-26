import { Button, Grid, Group, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/reducer';
import AddFoodModal from './AddFoodModal';
import FoodCard from './FoodCard';

const Menu = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const { foods, isFetching } = useSelector((state: RootState) => state.food);

  return (
    <>
      <Stack>
        <Group position="apart">
          <Text fw={700} fz="xl">
            Thực đơn nhà hàng
          </Text>
          <Button leftIcon={<IconPlus />} onClick={open}>
            Thêm món ăn
          </Button>
        </Group>
        <Grid>
          {foods.map((item, index) => (
            <Grid.Col key={`food-card-${index}`} span={4}>
              <FoodCard item={item} />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>

      {/*  */}
      <Modal centered opened={opened} onClose={close} title="Thêm Món Ăn">
        <AddFoodModal close={close} />
      </Modal>
    </>
  );
};

export default Menu;
