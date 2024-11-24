import React, { useEffect, useState } from 'react';
import { 
  Box, Select, Heading, Text, ModalFooter, Button, Table, Thead, Tr, Th, Tbody, Td, IconButton, 
  useColorModeValue, Modal, useDisclosure, ModalOverlay, ModalContent, ModalHeader, 
  ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Flex,
  Alert, AlertIcon
} from '@chakra-ui/react';
import { FiEye, FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import TopNav from '../../components/TopNav';
import BreadcrumbBar from '../../components/Breadcrumbar';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useParams, useNavigate } from 'react-router-dom';

function Building() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { subdivisionId } = useParams(); 
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const navigate = useNavigate();
  const [subdivisionDetails, setSubdivisionDetails] = useState(null);
  const [buildings, setBuildings] = useState([]); 
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const [form, setForm] = useState({
    buildingName: '',
    buildingDescription: '',
    buildingStatus: 'Active',
    subdivision: '',
  });

  useEffect(() => {
    if (subdivisionId) {
      fetchSubdivisionDetailsAndBuildings(subdivisionId);
    }
  }, [subdivisionId]);

  const fetchSubdivisionDetailsAndBuildings = async (id) => {
    setIsLoading(true);
    try {
      const subdivisionResponse = await axios.get(`https://bkland.onrender.com/subdivisions/${id}`);
      setSubdivisionDetails(subdivisionResponse.data); 

      const buildingsResponse = await axios.get(`https://bkland.onrender.com/buildings?subdivision=${id}`);
      setBuildings(buildingsResponse.data.data);
    } catch (error) {
      enqueueSnackbar('Failed to fetch data', { variant: 'error' });
      console.error('Failed to fetch data', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewBuildingDetails = (buildingId) => {
    navigate(`/admin/apartment/${buildingId}/`);
  };

  const handleAddNew = () => {
    setSelectedBuilding(null);
    setForm({
      buildingName: '',
      buildingDescription: '',
      buildingStatus: 'Active',
      subdivision: subdivisionId,
    });
    onOpen();
  };

  const handleAddOrEdit = async () => {
    // Validation
    if (!form.buildingName.trim()) {
      enqueueSnackbar('Tên tòa không được để trống', { variant: 'error' });
      return;
    }

    if (selectedBuilding) {
      await handleUpdateBuilding();
    } else {
      await handleCreateBuilding();
    }
  };

  const handleCreateBuilding = async () => {
    setIsLoading(true);
    try {
      await axios.post('https://bkland.onrender.com/buildings', {
        ...form,
        subdivision: subdivisionId
      });
      enqueueSnackbar('Tạo tòa mới thành công', { variant: 'success' });
      await fetchSubdivisionDetailsAndBuildings(subdivisionId);
      onClose();
      setForm({
        buildingName: '',
        buildingDescription: '',
        buildingStatus: 'Active',
        subdivision: '',
      });
    } catch (error) {
      enqueueSnackbar('Không thể tạo tòa mới: ' + (error.response?.data?.message || error.message), { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateBuilding = async () => {
    setIsLoading(true);
    try {
      await axios.put(`https://bkland.onrender.com/buildings/${selectedBuilding._id}`, {
        ...form,
        subdivision: subdivisionId
      });
      enqueueSnackbar('Cập nhật tòa thành công', { variant: 'success' });
      await fetchSubdivisionDetailsAndBuildings(subdivisionId);
      setSelectedBuilding(null);
      onClose();
    } catch (error) {
      enqueueSnackbar('Không thể cập nhật tòa: ' + (error.response?.data?.message || error.message), { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBuilding = async (buildingId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tòa này?')) {
      return;
    }

    setIsLoading(true);
    try {
      await axios.delete(`https://bkland.onrender.com/buildings/${buildingId}`);
      enqueueSnackbar('Xóa tòa thành công', { variant: 'success' });
      await fetchSubdivisionDetailsAndBuildings(subdivisionId);
    } catch (error) {
      enqueueSnackbar('Không thể xóa tòa: ' + (error.response?.data?.message || error.message), { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = (building) => {
    setSelectedBuilding(building);
    setForm({
      buildingName: building.buildingName,
      buildingDescription: building.buildingDescription,
      buildingStatus: building.buildingStatus,
      subdivision: subdivisionId,
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
            <Heading>Thông tin chi tiết Phân khu</Heading>
            <Button
              leftIcon={<FiPlus />}
              colorScheme="blue"
              onClick={handleAddNew}
              isLoading={isLoading}
            >
              Thêm tòa mới
            </Button>
          </Flex>

          {subdivisionDetails && (
            <Box mb={8} p={4} borderWidth="1px" borderRadius="md" bg="white" shadow="sm">
              <Heading size="md" mb={4}>Thông tin phân khu</Heading>
              <Text><strong>Tên:</strong> {subdivisionDetails.subdivisionName}</Text>
              <Text><strong>Mô tả:</strong> {subdivisionDetails.subdivisionDescription}</Text>
              <Text><strong>Trạng thái:</strong> {subdivisionDetails.subdivisionStatus || 'Active'}</Text>
              <Text><strong>Dự án:</strong> {subdivisionDetails.project?.projectName || 'No project associated'}</Text>
            </Box>
          )}

          <Box mb={4}>
            <Heading size="md" mb={4}>Các toà thuộc về phân khu</Heading>
            {buildings.length === 0 && !isLoading && (
              <Alert status="info" mb={4}>
                <AlertIcon />
                Chưa có tòa nào trong phân khu này
              </Alert>
            )}
            <Table variant="simple" width="100%" bg="white" shadow="sm">
              <Thead>
                <Tr>
                  <Th width="10%">STT</Th>
                  <Th width="20%">Tên toà</Th>
                  <Th width="20%">Mô tả</Th>
                  <Th width="25%">Trạng thái</Th>
                  <Th width="10%">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {buildings.map((building, index) => (
                  <Tr key={building._id}>
                    <Td>{index + 1}</Td>
                    <Td>{building.buildingName}</Td>
                    <Td>{building.buildingDescription}</Td>
                    <Td>{building.buildingStatus}</Td>
                    <Td className='flex'>
                      <IconButton
                        icon={<FiEye />}
                        aria-label="View Building Details"
                        onClick={() => handleViewBuildingDetails(building._id)}
                        mr={2}
                      />
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
              <ModalHeader>{selectedBuilding ? 'Chỉnh sửa tòa' : 'Thêm tòa mới'}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl mb={4} isRequired>
                  <FormLabel>Tên toà</FormLabel>
                  <Input
                    name="buildingName"
                    value={form.buildingName}
                    onChange={handleChange}
                    placeholder="Nhập tên tòa..."
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Mô tả</FormLabel>
                  <Input
                    name="buildingDescription"
                    value={form.buildingDescription}
                    onChange={handleChange}
                    placeholder="Nhập mô tả..."
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Trạng thái</FormLabel>
                  <Select
                    name="buildingStatus"
                    value={form.buildingStatus}
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
                  {selectedBuilding ? 'Cập nhật' : 'Thêm mới'}
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