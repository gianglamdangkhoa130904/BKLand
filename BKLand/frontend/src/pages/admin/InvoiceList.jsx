import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Modal,
  Box,
  IconButton,
  useColorMode,
  useColorModeValue,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Badge,
  Select,
  Text,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import {
  FiEdit,
  FiTrash2,
} from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import TopNav from '../../components/TopNav';
import BreadcrumbBar from '../../components/Breadcrumbar';
import { useSnackbar } from 'notistack';
import Cookie from 'js-cookie';
import axios from 'axios';
import Spinner from '../../components/Spiner';

function InvoiceList() {
  const { colorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchCustomers();
    const userName = Cookie.get('name');
    if (userName) {
      enqueueSnackbar(`Chào mừng ${userName}`, { variant: 'success' });
    }
  }, []);

  useEffect(() => {
    if (selectedCustomerId) {
      fetchCustomerAndInvoices(selectedCustomerId);
    } else {
      setInvoices([]);
    }
  }, [selectedCustomerId]);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://bkland.onrender.com/users');
      if (response.data?.data) {
        const activeCustomers = response.data.data.filter(user => user.statusAccount === "active");
        setCustomers(activeCustomers);
      }
    } catch (error) {
      enqueueSnackbar('Lỗi khi tải danh sách khách hàng: ' + (error.response?.data?.message || error.message), { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomerAndInvoices = async (customerId) => {
    setLoading(true);
    try {
      console.log(customerId);
      // Sửa URL API theo định dạng mới
      const invoicesResponse = await axios.get(`https://bkland.onrender.com/order/user/${customerId}`);
      console.log(invoicesResponse.data.data)
      if (invoicesResponse.data.data) {
        
        setInvoices(invoicesResponse.data.data);
        enqueueSnackbar(`Đã tải ${invoicesResponse.data.length} hóa đơn`, { variant: 'success' });
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setInvoices([]);
        enqueueSnackbar('Không có hóa đơn nào cho khách hàng này', { variant: 'info' });
      } else {
        enqueueSnackbar('Lỗi khi tải hóa đơn: ' + (error.response?.data?.message || error.message), { variant: 'error' });
        setInvoices([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerChange = (e) => {
    setSelectedCustomerId(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      // Sửa URL API theo định dạng mới
      await axios.delete(`http://localhost:1324/order/${id}`);
      enqueueSnackbar('Xóa hóa đơn thành công', { variant: 'success' });
      fetchCustomerAndInvoices(selectedCustomerId);
    } catch (error) {
      enqueueSnackbar('Xóa hóa đơn thất bại: ' + (error.response?.data?.message || error.message), { variant: 'error' });
    }
  };

  const handleEdit = (invoice) => {
    setSelectedInvoice({ ...invoice });
    onOpen();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedInvoice(prev => ({
      ...prev,
      [name]: name === 'orderAmount' ? Number(value) : value
    }));
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        orderType: selectedInvoice.orderType,
        orderDescription: selectedInvoice.orderDescription,
        orderAmount: selectedInvoice.orderAmount,
        customerID: selectedCustomerId
      };
  
      await axios.put(`http://localhost:1324/order/${selectedInvoice._id}`, updatedData);
      enqueueSnackbar('Cập nhật hóa đơn thành công', { variant: 'success' });
      fetchCustomerAndInvoices(selectedCustomerId);
      onClose();
    } catch (error) {
      enqueueSnackbar('Cập nhật hóa đơn thất bại: ' + (error.response?.data?.message || error.message), { variant: 'error' });
    }
  };

  if (loading) return <Spinner />;

  return (
    <Box minH="100vh" display="flex" bg={bg} color={textColor}>
      <Sidebar />
      <Box flex="1" display="flex" flexDirection="column">
        <TopNav />
        <BreadcrumbBar />
        <Box flex="1" bg={bg} color={textColor} p={4}>
          <Box mb={6}>
            <FormControl>
              <FormLabel>Chọn khách hàng</FormLabel>
              <Select
                placeholder="Chọn khách hàng để xem hóa đơn"
                value={selectedCustomerId}
                onChange={handleCustomerChange}
              >
                {customers.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {customer.name || customer.username} - {customer.email} ({customer.phone || 'Chưa có SĐT'})
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box minH="87vh" bg={bg} color={textColor} overflowX="auto">
            {invoices.length > 0 ? (
              <Table variant="simple" minWidth="1000px">
              <Thead>
                <Tr>
                  <Th width="5%">STT</Th>
                  <Th width="15%">MÃ HOÁ ĐƠN</Th>
                  <Th width="15%">NGÀY LÀM ĐƠN</Th>
                  <Th width="20%">LOẠI GIAO DỊCH</Th>
                  <Th width="15%">SỐ TIỀN</Th>
                  <Th width="10%">MÔ TẢ</Th>
                  <Th width="20%">THAO TÁC</Th>
                </Tr>
              </Thead>
              <Tbody>
                {invoices.map((invoice, index) => (
                  <Tr key={invoice._id}>
                    <Td>{index + 1}</Td>
                    <Td color="blue.500">{invoice._id}</Td>
                    <Td>
                      {new Date(invoice.orderDate).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                      <br />
                      {new Date(invoice.orderDate).toLocaleDateString('vi-VN')}
                    </Td>
                    <Td>{invoice.orderType}</Td>
                    <Td>
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(invoice.orderAmount)}
                    </Td>
                    <Td>{invoice.orderDescription}</Td>
                    <Td>
                      <IconButton
                        icon={<FiEdit />}
                        aria-label="Edit"
                        mr={2}
                        onClick={() => handleEdit(invoice)}
                      />
                      <IconButton
                        icon={<FiTrash2 />}
                        aria-label="Delete"
                        colorScheme="red"
                        onClick={() => handleDelete(invoice._id)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            ) : selectedCustomerId ? (
              <Alert status="info">
                <AlertIcon />
                <Text>Không có hóa đơn nào cho khách hàng này</Text>
              </Alert>
            ) : (
              <Alert status="info">
                <AlertIcon />
                <Text>Vui lòng chọn khách hàng để xem hóa đơn</Text>
              </Alert>
            )}

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Chỉnh sửa hóa đơn</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                {selectedInvoice && (
                  <>
                    <FormControl mb={4}>
                      <FormLabel>Loại giao dịch</FormLabel>
                      <Input
                        name="orderType"
                        value={selectedInvoice.orderType}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl mb={4}>
                      <FormLabel>Mô tả</FormLabel>
                      <Input
                        name="orderDescription"
                        value={selectedInvoice.orderDescription}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl mb={4}>
                      <FormLabel>Số tiền</FormLabel>
                      <Input
                        name="orderAmount"
                        value={selectedInvoice.orderAmount}
                        onChange={handleChange}
                        type="number"
                      />
                    </FormControl>
                  </>
                )}
              </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={handleSave}>
                    Lưu
                  </Button>
                  <Button onClick={onClose}>Hủy</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default InvoiceList;