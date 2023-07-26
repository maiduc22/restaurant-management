import { Reducer } from 'redux';
import { OrderAction, OrderState, OrderActionType } from './order.types';

const initialState: OrderState = {
  isFetching: false,
  orders: [],
};

const orderReducer: Reducer<OrderState, OrderAction> = (state = initialState, action) => {
  switch (action.type) {
    case OrderActionType.ADD_ORDER_PENDING:
    case OrderActionType.GET_STATISTICS_PENDING:
    case OrderActionType.GET_VOUCHER_PENDING:
    case OrderActionType.DETAIL_FOOD_PENDING:
    case OrderActionType.DELETE_ORDER_PENDING:
    case OrderActionType.GET_ALL_ORDERS_PENDING:
    case OrderActionType.CANCEL_ORDER_PENDING:
    case OrderActionType.ORDER_FOOD_PENDING:
    case OrderActionType.MAKE_PAYMENT_PENDING:
      return { ...state, isFetching: true };

    case OrderActionType.ADD_ORDER_FAILURE:
    case OrderActionType.GET_VOUCHER_FAILURE:
    case OrderActionType.GET_STATISTICS_FAILURE:
    case OrderActionType.DELETE_ORDER_FAILURE:
    case OrderActionType.GET_ALL_ORDERS_FAILURE:
    case OrderActionType.CANCEL_ORDER_FAILURE:
    case OrderActionType.ORDER_FOOD_FAILURE:
    case OrderActionType.MAKE_PAYMENT_FAILURE:
    case OrderActionType.DETAIL_FOOD_FAILURE:
      return { ...state, isFetching: false };

    case OrderActionType.GET_STATISTICS_SUCCESS:
      return { ...state, isFetching: false };
    case OrderActionType.GET_VOUCHER_SUCCESS:
      return { ...state, isFetching: false };
    case OrderActionType.ADD_ORDER_SUCCESS:
      return { ...state, isFetching: false };
    case OrderActionType.DETAIL_FOOD_SUCCESS:
      return { ...state, isFetching: false };
    case OrderActionType.DELETE_ORDER_SUCCESS:
      return { ...state, isFetching: false };
    case OrderActionType.GET_ALL_ORDERS_SUCCESS:
      return { ...state, isFetching: false, orders: action.payload };
    case OrderActionType.CANCEL_ORDER_SUCCESS:
      return { ...state, isFetching: false };
    case OrderActionType.ORDER_FOOD_SUCCESS:
      return { ...state, isFetching: false };
    case OrderActionType.MAKE_PAYMENT_SUCCESS:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

export default orderReducer;
