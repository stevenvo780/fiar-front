import { useState, ChangeEvent, FC, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Dropdown, Navbar, Nav } from 'react-bootstrap';
import { withAuthSync } from '@utils/auth';
import CustomerList from './CustomerList';
import useCustomer from '@store/customers';
import useUI from '@/store/ui';
import { Client } from '@utils/types';
import CustomerDetailModal from './CustomerDetailModal';
import CustomerFormModal from './CustomerFormModal';
import UploadModal from './UploadModal';
import Pagination from 'rc-pagination';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'rc-pagination/assets/index.css';
import styles from '@styles/Customers.module.css';

const Customers: FC = () => {
  const { setLoading, addAlert } = useUI();
  const {
    customers,
    labels,
    page,
    lastPage,
    fetchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    downloadTemplate,
    downloadExcel
  } = useCustomer();

  const [customer, setCustomer] = useState<Client>({} as Client);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Client | null>(null);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    fetchCustomers(page, limit, search);
  }, [page, limit]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const createOrUpdateCustomer = async () => {
    try {
      setLoading(true);
      if (isUpdating) {
        await updateCustomer(customer.id || 0, customer);
        setIsUpdating(false);
      } else {
        await createCustomer(customer);
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

  const updateCustomerSelect = (id: number) => {
    const selectedCustomer = customers.find((i: Client) => i.id === id);
    if (selectedCustomer) {
      setCustomer(selectedCustomer);
      setIsUpdating(true);
      setShowModalCreate(true);
    }
  };

  const resetForm = () => {
    setCustomer({} as Client);
  };

  const handleShowModalDetail = (customer: Client) => {
    setSelectedCustomer(customer);
    setShowModalDetail(true);
  };

  const handleCloseModalDetail = () => {
    setSelectedCustomer(null);
    setShowModalDetail(false);
  };

  const handleSelectChange = (event: any) => {
    const labelsData: string[] = [];
    for (let index = 0; index < event.length; index++) {
      const labelValue = event[index].value;
      labelsData.push(labelValue);
    }
    setCustomer(customer);
  };

  const handlePageChange = (current: number) => {
    fetchCustomers(current, limit, search);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    if (searchValue.length >= 3 || searchValue.length === 0) {
      fetchCustomers(1, limit, searchValue);
    }
  };

  const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
  };

  const handleDeleteCustomer = async (id: number) => {
    try {
      setLoading(true);
      await deleteCustomer(id);
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
      <Container className={`container`}>
        <Navbar bg="light" expand="lg" className={`mb-3 ${styles.roundedNavbar}`}>
          <Navbar.Brand>Clientes</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-customers" />
          <Navbar.Collapse id="navbar-customers">
            <Nav className="me-auto">
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
        <CustomerList
          customers={customers}
          handleShowModal={handleShowModalDetail}
          updateCustomerSelect={updateCustomerSelect}
          deleteCustomer={handleDeleteCustomer}
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
      <CustomerDetailModal
        show={showModalDetail}
        onHide={handleCloseModalDetail}
        customer={selectedCustomer}
      />
      <CustomerFormModal
        show={showModalCreate}
        onHide={() => setShowModalCreate(false)}
        isUpdating={isUpdating}
        customer={customer}
        labels={labels}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        handleSave={createOrUpdateCustomer}
        handleCancel={() => {
          setIsUpdating(false);
          setCustomer({} as Client);
          setShowModalCreate(false);
        }}
      />
    </>
  );
};

export default withAuthSync(Customers);

