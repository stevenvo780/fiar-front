import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../rootReducer';
import { Transaction } from '@utils/types';
import transactionActions from './actions';
import api from '../../api';

const useTransactions = () => {
  const { transactions, loading, error, total, page, lastPage } = useSelector((state: RootState) => state.transactions);
  const dispatch = useDispatch();

  const fetchTransactions = async (pageParam: number = 1, limit: number = 50, search: string = '') => {
    if (loading) return;  // Evita que se dispare si ya está cargando
    transactionActions.setLoading(dispatch, true);
    try {
      const response = await api.transactions.getTransactionsAPI(pageParam, limit, search);
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
  };

  const addTransaction = async (transaction: Transaction) => {
    if (loading) return;  // Evita que se dispare si ya está cargando
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
    if (loading) return;  // Evita que se dispare si ya está cargando
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
    if (loading) return;  // Evita que se dispare si ya está cargando
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
    loading,
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
