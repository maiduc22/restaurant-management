import { Reducer } from 'redux';
import { StaffAction, StaffState, StaffActionType } from './staff.types';

const initialState: StaffState = {
  isFetching: false,
  staffs: [],
};

const staffReducer: Reducer<StaffState, StaffAction> = (state = initialState, action) => {
  switch (action.type) {
    case StaffActionType.ADD_STAFF_PENDING:
    case StaffActionType.GET_ALL_STAFFS_PENDING:
    case StaffActionType.EDIT_STAFF_PENDING:
    case StaffActionType.DELETE_STAFF_PENDING:
    case StaffActionType.GET_STAFF_BY_ID_PENDING:
      return { ...state, isFetching: true };

    case StaffActionType.ADD_STAFF_FAILURE:
    case StaffActionType.GET_ALL_STAFFS_FAILURE:
    case StaffActionType.EDIT_STAFF_FAILURE:
    case StaffActionType.DELETE_STAFF_FAILURE:
    case StaffActionType.GET_STAFF_BY_ID_FAILURE:
      return { ...state, isFetching: false };

    case StaffActionType.ADD_STAFF_SUCCESS:
      return { ...state, isFetching: false };
    case StaffActionType.GET_ALL_STAFFS_SUCCESS:
      return { ...state, isFetching: false, staffs: action.payload };
    case StaffActionType.EDIT_STAFF_SUCCESS:
      return { ...state, isFetching: false };
    case StaffActionType.DELETE_STAFF_SUCCESS:
      return { ...state, isFetching: false };
    case StaffActionType.GET_STAFF_BY_ID_SUCCESS:
      return { ...state, isFetching: false };

    default:
      return state;
  }
};

export default staffReducer;
