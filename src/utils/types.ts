export enum PaymentPeriodicity {
	MONTHLY = 'MONTHLY',
	ANNUAL = 'ANNUAL',
}
export interface User {
  id?: string;
  created_at?: Date;
  email: string;
  updated_at?: Date;
  name: string;
  role: UserRoleOptions;
  phone?: string | null;
  apiKey?: string;
}

export interface Profile {
  id?: string;
  user_id?: string;
  commerce_name?: string;
  phone?: string | null;
  created_at?: Date;
}

export interface Client {
  id?: number;
  owner_id?: string;
  email?: string;  // añadido campo de correo electrónico
  document?: string;
  lastname?: string;
  name?: string;
  credit_limit?: number;
  current_balance?: number;
  trusted?: boolean;
  created_at?: string;
  blocked?: boolean;
  city?: string;
  state?: string;
  direction?: string;
  phone?: string;
  label?: string[];
  transactions?: Transaction[];
}

export interface Transaction {
  id: string;
  client_id: string;
  owner_id: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  detail: any;
  createdAt: Date;
  updatedAt: Date;
  txn_hash: string;
}

export interface UpdateTransaction {
  id?: string;
  status?: 'pending' | 'approved' | 'rejected';
  amount?: number;
  detail?: any;
}

export interface BlockchainLog {
  id?: string;
  entity?: string;
  entity_id?: string;
  txn_hash?: string;
  contract_address?: string;
  network?: string;
  block_number?: number;
  signature?: string;
  proof?: any;
  created_at?: Date;
}

export interface Action {
  type: string;
  payload?: any;
}

export interface CreditCard {
  number: string;
  securityCode: string;
  expirationDate: string;
  name: string;
}

export interface PaymentDetails {
  tokenId: string;
  tokenValid: string;
  periodicity: PaymentPeriodicity;
}

export interface ValidationResponse {
  status: string;
  transactionId: string;
  message: string;
}

export interface Plans {
  id: string;
  label: string;
  price: string;
  orders: string;
  sm: string;
}

export enum UserRoleOptions {
  NORMAL = 'NORMAL',
  SPECIAL = 'SPECIAL',
  FREE = 'FREE',
}

