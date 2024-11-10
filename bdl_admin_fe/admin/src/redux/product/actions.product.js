import {
  ADD_PRODUCT,
  ADD_PRODUCT_ERROR,
  ADD_PRODUCT_SUCCESS,
  GET_CATEGORY,
  GET_CATEGORY_SUCCESS,
  DELETE_PRODUCT,
  DELETE_PRODUCT_ERROR,
  DELETE_PRODUCT_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_SUCCESS,
  UPLOAD_PRODUCT_IMAGE,
  UPLOAD_PRODUCT_IMAGE_ERROR,
  UPLOAD_PRODUCT_IMAGE_SUCCESS,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  GET_PRODUCT,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
} from './constants.product';

export const getProducts = (params) => {
  return {
    type: GET_PRODUCTS,
    payload: { ...params },
  };
};
export const getProductsSuccess = (data) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: { ...data },
});
export const getProductsError = (message) => ({
  type: GET_PRODUCTS_ERROR,
  payload: message,
});

export const addProduct = (data, cb) => {
  return {
    type: ADD_PRODUCT,
    payload: { data, cb },
  };
};
export const addProductSuccess = (data) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: { ...data },
});
export const addProductError = (message) => ({
  type: ADD_PRODUCT_ERROR,
  payload: message,
});

export const getCategory = () => {
  return {
    type: GET_CATEGORY,
  };
};
export const getCategorySuccess = (data) => ({
  type: GET_CATEGORY_SUCCESS,
  payload: { ...data },
});
export const getCategoryError = (message) => ({
  type: ADD_PRODUCT_ERROR,
  payload: message,
});

export const uploadProductImage = (data, cb) => {
  return {
    type: UPLOAD_PRODUCT_IMAGE,
    payload: { data, cb },
  };
};
export const uploadProductImageSuccess = (data) => ({
  type: UPLOAD_PRODUCT_IMAGE_SUCCESS,
  payload: { ...data },
});
export const uploadProductImageError = (message) => ({
  type: UPLOAD_PRODUCT_IMAGE_ERROR,
  payload: message,
});
export const deleteProduct = (productId, cb) => {
  return {
    type: DELETE_PRODUCT,
    payload: { productId, cb },
  };
};
export const deleteProductSuccess = (data) => {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    payload: { data },
  };
};
export const deleteProductError = (data) => {
  return {
    type: DELETE_PRODUCT_ERROR,
    payload: { data },
  };
};

export const updateProduct = (pathParam, data, cb) => {
  return {
    type: UPDATE_PRODUCT,
    payload: { pathParam, data, cb },
  };
};
export const updateProductSuccess = (data) => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload: { ...data },
});
export const updateProductError = (message) => ({
  type: UPDATE_PRODUCT_ERROR,
  payload: message,
});

export const getProduct = (pathParam, cb) => {
  return {
    type: GET_PRODUCT,
    payload: { pathParam, cb },
  };
};
export const getProductSuccess = (data) => ({
  type: GET_PRODUCT_SUCCESS,
  payload: { ...data },
});
export const getProductError = (message) => ({
  type: GET_PRODUCT_ERROR,
  payload: message,
});
