import { BaseModel } from '.';

export interface Customer extends BaseModel {
  name: string;
  phone: string;
  address: string;
}
