import { all, call, put, takeEvery } from 'redux-saga/effects';
import { addAuctionError, addAuctionSuccess, deleteAuctionError, deleteAuctionSuccess, getAuctionCategoryError, getAuctionCategorySuccess, getAuctionError, getAuctionsError, getAuctionsSuccess, getAuctionSuccess, updateAuctionError, updateAuctionSuccess, uploadAuctionImageError, uploadAuctionImageSuccess } from './actions.auction';
import { ADD_AUCTION, DELETE_AUCTION, GET_AUCTION, GET_AUCTIONS, GET_AUCTION_CATEGORY, UPDATE_AUCTION, UPLOAD_AUCTION_IMAGE } from './constants.auction';
import { addAuction, deleteAuction, getAuction, getAuctionCategory, getAuctions, updateAuction, uploadAuctionImage } from './httpCalls.auction';

export function* GetAuctions(action) {
  const res = yield call(getAuctions, { ...action.payload });
  if (res.success) yield put(getAuctionsSuccess({ ...res }));
  else yield put(getAuctionsError({ ...res }));
}

export function* AddAuction(action) {
  const { data, cb } = action.payload;
  const res = yield call(addAuction, { ...data });
  if (res.success) {
    yield put(addAuctionSuccess({ ...res }));
    cb();
  } else yield put(addAuctionError({ ...res }));
}

export function* DeleteAuction(action) {
  const { auctionId, cb } = action.payload;
  const res = yield call(deleteAuction, auctionId);
  if (res.success) {
    yield put(deleteAuctionSuccess({ ...res }));
    cb();
  } else yield put(deleteAuctionError({ ...res }));
}
export function* UpdateAuction(action) {
  const { data, pathParam, cb } = action.payload;
  const res = yield call(updateAuction, pathParam, { ...data });
  if (res.success) {
    yield put(updateAuctionSuccess({ ...res }));
    cb();
  } else yield put(updateAuctionError({ ...res }));
}
export function* GetAuction(action) {
  const { pathParam, cb } = action.payload;
  const res = yield call(getAuction, pathParam);
  if (res.success) {
    yield put(getAuctionSuccess({ ...res }));
    cb({ ...res });
  } else yield put(getAuctionError({ ...res }));
}

export function* GetAuctionCategory() {
  const res = yield call(getAuctionCategory);
  if (res.success) yield put(getAuctionCategorySuccess({ ...res }));
  else yield put(getAuctionCategoryError({ ...res }));
}

export function* UploadAuctionImage(action) {
  const { data, cb } = action.payload;
  const res = yield call(uploadAuctionImage, data);
  cb(res);
  if (res.success) yield put(uploadAuctionImageSuccess({ ...res }));
  else yield put(uploadAuctionImageError({ ...res }));
}



export default function* rootSaga() {
  yield all(
    [yield takeEvery(GET_AUCTIONS, GetAuctions)],
    [yield takeEvery(GET_AUCTION, GetAuction)],
    [yield takeEvery(ADD_AUCTION, AddAuction)],
    [yield takeEvery(DELETE_AUCTION, DeleteAuction)],
    [yield takeEvery(UPDATE_AUCTION, UpdateAuction)]
    [yield takeEvery(GET_AUCTION_CATEGORY, GetAuctionCategory)],
    [yield takeEvery(UPLOAD_AUCTION_IMAGE, UploadAuctionImage)],
  );
}
