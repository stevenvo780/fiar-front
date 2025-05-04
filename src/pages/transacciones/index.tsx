import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Transactions = () => {
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <Card>
            <Card.Header>
              <h3>Panel de Transacciones</h3>
            </Card.Header>
            <Card.Body>
              <p>Este es un panel básico de transacciones.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Transactions;
