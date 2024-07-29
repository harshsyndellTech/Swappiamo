import { fetchCurrentUser } from '../../ducks/user.duck';
import { transactionHistoryFromAPI } from '../../util/api';

const FETCH_TRANSACTION_HISTORY_REQUEST = 'app/SuneBalancePage/FETCH_TRANSACTION_HISTORY_REQUEST';
const FETCH_TRANSACTION_HISTORY_SUCCESS = 'app/SuneBalancePage/FETCH_TRANSACTION_HISTORY_SUCCESS';
const FETCH_TRANSACTION_HISTORY_FAILURE = 'app/SuneBalancePage/FETCH_TRANSACTION_HISTORY_FAILURE';

const initialState = {
  history: [],
  fetchInProgress: false,
  fetchError: null,
  statusText: null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_TRANSACTION_HISTORY_REQUEST:
      return {
        ...initialState,
        fetchInProgress: true,
        statusText: null,
      };
    case FETCH_TRANSACTION_HISTORY_SUCCESS:
      return {
        ...state,
        history: payload.data,
        fetchInProgress: false,
        fetchError: null,
        statusText: payload.statusText,
      };
    case FETCH_TRANSACTION_HISTORY_FAILURE:
      return {
        ...state,
        fetchInProgress: false,
        fetchError: payload,
      };
    default:
      return state;
  }
}

export const fetchTransactionHistoryRequest = () => ({ type: FETCH_TRANSACTION_HISTORY_REQUEST });
export const fetchTransactionHistorySuccess = payload => ({
  type: FETCH_TRANSACTION_HISTORY_SUCCESS,
  payload,
});
export const fetchTransactionHistoryFailure = error => ({
  type: FETCH_TRANSACTION_HISTORY_FAILURE,
  payload: error,
});

export const fetchTransactionHistory = () => async (dispatch, getState, sdk) => {
  const isBrowser = typeof window != 'undefined';
  if (!isBrowser) return Promise.resolve();
  try {
    dispatch(fetchTransactionHistoryRequest());
    await dispatch(fetchCurrentUser());

    const response = await transactionHistoryFromAPI();
    dispatch(fetchTransactionHistorySuccess({ statusText: response.message, data: response.data }));
  } catch (error) {
    const e = error?.response?.message ?? error?.response?.data?.message ?? error?.message;
    dispatch(fetchTransactionHistoryFailure(e));
  }
};

export const loadData = (params, search) => {
  return fetchTransactionHistory();
};
