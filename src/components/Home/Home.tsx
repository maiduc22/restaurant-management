import { faker } from '@faker-js/faker';
import { Group, Stack } from '@mantine/core';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { orderActions } from '../../reducers/order/order.action';
import { Statistics } from '../../reducers/order/order.types';
import CustomerStats from './CustomerStats';
import FoodsStats from './FoodsStats';
import OrderStats from './OrderStats';
import TableStats from './TableStats';
import { isManager } from '../../utils/helpers';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export enum CountType {
  foods = 'foods',
  customers = 'customers',
  orders = 'orders',
}

export const countRenderDictionary = {
  [CountType.customers]: {
    color: 'green',
    text: 'Khách hàng',
  },
  [CountType.foods]: {
    color: 'red',
    text: 'Món ăn',
  },
  [CountType.orders]: {
    color: 'blue',
    text: 'Lượt đặt bàn',
  },
};

const Home = () => {
  const dispatch = useAppDispatch();

  const [statistics, setStatistics] = useState<Statistics[]>([]);

  useEffect(() => {
    if (!isManager()) return;
    dispatch(
      orderActions.getStatistics({
        onSuccess: (res: Statistics[]) => {
          setStatistics(res);
          console.log(res);
        },
      })
    );
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'SỐ LIỆU NHÀ HÀNG THEO NGÀY',
      },
    },
  };

  const data = {
    labels: statistics.map((statistic) => dayjs(statistic.date).format('DD/MM/YYYY')),
    datasets: [
      {
        label: 'Doanh thu (Đơn vị: triệu đồng)',
        data: statistics.map((statistics) => statistics.amount / 1000000),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Tổng số đơn hàng',
        data: statistics.map((statistics) => statistics.orders),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  if (!isManager()) return null;

  return (
    <Stack>
      <Group position="center">
        <CustomerStats />
        <OrderStats />
        <TableStats />
        <FoodsStats />
      </Group>
      <Line options={options} data={data} />
    </Stack>
  );
};

export default Home;
