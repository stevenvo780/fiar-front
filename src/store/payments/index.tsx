import { useDispatch, useSelector } from 'react-redux';
import axios from '@utils/axios';
import { RootState } from '../rootReducer';
import paymentActions from './actions';
import { PaymentDetails, User, ValidationResponse } from '@utils/types';
import { useRouter } from 'next/router';
import useUI from '@store/ui';
import useUser from '@store/user';

const usePayments = () => {
  const { paymentDetails, validationResponse } = useSelector((state: RootState) => state.payments);
  const dispatch = useDispatch();
  const { setLoading, addAlert } = useUI();
  const { setUser, logout } = useUser();
  const router = useRouter();

  const payUsers = async (details: PaymentDetails) => {
    setLoading(true);
    try {
      const response = await axios.post<PaymentDetails>('/payUsers', details);
      paymentActions.setPaymentDetails(dispatch, response.data);
      addAlert({ type: 'success', message: 'Pago creado con éxito.' });
      setUser(response.data);
    } catch (error: any) {
      console.error(error);
      if (error?.response?.data?.message){
        addAlert({ type: 'danger', message: error.response.data.message });
      } else {
        addAlert({ type: 'danger', message: 'Error al crear el pago.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const validatePay = async () => {
    setLoading(true);
    try {
      const response = await axios.post<ValidationResponse>('/validatePay');
      paymentActions.setValidationResponse(dispatch, response.data);
      addAlert({ type: 'success', message: 'Validación de pago exitosa.' });
    } catch (error) {
      console.error(`Error: ${error}`);
      addAlert({ type: 'danger', message: 'Ocurrió un error, consulta a soporte' });
    } finally {
      setLoading(false);
    }
  };

  const cancelSubscription = async () => {
    setLoading(true);
    try {
      const response = await axios.get<User>('/cancelSubscription');
      setUser(response.data);
      addAlert({ type: 'success', message: 'Suscripción cancelada con éxito.' });
    } catch (error) {
      console.error(`Error: ${error}`);
      addAlert({ type: 'danger', message: 'Error al cancelar la suscripción.' });
    } finally {
      setLoading(false);
    }
  };

  const getToken = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_WOMPI_URL}/merchants/${process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY}`);
      return response.data.data.presigned_acceptance.acceptance_token;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return {
    paymentDetails,
    validationResponse,
    payUsers,
    validatePay,
    cancelSubscription,
    getToken,
  };
};

export default usePayments;
