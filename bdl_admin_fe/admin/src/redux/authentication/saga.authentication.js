// import { setCurrentUser } from "helpers/Utils";
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { forgetpasswordError, forgetpasswordSuccess, loginError, loginSuccess, logoutError, logoutSuccess } from './actions.authentication';
import { FORGET_PASSWORD, LOGIN, LOGOUT } from './constants.authentication';
import { forgetpassword, login, logout } from './httpCalls.authentication';

export function* Login(action) {
  const res = yield call(login, { ...action.payload });
  // console.log(res, "resssss");
  if (res.success) {
    yield put(loginSuccess({ ...res }));}
  else yield put(loginError({ ...res }));
}

export function* Forgetpassword(action) {
  const res = yield call(forgetpassword, { ...action.payload });
  const { response } = res;
  if (response?.success) yield put(forgetpasswordSuccess({ ...res }));
  else yield put(forgetpasswordError({ ...res }));
}

export function* Logout(action) {
  const res = yield call(logout, { ...action.payload });
  if (res?.success) yield put(logoutSuccess({ ...res }));
  else yield put(logoutError({ ...res }));
}

export default function* rootSaga() {
  yield all(
    [yield takeEvery(LOGIN, Login)],
    [yield takeEvery(FORGET_PASSWORD, Forgetpassword)],
    [yield takeEvery(LOGOUT, Logout)],
    );
}
