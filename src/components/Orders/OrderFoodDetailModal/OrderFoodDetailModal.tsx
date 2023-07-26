import { Card, Grid, Group, Stack, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { orderActions } from '../../../reducers/order/order.action';
import { tableActions } from '../../../reducers/table/table.action';
import { formatCurrency } from '../../../utils/helpers';

interface Props {
  selectedOrderId: number;
}

const OrderFoodDetailModal: React.FC<Props> = ({ selectedOrderId }) => {
  const [data, setData] = useState<any[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      orderActions.detailFood(selectedOrderId, {
        onSuccess: (data) => {
          setData(data);
          dispatch(tableActions.getAllTables());
        },
      })
    );
  }, []);

  return (
    <Stack>
      <Grid px="md" align="center">
        <Grid.Col span={7}>
          <Group spacing="xl">
            <Text fw={500} lineClamp={1}>
              Tên món
            </Text>
          </Group>
        </Grid.Col>
        <Grid.Col span={2}>
          <Text fw={500} lineClamp={1}>
            Đơn giá
          </Text>
        </Grid.Col>
        <Grid.Col span={1}>
          <Text fw={500}>SL</Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <Text fw={500} align="right" lineClamp={1}>
            Tổng
          </Text>
        </Grid.Col>
      </Grid>
      {data.map((item, index) => {
        return (
          <Card key={`${index}-food-detail`} shadow="xs">
            <Grid align="center">
              <Grid.Col span={7}>
                <Group spacing="xl">
                  <Text lineClamp={1}>{item.name}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={2}>
                <Text lineClamp={1}>{formatCurrency(item.price / item.quantity)}</Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <Text>x {item.quantity}</Text>
              </Grid.Col>
              <Grid.Col span={2}>
                <Text align="right" lineClamp={1}>
                  {formatCurrency(item.price)}
                </Text>
              </Grid.Col>
            </Grid>
          </Card>
        );
      })}
    </Stack>
  );
};

export default OrderFoodDetailModal;
