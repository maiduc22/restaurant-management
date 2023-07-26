import { BaseModel } from '.';

export interface Food extends BaseModel {
  name: string;
  description: string;
  price: number;
  image: string;
  type: FoodType;
  isBuffet: boolean;
  status: FoodStatus;
}

export enum FoodStatus {
  active = 'ACTIVE',
  inactive = 'INACTIVE',
}

export enum FoodType {
  hotpot = 'HOTPOT',
  grill = 'GRILL',
  drink = 'DRINK',
  dessert = 'DESSERT',
}

export const foodTypeDict: Record<FoodType, { label: string; color: string }> = {
  [FoodType.hotpot]: {
    label: 'Nước lẩu',
    color: 'orange',
  },
  [FoodType.grill]: {
    label: 'Đồ ăn',
    color: 'red',
  },
  [FoodType.drink]: {
    label: 'Đồ uống',
    color: 'blue',
  },
  [FoodType.dessert]: {
    label: 'Khác',
    color: 'yellow',
  },
};

export const foodTypeOptions = Object.entries(foodTypeDict).map(([type, { label }]) => ({
  value: type,
  label: label,
}));
