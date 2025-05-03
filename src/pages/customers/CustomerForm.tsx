import React, { FC, ChangeEvent, useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select/creatable';
import { Customer } from '@utils/types';

interface CustomerFormProps {
  customer: Customer;
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
        <Form.Control type="number" name="prefix" value={customer.prefix || ''} onChange={handleInputChange} placeholder="Prefijo *" className="form-control" />
      </Col>
      <Col style={{ marginTop: 10 }} sm="4">
        <Form.Control type="number" name="phone" value={customer.phone || ''} onChange={handleInputChange} placeholder="Celular *" className="form-control" />
      </Col>
      <Col style={{ marginTop: 10 }} sm="4">
        <Form.Control type="text" name="companyName" value={customer.companyName || ''} onChange={handleInputChange} placeholder="Nombre de la empresa" className="form-control" />
      </Col>
      <Col style={{ marginTop: 10 }} sm="2">
        <Form.Control type="text" name="firstName" value={customer.firstName || ''} onChange={handleInputChange} placeholder="Nombre" className="form-control" />
      </Col>
      <Col style={{ marginTop: 10 }} sm="2">
        <Form.Control type="text" name="lastName" value={customer.lastName || ''} onChange={handleInputChange} placeholder="Apellido" className="form-control" />
      </Col>
      <Col style={{ marginTop: 10 }} sm="4">
        <Form.Control type="text" name="lastContact" value={customer.lastContact || ''} onChange={handleInputChange} placeholder="Ultimo contacto" className="form-control" />
      </Col>
      <Col style={{ marginTop: 10 }} sm="4">
        <Form.Control type="text" name="note" value={customer.note || ''} onChange={handleInputChange} placeholder="Nota" className="form-control" />
      </Col>
      <Col style={{ marginTop: 10 }} sm="4">
        <Form.Control type="text" name="title" value={customer.title || ''} onChange={handleInputChange} placeholder="Título" className="form-control" />
      </Col>
      <Col style={{ marginTop: 10 }} sm="4">
        <Form.Control type="text" name="campaign" value={customer.campaign || ''} onChange={handleInputChange} placeholder="Campaña" className="form-control" />
      </Col>
      <Col style={{ marginTop: 10 }} sm="4">
        <Form.Control type="text" name="data1" value={customer.data1 || ''} onChange={handleInputChange} placeholder="Dato 1" className="form-control" />
      </Col>
      <Col style={{ marginTop: 10 }} sm="4">
        <Form.Control type="text" name="data2" value={customer.data2 || ''} onChange={handleInputChange} placeholder="Dato 2" className="form-control" />
      </Col>
      <Col style={{ marginTop: 10 }} sm="4">
        <Form.Control type="text" name="data3" value={customer.data3 || ''} onChange={handleInputChange} placeholder="Dato 3" className="form-control" />
      </Col>
    </Row>
  );
};

export default CustomerForm;
