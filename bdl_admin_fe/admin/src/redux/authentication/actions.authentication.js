import { FORGET_PASSWORD, FORGET_PASSWORD_ERROR, FORGET_PASSWORD_SUCCESS, LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT, LOGOUT_ERROR, LOGOUT_SUCCESS } from './constants.authentication';

export const login = (params) => {
  return {
    type: LOGIN,
    payload: { ...params },
  };
};
export const loginSuccess = (data) =>({
  type: LOGIN_SUCCESS,
  payload: { ...data },
});
export const loginError = (data) => {
  return {
    type: LOGIN_ERROR,
    payload: data,
  };
};

export const logout = (params) => {
  return {
    type: LOGOUT,
    payload: { ...params },
  };
};
export const logoutSuccess = (data) => ({
  type: LOGOUT_SUCCESS,
  payload: { ...data },
});
export const logoutError = (message) => {
  return {
    type: LOGOUT_ERROR,
    payload: message,
  };
};

export const forgetpassword = (params) => {
  return {
    type: FORGET_PASSWORD,
    payload: { ...params },
  };
};
export const forgetpasswordSuccess = (data) => ({
  type: FORGET_PASSWORD_SUCCESS,
  payload: { ...data },
});
export const forgetpasswordError = (message) => {
  return {
    type: FORGET_PASSWORD_ERROR,
    payload: message,
  };
};
