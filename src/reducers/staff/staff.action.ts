import { API_URLS } from '../../config/constants/api';
import { AppDispatch } from '../../redux/store';
import { Callback } from '../../types/helpers/callback';
import { Staff } from '../../types/models/staff';
import { useCallApi } from '../../utils/api';
import { notiType, renderNotification } from '../../utils/helpers';
import { StaffActionType, StaffThunkAction } from './staff.types';

// const addStaff =
//   (payload: Partial<Staff>, cb?: Callback): StaffThunkAction =>
//   async (dispatch: AppDispatch) => {
//     dispatch({ type: StaffActionType.ADD_STAFF_PENDING });

//     const api = API_URLS.STAFF.addStaff();

//     const { response, error } = await useCallApi({ ...api, payload });
//     console.log(response);
//     if (!error && response?.status === 200) {
//       dispatch({
//         type: StaffActionType.ADD_STAFF_SUCCESS,
//       });
//       renderNotification('Thông báo', 'Thêm thành công!', notiType.SUCCESS);
//       cb?.onSuccess?.();
//     } else {
//       dispatch({ type: StaffActionType.ADD_STAFF_FAILURE });
//       renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
//     }
//   };

const getAllStaffs =
  (cb?: Callback): StaffThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: StaffActionType.GET_ALL_STAFFS_PENDING });

    const api = API_URLS.STAFF.getAllStaffs();

    const { response, error } = await useCallApi({ ...api });

    console.log(response);
    if (!error && response?.status === 200) {
      dispatch({
        type: StaffActionType.GET_ALL_STAFFS_SUCCESS,
        payload: response.data,
      });
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: StaffActionType.GET_ALL_STAFFS_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const deleteStaff =
  (payload: number, cb?: Callback): StaffThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: StaffActionType.DELETE_STAFF_PENDING });

    const api = API_URLS.STAFF.deleteStaff(payload);

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: StaffActionType.DELETE_STAFF_SUCCESS,
        payload: response.data,
      });
      renderNotification('Thông báo', 'Xoá thành công!', notiType.SUCCESS);
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: StaffActionType.DELETE_STAFF_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const editStaff =
  (payload: Partial<Staff>, cb?: Callback): StaffThunkAction =>
  async (dispatch: AppDispatch) => {
    if (!payload.username) return;
    dispatch({ type: StaffActionType.EDIT_STAFF_PENDING });

    const api = API_URLS.STAFF.editStaff(payload.username);
    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: StaffActionType.EDIT_STAFF_SUCCESS,
        payload: response.data,
      });
      renderNotification('Thông báo', 'Sửa thành công!', notiType.SUCCESS);
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: StaffActionType.EDIT_STAFF_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

export const staffActions = { getAllStaffs, deleteStaff, editStaff };
