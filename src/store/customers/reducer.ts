import { Client } from '@utils/types';

export interface CustomerState {
  customers: Client[];
  labels: { value: string, label: string }[];
  loading: boolean;
  alertMessage: string | null;
  totalPages: number;
  page: number;
  lastPage: number;
}

export const initialCustomerState: CustomerState = {
  customers: [],
  labels: [{ value: '', label: 'Etiqueta' }],
  loading: false,
  alertMessage: null,
  totalPages: 1,
  page: 1,
  lastPage: 1,
};

interface Action {
  type: string;
  payload?: any;
}

const customerReducer = (state: CustomerState = initialCustomerState, action: Action): CustomerState => {
  switch (action.type) {
    case 'SET_CUSTOMERS':
      return { ...state, customers: action.payload };
    case 'SET_LABELS':
      return { ...state, labels: action.payload };
    case 'ADD_CUSTOMER':
      return { ...state, customers: [...state.customers, action.payload] };
    case 'UPDATE_CUSTOMER':
      return { ...state, customers: state.customers.map(customer => customer.id === action.payload.id ? action.payload : customer) };
    case 'DELETE_CUSTOMER':
      return { ...state, customers: state.customers.filter(customer => customer.id !== action.payload) };
    case 'SET_TOTAL_PAGES':
      return { ...state, totalPages: action.payload };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_LAST_PAGE':
      return { ...state, lastPage: action.payload };
    default:
      return state;
  }
};

export default customerReducer;
