import { useState, ChangeEvent, FC, useEffect } from 'react';
import { Container, Form, Button, Navbar, Nav } from 'react-bootstrap';
import { withAuthSync } from '@utils/auth';
import TransactionList from './TransactionList';
import useTransaction from '@store/transactions';
import useUI from '@/store/ui';
import Pagination from 'rc-pagination';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'rc-pagination/assets/index.css';
import styles from '@styles/Transactions.module.css';

const Transactions: FC = () => {
  const { setLoading, addAlert } = useUI();
  const {
    transactions,
    page,
    lastPage,
    fetchTransactions,
    downloadExcel,
    updateTransaction
  } = useTransaction();

  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(50);
  const [currentPage, setCurrentPage] = useState(page);
  const [order, setOrder] = useState<'reciente' | 'antiguo'>('reciente');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'aprobado' | 'no_aprobado'>('todos');

  useEffect(() => {
    fetchTransactions(currentPage, limit, search, order, statusFilter);
  }, [currentPage, limit, search, order, statusFilter, fetchTransactions]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    setCurrentPage(1);
  };

  const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setCurrentPage(1);
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

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  const handleShowModal = (transaction: any) => {
    // Implementa la lógica para mostrar/ocultar el modal con la transacción seleccionada
  };

  const updateTransactionSelect = (id: string) => {
    // Implementa la lógica para actualizar la transacción seleccionada
  };

  const handleChangeTransactionStatus = async (id: string, status: 'pending' | 'approved' | 'rejected') => {
    try {
      // reenviar el estado tal cual
      await updateTransaction(id, { id, status } as any);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container className="container">
        <Navbar expand="lg" className="mb-3">
          <Navbar.Toggle aria-controls="navbar-transactions" />
          <Navbar.Collapse id="navbar-transactions">
            <Nav className="me-auto align-items-center">
              <Form.Control
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={handleSearchChange}
                className="me-2"
                style={{ width: '200px', minWidth: 120 }}
              />
              <Form.Select
                value={order}
                onChange={e => setOrder(e.target.value as 'reciente' | 'antiguo')}
                className="me-2"
                style={{ width: '140px', minWidth: 100 }}
              >
                <option value="reciente">Más reciente</option>
                <option value="antiguo">Más antiguo</option>
              </Form.Select>
              <Form.Select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as 'todos' | 'aprobado' | 'no_aprobado')}
                className="me-2"
                style={{ width: '140px', minWidth: 100 }}
              >
                <option value="todos">Todos</option>
                <option value="aprobado">Aprobado</option>
                <option value="no_aprobado">No aprobado</option>
              </Form.Select>
              <Button variant="secondary" onClick={handleDownloadExcel} className="me-2">
                Descargar Excel
              </Button>
              <Form.Select
                value={limit}
                onChange={handleLimitChange}
                style={{ width: '100px', minWidth: 80 }}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </Form.Select>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <hr />
        <TransactionList
          transactions={transactions}
          handleShowModal={handleShowModal}
          updateTransactionSelect={updateTransactionSelect}
          onStatusChange={handleChangeTransactionStatus}
        />
        <div className={styles.paginationContainer}>
          <Pagination
            current={currentPage}
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
    </>
  );
};

export default withAuthSync(Transactions);

