import { BaseModel } from '.';

export interface OrderFood extends BaseModel {
  orderId: number;
  foodId: number;
  quantity: number;
}
