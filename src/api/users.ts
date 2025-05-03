import axios from '@utils/axios';
import { AxiosResponse } from 'axios';
import { User } from '@utils/types';

export const getUser = (): Promise<AxiosResponse<User>> => {
  return axios.get('/user');
};

export const updateUserProfile = (userData: any): Promise<AxiosResponse<any>> => {
  return axios.patch(`/user`, userData);
};

export const register = (userData: any): Promise<AxiosResponse<any>> => {
  return axios.post('/register', userData);
};
