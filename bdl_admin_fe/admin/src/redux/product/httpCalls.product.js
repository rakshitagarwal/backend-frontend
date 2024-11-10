/* eslint-disable no-unused-vars */
import axiosInstance from 'helpers/axiosInstance';

const dummyUser = {
  name: 'prashant chauhan',
  priviliages: [
    'ADD_PRODUCT',
    'REMOVE_PRODUCT',
    'DELETE_PRODUCT',
    'VIEW_PRODUCT',
    'ACTIVATE_PRODUCT',
    'DEACTIVATE_PRODUCT',
    'ADD_AUCTION',
    'REMOVE_AUCTION',
    'UPDATE_AUCTION',
    'VIEW_AUCTION',
    'ACTIVATE_AUCTION',
    'DEACTIVATE_AUCTION',
    'ADD_USER',
    'REMOVE_USER',
    'UPDATE_USER',
    'VIEW_USER',
    'ACTIVATE_USER',
    'DEACTIVATE_USER',
    'VIEW_BIDLOG',
    'CREATE_ROLE',
    'ASSIGN_ROLE',
    'VIEW_WALLET_TRANSACTIONS',
    'ACTIVATE_WALLET',
    'DEACTIVATE_WALLET',
  ],
};

export async function getProducts(params) {
  try {
    const res = await axiosInstance.get('/products/', {
      params: { ...params },
    });
    return { ...res };
  } catch (err) {
    return { ...err };
  }
}

export async function addProduct(data) {
  try {
    const res = await axiosInstance.post('/products/', { ...data });
    return { ...res };
  } catch (err) {
    return { ...err };
  }
}

export async function deleteProduct(productId) {
  try {
    const res = await axiosInstance.delete(`/products/${productId}`);
    return { ...res };
  } catch (err) {
    return { ...err };
  }
}

export async function getCategory() {
  try {
    const res = await axiosInstance.get('/products/category/');
    return { ...res };
  } catch (err) {
    return { ...err };
  }
}

export async function uploadProductImage(data) {
  try {
    const res = await axiosInstance.post('/uploads/', data, {
      headers: {
        'content-type': 'multipart/form-data',
        boundary: 'data.name',
      },
      params: { moduleName: 'products' },
    });
    return { ...res };
  } catch (err) {
    return { ...err };
  }
}

export async function updateProduct(pathParam, data) {
  try {
    const res = await axiosInstance.put(`/products/${pathParam}`, { ...data });
    return { ...res };
  } catch (err) {
    return { ...err };
  }
}

export async function getProduct(pathParam) {
  try {
    const res = await axiosInstance.get(`/products/${pathParam}`);
    return { ...res };
  } catch (err) {
    return { ...err };
  }
}
