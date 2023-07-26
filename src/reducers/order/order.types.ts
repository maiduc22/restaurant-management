import { ThunkAction } from 'redux-thunk';
import { Order } from '../../types/models/order';
import { RootState } from '../../redux/reducer';

export interface OrderState {
  isFetching: boolean;
  orders: Order[];
}

export enum OrderActionType {
  ADD_ORDER_PENDING = 'ADD_ORDER_PENDING',
  ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS',
  ADD_ORDER_FAILURE = 'ADD_ORDER_FAILURE',

  GET_ALL_ORDERS_PENDING = 'GET_ALL_ORDERS_PENDING',
  GET_ALL_ORDERS_SUCCESS = 'GET_ALL_ORDERS_SUCCESS',
  GET_ALL_ORDERS_FAILURE = 'GET_ALL_ORDERS_FAILURE',

  DELETE_ORDER_PENDING = 'DELETE_ORDER_PENDING',
  DELETE_ORDER_SUCCESS = 'DELETE_ORDER_SUCCESS',
  DELETE_ORDER_FAILURE = 'DELETE_ORDER_FAILURE',

  CANCEL_ORDER_PENDING = 'CANCEL_ORDER_PENDING',
  CANCEL_ORDER_SUCCESS = 'CANCEL_ORDER_SUCCESS',
  CANCEL_ORDER_FAILURE = 'CANCEL_ORDER_FAILURE',

  ORDER_FOOD_PENDING = 'ORDER_FOOD_PENDING',
  ORDER_FOOD_SUCCESS = 'ORDER_FOOD_SUCCESS',
  ORDER_FOOD_FAILURE = 'ORDER_FOOD_FAILURE',

  MAKE_PAYMENT_PENDING = 'MAKE_PAYMENT_PENDING',
  MAKE_PAYMENT_SUCCESS = 'MAKE_PAYMENT_SUCCESS',
  MAKE_PAYMENT_FAILURE = 'MAKE_PAYMENT_FAILURE',

  DETAIL_FOOD_PENDING = 'DETAIL_FOOD_PENDING',
  DETAIL_FOOD_SUCCESS = 'DETAIL_FOOD_SUCCESS',
  DETAIL_FOOD_FAILURE = 'DETAIL_FOOD_FAILURE',

  GET_VOUCHER_PENDING = 'GET_VOUCHER_PENDING',
  GET_VOUCHER_SUCCESS = 'GET_VOUCHER_SUCCESS',
  GET_VOUCHER_FAILURE = 'GET_VOUCHER_FAILURE',

  GET_STATISTICS_PENDING = 'GET_STATISTICS_PENDING',
  GET_STATISTICS_SUCCESS = 'GET_STATISTICS_SUCCESS',
  GET_STATISTICS_FAILURE = 'GET_STATISTICS_FAILURE',
}

//
export interface AddOrderPending {
  type: OrderActionType.ADD_ORDER_PENDING;
}
export interface AddOrderSuccess {
  type: OrderActionType.ADD_ORDER_SUCCESS;
}
export interface AddOrderFailure {
  type: OrderActionType.ADD_ORDER_FAILURE;
}

//
export interface GetAllOrdersPending {
  type: OrderActionType.GET_ALL_ORDERS_PENDING;
}
export interface GetAllOrdersSuccess {
  type: OrderActionType.GET_ALL_ORDERS_SUCCESS;
  payload: Order[];
}
export interface GetAllOrdersFailure {
  type: OrderActionType.GET_ALL_ORDERS_FAILURE;
}

//
export interface DeleteOrderPending {
  type: OrderActionType.DELETE_ORDER_PENDING;
}
export interface DeleteOrderSuccess {
  type: OrderActionType.DELETE_ORDER_SUCCESS;
}
export interface DeleteOrderFailure {
  type: OrderActionType.DELETE_ORDER_FAILURE;
}

//
export interface CancelOrderPending {
  type: OrderActionType.CANCEL_ORDER_PENDING;
}
export interface CancelOrderSuccess {
  type: OrderActionType.CANCEL_ORDER_SUCCESS;
}
export interface CancelOrderFailure {
  type: OrderActionType.CANCEL_ORDER_FAILURE;
}

//
export interface OrderFoodPending {
  type: OrderActionType.ORDER_FOOD_PENDING;
}
export interface OrderFoodSuccess {
  type: OrderActionType.ORDER_FOOD_SUCCESS;
}
export interface OrderFoodFailure {
  type: OrderActionType.ORDER_FOOD_FAILURE;
}

//
export interface MakePaymentPending {
  type: OrderActionType.MAKE_PAYMENT_PENDING;
}
export interface MakePaymentSuccess {
  type: OrderActionType.MAKE_PAYMENT_SUCCESS;
}
export interface MakePaymentFailure {
  type: OrderActionType.MAKE_PAYMENT_FAILURE;
}

//
export interface DetailFoodPending {
  type: OrderActionType.DETAIL_FOOD_PENDING;
}
export interface DetailFoodSuccess {
  type: OrderActionType.DETAIL_FOOD_SUCCESS;
}
export interface DetailFoodFailure {
  type: OrderActionType.DETAIL_FOOD_FAILURE;
}

//
export interface GetVoucherPending {
  type: OrderActionType.GET_VOUCHER_PENDING;
}
export interface GetVoucherSuccess {
  type: OrderActionType.GET_VOUCHER_SUCCESS;
}
export interface GetVoucherFailure {
  type: OrderActionType.GET_VOUCHER_FAILURE;
}

//
export interface GetStatisticsPending {
  type: OrderActionType.GET_STATISTICS_PENDING;
}
export interface GetStatisticsSuccess {
  type: OrderActionType.GET_STATISTICS_SUCCESS;
  payload: Statistics[];
}
export interface GetStatisticsFailure {
  type: OrderActionType.GET_STATISTICS_FAILURE;
}

export type OrderAction =
  | AddOrderPending
  | AddOrderFailure
  | AddOrderSuccess
  | GetAllOrdersFailure
  | GetAllOrdersPending
  | GetAllOrdersSuccess
  | DeleteOrderFailure
  | DeleteOrderPending
  | DeleteOrderSuccess
  | CancelOrderPending
  | CancelOrderFailure
  | CancelOrderSuccess
  | OrderFoodFailure
  | OrderFoodPending
  | OrderFoodSuccess
  | MakePaymentFailure
  | MakePaymentPending
  | MakePaymentSuccess
  | GetVoucherFailure
  | GetVoucherPending
  | GetVoucherSuccess
  | GetStatisticsFailure
  | GetStatisticsPending
  | GetStatisticsSuccess
  | DetailFoodFailure
  | DetailFoodPending
  | DetailFoodSuccess;

export type OrderThunkAction = ThunkAction<void, RootState, any, OrderAction>;

export interface Statistics {
  date: string;
  amount: number;
  orders: number;
}
