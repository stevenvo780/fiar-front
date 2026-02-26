import { FC } from 'react';
import { Modal, Button, ListGroup, Container, Card, Badge, Row, Col } from 'react-bootstrap';
import { FaTrashAlt, FaArrowDown, FaArrowUp, FaUser, FaIdCard, FaPhone, FaEnvelope, FaMapMarkerAlt, FaMoneyBillWave, FaWallet, FaShieldAlt, FaBan, FaCalendarAlt } from 'react-icons/fa';
import { Client, Transaction } from '@utils/types';
import styles from '@styles/ClientDetailModal.module.css';

const formatCurrency = (amount: number) =>
  amount.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });

const OperationBadge = ({ operation }: { operation?: 'income' | 'expense' }) => {
  if (operation === 'income') {
    return (
      <Badge pill bg="success" style={{ backgroundColor: '#198754', color: 'white' }}>
        <FaArrowDown style={{ marginRight: 4 }} />
        Abono
      </Badge>
    );
  }
  if (operation === 'expense') {
    return (
      <Badge pill bg="danger" style={{ backgroundColor: '#dc3545', color: 'white' }}>
        <FaArrowUp style={{ marginRight: 4 }} />
        Préstamo
      </Badge>
    );
  }
  return (
    <Badge pill bg="secondary">
      Desconocido
    </Badge>
  );
};

// Definición de las propiedades que recibe el componente
interface ClientDetailModalProps {
  show: boolean; // Controla si el modal está visible
  onHide: () => void; // Función para cerrar el modal
  client: Client | null; // Información del cliente
}

