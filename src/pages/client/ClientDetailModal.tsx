import { FC } from 'react';
import { Modal, Button, ListGroup, Container, Card } from 'react-bootstrap';
import { Client, Transaction } from '@utils/types';
import styles from '@styles/ClientDetailModal.module.css';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa'; 

// Definición de las propiedades que recibe el componente
interface ClientDetailModalProps {
  show: boolean; // Controla si el modal está visible
  onHide: () => void; // Función para cerrar el modal
  customer: Client | null; // Información del cliente
}

// Componente funcional que recibe las propiedades
const ClientDetailModal: FC<ClientDetailModalProps> = ({ show, onHide, customer }) => {
  // Función placeholder para eliminar un cliente
  const deleteClient = (customerId: number) => {
    console.log(`Deleting customer with ID: ${customerId}`);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {customer && (
          <>
            {/* Información del cliente */}
            <Container fluid>
              <Card>
                <Card.Header>
                  <h3>Información del Cliente</h3>
                </Card.Header>
                <Card.Body>
                  <div className="customer-info">
                    {/* Muestra los detalles del cliente */}
                    <p><strong>Nombre:</strong> {customer.name}</p>
                    <p><strong>Apellido:</strong> {customer.lastname}</p>
                    <p><strong>Documento:</strong> {customer.document}</p>
                    <p><strong>Teléfono:</strong> {customer.phone}</p>
                    <p><strong>Ciudad:</strong> {customer.city}</p>
                    <p><strong>Estado:</strong> {customer.state}</p>
                    <p><strong>Dirección:</strong> {customer.direction}</p>
                    <p><strong>Límite de crédito:</strong> ${customer.credit_limit}</p>
                    <p><strong>Confiable:</strong> {customer.trusted ? 'Sí' : 'No'}</p>
                    <p><strong>Bloqueado:</strong> {customer.blocked ? 'Sí' : 'No'}</p>
                    <p><strong>Creado en:</strong> {customer.created_at}</p>
                  </div>
                </Card.Body>
              </Card>
            </Container>

            {/* Historial de Transacciones */}
            <Container fluid className="mt-4">
              <Card>
                <Card.Header>
                  <h5>Historial de Transacciones</h5>
                </Card.Header>
                <Card.Body>
                  {/* Verifica si hay transacciones disponibles */}
                  {customer.transactions && customer.transactions.length > 0 ? (
                    <ListGroup className="transaction-list">
                      {/* Itera sobre las transacciones del cliente */}
                      {customer.transactions.map((transaction: Transaction, index) => (
                        <ListGroup.Item key={transaction.id || index} className="transaction-item">
                          <div className="transaction-info">
                            {/* Muestra los detalles de cada transacción */}
                            <p><strong>Monto:</strong> ${transaction.amount}</p>
                            <p><strong>Estado:</strong> {transaction.status}</p>
                            <p><strong>Fecha:</strong> {new Date(transaction.created_at!).toLocaleDateString()}</p>
                            {transaction.detail && <p><strong>Detalle:</strong> {transaction.detail}</p>}
                            {transaction.txn_hash && <p><strong>Hash:</strong> {transaction.txn_hash}</p>}
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    // Mensaje si no hay transacciones
                    <p>No hay transacciones disponibles para este cliente.</p>
                  )}
                </Card.Body>
              </Card>
            </Container>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        {/* Botón para eliminar el cliente */}
        <Button
          className={styles.btnDelete}
          onClick={() => deleteClient(customer?.id ?? 0)}
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
