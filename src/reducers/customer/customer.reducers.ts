import { Reducer } from 'redux';
import { CustomerAction, CustomerState, CustomerActionType } from './customer.types';

const initialState: CustomerState = {
  isFetching: false,
  customers: [],
};

const customerReducer: Reducer<CustomerState, CustomerAction> = (state = initialState, action) => {
  switch (action.type) {
    case CustomerActionType.ADD_CUSTOMER_PENDING:
    case CustomerActionType.GET_ALL_CUSTOMERS_PENDING:
    case CustomerActionType.EDIT_CUSTOMER_PENDING:
    case CustomerActionType.DELETE_CUSTOMER_PENDING:
      return { ...state, isFetching: true };

    case CustomerActionType.ADD_CUSTOMER_FAILURE:
    case CustomerActionType.GET_ALL_CUSTOMERS_FAILURE:
    case CustomerActionType.EDIT_CUSTOMER_FAILURE:
    case CustomerActionType.DELETE_CUSTOMER_FAILURE:
      return { ...state, isFetching: false };

    case CustomerActionType.ADD_CUSTOMER_SUCCESS:
      return { ...state, isFetching: false };
    case CustomerActionType.GET_ALL_CUSTOMERS_SUCCESS:
      return { ...state, isFetching: false, customers: action.payload };
    case CustomerActionType.EDIT_CUSTOMER_SUCCESS:
      return { ...state, isFetching: false };
    case CustomerActionType.DELETE_CUSTOMER_SUCCESS:
      return { ...state, isFetching: false };

    default:
      return state;
  }
};

export default customerReducer;
