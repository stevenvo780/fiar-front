import React, { FC, ChangeEvent } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select/creatable';
import { Client } from '@utils/types';

interface CustomerFormProps {
  customer: Client;
  labels: { value: string, label: string }[];
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (event: any) => void;
}

const CustomerForm: FC<CustomerFormProps> = ({ customer, labels, handleInputChange, handleSelectChange }) => {
  return (
    <Row>
      <Col style={{ marginTop: 10 }} sm="4">
        <Select
          placeholder="Etiquetas*"
          isMulti
          instanceId="labels"
          name="label"
          onChange={handleSelectChange}
          options={labels}
          value={customer.label ? customer.label.map(label => ({ value: label, label: label })) : []}
        />
      </Col>
      <Col style={{ marginTop: 10 }} sm="4">
        <Form.Control
          type="text"
          name="name"
          value={customer.name || ''}
          onChange={handleInputChange}
          placeholder="Nombre *"
          className="form-control"
        />
      </Col>
      <Col style={{ marginTop: 10 }} sm="4">
        <Form.Control
          type="text"
          name="lastname"
          value={customer.lastname || ''}
          onChange={handleInputChange}
          placeholder="Apellido *"
          className="form-control"
        />
      </Col>
      <Col style={{ marginTop: 10 }} sm="4">
        <Form.Control
          type="text"
          name="document"
          value={customer.document || ''}
          onChange={handleInputChange}
          placeholder="Documento"
          className="form-control"
        />
      </Col>
      <Col style={{ marginTop: 10 }} sm="4">
        <Form.Control
          type="text"
          name="phone"
          value={customer.phone || ''}
          onChange={handleInputChange}
          placeholder="Teléfono"
          className="form-control"
        />
      </Col>
      <Col style={{ marginTop: 10 }} sm="4">
        <Form.Control
          type="text"
          name="city"
          value={customer.city || ''}
          onChange={handleInputChange}
          placeholder="Ciudad"
          className="form-control"
        />
      </Col>
      <Col style={{ marginTop: 10 }} sm="4">
        <Form.Control
          type="text"
          name="state"
          value={customer.state || ''}
          onChange={handleInputChange}
          placeholder="Estado"
          className="form-control"
        />
      </Col>
      <Col style={{ marginTop: 10 }} sm="4">
        <Form.Control
          type="text"
          name="direction"
          value={customer.direction || ''}
          onChange={handleInputChange}
          placeholder="Dirección"
          className="form-control"
        />
      </Col>
      <Col style={{ marginTop: 10 }} sm="4">
        <Form.Control
          type="number"
          name="credit_limit"
          value={customer.credit_limit || ''}
          onChange={handleInputChange}
          placeholder="Límite de crédito"
          className="form-control"
        />
      </Col>
      <Col style={{ marginTop: 10 }} sm="4">
        <Form.Check
          type="checkbox"
          name="trusted"
          checked={customer.trusted || false}
          onChange={handleInputChange}
          label="Confiable"
        />
      </Col>
      <Col style={{ marginTop: 10 }} sm="4">
        <Form.Check
          type="checkbox"
          name="blocked"
          checked={customer.blocked || false}
          onChange={handleInputChange}
          label="Bloqueado"
        />
      </Col>
      <Col style={{ marginTop: 10 }} sm="4">
        <Form.Control
          type="text"
          name="created_at"
          value={customer.created_at || ''}
          onChange={handleInputChange}
          placeholder="Fecha de creación"
          className="form-control"
        />
      </Col>
    </Row>
  );
};

export default CustomerForm;
