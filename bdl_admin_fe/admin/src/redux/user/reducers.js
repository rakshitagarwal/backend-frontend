import {
  ADD_USER,
  ADD_USER_ERROR,
  ADD_USER_SUCCESS,
  DELETE_USER,
  DELETE_USER_ERROR,
  DELETE_USER_SUCCESS,
  GET_USER,
  GET_USERS,
  GET_USERS_ERROR,
  GET_USERS_SUCCESS,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  LOGIN_USER1,
  LOGIN_USER_ERROR1,
  LOGIN_USER_SUCCESS1,
  UPDATE_USER,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
} from './constants';

const INIT_STATE = {
  currentUser: null,
  loading: false,
  error: '',
  count: 0,
  users: [],
  errorMessage: '',
  successMesage: '',
  metadata: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER1:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_USER_SUCCESS1:
      return {
        ...state,
        userData: { ...action.payload },
        loading: false,
      };
    case LOGIN_USER_ERROR1:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_USERS:
      return {
        ...state,
        users: [],
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: [...action.payload.data],
        metadata: {...action.payload.metadata },
        errorMessage: '',
        loading: false,
      };
    case GET_USERS_ERROR:
      return {
        ...state,
        errorMessage: action.payload?.message,
        metadata: { ...action.payload.metadata },
        loading: false,
      };
    case ADD_USER:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        metadata: { ...action.payload.metadata },
        loading: false,
        errorMessage: '',
        successMesage: action.payload.message,
      };
    case ADD_USER_ERROR:
      return {
        ...state,
        errorMessage: action.payload.message,
        metadata: { ...action.payload.metadata },
        loading: false,
        successMesage: '',
      };
    case DELETE_USER:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
      case DELETE_USER_SUCCESS:
      return {
        ...state,
        successMesage: action.payload.data?.message,
        errorMessage: '',
        loading: false,
      };
    case DELETE_USER_ERROR:
      return {
        ...state,
        successMesage: '',
        errorMessage: action.payload.data?.message,
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        metadata: { ...action.payload.metadata },
        loading: false,
        successMesage: '',
        errorMessage: '',
      };
    case GET_USER_ERROR:
      return {
        ...state,
        successMesage: '',
        errorMessage: action.payload?.message,
        metadata: { ...action.payload?.metadata },
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        metadata: { ...action.payload.response.metadata },
        loading: false,
        errorMessage: '',
        successMesage: action.payload?.response.message,
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        errorMessage: action.payload?.message,
        loading: false,
        successMesage: '',
      };
    default:
      return { ...state };
  }
};
