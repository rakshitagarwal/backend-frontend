import { ADD_AUCTION, ADD_AUCTION_ERROR, ADD_AUCTION_SUCCESS, DELETE_AUCTION, DELETE_AUCTION_ERROR, DELETE_AUCTION_SUCCESS, GET_AUCTION, GET_AUCTIONS, GET_AUCTIONS_ERROR, GET_AUCTIONS_SUCCESS, GET_AUCTION_CATEGORY, GET_AUCTION_CATEGORY_ERROR, GET_AUCTION_CATEGORY_SUCCESS, GET_AUCTION_ERROR, GET_AUCTION_SUCCESS, UPDATE_AUCTION, UPDATE_AUCTION_ERROR, UPDATE_AUCTION_SUCCESS, UPLOAD_AUCTION_IMAGE, UPLOAD_AUCTION_IMAGE_ERROR, UPLOAD_AUCTION_IMAGE_SUCCESS } from './constants.auction';

const INIT_STATE = {
  auctions: [],
  auctioncategories: [],
  imageData: {},
  loading: false,
  errorMessage: '',
  successMesage: '',
  metadata: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_AUCTIONS:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case GET_AUCTIONS_SUCCESS:
      return {
        ...state,
        auctions: [...action.payload.data],
        metadata: { ...action.payload.metadata },
        loading: false,
        errorMessage: '',
      };
    case GET_AUCTIONS_ERROR:
      return {
        ...state,
        successMesage: '',
        errorMessage: action.payload?.message,
        metadata: { ...action.payload.metadata },
        loading: false,
      };
    case ADD_AUCTION:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case ADD_AUCTION_SUCCESS:
      return {
        ...state,
        metadata: { ...action.payload.metadata },
        loading: false,
        errorMessage: '',
        successMesage: action.payload?.message,
      };
    case ADD_AUCTION_ERROR:
      return {
        ...state,
        errorMessage: action.payload?.message,
        metadata: { ...action.payload.metadata },
        loading: false,
        successMesage: '',
      };
      case DELETE_AUCTION:
        return {
          ...state,
          loading: true,
          successMesage: '',
          errorMessage: '',
        };
      case DELETE_AUCTION_SUCCESS:
        return {
          ...state,
          successMesage: action.payload.data?.message,
          errorMessage: '',
          loading: false,
        };
      case DELETE_AUCTION_ERROR:
        return {
          ...state,
          successMesage: '',
          errorMessage: action.payload.data?.message,
          loading: false,
        };
      case UPDATE_AUCTION:
        return {
          ...state,
          loading: true,
          successMesage: '',
          errorMessage: '',
        };
      case UPDATE_AUCTION_SUCCESS:
        return {
          ...state,
          metadata: { ...action.payload.metadata },
          loading: false,
          errorMessage: '',
          successMesage: action.payload?.message,
        };
      case UPDATE_AUCTION_ERROR:
        return {
          ...state,
          errorMessage: action.payload?.message,
          metadata: { ...action.payload.metadata },
          loading: false,
          successMesage: '',
        };
      case GET_AUCTION:
        return {
          ...state,
          loading: true,
          successMesage: '',
          errorMessage: '',
        };
      case GET_AUCTION_SUCCESS:
        return {
          ...state,
          metadata: { ...action.payload.metadata },
          loading: false,
          successMesage: '',
          errorMessage: '',
        };
      case GET_AUCTION_ERROR:
        return {
          ...state,
          successMesage: '',
          errorMessage: action.payload?.message,
          metadata: { ...action.payload.metadata },
          loading: false,
        };
    case GET_AUCTION_CATEGORY:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case GET_AUCTION_CATEGORY_SUCCESS:
      return {
        ...state,
        metadata: { ...action.payload.metadata },
        auctioncategories: [...action.payload.data],
        loading: false,
        errorMessage: '',
      };
    case GET_AUCTION_CATEGORY_ERROR:
      return {
        ...state,
        errorMessage: action.payload?.message,
        metadata: { ...action.payload.metadata },
        loading: false,
        successMesage: '',
      };
    case UPLOAD_AUCTION_IMAGE:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case UPLOAD_AUCTION_IMAGE_SUCCESS:
      return {
        ...state,
        successMesage: action.payload?.message,
        imageData: action.payload.data,
        metadata: { ...action.payload.metadata },
        loading: false,
        errorMessage: '',
      };
    case UPLOAD_AUCTION_IMAGE_ERROR:
      return {
        ...state,
        errorMessage: action.payload?.message,
        metadata: { ...action.payload.metadata },
        loading: false,
        successMesage: '',
      };
    default:
      return { ...state };
  }
};
