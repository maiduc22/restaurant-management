import { Card, Text, createStyles, rem } from '@mantine/core';
import CountUp from 'react-countup';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducer';

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

const FoodsStats = () => {
  const { foods } = useSelector((state: RootState) => state.food);

  const { classes } = useStyles();

  const total = foods.length;

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <div className={classes.inner}>
        <div>
          <Text fz="xl" className={classes.label}>
            Đồ ăn
          </Text>
          <div>
            <CountUp start={0} end={total} duration={2.75} separator=" " decimal=",">
              {({ countUpRef }) => (
                <Text className={classes.lead} mt={30}>
                  <span ref={countUpRef} />
                </Text>
              )}
            </CountUp>

            <Text fz="xs" color="dimmed">
              Món trong thực đơn
            </Text>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default FoodsStats;
