import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { storableError } from '../../util/errors';
import { parse } from '../../util/urlHelpers';
const RESULT_PAGE_SIZE = 8;

export const SHOW_LISTINGS_REQUEST = 'app/SearchPage/SHOW_LISTINGS_REQUEST';
export const SHOW_LISTINGS_SUCCESS = 'app/SearchPage/SHOW_LISTINGS_SUCCESS';
export const SHOW_LISTINGS_ERROR = 'app/SearchPage/SHOW_LISTINGS_ERROR';
export const SHOW_LISTINGS_SET_UPDATE = 'app/SearchPage/SHOW_LISTINGS_SET_NULL';
const initialState = {
  pagination: null,
  page: null,
  searchParams: null,
  searchInProgress: false,
  searchListingsError: null,
  sort: null,
  currentPageResultIds: [],
};

const resultIds = data => {
  return data.data.data.map(l => l.id);
};

const listingPageReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case SHOW_LISTINGS_REQUEST:
      return {
        ...state,
        page: payload?.page,
        sort: payload?.sort,
        searchInProgress: true,
        currentPageResultIds: [],
        searchListingsError: null,
      };
    case SHOW_LISTINGS_SET_UPDATE:
      return {
        ...state,
        page: payload,
        searchInProgress: true,

        searchListingsError: null,
      };
    case SHOW_LISTINGS_SUCCESS:
      return {
        ...state,

        currentPageResultIds: [
          ...new Set([...state.currentPageResultIds, ...resultIds(payload?.data)]),
        ],
        pagination: payload.data.data.meta,
        searchInProgress: false,
      };
    case SHOW_LISTINGS_ERROR:
      // eslint-disable-next-line no-console
      // console.log('payload', payload);
      return {
        ...state,
        searchInProgress: false,
        searchListingsError: payload,
        currentPageResultIds: [],
      };

    default:
      return state;
  }
};

export default listingPageReducer;

export const searchListings = searchParams => (dispatch, getState, sdk) => {
  dispatch({
    type: SHOW_LISTINGS_REQUEST,
    payload: { page: searchParams?.page, sort: searchParams?.sort },
  });
  const { perPage, ...rest } = searchParams;

  const params = {
    ...rest,
    per_page: perPage,
  };

  return sdk.listings
    .query(params)
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      dispatch({ type: SHOW_LISTINGS_SUCCESS, payload: { data: response } });

      return response;
    })
    .catch(e => {
      dispatch({ type: SHOW_LISTINGS_ERROR, payload: storableError(e) });
    });
};
export const FetchNextPage = page => (dispatch, getState, sdk) => {
  dispatch({ type: SHOW_LISTINGS_SET_UPDATE, payload: page });
  const { sort = null } = getState().LandingPage;
  const params = {
    page,
    perPage: RESULT_PAGE_SIZE,
    sort,
    include: ['author', 'author.profileImage', 'images', 'currentStock'],
    'fields.listing': ['title', 'geolocation', 'price', 'publicData'],
    'fields.user': ['profile.displayName', 'profile.abbreviatedName'],
    'fields.image': [
      'variants.default',
      'variants.landscape-crop',
      'variants.landscape-crop2x',
      //for avatar
      'variants.square-small',
      'variants.square-small2x',
    ],
    'limit.images': 1,
  };
  return sdk.listings
    .query(params)
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      dispatch({ type: SHOW_LISTINGS_SUCCESS, payload: { data: response } });
      return response;
    })
    .catch(e => {
      dispatch({ type: SHOW_LISTINGS_ERROR, payload: storableError(e) });
    });
};
export const loadData = (params, search) => {
  const sortArray = ['createdAt', '-createdAt'];
  const selectRandomSort = sortArray[Math.floor(Math.random() * sortArray.length)];
  // console.log('selectRandomSort', selectRandomSort);
  return searchListings({
    page: 1,
    perPage: RESULT_PAGE_SIZE,
    sort: selectRandomSort,
    include: ['author', 'author.profileImage', 'images', 'currentStock'],
    'fields.listing': ['title', 'geolocation', 'price', 'publicData'],
    'fields.user': ['profile.displayName', 'profile.abbreviatedName'],
    'fields.image': [
      'variants.default',
      'variants.landscape-crop',
      'variants.landscape-crop2x',
      //for avatar
      'variants.square-small',
      'variants.square-small2x',
    ],
    'limit.images': 1,
  });
};
