import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  addUserError,
  addUserSuccess,
  deleteUserError,
  deleteUserSuccess,
  getUserError,
  getUsersError,
  getUsersSuccess,
  getUserSuccess,
  loginUserSuccess,
  updateUserError,
  updateUserSuccess,
} from './actions';
import {
  ADD_USER,
  DELETE_USER,
  GET_USER,
  GET_USERS,
  LOGIN_USER1,
  UPDATE_USER,
} from './constants';
import {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  loginUser,
  updateUser,
} from './httpCalls';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* LoginUser(action) {
  yield call(delay, 3000);
  const res = yield call(loginUser, { ...action.payload });
  yield put(loginUserSuccess({ ...res }));
}

export function* GetUsers(action) {
  const res = yield call(getUsers, action.payload);
  if (res.success) yield put(getUsersSuccess({ ...res }));
  else yield put(getUsersError({ ...res }));
}

export function* AddUser(action) {
  const { data, cb } = action.payload;
  const res = yield call(addUser, { ...data });
  if (res.success) {
    yield put(addUserSuccess({ ...res }));
    cb();
  } else yield put(addUserError({ ...res }));
}

export function* DeleteUser(action) {
  const { userId, cb } = action.payload;
  const res = yield call(deleteUser, userId);
  if (res.success) {
    yield put(deleteUserSuccess({ ...res }));
    cb();
  } else yield put(deleteUserError({ ...res }));
}

export function* GetUser(action) {
  const { pathParam, cb } = action.payload;
  const res = yield call(getUser, pathParam);
  if (res.success) {
    yield put(getUserSuccess({ ...res }));
    cb({ ...res });
  } else yield put(getUserError({ ...res }));
}

export function* UpdateUser(action) {
  const { data, pathParam, cb } = action.payload;
  // const { fullName, email } = data;
  const res = yield call(updateUser, pathParam, data);
  if (res.success) {
    yield put(updateUserSuccess({ ...res }));
    cb();
  } else yield put(updateUserError({ ...res }));
}

export default function* rootSaga() {
  yield all(
    [yield takeEvery(LOGIN_USER1, LoginUser)],
    [yield takeEvery(GET_USERS, GetUsers)],
    [yield takeEvery(ADD_USER, AddUser)],
    [yield takeEvery(DELETE_USER, DeleteUser)],
    [yield takeEvery(GET_USER, GetUser)],
    [yield takeEvery(UPDATE_USER, UpdateUser)]
  );
}
