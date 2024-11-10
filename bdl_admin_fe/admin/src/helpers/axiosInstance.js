import axios from 'axios';

const axiosInstance = axios.create({
  // TODO: Restore below code when in production
  // baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000',
  baseURL: `${process.env.REACT_APP_NODE_SERVER_API_BASE_URL}/v1`,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // TODO: Do something with config and add jwt if availabe;
    config.headers.Authorization = 'JWT_TOKEN';
    return config;
  },
  (err) => {
    // do something with error
    return Promise.reject(err);
  }
);

// Note:- returned data is strickly based on schemas of the backend
axiosInstance.interceptors.response.use(
  (res) => {
    // do something with response
    const { data, status } = res;
    return { ...data, status };
  },
  (err) => {
    // do something with error
    if (err.message === 'Network Error')
      return {
        success: false,
        message: 'Network Error',
        metdata: {},
      };
    const { data, status } = err.response;
    return { ...data, status };
  }
);

export default axiosInstance;
