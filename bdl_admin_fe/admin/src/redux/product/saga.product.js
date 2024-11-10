import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  addProductError,
  addProductSuccess,
  getCategoryError,
  getCategorySuccess,
  getProductError,
  getProductSuccess,
  uploadProductImageError,
  uploadProductImageSuccess,
  deleteProductError,
  deleteProductSuccess,
  updateProductSuccess,
  updateProductError,
  getProductsError,
  getProductsSuccess,
} from './actions.product';
import {
  ADD_PRODUCT,
  GET_CATEGORY,
  GET_PRODUCT,
  UPLOAD_PRODUCT_IMAGE,
  DELETE_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
} from './constants.product';
import {
  addProduct,
  getCategory,
  getProduct,
  uploadProductImage,
  deleteProduct,
  updateProduct,
  getProducts,
} from './httpCalls.product';

export function* GetProducts(action) {
  const res = yield call(getProducts, { ...action.payload });
  if (res.success) yield put(getProductsSuccess({ ...res }));
  else yield put(getProductsError({ ...res }));
}

export function* AddProduct(action) {
  const { data, cb } = action.payload;
  const res = yield call(addProduct, { ...data });
  if (res.success) {
    yield put(addProductSuccess({ ...res }));
    cb();
  } else yield put(addProductError({ ...res }));
}

export function* GetCategory() {
  const res = yield call(getCategory);
  if (res.success) yield put(getCategorySuccess({ ...res }));
  else yield put(getCategoryError({ ...res }));
}

export function* UploadProductImage(action) {
  const { data, cb } = action.payload;
  const res = yield call(uploadProductImage, data);
  cb(res);
  if (res.success) yield put(uploadProductImageSuccess({ ...res }));
  else yield put(uploadProductImageError({ ...res }));
}

export function* DeleteProduct(action) {
  const { productId, cb } = action.payload;
  const res = yield call(deleteProduct, productId);
  if (res.success) {
    yield put(deleteProductSuccess({ ...res }));
    cb();
  } else yield put(deleteProductError({ ...res }));
}
export function* UpdateProduct(action) {
  const { data, pathParam, cb } = action.payload;
  const res = yield call(updateProduct, pathParam, { ...data });
  if (res.success) {
    yield put(updateProductSuccess({ ...res }));
    cb();
  } else yield put(updateProductError({ ...res }));
}
export function* GetProduct(action) {
  const { pathParam, cb } = action.payload;
  const res = yield call(getProduct, pathParam);
  if (res.success) {
    yield put(getProductSuccess({ ...res }));
    cb({ ...res });
  } else yield put(getProductError({ ...res }));
}

export default function* rootSaga() {
  yield all(
    [yield takeEvery(GET_CATEGORY, GetCategory)],
    [yield takeEvery(GET_PRODUCTS, GetProducts)],
    [yield takeEvery(GET_PRODUCT, GetProduct)],
    [yield takeEvery(ADD_PRODUCT, AddProduct)],
    [yield takeEvery(UPLOAD_PRODUCT_IMAGE, UploadProductImage)],
    [yield takeEvery(DELETE_PRODUCT, DeleteProduct)],
    [yield takeEvery(UPDATE_PRODUCT, UpdateProduct)]
  );
}
