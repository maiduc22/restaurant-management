import { Reducer } from 'redux';
import { ProfileAction, ProfileActionType, ProfileState } from './profile.types';
import { Profile } from '../../types/models/profile';

const initialState: ProfileState = {
  isFetching: false,
  profile: {},
};

const profileReducer: Reducer<ProfileState, ProfileAction> = (state = initialState, action) => {
  switch (action.type) {
    case ProfileActionType.GET_PROFILE_PENDING:
    case ProfileActionType.UPDATE_PROFILE_PENDING:
      return { ...state, isFetching: true };

    case ProfileActionType.GET_PROFILE_FAILTURE:
    case ProfileActionType.UPDATE_PROFILE_FAILTURE:
      return { ...state, isFetching: false };

    case ProfileActionType.GET_PROFILE_SUCCESS:
      return { ...state, isFetching: false, profile: action.payload };
    case ProfileActionType.UPDATE_PROFILE_SUCCESS:
      return { ...state, isFetching: false };

    default:
      return state;
  }
};

export default profileReducer;
