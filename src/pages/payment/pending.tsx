import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { FaClock } from "react-icons/fa";

const PaymentPending: React.FC = () => {
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
          <FaClock size={72} className="text-warning mb-4" />
          <h2 className="fw-bold mb-3">Pago pendiente</h2>
          <p className="text-muted mb-4">
            Tu pago está siendo procesado. Esto puede tomar unos minutos.
            Recibirás una confirmación una vez que sea aprobado.
          </p>
          {router.query.payment_id && (
            <p className="small text-muted mb-3">
              ID de pago: <code>{router.query.payment_id}</code>
            </p>
          )}
          <p className="text-muted small mb-4">
            Si pagaste en efectivo (Efecty, Baloto, etc.), puede tomar hasta 2
            horas hábiles en reflejarse.
          </p>
          <Button
            variant="warning"
            size="lg"
            className="fw-bold px-5"
            onClick={() => router.push("/home")}
          >
            Ir al inicio
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PaymentPending;
