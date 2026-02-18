import axios from '@utils/axios';
import { AxiosResponse } from 'axios';
import { User } from '@utils/types';

/**
 * Crea una suscripción recurrente (PreApproval) en Mercado Pago.
 * Retorna init_point para redirección al checkout de MP.
 */
export const createSubscriptionAPI = (data: {
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

export const cancelSubscriptionAPI = (): Promise<AxiosResponse<User>> => {
  return axios.get('/mercadopago/cancel-subscription');
};
