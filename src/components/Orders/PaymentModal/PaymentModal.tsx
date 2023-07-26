import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { orderActions } from '../../../reducers/order/order.action';
import { Button, Card, Grid, Group, Stack, Text } from '@mantine/core';
import { formatCurrency } from '../../../utils/helpers';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducer';
import { Voucher } from '../../../types/models/voucher';
import { tableActions } from '../../../reducers/table/table.action';

interface Props {
  selectedOrderId: number;
  close: () => void;
}

const PaymentModal: React.FC<Props> = ({ selectedOrderId, close }) => {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [voucher, setVoucher] = useState<Voucher | undefined>(undefined);

  const { isFetching, orders } = useSelector((state: RootState) => state.order);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const foundOrders = orders.find((order) => order.id === selectedOrderId);
    if (foundOrders) {
      setVoucher(foundOrders.vouchers[foundOrders.vouchers.length - 1]);
    }

    dispatch(
      orderActions.detailFood(selectedOrderId, {
        onSuccess: (data: any[]) => {
          setData(data);
          setTotal(
            data.reduce((acc, item) => {
              return acc + item.price;
            }, 0)
          );
        },
      })
    );
  }, []);

  const handlePayment = () => {
    dispatch(
      orderActions.makePayment(
        { id: selectedOrderId, voucher: voucher ? voucher.value : undefined },
        {
          onSuccess: () => {
            dispatch(orderActions.getAllOrders());
            dispatch(tableActions.getAllTables());
            close();
          },
        }
      )
    );
  };

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
          <Text fw={500}>Đơn giá</Text>
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
          <Card key={`payment-card-${index}`} shadow="xs">
            <Grid align="center">
              <Grid.Col span={7}>
                <Group spacing="xl">
                  <Text lineClamp={1}>{item.name}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={2}>
                <Text align="left" lineClamp={1}>
                  {formatCurrency(item.price / item.quantity)}
                </Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <Text align="left" lineClamp={1}>
                  x {item.quantity}
                </Text>
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

      <Group px={16} position="right">
        <Text>Tổng:</Text>
        <Text fz="xl" fw="600" c={'red.8'}>
          {formatCurrency(total)}
        </Text>
      </Group>

      <Group mt="sm" position="right">
        <Button variant="light" onClick={close}>
          Huỷ bỏ
        </Button>
        <Button onClick={handlePayment}>Thanh toán</Button>
      </Group>
    </Stack>
  );
};

export default PaymentModal;
