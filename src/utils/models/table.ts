import { TableStatus } from '../../types/models/table';

export const TableDict = {
  [TableStatus.FREE]: {
    badgeColor: 'green',
    localeStatus: 'Trống',
  },
  [TableStatus.BOOKED]: {
    badgeColor: 'orange',
    localeStatus: 'Đã đặt',
  },
  [TableStatus.BLOCKED]: {
    badgeColor: 'red',
    localeStatus: 'Bị khoá',
  },
};
