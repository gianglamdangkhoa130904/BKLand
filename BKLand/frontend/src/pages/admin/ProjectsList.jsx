import React, { useEffect, useState } from 'react';
import { 
  Box, Heading, Table, Thead, Tr, Th, Tbody, Td, IconButton, Button, 
  useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, 
  ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Select, Text
} from '@chakra-ui/react';
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import TopNav from '../../components/TopNav';
import BreadcrumbBar from '../../components/Breadcrumbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';

function ProjectsList() {
  const { enqueueSnackbar } = useSnackbar();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null);
  
  const [form, setForm] = useState({
    projectName: '',
    projectDescription: '',
    province: '',
    projectType: '',
  });
  const [file, setFile] = useState(null); // New state for the image file

  const [provinces, setProvinces] = useState([]);
  const [projectTypes, setProjectTypes] = useState([]);
  const navigate = useNavigate();

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
      const response = await axios.get('https://bkland.onrender.com/projects');
      setProjects(response.data.data);
    } catch (error) {
      enqueueSnackbar('Failed to fetch projects', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchProvinces = async () => {
    try {
      const response = await axios.get('https://bkland.onrender.com/provinces');
      setProvinces(response.data.data);
    } catch (error) {
      enqueueSnackbar('Failed to fetch provinces', { variant: 'error' });
    }
  };

  const fetchProjectTypes = async () => {
    try {
      const response = await axios.get('https://bkland.onrender.com/projectTypes');
      setProjectTypes(response.data.data);
    } catch (error) {
      enqueueSnackbar('Failed to fetch project types', { variant: 'error' });
    }
  };

  const handleAddProject = async () => {
    const formData = new FormData();
    formData.append('projectName', form.projectName);
    formData.append('projectDescription', form.projectDescription);
    formData.append('province', form.province);
    formData.append('projectType', form.projectType);
    if (file) {
      formData.append('projectImage', file); // Add the image file to the formData
    }

    try {
      await axios.post('https://bkland.onrender.com/projects', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      enqueueSnackbar('Project added successfully', { variant: 'success' });
      fetchProjects();
      setIsModalOpen(false);
      clearForm();
    } catch (error) {
      enqueueSnackbar(`Failed to add project: ${error.response?.data?.message || error.message}`, { variant: 'error' });
    }
  };

  const handleEditProject = async () => {
    const formData = new FormData();
    formData.append('projectName', form.projectName);
    formData.append('projectDescription', form.projectDescription);
    formData.append('province', form.province);
    formData.append('projectType', form.projectType);
    if (file) {
      formData.append('projectImage', file); // Add the image file if available
    }

    try {
      await axios.put(`https://bkland.onrender.com/projects/${editingProjectId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      enqueueSnackbar('Project updated successfully', { variant: 'success' });
      fetchProjects();
      setIsModalOpen(false);
      clearForm();
    } catch (error) {
      enqueueSnackbar(`Failed to update project: ${error.response?.data?.message || error.message}`, { variant: 'error' });
    }
  };

  const openEditModal = (project) => {
    setEditingProjectId(project._id);
    setForm({
      projectName: project.projectName,
      projectDescription: project.projectDescription,
      province: project.province?._id || '',
      projectType: project.projectType?._id || '',
    });
    setIsModalOpen(true);
  };

  const openDeleteConfirmation = (id) => {
    setDeleteProjectId(id);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDeleteProject = async () => {
    try {
      await axios.delete(`https://bkland.onrender.com/projects/${deleteProjectId}`);
      enqueueSnackbar('Project deleted successfully', { variant: 'success' });
      fetchProjects();
    } catch (error) {
      enqueueSnackbar(`Failed to delete project: ${error.response?.data?.message || error.message}`, { variant: 'error' });
    } finally {
      setIsDeleteConfirmationOpen(false);
      setDeleteProjectId(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); 
  };

  const clearForm = () => {
    setForm({
      projectName: '',
      projectDescription: '',
      province: '',
      projectType: '',
    });
    setFile(null);
    setEditingProjectId(null);
  };

  return (
    <Box minH="100vh" display="flex" bg={bg} color={textColor}>
      <Sidebar />
      <Box flex="1" display="flex" flexDirection="column" width="100%">
        <TopNav />
        <BreadcrumbBar />
        <Box flex="1" p={4} width="100%">
          <Heading mb={4}>Dự án</Heading>
          <Button colorScheme="blue" mb={4} onClick={() => { clearForm(); setIsModalOpen(true); }}>
            Thêm dự án
          </Button>
          <Table variant="simple" width="100%">
            <Thead>
              <Tr>
                <Th width="5%">STT</Th>
                <Th width="20%">Tên dự án</Th>
                <Th width="30%">Mô tả</Th>
                <Th width="15%">Tỉnh thành</Th>
                <Th width="15%">Loại</Th>
                <Th width="15%">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {projects.map((project, index) => (
                <Tr key={project._id}>
                  <Td>{index + 1}</Td>
                  <Td>{project.projectName}</Td>
                  <Td>{project.projectDescription}</Td>
                  <Td>{project.province?.provinceName}</Td>
                  <Td>{project.projectType?.projectTypeName}</Td>
                  <Td>
                    <IconButton icon={<FiEye />} aria-label="View Subdivisions" mr={2} onClick={() => navigate(`/admin/subdivision/${project._id}`)} />
                    <IconButton icon={<FiEdit />} aria-label="Edit" mr={2} onClick={() => openEditModal(project)} />
                    <IconButton 
                      icon={<FiTrash2 />} 
                      aria-label="Delete" 
                      colorScheme="red" 
                      onClick={() => openDeleteConfirmation(project._id)} 
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{editingProjectId ? 'Edit Project' : 'Add New Project'}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl mb={4}>
                  <FormLabel>Tên dự án</FormLabel>
                  <Input
                    name="projectName"
                    value={form.projectName}
                    onChange={handleChange}
                    placeholder="Tên dự án"
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Mô tả</FormLabel>
                  <Input
                    name="projectDescription"
                    value={form.projectDescription}
                    onChange={handleChange}
                    placeholder="Mô tả dự án"
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Tỉnh thành</FormLabel>
                  <Select
                    name="province"
                    value={form.province}
                    onChange={handleChange}
                    placeholder="Chọn tỉnh thành"
                  >
                    {provinces.map((province) => (
                      <option key={province._id} value={province._id}>
                        {province.provinceName}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Loại dự án</FormLabel>
                  <Select
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    placeholder="Chọn loại dự án"
                  >
                    {projectTypes.map((type) => (
                      <option key={type._id} value={type._id}>
                        {type.projectTypeName}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Hình ảnh dự án</FormLabel>
                  <Input
                    type="file"
                    onChange={handleFileChange} // Update the file state on change
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={editingProjectId ? handleEditProject : handleAddProject}>
                  {editingProjectId ? 'Update Project' : 'Add Project'}
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>Huỷ</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Modal isOpen={isDeleteConfirmationOpen} onClose={() => setIsDeleteConfirmationOpen(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Confirm Deletion</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Are you sure you want to delete this project?</Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={handleDeleteProject}>
                  Delete
                </Button>
                <Button onClick={() => setIsDeleteConfirmationOpen(false)}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
}

export default ProjectsList;
