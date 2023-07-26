import { ThunkAction } from 'redux-thunk';
import { Food } from '../../types/models/food';
import { RootState } from '../../redux/reducer';

export interface FoodState {
  isFetching: boolean;
  foods: Food[];
}

export enum FoodActionType {
  ADD_FOOD_PENDING = 'ADD_FOOD_PENDING',
  ADD_FOOD_SUCCESS = 'ADD_FOOD_SUCCESS',
  ADD_FOOD_FAILURE = 'ADD_FOOD_FAILURE',

  GET_ALL_FOODS_PENDING = 'GET_ALL_FOODS_PENDING',
  GET_ALL_FOODS_SUCCESS = 'GET_ALL_FOODS_SUCCESS',
  GET_ALL_FOODS_FAILURE = 'GET_ALL_FOODS_FAILURE',

  DELETE_FOOD_PENDING = 'DELETE_FOOD_PENDING',
  DELETE_FOOD_SUCCESS = 'DELETE_FOOD_SUCCESS',
  DELETE_FOOD_FAILURE = 'DELETE_FOOD_FAILURE',

  EDIT_FOOD_PENDING = 'EDIT_FOOD_PENDING',
  EDIT_FOOD_SUCCESS = 'EDIT_FOOD_SUCCESS',
  EDIT_FOOD_FAILURE = 'EDIT_FOOD_FAILURE',

  GET_FOOD_BY_ID_PENDING = 'GET_FOOD_BY_ID_PENDING',
  GET_FOOD_BY_ID_SUCCESS = 'GET_FOOD_BY_ID_SUCCESS',
  GET_FOOD_BY_ID_FAILURE = 'GET_FOOD_BY_ID_FAILURE',

  ACTIVE_FOOD_PENDING = 'ACTIVE_FOOD_PENDING',
  ACTIVE_FOOD_SUCCESS = 'ACTIVE_FOOD_SUCCESS',
  ACTIVE_FOOD_FAILURE = 'ACTIVE_FOOD_FAILURE',

  INACTIVE_FOOD_PENDING = 'INACTIVE_FOOD_PENDING',
  INACTIVE_FOOD_SUCCESS = 'INACTIVE_FOOD_SUCCESS',
  INACTIVE_FOOD_FAILURE = 'INACTIVE_FOOD_FAILURE',
}

//
export interface AddFoodPending {
  type: FoodActionType.ADD_FOOD_PENDING;
}
export interface AddFoodSuccess {
  type: FoodActionType.ADD_FOOD_SUCCESS;
}
export interface AddFoodFailure {
  type: FoodActionType.ADD_FOOD_FAILURE;
}

//
export interface GetAllFoodsPending {
  type: FoodActionType.GET_ALL_FOODS_PENDING;
}
export interface GetAllFoodsSuccess {
  type: FoodActionType.GET_ALL_FOODS_SUCCESS;
  payload: Food[];
}
export interface GetAllFoodsFailure {
  type: FoodActionType.GET_ALL_FOODS_FAILURE;
}

//
export interface EditFoodPending {
  type: FoodActionType.EDIT_FOOD_PENDING;
}
export interface EditFoodSuccess {
  type: FoodActionType.EDIT_FOOD_SUCCESS;
  payload: Food;
}
export interface EditFoodFailure {
  type: FoodActionType.EDIT_FOOD_FAILURE;
}

//
export interface DeleteFoodPending {
  type: FoodActionType.DELETE_FOOD_PENDING;
}
export interface DeleteFoodSuccess {
  type: FoodActionType.DELETE_FOOD_SUCCESS;
}
export interface DeleteFoodFailure {
  type: FoodActionType.DELETE_FOOD_FAILURE;
}

//
export interface GetFoodByIdPending {
  type: FoodActionType.GET_FOOD_BY_ID_PENDING;
}
export interface GetFoodByIdSuccess {
  type: FoodActionType.GET_FOOD_BY_ID_SUCCESS;
  payload: Food;
}
export interface GetFoodByIdFailure {
  type: FoodActionType.GET_FOOD_BY_ID_FAILURE;
}

//
export interface ActiveFoodPending {
  type: FoodActionType.ACTIVE_FOOD_PENDING;
}
export interface ActiveFoodSuccess {
  type: FoodActionType.ACTIVE_FOOD_SUCCESS;
}
export interface ActiveFoodFailure {
  type: FoodActionType.ACTIVE_FOOD_FAILURE;
}

//
export interface InactiveFoodPending {
  type: FoodActionType.INACTIVE_FOOD_PENDING;
}
export interface InactiveFoodSuccess {
  type: FoodActionType.INACTIVE_FOOD_SUCCESS;
}
export interface InactiveFoodFailure {
  type: FoodActionType.INACTIVE_FOOD_FAILURE;
}

export type FoodAction =
  | AddFoodFailure
  | AddFoodPending
  | AddFoodSuccess
  | GetAllFoodsFailure
  | GetAllFoodsPending
  | GetAllFoodsSuccess
  | EditFoodFailure
  | EditFoodPending
  | EditFoodSuccess
  | GetFoodByIdFailure
  | GetFoodByIdPending
  | GetFoodByIdSuccess
  | ActiveFoodFailure
  | ActiveFoodPending
  | ActiveFoodSuccess
  | InactiveFoodFailure
  | InactiveFoodPending
  | InactiveFoodSuccess
  | DeleteFoodFailure
  | DeleteFoodPending
  | DeleteFoodSuccess;

export type FoodThunkAction = ThunkAction<void, RootState, any, FoodAction>;
