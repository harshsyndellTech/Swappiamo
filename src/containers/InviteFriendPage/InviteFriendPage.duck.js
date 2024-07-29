import { inviteFriendFromAPI } from '../../util/api';

export const INVITE_FRIEND_REQUEST = 'app/InviteFriendPage/INVITE_FRIEND_REQUEST';
export const INVITE_FRIEND_SUCCESS = 'app/InviteFriendPage/INVITE_FRIEND_SUCCESS';
export const INVITE_FRIEND_ERROR = 'app/InviteFriendPage/INVITE_FRIEND_ERROR';

const initialState = {
  inviteInProgress: false,
  inviteError: null,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case INVITE_FRIEND_REQUEST:
      return {
        ...state,
        inviteInProgress: true,
        inviteError: null,
      };
    case INVITE_FRIEND_SUCCESS:
      return {
        ...state,
        inviteInProgress: false,
        inviteError: null,
      };
    case INVITE_FRIEND_ERROR:
      return {
        ...state,
        inviteInProgress: false,
        inviteError: payload,
      };
    default:
      return state;
  }
}

const inviteFriendRequest = () => ({
  type: INVITE_FRIEND_REQUEST,
});

const inviteFriendSuccess = () => ({
  type: INVITE_FRIEND_SUCCESS,
});

const inviteFriendError = error => ({
  type: INVITE_FRIEND_ERROR,
  payload: error,
});

export const inviteFriend = data => async (dispatch, getState, sdk) => {
  dispatch(inviteFriendRequest());
  try {
    const response = await inviteFriendFromAPI(data);
    dispatch(inviteFriendSuccess());
    return Promise.resolve(response);
  } catch (err) {
    const e = err?.response?.message ?? err?.response?.data?.message ?? err?.message;
    dispatch(inviteFriendError(e));
    return Promise.reject(e);
  }
};
