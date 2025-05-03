import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { withAuthSync } from '@utils/auth';
import PaymentForm from '@components/payment/PaymentForm';
import axios from '@utils/axios';
import useUser from '@store/user';
import { UserRoleOptions } from '@utils/types';

interface SubscriptionExpiry {
  nextRenewalAt: string | null;
  message: string;
}

const PlansPage: React.FC = () => {
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionExpiry | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser(); // Obtenemos la información del usuario

  useEffect(() => {
    const fetchSubscriptionExpiry = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/subscription/expiry');
        setSubscriptionInfo(response.data);
        setError(null);
      } catch (err) {
        setError('No se pudo cargar la información de tu suscripción');
        console.error('Error al consultar la expiración de la suscripción:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionExpiry();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Función para determinar el estado de la suscripción
  const getSubscriptionStatus = (): 'active-renewable' | 'active-canceled' | 'none' => {
    if (!subscriptionInfo || !subscriptionInfo.nextRenewalAt) {
      return 'none';
    }
    
    if (user?.role === UserRoleOptions.SPECIAL) {
      return 'active-renewable';
    } else {
      return 'active-canceled';
    }
  };

  const subscriptionStatus = getSubscriptionStatus();
  const hasActiveSubscription = subscriptionStatus === 'active-renewable' || subscriptionStatus === 'active-canceled';

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Plan Premium</h1>
        <p className="lead text-muted">
          Potencia tu negocio con nuestro plan exclusivo
        </p>
        <hr className="my-4" style={{ width: '50%', margin: '0 auto', borderColor: '#0a827f' }} />
      </div>

      <Row className="justify-content-center">
        <Col lg={10}>
          <PaymentForm 
            planTitle="Plan Especial"
            planPrice="88.000"
            onPaymentSuccess={() => console.log('Pago exitoso')}
            onPaymentError={(error) => console.error('Error en el pago:', error)}
            onCancelSubscription={() => console.log('Suscripción cancelada')}
          />
        </Col>
      </Row>

      {/* Sección de información de vencimiento de suscripción - para todos los casos con nextRenewalAt */}
      {!loading && subscriptionInfo?.nextRenewalAt && (
        <Row className="justify-content-center mt-5">
          <Col lg={10}>
            <Card className={`border-0 shadow-sm ${subscriptionStatus === 'active-canceled' ? 'bg-light' : ''}`}>
              <Card.Body className="text-center p-4">
                <div className="subscription-status active">
                  <div className="icon-container mb-3">
                    {subscriptionStatus === 'active-renewable' ? (
                      <i className="fas fa-calendar-check fa-3x text-success"></i>
                    ) : (
                      <i className="fas fa-calendar-times fa-3x text-warning"></i>
                    )}
                  </div>
                  
                  <h3 className={subscriptionStatus === 'active-renewable' ? 'text-success' : 'text-warning'}>
                    Estado de tu plan
                  </h3>
                  
                  {subscriptionStatus === 'active-renewable' ? (
                    <>
                      <p className="lead">
                        <strong>Tu plan está vigente hasta el {formatDate(subscriptionInfo.nextRenewalAt)}</strong>
                      </p>
                      <div className="bg-light p-3 rounded mb-3">
                        <i className="fas fa-sync-alt me-2 text-success"></i>
                        Se renovará automáticamente al llegar a esta fecha para garantizar la continuidad de tu servicio.
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="lead">
                        <strong>Tu plan está vigente hasta el {formatDate(subscriptionInfo.nextRenewalAt)}</strong>
                      </p>
                      <div className="bg-white p-3 rounded mb-3">
                        <i className="fas fa-exclamation-circle me-2 text-warning"></i>
                        Este plan no se renovará automáticamente. Para evitar la interrupción 
                        del servicio al llegar a esta fecha, te recomendamos reactivar tu suscripción.
                      </div>
                    </>
                  )}
                  
                  {subscriptionInfo.message && (
                    <p className="text-muted">
                      {subscriptionInfo.message}
                    </p>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {loading && (
        <Row className="justify-content-center mt-5">
          <Col lg={10} className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </Col>
        </Row>
      )}

      {error && (
        <Row className="justify-content-center mt-5">
          <Col lg={10}>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default withAuthSync(PlansPage);
