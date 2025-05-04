import React, { FC } from 'react';
import { Row, Col, Button, Card, Dropdown } from 'react-bootstrap';
import { Client } from '@utils/types';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa'; // Agrega los iconos
import styles from '@styles/Client.module.css';

interface ClientListProps {
  client: Client[];
  handleShowModal: (customer: Client) => void;
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
      {client?.map((customer, idx) => (
        <Col key={idx} xs={12} md={4} lg={3} className="mb-3">
          <Card className={styles['customer-card']}>
            <Card.Body className="d-flex flex-column justify-content-between h-100">
              
              <div className={styles['data-row']}>
                <span className={styles['data-label']}>Nombre:</span>
                <span className={styles['data-value']}>{customer.name}</span>
              </div>
              <div className={styles['data-row']}>
                <span className={styles['data-label']}>Cédula:</span>
                <span className={styles['data-value']}>{customer.document}</span>
              </div>
              <div className={styles['data-row']}>
                <span className={styles['data-label']}>Cupo:</span>
                <span className={styles['data-value']}>${customer.credit_limit}</span>
              </div>

              <div className={`${styles['button-group']} mt-0`}>
                <Button
                  className={styles.btnView}
                  onClick={() => handleShowModal(customer)}
                >
                  <FaEye style={{ marginRight: '5px' }} /> 
                </Button>
                <Button
                  className={styles.btnUpdate}
                  onClick={() => updateClientSelect(customer.id ?? 0)}
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
