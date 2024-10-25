import React, { useEffect, useState } from 'react';
import { 
  Box, Heading, Button, FormControl, FormLabel, Input, Modal, ModalOverlay, 
  ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, 
  Table, Thead, Tr, Th, Tbody, Td, IconButton, useColorModeValue 
} from '@chakra-ui/react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import TopNav from '../../components/TopNav';
import BreadcrumbBar from '../../components/Breadcrumbar';
import axios from 'axios';
import { useSnackbar } from 'notistack';

function Province() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { enqueueSnackbar } = useSnackbar();
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    provinceName: '',
  });

  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:1325/provinces');
      setProvinces(response.data.data);
    } catch (error) {
      enqueueSnackbar('Failed to fetch provinces', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrEdit = () => {
    if (selectedProvince) {
      handleUpdateProvince();
    } else {
      handleCreateProvince();
    }
  };

  const handleCreateProvince = async () => {
    try {
      await axios.post('http://localhost:1325/provinces', form);
      enqueueSnackbar('Province added successfully', { variant: 'success' });
      fetchProvinces();
    } catch (error) {
      enqueueSnackbar('Failed to add province', { variant: 'error' });
    } finally {
      onClose();
    }
  };

  const handleUpdateProvince = async () => {
    try {
      await axios.put(`http://localhost:1325/provinces/${selectedProvince._id}`, form);
      enqueueSnackbar('Province updated successfully', { variant: 'success' });
      fetchProvinces();
    } catch (error) {
      enqueueSnackbar('Failed to update province', { variant: 'error' });
    } finally {
      onClose();
    }
  };

  const handleDeleteProvince = async (id) => {
    try {
        await axios.delete(`http://localhost:1325/provinces/${id}`);
        enqueueSnackbar('Province deleted successfully', { variant: 'success' });
        fetchProvinces();
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to delete province';
        enqueueSnackbar(errorMessage, { variant: 'error' });
        console.error('Error deleting province:', error);
        console.error('Detailed error message:', errorMessage);
    }
};

  const openEditModal = (province) => {
    setSelectedProvince(province);
    setForm({
      provinceName: province.provinceName,
    });
    onOpen();
  };

  const openAddModal = () => {
    setSelectedProvince(null);
    setForm({
      provinceName: '',
    });
    onOpen();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <Box minH="100vh" display="flex" bg={bg} color={textColor}>
      <Sidebar />
      <Box flex="1" display="flex" flexDirection="column" width="100%">
        <TopNav />
        <BreadcrumbBar />
        <Box flex="1" p={4} width="100%">
          <Heading mb={4}>Provinces</Heading>
          <Button colorScheme="blue" onClick={openAddModal} mb={4}>
            Add Province
          </Button>
          <Table variant="simple" width="100%">
            <Thead>
              <Tr>
                <Th width="20%">STT</Th>
                <Th width="60%">Province Name</Th>
                <Th width="20%" textAlign="right">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {provinces.map((province, index) => (
                <Tr key={province._id}>
                  <Td>{index + 1}</Td>
                  <Td>{province.provinceName}</Td>
                  <Td textAlign="right">
                    <IconButton
                      icon={<FiEdit />}
                      aria-label="Edit"
                      mr={2}
                      onClick={() => openEditModal(province)}
                    />
                    <IconButton
                      icon={<FiTrash2 />}
                      aria-label="Delete"
                      colorScheme="red"
                      onClick={() => handleDeleteProvince(province._id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedProvince ? 'Edit Province' : 'Add New Province'}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl mb={4}>
                  <FormLabel>Province Name</FormLabel>
                  <Input
                    name="provinceName"
                    value={form.provinceName}
                    onChange={handleChange}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleAddOrEdit}>
                  {selectedProvince ? 'Update' : 'Add'}
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
}

export default Province;
