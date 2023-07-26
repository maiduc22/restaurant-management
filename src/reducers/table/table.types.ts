import { ThunkAction } from 'redux-thunk';
import { Table } from '../../types/models/table';
import { RootState } from '../../redux/reducer';

export interface TableState {
  isFetching: boolean;
  tables: Table[];
}

export enum TableActionType {
  ADD_TABLE_PENDING = 'ADD_TABLE_PENDING',
  ADD_TABLE_SUCCESS = 'ADD_TABLE_SUCCESS',
  ADD_TABLE_FAILURE = 'ADD_TABLE_FAILURE',

  GET_ALL_TABLES_PENDING = 'GET_ALL_TABLES_PENDING',
  GET_ALL_TABLES_SUCCESS = 'GET_ALL_TABLES_SUCCESS',
  GET_ALL_TABLES_FAILURE = 'GET_ALL_TABLES_FAILURE',

  EDIT_TABLE_PENDING = 'EDIT_TABLE_PENDING',
  EDIT_TABLE_SUCCESS = 'EDIT_TABLE_SUCCESS',
  EDIT_TABLE_FAILURE = 'EDIT_TABLE_FAILURE',

  GET_TABLE_BY_ID_PENDING = 'GET_TABLE_BY_ID_PENDING',
  GET_TABLE_BY_ID_SUCCESS = ' GET_TABLE_BY_ID_SUCCESS',
  GET_TABLE_BY_ID_FAILURE = 'GET_TABLE_BY_ID_FAILURE',

  BLOCK_TABLE_PENDING = 'BLOCK_TABLE_PENDING',
  BLOCK_TABLE_SUCCESS = 'BLOCK_TABLE_SUCCESS',
  BLOCK_TABLE_FAILURE = 'BLOCK_TABLE_FAILURE',

  UNBLOCK_TABLE_PENDING = 'UNBLOCK_TABLE_PENDING',
  UNBLOCK_TABLE_SUCCESS = 'UNBLOCK_TABLE_SUCCESS',
  UNBLOCK_TABLE_FAILURE = 'UNBLOCK_TABLE_FAILURE',
}

//
export interface AddTablePending {
  type: TableActionType.ADD_TABLE_PENDING;
}
export interface AddTableSuccess {
  type: TableActionType.ADD_TABLE_SUCCESS;
  payload: Table;
}
export interface AddTableFailure {
  type: TableActionType.ADD_TABLE_FAILURE;
}

//
export interface GetAllTablesPending {
  type: TableActionType.GET_ALL_TABLES_PENDING;
}
export interface GetAllTablesSuccess {
  type: TableActionType.GET_ALL_TABLES_SUCCESS;
  payload: Table[];
}
export interface GetAllTablesFailure {
  type: TableActionType.GET_ALL_TABLES_FAILURE;
}

//
export interface EditTablePending {
  type: TableActionType.EDIT_TABLE_PENDING;
}
export interface EditTableSuccess {
  type: TableActionType.EDIT_TABLE_SUCCESS;
  payload: Table;
}
export interface EditTableFailure {
  type: TableActionType.EDIT_TABLE_FAILURE;
}

//
export interface GetTableByIdPending {
  type: TableActionType.GET_TABLE_BY_ID_PENDING;
}
export interface GetTableByIdSuccess {
  type: TableActionType.GET_TABLE_BY_ID_SUCCESS;
  payload: Table;
}
export interface GetTableByIdFailure {
  type: TableActionType.GET_TABLE_BY_ID_FAILURE;
}

//
export interface BlockTablePending {
  type: TableActionType.BLOCK_TABLE_PENDING;
}
export interface BlockTableSuccess {
  type: TableActionType.BLOCK_TABLE_SUCCESS;
  payload: Table;
}
export interface BlockTableFailure {
  type: TableActionType.BLOCK_TABLE_FAILURE;
}

//
export interface UnblockTablePending {
  type: TableActionType.UNBLOCK_TABLE_PENDING;
}
export interface UnblockTableSuccess {
  type: TableActionType.UNBLOCK_TABLE_SUCCESS;
  payload: Table;
}
export interface UnblockTableFailure {
  type: TableActionType.UNBLOCK_TABLE_FAILURE;
}

export type TableAction =
  | AddTablePending
  | AddTableSuccess
  | AddTableFailure
  | GetAllTablesPending
  | GetAllTablesFailure
  | GetAllTablesSuccess
  | EditTableFailure
  | EditTablePending
  | EditTableSuccess
  | GetTableByIdFailure
  | GetTableByIdPending
  | GetTableByIdSuccess
  | UnblockTableFailure
  | UnblockTablePending
  | UnblockTableSuccess
  | BlockTableFailure
  | BlockTablePending
  | BlockTableSuccess;

export type TableThunkAction = ThunkAction<void, RootState, any, TableAction>;
