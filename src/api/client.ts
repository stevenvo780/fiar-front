import axios from '@utils/axios';
import { AxiosResponse } from 'axios';
import { Client } from '@utils/types';

export const getClientAPI = (page: number = 1, limit: number = 50, search: string = ''): Promise<AxiosResponse<{ data: Client[], total: number, page: number, last_page: number }>> => {
  const url = search ? `/clients?page=${page}&limit=${limit}&search=${search}` : `/clients?page=${page}&limit=${limit}`;
  return axios.get(url);
};

export const createClientAPI = (customer: Client): Promise<AxiosResponse<Client>> => {
  return axios.post('/clients', customer);
};

export const updateClientAPI = (id: number, customer: Client): Promise<AxiosResponse<Client>> => {
  return axios.put(`/clients/${id}`, customer);
};

export const deleteClientAPI = (id: number): Promise<AxiosResponse<void>> => {
  return axios.delete(`/clients/${id}`);
};

export const getLabelsAPI = (): Promise<AxiosResponse<string[]>> => {
  return axios.get('/clients/labels');
};

export const uploadClientAPI = (data: { filename: string }): Promise<AxiosResponse<any>> => {
  return axios.post('/clients/massive', data);
};
