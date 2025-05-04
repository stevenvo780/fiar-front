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
          <div className="text-center">
            <Image fetchPriority="high" src={logo} alt="Logo" width={200} height={200} />
          </div>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Ingresa el correo electrónico</Form.Label>
                <Form.Control
                  placeholder="Correo electrónico"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.formControl}
                />
              </Form.Group>
              <br />
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Agrega la contraseña</Form.Label>
                <Form.Control
                  placeholder="Contraseña"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={styles.formControl}
                />
              </Form.Group>
              <br />
              <Button
                style={{ width: '100%' }}
                className="btn btn-success btn-block mb-3"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Cargando...' : 'Iniciar sesión'}
              </Button>
              <Button
                style={{ width: '100%' }}
                className="btn btn-secondary btn-block mb-3 d-flex align-items-center"
                onClick={() => handleLoginWithProvider('google')}
              >
                <FcGoogle size={24} className="mr-3" />
                <span className="flex-grow-1 text-center">Continuar con Google</span>
              </Button>
              <Button
                style={{ width: '100%' }}
                variant="link"
                onClick={() => setShowPasswordResetModal(true)}
                className={styles.forgotPasswordLink}
              >
                ¿Olvidaste tu contraseña?
              </Button>
              <hr />
              <Button
                style={{ width: '100%' }}
                className="btn btn-secondary btn-block"
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
