import { FC } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Client } from '@utils/types';

interface CustomerDetailModalProps {
  show: boolean;
  onHide: () => void;
  customer: Client | null;
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
            <p>Nombre: {customer.name}</p>
            <p>Apellido: {customer.lastname}</p>
            <p>Documento: {customer.document}</p>
            <p>Teléfono: {customer.phone}</p>
            <p>Ciudad: {customer.city}</p>
            <p>Estado: {customer.state}</p>
            <p>Dirección: {customer.direction}</p>
            <p>Límite de crédito: {customer.credit_limit}</p>
            <p>Confiable: {customer.trusted ? 'Sí' : 'No'}</p>
            <p>Bloqueado: {customer.blocked ? 'Sí' : 'No'}</p>
            <p>Creado en: {customer.created_at}</p>
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
