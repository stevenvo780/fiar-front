import { FC } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Customer } from '@utils/types';

interface CustomerDetailModalProps {
  show: boolean;
  onHide: () => void;
  customer: Customer | null;
}

const CustomerDetailModal: FC<CustomerDetailModalProps> = ({ show, onHide, customer }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {customer && (
          <div>
            <p>Nombre: {customer.firstName}</p>
            <p>Apellido: {customer.lastName}</p>
            <p>Etiqueta: {customer.label}</p>
            <p>Nota: {customer.note}</p>
            <p>Campaña: {customer.campaign}</p>
            <p>Título: {customer.title}</p>
            <p>Data 1: {customer.data1}</p>
            <p>Data 2: {customer.data2}</p>
            <p>Data 3: {customer.data3}</p>
            <p>Último contacto: {customer.lastContact}</p>
            <p>Prefijo: {customer.prefix}</p>
            <p>Celular: {customer.phone}</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomerDetailModal;
