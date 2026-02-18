import { useDispatch, useSelector } from 'react-redux';
import axios from '@utils/axios';
import { RootState } from '../rootReducer';
import paymentActions from './actions';
import { User, ValidationResponse } from '@utils/types';
import { useRouter } from 'next/router';
import useUI from '@store/ui';
import useUser from '@store/user';

const usePayments = () => {
  const { paymentDetails, validationResponse } = useSelector((state: RootState) => state.payments);
  const dispatch = useDispatch();
  const { setLoading, addAlert } = useUI();
  const { setUser } = useUser();
  const router = useRouter();

  /**
   * Crea una Preferencia de Checkout Pro en el backend y redirige
   * al usuario a la pasarela segura de Mercado Pago.
   */
  const createPreference = async (data: { planType: string; frequency: string }) => {
    setLoading(true);
    try {
      const response = await axios.post('/mercadopago/subscribe', data);
      const { init_point, sandbox_init_point } = response.data;

      // En desarrollo usar sandbox_init_point, en producción init_point
      const redirectUrl =
        process.env.NODE_ENV === 'production' ? init_point : (sandbox_init_point || init_point);

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        addAlert({ type: 'danger', message: 'No se recibió URL de pago. Intenta de nuevo.' });
      }
    } catch (error: any) {
      console.error(error);
      if (error?.response?.data?.message) {
        addAlert({ type: 'danger', message: error.response.data.message });
      } else if (error?.response?.data?.details) {
        addAlert({ type: 'danger', message: error.response.data.details });
      } else {
        addAlert({ type: 'danger', message: 'Error al iniciar el pago.' });
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
      const response = await axios.get<User>('/mercadopago/cancel-subscription');
      setUser(response.data);
      addAlert({ type: 'success', message: 'Suscripción cancelada con éxito.' });
    } catch (error) {
      console.error(`Error: ${error}`);
      addAlert({ type: 'danger', message: 'Error al cancelar la suscripción.' });
    } finally {
      setLoading(false);
    }
  };

  return {
    paymentDetails,
    validationResponse,
    createPreference,
    validatePay,
    cancelSubscription,
  };
};

export default usePayments;
