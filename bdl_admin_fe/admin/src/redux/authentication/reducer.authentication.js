import { FORGET_PASSWORD, FORGET_PASSWORD_ERROR, FORGET_PASSWORD_SUCCESS, LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT, LOGOUT_ERROR, LOGOUT_SUCCESS } from './constants.authentication';

const INIT_STATE = {
  loading: false,
  errorMessage: '',
  successMesage: '',
  permission: [],
  metadata: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
        permission: [],
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: '',
        successMesage: action.payload?.message,
        permission: action.payload.data.permission,
        metadata: { ...action.payload.data },
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload?.message,
        successMesage: '',
        metadata: { ...action.payload.metadata },
      };
    case LOGOUT:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: '',
        successMesage: action.payload.response?.message,
      };
    case LOGOUT_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.response?.message,
        successMesage: '',
      };
    case FORGET_PASSWORD:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: '',
        successMesage: action.payload.response?.message,
      };
    case FORGET_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.response?.message,
        successMesage: '',
      };
    default:
      return { ...state };
  }
};
