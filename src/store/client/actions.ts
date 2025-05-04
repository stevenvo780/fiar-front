import { Dispatch } from 'react';
import { Client } from '@utils/types';

const actions = {
  setClient: (dispatch: Dispatch<any>, client: Client[]) => {
    dispatch({ type: 'SET_CUSTOMERS', payload: client });
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

  addClient: (dispatch: Dispatch<any>, customer: Client) => {
    dispatch({ type: 'ADD_CUSTOMER', payload: customer });
  },

  updateClient: (dispatch: Dispatch<any>, customer: Client) => {
    dispatch({ type: 'UPDATE_CUSTOMER', payload: customer });
  },

  deleteClient: (dispatch: Dispatch<any>, id: number) => {
    dispatch({ type: 'DELETE_CUSTOMER', payload: id });
  },

  setLabels: (dispatch: Dispatch<any>, labels: any[]) => {
    dispatch({ type: 'SET_LABELS', payload: labels });
  },
};

export default actions;
