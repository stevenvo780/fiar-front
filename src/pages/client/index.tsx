import { useState, ChangeEvent, FC, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Dropdown, Navbar, Nav } from 'react-bootstrap';
import { withAuthSync } from '@utils/auth';
import ClientList from './ClientList';
import useClient from '@store/client';
import useUI from '@/store/ui';
import { Client } from '@utils/types';
import ClientDetailModal from './ClientDetailModal';
import ClientFormModal from './ClientFormModal';
import Pagination from 'rc-pagination';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'rc-pagination/assets/index.css';
import styles from '@styles/Client.module.css';

const ClientView: FC = () => {
  const { setLoading, addAlert } = useUI();
  const {
    client,
    labels,
    page,
    lastPage,
    fetchClient,
    createClient,
    updateClient,
    deleteClient,
    downloadTemplate,
    downloadExcel
  } = useClient();

  const [clientSelected, setClientSelected] = useState<Client>({} as Client);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    fetchClient(page, limit, search);
  }, [page, limit]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setClientSelected({ ...clientSelected, [e.target.name]: e.target.value });
  };

  const createOrUpdateClient = async () => {
    try {
      setLoading(true);
      if (isUpdating) {
        await updateClient(clientSelected.id || 0, clientSelected);
        setIsUpdating(false);
      } else {
        await createClient(clientSelected);
      }
    } catch (err) {
      console.error('Error al guardar cliente:', err);
      addAlert({ type: 'danger', message: `Error al ${isUpdating ? 'actualizar' : 'crear'} cliente` });
    } finally {
      setLoading(false);
      setShowModalCreate(false);
      resetForm();
    }
  };

  const updateClientSelect = (id: number) => {
    const selectedClient = client.find((i: Client) => i.id === id);
    if (selectedClient) {
      setSelectedClient(selectedClient);
      setIsUpdating(true);
      setShowModalCreate(true);
    }
  };

  const resetForm = () => {
    setSelectedClient({} as Client);
  };

  const handleShowModalDetail = (client: Client) => {
    setSelectedClient(client);
    setShowModalDetail(true);
  };

  const handleCloseModalDetail = () => {
    setSelectedClient(null);
    setShowModalDetail(false);
  };

  const handleSelectChange = (event: any) => {
    const labelsData: string[] = [];
    for (let index = 0; index < event.length; index++) {
      const labelValue = event[index].value;
      labelsData.push(labelValue);
    }
    setSelectedClient(clientSelected);
  };

  const handlePageChange = (current: number) => {
    fetchClient(current, limit, search);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    if (searchValue.length >= 3 || searchValue.length === 0) {
      fetchClient(1, limit, searchValue);
    }
  };

  const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
  };

  const handleDeleteClient = async (id: number) => {
    try {
      setLoading(true);
      await deleteClient(id);
      addAlert({ type: 'success', message: 'Cliente eliminado correctamente' });
    } catch (err) {
      console.error('Error al eliminar cliente:', err);
      addAlert({ type: 'danger', message: 'Error al eliminar cliente' });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadExcel = async () => {
    try {
      setLoading(true);
      await downloadExcel();
      addAlert({ type: 'success', message: 'Excel descargado correctamente' });
    } catch (err) {
      console.error('Error al descargar Excel:', err);
      addAlert({ type: 'danger', message: 'Error al descargar Excel' });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      setLoading(true);
      await downloadTemplate();
      addAlert({ type: 'success', message: 'Plantilla descargada correctamente' });
    } catch (err) {
      console.error('Error al descargar plantilla:', err);
      addAlert({ type: 'danger', message: 'Error al descargar plantilla' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container className="container">
        <Navbar bg="light" expand="lg" className={`mb-3  ${styles.roundedNavbar}`}>
          <Navbar.Toggle aria-controls="navbar-client" />
          <Navbar.Collapse id="navbar-client">
            <Nav className="me-auto align-items-center">
              <Form.Control
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={handleSearchChange}
                className="me-2"
                style={{ width: '200px' }}
              />
              <Button
                variant="secondary"
                onClick={() => {
                  setIsUpdating(false);
                  resetForm();
                  setShowModalCreate(true);
                }}
                className="me-2"
              >
                Nuevo cliente
              </Button>
              <Button variant="secondary" onClick={handleDownloadExcel} className="me-2">
                Descargar Excel
              </Button>
              <Dropdown className="me-2">
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
              <Dropdown className="me-2">
                <Dropdown.Toggle variant="success" id="deudas-pendientes">
                  Deudas pendientes
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Deuda (mayor → menor)</Dropdown.Item>
                  <Dropdown.Item>Deuda (menor → mayor)</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Form.Select
                value={limit}
                onChange={handleLimitChange}
                style={{ width: '100px' }}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </Form.Select>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <hr />
        <ClientList
          client={client}
          handleShowModal={handleShowModalDetail}
          updateClientSelect={updateClientSelect}
          deleteClient={handleDeleteClient}
        />
        <div className={styles.paginationContainer}>
          <Pagination
            current={page}
            total={lastPage * limit}
            pageSize={limit}
            onChange={handlePageChange}
            prevIcon={<FaChevronLeft />}
            nextIcon={<FaChevronRight />}
            style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
            itemRender={(current, type, element) => {
              if (type === 'prev') {
                return <FaChevronLeft style={{ color: '#FFC313' }} />;
              }
              if (type === 'next') {
                return <FaChevronRight style={{ color: '#FFC313' }} />;
              }
              return element;
            }}
          />
        </div>
      </Container>
      <ClientDetailModal
        show={showModalDetail}
        onHide={handleCloseModalDetail}
        client={selectedClient}
      />
      <ClientFormModal
        show={showModalCreate}
        onHide={() => setShowModalCreate(false)}
        isUpdating={isUpdating}
        client={clientSelected}
        labels={labels}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        handleSave={createOrUpdateClient}
        handleCancel={() => {
          setIsUpdating(false);
          setSelectedClient({} as Client);
          setShowModalCreate(false);
        }}
      />
    </>
  );
};

export default withAuthSync(ClientView);

