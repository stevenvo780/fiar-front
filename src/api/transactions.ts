import axios from '@utils/axios';
import { AxiosResponse } from 'axios';
import { Transaction } from '@utils/types';

export const getTransactionsAPI = (
  page: number = 1,
  limit: number = 50,
  search: string = ''
): Promise<AxiosResponse<{ data: Transaction[]; total: number; page: number; last_page: number }>> => {
  const url = search
    ? `/transactions/search?page=${page}&limit=${limit}&search=${search}`
    : `/transactions?page=${page}&limit=${limit}`;
  return axios.get(url);
};

export const addTransactionAPI = (transaction: Transaction): Promise<AxiosResponse<Transaction>> => {
  return axios.post('/transactions', transaction);
};

export const updateTransactionAPI = (id: string, transaction: Transaction): Promise<AxiosResponse<Transaction>> => {
  return axios.put(`/transactions/${id}`, transaction);
};

export const deleteTransactionAPI = (id: string): Promise<AxiosResponse<void>> => {
  return axios.delete(`/transactions/${id}`);
};
