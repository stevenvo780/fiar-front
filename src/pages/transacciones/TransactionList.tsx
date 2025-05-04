import React, { FC } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { Transaction } from '@utils/types';
import { FaEye, FaEdit } from 'react-icons/fa'; // Agrega los iconos
import styles from '@styles/Transactions.module.css';

interface TransactionListProps {
  transactions: Transaction[];
  handleShowModal: (transaction: Transaction) => void;
  updateTransactionSelect: (id: number) => void;
}

const TransactionList: FC<TransactionListProps> = ({
  transactions,
  handleShowModal,
  updateTransactionSelect,
}) => (
  <>
    {/* Lista de transacciones */}
    <Row>
      {transactions.map((transaction, idx) => (
        <Col key={idx} xs={12} md={4} lg={3} className="mb-3">
          <Card className={styles['transaction-card']}>
            <Card.Body className="d-flex flex-column justify-content-between h-100">
              {/* Información de la transacción */}
              <div className={styles['data-row']}>
                <span className={styles['data-label']}>Monto:</span>
                <span className={styles['data-value']}>${transaction.amount}</span>
              </div>
              <div className={styles['data-row']}>
                <span className={styles['data-label']}>Estado:</span>
                <span className={styles['data-value']}>{transaction.status}</span>
              </div>
              <div className={styles['data-row']}>
                <span className={styles['data-label']}>Fecha:</span>
                <span className={styles['data-value']}>
                  {new Date(transaction.created_at!).toLocaleDateString()}
                </span>
              </div>

              {/* Botones de acción */}
              <div className={`${styles['button-group']} mt-0`}>
                <Button
                  className={styles.btnView}
                  onClick={() => handleShowModal(transaction)}
                >
                  <FaEye style={{ marginRight: '5px' }} />
                </Button>
                <Button
                  className={styles.btnUpdate}
                  onClick={() => updateTransactionSelect(Number(transaction.id) || 0)}
                >
                  <FaEdit style={{ marginRight: '5px' }} />
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </>
);

export default TransactionList;
