import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import todoSagas from './todo/saga';
import chatSagas from './chat/saga';
import productSaga from './product/saga.product';
import surveyListSagas from './surveyList/saga';
import surveyDetailSagas from './surveyDetail/saga';
import userSaga from './user/sagas';
import authenticationSaga from './authentication/saga.authentication';
import auctionSaga from './auction/saga.auction';

export default function* rootSaga() {
  yield all([
    authSagas(),
    todoSagas(),
    chatSagas(),
    surveyListSagas(),
    surveyDetailSagas(),
    userSaga(),
    productSaga(),
    authenticationSaga(),
    auctionSaga(),
  ]);
}
