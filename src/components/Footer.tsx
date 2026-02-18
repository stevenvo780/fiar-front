import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => (
  <Container fluid className="footer-container" style={{ padding: '15px', display: 'flex', justifyContent: 'center' }}>
    <p style={{ margin: '0', textAlign: 'center', color: '#6D4C41', fontSize: '0.9rem' }}>© Copyright Humanizar.</p>
  </Container>
);

export default Footer;
