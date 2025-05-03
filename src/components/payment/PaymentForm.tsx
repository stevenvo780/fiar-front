import React, { useState } from "react";
import { Row, Col, Form, Button, Modal, InputGroup, Spinner, Card, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import RingLoader from "react-spinners/RingLoader";
import usePayments from '@store/payments';
import useUser from '@store/user';
import useUI from '@store/ui';
import { PaymentDetails, CreditCard, UserRoleOptions, PaymentPeriodicity } from '@utils/types';
import axios from "axios";

interface PaymentFormProps {
  planTitle?: string;
  planPrice?: string;
  onPaymentSuccess?: () => void;
  onPaymentError?: (error: any) => void;
  onCancelSubscription?: () => void;
}

const override: any = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 9999
};

const PaymentForm: React.FC<PaymentFormProps> = ({
  planTitle = "Plan Especial",
  planPrice = "88.000",
  onPaymentSuccess,
  onPaymentError,
  onCancelSubscription,
}) => {
  const { payUsers, cancelSubscription, getToken } = usePayments();
  const { user } = useUser();
  const { setLoading, addAlert } = useUI();
  const [expirationDate, setExpirationDate] = useState("");
  const [token, setToken] = useState("");
  const [checked, setChecked] = useState(false);
  const [modal, setModal] = useState(false);
  const [loading, setLoadingLocal] = useState(false);
  const [loadingToken, setLoadingToken] = useState(false);
  const planUser = user?.role || null;
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [billingCycle, setBillingCycle] = useState<PaymentPeriodicity>(PaymentPeriodicity.MONTHLY);

  const [formData, setFormData] = useState<CreditCard>({
    number: "",
    securityCode: "",
    expirationDate: "",
    name: "",
  });

  const handleCreditCardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    const digitsOnly = value.replace(/\D/g, '');

    let formattedValue = '';
    for (let i = 0; i < digitsOnly.length; i += 4) {
      if (i > 0) formattedValue += ' ';
      formattedValue += digitsOnly.substr(i, 4);
    }

    const truncated = formattedValue.slice(0, 19);

    setFormData((prev) => ({
      ...prev,
      number: truncated
    }));
  };

  const handleSecurityCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const digitsOnly = value.replace(/\D/g, '');
    const truncated = digitsOnly.slice(0, 4);

    setFormData((prev) => ({
      ...prev,
      securityCode: truncated
    }));
  };

  const handleExpirationDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const digitsOnly = value.replace(/\D/g, '');

    let formattedValue = '';
    if (digitsOnly.length > 0) {
      const month = digitsOnly.substring(0, 2);
      formattedValue = month;

      if (digitsOnly.length > 2) {
        formattedValue = `${month}/${digitsOnly.substring(2, 4)}`;
      }

      const monthNum = parseInt(month);
      if (monthNum > 12 || monthNum === 0) {
        if (month.length === 2) {
          addAlert({ type: 'danger', message: 'Mes de expiración inválido (01-12)' });
          return;
        }
      }
    }

    setExpirationDate(formattedValue);
  };

  const handleChangeCreditCard = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "name") {
      setFormData((prev) => ({
        ...prev,
        name: value
      }));
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setLoadingLocal(true);

    try {
      const cleanCardNumber = formData.number.replace(/\s/g, '');

      const [month, year] = expirationDate.split("/");

      const creditCardTokenResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_WOMPI_URL}/tokens/cards`,
        {
          number: cleanCardNumber,
          exp_month: month,
          exp_year: year,
          cvc: formData.securityCode,
          card_holder: formData.name
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY}`
          }
        }
      );

      if (creditCardTokenResponse.data.errors) {
        const errorMessage = creditCardTokenResponse.data.errors[0].message;
        addAlert({ type: 'danger', message: errorMessage });
        if (onPaymentError) onPaymentError(errorMessage);
        return;
      }

      const creditCardToken = creditCardTokenResponse.data.data.id as string;

      const data: PaymentDetails = {
        tokenId: creditCardToken,
        tokenValid: token,
        periodicity: billingCycle,
      };

      await payUsers(data);
      setModal(false);

      if (onPaymentSuccess) {
        onPaymentSuccess();
      }

    } catch (error: any) {
      console.error("Error en el pago:", error);
      if (error.response?.data?.error?.messages) {
        for (const message of Object.values(error.response.data.error.messages)) {
          if (Array.isArray(message) && message.length > 0) {
            addAlert({ type: 'danger', message: message[0] });
          }
        }
      } else {
        addAlert({ type: 'danger', message: 'Ocurrió un error al procesar el pago. Por favor intenta de nuevo.' });
      }      
      if (onPaymentError) onPaymentError(error);
    } finally {
      setLoadingLocal(false);
      setLoading(false);
    }
  };

  const toggle = () => setModal(!modal);

  const confirmPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (planUser && planUser === UserRoleOptions.SPECIAL) {
      addAlert({ type: 'danger', message: 'Ya tienes este plan' });
      return;
    }

    if (!token && checked) {
      addAlert({ type: 'danger', message: 'Esperando confirmación de términos y condiciones. Por favor espera un momento.' });
      return;
    }

    if (!checked) {
      addAlert({ type: 'danger', message: 'Por favor acepta los términos y condiciones' });
      return;
    }

    toggle();
  };

  const handleChangeCheckbox = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);

    if (isChecked) {
      try {
        setLoadingToken(true);
        const tokenResult = await getToken();
        if (tokenResult) {
          setToken(tokenResult);
        } else {
          setChecked(false);
          addAlert({ type: 'danger', message: 'Error al obtener el token. Por favor, intenta nuevamente.' });
        }
      } catch (error) {
        console.error("Error al obtener token:", error);
        setChecked(false);
        addAlert({ type: 'danger', message: 'Error al obtener el token. Por favor, intenta nuevamente.' });
      } finally {
        setLoadingToken(false);
      }
    } else {
      setToken("");
    }
  };

  const handleCancel = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowCancelModal(true);
  };

  const confirmCancelSubscription = async () => {
    setLoading(true);
    setLoadingLocal(true);

    try {
      await cancelSubscription();
      if (onCancelSubscription) onCancelSubscription();
    } catch (error) {
      console.error("Error al cancelar suscripción:", error);
      addAlert({ type: 'danger', message: 'Error al cancelar la suscripción' });
    } finally {
      setShowCancelModal(false);
      setLoadingLocal(false);
      setLoading(false);
    }
  };

  const planBenefits = [
    { icon: "fas fa-check-circle", text: "Mensajes ilimitados" },
    { icon: "fas fa-check-circle", text: "Clientes ilimitados" },
    { icon: "fas fa-check-circle", text: "Soporte prioritario" },
    { icon: "fas fa-check-circle", text: "Envíos mas rápidos" },
  ];

  const hasSpecialPlan = (): boolean => {
    return planUser !== null && planUser === UserRoleOptions.SPECIAL;
  };

  const calculatePrice = (basePrice: string, cycle: PaymentPeriodicity): { displayPrice: string, calculatedPrice: number, period: string, savings: string | null } => {
    const numericPrice = parseFloat(basePrice.replace(/\./g, '').replace(',', '.'));
    
    if (cycle === PaymentPeriodicity.MONTHLY) {
      return { 
        displayPrice: basePrice, 
        calculatedPrice: numericPrice,
        period: 'mes',
        savings: null
      };
    } else {
      const annualPrice = numericPrice * 12 * 0.8;
      const savings = numericPrice * 12 * 0.2;
      
      return {
        displayPrice: Math.round(annualPrice).toLocaleString('es-CO').replace(/,/g, '.'),
        calculatedPrice: annualPrice,
        period: 'año',
        savings: Math.round(savings).toLocaleString('es-CO').replace(/,/g, '.')
      };
    }
  };

  const priceInfo = calculatePrice(planPrice, billingCycle);

  const handleBillingCycleChange = (val: PaymentPeriodicity) => {
    setBillingCycle(val);
  };

  return (
    <>
      {loading && <RingLoader
        color={'#0a827f'}
        loading={loading}
        cssOverride={override}
        size={100}
        aria-label="Cargando"
        data-testid="loader"
      />}

      <div className="shadow rounded-lg overflow-hidden">
        {hasSpecialPlan() ? (
          <Row className="g-0">
            <Col md={12} style={{
              background: 'linear-gradient(135deg, #095169, #0a827f)',
              color: 'white',
              padding: '3rem 2rem'
            }}>
              <div className="text-center mb-4">
                <div className="display-1 mb-3">
                  <i className="fas fa-star-circle text-warning"></i>
                </div>
                <h2 className="display-5 fw-bold mb-3">¡Felicidades!</h2>
                <h3 className="h4 mb-4">Ya tienes activo tu {planTitle}</h3>
              </div>

              <div className="row justify-content-center mb-4">
                <div className="col-md-8">
                  <div className="bg-white bg-opacity-10 rounded p-4">
                    <h4 className="mb-3 fw-bold text-center">Beneficios que estás disfrutando:</h4>
                    <div className="row">
                      {planBenefits.map((benefit, index) => (
                        <div key={index} className="col-md-6 mb-3">
                          <div className="d-flex align-items-center">
                            <i className={`${benefit.icon} me-3 fs-4 text-warning`}></i>
                            <span className="fs-5">{benefit.text}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-4">
                <p className="mb-4">Tu suscripción se renovará automáticamente por ${priceInfo.displayPrice}/{priceInfo.period}</p>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleCancel}
                  className="fw-bold"
                >
                  <i className="fas fa-times-circle me-2"></i>
                  Cancelar suscripción
                </Button>
              </div>
            </Col>
          </Row>
        ) : (
          // Vista del formulario de pago cuando no tiene el plan
          <Row className="g-0">
            {/* Tarjeta del plan */}
            <Col md={5} style={{
              background: 'linear-gradient(135deg, #095169, #0a827f)',
              color: 'white',
              padding: '3rem 2rem'
            }}>
              <div className="h-100 d-flex flex-column justify-content-between">
                <div>
                  <h2 className="display-6 fw-bold mb-4">{planTitle}</h2>
                  
                  <div className="mb-4">
                    <div className="d-flex justify-content-center mb-3">
                      <ToggleButtonGroup
                        type="radio"
                        name="billingCycle"
                        value={billingCycle}
                        onChange={handleBillingCycleChange}
                        className="w-100"
                      >
                        <ToggleButton 
                          id="monthly-option" 
                          value={PaymentPeriodicity.MONTHLY}
                          variant={billingCycle === PaymentPeriodicity.MONTHLY ? "light" : "outline-light"}
                          className="w-50"
                        >
                          Mensual
                        </ToggleButton>
                        <ToggleButton 
                          id="annual-option" 
                          value={PaymentPeriodicity.ANNUAL}
                          variant={billingCycle === PaymentPeriodicity.ANNUAL ? "light" : "outline-light"}
                          className="w-50"
                        >
                          Anual
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </div>
                    
                    <h3 className="display-5 fw-bold mb-2">${priceInfo.displayPrice}<small className="fs-6">/{priceInfo.period}</small></h3>
                    
                    {billingCycle === PaymentPeriodicity.ANNUAL && (
                      <div className="bg-white bg-opacity-25 rounded py-2 px-3 mb-3 text-center">
                        <span className="badge bg-warning text-dark me-2">20% DESCUENTO</span>
                        <span>Ahorras ${priceInfo.savings}</span>
                        {/* Mostrar precio equivalente mensual sin decimales */}
                        <div className="small mt-1">Equivale a ${Math.round(priceInfo.calculatedPrice / 12).toLocaleString('es-CO').replace(/,/g, '.')}/mes</div>
                      </div>
                    )}
                  </div>

                  {planBenefits.map((benefit, index) => (
                    <div key={index} className="d-flex align-items-center mb-3">
                      <i className={`${benefit.icon} me-2`}></i>
                      <span>{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Col>

            {/* Formulario de pago */}
            <Col md={7} className="bg-white p-4">
              <h4 className="mb-4">Datos de pago</h4>
              <Form onSubmit={confirmPayment}>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text><i className="fas fa-credit-card"></i></InputGroup.Text>
                    <Form.Control
                      autoComplete="off"
                      required
                      type="text"
                      name="number"
                      id="creditCardNumber"
                      placeholder="Número de tarjeta"
                      value={formData.number}
                      onChange={handleCreditCardChange}
                      maxLength={19}
                    />
                  </InputGroup>
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <InputGroup>
                        <InputGroup.Text><i className="fas fa-lock"></i></InputGroup.Text>
                        <Form.Control
                          autoComplete="off"
                          required
                          type="text"
                          name="securityCode"
                          id="securityCode"
                          placeholder="CVV/CVC"
                          value={formData.securityCode}
                          onChange={handleSecurityCodeChange}
                          maxLength={4}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <InputGroup>
                        <InputGroup.Text><i className="fas fa-calendar"></i></InputGroup.Text>
                        <Form.Control
                          autoComplete="off"
                          required
                          type="text"
                          name="expirationDate"
                          id="expirationDate"
                          placeholder="MM/AA"
                          value={expirationDate}
                          onChange={handleExpirationDateChange}
                          pattern="[0-9]{2}/[0-9]{2}"
                          maxLength={5}
                          title="Por favor ingrese una fecha en formato MM/AA"
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text><i className="fas fa-user"></i></InputGroup.Text>
                    <Form.Control
                      autoComplete="off"
                      required
                      type="text"
                      name="name"
                      id="cardHolderName"
                      placeholder="Titular de la tarjeta"
                      value={formData.name}
                      onChange={handleChangeCreditCard}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-4">
                  <div className="d-flex align-items-center">
                    <Form.Check
                      type="checkbox"
                      checked={checked}
                      onChange={handleChangeCheckbox}
                      id="accept-terms"
                      disabled={loadingToken}
                      className="me-2"
                    />
                    <Form.Label htmlFor="accept-terms" className="mb-0">
                      Acepto los <a href="https://wompi.com/es/co/terminos-condiciones-comercios" target="_blank" rel="noopener noreferrer">términos y condiciones</a> de Wompi
                    </Form.Label>

                    {loadingToken && (
                      <div className="ms-2 d-flex align-items-center">
                        <Spinner animation="border" size="sm" variant="info" />
                        <span className="ms-2 text-muted">Verificando...</span>
                      </div>
                    )}

                    {token && !loadingToken && (
                      <div className="ms-2 text-success">
                        <i className="fas fa-check-circle"></i>
                      </div>
                    )}
                  </div>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={loadingToken || hasSpecialPlan()}
                    size="lg"
                    className="fw-bold"
                  >
                    {loadingToken ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                        Procesando...
                      </>
                    ) : hasSpecialPlan() ? "Ya tienes este plan" : "Suscribirme ahora"}
                  </Button>

                  {hasSpecialPlan() && (
                    <Button
                      variant="danger"
                      onClick={handleCancel}
                      className="mt-2"
                    >
                      Cancelar suscripción
                    </Button>
                  )}
                </div>
              </Form>
            </Col>
          </Row>
        )}
      </div>

      {/* Modal para confirmación de pago */}
      <Modal show={modal} onHide={toggle} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación de Pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Estás a punto de suscribirte al {planTitle} por ${priceInfo.displayPrice}/{priceInfo.period}.</p>
          {billingCycle === PaymentPeriodicity.ANNUAL && (
            <p className="text-success">
              <i className="fas fa-check-circle me-2"></i>
              Has elegido facturación anual con 20% de descuento.
            </p>
          )}
          <p>¿Confirmas este pago?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggle}>Cancelar</Button>
          <Button variant="primary" onClick={handleSubmit}>Confirmar pago</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para confirmación de cancelación de suscripción */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cancelación de Suscripción</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-4">
            <div className="display-4 text-warning mb-3">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
          </div>
          <p className="fw-bold text-center mb-3">Lamentamos que desees cancelar tu suscripción</p>
          <p>Al confirmar la cancelación:</p>
          <ul>
            <li>Tu cuenta perderá el acceso a todas las funcionalidades premium</li>
            <li>No se realizarán más cobros automáticos</li>
            <li>Tu servicio seguirá activo hasta el final del período facturado</li>
          </ul>
          <p className="mt-3">¿Estás seguro de que deseas proceder con la cancelación?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            No, mantener mi plan
          </Button>
          <Button variant="danger" onClick={confirmCancelSubscription}>
            Sí, cancelar suscripción
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PaymentForm;
