import React, { useState, FormEvent } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import logo from '@public/img/Logo.png';
import useUser from '@store/user';
import styles from '@styles/Login.module.css';
import { ProviderName } from '@utils/firebase.config';
import Register from './Register';
import PasswordResetModal from './PasswordResetModal';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const { loginWithEmail, loginWithProvider, resetPassword } = useUser();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    await loginWithEmail(email, password);
    setIsLoading(false);
  };

  const handleRegister = () => {
    setShowRegisterModal(true);
  };

  const handlePasswordReset = async (email: string) => {
    await resetPassword(email);
    setShowPasswordResetModal(false);
  };

  const handleLoginWithProvider = async (providerName: ProviderName) => {
    await loginWithProvider(providerName);
  };

  return (
    <>
      <Container className={styles.loginContainer} fluid>
        <Card className={styles.card}>
          <div className={`${styles.logoContainer} text-center`}>
            <Image fetchPriority="high" src={logo} alt="Logo" width={150} height={150} style={{ objectFit: 'contain' }}/>
          </div>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  placeholder="Correo electrónico"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.formControl}
                />
              </Form.Group>
              
              <Form.Group controlId="formBasicPassword" className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  placeholder="Contraseña"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={styles.formControl}
                />
              </Form.Group>
              
              <Button
                variant="success"
                className="w-100 mb-3"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Cargando...' : 'Iniciar sesión'}
              </Button>
              
              <Button
                variant="secondary"
                className="w-100 mb-3 d-flex align-items-center justify-content-center"
                onClick={() => handleLoginWithProvider('google')}
              >
                <FcGoogle size={20} className="me-2" />
                <span>Continuar con Google</span>
              </Button>
              
              <Button
                variant="link"
                onClick={() => setShowPasswordResetModal(true)}
                className={`w-100 ${styles.forgotPasswordLink}`}
              >
                ¿Olvidaste tu contraseña?
              </Button>
              
              <hr />
              
              <Button
                variant="secondary"
                className="w-100"
                onClick={handleRegister}
              >
                Registrarse
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <Register show={showRegisterModal} handleClose={() => setShowRegisterModal(false)} />
      <PasswordResetModal
        show={showPasswordResetModal}
        handleClose={() => setShowPasswordResetModal(false)}
        handlePasswordReset={handlePasswordReset}
      />
    </>
  );
};

export default Login;
