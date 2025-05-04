import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../rootReducer';
import { auth, compatAuth, providers, EmailAuthProvider } from '@utils/firebase.config';
import { useRouter } from 'next/router';
import userActions from './actions';
import api from '../../api';
import useUI from '@store/ui';
import firebase from 'firebase/compat/app';
import { reauthenticateWithCredential, updatePassword } from 'firebase/auth';

const useUser = () => {
  const { token, user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const { setLoading, addAlert } = useUI();

  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await compatAuth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      if (user) {
        const token = await user.getIdToken();
        userActions.setToken(dispatch, token);
        router.push('/home');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      addAlert({ type: 'danger', message: 'Error en contraseña o correo' });
    } finally {
      setLoading(false);
    }
  };

  const loginWithProvider = async (providerName: keyof typeof providers) => {
    setLoading(true);
    try {
      const provider = providers[providerName];
      const result = await compatAuth.signInWithPopup(provider);
      const user = result.user;
      if (user) {
        const token = await user.getIdToken();
        userActions.setToken(dispatch, token);
        router.push('/home');
      }
    } catch (error) {
      console.error(`Error al iniciar sesión con ${providerName}:`, error);
      addAlert({ type: 'danger', message: `Error al iniciar sesión con ${providerName}` });
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      await compatAuth.sendPasswordResetEmail(email);
      addAlert({ type: 'success', message: 'Correo de recuperación enviado' });
    } catch (error) {
      console.error('Error al enviar el correo de recuperación:', error);
      addAlert({ type: 'danger', message: 'Error al enviar el correo de recuperación' });
    } finally {
      setLoading(false);
    }
  };

  const reauthenticate = async (currentPassword: string) => {
    const user = auth.currentUser;
    if (user && user.email) {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      try {
        await reauthenticateWithCredential(user, credential);
        return true;
      } catch (error) {
        console.error('Error al reautenticar:', error);
        addAlert({ type: 'danger', message: 'Error al reautenticar. Por favor verifica tu contraseña actual.' });
        return false;
      }
    }
    return false;
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      console.log('user', user);
      if (user) {
        const reauthenticated = await reauthenticate(currentPassword);
        if (reauthenticated) {
          await updatePassword(user, newPassword);
          addAlert({ type: 'success', message: 'Contraseña actualizada exitosamente' });
        }
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      addAlert({ type: 'danger', message: 'Error al cambiar la contraseña' });
    } finally {
      setLoading(false);
    }
  };

  const renewToken = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        const newToken = await user.getIdToken(true);
        userActions.setToken(dispatch, newToken);
      }
    } catch (error) {
      console.error('Error al renovar el token:', error);
      addAlert({ type: 'danger', message: 'Sesión expirada, por favor inicia sesión nuevamente' });
      userActions.clearUser(dispatch);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await api.users.getUser();
      userActions.setUser(dispatch, response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      addAlert({ type: 'danger', message: 'Error al obtener la información del usuario' });
    } finally {
      setLoading(false);
    }
  };

  const setUser = (userData: any) => {
    userActions.setUser(dispatch, userData);
  };

  const updateUserProfile = async (profileData: any) => {
    setLoading(true);
    try {
      await api.users.updateUserProfile(profileData);
      addAlert({ type: 'success', message: 'Perfil actualizado exitosamente' });
      fetchUser();
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      addAlert({ type: 'danger', message: 'Error al actualizar el perfil' });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    dispatch(userActions.resetStore());
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const registerUser = async (userData: any) => {
    setLoading(true);
    try {
      const response = await api.users.register(userData);
      if (response.data.uid) {
        addAlert({ type: 'success', message: 'Registro exitoso' });
        router.push('/login');
      } else if (response.data.message) {
        addAlert({ type: 'danger', message: response.data.message });
      }
    } catch (error) {
      console.error('Ocurrió un error al registrar:', error);
      addAlert({ type: 'danger', message: 'Error al registrar' });
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = () => !!token;

  return {
    token,
    user,
    loginWithEmail,
    loginWithProvider,
    resetPassword,
    changePassword,
    renewToken,
    fetchUser,
    updateUserProfile,
    logout,
    isAuthenticated,
    registerUser,
    reauthenticate,
    setUser,
  };
};

export default useUser;
