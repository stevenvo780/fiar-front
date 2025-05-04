import { Transaction } from '@utils/types';

export interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  lastPage: number;
}

export const initialTransactionState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  lastPage: 1,
};

interface Action {
  type: string;
  payload?: any;
}

const transactionReducer = (
  state: TransactionState = initialTransactionState,
  action: Action
): TransactionState => {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'SET_TRANSACTIONS_TOTAL':
      return { ...state, total: action.payload };
    case 'SET_TRANSACTIONS_PAGE':
      return { ...state, page: action.payload };
    case 'SET_TRANSACTIONS_LAST_PAGE':
      return { ...state, lastPage: action.payload };
    case 'SET_TRANSACTIONS_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_TRANSACTIONS_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default transactionReducer;
