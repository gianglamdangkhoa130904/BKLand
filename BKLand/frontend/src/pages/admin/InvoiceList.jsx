import React, { useState } from 'react';
import {
  Box,
  Text,
  useColorModeValue,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import TopNav from '../../components/TopNav';
import BreadcrumbBar from '../../components/Breadcrumbar';

function InvoiceList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const invoices = [
    {
      invoiceId: "INV001",
      date: "2024-03-15T10:30:00.000Z",
      status: "Đã thanh toán",
      type: "Thanh toán căn hộ",
      amount: "2,500,000,000 VNĐ",
      description: "Thanh toán đợt 1 căn hộ A-1503"
    },
    {
      invoiceId: "INV002",
      date: "2024-03-20T14:45:00.000Z",
      status: "Chờ thanh toán",
      type: "Đặt cọc",
      amount: "500,000,000 VNĐ",
      description: "Đặt cọc giữ chỗ căn hộ B-1205"
    }
  ];

  return (
    <Box 
      minH="100vh" 
      display="flex" 
      bg={useColorModeValue('white', 'gray.800')} 
      color={useColorModeValue('gray.800', 'white')}
    >
      <Sidebar />
      <Box flex="1" width="100%">
        <Box 
          borderBottom="1px" 
          borderColor={borderColor}
          sx={{
            boxShadow: 'none',
            '& > *': {
              boxShadow: 'none !important'
            }
          }}
        >
          <TopNav />
          <BreadcrumbBar />
        </Box>
        <Box p={4}>
          <Heading mb={4}>Thông tin hoá đơn</Heading>

          {error ? (
            <Text color="red.500">Error: {error}</Text>
          ) : loading ? (
            <Text>Đang tải dữ liệu...</Text>
          ) : (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>STT</Th>
                  <Th>MÃ HOÁ ĐƠN</Th>
                  <Th>NGÀY LÀM ĐƠN</Th>
                  <Th>TRẠNG THÁI</Th>
                  <Th>LOẠI GIAO DỊCH</Th>
                  <Th>SỐ TIỀN</Th>
                  <Th>MÔ TẢ</Th>
                  <Th>ACTIONS</Th>
                </Tr>
              </Thead>
              <Tbody>
                {invoices.map((invoice, index) => (
                  <Tr key={invoice.invoiceId}>
                    <Td>{index + 1}</Td>
                    <Td color="blue.500">{invoice.invoiceId}</Td>
                    <Td>
                      {new Date(invoice.date).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                      <br />
                      {new Date(invoice.date).toLocaleDateString('vi-VN')}
                    </Td>
                    <Td>
                      <Text
                        color={invoice.status === 'Đã thanh toán' ? 'green.500' : 'orange.500'}
                      >
                        {invoice.status}
                      </Text>
                    </Td>
                    <Td>{invoice.type}</Td>
                    <Td>{invoice.amount}</Td>
                    <Td>{invoice.description}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<FiEdit />}
                          aria-label="Edit"
                          variant="ghost"
                          colorScheme="gray"
                        />
                        <IconButton
                          icon={<FiTrash2 />}
                          aria-label="Delete"
                          variant="ghost"
                          colorScheme="red"
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default InvoiceList;