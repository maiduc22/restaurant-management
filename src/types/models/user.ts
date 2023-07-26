import { BaseModel } from '.';

export interface User extends BaseModel {
  name: string;
}

export enum UserRole {}
