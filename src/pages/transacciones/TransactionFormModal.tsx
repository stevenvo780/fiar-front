import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import useTransaction from '@store/transactions';
import useUI from '@/store/ui';

interface TransactionFormModalProps {
  show: boolean;
  onHide: () => void;
  clientId?: string;
  clientName?: string;
}

const TransactionFormModal: React.FC<TransactionFormModalProps> = ({ show, onHide, clientId, clientName }) => {
  const { addTransaction } = useTransaction();
  const { setLoading, addAlert } = useUI();
  const [amount, setAmount] = useState('');
  const [operation, setOperation] = useState<'income' | 'expense'>('income');
  const [status, setStatus] = useState<'approved' | 'pending'>('approved');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await addTransaction({
        client_id: clientId,
        amount: Number(amount),
        operation,
        status,
        detail: {},
      });
      addAlert({ type: 'success', message: `Transacción ${operation === 'income' ? 'abonada' : 'prestada'} correctamente` });
      onHide();
    } catch (err: any) {
      if (err?.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Error al procesar la transacción');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{operation === 'income' ? 'Abonar créditos' : 'Prestar créditos'} {clientName ? `a ${clientName}` : ''}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Monto</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={amount}
              onChange={e => setAmount(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de operación</Form.Label>
            <Form.Select value={operation} onChange={e => setOperation(e.target.value as 'income' | 'expense')}>
              <option value="income">Abonar (Ingreso)</option>
              <option value="expense">Prestar (Egreso)</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Select value={status} onChange={e => setStatus(e.target.value as 'approved' | 'pending')}>
              <option value="approved">Aprobado</option>
              <option value="pending">Pendiente</option>
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onHide} className="me-2">Cancelar</Button>
            <Button variant="primary" type="submit">Guardar</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TransactionFormModal;
