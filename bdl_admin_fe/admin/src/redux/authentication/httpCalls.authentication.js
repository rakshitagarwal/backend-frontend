import axiosInstance from 'helpers/axiosInstance';
import { setCurrentUser } from 'helpers/Utils';

export async function login(params) {
  try {
    console.log(params, "params");
    const res = await axiosInstance.post('/users/login', { ...params });
    if (res.success) {
      const userDetails = {
        userToken: res?.data.accessToken,
        userEmail: res?.data.userInfo.email,
      };
      setCurrentUser(userDetails);
    }
    return {
      ...res,
    };
  } catch (err) {
    return { ...err };
  }
}

export async function logout() {
  try {
    const res = await axiosInstance.post('/users/logout');
    return {
      ...res,
    };
  } catch (err) {
    return { ...err };
  }
}

export async function forgetpassword(data) {
  try {
    // TODO: uncomment this when api is ready 
    // const res = await axiosInstance.post(`/forgot-password/${mailId}`, { data });
    const res = {
      response:{
        success: true,
        message: 'Please check your mail'
      }
    }
    console.log(data, res);

    return { ...res };
  } catch (err) {
    return { ...err };
  }
}