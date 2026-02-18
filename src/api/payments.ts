import axios from '@utils/axios';
import { AxiosResponse } from 'axios';
import { User, ValidationResponse } from '@utils/types';

/**
 * Crea una preferencia de Checkout Pro.
 * Retorna init_point y sandbox_init_point para redirección.
 */
export const createPreferenceAPI = (data: {
  planType: string;
  frequency: string;
}): Promise<AxiosResponse<any>> => {
  return axios.post('/mercadopago/subscribe', data);
};

/**
 * Consulta el estado de un pago por su ID (usado en página de retorno).
 */
export const getPaymentStatusAPI = (
  paymentId: string,
): Promise<AxiosResponse<any>> => {
  return axios.get(`/mercadopago/payment-status/${paymentId}`);
};

export const validatePayAPI = (): Promise<AxiosResponse<ValidationResponse>> => {
  return axios.post('/validatePay');
};

export const cancelSubscriptionAPI = (): Promise<AxiosResponse<User>> => {
  return axios.get('/mercadopago/cancel-subscription');
};
