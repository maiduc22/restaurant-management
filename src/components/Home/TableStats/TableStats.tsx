import { createStyles, Text, Card, RingProgress, Group, rem } from '@mantine/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducer';
import { OrderStatus } from '../../../types/models/order';
import CountUp from 'react-countup';
import { TableStatus } from '../../../types/models/table';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    lineHeight: 1,
  },

  lead: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: rem(22),
    lineHeight: 1,
  },

  inner: {
    display: 'flex',

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  ring: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',

    [theme.fn.smallerThan('xs')]: {
      justifyContent: 'center',
      marginTop: theme.spacing.md,
    },
  },
}));

const TableStats = () => {
  const { tables } = useSelector((state: RootState) => state.table);

  const { classes, theme } = useStyles();

  const stats = [
    { value: tables.filter((table) => table.status === TableStatus.BLOCKED).length, label: 'Bàn lỗi' },
    { value: tables.filter((table) => table.status === TableStatus.BOOKED).length, label: 'Đang dùng' },
  ];

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text className={classes.label}>{stat.value}</Text>
      <Text size="xs" color="dimmed">
        {stat.label}
      </Text>
    </div>
  ));

  const total = tables.length;
  const free = tables.filter((table) => table.status === TableStatus.FREE).length;

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <div className={classes.inner}>
        <div>
          <Text fz="xl" className={classes.label}>
            Bàn
          </Text>
          <div>
            <CountUp start={0} end={free} duration={2.75} separator=" " decimal=",">
              {({ countUpRef }) => (
                <Text className={classes.lead} mt={30}>
                  <span ref={countUpRef} />
                </Text>
              )}
            </CountUp>

            <Text fz="xs" color="dimmed">
              Còn trống
            </Text>
          </div>
          <Group mt="lg">{items}</Group>
        </div>

        <div className={classes.ring}>
          <RingProgress
            roundCaps
            thickness={6}
            size={150}
            sections={[{ value: (free / total) * 100, color: theme.primaryColor }]}
            label={
              <div>
                <Text ta="center" fz="lg" className={classes.label}>
                  {((free / total) * 100).toFixed(0)}%
                </Text>
                <Text ta="center" fz="xs" c="dimmed">
                  {free}/{total} bàn trống
                </Text>
              </div>
            }
          />
        </div>
      </div>
    </Card>
  );
};
export default TableStats;
