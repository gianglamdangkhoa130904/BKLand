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

function ProjectTypes() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { enqueueSnackbar } = useSnackbar();
  const [projectTypes, setProjectTypes] = useState([]);
  const [selectedProjectType, setSelectedProjectType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    projectTypeName: '',
  });

  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  useEffect(() => {
    fetchProjectTypes();
  }, []);

  const fetchProjectTypes = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:1325/projectTypes');
      setProjectTypes(response.data.data);
    } catch (error) {
      enqueueSnackbar('Failed to fetch project types', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrEdit = () => {
    if (!form.projectTypeName.trim()) {
      enqueueSnackbar('Project type name cannot be empty', { variant: 'error' });
      return;
    }
    if (selectedProjectType) {
      handleUpdateProjectType();
    } else {
      handleCreateProjectType();
    }
  };

  const handleCreateProjectType = async () => {
    try {
      await axios.post('http://localhost:1325/projectTypes', form);
      enqueueSnackbar('Project type added successfully', { variant: 'success' });
      fetchProjectTypes();
    } catch (error) {
      enqueueSnackbar('Failed to add project type', { variant: 'error' });
    } finally {
      onClose();
    }
  };

  const handleUpdateProjectType = async () => {
    try {
      await axios.put(`http://localhost:1325/projectTypes/${selectedProjectType._id}`, form);
      enqueueSnackbar('Project type updated successfully', { variant: 'success' });
      fetchProjectTypes();
    } catch (error) {
      enqueueSnackbar('Failed to update project type', { variant: 'error' });
    } finally {
      onClose();
    }
  };

  const handleDeleteProjectType = async (id) => {
    try {
      await axios.delete(`http://localhost:1325/projectTypes/${id}`);
      enqueueSnackbar('Project type deleted successfully', { variant: 'success' });
      fetchProjectTypes();
    } catch (error) {
      enqueueSnackbar('Failed to delete project type', { variant: 'error' });
    }
  };

  const openEditModal = (type) => {
    setSelectedProjectType(type);
    setForm({
      projectTypeName: type.projectTypeName,
    });
    onOpen();
  };

  const openAddModal = () => {
    setSelectedProjectType(null);
    setForm({
      projectTypeName: '',
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
          <Heading mb={4}>Project Types</Heading>
          <Button colorScheme="blue" onClick={openAddModal} mb={4}>
            ADD PROJECT TYPE
          </Button>
          <Table variant="simple" width="100%">
            <Thead>
              <Tr>
                <Th width="20%">STT</Th>
                <Th width="60%">Type Name</Th>
                <Th width="20%" textAlign="right">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {projectTypes.map((type, index) => (
                <Tr key={type._id}>
                  <Td>{index + 1}</Td>
                  <Td>{type.projectTypeName}</Td>
                  <Td textAlign="right">
                    <IconButton
                      icon={<FiEdit />}
                      aria-label="Edit"
                      mr={2}
                      onClick={() => openEditModal(type)}
                    />
                    <IconButton
                      icon={<FiTrash2 />}
                      aria-label="Delete"
                      colorScheme="red"
                      onClick={() => handleDeleteProjectType(type._id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {/* Modal for Adding/Editing Project Type */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedProjectType ? 'Edit Project Type' : 'Add New Project Type'}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl mb={4}>
                  <FormLabel>Project Type Name</FormLabel>
                  <Input
                    name="projectTypeName"
                    value={form.projectTypeName}
                    onChange={handleChange}
                    placeholder="Enter project type name"
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleAddOrEdit}>
                  {selectedProjectType ? 'Update' : 'Add'}
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

export default ProjectTypes;
