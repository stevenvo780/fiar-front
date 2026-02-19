import React, { useEffect, useState } from "react";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import useUser from "@store/user";

const PaymentSuccess: React.FC = () => {
  const router = useRouter();
  const { fetchUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        className="text-center border-0 p-5"
        style={{ maxWidth: 520, borderRadius: 20, boxShadow: '0 8px 32px rgba(16,185,129,0.1)' }}
      >
        <Card.Body>
          {loading ? (
            <Spinner animation="border" variant="success" />
          ) : (
            <>
              <div className="d-inline-flex align-items-center justify-content-center mb-4" style={{ width: 80, height: 80, borderRadius: '50%', background: '#ecfdf5' }}>
                <HiOutlineCheckCircle size={48} className="text-success" />
              </div>
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
