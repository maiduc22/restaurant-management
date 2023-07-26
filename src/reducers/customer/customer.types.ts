import { ThunkAction } from 'redux-thunk';
import { Customer } from '../../types/models/customer';
import { RootState } from '../../redux/reducer';

export interface CustomerState {
  isFetching: boolean;
  customers: Customer[];
}

export enum CustomerActionType {
  ADD_CUSTOMER_PENDING = 'ADD_CUSTOMER_PENDING',
  ADD_CUSTOMER_SUCCESS = 'ADD_CUSTOMER_SUCCESS',
  ADD_CUSTOMER_FAILURE = 'ADD_CUSTOMER_FAILURE',

  GET_ALL_CUSTOMERS_PENDING = 'GET_ALL_CUSTOMERS_PENDING',
  GET_ALL_CUSTOMERS_SUCCESS = 'GET_ALL_CUSTOMERS_SUCCESS',
  GET_ALL_CUSTOMERS_FAILURE = 'GET_ALL_CUSTOMERS_FAILURE',

  DELETE_CUSTOMER_PENDING = 'DELETE_CUSTOMER_PENDING',
  DELETE_CUSTOMER_SUCCESS = 'DELETE_CUSTOMER_SUCCESS',
  DELETE_CUSTOMER_FAILURE = 'DELETE_CUSTOMER_FAILURE',

  EDIT_CUSTOMER_PENDING = 'EDIT_CUSTOMER_PENDING',
  EDIT_CUSTOMER_SUCCESS = 'EDIT_CUSTOMER_SUCCESS',
  EDIT_CUSTOMER_FAILURE = 'EDIT_CUSTOMER_FAILURE',
}

//
export interface AddCustomerPending {
  type: CustomerActionType.ADD_CUSTOMER_PENDING;
}
export interface AddCustomerSuccess {
  type: CustomerActionType.ADD_CUSTOMER_SUCCESS;
}
export interface AddCustomerFailure {
  type: CustomerActionType.ADD_CUSTOMER_FAILURE;
}

//
export interface GetAllCustomersPending {
  type: CustomerActionType.GET_ALL_CUSTOMERS_PENDING;
}
export interface GetAllCustomersSuccess {
  type: CustomerActionType.GET_ALL_CUSTOMERS_SUCCESS;
  payload: Customer[];
}
export interface GetAllCustomersFailure {
  type: CustomerActionType.GET_ALL_CUSTOMERS_FAILURE;
}

//
export interface EditCustomerPending {
  type: CustomerActionType.EDIT_CUSTOMER_PENDING;
}
export interface EditCustomerSuccess {
  type: CustomerActionType.EDIT_CUSTOMER_SUCCESS;
  payload: Customer;
}
export interface EditCustomerFailure {
  type: CustomerActionType.EDIT_CUSTOMER_FAILURE;
}

//
export interface DeleteCustomerPending {
  type: CustomerActionType.DELETE_CUSTOMER_PENDING;
}
export interface DeleteCustomerSuccess {
  type: CustomerActionType.DELETE_CUSTOMER_SUCCESS;
}
export interface DeleteCustomerFailure {
  type: CustomerActionType.DELETE_CUSTOMER_FAILURE;
}

export type CustomerAction =
  | AddCustomerFailure
  | AddCustomerPending
  | AddCustomerSuccess
  | GetAllCustomersFailure
  | GetAllCustomersPending
  | GetAllCustomersSuccess
  | EditCustomerFailure
  | EditCustomerPending
  | EditCustomerSuccess
  | DeleteCustomerFailure
  | DeleteCustomerPending
  | DeleteCustomerSuccess;

export type CustomerThunkAction = ThunkAction<void, RootState, any, CustomerAction>;
