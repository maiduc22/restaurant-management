import { Reducer } from 'redux';
import { FoodAction, FoodState, FoodActionType } from './food.types';

const initialState: FoodState = {
  isFetching: false,
  foods: [],
};

const foodReducer: Reducer<FoodState, FoodAction> = (state = initialState, action) => {
  switch (action.type) {
    case FoodActionType.ADD_FOOD_PENDING:
    case FoodActionType.GET_ALL_FOODS_PENDING:
    case FoodActionType.EDIT_FOOD_PENDING:
    case FoodActionType.DELETE_FOOD_PENDING:
    case FoodActionType.INACTIVE_FOOD_PENDING:
    case FoodActionType.ACTIVE_FOOD_PENDING:
    case FoodActionType.GET_FOOD_BY_ID_PENDING:
      return { ...state, isFetching: true };

    case FoodActionType.ADD_FOOD_FAILURE:
    case FoodActionType.GET_ALL_FOODS_FAILURE:
    case FoodActionType.EDIT_FOOD_FAILURE:
    case FoodActionType.DELETE_FOOD_FAILURE:
    case FoodActionType.GET_FOOD_BY_ID_FAILURE:
    case FoodActionType.ACTIVE_FOOD_FAILURE:
    case FoodActionType.INACTIVE_FOOD_FAILURE:
      return { ...state, isFetching: false };

    case FoodActionType.ADD_FOOD_SUCCESS:
      return { ...state, isFetching: false };
    case FoodActionType.GET_ALL_FOODS_SUCCESS:
      return { ...state, isFetching: false, foods: action.payload };
    case FoodActionType.EDIT_FOOD_SUCCESS:
      return { ...state, isFetching: false };
    case FoodActionType.DELETE_FOOD_SUCCESS:
      return { ...state, isFetching: false };
    case FoodActionType.GET_FOOD_BY_ID_SUCCESS:
      return { ...state, isFetching: false };
    case FoodActionType.ACTIVE_FOOD_SUCCESS:
      return { ...state, isFetching: false };
    case FoodActionType.INACTIVE_FOOD_SUCCESS:
      return { ...state, isFetching: false };

    default:
      return state;
  }
};

export default foodReducer;
