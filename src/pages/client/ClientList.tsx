import React, { FC } from 'react';
import { Row, Col, Button, Card, Dropdown } from 'react-bootstrap';
import { Client } from '@utils/types';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa'; // Agrega los iconos
import styles from '@styles/Client.module.css';

const formatNumber = (amount: number | string | undefined) => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount ?? 0;
  const [intPart, decPart] = num.toFixed(2).split('.');
  return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + decPart;
};

interface ClientListProps {
  client: Client[];
  handleShowModal: (client: Client) => void;
  updateClientSelect: (id: number) => void;
  deleteClient: (id: number) => void;
}

const ClientList: FC<ClientListProps> = ({
  client,
  handleShowModal,
  updateClientSelect,
}) => (
  <>
    <Row>
      {client?.map((client, idx) => (
        <Col key={idx} xs={12} md={4} lg={3} className="mb-3">
          <Card className={styles['client-card']}>
            <Card.Body className="d-flex flex-column justify-content-between h-110">
              
              <div className={styles['data-row']}>
                <span className={styles['data-label']}>Nombre:</span>
                <span className={styles['data-value']}>{client.name}</span>
              </div>
              <div className={styles['data-row']}>
                <span className={styles['data-label']}>Cédula:</span>
                <span className={styles['data-value']}>{client.document}</span>
              </div>
              <div className={styles['data-row']}>
                <span className={styles['data-label']}>Límite:</span>
                <span className={styles['data-value']}>{formatNumber(client.credit_limit || 0)}</span>
              </div>
              <div className={styles['data-row']}>
                <span className={styles['data-label']}>Disponible:</span>
                <span className={styles['data-value']}>{formatNumber(client.current_balance || 0)}</span>
              </div>

              <div className={`${styles['button-group']} mt-1 d-flex justify-content-between`}>
                <Button
                  className={styles.btnView}
                  onClick={() => handleShowModal(client)}
                >
                  <FaEye style={{ marginRight: '5px' }} /> 
                </Button>
                <Button
                  className={styles.btnUpdate}
                  onClick={() => updateClientSelect(client.id ?? 0)}
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

export default ClientList;
