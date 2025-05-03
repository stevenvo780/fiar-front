export enum PaymentPeriodicity {
	MONTHLY = 'MONTHLY',
	ANNUAL = 'ANNUAL',
}

export interface Customer {
  id?: number;
  prefix?: number;
  phone?: number;
  lastContact?: string;
  campaign?: string;
  note?: string;
  label?: string[];
  companyName?: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  data1?: string;
  data2?: string;
  data3?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface WppMS {
  id?: number;
  message: string;
  file: string;
  active: boolean;
  order?: number;
  labels?: string[];
  user?: User;
}

export interface WhatsAppSession {
  isConnected: boolean;
  isValid: boolean;
  qrUrl: string;
  timestamp: number;
}

export enum UserRoleOptions {
  NORMAL = 'NORMAL',
  SPECIAL = 'SPECIAL',
  FREE = 'FREE',
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  role: UserRoleOptions;
  confirmEmail: boolean;
  robotStatus: RobotStatus;
}

export interface RobotStatus {
  id: number;
  isEnabled: boolean;
  user: User;
}

export interface RobotMetrics {
  isEnabled: boolean;
  failureRate: number;
  messagesPerMinute: number;
  messagesInPeriod: number;
  messagesPerHour: { hour: string, count: number }[];
  failedMessages: { hour: string, count: number }[];
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

export interface MessageLog {
  id: string;
  recipientNumber: string;
  sent: boolean;
  reason: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    name: string;
    phone: string;
    role: string;
    confirmEmail: boolean | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface MessageLogsResponse {
  data: MessageLog[];
  total: number;
  limit: number;
  offset: number;
}