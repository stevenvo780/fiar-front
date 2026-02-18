import React, { useEffect, useState } from "react";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import { FaCheckCircle } from "react-icons/fa";
import useUser from "@store/user";

const PaymentSuccess: React.FC = () => {
  const router = useRouter();
  const { fetchUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Refrescar datos del usuario para obtener la suscripción actualizada
    const refresh = async () => {
      try {
        await fetchUser();
      } catch (e) {
        console.error("Error refrescando usuario:", e);
      } finally {
        setLoading(false);
      }
    };
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {loading ? (
            <Spinner animation="border" variant="success" />
          ) : (
            <>
              <FaCheckCircle size={72} className="text-success mb-4" />
              <h2 className="fw-bold mb-3">¡Pago exitoso!</h2>
              <p className="text-muted mb-4">
                Tu suscripción ha sido activada correctamente. Ya puedes
                disfrutar de todas las funcionalidades premium.
              </p>
              {router.query.payment_id && (
                <p className="small text-muted mb-3">
                  ID de pago: <code>{router.query.payment_id}</code>
                </p>
              )}
              <Button
                variant="success"
                size="lg"
                className="fw-bold px-5"
                onClick={() => router.push("/home")}
              >
                Ir al inicio
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PaymentSuccess;
