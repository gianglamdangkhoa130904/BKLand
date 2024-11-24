import React, { useEffect, useState } from 'react';
import { 
  useColorMode, useColorModeValue, Box, Heading, Button, FormControl, FormLabel, Input, Modal, ModalOverlay, 
  ModalContent, Flex, InputGroup, InputLeftElement,ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Table, Thead, Tr, Th, Tbody, Td, IconButton, Select
} from '@chakra-ui/react';
import { FiEdit, FiTrash2, FiEye, FiSearch } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import TopNav from '../../components/TopNav';
import BreadcrumbBar from '../../components/Breadcrumbar';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

function Projects() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { enqueueSnackbar } = useSnackbar();
  const [projects, setProjects] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [provinceMap, setProvinceMap] = useState({});
  const [projectTypes, setProjectTypes] = useState([]);
  const [projectTypeMap, setProjectTypeMap] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    projectName: '',
    projectDescription: '',
    province: '',
    projectType: '',
    projectStatus: 'Active',
  });
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedProjectType, setSelectedProjectType] = useState('');

  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  useEffect(() => {
    fetchProjects();
    fetchProvinces();
    fetchProjectTypes();
  }, []);
  
  // Effect để xử lý tìm kiếm
  useEffect(() => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedProvince) {
      filtered = filtered.filter(project => project.province === selectedProvince);
    }

    if (selectedProjectType) {
      filtered = filtered.filter(project => project.projectType === selectedProjectType);
    }

    setFilteredProjects(filtered);
  }, [searchTerm, selectedProvince, selectedProjectType, projects]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://bkland.onrender.com/projects');
      const projectsData = response.data.data;

      // Fetch province and project type data
      const provincesResponse = await axios.get('https://bkland.onrender.com/provinces');
      const projectTypesResponse = await axios.get('https://bkland.onrender.com/projectTypes');

      // Create province and project type maps
      const provinceMap = {};
      provincesResponse.data.data.forEach(province => {
        provinceMap[province._id] = province.provinceName;
      });
      setProvinceMap(provinceMap);

      const projectTypeMap = {};
      projectTypesResponse.data.data.forEach(type => {
        projectTypeMap[type._id] = type.projectTypeName;
      });
      setProjectTypeMap(projectTypeMap);

      setProjects(projectsData);
      setFilteredProjects(projectsData);
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

  const handleAddOrEdit = () => {
    if (selectedProject) {
      handleUpdateProject();
    } else {
      handleCreateProject();
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleProvinceFilter = (e) => {
    setSelectedProvince(e.target.value);
  };

  const handleProjectTypeFilter = (e) => {
    setSelectedProjectType(e.target.value);
  };

  const handleCreateProject = async () => {
    console.log('Form data:', form);
    try {
      await axios.post('https://bkland.onrender.com/projects', form);
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
      await axios.put(`https://bkland.onrender.com/projects/${selectedProject._id}`, form);
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
      await axios.delete(`https://bkland.onrender.com/projects/${id}`);
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
      projectStatus: project.projectStatus,
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
      projectStatus: 'Active',
    });
    onOpen();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleViewProjectDetails = (projectId) => {
    navigate(`/admin/subdivision/${projectId}/`);
  }

  return (
    <Box minH="100vh" display="flex" bg={bg} color={textColor}>
      <Sidebar />
      <Box flex="1" display="flex" flexDirection="column" width="100%">
        <TopNav />
        <BreadcrumbBar />
        <Box flex="1" p={4} width="100%">
          <Heading mb={4}>Projects</Heading>
          <Flex mb={4} justifyContent="space-between" alignItems="center">
            <InputGroup maxW="300px">
              <InputLeftElement pointerEvents="none">
                <FiSearch color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Tìm kiếm dự án..."
                value={searchTerm}
                onChange={handleSearch}
                bg={bg} color={textColor}
                _placeholder={{ color: 'gray.400' }}
              />
            </InputGroup>
            <Flex alignItems="center">
              <Select
                value={selectedProvince}
                onChange={handleProvinceFilter}
                placeholder="Filter by Province"
                mr={2}
                minW="200px"
              >
                <option value="">All Provinces</option>
                {provinces.map((province) => (
                  <option key={province._id} value={province._id}>
                    {province.provinceName}
                  </option>
                ))}
              </Select>
              <Select
                value={selectedProjectType}
                onChange={handleProjectTypeFilter}
                placeholder="Filter by Project Type"
                mr={2}
                minW="200px"
              >
                <option value="">All Project Types</option>
                {projectTypes.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.projectTypeName}
                  </option>
                ))}
              </Select>
              <Button colorScheme="blue" onClick={openAddModal} minW="200px">
                THÊM DỰ ÁN
              </Button>
            </Flex>
          </Flex>
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
              {filteredProjects.map((project, index) => (
                <Tr key={project._id}>
                  <Td width="5%">{index + 1}</Td>
                  <Td width="15%">{project.projectName}</Td>
                  <Td width="20%">{project.projectDescription}</Td>
                  <Td width="15%">{provinceMap[project.province]}</Td>
                  <Td width="15%">{projectTypeMap[project.projectType]}</Td>
                  <Td width="10%">{project.projectStatus}</Td>
                  <Td width="20%" textAlign="right">
                    <IconButton
                      icon={<FiEye />}
                      aria-label="View Project Details"
                      onClick={() => handleViewProjectDetails(project._id)}
                      mr={2}
                    />
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
                <FormControl mb={4}>
                  <FormLabel>Project Status</FormLabel>
                  <Select
                    name="projectStatus"
                    value={form.projectStatus}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Maintenance">Maintenance</option>
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