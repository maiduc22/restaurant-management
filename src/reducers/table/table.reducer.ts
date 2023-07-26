import { Reducer } from 'redux';
import { TableAction, TableActionType, TableState } from './table.types';

const initialState: TableState = {
  isFetching: false,
  tables: [],
};

const tableReducer: Reducer<TableState, TableAction> = (state = initialState, action) => {
  switch (action.type) {
    case TableActionType.ADD_TABLE_PENDING:
    case TableActionType.GET_ALL_TABLES_PENDING:
    case TableActionType.EDIT_TABLE_PENDING:
    case TableActionType.GET_TABLE_BY_ID_PENDING:
    case TableActionType.BLOCK_TABLE_PENDING:
    case TableActionType.UNBLOCK_TABLE_PENDING:
      return { ...state, isFetching: true };

    case TableActionType.ADD_TABLE_FAILURE:
    case TableActionType.GET_ALL_TABLES_FAILURE:
    case TableActionType.EDIT_TABLE_FAILURE:
    case TableActionType.GET_TABLE_BY_ID_FAILURE:
    case TableActionType.BLOCK_TABLE_FAILURE:
    case TableActionType.UNBLOCK_TABLE_FAILURE:
      return { ...state, isFetching: false };

    case TableActionType.ADD_TABLE_SUCCESS:
      return { ...state, isFetching: false, tables: [action.payload, ...state.tables] };
    case TableActionType.GET_ALL_TABLES_SUCCESS:
      return { ...state, isFetching: false, tables: action.payload };
    case TableActionType.EDIT_TABLE_SUCCESS:
      return { ...state, isFetching: false };
    case TableActionType.GET_TABLE_BY_ID_SUCCESS:
      return { ...state, isFetching: false };
    case TableActionType.UNBLOCK_TABLE_SUCCESS:
      return { ...state, isFetching: false };
    case TableActionType.BLOCK_TABLE_SUCCESS:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

export default tableReducer;
