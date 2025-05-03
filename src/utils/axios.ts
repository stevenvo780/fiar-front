import axios, { AxiosInstance } from 'axios';
import { getToken, renewToken, clearSession } from '@store/helpers';

const service: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

service.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if ((error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await renewToken();
        const token = getToken();
        if (token) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return service(originalRequest);
        }
      } catch (renewError) {
        clearSession();
        return Promise.reject(renewError);
      }
    }

    if (originalRequest._retry && (error.response.status === 401 || error.response.status === 403)) {
      clearSession();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default service;
