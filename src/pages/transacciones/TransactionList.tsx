import React, { FC, useState, useEffect } from 'react';
import { Row, Col, Card, Dropdown, Modal, Button, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaInfoCircle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Transaction as TransactionBase } from '@utils/types';
import styles from '@styles/Transactions.module.css';

// Extiende la interfaz Transaction para incluir client opcional
interface Client {
  name?: string;
  email?: string;
  // Agrega más campos si es necesario
}
interface Transaction extends TransactionBase {
  client?: Client;
}

interface TransactionListProps {
  transactions: Transaction[];
  handleShowModal: (transaction: Transaction) => void;
  updateTransactionSelect: (id: string) => void;
  onStatusChange: (id: string, status: 'pending' | 'approved' | 'rejected') => Promise<void>;
}

const TransactionList: FC<TransactionListProps> = ({
  transactions,
  handleShowModal,
  updateTransactionSelect,
  onStatusChange,
}) => {
  // Sincroniza el estado local si cambian las transacciones del prop
  const [localTransactions, setLocalTransactions] = useState<Transaction[]>(transactions);
  useEffect(() => {
    setLocalTransactions(transactions);
  }, [transactions]);

  // Estado para el modal de historial
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Formatea el monto como moneda
  const formatCurrency = (amount: number) =>
    amount.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });

  // Devuelve un badge de estado con color
  const StatusBadge = ({ status }: { status: 'pending' | 'approved' | 'rejected' }) => (
    <Badge pill bg={
      status === 'approved' ? 'success'
      : status === 'rejected' ? 'danger'
      : 'warning'
    }>
      {status === 'approved' ? (
        <>
          <FaCheckCircle style={{ marginRight: 4 }} />
          Aprobado
        </>
      ) : status === 'rejected' ? (
        <>
          <FaTimesCircle style={{ marginRight: 4 }} />
          Rechazado
        </>
      ) : (
        <>
          <FaInfoCircle style={{ marginRight: 4 }} />
          Pendiente
        </>
      )}
    </Badge>
  );

  // Actualiza el estado de una transacción localmente
  const handleStatusChange = async (id: Transaction['id'], status: 'pending' | 'approved' | 'rejected') => {
    setLocalTransactions(prev =>
      prev.map(tx =>
        tx.id === id ? { ...tx, status } : tx
      )
    );
    await onStatusChange(id, status);
  };

  // Abre el modal y selecciona la transacción
  const handleShowHistory = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowHistoryModal(true);
  };

  // Cierra el modal
  const handleCloseHistory = () => {
    setShowHistoryModal(false);
    setSelectedTransaction(null);
  };

  return (
    <>
      {/* Lista de transacciones */}
      <Row>
        {localTransactions.map((transaction, idx) => (
          <Col key={transaction.id ?? idx} xs={12} md={4} lg={3} className="mb-3">
            <Card
              className={styles['transaction-card']}
              style={{
                boxShadow: '0 2px 10px #e3e3e3',
                borderRadius: 16,
                transition: 'box-shadow 0.2s, background 0.2s',
                background: '#f7f9fa'
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#e9ecef'; // gris claro, baja saturación
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px #d1d1d1';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = '#f7f9fa';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 10px #e3e3e3';
              }}
            >
              <Card.Body className="d-flex flex-column justify-content-between h-100">
                {/* Información de la transacción */}
                <div className={styles['data-row']} style={{ marginBottom: 8 }}>
                  <span className={styles['data-label']}>Monto:</span>
                  <span className={styles['data-value']} style={{ fontWeight: 600, color: '#6c757d' /* secondary */ }}>
                    {formatCurrency(transaction.amount)}
                  </span>
                </div>
                <div className={styles['data-row']} style={{ marginBottom: 8 }}>
                  <span className={styles['data-label']}>Estado:</span>
                  <span className={styles['data-value']}>
                    <StatusBadge status={transaction.status} />
                  </span>
                </div>
                <div className={styles['data-row']} style={{ marginBottom: 8 }}>
                  <span className={styles['data-label']}>Fecha:</span>
                  <span className={styles['data-value']}>
                    {transaction.created_at
                      ? new Date(transaction.created_at).toLocaleDateString()
                      : 'Sin fecha'}
                  </span>
                </div>

                {/* Dropdown de aprobación y Botón Ver más en una fila */}
                <div className="mt-2">
                  <Row>
                    <Col xs={7}>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant={
                            transaction.status === 'approved' ? 'success'
                            : transaction.status === 'rejected' ? 'danger'
                            : 'warning'
                          }
                          id={`dropdown-status-${transaction.id}`}
                          size="sm"
                          className="w-100"
                          style={{ borderRadius: 8 }}
                        >
                          {transaction.status === 'approved' ? 'Aprobado'
                            : transaction.status === 'rejected' ? 'Rechazado'
                            : 'Pendiente'
                          }
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            active={transaction.status === 'approved'}
                            onClick={() => handleStatusChange(transaction.id, 'approved')}
                          >
                            <FaCheckCircle style={{ color: '#198754', marginRight: 6 }} />
                            Aprobado
                          </Dropdown.Item>
                          <Dropdown.Item
                            active={transaction.status === 'pending'}
                            onClick={() => handleStatusChange(transaction.id, 'pending')}
                          >
                            <FaInfoCircle style={{ color: '#ffc107', marginRight: 6 }} />
                            Pendiente
                          </Dropdown.Item>
                          <Dropdown.Item
                            active={transaction.status === 'rejected'}
                            onClick={() => handleStatusChange(transaction.id, 'rejected')}
                          >
                            <FaTimesCircle style={{ color: '#dc3545', marginRight: 6 }} />
                            Rechazado
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                    <Col xs={5}>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Ver detalles de la transacción</Tooltip>}
                      >
                        <button
                          className="btn btn-info btn-sm w-100"
                          style={{
                            borderRadius: 8,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#6c757d', // secondary, más opaco
                            borderColor: '#6c757d',
                            color: '#fff'
                          }}
                          onClick={() => handleShowHistory(transaction)}
                        >
                          <FaInfoCircle style={{ marginRight: 4, color: '#fff' }} />
                        </button>
                      </OverlayTrigger>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal de historial */}
      <Modal show={showHistoryModal} onHide={handleCloseHistory} centered>
        <Modal.Header closeButton style={{ borderBottom: 'none' }}>
          <Modal.Title>
            <FaInfoCircle style={{ color: '#3aafa9', marginRight: 8 }} />
            Historial de Transacción
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTransaction ? (
            <div>
              {/* Bloque de información de la transacción */}
              <div style={{
                marginBottom: '1.5rem',
                borderBottom: '1px solid #e3e3e3',
                paddingBottom: '1rem',
                background: '#f8f9fa',
                borderRadius: 8,
                padding: 12
              }}>
                <h6 className="mb-2" style={{ color: '#17252a' }}>Datos de la Transacción</h6>
                <div><strong>ID:</strong> {selectedTransaction.id}</div>
                <div><strong>Monto:</strong> {formatCurrency(selectedTransaction.amount)}</div>
                <div>
                  <strong>Estado:</strong>{' '}
                  <StatusBadge status={selectedTransaction.status} />
                </div>
                <div>
                  <strong>Fecha:</strong>{' '}
                  {selectedTransaction.created_at
                    ? new Date(selectedTransaction.created_at).toLocaleString()
                    : 'Sin fecha'}
                </div>
              </div>
              {/* Bloque de información del cliente */}
              <div style={{
                background: '#f8f9fa',
                borderRadius: 8,
                padding: 12
              }}>
                <h6 className="mb-2" style={{ color: '#17252a' }}>Datos del Cliente</h6>
                {selectedTransaction.client ? (
                  <>
                    <div><strong>Nombre:</strong> {selectedTransaction.client.name}</div>
                    <div><strong>Email:</strong> {selectedTransaction.client.email}</div>
                  </>
                ) : (
                  <div>No hay información del cliente.</div>
                )}
              </div>
            </div>
          ) : (
            <div>No hay información de la transacción.</div>
          )}
        </Modal.Body>
        <Modal.Footer style={{ borderTop: 'none' }}>
          <Button variant="outline-secondary" onClick={handleCloseHistory} style={{ borderRadius: 8 }}>
            <p style={{ margin: 0, color: 'black' }}>Cerrar</p>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TransactionList;
