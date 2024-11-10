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

export async function getAuctions(params) {
  try {
    const res = await axiosInstance.get('/auctions/', {
      params: { ...params },
    });
    return { ...res };
  } catch (err) {
    return { ...err };
  }
}

export async function addAuction(data) {
  try {
    const res = await axiosInstance.post('/auctions/', { ...data });
    return { ...res };
  } catch (err) {
    return { ...err };
  }
}

export async function deleteAuction(auctionId) {
  try {
    const res = await axiosInstance.delete(`/auctions/${auctionId}`);
    return { ...res };
  } catch (err) {
    return { ...err };
  }
}

export async function updateAuction(pathParam, data) {
  try {
    const res = await axiosInstance.put(`/auctions/${pathParam}`, { ...data });
    return { ...res };
  } catch (err) {
    return { ...err };
  }
}

export async function getAuction(pathParam) {
  try {
    const res = await axiosInstance.get(`/auctions/${pathParam}`);
    return { ...res };
  } catch (err) {
    return { ...err };
  }
}

export async function getAuctionCategory() {
  try {
    const res = await axiosInstance.get('/auctions/category/');
    return { ...res };
  } catch (err) {
    return { ...err };
  }
}

export async function uploadAuctionImage(data) {
  try {
    const res = await axiosInstance.post('/uploads/', data, {
      headers: {
        'content-type': 'multipart/form-data',
        boundary: 'data.name',
      },
      params: { moduleName: 'auction' },
    });
    return { ...res };
  } catch (err) {
    return { ...err };
  }
}

