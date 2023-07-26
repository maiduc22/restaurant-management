import { API_URLS } from '../../config/constants/api';
import { AppDispatch } from '../../redux/store';
import { Callback } from '../../types/helpers/callback';
import { Table } from '../../types/models/table';
import { useCallApi } from '../../utils/api';
import { notiType, renderNotification } from '../../utils/helpers';
import { TableActionType, TableThunkAction } from './table.types';

const addTable =
  (payload: Partial<Table>, cb?: Callback): TableThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: TableActionType.ADD_TABLE_PENDING });

    const api = API_URLS.TABLES.createTable();

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: TableActionType.ADD_TABLE_SUCCESS,
        payload: response.data,
      });
      renderNotification('Thông báo', 'Thêm thành công!', notiType.SUCCESS);
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: TableActionType.ADD_TABLE_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const getAllTables =
  (cb?: Callback): TableThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: TableActionType.GET_ALL_TABLES_PENDING });

    const api = API_URLS.TABLES.getAllTables();

    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      dispatch({
        type: TableActionType.GET_ALL_TABLES_SUCCESS,
        payload: response.data,
      });
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: TableActionType.GET_ALL_TABLES_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const editTable =
  (payload: Partial<Table>, cb?: Callback): TableThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: TableActionType.EDIT_TABLE_PENDING });

    const api = API_URLS.TABLES.editTable(payload.id ? payload.id : 0);

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: TableActionType.EDIT_TABLE_SUCCESS,
        payload: response.data,
      });
      renderNotification('Thông báo', 'Sửa thành công!', notiType.SUCCESS);
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: TableActionType.EDIT_TABLE_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const blockTable =
  (payload: number, cb?: Callback): TableThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: TableActionType.BLOCK_TABLE_PENDING });

    const api = API_URLS.TABLES.blockTable(payload);

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: TableActionType.BLOCK_TABLE_SUCCESS,
        payload: response.data,
      });
      renderNotification('Thông báo', 'Khoá bàn thành công!', notiType.SUCCESS);
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: TableActionType.BLOCK_TABLE_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const unblockTable =
  (payload: number, cb?: Callback): TableThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: TableActionType.UNBLOCK_TABLE_PENDING });

    const api = API_URLS.TABLES.unblockTable(payload);

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: TableActionType.UNBLOCK_TABLE_SUCCESS,
        payload: response.data,
      });
      renderNotification('Thông báo', 'Mở khoá bàn thành công!', notiType.SUCCESS);
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: TableActionType.UNBLOCK_TABLE_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

export const tableActions = { addTable, getAllTables, editTable, blockTable, unblockTable };
