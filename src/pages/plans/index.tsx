import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Badge, Modal } from 'react-bootstrap';
import { FaHandshake, FaStore, FaLock, FaUsers, FaChartLine, FaShieldAlt, FaRocket, FaCreditCard } from 'react-icons/fa';
import { FaPlayCircle } from 'react-icons/fa';
import PaymentForm from '@components/payment/PaymentForm';

const PlansPage: React.FC = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <Container className="py-5">
      {/* Hero/Promo Section */}
      <div
        className="text-center mb-5 p-4 mx-auto"
        style={{
          background: 'linear-gradient(90deg, #e6f9f7 0%, #f8fffc 100%)',
          borderRadius: 24,
          border: '2px solid #0a827f22',
          boxShadow: '0 4px 32px 0 #0a827f22',
          maxWidth: 700
        }}
      >
        <h1 className="display-4 fw-bold text-success mb-3">Moderniza tu negocio con nuestro sistema</h1>
        <p className="lead text-muted mb-4">
          Gestiona créditos sin interés, fideliza clientes y haz crecer tu comercio con tecnología segura y fácil de usar.
        </p>
        <Button
          variant="success"
          size="lg"
          className="mt-2 px-4 py-3 fw-bold d-flex align-items-center mx-auto"
          style={{ fontSize: 22, boxShadow: '0 2px 16px 0 #0a827f33' }}
          onClick={() => window.open('https://www.humanizar.co/', '_blank')}
        >
          <FaPlayCircle className="me-2" size={28} />
          Solicita una Demo
        </Button>
        <hr className="my-4" style={{ width: '50%', margin: '2rem auto 0 auto', borderColor: '#0a827f' }} />
      </div>

      {/* Sección de Planes */}
      <div className="text-center mb-4">
        <Badge bg="success" className="mb-2">Planes</Badge>
        <h2 className="display-6 fw-bold">Elige el plan que mejor se adapte a tu negocio</h2>
      </div>
      <Row className="justify-content-center mb-5">
        <Col md={4} className="mb-4">
          <Card className="h-100 border-0 shadow-lg text-center" style={{ transition: 'transform 0.2s', minHeight: 480 }}>
            <Card.Body className="d-flex flex-column align-items-center">
              <Card.Title className="fw-bold fs-3 mb-3">Plan Mensual</Card.Title>
              <div className="display-5 fw-bold text-success mb-2">$30.000</div>
              <div className="text-muted mb-3">COP / mes</div>
              <ul className="list-unstyled mb-4 text-start w-100" style={{ maxWidth: 250 }}>
                <li className="mb-2"><FaShieldAlt className="me-2 text-success" />Todas las funcionalidades</li>
                <li className="mb-2"><FaHandshake className="me-2 text-success" />Soporte prioritario</li>
                <li className="mb-2"><FaRocket className="me-2 text-success" />Actualizaciones incluidas</li>
              </ul>
              <Button
                variant="success"
                size="lg"
                className="w-100 fw-bold"
                style={{ maxWidth: 220 }}
                onClick={() => setShowPaymentModal(true)}
              >
                Elegir Mensual
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card
            className="h-100 border-3 shadow-lg text-center position-relative"
            style={{ borderColor: '#198754', minHeight: 520, boxShadow: '0 0 32px 0 #19875433' }}
          >
            <div style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)' }}>
              <Badge bg="warning" text="dark" className="fs-6 px-3 py-2 shadow">Más popular</Badge>
            </div>
            <Card.Body className="d-flex flex-column align-items-center pt-5">
              <Card.Title className="fw-bold fs-3 mb-3">Plan Anual</Card.Title>
              <div className="display-5 fw-bold text-success mb-2">$330.000</div>
              <div className="text-muted mb-1">COP / año</div>
              <div className="mb-3 small text-success fw-semibold">¡Ahorra $30.000!</div>
              <ul className="list-unstyled mb-4 text-start w-100" style={{ maxWidth: 250 }}>
                <li className="mb-2"><FaShieldAlt className="me-2 text-success" />Todas las funcionalidades</li>
                <li className="mb-2"><FaHandshake className="me-2 text-success" />Soporte prioritario</li>
                <li className="mb-2"><FaRocket className="me-2 text-success" />Actualizaciones incluidas</li>
                <li className="mb-2"><FaChartLine className="me-2 text-success" />Ahorra 1 mes</li>
              </ul>
              <Button
                variant="success"
                size="lg"
                className="w-100 fw-bold"
                style={{ maxWidth: 220 }}
                onClick={() => setShowPaymentModal(true)}
              >
                Elegir Anual
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* CTA Final */}
      <div className="text-center mt-5">
        <h2 className="fw-bold mb-3">¿Listo para transformar tu negocio?</h2>
        <Button
          variant="success"
          size="lg"
          onClick={() => setShowPaymentModal(true)}
        >
          Suscribirse Ahora
        </Button>
      </div>

      {/* Modal de pago con Mercado Pago */}
      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Suscribirse al Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <PaymentForm
            planTitle="Plan Especial"
            planPrice="30.000"
            onPaymentSuccess={() => setShowPaymentModal(false)}
            onPaymentError={() => {}}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PlansPage;
