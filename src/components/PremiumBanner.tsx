import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import useUser from '@store/user';
import PaymentForm from './payment/PaymentForm';

const PremiumBanner: React.FC = () => {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);
  
  if (!user || user.role !== "FREE") {
    return null;
  }
  
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <div 
        className="py-2" 
        style={{ 
          backgroundColor: '#FFF9C4', 
          borderBottom: '1px solid #FFE082',
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col xs={12} md={8} className="d-flex align-items-center">
              <i className="fas fa-star text-warning me-2" style={{ fontSize: '1.2rem' }}></i>
              <span className="me-2">
                <strong>Plan Gratis:</strong> Tu cuenta tiene funcionalidades limitadas.
              </span>
              <span className="d-none d-md-inline">
                Actualiza a Premium para disfrutar de soporte prioritario, mensajes y clientes ilimitados.
              </span>
            </Col>
            <Col xs={12} md={4} className="text-md-end mt-2 mt-md-0">
              <Button 
                variant="warning" 
                size="sm" 
                className="fw-bold px-3"
                onClick={handleShow}
              >
                <i className="fas fa-crown me-1"></i> Actualizar a Premium
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualiza a Plan Premium</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <PaymentForm 
            planTitle="Plan Especial"
            planPrice="30.000"
            onPaymentSuccess={handleClose}
            onPaymentError={() => {}}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PremiumBanner;
