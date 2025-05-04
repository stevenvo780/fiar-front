import { FC } from 'react';
import { Modal, Button, ListGroup, Container, Card } from 'react-bootstrap';
import { Client, Transaction } from '@utils/types';
import styles from '@styles/ClientDetailModal.module.css';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa'; 

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
            {/* Información del cliente */}
            <Container fluid>
              <Card>
                <Card.Header>
                  <h3>Información del Cliente</h3>
                </Card.Header>
                <Card.Body>
                  <div className="client-info">
                    {/* Muestra los detalles del cliente */}
                    <p><strong>Nombre:</strong> {client.name}</p>
                    <p><strong>Apellido:</strong> {client.lastname}</p>
                    <p><strong>Documento:</strong> {client.document}</p>
                    <p><strong>Teléfono:</strong> {client.phone}</p>
                    <p><strong>Ciudad:</strong> {client.city}</p>
                    <p><strong>Estado:</strong> {client.state}</p>
                    <p><strong>Dirección:</strong> {client.direction}</p>
                    <p><strong>Límite de crédito:</strong> ${client.credit_limit}</p>
                    <p><strong>Cupo Total:</strong> ${client.total_quota}</p> {/* Añadido */}
                    <p><strong>Cupo Disponible:</strong> ${client.available_quota}</p> {/* Añadido */}
                    <p><strong>Confiable:</strong> {client.trusted ? 'Sí' : 'No'}</p>
                    <p><strong>Bloqueado:</strong> {client.blocked ? 'Sí' : 'No'}</p>
                    <p><strong>Creado en:</strong> {client.created_at}</p>
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
                  {client.transactions && client.transactions.length > 0 ? (
                    <ListGroup className="transaction-list">
                      {/* Itera sobre las transacciones del cliente */}
                      {client.transactions.map((transaction: Transaction, index) => (
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
