import { API_URLS } from '../../config/constants/api';
import { AppDispatch } from '../../redux/store';
import { Callback } from '../../types/helpers/callback';
import { Profile } from '../../types/models/profile';
import { useCallApi } from '../../utils/api';
import { ProfileActionType, ProfileThunkAction } from './profile.types';
import { notiType, renderNotification } from '../../utils/helpers';

const getProfileByUsername =
  (payload: string, cb?: Callback): ProfileThunkAction =>
  async (dispatch: AppDispatch) => {
    if (!payload) return;
    dispatch({ type: ProfileActionType.GET_PROFILE_PENDING });

    const api = API_URLS.PROFILE.getProfileByUsername(payload);
    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      dispatch({ type: ProfileActionType.GET_PROFILE_SUCCESS, payload: response.data });
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: ProfileActionType.GET_PROFILE_FAILTURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const updateProfille =
  (payload: Partial<Profile>, cb?: Callback): ProfileThunkAction =>
  async (dispatch: AppDispatch) => {
    if (!payload.username) return;
    dispatch({ type: ProfileActionType.UPDATE_PROFILE_PENDING });

    const api = API_URLS.PROFILE.updateProfile(payload.username);
    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: ProfileActionType.UPDATE_PROFILE_SUCCESS,
        payload: response.data,
      });
      renderNotification('Thông báo', 'Sửa thành công', notiType.SUCCESS);
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: ProfileActionType.UPDATE_PROFILE_FAILTURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

export const profileAction = {
  updateProfille,
  getProfileByUsername,
};
