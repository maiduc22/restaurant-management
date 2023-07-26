import { ThunkAction } from 'redux-thunk';
import { Staff } from '../../types/models/staff';
import { RootState } from '../../redux/reducer';

export interface StaffState {
  isFetching: boolean;
  staffs: Staff[];
}

export enum StaffActionType {
  ADD_STAFF_PENDING = 'ADD_STAFF_PENDING',
  ADD_STAFF_SUCCESS = 'ADD_STAFF_SUCCESS',
  ADD_STAFF_FAILURE = 'ADD_STAFF_FAILURE',

  GET_ALL_STAFFS_PENDING = 'GET_ALL_STAFFS_PENDING',
  GET_ALL_STAFFS_SUCCESS = 'GET_ALL_STAFFS_SUCCESS',
  GET_ALL_STAFFS_FAILURE = 'GET_ALL_STAFFS_FAILURE',

  DELETE_STAFF_PENDING = 'DELETE_STAFF_PENDING',
  DELETE_STAFF_SUCCESS = 'DELETE_STAFF_SUCCESS',
  DELETE_STAFF_FAILURE = 'DELETE_STAFF_FAILURE',

  EDIT_STAFF_PENDING = 'EDIT_STAFF_PENDING',
  EDIT_STAFF_SUCCESS = 'EDIT_STAFF_SUCCESS',
  EDIT_STAFF_FAILURE = 'EDIT_STAFF_FAILURE',

  GET_STAFF_BY_ID_PENDING = 'GET_STAFF_BY_ID_PENDING',
  GET_STAFF_BY_ID_SUCCESS = ' GET_STAFF_BY_ID_SUCCESS',
  GET_STAFF_BY_ID_FAILURE = 'GET_STAFF_BY_ID_FAILURE',
}

//
export interface AddStaffPending {
  type: StaffActionType.ADD_STAFF_PENDING;
}
export interface AddStaffSuccess {
  type: StaffActionType.ADD_STAFF_SUCCESS;
}
export interface AddStaffFailure {
  type: StaffActionType.ADD_STAFF_FAILURE;
}

//
export interface GetAllStaffsPending {
  type: StaffActionType.GET_ALL_STAFFS_PENDING;
}
export interface GetAllStaffsSuccess {
  type: StaffActionType.GET_ALL_STAFFS_SUCCESS;
  payload: Staff[];
}
export interface GetAllStaffsFailure {
  type: StaffActionType.GET_ALL_STAFFS_FAILURE;
}

//
export interface EditStaffPending {
  type: StaffActionType.EDIT_STAFF_PENDING;
}
export interface EditStaffSuccess {
  type: StaffActionType.EDIT_STAFF_SUCCESS;
  payload: Staff;
}
export interface EditStaffFailure {
  type: StaffActionType.EDIT_STAFF_FAILURE;
}

//
export interface DeleteStaffPending {
  type: StaffActionType.DELETE_STAFF_PENDING;
}
export interface DeleteStaffSuccess {
  type: StaffActionType.DELETE_STAFF_SUCCESS;
}
export interface DeleteStaffFailure {
  type: StaffActionType.DELETE_STAFF_FAILURE;
}

//
export interface GetStaffByIdPending {
  type: StaffActionType.GET_STAFF_BY_ID_PENDING;
}
export interface GetStaffByIdSuccess {
  type: StaffActionType.GET_STAFF_BY_ID_SUCCESS;
  payload: Staff;
}
export interface GetStaffByIdFailure {
  type: StaffActionType.GET_STAFF_BY_ID_FAILURE;
}

export type StaffAction =
  | AddStaffFailure
  | AddStaffPending
  | AddStaffSuccess
  | GetAllStaffsFailure
  | GetAllStaffsPending
  | GetAllStaffsSuccess
  | EditStaffFailure
  | EditStaffPending
  | EditStaffSuccess
  | GetStaffByIdFailure
  | GetStaffByIdPending
  | GetStaffByIdSuccess
  | DeleteStaffFailure
  | DeleteStaffPending
  | DeleteStaffSuccess;

export type StaffThunkAction = ThunkAction<void, RootState, any, StaffAction>;
