import React, { useEffect, useState } from 'react';
import { 
  useColorModeValue, Box, Heading, Button, FormControl, FormLabel, Input, Modal, ModalOverlay, 
  ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Table, Thead, Tr, Th, Tbody, Td, IconButton, Select
} from '@chakra-ui/react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import TopNav from '../../components/TopNav';
import BreadcrumbBar from '../../components/Breadcrumbar.jsx';
import axios from 'axios';
import { useSnackbar } from 'notistack';

function Building() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { enqueueSnackbar } = useSnackbar();
  const [buildings, setBuildings] = useState([]);
  const [subdivisions, setSubdivisions] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    buildingName: '',
    buildingDescription: '',
    buildingStatus: 'Active', // Set default status to Active
    subdivision: '',
  });

  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  useEffect(() => {
    fetchBuildings();
    fetchSubdivisions();
  }, []);

  const fetchBuildings = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://bkland.onrender.com/buildings');
      setBuildings(response.data.data);
    } catch (error) {
      enqueueSnackbar('Failed to fetch buildings', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchSubdivisions = async () => {
    try {
      const response = await axios.get('https://bkland.onrender.com/subdivisions');
      setSubdivisions(response.data.data);
    } catch (error) {
      enqueueSnackbar('Failed to fetch subdivisions', { variant: 'error' });
    }
  };

  const handleAddOrEdit = () => {
    if (selectedBuilding) {
      handleUpdateBuilding();
    } else {
      handleCreateBuilding();
    }
  };

  const handleCreateBuilding = async () => {
    try {
      await axios.post('https://bkland.onrender.com/buildings', form);
      enqueueSnackbar('Building added successfully', { variant: 'success' });
      fetchBuildings();
    } catch (error) {
      enqueueSnackbar('Failed to add building', { variant: 'error' });
    } finally {
      onClose();
    }
  };

  const handleUpdateBuilding = async () => {
    try {
      await axios.put(`https://bkland.onrender.com/buildings/${selectedBuilding._id}`, form);
      enqueueSnackbar('Building updated successfully', { variant: 'success' });
      fetchBuildings();
    } catch (error) {
      enqueueSnackbar('Failed to update building', { variant: 'error' });
    } finally {
      onClose();
    }
  };

  const handleDeleteBuilding = async (id) => {
    try {
      await axios.delete(`https://bkland.onrender.com/buildings/${id}`);
      enqueueSnackbar('Building deleted successfully', { variant: 'success' });
      fetchBuildings();
    } catch (error) {
      enqueueSnackbar('Failed to delete building', { variant: 'error' });
    }
  };

  const openEditModal = (building) => {
    setSelectedBuilding(building);
    setForm({
      buildingName: building.buildingName,
      buildingDescription: building.buildingDescription,
      buildingStatus: building.buildingStatus,
      subdivision: building.subdivision?._id || '',
    });
    onOpen();
  };

  const openAddModal = () => {
    setSelectedBuilding(null);
    setForm({
      buildingName: '',
      buildingDescription: '',
      buildingStatus: 'Active',
      subdivision: '',
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
          <Heading mb={4}>Toà</Heading>
          <Button colorScheme="blue" onClick={openAddModal} mb={4}>
            Thêm toà
          </Button>
          <Table variant="simple" width="100%">
            <Thead>
              <Tr>
                <Th width="5%">STT</Th>
                <Th width="20%">Tên toà</Th>
                <Th width="25%">Mô tả</Th>
                <Th width="20%">Phân khu</Th>
                <Th width="15%">Trạng thái</Th>
                <Th width="15%" textAlign="right">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {buildings.map((building, index) => (
                <Tr key={building._id}>
                  <Td width="5%">{index + 1}</Td>
                  <Td width="20%">{building.buildingName}</Td>
                  <Td width="25%">{building.buildingDescription}</Td>
                  <Td width="20%">{building.subdivision?.subdivisionName || 'No subdivision'}</Td>
                  <Td width="15%">{building.buildingStatus}</Td>
                  <Td width="15%" textAlign="right">
                    <IconButton
                      icon={<FiEdit />}
                      aria-label="Edit"
                      mr={2}
                      onClick={() => openEditModal(building)}
                    />
                    <IconButton
                      icon={<FiTrash2 />}
                      aria-label="Delete"
                      colorScheme="red"
                      onClick={() => handleDeleteBuilding(building._id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {/* Modal for Adding/Editing Building */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedBuilding ? 'Edit Building' : 'Add New Building'}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl mb={4}>
                  <FormLabel>Tên toà</FormLabel>
                  <Input
                    name="buildingName"
                    value={form.buildingName}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Mô tả</FormLabel>
                  <Input
                    name="buildingDescription"
                    value={form.buildingDescription}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Trạng thái</FormLabel>
                  <Input
                    name="buildingStatus"
                    value={form.buildingStatus}
                    onChange={handleChange}
                    placeholder="e.g., Active"
                    isReadOnly={!!selectedBuilding}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Phân khu</FormLabel>
                  <Select
                    name="subdivision"
                    value={form.subdivision}
                    onChange={handleChange}
                  >
                    <option value="">Chọn phân khu</option>
                    {subdivisions.map((subdivision) => (
                      <option key={subdivision._id} value={subdivision._id}>
                        {subdivision.subdivisionName}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleAddOrEdit}>
                  {selectedBuilding ? 'Update' : 'Add'}
                </Button>
                <Button onClick={onClose}>Huỷ</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
}

export default Building;
