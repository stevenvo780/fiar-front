import axios from '@utils/axios';
import { AxiosResponse } from 'axios';
import { Client } from '@utils/types';

export const getCustomersAPI = (page: number = 1, limit: number = 50, search: string = ''): Promise<AxiosResponse<{ data: Client[], total: number, page: number, last_page: number }>> => {
  const url = search ? `/customers/search?page=${page}&limit=${limit}&search=${search}` : `/customers/user?page=${page}&limit=${limit}`;
  return axios.get(url);
};

export const createCustomerAPI = (customer: Client): Promise<AxiosResponse<Client>> => {
  return axios.post('/customers', customer);
};

export const updateCustomerAPI = (id: number, customer: Client): Promise<AxiosResponse<Client>> => {
  return axios.put(`/customers/${id}`, customer);
};

export const deleteCustomerAPI = (id: number): Promise<AxiosResponse<void>> => {
  return axios.delete(`/customers/${id}`);
};

export const getLabelsAPI = (): Promise<AxiosResponse<string[]>> => {
  return axios.get('/customers/labels');
};

export const uploadCustomersAPI = (data: { filename: string }): Promise<AxiosResponse<any>> => {
  return axios.post('/customers/massive', data);
};
