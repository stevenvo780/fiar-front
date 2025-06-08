import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import Select from 'react-select';
import useTransaction from '@store/transactions';
import useClient from '@store/client';
import useUI from '@/store/ui';
import ClientFormModal from '../client/ClientFormModal';
import { Client } from '@utils/types';

interface TransactionFormModalProps {
  show: boolean;
  onHide: () => void;
  clientId?: string;
  clientName?: string;
}

const TransactionFormModal: React.FC<TransactionFormModalProps> = ({ show, onHide, clientId, clientName }) => {
  const { addTransaction } = useTransaction();
  const { setLoading, addAlert } = useUI();
  const { client, fetchClient, createClient, labels } = useClient();
  const [amount, setAmount] = useState('');
  const [operation, setOperation] = useState<'income' | 'expense'>('income');
  const [status, setStatus] = useState<'approved' | 'pending'>('approved');
  const [error, setError] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showClientModal, setShowClientModal] = useState(false);
  const [newClient, setNewClient] = useState<Client>({} as Client);

  useEffect(() => {
    if (show) fetchClient(1, 100, '');
  }, [show, fetchClient]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (!selectedClient || !selectedClient.id) {
        setError('Debe seleccionar un cliente');
        setLoading(false);
        return;
      }
      const tx: any = {
        amount: Number(amount),
        operation,
        status,
        detail: {},
        client_id: selectedClient.id,
      };
      await addTransaction(tx);
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

  const clientOptions = client.map((c) => ({
    value: c.id,
    label: `${c.name || ''} ${c.lastname || ''} (${c.document || ''})`,
    data: c,
  }));

  const handleCreateClient = async () => {
    try {
      await createClient(newClient);
      await fetchClient(1, 100, '');
      // Selecciona el cliente recién creado
      setSelectedClient({ ...newClient, id: client[client.length - 1]?.id });
      setShowClientModal(false);
      setNewClient({} as Client);
      addAlert({ type: 'success', message: 'Cliente creado y seleccionado.' });
    } catch (err) {
      addAlert({ type: 'danger', message: 'Error al crear cliente.' });
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>{operation === 'income' ? 'Abonar créditos' : 'Prestar créditos'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Cliente</Form.Label>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <Select
                    options={clientOptions}
                    value={clientOptions.find(opt => opt.value === selectedClient?.id) || null}
                    onChange={opt => setSelectedClient(opt?.data || null)}
                    placeholder="Seleccione un cliente..."
                    isClearable
                  />
                </div>
                <Button variant="outline-primary" onClick={() => setShowClientModal(true)}>
                  Nuevo cliente
                </Button>
              </div>
            </Form.Group>
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
      <ClientFormModal
        show={showClientModal}
        onHide={() => setShowClientModal(false)}
        isUpdating={false}
        client={newClient}
        labels={labels}
        handleInputChange={e => setNewClient({ ...newClient, [e.target.name]: e.target.value })}
        handleSelectChange={() => {}}
        handleSave={handleCreateClient}
        handleCancel={() => setShowClientModal(false)}
      />
    </>
  );
};

export default TransactionFormModal;
