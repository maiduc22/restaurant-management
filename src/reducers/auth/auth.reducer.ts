import { Reducer } from 'redux';
import { AuthAction, AuthActionType, AuthState } from './auth.types';

const initialState: AuthState = {
  isFetching: false,
  user: null,
};

const authReducer: Reducer<AuthState, AuthAction> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionType.LOGIN_PENDING:
    case AuthActionType.SIGNUP_PENDING: {
      return { ...state, isFetching: true };
    }
    //
    case AuthActionType.LOGIN_FAILURE:
    case AuthActionType.SIGNUP_FAILURE: {
      return { ...state, isFetching: false };
    }
    //
    case AuthActionType.LOGIN_SUCCESS: {
      return { ...state, isFetching: false, user: action.payload };
    }
    case AuthActionType.SIGNUP_SUCCESS: {
      return { ...state, isFetching: false };
    }
    //
    default:
      return state;
  }
};

export default authReducer;
