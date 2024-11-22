import React, { useEffect, useState } from 'react';
import { 
  Box, Button, Heading, Text, Table, Thead, Tr, Th, Tbody, Td, IconButton, 
  useColorModeValue, useDisclosure, Modal, ModalFooter, ModalOverlay, 
  ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, 
  FormLabel, Input, Select, Flex, Alert, AlertIcon
} from '@chakra-ui/react';
import { FiEye, FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import TopNav from '../../components/TopNav';
import BreadcrumbBar from '../../components/Breadcrumbar';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';

function Subdivision() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [subdivisions, setSubdivisions] = useState([]);
  const [selectedSubdivision, setSelectedSubdivision] = useState(null);
  const [projectDetails, setProjectDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const [form, setForm] = useState({
    subdivisionName: '',
    subdivisionDescription: '',
    subdivisionStatus: 'Active',
    project: '',
  });

  useEffect(() => {
    if (id) {
      fetchProjectDetailsAndSubdivisions(id);
    }
  }, [id]);

  const fetchProjectDetailsAndSubdivisions = async (projectId) => {
    setIsLoading(true);
    try {
      const projectResponse = await axios.get(`http://localhost:1324/projects/${projectId}`);
      setProjectDetails(projectResponse.data.project);

      const subdivisionsResponse = await axios.get(`http://localhost:1324/subdivisions?project=${projectId}`);
      setSubdivisions(subdivisionsResponse.data.data);
    } catch (error) {
      enqueueSnackbar('Không thể lấy dữ liệu: ' + (error.response?.data?.message || error.message), { variant: 'error' });
      console.error('Failed to fetch data', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewSubdivisionDetails = (subdivisionId) => {
    navigate(`/admin/building/${subdivisionId}`);
  };

  const handleAddNew = () => {
    setSelectedSubdivision(null);
    setForm({
      subdivisionName: '',
      subdivisionDescription: '',
      subdivisionStatus: 'Active',
      project: id,
    });
    onOpen();
  };

  const handleAddOrEdit = () => {
    // Validation
    if (!form.subdivisionName.trim()) {
      enqueueSnackbar('Tên phân khu không được để trống', { variant: 'error' });
      return;
    }

    if (selectedSubdivision) {
      handleUpdateSubdivision();
    } else {
      handleCreateSubdivision();
    }
  };

  const handleCreateSubdivision = async () => {
    setIsLoading(true);
    try {
      await axios.post('http://localhost:1324/subdivisions', {
        ...form,
        project: id
      });
      enqueueSnackbar('Tạo phân khu mới thành công', { variant: 'success' });
      await fetchProjectDetailsAndSubdivisions(id);
      onClose();
      setForm({
        subdivisionName: '',
        subdivisionDescription: '',
        subdivisionStatus: 'Active',
        project: '',
      });
    } catch (error) {
      enqueueSnackbar('Không thể tạo phân khu mới: ' + (error.response?.data?.message || error.message), { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateSubdivision = async () => {
    setIsLoading(true);
    try {
      await axios.put(`http://localhost:1324/subdivisions/${selectedSubdivision._id}`, {
        ...form,
        project: id
      });
      enqueueSnackbar('Cập nhật phân khu thành công', { variant: 'success' });
      await fetchProjectDetailsAndSubdivisions(id);
      setSelectedSubdivision(null);
      onClose();
    } catch (error) {
      enqueueSnackbar('Không thể cập nhật phân khu: ' + (error.response?.data?.message || error.message), { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSubdivision = async (subdivisionId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa phân khu này?')) {
      return;
    }

    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:1324/subdivisions/${subdivisionId}`);
      enqueueSnackbar('Xóa phân khu thành công', { variant: 'success' });
      await fetchProjectDetailsAndSubdivisions(id);
    } catch (error) {
      enqueueSnackbar('Không thể xóa phân khu: ' + (error.response?.data?.message || error.message), { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = (subdivision) => {
    setSelectedSubdivision(subdivision);
    setForm({
      subdivisionName: subdivision.subdivisionName,
      subdivisionDescription: subdivision.subdivisionDescription,
      subdivisionStatus: subdivision.subdivisionStatus,
      project: id,
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
          <Flex justify="space-between" align="center" mb={4}>
            <Heading>Thông tin chi tiết dự án</Heading>
            <Button
              leftIcon={<FiPlus />}
              colorScheme="blue"
              onClick={handleAddNew}
              isLoading={isLoading}
            >
              Thêm phân khu mới
            </Button>
          </Flex>

          {projectDetails && (
            <Box mb={8} p={4} borderWidth="1px" borderRadius="md" bg="white" shadow="sm">
              <Heading size="md" mb={4}>Thông tin dự án</Heading>
              <Text><strong>Tên: </strong> {projectDetails.projectName}</Text>
              <Text><strong>Mô tả:</strong> {projectDetails.projectDescription}</Text>
              <Text><strong>Tỉnh thành:</strong> {projectDetails.province?.provinceName}</Text>
              <Text><strong>Loại:</strong> {projectDetails.projectType?.projectTypeName}</Text>
              <Text><strong>Trạng thái:</strong> {projectDetails.projectStatus || 'Active'}</Text>
            </Box>
          )}

          <Box mb={4}>
            <Heading size="md" mb={4}>Các phân khu thuộc về dự án</Heading>
            {subdivisions.length === 0 && !isLoading && (
              <Alert status="info" mb={4}>
                <AlertIcon />
                Chưa có phân khu nào trong dự án này
              </Alert>
            )}
            <Table variant="simple" width="100%" bg="white" shadow="sm">
              <Thead>
                <Tr>
                  <Th width="5%">STT</Th>
                  <Th width="25%">Tên phân khu</Th>
                  <Th width="25%">Dự án</Th>
                  <Th width="15%">Trạng thái</Th>
                  <Th width="10%">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {subdivisions.map((subdivision, index) => (
                  <Tr key={subdivision._id}>
                    <Td>{index + 1}</Td>
                    <Td>{subdivision.subdivisionName}</Td>
                    <Td>{projectDetails?.projectName}</Td>
                    <Td>{subdivision.subdivisionStatus}</Td>
                    <Td className='flex'>
                      <IconButton
                        icon={<FiEye />}
                        aria-label="View Subdivision Details"
                        onClick={() => handleViewSubdivisionDetails(subdivision._id)}
                        mr={2}
                      />
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
                        isLoading={isLoading}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedSubdivision ? 'Chỉnh sửa phân khu' : 'Thêm phân khu mới'}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl mb={4} isRequired>
                  <FormLabel>Tên phân khu</FormLabel>
                  <Input
                    name="subdivisionName"
                    value={form.subdivisionName}
                    onChange={handleChange}
                    placeholder="Nhập tên phân khu..."
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Mô tả</FormLabel>
                  <Input
                    name="subdivisionDescription"
                    value={form.subdivisionDescription}
                    onChange={handleChange}
                    placeholder="Nhập mô tả..."
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Trạng thái</FormLabel>
                  <Select
                    name="subdivisionStatus"
                    value={form.subdivisionStatus}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Maintenance">Maintenance</option>
                  </Select>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleAddOrEdit} isLoading={isLoading}>
                  {selectedSubdivision ? 'Cập nhật' : 'Thêm mới'}
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

export default Subdivision;