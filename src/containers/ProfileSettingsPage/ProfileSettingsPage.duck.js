import { denormalisedResponseEntities } from '../../util/data';
import { storableError } from '../../util/errors';
import { currentUserShowSuccess } from '../../ducks/user.duck';
import { onFetchUsers, sendSune} from '../../util/api';

// ================ Action types ================ //

export const CLEAR_UPDATED_FORM = 'app/ProfileSettingsPage/CLEAR_UPDATED_FORM';

export const UPLOAD_IMAGE_REQUEST = 'app/ProfileSettingsPage/UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'app/ProfileSettingsPage/UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_ERROR = 'app/ProfileSettingsPage/UPLOAD_IMAGE_ERROR';

export const UPDATE_PROFILE_REQUEST = 'app/ProfileSettingsPage/UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'app/ProfileSettingsPage/UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_ERROR = 'app/ProfileSettingsPage/UPDATE_PROFILE_ERROR';

export const GET_USER_LIST_REQUEST = 'app/ProfileSettingsPage/GET_USER_LIST_REQUEST';
export const GET_USER_LIST_SUCCESS = 'app/ProfileSettingsPage/GET_USER_LIST_SUCCESS';
export const GET_USER_LIST_ERROR = 'app/ProfileSettingsPage/GET_USER_LIST_ERROR';

export const SEARCH_USER_LIST_SUCCESS = 'app/ProfileSettingsPage/SEARCH_USER_LIST_SUCCESS';

export const SEND_SUNE_REQUEST = 'app/ProfileSettingsPage/SEND_SUNE_REQUEST';
export const SEND_SUNE_SUCCESS = 'app/ProfileSettingsPage/SEND_SUNE_SUCCESS';
export const SEND_SUNE_ERROR = 'app/ProfileSettingsPage/SEND_SUNE_ERROR';

// ================ Reducer ================ //

const initialState = {
  image: null,
  uploadImageError: null,
  uploadInProgress: false,
  updateInProgress: false,
  imagePristine: false,
  updateProfileError: null,
  userList: null,
  filterdUser: []
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case UPLOAD_IMAGE_REQUEST:
      // payload.params: { id: 'tempId', file }
      return {
        ...state,
        image: { ...payload.params },
        uploadInProgress: true,
        uploadImageError: null,
        imagePristine: false,

      };
    case UPLOAD_IMAGE_SUCCESS: {
      // payload: { id: 'tempId', uploadedImage }
      const { id, uploadedImage } = payload;
      const { file } = state.image || {};
      const image = { id, imageId: uploadedImage.id, file, uploadedImage };
      return { ...state, image, uploadInProgress: false,imagePristine: true
      };
    }
    case UPLOAD_IMAGE_ERROR: {
      // eslint-disable-next-line no-console
      return { ...state, image: null, uploadInProgress: false, uploadImageError: payload.error };
    }

    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        updateInProgress: true,
        updateProfileError: null,
        imagePristine: false,

      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        userList: null,
        updateInProgress: false,
        imagePristine: true
      };
    case UPDATE_PROFILE_ERROR:
      return {
        ...state,
        image: null,
        updateInProgress: false,
        updateProfileError: payload,
      };
    case GET_USER_LIST_REQUEST:
      return {
        ...state,
        updateInProgress: true,
        updateProfileError: null,
      };
    case GET_USER_LIST_SUCCESS:
      return {
        ...state,
        userList: payload,
        filterdUser: payload,
        updateInProgress: false,
      };
    case GET_USER_LIST_ERROR:
      return {
        ...state,
        userList: [],
        updateInProgress: false,
        updateProfileError: payload,
      };
    case SEND_SUNE_REQUEST:
      return {
        ...state,
        updateInProgress: true,
        updateProfileError: null,
        senSuneSuccess: false
      };
    case SEND_SUNE_SUCCESS:
      return {
        ...state,
        updateInProgress: false,
        senSuneSuccess: true
      };
    case SEND_SUNE_ERROR:
      return {
        ...state,
        userList: [],
        updateInProgress: false,
        updateProfileError: payload,
        senSuneSuccess: false
      };
    case SEARCH_USER_LIST_SUCCESS:
      return {
        ...state,
        filterdUser: payload,
        updateInProgress: false,
      };
    case CLEAR_UPDATED_FORM:
      return { ...state, updateProfileError: null, uploadImageError: null };

    default:
      return state;
  }
}

