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
  const [minAmount, setMinAmount] = useState<string>('');
  const [maxAmount, setMaxAmount] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  useEffect(() => {
    fetchTransactions(
      currentPage,
      limit,
      search,
      order,
      statusFilter,
      minAmount ? Number(minAmount) : undefined,
      maxAmount ? Number(maxAmount) : undefined,
      startDate || undefined,
      endDate || undefined
    );
  }, [currentPage, limit, search, order, statusFilter, minAmount, maxAmount, startDate, endDate, fetchTransactions]);

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
      await downloadExcel(
        1,
        10000,
        search,
        order,
        statusFilter,
        minAmount ? Number(minAmount) : undefined,
        maxAmount ? Number(maxAmount) : undefined,
        startDate || undefined,
        endDate || undefined
      );
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
      // Solo enviar el status, sin el id en el body
      await updateTransaction(id, { status });
    } catch (err) {
      console.error(err);
      addAlert({ type: 'danger', message: 'Error al actualizar el estado de la transacción' });
    }
  };

  const clearAllFilters = () => {
    setSearch('');
    setOrder('reciente');
    setStatusFilter('todos');
    setMinAmount('');
    setMaxAmount('');
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
  };

  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  return (
    <>
      <Container fluid className="px-3">
        {/* Panel de Filtros Mejorado */}
        <div className={`${styles.filtersPanel} mb-4`}>
          {/* Filtros Principales */}
          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6 col-lg-4">
              <Form.Group>
                <Form.Label className={styles.filterLabel}>
                  <i className="fas fa-search me-1"></i>
                  Buscar Cliente
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre del cliente..."
                  value={search}
                  onChange={handleSearchChange}
                  className={styles.filterInput}
                />
              </Form.Group>
            </div>
            
            <div className="col-6 col-md-3 col-lg-2">
              <Form.Group>
                <Form.Label className={styles.filterLabel}>
                  <i className="fas fa-sort me-1"></i>
                  Ordenar por
                </Form.Label>
                <Form.Select
                  value={order}
                  onChange={e => setOrder(e.target.value as 'reciente' | 'antiguo')}
                  className={styles.filterInput}
                >
                  <option value="reciente">Más reciente</option>
                  <option value="antiguo">Más antiguo</option>
                </Form.Select>
              </Form.Group>
            </div>
            
            <div className="col-6 col-md-3 col-lg-2">
              <Form.Group>
                <Form.Label className={styles.filterLabel}>
                  <i className="fas fa-check-circle me-1"></i>
                  Estado
                </Form.Label>
                <Form.Select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value as 'todos' | 'aprobado' | 'no_aprobado')}
                  className={styles.filterInput}
                >
                  <option value="todos">Todos</option>
                  <option value="aprobado">Aprobados</option>
                  <option value="no_aprobado">No aprobados</option>
                </Form.Select>
              </Form.Group>
            </div>
            
            <div className="col-6 col-md-3 col-lg-2">
              <Form.Group>
                <Form.Label className={styles.filterLabel}>
                  <i className="fas fa-list me-1"></i>
                  Por página
                </Form.Label>
                <Form.Select
                  value={limit}
                  onChange={handleLimitChange}
                  className={styles.filterInput}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </Form.Select>
              </Form.Group>
            </div>
            
            <div className="col-6 col-md-3 col-lg-2">
              <Form.Group>
                <Form.Label className={styles.filterLabel}>
                  <i className="fas fa-download me-1"></i>
                  Exportar
                </Form.Label>
                <Button 
                  variant="success" 
                  onClick={handleDownloadExcel} 
                  className={`w-100 ${styles.exportBtn}`}
                >
                  <i className="fas fa-file-excel me-1"></i>
                  Excel
                </Button>
              </Form.Group>
            </div>
          </div>
          
          {/* Toggle para Filtros Avanzados */}
          <div className={`${styles.advancedFiltersToggle} d-flex justify-content-between align-items-center`}>
            <Button 
              variant="link"
              onClick={toggleAdvancedFilters}
              className={`p-0 ${styles.toggleBtn}`}
            >
              <i className={`fas ${showAdvancedFilters ? 'fa-chevron-up' : 'fa-chevron-down'} me-2`}></i>
              <small className="fw-bold text-primary">
                FILTROS AVANZADOS 
                {(minAmount || maxAmount || startDate || endDate) && (
                  <span className={`badge bg-primary ms-2 ${styles.filterBadge}`}>
                    {[minAmount, maxAmount, startDate, endDate].filter(Boolean).length}
                  </span>
                )}
              </small>
            </Button>
            
            <Button 
              variant="outline-secondary" 
              size="sm" 
              onClick={clearAllFilters}
              className={styles.clearFiltersBtn}
            >
              <i className="fas fa-times me-1"></i>
              Limpiar Filtros
            </Button>
          </div>
          
          {/* Filtros Avanzados - Colapsable */}
          {showAdvancedFilters && (
            <div className={styles.advancedFilters}>
              <div className="row g-3">
                <div className="col-6 col-md-3">
                  <Form.Group>
                    <Form.Label className={styles.filterLabel}>
                      <i className="fas fa-dollar-sign me-1"></i>
                      Monto Mínimo
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="0.00"
                      value={minAmount}
                      onChange={e => setMinAmount(e.target.value)}
                      className={styles.filterInput}
                      min="0"
                      step="0.01"
                    />
                  </Form.Group>
                </div>
                
                <div className="col-6 col-md-3">
                  <Form.Group>
                    <Form.Label className={styles.filterLabel}>
                      <i className="fas fa-dollar-sign me-1"></i>
                      Monto Máximo
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="999999.99"
                      value={maxAmount}
                      onChange={e => setMaxAmount(e.target.value)}
                      className={styles.filterInput}
                      min="0"
                      step="0.01"
                    />
                  </Form.Group>
                </div>
                
                <div className="col-6 col-md-3">
                  <Form.Group>
                    <Form.Label className={styles.filterLabel}>
                      <i className="fas fa-calendar-alt me-1"></i>
                      Fecha Inicio
                    </Form.Label>
                    <Form.Control
                      type="date"
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                      className={styles.filterInput}
                    />
                  </Form.Group>
                </div>
                
                <div className="col-6 col-md-3">
                  <Form.Group>
                    <Form.Label className={styles.filterLabel}>
                      <i className="fas fa-calendar-alt me-1"></i>
                      Fecha Fin
                    </Form.Label>
                    <Form.Control
                      type="date"
                      value={endDate}
                      onChange={e => setEndDate(e.target.value)}
                      className={styles.filterInput}
                    />
                  </Form.Group>
                </div>
              </div>
            </div>
          )}
        </div>
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

