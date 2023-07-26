import { BaseModel } from '.';

export interface Table extends BaseModel {
  name: string;
  capacity: number;
  status: TableStatus;
}

export enum TableStatus {
  FREE = 'FREE',
  BLOCKED = 'BLOCKED',
  BOOKED = 'BOOKED',
}