// ================ Selectors ================ //

// ================ Action creators ================ //

export const clearUpdatedForm = () => ({
  type: CLEAR_UPDATED_FORM,
});

// SDK method: images.upload
export const uploadImageRequest = params => ({ type: UPLOAD_IMAGE_REQUEST, payload: { params } });
export const uploadImageSuccess = result => ({ type: UPLOAD_IMAGE_SUCCESS, payload: result.data });
export const uploadImageError = error => ({
  type: UPLOAD_IMAGE_ERROR,
  payload: error,
  error: true,
});

// SDK method: sdk.currentUser.updateProfile
export const updateProfileRequest = params => ({
  type: UPDATE_PROFILE_REQUEST,
  payload: { params },
});
export const updateProfileSuccess = result => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: result.data,
});
export const updateProfileError = error => ({
  type: UPDATE_PROFILE_ERROR,
  payload: error,
  error: true,
});

export const getUserListRequest = params => ({
  type: GET_USER_LIST_REQUEST,
  payload: { params },
});
export const getUserListSuccess = result => ({
  type: GET_USER_LIST_SUCCESS,
  payload: result,
});
export const getUserListError = error => ({
  type: GET_USER_LIST_ERROR,
  payload: error,
  error: true,
});

export const serachUserListSuccess = result => ({
  type: SEARCH_USER_LIST_SUCCESS,
  payload: result,
});

export const sendSuneRequest = params => ({
  type: SEND_SUNE_REQUEST,
  payload: { params },
});
export const sendSuneSuccess = result => ({
  type: SEND_SUNE_SUCCESS,
  payload: result,
});
export const sendSuneError = error => ({
  type: SEND_SUNE_ERROR,
  payload: error,
  error: true,
});

// ================ Thunk ================ //

// Images return imageId which we need to map with previously generated temporary id
export function uploadImage(actionPayload) {
  return (dispatch, getState, sdk) => {
    const id = actionPayload.id;
    dispatch(uploadImageRequest(actionPayload));

    const bodyParams = {
      image: actionPayload.file,
    };
    const queryParams = {
      expand: true,
      'fields.image': ['variants.square-small', 'variants.square-small2x'],
    };

    return sdk.images
      .upload(bodyParams, queryParams)
      .then(resp => {
        const uploadedImage = resp.data.data;
        dispatch(uploadImageSuccess({ data: { id, uploadedImage } }));
      })
      .catch(e => dispatch(uploadImageError({ id, error: storableError(e) })));
  };
}

export const updateProfile = actionPayload => {
  return (dispatch, getState, sdk) => {
    dispatch(updateProfileRequest());

    const queryParams = {
      expand: true,
      include: ['profileImage'],
      'fields.image': ['variants.square-small', 'variants.square-small2x'],
    };

    return sdk.currentUser
      .updateProfile(actionPayload, queryParams)
      .then(response => {
        dispatch(updateProfileSuccess(response));

        const entities = denormalisedResponseEntities(response);
        if (entities.length !== 1) {
          throw new Error('Expected a resource in the sdk.currentUser.updateProfile response');
        }
        const currentUser = entities[0];

        // Update current user in state.user.currentUser through user.duck.js
        dispatch(currentUserShowSuccess(currentUser));
      })
      .catch(e => dispatch(updateProfileError(storableError(e))));
  };
};


export const getUserLists = () => {
  return (dispatch, getState, sdk) => {
    dispatch(getUserListRequest());

    return onFetchUsers()
      .then(response => {
        dispatch(getUserListSuccess(response));
      })
      .catch(e => dispatch(getUserListError(storableError(e))));
  };
};

export const searchUser = (searchInput) => {
  return (dispatch, getState, sdk) => {
    const userList = getState().ProfileSettingsPage.userList;

    var filterredRecord = userList.filter(x => x?.attributes?.profile?.firstName?.toLowerCase().includes(searchInput.toLowerCase()) || x?.attributes?.profile?.lastName?.toLowerCase().includes(searchInput.toLowerCase()))

    return dispatch(serachUserListSuccess(filterredRecord));
  }
};

export const sendSuneUser = (data) => {
  return async (dispatch, getState, sdk) => {
    return sendSune(data)
      .then(async response => {
        dispatch(sendSuneSuccess(response));
      })
      .catch(e => dispatch(sendSuneError(storableError(e))));
  };
};
