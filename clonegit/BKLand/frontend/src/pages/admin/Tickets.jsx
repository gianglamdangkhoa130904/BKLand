import React, { useEffect, useState } from 'react';
import {
  Box, Heading, VStack, useColorModeValue, Text, Spinner, List, ListItem, Divider,
} from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar';
import TopNav from '../../components/TopNav';
import BreadcrumbBar from '../../components/Breadcrumbar';
import axios from 'axios';
import { useSnackbar } from 'notistack';

function Tickets() {
  const { enqueueSnackbar } = useSnackbar();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:1325/ownershipCertificates');
      setTickets(response.data.data);
    } catch (error) {
      enqueueSnackbar('Failed to fetch ownership certificates', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" display="flex" bg={bg} color={textColor}>
      <Sidebar />
      <Box flex="1" display="flex" flexDirection="column">
        <TopNav />
        <BreadcrumbBar />
        <Box flex="1" p={4} bg={bg} color={textColor}>
          <Heading mb={4}>Phiếu Sở Hữu Căn Hộ</Heading>
          {loading ? (
            <Spinner />
          ) : (
            <List spacing={3}>
              {tickets.map((ticket, index) => (
                <ListItem key={ticket._id} p={4} bg={useColorModeValue('gray.100', 'gray.700')} borderRadius="md" boxShadow="md">
                  <Text><strong>Loại phiếu:</strong> {ticket.ticketType}</Text>
                  <Text><strong>Ngày phát hành:</strong> {new Date(ticket.publishDate).toLocaleDateString()}</Text>
                  <Text><strong>Thời hạn:</strong> {ticket.validityPeriod ? new Date(ticket.validityPeriod).toLocaleDateString() : 'Không xác định'}</Text>
                  <Text><strong>Trạng thái:</strong> {ticket.statusTicket}</Text>
                  <Text><strong>ID Khách hàng:</strong> {ticket.customerID}</Text>
                  <Text><strong>ID Căn hộ:</strong> {ticket.apartmentID}</Text>
                  {index < tickets.length - 1 && <Divider mt={4} />}
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Tickets;
