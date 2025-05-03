import { Dispatch } from 'react';
import { Client } from '@utils/types';

const actions = {
  setCustomers: (dispatch: Dispatch<any>, customers: Client[]) => {
    dispatch({ type: 'SET_CUSTOMERS', payload: customers });
  },

  setTotalPages: (dispatch: Dispatch<any>, totalPages: number) => {
    dispatch({ type: 'SET_TOTAL_PAGES', payload: totalPages });
  },

  setPage: (dispatch: Dispatch<any>, page: number) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  },

  setLastPage: (dispatch: Dispatch<any>, lastPage: number) => {
    dispatch({ type: 'SET_LAST_PAGE', payload: lastPage });
  },

  addCustomer: (dispatch: Dispatch<any>, customer: Client) => {
    dispatch({ type: 'ADD_CUSTOMER', payload: customer });
  },

  updateCustomer: (dispatch: Dispatch<any>, customer: Client) => {
    dispatch({ type: 'UPDATE_CUSTOMER', payload: customer });
  },

  deleteCustomer: (dispatch: Dispatch<any>, id: number) => {
    dispatch({ type: 'DELETE_CUSTOMER', payload: id });
  },

  setLabels: (dispatch: Dispatch<any>, labels: any[]) => {
    dispatch({ type: 'SET_LABELS', payload: labels });
  },
};

export default actions;
