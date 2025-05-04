import React, { FC } from 'react';
import { Row, Col, Button, Card, Dropdown } from 'react-bootstrap';
import { Client } from '@utils/types';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa'; // Agrega los iconos
import styles from '@styles/Customers.module.css';

interface CustomerListProps {
  customers: Client[];
  handleShowModal: (customer: Client) => void;
  updateCustomerSelect: (id: number) => void;
  deleteCustomer: (id: number) => void;
}

const CustomerList: FC<CustomerListProps> = ({
  customers,
  handleShowModal,
  updateCustomerSelect,
  deleteCustomer,
}) => (
  <>
    {/* Filtros */}
    <div className={styles.filters}>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="estado-de-cuenta">
          Estado de cuenta
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>En deuda</Dropdown.Item>
          <Dropdown.Item>Al día</Dropdown.Item>
          <Dropdown.Item>Suspendidos</Dropdown.Item>
          <Dropdown.Item>Todos</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="deudas-pendientes">
          Deudas pendientes
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Deuda (mayor → menor)</Dropdown.Item>
          <Dropdown.Item>Deuda (menor → mayor)</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>

    {/* Lista de clientes */}
    <Row>
      {customers.map((customer, idx) => (
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
                  <FaEye style={{ marginRight: '5px' }} /> Ver
                </Button>
                <Button
                  className={styles.btnUpdate}
                  onClick={() => updateCustomerSelect(customer.id ?? 0)}
                >
                  <FaEdit style={{ marginRight: '5px' }} /> Actualizar
                </Button>
                <Button
                  className={styles.btnDelete}
                  onClick={() => deleteCustomer(customer.id ?? 0)}
                >
                  <FaTrashAlt style={{ marginRight: '5px' }} /> Eliminar
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </>
);

export default CustomerList;
