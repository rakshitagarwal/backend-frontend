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

export const loginUser = (user) => ({
  type: LOGIN_USER1,
  payload: { ...user },
});
export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS1,
  payload: { ...user },
});
export const loginUserError = (message) => ({
  type: LOGIN_USER_ERROR1,
  payload: { message },
});

export const getUsers = (params) => {
  return {
    type: GET_USERS,
    payload: { params },
  };
};
export const getUsersSuccess = (data) => ({
  type: GET_USERS_SUCCESS,
  payload: { ...data },
});
export const getUsersError = (message) => ({
  type: GET_USERS_ERROR,
  payload: message,
});

export const addUser = (data, cb) => {
  return {
    type: ADD_USER,
    payload: { data, cb },
  };
};
export const addUserSuccess = (data) => ({
  type: ADD_USER_SUCCESS,
  payload: { ...data },
});
export const addUserError = (message) => ({
  type: ADD_USER_ERROR,
  payload: message,
});
export const deleteUser = (userId, cb) => {
  return {
    type: DELETE_USER,
    payload: { userId, cb },
  };
};
export const deleteUserSuccess = (data) => {
  return {
    type: DELETE_USER_SUCCESS,
    payload: { data },
  };
};
export const deleteUserError = (data) => {
  return {
    type: DELETE_USER_ERROR,
    payload: { data },
  };
};
export const getUser = (pathParam, cb) => {
  return {
    type: GET_USER,
    payload: { pathParam, cb },
  };
};
export const getUserSuccess = (data) => ({
  type: GET_USER_SUCCESS,
  payload: { ...data },
});
export const getUserError = (message) => ({
  type: GET_USER_ERROR,
  payload: message,
});
export const updateUser = (pathParam, data, cb) => {
  return {
    type: UPDATE_USER,
    payload: { pathParam, data, cb },
  };
};
export const updateUserSuccess = (data) => ({
  type: UPDATE_USER_SUCCESS,
  payload: { ...data },
});
export const updateUserError = (message) => ({
  type: UPDATE_USER_ERROR,
  payload: message,
});
