import React from 'react';
import { Container, Row } from 'react-bootstrap';

const Footer = () => (
  <Container fluid className="footer-container" style={{ padding: '15px', display: 'flex', justifyContent: 'flex-end' }}>
    <Row style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
      <p style={{ margin: '0', textAlign: 'right' }}>© Copyright Humanizar.</p>
    </Row>
  </Container>
);

export default Footer;
