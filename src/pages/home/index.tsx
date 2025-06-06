import React from 'react';
import Link from 'next/link';
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
function HomeHeroButtons() {
  return (
    <div className="d-flex flex-wrap gap-3">
      <Link href="/login" passHref>
        <Button
          variant="light"
          size="lg"
        >
          Iniciar Sesión
        </Button>
      </Link>
      <Link href="/plans" passHref>
        <Button
          variant="outline-light"
          size="lg"
        >
          Ver Planes
        </Button>
      </Link>
      <Button
        variant="outline-light"
        size="lg"
        onClick={() => window.open('https://www.humanizar.co/', '_blank')}
      >
        Saber Más
      </Button>
    </div>
  );
}

class Home extends React.Component {
  render() {
    return (
      <div className="bg-light">
        {/* Hero Section */}
        <section className="bg-success text-white py-5">
          <Container>
            <Row className="align-items-center">
              <Col lg={7} className="mb-4 mb-lg-0">
                <h1 className="display-4 fw-bold">Sistema de Créditos sin Interés</h1>
                <p className="lead fs-4 my-4">
                  Permite a comercios &quot;fiar&quot; dinero a clientes de confianza sin complicaciones
                </p>
                <HomeHeroButtons />
              </Col>
              <Col lg={5} className="text-center">
                <img 
                  src="/img/girlcart.png" 
                  alt="Persona pensando con libros" 
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
                  src="/img/student.png" 
                  alt="Persona con carrito de compras" 
                  className="img-fluid rounded shadow"
                  width={500}
                  height={500}
                style={{ maxHeight: '500px' }}
                />
              </Col>
              <Col lg={6}>
                <Badge bg="success" className="mb-2">Sistema Innovador</Badge>
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

        {/* Benefits Section */}
        <section className="py-5 bg-light">
          <Container>
            <Row className="align-items-center">
              <Col lg={5} className="mb-4 mb-lg-0">
                <Badge bg="success" className="mb-2">Ventajas</Badge>
                <h2 className="display-5 fw-bold mb-4">¿Por qué elegir nuestro sistema?</h2>
                
                <div className="d-flex align-items-center mb-4">
                  <div className="text-success me-3">
                    <FaShieldAlt size={30} />
                  </div>
                  <div>
                    <h5 className="mb-1">Seguridad Garantizada</h5>
                    <p className="mb-0">Autenticación robusta y datos protegidos con tecnología blockchain</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-center mb-4">
                  <div className="text-success me-3">
                    <FaRocket size={30} />
                  </div>
                  <div>
                    <h5 className="mb-1">Rápida Implementación</h5>
                    <p className="mb-0">Comience a operar en cuestión de horas con nuestro sistema llave en mano</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-center">
                  <div className="text-success me-3">
                    <FaHandshake size={30} />
                  </div>
                  <div>
                    <h5 className="mb-1">Fidelice a sus Clientes</h5>
                    <p className="mb-0">Ofrezca un valor agregado que incrementa las ventas recurrentes</p>
                  </div>
                </div>
              </Col>
              
              <Col lg={7} className="d-flex justify-content-end align-items-start">
                <img 
                  src="/img/dollar.png" 
                  alt="Moneda en aumento" 
                  className="img-fluid"
                  style={{ maxWidth: 500, maxHeight: 500 }}
                />
              </Col>
            </Row>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-5 bg-success text-white text-center">
          <Container>
            <h2 className="display-5 fw-bold mb-4">¿Listo para modernizar la forma de dar crédito?</h2>
            <p className="lead mb-4 w-75 mx-auto">
              Regístrese hoy y comience a ofrecer crédito sin intereses de forma segura y controlada.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link href="/login" passHref>
                <Button
                  variant="light"
                  size="lg"
                  className="text-dark"
                >
                  Iniciar Sesión
                </Button>
              </Link>
              <Button
                variant="outline-light"
                size="lg"
                onClick={() => window.open('https://www.humanizar.co/', '_blank')}
              >
                Contactar Ventas
              </Button>
            </div>
          </Container>
        </section>
      </div>
    );
  }
}

export default Home;
