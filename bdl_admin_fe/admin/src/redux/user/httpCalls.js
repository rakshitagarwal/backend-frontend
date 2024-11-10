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

export async function loginUser(userData) {
  try {
    const res = await axiosInstance.post('login', { ...userData });
    console.log(res);
  } catch (err) {
    const res = err;
    console.log(res);
  }
  return { ...dummyUser };
}

export async function getUsers(params) {
  try {
    const res = await axiosInstance.get('/users/', {
       ...params ,
    });
    return { ...res };
  } catch (err) {
    return { ...err };
  }
}

export async function deleteUser(userId) {
  try {
    const res = await axiosInstance.delete(`/users/${userId}`);
    return { ...res };
  } catch (err) {
    return { ...err };
  }
}

export async function addUser(data) {
  try {
    const res = await axiosInstance.post('/users/', { ...data });
    return { ...res };
  } catch (err) {
    return { ...err };
  }
}

export async function getUser(pathParam) {
  try {
    const res = await axiosInstance.get(`/users/${pathParam}`);
    return { ...res };
  } catch (err) {
    return { ...err };
  }
}

export async function updateUser(pathParam, data) {
  try {
    const res = await axiosInstance.put(`/users/${pathParam}`, { ...data });
    return { ...res };
  } catch (err) {
    return { ...err };
  }
}
