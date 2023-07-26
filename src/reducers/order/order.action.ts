import { API_URLS } from '../../config/constants/api';
import { AppDispatch } from '../../redux/store';
import { Callback } from '../../types/helpers/callback';
import { Customer } from '../../types/models/customer';
import { useCallApi } from '../../utils/api';
import { notiType, renderNotification } from '../../utils/helpers';
import { OrderActionType, OrderThunkAction } from './order.types';

interface AddOrderPayload {
  customer: Partial<Customer>;
  tableIDS: number[];
}

const addOrder =
  (payload: AddOrderPayload, cb?: Callback): OrderThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: OrderActionType.ADD_ORDER_PENDING });

    const api = API_URLS.ORDER.addOrder();
    const { error, response } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({ type: OrderActionType.ADD_ORDER_SUCCESS });
      renderNotification('Thông báo', 'Thêm thành công!', notiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: OrderActionType.ADD_ORDER_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const getAllOrders =
  (cb?: Callback): OrderThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: OrderActionType.GET_ALL_ORDERS_PENDING });

    const api = API_URLS.ORDER.getAllOrders();
    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      dispatch({
        type: OrderActionType.GET_ALL_ORDERS_SUCCESS,
        payload: response.data,
      });
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: OrderActionType.GET_ALL_ORDERS_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const cancelOrder =
  (id: number, cb?: Callback): OrderThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: OrderActionType.CANCEL_ORDER_PENDING });

    const api = API_URLS.ORDER.cancelOrder(id);
    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      dispatch({
        type: OrderActionType.CANCEL_ORDER_SUCCESS,
        payload: response.data,
      });
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: OrderActionType.CANCEL_ORDER_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

export interface OrderFoodPayload {
  orderId: number;
  foodOrdered: { id: number; quantity: number }[];
}

const orderFood =
  (payload: OrderFoodPayload, cb?: Callback): OrderThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: OrderActionType.ORDER_FOOD_PENDING });

    const api = API_URLS.ORDER.orderFood(payload.orderId);
    const { response, error } = await useCallApi({ ...api, payload: payload.foodOrdered });

    if (!error && response?.status === 200) {
      dispatch({
        type: OrderActionType.ORDER_FOOD_SUCCESS,
        payload: response.data,
      });
      renderNotification('Thông báo', 'Thêm các món ăn vào đơn hàng thành công!', notiType.SUCCESS);
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: OrderActionType.ORDER_FOOD_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const detailFood =
  (payload: number, cb?: Callback): OrderThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: OrderActionType.ORDER_FOOD_PENDING });

    const api = API_URLS.ORDER.detailFood(payload);
    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      dispatch({
        type: OrderActionType.ORDER_FOOD_SUCCESS,
        payload: response.data,
      });
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: OrderActionType.ORDER_FOOD_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const makePayment =
  (payload: { id: number; voucher: number | undefined }, cb?: Callback): OrderThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: OrderActionType.MAKE_PAYMENT_PENDING });

    const api = API_URLS.ORDER.makePayment(payload);
    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      dispatch({
        type: OrderActionType.ORDER_FOOD_SUCCESS,
        payload: response.data,
      });
      cb?.onSuccess?.(response.data);
      renderNotification('Thông báo', 'Thanh toán thành công', notiType.SUCCESS);
    } else {
      dispatch({ type: OrderActionType.ORDER_FOOD_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const getVoucher =
  (payload: number, cb?: Callback): OrderThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: OrderActionType.GET_VOUCHER_PENDING });

    const api = API_URLS.ORDER.voucher(payload);
    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      dispatch({
        type: OrderActionType.GET_VOUCHER_SUCCESS,
        payload: response.data,
      });
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: OrderActionType.GET_VOUCHER_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const getStatistics =
  (cb?: Callback): OrderThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: OrderActionType.GET_STATISTICS_PENDING });

    const api = API_URLS.ORDER.getStatistics();
    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      dispatch({
        type: OrderActionType.GET_STATISTICS_SUCCESS,
        payload: response.data,
      });
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: OrderActionType.GET_STATISTICS_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

export const orderActions = {
  addOrder,
  getAllOrders,
  cancelOrder,
  orderFood,
  detailFood,
  makePayment,
  getVoucher,
  getStatistics,
};
