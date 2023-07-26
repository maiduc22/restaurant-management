import { BaseModel } from '.';

export interface OrderTable extends BaseModel {
  orderId: number;
  tableId: number;
  status: OrderTableStatus;
}

export enum OrderTableStatus {}
