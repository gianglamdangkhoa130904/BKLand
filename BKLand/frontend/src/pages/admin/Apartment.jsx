import React, { useState, useEffect } from 'react';
import { 
  FormControl, FormLabel, Input, Button, ModalFooter, ModalOverlay, ModalContent, ModalHeader, 
  ModalCloseButton, ModalBody, useDisclosure, Modal, Box, IconButton, Heading, Table, Thead, Tr, Th, Tbody, Td, Select, useColorModeValue 
} from '@chakra-ui/react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import TopNav from '../../components/TopNav';
import BreadcrumbBar from '../../components/Breadcrumbar';
import { useSnackbar } from 'notistack';
import axios from 'axios';

function Apartments() {
  const bg = useColorModeValue('white', 'gray.800'); // Màu nền thay đổi
  const textColor = useColorModeValue('gray.800', 'white'); // Màu chữ thay đổi

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [apartments, setApartments] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchApartments();
    fetchBuildings();
  }, []);

  const fetchApartments = async () => {
    try {
      const response = await axios.get('http://localhost:1325/apartments');
      setApartments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBuildings = async () => {
    try {
      const response = await axios.get('http://localhost:1325/buildings');
      setBuildings(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1325/apartments/${id}`);
      enqueueSnackbar('Xóa căn hộ thành công', { variant: 'success' });
      fetchApartments();
    } catch (error) {
      enqueueSnackbar('Xóa căn hộ thất bại', { variant: 'error' });
    }
  };

  const handleEdit = (apartment) => {
    setSelectedApartment(apartment);
    onOpen();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedApartment({ ...selectedApartment, [name]: value });
  };

  const handleSave = async () => {
    try {
      if (selectedApartment._id) {
        await axios.put(`http://localhost:1325/apartments/${selectedApartment._id}`, selectedApartment);
        enqueueSnackbar('Cập nhật căn hộ thành công', { variant: 'success' });
      } else {
        await axios.post('http://localhost:1325/apartments', selectedApartment);
        enqueueSnackbar('Thêm căn hộ thành công', { variant: 'success' });
      }
      fetchApartments();
      onClose();
    } catch (error) {
      enqueueSnackbar('Thao tác thất bại', { variant: 'error' });
    }
  };

  const openAddModal = () => {
    setSelectedApartment({
      sellingPrice: '',
      rentPrice: '',
      numberOfBedroom: '',
      numberOfToilet: '',
      direction: '',
      floor: '',
      buildingID: '',
    });
    onOpen();
  };

  return (
    <Box minH="100vh" display="flex" bg={bg} color={textColor}>
      <Sidebar />
      <Box flex="1" display="flex" flexDirection="column" bg={bg} color={textColor}>
        <TopNav />
        <BreadcrumbBar />
        <Box flex="1" bg={bg} color={textColor} p={4}>
          <Box minH="87vh" bg={bg} color={textColor} overflowX="auto">
            <Heading mb={4}>Apartments</Heading>
            <Button colorScheme="blue" onClick={openAddModal} mb={4}>
              ADD APARTMENT
            </Button>
            <Table variant="simple" minWidth="1000px" bg={bg} color={textColor}>
              <Thead>
                <Tr>
                  <Th width="5%">STT</Th>
                  <Th width="15%">Selling Price</Th>
                  <Th width="15%">Rent Price</Th>
                  <Th width="10%">Bedrooms</Th>
                  <Th width="10%">Toilets</Th>
                  <Th width="10%">Direction</Th>
                  <Th width="10%">Floor</Th>
                  <Th width="15%">Building</Th>
                  <Th isNumeric width="10%">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {apartments.map((apartment, index) => (
                  <Tr key={apartment._id}>
                    <Td width="5%">{index + 1}</Td>
                    <Td width="15%">{apartment.sellingPrice}</Td>
                    <Td width="15%">{apartment.rentPrice}</Td>
                    <Td width="10%">{apartment.numberOfBedroom}</Td>
                    <Td width="10%">{apartment.numberOfToilet}</Td>
                    <Td width="10%">{apartment.direction}</Td>
                    <Td width="10%">{apartment.floor}</Td>
                    <Td width="15%">{apartment.buildingID?.buildingName || 'No building'}</Td>
                    <Td isNumeric width="10%">
                      <IconButton
                        icon={<FiEdit />}
                        aria-label="Edit"
                        mr={2}
                        onClick={() => handleEdit(apartment)}
                        color={textColor}
                      />
                      <IconButton
                        icon={<FiTrash2 />}
                        aria-label="Delete"
                        colorScheme="red"
                        onClick={() => handleDelete(apartment._id)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            
            {/* Modal for Adding/Editing Apartment */}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent bg={bg} color={textColor}>
                <ModalHeader>{selectedApartment?._id ? 'Edit Apartment' : 'Add New Apartment'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl mb={4}>
                    <FormLabel>Selling Price</FormLabel>
                    <Input
                      name="sellingPrice"
                      type="number"
                      value={selectedApartment?.sellingPrice || ''}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Rent Price</FormLabel>
                    <Input
                      name="rentPrice"
                      type="number"
                      value={selectedApartment?.rentPrice || ''}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Number of Bedrooms</FormLabel>
                    <Input
                      name="numberOfBedroom"
                      type="number"
                      value={selectedApartment?.numberOfBedroom || ''}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Number of Toilets</FormLabel>
                    <Input
                      name="numberOfToilet"
                      type="number"
                      value={selectedApartment?.numberOfToilet || ''}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Direction</FormLabel>
                    <Input
                      name="direction"
                      value={selectedApartment?.direction || ''}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Floor</FormLabel>
                    <Input
                      name="floor"
                      value={selectedApartment?.floor || ''}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Building</FormLabel>
                    <Select
                      name="buildingID"
                      value={selectedApartment?.buildingID || ''}
                      onChange={handleChange}
                    >
                      <option value="">Select Building</option>
                      {buildings.map((building) => (
                        <option key={building._id} value={building._id}>
                          {building.buildingName}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={handleSave}>
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Apartments;
