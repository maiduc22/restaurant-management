import { ActionIcon, Card, Grid, Group, Image, Text } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Food } from '../../../../types/models/food';

interface Props {
  item: Food;
  orderedFoods: { id: number; quantity: number }[];
  setOrderedFoods: Dispatch<SetStateAction<{ id: number; quantity: number }[]>>;
}

const FoodCard: React.FC<Props> = ({ item, setOrderedFoods, orderedFoods }) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const index = orderedFoods.findIndex((food) => food.id === item.id);

    if (quantity > 0) {
      if (index === -1) {
        setOrderedFoods([...orderedFoods, { id: item.id, quantity }]);
      } else {
        const updatedOrderedFoods = [...orderedFoods];
        updatedOrderedFoods[index].quantity = quantity;
        setOrderedFoods(updatedOrderedFoods);
      }
    } else if (index !== -1) {
      const updatedOrderedFoods = [...orderedFoods];
      updatedOrderedFoods.splice(index, 1);
      setOrderedFoods(updatedOrderedFoods);
    }
  }, [quantity, item.id, setOrderedFoods]);

  return (
    <Card shadow="xs">
      <Grid align="center">
        <Grid.Col span={7}>
          <Group spacing="xl">
            <Image width={56} height={56} src={item.image} />
            <Text lineClamp={1}>{item.name}</Text>
          </Group>
        </Grid.Col>
        <Grid.Col span={2}>
          <Text lineClamp={1}>{item.price * quantity} đ</Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <Group grow>
            <ActionIcon disabled={quantity <= 0} onClick={() => setQuantity((prev) => prev - 1)}>
              <IconMinus />
            </ActionIcon>
            <Text align="center">{quantity}</Text>
            <ActionIcon onClick={() => setQuantity((prev) => prev + 1)}>
              <IconPlus />
            </ActionIcon>
          </Group>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default FoodCard;
