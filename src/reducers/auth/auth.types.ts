import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../redux/reducer';

type User = any;

export interface LoginValues {
  username: string;
  password: string;
}

export interface AuthState {
  isFetching: boolean;
  // TODO
  user: User | null;
}

export enum AuthActionType {
  LOGIN_PENDING = 'LOGIN_PENDING',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',

  SIGNUP_PENDING = 'SIGNUP_PENDING',
  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
  SIGNUP_FAILURE = 'SIGNUP_FAILURE',
}

export interface LoginActionPending {
  type: AuthActionType.LOGIN_PENDING;
}
export interface LoginActionSuccess {
  type: AuthActionType.LOGIN_SUCCESS;
  payload: any;
}
export interface LoginActionFailure {
  type: AuthActionType.LOGIN_FAILURE;
}

export interface SignupPending {
  type: AuthActionType.SIGNUP_PENDING;
}
export interface SignupSuccess {
  type: AuthActionType.SIGNUP_SUCCESS;
  payload: any;
}
export interface SignupFailure {
  type: AuthActionType.SIGNUP_FAILURE;
}

export type AuthAction =
  | LoginActionPending
  | LoginActionSuccess
  | LoginActionFailure
  | SignupPending
  | SignupSuccess
  | SignupFailure;

export type AuthThunkAction = ThunkAction<void, RootState, any, AuthAction>;
