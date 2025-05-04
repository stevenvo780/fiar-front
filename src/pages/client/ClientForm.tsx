import React, { FC, ChangeEvent } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select/creatable';
import { Client } from '@utils/types';

// Definición de las propiedades que recibe el componente
interface ClientFormProps {
  customer: Client; // Información del cliente
  labels: { value: string, label: string }[]; // Opciones para un select (no usado en el código actual)
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void; // Manejador para cambios en inputs
  handleSelectChange: (event: any) => void; // Manejador para cambios en selects
}

// Componente funcional que recibe las propiedades
const ClientForm: FC<ClientFormProps> = ({ customer, labels, handleInputChange, handleSelectChange }) => {
  return (
    <Form>
      {/* Sección: Información del Usuario */}
      <fieldset style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '10px' }}>
        <legend style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Información del Usuario</legend>
        <Row>
          {/* Campos de texto para nombre, apellido, documento, teléfono, ciudad, estado y dirección */}
          <Col sm="4" style={{ marginTop: 10 }}>
            <Form.Control
              type="text"
              name="name"
              value={customer.name || ''} // Valor actual del campo
              onChange={handleInputChange} // Manejador de cambios
              placeholder="Nombre *" // Texto de ayuda
              className="form-control"
            />
          </Col>
          <Col sm="4" style={{ marginTop: 10 }}>
            <Form.Control
              type="text"
              name="lastname"
              value={customer.lastname || ''}
              onChange={handleInputChange}
              placeholder="Apellido *"
              className="form-control"
            />
          </Col>
          <Col sm="4" style={{ marginTop: 10 }}>
            <Form.Control
              type="text"
              name="document"
              value={customer.document || ''}
              onChange={handleInputChange}
              placeholder="Documento"
              className="form-control"
            />
          </Col>
          <Col sm="4" style={{ marginTop: 10 }}>
            <Form.Control
              type="text"
              name="phone"
              value={customer.phone || ''}
              onChange={handleInputChange}
              placeholder="Teléfono"
              className="form-control"
            />
          </Col>
          <Col sm="4" style={{ marginTop: 10 }}>
            <Form.Control
              type="text"
              name="city"
              value={customer.city || ''}
              onChange={handleInputChange}
              placeholder="Ciudad"
              className="form-control"
            />
          </Col>
          <Col sm="4" style={{ marginTop: 10 }}>
            <Form.Control
              type="text"
              name="state"
              value={customer.state || ''}
              onChange={handleInputChange}
              placeholder="Estado"
              className="form-control"
            />
          </Col>
          <Col sm="4" style={{ marginTop: 10 }}>
            <Form.Control
              type="text"
              name="direction"
              value={customer.direction || ''}
              onChange={handleInputChange}
              placeholder="Dirección"
              className="form-control"
            />
          </Col>
        </Row>
      </fieldset>

      {/* Sección: Información del Crédito */}
      <fieldset style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '10px' }}>
        <legend style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Información del Crédito</legend>
        <Row>
          {/* Campos numéricos para límite de crédito, cupo total y cupo disponible */}
          <Col sm="4" style={{ marginTop: 10 }}>
            <Form.Control
              type="number"
              name="credit_limit"
              value={customer.credit_limit || ''}
              onChange={handleInputChange}
              placeholder="Límite de crédito"
              className="form-control"
            />
          </Col>
          <Col sm="4" style={{ marginTop: 10 }}>
            <Form.Control
              type="number"
              name="total_quota"
              value={''} // Valor no vinculado al cliente
              onChange={handleInputChange}
              placeholder="Cupo Total"
              className="form-control"
            />
          </Col>
          <Col sm="4" style={{ marginTop: 10 }}>
            <Form.Control
              type="number"
              name="available_quota"
              value={''} // Valor no vinculado al cliente
              onChange={handleInputChange}
              placeholder="Cupo Disponible"
              className="form-control"
            />
          </Col>
          {/* Checkboxes para marcar si el cliente es confiable o está bloqueado */}
          <Col sm="4" style={{ marginTop: 10 }}>
            <Form.Check
              type="checkbox"
              name="trusted"
              checked={customer.trusted || false} // Valor booleano
              onChange={handleInputChange}
              label="Confiable"
            />
          </Col>
          <Col sm="4" style={{ marginTop: 10 }}>
            <Form.Check
              type="checkbox"
              name="blocked"
              checked={customer.blocked || false}
              onChange={handleInputChange}
              label="Bloqueado"
            />
          </Col>
        </Row>
      </fieldset>

      {/* Botones de acción */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div>
          {/* Botones para activar o desactivar */}
          <Button variant="success" style={{ marginRight: '10px' }}>
            Activar
          </Button>
          <Button variant="danger">Desactivar</Button>
        </div>
        {/* Botón para guardar */}
        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </div>
    </Form>
  );
};

export default ClientForm;
