import React, { useEffect, useState } from 'react';
import {
  Box, Heading, VStack, useColorModeValue, Text, Spinner, Button, useDisclosure, List, ListItem, Divider,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
} from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar';
import TopNav from '../../components/TopNav';
import BreadcrumbBar from '../../components/Breadcrumbar';
import axios from 'axios';
import { useSnackbar } from 'notistack';

function Information() {
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
      const response = await axios.get('http://localhost:1325/contactTickets');
      setTickets(response.data.data);
    } catch (error) {
      enqueueSnackbar('Failed to fetch tickets', { variant: 'error' });
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
          <Heading mb={4}>Thông tin liên hệ</Heading>
          {loading ? (
            <Spinner />
          ) : (
            <List spacing={3}>
              {tickets.map((ticket, index) => (
                <ListItem key={ticket._id} p={4} bg={useColorModeValue('gray.100', 'gray.700')} borderRadius="md" boxShadow="md">
                  <Text><strong>Tên khách hàng:</strong> {ticket.customerName}</Text>
                  <Text><strong>Số điện thoại:</strong> {ticket.phoneNumber}</Text>
                  <Text><strong>Email:</strong> {ticket.email}</Text>
                  <Text><strong>Project ID:</strong> {ticket.projectID}</Text>
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

export default Information;
