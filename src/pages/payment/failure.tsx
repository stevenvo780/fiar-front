import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { FaTimesCircle } from "react-icons/fa";

const PaymentFailure: React.FC = () => {
  const router = useRouter();

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "70vh" }}
    >
      <Card
        className="text-center shadow-lg border-0 p-5"
        style={{ maxWidth: 520 }}
      >
        <Card.Body>
          <FaTimesCircle size={72} className="text-danger mb-4" />
          <h2 className="fw-bold mb-3">Pago no completado</h2>
          <p className="text-muted mb-4">
            Tu pago no pudo ser procesado. Esto puede ocurrir por fondos
            insuficientes, datos incorrectos o un problema temporal.
          </p>
          {router.query.payment_id && (
            <p className="small text-muted mb-3">
              ID de pago: <code>{router.query.payment_id}</code>
            </p>
          )}
          <div className="d-flex gap-3 justify-content-center">
            <Button
              variant="outline-secondary"
              size="lg"
              onClick={() => router.push("/home")}
            >
              Ir al inicio
            </Button>
            <Button
              variant="danger"
              size="lg"
              className="fw-bold"
              onClick={() => router.push("/plans")}
            >
              Intentar de nuevo
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PaymentFailure;
