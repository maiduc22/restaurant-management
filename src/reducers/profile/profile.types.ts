import { ThunkAction } from 'redux-thunk';
import { Profile } from '../../types/models/profile';
import { RootState } from '../../redux/reducer';

export interface ProfileState {
  isFetching: boolean;
  profile: any;
}

export enum ProfileActionType {
  GET_PROFILE_PENDING = 'GET_PROFILE_PENDING',
  GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS',
  GET_PROFILE_FAILTURE = 'GET_PROFILE_FAILTURE',

  UPDATE_PROFILE_PENDING = 'UPDATE_PROFILE_PENDING',
  UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILTURE = 'UPDATE_PROFILE_FAILTURE',
}

export interface GetProfilePending {
  type: ProfileActionType.GET_PROFILE_PENDING;
}

export interface GetProfileSuccess {
  type: ProfileActionType.GET_PROFILE_SUCCESS;
  payload: Profile[];
}

export interface GetProfileFailture {
  type: ProfileActionType.GET_PROFILE_FAILTURE;
}

export interface UpdateProfilePending {
  type: ProfileActionType.UPDATE_PROFILE_PENDING;
}

export interface UpdateProfileSuccess {
  type: ProfileActionType.UPDATE_PROFILE_SUCCESS;
}

export interface UpdateProfileFailture {
  type: ProfileActionType.UPDATE_PROFILE_FAILTURE;
}

export type ProfileAction =
  | GetProfilePending
  | GetProfileSuccess
  | GetProfileFailture
  | UpdateProfileFailture
  | UpdateProfilePending
  | UpdateProfileSuccess;

export type ProfileThunkAction = ThunkAction<void, RootState, any, ProfileAction>;
