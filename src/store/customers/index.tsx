import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../rootReducer';
import { Client } from '@utils/types';
import customerActions from './actions';
import api from '../../api';
import useUI from '../ui';
import * as XLSX from "xlsx/xlsx";
import { convertKeysToEnglish, convertKeysToSpanish } from '@utils/conversions';
import { ref, uploadString } from 'firebase/storage';
import { storage } from '@utils/firebase.config';
import ClientJson from '@api/json/clients_numeric_id.json';

const useCustomer = () => {
  const { customers, labels, totalPages, page, lastPage } = useSelector((state: RootState) => state.customers);
  const dispatch = useDispatch();
  const { setLoading, addAlert } = useUI();

  const fetchCustomers = async (page: number = 1, limit: number = 50, search: string = '') => {
    setLoading(true);
    try {
      // const response = await api.customers.getCustomersAPI(page, limit, search);
      //customerActions.setCustomers(dispatch, response.data.data);
      //customerActions.setTotalPages(dispatch, response.data.total);
      //customerActions.setPage(dispatch, response.data.page);
      // customerActions.setLastPage(dispatch, response.data.last_page);
      const response = ClientJson as Client[];
      customerActions.setCustomers(dispatch, response);
      customerActions.setTotalPages(dispatch, 1);
      customerActions.setPage(dispatch, 1);
      customerActions.setLastPage(dispatch, 1);
    } catch (error) {
      console.error(`Error: ${error}`);
      addAlert({ type: 'danger', message: 'Ocurrió un error, consulta a soporte' });
    } finally {
      setLoading(false);
    }
  };

  const createCustomer = async (customer: Client) => {
    setLoading(true);
    try {
      const response = await api.customers.createCustomerAPI(customer);
      customerActions.addCustomer(dispatch, response.data);
      addAlert({ type: 'success', message: 'Cliente creado con éxito.' });
    } catch (error) {
      console.error(`Error: ${error}`);
      addAlert({ type: 'danger', message: 'Ocurrió un error, consulta a soporte' });
    } finally {
      setLoading(false);
    }
  };

  const updateCustomer = async (id: number, customer: Client) => {
    setLoading(true);
    try {
      const response = await api.customers.updateCustomerAPI(id, customer);
      customerActions.updateCustomer(dispatch, response.data);
      addAlert({ type: 'success', message: 'Cliente actualizado con éxito.' });
    } catch (error) {
      console.error(`Error: ${error}`);
      addAlert({ type: 'danger', message: 'Ocurrió un error, consulta a soporte' });
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomer = async (id: number) => {
    setLoading(true);
    try {
      await api.customers.deleteCustomerAPI(id);
      customerActions.deleteCustomer(dispatch, id);
      addAlert({ type: 'success', message: 'Cliente eliminado con éxito.' });
    } catch (error) {
      console.error(`Error: ${error}`);
      addAlert({ type: 'danger', message: 'Ocurrió un error, consulta a soporte' });
    } finally {
      setLoading(false);
    }
  };

  const fetchLabels = async () => {
    setLoading(true);
    try {
      const response = await api.customers.getLabelsAPI();
      const labels = response.data.map((label: string) => ({ value: label, label }));
      customerActions.setLabels(dispatch, labels);
    } catch (error) {
      console.error(`Error: ${error}`);
      addAlert({ type: 'danger', message: 'Ocurrió un error, consulta a soporte' });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File, limit: number, search: string) => {
    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (evt: any) => {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const wsname = workbook.SheetNames[0];
        const ws = workbook.Sheets[wsname];
        const jsonData = XLSX.utils.sheet_to_json(ws);

        const allData: Client[] = jsonData.map((row: any) => {
          const dataConvert = convertKeysToEnglish(row);

          const cleanNumber = (num: string) => {
            const cleaned = num.replace(/[^\d]/g, '');
            return isNaN(Number(cleaned)) ? null : Number(cleaned);
          };
          if (!dataConvert.prefix || !dataConvert.phone) {
            return null;
          }
          dataConvert.prefix = cleanNumber(dataConvert.prefix);
          dataConvert.phone = cleanNumber(dataConvert.phone);

          if (dataConvert.prefix === null || dataConvert.phone === null) {
            return null;
          }

          dataConvert['label'] = dataConvert['label'] ? dataConvert['label'].split(',').filter((item: string) => item.trim() !== '') : [];
          return dataConvert as Client;
        }).filter((contact: Client | null) => contact !== null);

        const uniqueFilename = `contacts_${Date.now()}.json`;

        const folderPath = 'uploads_contacts';
        const storageRef = ref(storage, `${folderPath}/${uniqueFilename}`);
        await uploadString(storageRef, JSON.stringify(allData));

        await api.customers.uploadCustomersAPI({ filename: uniqueFilename });

        customerActions.setPage(dispatch, 1);
        fetchCustomers(1, limit, search);
        addAlert({ type: 'success', message: 'Archivo subido con éxito.' });
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error(`Error: ${error}`);
      addAlert({ type: 'danger', message: 'Ocurrió un error al subir el archivo, consulta a soporte' });
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = () => {
    setLoading(true);
    const fileUrl = 'https://firebasestorage.googleapis.com/v0/b/emergent-enterprises.appspot.com/o/assets%2FEMW%2FFormato_Clientes_EMW.xlsx?alt=media&token=46665951-953e-43c8-aa8b-23ef2065a076';
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = 'file-name.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setLoading(false);
  };

  const downloadExcel = async () => {
    setLoading(true);
    try {
      const response = await api.customers.getCustomersAPI(1, 20000, '');
      const allCustomers = response.data.data;

      const customersWithLabelsAsString = allCustomers.map((customer: any) => {
        const customerNew = {
          ...customer,
          label: customer.label ? customer.label.join(', ') : ''
        };
        return convertKeysToSpanish(customerNew);
      });
      const ws = XLSX.utils.json_to_sheet(customersWithLabelsAsString);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Clientes");
      XLSX.writeFile(wb, "Clientes_EMW.xlsx");
    } catch (error) {
      console.error(`Error: ${error}`);
      addAlert({ type: 'danger', message: 'Ocurrió un error al descargar el archivo, consulta a soporte' });
    } finally {
      setLoading(false);
    }
  };

  return {
    customers,
    labels,
    totalPages,
    page,
    lastPage,
    fetchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    fetchLabels,
    handleFileUpload,
    downloadTemplate,
    downloadExcel
  };
};

export default useCustomer;
