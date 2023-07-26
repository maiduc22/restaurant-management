import { API_URLS } from '../../config/constants/api';
import { AppDispatch } from '../../redux/store';
import { Callback } from '../../types/helpers/callback';
import { Food } from '../../types/models/food';
import { useCallApi } from '../../utils/api';
import { notiType, renderNotification } from '../../utils/helpers';
import { FoodActionType, FoodThunkAction } from './food.types';

const addFood =
  (payload: Partial<Food>, cb?: Callback): FoodThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: FoodActionType.ADD_FOOD_PENDING });

    const api = API_URLS.FOOD.addFood();
    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: FoodActionType.ADD_FOOD_SUCCESS,
      });
      renderNotification('Thông báo', 'Thêm thành công!', notiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: FoodActionType.ADD_FOOD_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const getAllFoods =
  (cb?: Callback): FoodThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: FoodActionType.GET_ALL_FOODS_PENDING });

    const api = API_URLS.FOOD.getAllFood();

    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      dispatch({
        type: FoodActionType.GET_ALL_FOODS_SUCCESS,
        payload: response.data,
      });
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: FoodActionType.GET_ALL_FOODS_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const deleteFood =
  (payload: number, cb?: Callback): FoodThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: FoodActionType.DELETE_FOOD_PENDING });

    const api = API_URLS.FOOD.deleteFood(payload);

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: FoodActionType.DELETE_FOOD_SUCCESS,
        payload: response.data,
      });
      renderNotification('Thông báo', 'Xoá thành công!', notiType.SUCCESS);
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: FoodActionType.DELETE_FOOD_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const editFood =
  (payload: Partial<Food>, cb?: Callback): FoodThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: FoodActionType.EDIT_FOOD_PENDING });

    const api = API_URLS.FOOD.editFood(payload.id ? payload.id : 0);

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: FoodActionType.EDIT_FOOD_SUCCESS,
        payload: response.data,
      });
      renderNotification('Thông báo', 'Sửa thành công!', notiType.SUCCESS);
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: FoodActionType.EDIT_FOOD_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const activeFood =
  (payload: number, cb?: Callback): FoodThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: FoodActionType.ACTIVE_FOOD_PENDING });

    const api = API_URLS.FOOD.activeFood(payload);

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: FoodActionType.ACTIVE_FOOD_SUCCESS,
        payload: response.data,
      });
      renderNotification('Thông báo', 'Thay đổi trạng thái thành công!', notiType.SUCCESS);
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: FoodActionType.ACTIVE_FOOD_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const inActiveFood =
  (payload: number, cb?: Callback): FoodThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: FoodActionType.INACTIVE_FOOD_PENDING });

    const api = API_URLS.FOOD.inActiveFood(payload);

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: FoodActionType.INACTIVE_FOOD_SUCCESS,
        payload: response.data,
      });
      renderNotification('Thông báo', 'Thay đổi trạng thái thành công!', notiType.SUCCESS);
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: FoodActionType.INACTIVE_FOOD_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

export const foodActions = { addFood, getAllFoods, deleteFood, editFood, activeFood, inActiveFood };
