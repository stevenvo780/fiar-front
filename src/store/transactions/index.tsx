import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../rootReducer';
import { Transaction } from '@utils/types';
import transactionActions from './actions';
import api from '../../api';
import { useCallback } from 'react';

const useTransactions = () => {
  const { transactions, error, total, page, lastPage } = useSelector((state: RootState) => state.transactions);
  const dispatch = useDispatch();

  const fetchTransactions = useCallback(
    async (
      pageParam: number = 1,
      limitParam: number = 50,
      clientSearch: string = '',
      orderFilter: 'reciente' | 'antiguo' = 'reciente',
      statusFilter: 'todos' | 'aprobado' | 'no_aprobado' = 'todos',
      minAmount?: number,
      maxAmount?: number,
      startDate?: string,
      endDate?: string
    ) => {
      transactionActions.setLoading(dispatch, true);
      try {
        const apiOrder = orderFilter === 'antiguo' ? 'asc' : 'desc';
        let apiStatus: string | undefined;
        if (statusFilter === 'aprobado') apiStatus = 'approved';
        else if (statusFilter === 'no_aprobado') apiStatus = 'rejected';
        const response = await api.transactions.getTransactionsAPI(
          pageParam,
          limitParam,
          clientSearch,
          apiOrder,
          apiStatus,
          minAmount,
          maxAmount,
          startDate,
          endDate
        );
        transactionActions.setTransactions(dispatch, response.data.data);
        transactionActions.setTotal(dispatch, response.data.total);
        transactionActions.setPage(dispatch, response.data.page);
        transactionActions.setLastPage(dispatch, response.data.last_page);
        transactionActions.setError(dispatch, null);
      } catch (err: any) {
        transactionActions.setError(dispatch, err.message || 'Error al obtener transacciones');
      } finally {
        transactionActions.setLoading(dispatch, false);
      }
    },
    [dispatch]
  );

  const addTransaction = async (transaction: Transaction) => {
    transactionActions.setLoading(dispatch, true);
    try {
      const response = await api.transactions.addTransactionAPI(transaction);
      transactionActions.addTransaction(dispatch, response.data);
      transactionActions.setError(dispatch, null);
    } catch (err: any) {
      transactionActions.setError(dispatch, err.message || 'Error al agregar transacción');
    } finally {
      transactionActions.setLoading(dispatch, false);
    }
  };

  const updateTransaction = async (id: string, transaction: Transaction) => {
    transactionActions.setLoading(dispatch, true);
    try {
      const response = await api.transactions.updateTransactionAPI(id, transaction);
      transactionActions.updateTransaction(dispatch, response.data);
      transactionActions.setError(dispatch, null);
    } catch (err: any) {
      transactionActions.setError(dispatch, err.message || 'Error al actualizar transacción');
    } finally {
      transactionActions.setLoading(dispatch, false);
    }
  };

  const deleteTransaction = async (id: string) => {
    transactionActions.setLoading(dispatch, true);
    try {
      await api.transactions.deleteTransactionAPI(id);
      transactionActions.deleteTransaction(dispatch, id);
      transactionActions.setError(dispatch, null);
    } catch (err: any) {
      transactionActions.setError(dispatch, err.message || 'Error al eliminar transacción');
    } finally {
      transactionActions.setLoading(dispatch, false);
    }
  };

  const downloadExcel = async () => {
    // Implementa aquí si tienes endpoint para descargar excel
  };

  return {
    transactions,
    error,
    total,
    page,
    lastPage,
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    downloadExcel,
  };
};

export default useTransactions;
