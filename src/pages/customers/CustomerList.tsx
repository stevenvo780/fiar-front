import React, { FC } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Client } from '@utils/types';

// Define the props type for the component
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
}) => {
  return (
    <Row>
      {customers.map((customer: Client, key) => (
        <Col sm="4" key={key} style={{ marginBottom: 20 }}>
          <div className="card">
            <div className="card-body">
              <Row>
                <Col xs="4" sm="4">
                  <p>
                    {customer.label &&
                      customer.label.map((label: string, key) => (
                        <span key={key}>{label}{" "}</span>
                      ))}
                  </p>
                </Col>
                <Col xs="4" sm="4">
                  <p className="card-text">{customer.name}</p>
                </Col>
                <Col xs="4" sm="4">
                  <p className="card-text">{customer.phone}</p>
                </Col>
                <Col sm="12">
                  <Button
                    style={{ marginRight: 10 }}
                    variant="warning"
                    onClick={() => handleShowModal(customer)}
                    className="btn btn-secondary"
                  >
                    Ver
                  </Button>
                  <Button
                    style={{ marginRight: 10 }}
                    variant="secondary"
                    onClick={() => updateCustomerSelect(customer.id ?? 0)}
                    className="btn btn-secondary"
                  >
                    Actualizar
                  </Button>
                  <Button
                    style={{ marginRight: 10 }}
                    variant="secondary"
                    onClick={() => deleteCustomer(customer.id ?? 0)}
                    className="btn btn-secondary"
                  >
                    Eliminar
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default CustomerList;

