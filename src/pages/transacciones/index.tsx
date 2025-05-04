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
    downloadExcel
  } = useTransaction();

  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    fetchTransactions(page, limit, search);
  }, [page, limit, search, fetchTransactions]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    if (searchValue.length >= 3 || searchValue.length === 0) {
      fetchTransactions(1, limit, searchValue);
    }
  };

  const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    fetchTransactions(1, Number(e.target.value), search);
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

  const handlePageChange = (current: number) => {
    fetchTransactions(current, limit, search);
  };

  return (
    <>
      <Container className={`container`}>
        <Navbar bg="light" expand="lg" className={`mb-3 ${styles.roundedNavbar}`}>
          <Navbar.Brand>Transacciones</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-transactions" />
          <Navbar.Collapse id="navbar-transactions">
            <Nav className="me-auto">
              <Form.Control
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={handleSearchChange}
                className="me-2"
                style={{ width: '200px' }}
              />
              <Button variant="secondary" onClick={handleDownloadExcel} className="me-2">
                Descargar Excel
              </Button>
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
        <TransactionList
          transactions={transactions}
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
    </>
  );
};

export default withAuthSync(Transactions);

