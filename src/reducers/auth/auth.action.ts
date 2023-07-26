import { NavigateFunction } from 'react-router-dom';
import { API_URLS } from '../../config/constants/api';
import ROUTER from '../../config/router';
import { AppDispatch } from '../../redux/store';
import { Callback } from '../../types/helpers/callback';
import { Staff } from '../../types/models/staff';
import { errorHandler, useCallApi } from '../../utils/api';
import { notiType, renderNotification } from '../../utils/helpers';
import { AuthActionType, AuthThunkAction, LoginValues } from './auth.types';

const setUser = (data: any) => {
  localStorage.setItem('token', data.token);
};

const Login =
  (payload: LoginValues, navigate: NavigateFunction): AuthThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: AuthActionType.LOGIN_PENDING,
    });

    const api = API_URLS.AUTH.LOGIN();

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      const data = response.data;
      dispatch({
        type: AuthActionType.LOGIN_SUCCESS,
        payload: data,
      });
      setUser(data);
      navigate(ROUTER.HOME.INDEX);
      renderNotification('Thông báo', 'Đăng nhập thành công', notiType.SUCCESS);
      dispatch({
        type: AuthActionType.LOGIN_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: AuthActionType.LOGIN_FAILURE,
      });
      errorHandler(error);
    }
  };

const signUp =
  (payload: Partial<Staff>, cb?: Callback): AuthThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: AuthActionType.SIGNUP_PENDING });

    const api = API_URLS.AUTH.signup();
    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      const data = response.data;
      dispatch({
        type: AuthActionType.SIGNUP_SUCCESS,
        payload: data,
      });
      cb?.onSuccess?.(data);
      renderNotification('Thông báo', 'Đăng ký thành công', notiType.SUCCESS);
    } else {
      dispatch({
        type: AuthActionType.SIGNUP_FAILURE,
      });
      errorHandler(error);
    }
  };

export const authActions = {
  Login,
  signUp,
};
