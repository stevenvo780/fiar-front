import { FC } from 'react';
import { Modal, Button, Container, Card } from 'react-bootstrap';
import { Transaction } from '@utils/types';
import styles from '@styles/ClientDetailModal.module.css';
import { FaTrashAlt } from 'react-icons/fa';

interface TransactionDetailModalProps {
  show: boolean;
  onHide: () => void;
  transaction: Transaction | null;
}

const TransactionDetailModal: FC<TransactionDetailModalProps> = ({ show, onHide, transaction }) => {
  const deleteTransaction = (transactionId: number) => {
    console.log(`Deleting transaction with ID: ${transactionId}`);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalles de la Transacción</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {transaction && (
          <Container fluid>
            <Card>
              <Card.Header>
                <h3>Información de la Transacción</h3>
              </Card.Header>
              <Card.Body>
                <div className="transaction-info">
                  <p><strong>Monto:</strong> ${transaction.amount}</p>
                  <p><strong>Estado:</strong> {transaction.status}</p>
                  <p><strong>Fecha:</strong> {new Date(transaction.created_at!).toLocaleDateString()}</p>
                  {transaction.detail && <p><strong>Detalle:</strong> {transaction.detail}</p>}
                  {transaction.txn_hash && <p><strong>Hash:</strong> {transaction.txn_hash}</p>}
                </div>
              </Card.Body>
            </Card>
          </Container>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          className={styles.btnDelete}
          onClick={() => deleteTransaction(Number(transaction?.id) || 0)}
        >
          <FaTrashAlt style={{ marginRight: '5px' }} /> Eliminar
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TransactionDetailModal;
