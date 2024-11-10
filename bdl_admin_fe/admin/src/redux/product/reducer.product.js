import {
  ADD_PRODUCT,
  ADD_PRODUCT_ERROR,
  ADD_PRODUCT_SUCCESS,
  GET_CATEGORY,
  GET_CATEGORY_ERROR,
  GET_CATEGORY_SUCCESS,
  DELETE_PRODUCT,
  DELETE_PRODUCT_ERROR,
  DELETE_PRODUCT_SUCCESS,
  GET_PRODUCT,
  GET_PRODUCT_ERROR,
  GET_PRODUCT_SUCCESS,
  UPLOAD_PRODUCT_IMAGE,
  UPLOAD_PRODUCT_IMAGE_ERROR,
  UPLOAD_PRODUCT_IMAGE_SUCCESS,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
} from './constants.product';

const INIT_STATE = {
  products: [],
  categories: [],
  imageData: {},
  loading: false,
  errorMessage: '',
  successMesage: '',
  metadata: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: [...action.payload.data],
        metadata: { ...action.payload.metadata },
        loading: false,
        errorMessage: '',
      };
    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        errorMessage: action.payload?.message,
        metadata: { ...action.payload.metadata },
        loading: false,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        metadata: { ...action.payload.metadata },
        loading: false,
        errorMessage: '',
        successMesage: action.payload?.message,
      };
    case ADD_PRODUCT_ERROR:
      return {
        ...state,
        errorMessage: action.payload?.message,
        metadata: { ...action.payload.metadata },
        loading: false,
        successMesage: '',
      };
    case GET_CATEGORY:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        metadata: { ...action.payload.metadata },
        categories: [...action.payload.data],
        loading: false,
        errorMessage: '',
      };
    case GET_CATEGORY_ERROR:
      return {
        ...state,
        errorMessage: action.payload?.message,
        metadata: { ...action.payload.metadata },
        loading: false,
        successMesage: '',
      };
    case UPLOAD_PRODUCT_IMAGE:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case UPLOAD_PRODUCT_IMAGE_SUCCESS:
      return {
        ...state,
        successMesage: action.payload?.message,
        imageData: action.payload.data,
        metadata: { ...action.payload.metadata },
        loading: false,
        errorMessage: '',
      };
    case UPLOAD_PRODUCT_IMAGE_ERROR:
      return {
        ...state,
        errorMessage: action.payload?.message,
        metadata: { ...action.payload.metadata },
        loading: false,
        successMesage: '',
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        successMesage: action.payload.data?.message,
        errorMessage: '',
        loading: false,
      };
    case DELETE_PRODUCT_ERROR:
      return {
        ...state,
        successMesage: '',
        errorMessage: action.payload.data?.message,
        loading: false,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        metadata: { ...action.payload.metadata },
        loading: false,
        errorMessage: '',
        successMesage: action.payload?.message,
      };
    case UPDATE_PRODUCT_ERROR:
      return {
        ...state,
        errorMessage: action.payload?.message,
        metadata: { ...action.payload.metadata },
        loading: false,
        successMesage: '',
      };
    case GET_PRODUCT:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        metadata: { ...action.payload.metadata },
        loading: false,
        successMesage: '',
        errorMessage: '',
      };
    case GET_PRODUCT_ERROR:
      return {
        ...state,
        successMesage: '',
        errorMessage: action.payload?.message,
        metadata: { ...action.payload.metadata },
        loading: false,
      };
    default:
      return { ...state };
  }
};
