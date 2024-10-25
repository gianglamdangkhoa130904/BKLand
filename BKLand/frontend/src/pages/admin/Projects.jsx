import React, { useEffect, useState } from 'react';
import { 
  useColorMode, useColorModeValue, Box, Heading, Button, FormControl, FormLabel, Input, Modal, ModalOverlay, 
  ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Table, Thead, Tr, Th, Tbody, Td, IconButton, Select
} from '@chakra-ui/react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import TopNav from '../../components/TopNav';
import BreadcrumbBar from '../../components/Breadcrumbar';
import axios from 'axios';
import { useSnackbar } from 'notistack';

function Projects() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { enqueueSnackbar } = useSnackbar();
  const [projects, setProjects] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [projectTypes, setProjectTypes] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    projectName: '',
    projectDescription: '',
    province: '',
    projectType: '',
  });

  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  useEffect(() => {
    fetchProjects();
    fetchProvinces();
    fetchProjectTypes();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:1325/projects');
      setProjects(response.data.data);
    } catch (error) {
      enqueueSnackbar('Failed to fetch projects', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchProvinces = async () => {
    try {
      const response = await axios.get('http://localhost:1325/provinces');
      setProvinces(response.data.data);
    } catch (error) {
      enqueueSnackbar('Failed to fetch provinces', { variant: 'error' });
    }
  };

  const fetchProjectTypes = async () => {
    try {
      const response = await axios.get('http://localhost:1325/projectTypes');
      setProjectTypes(response.data.data);
    } catch (error) {
      enqueueSnackbar('Failed to fetch project types', { variant: 'error' });
    }
  };

  const handleAddOrEdit = () => {
    if (selectedProject) {
      handleUpdateProject();
    } else {
      handleCreateProject();
    }
  };

  const handleCreateProject = async () => {
    console.log('Form data:', form);
    try {
      await axios.post('http://localhost:1325/projects', form);
      enqueueSnackbar('Project added successfully', { variant: 'success' });
      fetchProjects();
    } catch (error) {
      console.error('Error adding project:', error.response.data); // Log error response
      enqueueSnackbar('Failed to add project', { variant: 'error' });
    } finally {
      onClose();
    }
  };
  

  const handleUpdateProject = async () => {
    try {
      await axios.put(`http://localhost:1325/projects/${selectedProject._id}`, form);
      enqueueSnackbar('Project updated successfully', { variant: 'success' });
      fetchProjects(); 
    } catch (error) {
      enqueueSnackbar('Failed to update project', { variant: 'error' });
    } finally {
      onClose();
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:1325/projects/${id}`);
      enqueueSnackbar('Project deleted successfully', { variant: 'success' });
      fetchProjects();
    } catch (error) {
      enqueueSnackbar('Failed to delete project', { variant: 'error' });
    }
  };

  const openEditModal = (project) => {
    setSelectedProject(project);
    setForm({
      projectName: project.projectName,
      projectDescription: project.projectDescription,
      province: project.province._id,
      projectType: project.projectType._id,
    });
    onOpen();
  };

  const openAddModal = () => {
    setSelectedProject(null);
    setForm({
      projectName: '',
      projectDescription: '',
      projectImage:'',
      province: '',
      projectType: '',
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
          <Heading mb={4}>Projects</Heading>
          <Button colorScheme="blue" onClick={openAddModal} mb={4}>
            THÊM DỰ ÁN
          </Button>
          <Table variant="simple" width="100%">
            <Thead>
              <Tr>
                <Th width="5%">STT</Th>
                <Th width="15%">Project Name</Th>
                <Th width="20%">Description</Th>
                <Th width="15%">Province</Th>
                <Th width="15%">Type</Th>
                <Th width="10%">Status</Th>
                <Th width="20%" textAlign="right">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {projects.map((project, index) => (
                <Tr key={project._id}>
                  <Td width="5%">{index + 1}</Td>
                  <Td width="15%">{project.projectName}</Td>
                  <Td width="20%">{project.projectDescription}</Td>
                  <Td width="15%">{project.province?.provinceName}</Td>
                  <Td width="15%">{project.projectType?.projectTypeName}</Td>
                  <Td width="10%">{project.projectStatus}</Td>
                  <Td width="20%" textAlign="right">
                    <IconButton
                      icon={<FiEdit />}
                      aria-label="Edit"
                      mr={2}
                      onClick={() => openEditModal(project)}
                    />
                    <IconButton
                      icon={<FiTrash2 />}
                      aria-label="Delete"
                      colorScheme="red"
                      onClick={() => handleDeleteProject(project._id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {/* Modal for Adding/Editing Project */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedProject ? 'Edit Project' : 'Add New Project'}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl mb={4}>
                  <FormLabel>Project Name</FormLabel>
                  <Input
                    name="projectName"
                    value={form.projectName}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Project Description</FormLabel>
                  <Input
                    name="projectDescription"
                    value={form.projectDescription}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Project Image URL</FormLabel>
                  <Input
                    name="projectImage"
                    value={form.projectImage}
                    onChange={handleChange}
                    placeholder="Enter image URL"
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Province</FormLabel>
                  <Select
                    name="province"
                    value={form.province}
                    onChange={handleChange}
                  >
                    <option value="">Select Province</option>
                    {provinces.map((province) => (
                      <option key={province._id} value={province._id}>
                        {province.provinceName}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Project Type</FormLabel>
                  <Select
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                  >
                    <option value="">Select Project Type</option>
                    {projectTypes.map((type) => (
                      <option key={type._id} value={type._id}>
                        {type.projectTypeName}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleAddOrEdit}>
                  {selectedProject ? 'Update' : 'Add'}
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

export default Projects;