// Componente funcional que recibe las propiedades
const ClientDetailModal: FC<ClientDetailModalProps> = ({ show, onHide, client }) => {
  // Función placeholder para eliminar un cliente
  const deleteClient = (clientId: number) => {
    console.log(`Deleting client with ID: ${clientId}`);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {client && (
          <>
            {/* Cabecera de cliente */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: '#dee2e6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 16, flexShrink: 0 }}>
                <FaUser style={{ fontSize: '1.6rem', color: '#6c757d' }} />
              </div>
              <div>
                <h5 style={{ margin: 0, fontWeight: 700, color: '#2c3e50' }}>{client.name} {client.lastname}</h5>
                <div style={{ display: 'flex', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
                  {client.trusted && <Badge bg="success"><FaShieldAlt style={{ marginRight: 4 }} />Confiable</Badge>}
                  {client.blocked && <Badge bg="danger"><FaBan style={{ marginRight: 4 }} />Bloqueado</Badge>}
                  {!client.trusted && !client.blocked && <Badge bg="secondary">Cliente regular</Badge>}
                </div>
              </div>
            </div>

            <Row className="g-3 mb-3">
              {/* Tarjetas de saldo */}
              <Col xs={6}>
                <div style={{ backgroundColor: '#fff5f5', borderRadius: '10px', padding: '12px', textAlign: 'center', border: '1px solid #f5c6cb' }}>
                  <FaMoneyBillWave style={{ color: '#dc3545', marginBottom: 4, fontSize: '1.3rem' }} />
                  <div style={{ fontSize: '0.75rem', color: '#6c757d' }}>Limite de credito</div>
                  <div style={{ fontWeight: 700, color: '#dc3545', fontSize: '1.1rem' }}>{formatCurrency(client.credit_limit || 0)}</div>
                </div>
              </Col>
              <Col xs={6}>
                <div style={{ backgroundColor: (client.current_balance || 0) >= 0 ? '#f0fff4' : '#fff5f5', borderRadius: '10px', padding: '12px', textAlign: 'center', border: `1px solid ${(client.current_balance || 0) >= 0 ? '#c3e6cb' : '#f5c6cb'}` }}>
                  <FaWallet style={{ color: (client.current_balance || 0) >= 0 ? '#198754' : '#dc3545', marginBottom: 4, fontSize: '1.3rem' }} />
                  <div style={{ fontSize: '0.75rem', color: '#6c757d' }}>Saldo disponible</div>
                  <div style={{ fontWeight: 700, color: (client.current_balance || 0) >= 0 ? '#198754' : '#dc3545', fontSize: '1.1rem' }}>{formatCurrency(client.current_balance || 0)}</div>
                </div>
              </Col>
            </Row>

            {/* Información de contacto */}
            <Card className="mb-3" style={{ border: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', borderRadius: '10px' }}>
              <Card.Body>
                <h6 style={{ color: '#6c757d', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Informacion de contacto</h6>
                <Row className="g-2">
                  {client.document && (
                    <Col xs={12} sm={6}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <FaIdCard style={{ color: '#6c757d', minWidth: 16 }} />
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#adb5bd' }}>Documento</div>
                          <div style={{ fontWeight: 600 }}>{client.document}</div>
                        </div>
                      </div>
                    </Col>
                  )}
                  {client.phone && (
                    <Col xs={12} sm={6}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <FaPhone style={{ color: '#6c757d', minWidth: 16 }} />
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#adb5bd' }}>Telefono</div>
                          <div style={{ fontWeight: 600 }}>{client.phone}</div>
                        </div>
                      </div>
                    </Col>
                  )}
                  {client.email && (
                    <Col xs={12} sm={6}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <FaEnvelope style={{ color: '#6c757d', minWidth: 16 }} />
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#adb5bd' }}>Correo</div>
                          <div style={{ fontWeight: 600 }}>{client.email}</div>
                        </div>
                      </div>
                    </Col>
                  )}
                  {(client.city || client.state || client.direction) && (
                    <Col xs={12} sm={6}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <FaMapMarkerAlt style={{ color: '#6c757d', minWidth: 16 }} />
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#adb5bd' }}>Ubicacion</div>
                          <div style={{ fontWeight: 600 }}>{[client.direction, client.city, client.state].filter(Boolean).join(', ')}</div>
                        </div>
                      </div>
                    </Col>
                  )}
                  {client.created_at && (
                    <Col xs={12} sm={6}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <FaCalendarAlt style={{ color: '#6c757d', minWidth: 16 }} />
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#adb5bd' }}>Registrado</div>
                          <div style={{ fontWeight: 600 }}>{new Date(client.created_at).toLocaleDateString('es-CO')}</div>
                        </div>
                      </div>
                    </Col>
                  )}
                </Row>
              </Card.Body>
            </Card>

            {/* Historial de Transacciones */}
            <Card style={{ border: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', borderRadius: '10px' }}>
              <Card.Body>
                <h6 style={{ color: '#6c757d', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Ultimas transacciones</h6>
                {client.transactions && client.transactions.length > 0 ? (
                  <ListGroup variant="flush">
                    {client.transactions.map((transaction: Transaction, index) => (
                      <ListGroup.Item key={transaction.id || index} style={{ paddingLeft: 0, paddingRight: 0, border: 'none', borderBottom: '1px solid #f1f3f5' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: transaction.operation === 'income' ? '#d1fae5' : '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {transaction.operation === 'income'
                                ? <FaArrowDown style={{ color: '#198754' }} />
                                : <FaArrowUp style={{ color: '#dc3545' }} />
                              }
                            </div>
                            <div>
                              <OperationBadge operation={transaction.operation} />
                              <div style={{ fontSize: '0.75rem', color: '#adb5bd', marginTop: 2 }}>
                                <FaCalendarAlt style={{ marginRight: 4 }} />{new Date(transaction.createdAt!).toLocaleDateString('es-CO')}
                              </div>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: 700, color: transaction.operation === 'income' ? '#198754' : '#dc3545' }}>
                              {transaction.operation === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#adb5bd' }}>{transaction.status}</div>
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <p style={{ color: '#adb5bd', textAlign: 'center', margin: 0 }}>Sin transacciones registradas.</p>
                )}
              </Card.Body>
            </Card>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        {/* Botón para eliminar el cliente */}
        <Button
          className={styles.btnDelete}
          onClick={() => deleteClient(client?.id ?? 0)}
        >
          <FaTrashAlt style={{ marginRight: '5px' }} /> Eliminar
        </Button>
        {/* Botón para cerrar el modal */}
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClientDetailModal;
