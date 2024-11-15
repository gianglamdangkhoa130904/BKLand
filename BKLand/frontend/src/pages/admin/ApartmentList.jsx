import React, { useEffect, useState } from 'react';
import { 
  Box, Heading, Button, FormControl, FormLabel, Input, Modal, ModalOverlay, 
  ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Table, Thead, Tr, Th, Tbody, Td, IconButton, useColorModeValue, Select, Text
} from '@chakra-ui/react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import TopNav from '../../components/TopNav';
import BreadcrumbBar from '../../components/Breadcrumbar';
import axios from 'axios';
import { useSnackbar } from 'notistack';

function ApartmentList() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { enqueueSnackbar } = useSnackbar();
  const [apartments, setApartments] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [deleteApartmentId, setDeleteApartmentId] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null); // New state for file upload
  const [form, setForm] = useState({
    sellingPrice: '',
    rentPrice: '',
    numberOfBedroom: '',
    numberOfToilet: '',
    direction: '',
    floor: '',
    buildingID: '',
  });

  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  useEffect(() => {
    fetchApartments();
    fetchBuildings();
  }, []);

  const fetchApartments = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://bkland.onrender.com/apartments');
      setApartments(response.data.data);
    } catch (error) {
      enqueueSnackbar('Failed to fetch apartments', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchBuildings = async () => {
    try {
      const response = await axios.get('https://bkland.onrender.com/buildings');
      setBuildings(response.data.data);
    } catch (error) {
      enqueueSnackbar('Failed to fetch buildings', { variant: 'error' });
    }
  };

  const handleAddOrEdit = () => {
    if (selectedApartment) {
      handleUpdateApartment();
    } else {
      handleCreateApartment();
    }
  };

  const handleCreateApartment = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file); // Append the selected file
      Object.keys(form).forEach((key) => formData.append(key, form[key]));

      const response = await axios.post('https://bkland.onrender.com/apartments', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      enqueueSnackbar('Apartment added successfully', { variant: 'success' });
      fetchApartments();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add apartment';
      enqueueSnackbar(errorMessage, { variant: 'error' });
      console.error('Error adding apartment:', error);
    } finally {
      onClose();
      clearForm();
    }
  };

  const handleUpdateApartment = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file); // Append the selected file
      Object.keys(form).forEach((key) => formData.append(key, form[key]));

      await axios.put(`https://bkland.onrender.com/apartments/${selectedApartment._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      enqueueSnackbar('Apartment updated successfully', { variant: 'success' });
      fetchApartments();
    } catch (error) {
      enqueueSnackbar('Failed to update apartment', { variant: 'error' });
    } finally {
      onClose();
      clearForm();
    }
  };

  const openEditModal = (apartment) => {
    setSelectedApartment(apartment);
    setForm({
      sellingPrice: apartment.sellingPrice,
      rentPrice: apartment.rentPrice,
      numberOfBedroom: apartment.numberOfBedroom,
      numberOfToilet: apartment.numberOfToilet,
      direction: apartment.direction,
      floor: apartment.floor,
      buildingID: apartment.buildingID || '',
    });
    onOpen();
  };

  const openAddModal = () => {
    setSelectedApartment(null);
    clearForm();
    onOpen();
  };

  const clearForm = () => {
    setForm({
      sellingPrice: '',
      rentPrice: '',
      numberOfBedroom: '',
      numberOfToilet: '',
      direction: '',
      floor: '',
      buildingID: '',
    });
    setFile(null); // Clear the selected file
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Box minH="100vh" display="flex" bg={bg} color={textColor}>
      <Sidebar />
      <Box flex="1" display="flex" flexDirection="column" width="100%">
        <TopNav />
        <BreadcrumbBar />
        <Box flex="1" p={4} width="100%">
          <Heading mb={4}>Danh sách căn hộ</Heading>
          <Button colorScheme="blue" onClick={openAddModal} mb={4}>
            Thêm căn hộ
          </Button>
          <Table variant="simple" width="100%">
            <Thead>
              <Tr>
                <Th width="5%">STT</Th>
                <Th width="15%">Giá bán</Th>
                <Th width="15%">Giá thuê</Th>
                <Th width="10%">Phòng ngủ</Th>
                <Th width="10%">Nhà vệ sinh</Th>
                <Th width="10%">Hướng</Th>
                <Th width="10%">Tầng</Th>
                <Th width="10%">Toà</Th>
                <Th width="20%" textAlign="right">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {apartments.map((apartment, index) => (
                <Tr key={apartment._id}>
                  <Td>{index + 1}</Td>
                  <Td>{apartment.sellingPrice}</Td>
                  <Td>{apartment.rentPrice}</Td>
                  <Td>{apartment.numberOfBedroom}</Td>
                  <Td>{apartment.numberOfToilet}</Td>
                  <Td>{apartment.direction}</Td>
                  <Td>{apartment.floor}</Td>
                  <Td>{apartment.buildingID?.buildingName || 'No Building'}</Td>
                  <Td textAlign="right">
                    <IconButton
                      icon={<FiEdit />}
                      aria-label="Edit"
                      mr={2}
                      onClick={() => openEditModal(apartment)}
                    />
                    <IconButton
                      icon={<FiTrash2 />}
                      aria-label="Delete"
                      colorScheme="red"
                      onClick={() => openDeleteConfirmation(apartment._id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Modal isOpen={isOpen} onClose={() => { onClose(); clearForm(); }}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedApartment ? 'Edit Apartment' : 'Add New Apartment'}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl mb={4}>
                  <FormLabel>Giá bán</FormLabel>
                  <Input name="sellingPrice" type="number" value={form.sellingPrice} onChange={handleChange} />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Giá thuê</FormLabel>
                  <Input name="rentPrice" type="number" value={form.rentPrice} onChange={handleChange} />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Phòng ngủ</FormLabel>
                  <Input name="numberOfBedroom" type="number" value={form.numberOfBedroom} onChange={handleChange} />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Nhà vệ sinh</FormLabel>
                  <Input name="numberOfToilet" type="number" value={form.numberOfToilet} onChange={handleChange} />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Hướng</FormLabel>
                  <Input name="direction" value={form.direction} onChange={handleChange} />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Tầng</FormLabel>
                  <Input name="floor" value={form.floor} onChange={handleChange} />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Toà</FormLabel>
                  <Select name="buildingID" value={form.buildingID} onChange={handleChange}>
                    <option value="">Chọn toà</option>
                    {buildings.map((building) => (
                      <option key={building._id} value={building._id}>{building.buildingName}</option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Hình ảnh</FormLabel>
                  <Input type="file" onChange={handleFileChange} />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleAddOrEdit}>
                  {selectedApartment ? 'Update' : 'Add'}
                </Button>
                <Button onClick={() => { onClose(); clearForm(); }}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
}

export default ApartmentList;
