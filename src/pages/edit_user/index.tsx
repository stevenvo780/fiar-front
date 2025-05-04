import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import useUser from '@store/user';
import { withAuthSync } from '@utils/auth';

const EditProfile: React.FC = () => {
  const { user, fetchUser, updateUserProfile, changePassword, token } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    apiKey: '', // Nuevo campo
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [apiUser, setApiUser] = useState<any>(null);

  const API_URL = process.env.NEXT_PUBLIC_API || 'http://172.23.146.224:8080/api';

  // Llama a fetchUser si hay token y no hay usuario cargado
  useEffect(() => {
    console.log('token:', token);
    console.log('user:', user);

    if (!user && token) {
      setLoading(true);
      setError(null);
      fetchUser()
        .catch((err: any) => {
          setError('Error al obtener el usuario');
          console.error('Error al obtener el usuario:', err);
        })
        .finally(() => setLoading(false));
    } else if (user) {
      setLoading(false);
    }
  }, [token, user]);

  // Obtener usuario por ID usando fetch y guardar en apiUser
  useEffect(() => {
    if (token) {
      setLoading(true);
      fetch(`${API_URL}/user/me/data`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          if (!res.ok) throw new Error('Error al obtener usuario');
          return res.json();
        })
        .then(data => {
          setApiUser({
            ...data,
            apiKey: data.apiKey ?? data.api_key ?? '', // Soporta ambas variantes
          });
          setError(null);
        })
        .catch(err => {
          setError('Error al obtener usuario');
          setApiUser(null);
          console.error('Error al obtener usuario:', err);
        })
        .finally(() => setLoading(false));
    }
  }, [token, API_URL]);

  // Actualiza el formulario cuando los datos del usuario estén disponibles (prioriza apiUser)
  useEffect(() => {
    const u = apiUser || user;
    if (u) {
      setFormData({
        email: u.email || '',
        name: u.name || '',
        apiKey: u.apiKey ?? u.api_key ?? '',
      });
    }
  }, [apiUser, user]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await updateUserProfile(formData);
      // Refresca los datos del usuario después de actualizar
      const updated = await fetchUser();
      setApiUser({
        ...(updated || {}),
        apiKey: (updated && ((updated as any).apiKey ?? (updated as any).api_key)) || '',
      });
      setSuccess('Perfil actualizado correctamente');
    } catch (err) {
      setError('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = (e: FormEvent) => {
    e.preventDefault();
    changePassword(passwordData.currentPassword, passwordData.newPassword);
  };

  if (loading) {
    return (
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }} className="text-center">
            <Spinner animation="border" />
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <h2>Editar Perfil</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Correo electrónico"
              />
            </Form.Group>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nombre"
              />
            </Form.Group>
            <Form.Group controlId="formApiKey" className="mb-3">
              <Form.Control
                type="text"
                name="apiKey"
                value={formData.apiKey}
                onChange={handleInputChange}
                placeholder="API Key"
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginTop: '20px' }}>
              Actualizar
            </Button>
          </Form>
        </Col>
        <Col md={{ span: 6, offset: 3 }}>
          <br />
          <h2 >Cambiar Contraseña</h2>
          <Form onSubmit={handleChangePassword}>
            <Form.Group controlId="formCurrentPassword" className="mb-3">
              <Form.Control
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Contraseña actual"
              />
            </Form.Group>
            <Form.Group controlId="formNewPassword" className="mb-3">
              <Form.Control
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Nueva contraseña"
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginTop: '20px' }}>
              Cambiar Contraseña
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default withAuthSync(EditProfile);
