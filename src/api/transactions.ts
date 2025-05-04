import axios from '@utils/axios';
import { AxiosResponse } from 'axios';
import { Transaction } from '@utils/types';

export const getTransactionsAPI = (
  page: number = 1,
  limit: number = 50,
  search: string = '',
  order?: 'asc' | 'desc',
  status?: string
): Promise<AxiosResponse<{ data: Transaction[]; total: number; page: number; last_page: number }>> => {
  const params = new URLSearchParams();
  params.append('page', String(page));
  params.append('limit', String(limit));
  if (search) params.append('search', search);
  if (order) params.append('order', order);
  if (status) params.append('status', status);
  return axios.get(`/transactions?${params.toString()}`);
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
