import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { 
  FaCreditCard, 
  FaHandshake, 
  FaStore, 
  FaLock, 
  FaUsers, 
  FaChartLine, 
  FaShieldAlt,
  FaRocket
} from 'react-icons/fa';

const Home = () => {
  return (
    <div className="bg-light">
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={7} className="mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold">Sistema de Créditos sin Interés</h1>
              <p className="lead fs-4 my-4">
                Permite a comercios &quot;fiar&quot; dinero a clientes de confianza sin complicaciones
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Button variant="light" size="lg">Comenzar Ahora</Button>
                <Button variant="outline-light" size="lg">Saber Más</Button>
              </div>
            </Col>
            <Col lg={5} className="text-center">
              <img 
                src="/credit-illustration.svg" 
                alt="Sistema de Créditos" 
                className="img-fluid"
                style={{ maxHeight: '350px' }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* ¿Qué es? Section */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <img 
                src="/store-credit.svg" 
                alt="Crédito para Comercios" 
                className="img-fluid rounded shadow"
              />
            </Col>
            <Col lg={6}>
              <Badge bg="primary" className="mb-2">Sistema Innovador</Badge>
              <h2 className="display-5 fw-bold mb-4">¿Qué es nuestro sistema?</h2>
              <p className="lead">
                No somos un banco. Somos una solución que permite a comercios (alimentos, sector primario) 
                integrar crédito sin intereses en su POS o software de e-commerce.
              </p>
              <p>
                Un sistema moderno para &quot;fiar&quot; a clientes de confianza, con todas las 
                seguridades y controles que su negocio necesita.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-white">
        <Container>
          <div className="text-center mb-5">
            <Badge bg="primary" className="mb-2">Funcionalidades</Badge>
            <h2 className="display-5 fw-bold">Características Principales</h2>
            <p className="lead w-75 mx-auto">
              Nuestro sistema ofrece todo lo que necesita para gestionar créditos sin interés en su negocio
            </p>
          </div>

          <Row className="g-4">
            <Col md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-primary mb-3">
                    <FaHandshake size={40} />
                  </div>
                  <Card.Title className="fw-bold">Sin Tasas de Interés</Card.Title>
                  <Card.Text>
                    Ofrezca crédito a sus clientes sin cobrarles intereses, fortaleciendo la relación comercial.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-primary mb-3">
                    <FaStore size={40} />
                  </div>
                  <Card.Title className="fw-bold">Multi-tenant</Card.Title>
                  <Card.Text>
                    Cada comercio ve exclusivamente sus propios datos, garantizando privacidad y seguridad.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-primary mb-3">
                    <FaLock size={40} />
                  </div>
                  <Card.Title className="fw-bold">Inmutabilidad On-Chain</Card.Title>
                  <Card.Text>
                    Transacciones registradas en blockchain, garantizando transparencia y seguridad.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-primary mb-3">
                    <FaCreditCard size={40} />
                  </div>
                  <Card.Title className="fw-bold">Gestión de Transacciones</Card.Title>
                  <Card.Text>
                    Controle todas las transacciones de crédito y pagos con un sistema de aprobación intuitivo.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-primary mb-3">
                    <FaUsers size={40} />
                  </div>
                  <Card.Title className="fw-bold">Control de Clientes</Card.Title>
                  <Card.Text>
                    Administre clientes, establezca límites de crédito y marque a sus clientes de confianza.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-primary mb-3">
                    <FaChartLine size={40} />
                  </div>
                  <Card.Title className="fw-bold">Notificaciones en Tiempo Real</Card.Title>
                  <Card.Text>
                    Reciba alertas sobre nuevas solicitudes, aprobaciones y pagos de créditos.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col lg={5} className="mb-4 mb-lg-0">
              <Badge bg="primary" className="mb-2">Ventajas</Badge>
              <h2 className="display-5 fw-bold mb-4">¿Por qué elegir nuestro sistema?</h2>
              
              <div className="d-flex align-items-center mb-4">
                <div className="text-primary me-3">
                  <FaShieldAlt size={30} />
                </div>
                <div>
                  <h5 className="mb-1">Seguridad Garantizada</h5>
                  <p className="mb-0">Autenticación robusta y datos protegidos con tecnología blockchain</p>
                </div>
              </div>
              
              <div className="d-flex align-items-center mb-4">
                <div className="text-primary me-3">
                  <FaRocket size={30} />
                </div>
                <div>
                  <h5 className="mb-1">Rápida Implementación</h5>
                  <p className="mb-0">Comience a operar en cuestión de horas con nuestro sistema llave en mano</p>
                </div>
              </div>
              
              <div className="d-flex align-items-center">
                <div className="text-primary me-3">
                  <FaHandshake size={30} />
                </div>
                <div>
                  <h5 className="mb-1">Fidelice a sus Clientes</h5>
                  <p className="mb-0">Ofrezca un valor agregado que incrementa las ventas recurrentes</p>
                </div>
              </div>
            </Col>
            
            <Col lg={7}>
              <img 
                src="/benefits-illustration.svg" 
                alt="Beneficios del Sistema" 
                className="img-fluid"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white text-center">
        <Container>
          <h2 className="display-5 fw-bold mb-4">¿Listo para modernizar la forma de dar crédito?</h2>
          <p className="lead mb-4 w-75 mx-auto">
            Regístrese hoy y comience a ofrecer crédito sin intereses de forma segura y controlada.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button variant="light" size="lg">Crear Cuenta</Button>
            <Button variant="outline-light" size="lg">Contactar Ventas</Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
