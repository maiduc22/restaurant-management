import { API_URLS } from '../../config/constants/api';
import { AppDispatch } from '../../redux/store';
import { Callback } from '../../types/helpers/callback';
import { Customer } from '../../types/models/customer';
import { useCallApi } from '../../utils/api';
import { notiType, renderNotification } from '../../utils/helpers';
import { CustomerActionType, CustomerThunkAction } from './customer.types';

const addCustomer =
  (payload: Partial<Customer>, cb?: Callback): CustomerThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: CustomerActionType.ADD_CUSTOMER_PENDING });

    const api = API_URLS.CUSTOMER.addCustomer();

    const { response, error } = await useCallApi({ ...api, payload });
    console.log(response);
    if (!error && response?.status === 200) {
      dispatch({
        type: CustomerActionType.ADD_CUSTOMER_SUCCESS,
      });
      renderNotification('Thông báo', 'Thêm thành công!', notiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: CustomerActionType.ADD_CUSTOMER_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const getAllCustomers =
  (cb?: Callback): CustomerThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: CustomerActionType.GET_ALL_CUSTOMERS_PENDING });

    const api = API_URLS.CUSTOMER.getAllCustomers();
    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      dispatch({
        type: CustomerActionType.GET_ALL_CUSTOMERS_SUCCESS,
        payload: response.data,
      });
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: CustomerActionType.GET_ALL_CUSTOMERS_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

export const customerActions = { addCustomer, getAllCustomers };
