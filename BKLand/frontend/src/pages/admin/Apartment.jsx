import React, { useEffect, useState } from 'react';
import { 
  Box, Heading, Text, Table, Thead, Tr, Th, Tbody, Td, IconButton, useColorModeValue, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Select 
} from '@chakra-ui/react';
import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import TopNav from '../../components/TopNav';
import BreadcrumbBar from '../../components/Breadcrumbar';

function Apartment() {
  const { buildingId } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [buildingDetails, setBuildingDetails] = useState(null);
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [form, setForm] = useState({
    sellingPrice: '',
    rentPrice: '',
    numberOfBedroom: '',
    numberOfToilet: '',
    direction: '',
    floor: '',
    buildingID: buildingId,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (buildingId) {
      fetchBuildingDetailsAndApartments(buildingId);
    }
  }, [buildingId]);

  const fetchBuildingDetailsAndApartments = async (id) => {
    try {
      setLoading(true);
      setError(null);

      // Fetch building details and apartments
      const response = await axios.get(`http://localhost:1324/apartments/buildingDetails/${id}`);
      if (response.data) {
        setBuildingDetails(response.data.building);
        setApartments(response.data.apartments);
      } else {
        throw new Error("No data found for building details.");
      }
    } catch (error) {
      setError(error.message);
      enqueueSnackbar(`Failed to fetch data: ${error.message}`, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddApartment = () => {
    setSelectedApartment(null);
    setForm({
      sellingPrice: '',
      rentPrice: '',
      numberOfBedroom: '',
      numberOfToilet: '',
      direction: '',
      floor: '',
      buildingID: buildingId,
    });
    setIsAddEditModalOpen(true);
  };

  const handleEditApartment = (apartment) => {
    setSelectedApartment(apartment);
    setForm({
      sellingPrice: apartment.sellingPrice,
      rentPrice: apartment.rentPrice,
      numberOfBedroom: apartment.numberOfBedroom,
      numberOfToilet: apartment.numberOfToilet,
      direction: apartment.direction,
      floor: apartment.floor,
      buildingID: buildingId,
    });
    setIsAddEditModalOpen(true);
  };

  const handleSaveApartment = async () => {
    try {
      if (selectedApartment) {
        // Update existing apartment
        await axios.put(`http://localhost:1324/apartments/${selectedApartment._id}`, form);
        enqueueSnackbar('Apartment updated successfully', { variant: 'success' });
      } else {
        // Create new apartment
        await axios.post('http://localhost:1324/apartments', form);
        enqueueSnackbar('Apartment added successfully', { variant: 'success' });
      }
      fetchBuildingDetailsAndApartments(buildingId);
      setIsAddEditModalOpen(false);
    } catch (error) {
      enqueueSnackbar('Failed to save apartment', { variant: 'error' });
    }
  };

  const handleDeleteApartment = async (apartmentId) => {
    try {
      setIsDeleting(true);
      await axios.delete(`http://localhost:1324/apartments/${apartmentId}`);
      enqueueSnackbar('Apartment deleted successfully', { variant: 'success' });
      fetchBuildingDetailsAndApartments(buildingId);
    } catch (error) {
      enqueueSnackbar('Failed to delete apartment', { variant: 'error' });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <Box minH="100vh" display="flex" bg={useColorModeValue('white', 'gray.800')} color={useColorModeValue('gray.800', 'white')}>
      {/* Existing code for Sidebar, TopNav, BreadcrumbBar */}
      <Sidebar />
      <Box flex="1" p={4} width="100%">
        <TopNav />
        <BreadcrumbBar />
        <Heading mb={4}>Thông tin chi tiết của Toà</Heading>

        {error ? (
            <Text color="red.500">Error: {error}</Text>
          ) : loading ? (
            <Text>Đăng lấy thông tin chi tiết của toà...</Text>
          ) : buildingDetails ? (
            <Box mb={8} p={4} borderWidth="1px" borderRadius="md">
              <Heading size="md">Thông tin toà</Heading>
              <Text><strong>Tên toà:</strong> {buildingDetails.buildingName}</Text>
              <Text><strong>Mô tả:</strong> {buildingDetails.buildingDescription}</Text>
              <Text><strong>Trạng thái:</strong> {buildingDetails.buildingStatus || 'Active'}</Text>
              <Text><strong>Phân khu:</strong> {buildingDetails.subdivision?.subdivisionName || 'No subdivision associated'}</Text>
            </Box>
          ) : (
            <Text>Thông tin chi tiết của toà hiện không khả dụng</Text>
          )}

        <Heading size="md" mb={4}>Các căn hộ thuộc về toà</Heading>
        <Button colorScheme="blue" onClick={handleAddApartment} mb={4}>
          Thêm căn hộ
        </Button>
        {loading ? (
          <Text>Loading apartments...</Text>
        ) : apartments.length > 0 ? (
          <Table variant="simple" width="100%">
            <Thead>
              <Tr>
                <Th>STT</Th>
                <Th>Giá bán</Th>
                <Th>Giá thuê</Th>
                <Th>Phòng ngủ</Th>
                <Th>Nhà vệ sinh</Th>
                <Th>Hướng</Th>
                <Th>Tầng</Th>
                <Th>Actions</Th>
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
                  <Td>
                    <IconButton
                      icon={<FiEdit />}
                      aria-label="Edit"
                      mr={2}
                      onClick={() => handleEditApartment(apartment)}
                    />
                    <IconButton
                      icon={<FiTrash2 />}
                      aria-label="Delete"
                      colorScheme="red"
                      onClick={() => handleDeleteApartment(apartment._id)}
                      isLoading={isDeleting}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Text>No apartments found for this building.</Text>
        )}

        <Modal isOpen={isAddEditModalOpen} onClose={() => setIsAddEditModalOpen(false)}>
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
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSaveApartment}>
                {selectedApartment ? 'Update' : 'Add'}
              </Button>
              <Button onClick={() => setIsAddEditModalOpen(false)}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
}

export default Apartment;