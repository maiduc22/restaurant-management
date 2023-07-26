import { Button, Group, Stack } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducer';
import FoodCard from './FoodCard/FoodCard';
import { OrderFoodPayload, orderActions } from '../../../reducers/order/order.action';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { FoodStatus } from '../../../types/models/food';

interface Props {
  close: () => void;
  selectedOrderId: number;
}

const AddFoodToOrderModal: React.FC<Props> = ({ close, selectedOrderId }) => {
  const dispatch = useAppDispatch();
  const { foods, isFetching } = useSelector((state: RootState) => state.food);

  const [orderedFoods, setOrderedFoods] = useState<{ id: number; quantity: number }[]>([]);

  const handleCancel = () => {
    setOrderedFoods([]);
  };

  const handleAdd = () => {
    dispatch(
      orderActions.orderFood(
        { orderId: selectedOrderId, foodOrdered: orderedFoods },
        {
          onSuccess: () => setOrderedFoods([]),
        }
      )
    );
    close();
  };

  return (
    <>
      <Stack>
        {foods
          .filter((food) => food.status === FoodStatus.active)
          .map((item, index) => (
            <FoodCard
              setOrderedFoods={setOrderedFoods}
              orderedFoods={orderedFoods}
              key={`food-card-${index}`}
              item={item}
            />
          ))}
      </Stack>
      <Group mt="sm" position="right">
        <Button variant="light" onClick={handleCancel}>
          Huỷ bỏ
        </Button>
        <Button onClick={handleAdd}>Thêm món</Button>
      </Group>
    </>
  );
};

export default AddFoodToOrderModal;
