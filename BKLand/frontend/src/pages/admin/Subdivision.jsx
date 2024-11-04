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

function Subdivision() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { enqueueSnackbar } = useSnackbar();
  const [subdivisions, setSubdivisions] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedSubdivision, setSelectedSubdivision] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    subdivisionName: '',
    subdivisionDescription: '',
    subdivisionStatus: 'Active',
    project: '',
  });

  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  useEffect(() => {
    fetchSubdivisions();
    fetchProjects();
  }, []);

  const fetchSubdivisions = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:1325/subdivisions');
      setSubdivisions(response.data.data);
    } catch (error) {
      enqueueSnackbar('Failed to fetch subdivisions', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:1325/projects');
      setProjects(response.data.data);
    } catch (error) {
      enqueueSnackbar('Failed to fetch projects', { variant: 'error' });
    }
  };

  const handleAddOrEdit = () => {
    if (selectedSubdivision) {
      handleUpdateSubdivision();
    } else {
      handleCreateSubdivision();
    }
  };

  const handleCreateSubdivision = async () => {
    try {
      await axios.post('http://localhost:1325/subdivisions', form);
      enqueueSnackbar('Subdivision added successfully', { variant: 'success' });
      fetchSubdivisions();
    } catch (error) {
      enqueueSnackbar('Failed to add subdivision', { variant: 'error' });
    } finally {
      onClose();
    }
  };

  const handleUpdateSubdivision = async () => {
    try {
      await axios.put(`http://localhost:1325/subdivisions/${selectedSubdivision._id}`, form);
      enqueueSnackbar('Subdivision updated successfully', { variant: 'success' });
      fetchSubdivisions(); 
    } catch (error) {
      enqueueSnackbar('Failed to update subdivision', { variant: 'error' });
    } finally {
      onClose();
    }
  };

  const handleDeleteSubdivision = async (id) => {
    try {
      await axios.delete(`http://localhost:1325/subdivisions/${id}`);
      enqueueSnackbar('Subdivision deleted successfully', { variant: 'success' });
      fetchSubdivisions();
    } catch (error) {
      enqueueSnackbar('Failed to delete subdivision', { variant: 'error' });
    }
  };

  const openEditModal = (subdivision) => {
    setSelectedSubdivision(subdivision);
    setForm({
      subdivisionName: subdivision.subdivisionName,
      subdivisionDescription: subdivision.subdivisionDescription,
      subdivisionStatus: subdivision.subdivisionStatus,
      project: subdivision.project?._id || '',
    });
    onOpen();
  };

  const openAddModal = () => {
    setSelectedSubdivision(null);
    setForm({
      subdivisionName: '',
      subdivisionDescription: '',
      subdivisionStatus: 'Active',
      project: '',
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
          <Heading mb={4}>Subdivisions</Heading>
          <Button colorScheme="blue" onClick={openAddModal} mb={4}>
            THÊM PHÂN KHU
          </Button>
          <Table variant="simple" width="100%">
            <Thead>
              <Tr>
                <Th width="5%">STT</Th>
                <Th width="20%">Subdivision Name</Th>
                <Th width="25%">Description</Th>
                <Th width="20%">Project</Th>
                <Th width="15%">Status</Th>
                <Th width="15%" textAlign="right">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {subdivisions.map((subdivision, index) => (
                <Tr key={subdivision._id}>
                  <Td width="5%">{index + 1}</Td>
                  <Td width="20%">{subdivision.subdivisionName}</Td>
                  <Td width="25%">{subdivision.subdivisionDescription}</Td>
                  <Td width="20%">{subdivision.project?.projectName || 'No project'}</Td>
                  <Td width="15%">{subdivision.subdivisionStatus}</Td>
                  <Td width="15%" textAlign="right">
                    <IconButton
                      icon={<FiEdit />}
                      aria-label="Edit"
                      mr={2}
                      onClick={() => openEditModal(subdivision)}
                    />
                    <IconButton
                      icon={<FiTrash2 />}
                      aria-label="Delete"
                      colorScheme="red"
                      onClick={() => handleDeleteSubdivision(subdivision._id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {/* Modal for Adding/Editing Subdivision */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedSubdivision ? 'Edit Subdivision' : 'Add New Subdivision'}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl mb={4}>
                  <FormLabel>Subdivision Name</FormLabel>
                  <Input
                    name="subdivisionName"
                    value={form.subdivisionName}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Subdivision Description</FormLabel>
                  <Input
                    name="subdivisionDescription"
                    value={form.subdivisionDescription}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mb={4}>
                <FormLabel>Status</FormLabel>
                <Input
                  name="subdivisionStatus"
                  value={form.subdivisionStatus}
                  onChange={handleChange}
                  placeholder="e.g., Active"
                  isReadOnly={!!selectedSubdivision} // Chỉ cho phép xem khi đang chỉnh sửa
                />
              </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Project</FormLabel>
                  <Select
                    name="project"
                    value={form.project}
                    onChange={handleChange}
                  >
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                      <option key={project._id} value={project._id}>
                        {project.projectName}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleAddOrEdit}>
                  {selectedSubdivision ? 'Update' : 'Add'}
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

export default Subdivision;
