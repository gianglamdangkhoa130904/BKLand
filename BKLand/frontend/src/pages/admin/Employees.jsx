import React, { useEffect, useState } from 'react';
import { 
    Box, Heading, Button, FormControl, FormLabel, Input, Modal, ModalOverlay, 
    ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, 
    Table, Thead, Tr, Th, Tbody, Td, IconButton, useColorModeValue, Select 
} from '@chakra-ui/react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import TopNav from '../../components/TopNav';
import BreadcrumbBar from '../../components/Breadcrumbar';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const API_URL = 'https://bkland.onrender.com/admins';

function Employees() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate(); 
    const [admins, setAdmins] = useState([]);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasAccess, setHasAccess] = useState(true); 
    const [form, setForm] = useState({
        username: '',
        password: '',
        role: 'employee',
        adminStatus: 'Active'
    });

    const bg = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.800', 'white');
    
    useEffect(() => {
      const adminRole = Cookies.get('adminRole');
      if (adminRole !== 'manager') {
          setHasAccess(false);
          enqueueSnackbar('You do not have permission to access this page', { 
              variant: 'error',
              autoHideDuration: 3000
          });
          navigate('/login'); 
      } else {
          setHasAccess(true);
      }
  }, [navigate]);

  if (!hasAccess) {
    return (
        <Box minH="100vh" display="flex" bg={bg} color={textColor}>
            <Sidebar />
            <Box flex="1" display="flex" flexDirection="column" width="100%">
                <TopNav />
                <BreadcrumbBar />
                <Box flex="1" p={4}>
                    <Alert
                        status="error"
                        variant="subtle"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        height="200px"
                        borderRadius="md"
                    >
                        <AlertIcon boxSize="40px" mr={0} />
                        <AlertTitle mt={4} mb={1} fontSize="lg">
                            Access Denied
                        </AlertTitle>
                        <AlertDescription maxWidth="sm">
                            You don't have permission to access this page. 
                            Only managers can access the admin management section.
                        </AlertDescription>
                    </Alert>
                </Box>
            </Box>
        </Box>
    );
}

    const fetchAdmins = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            console.log('Fetched admins:', response.data);
            setAdmins(response.data);
        } catch (error) {
            console.error('Fetch error:', error);
            enqueueSnackbar(error.response?.data?.message || 'Failed to fetch admins', { variant: 'error' });
        }
        setLoading(false);
    };

    useEffect(() => {
      if (hasAccess) {
          fetchAdmins();
      }
  }, [hasAccess]);

    const handleCreateAdmin = async () => {
        try {
            if (!form.username || !form.password) {
                enqueueSnackbar('Username and password are required', { variant: 'error' });
                return;
            }

            const response = await axios.post(API_URL, form);
            console.log('Create response:', response.data);

            if (response.data) {
                enqueueSnackbar('Admin created successfully', { variant: 'success' });
                fetchAdmins();
                onClose();
                resetForm();
            }
        } catch (error) {
            console.error('Create error:', error);
            enqueueSnackbar(error.response?.data?.message || 'Failed to create admin', { variant: 'error' });
        }
    };

    const handleUpdateAdmin = async () => {
        try {
            if (!selectedAdmin?._id) return;

            const updateData = {
                role: form.role,
                adminStatus: form.adminStatus
            };
            if (form.password) {
                updateData.password = form.password;
            }

            console.log('Updating admin:', selectedAdmin._id, updateData);
            const response = await axios.put(`${API_URL}/${selectedAdmin._id}`, updateData);
            console.log('Update response:', response.data);

            if (response.data) {
                enqueueSnackbar('Admin updated successfully', { variant: 'success' });
                fetchAdmins();
                onClose();
                resetForm();
            }
        } catch (error) {
            console.error('Update error:', error);
            enqueueSnackbar(error.response?.data?.message || 'Failed to update admin', { variant: 'error' });
        }
    };

    const handleDeleteAdmin = async (id) => {
        if (window.confirm('Are you sure you want to delete this admin?')) {
            try {
                console.log('Deleting admin:', id);
                const response = await axios.delete(`${API_URL}/${id}`);
                console.log('Delete response:', response.data);

                if (response.data) {
                    enqueueSnackbar('Admin deleted successfully', { variant: 'success' });
                    fetchAdmins();
                }
            } catch (error) {
                console.error('Delete error:', error);
                enqueueSnackbar(error.response?.data?.message || 'Failed to delete admin', { variant: 'error' });
            }
        }
    };

    const resetForm = () => {
        setForm({
            username: '',
            password: '',
            role: 'employee',
            adminStatus: 'Active'
        });
        setSelectedAdmin(null);
    };

    const openEditModal = (admin) => {
        console.log('Editing admin:', admin);
        setSelectedAdmin(admin);
        setForm({
            username: admin.username,
            password: '',
            role: admin.role || 'employee',
            adminStatus: admin.adminStatus || 'Active'
        });
        onOpen();
    };

    const handleAddOrEdit = () => {
        if (selectedAdmin) {
            handleUpdateAdmin();
        } else {
            handleCreateAdmin();
        }
    };

    const openAddModal = () => {
        resetForm();
        onOpen();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Box minH="100vh" display="flex" bg={bg} color={textColor}>
            <Sidebar />
            <Box flex="1" display="flex" flexDirection="column" width="100%">
                <TopNav />
                <BreadcrumbBar />
                <Box flex="1" p={4} width="100%">
                    <Heading mb={4}>Admin Management</Heading>
                    <Button colorScheme="blue" onClick={openAddModal} mb={4}>
                        Add Admin
                    </Button>

                    {loading ? (
                        <Box>Loading...</Box>
                    ) : (
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>STT</Th>
                                    <Th>Username</Th>
                                    <Th>Role</Th>
                                    <Th>Status</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {admins.map((admin, index) => (
                                    <Tr key={admin._id}>
                                        <Td>{index + 1}</Td>
                                        <Td>{admin.username}</Td>
                                        <Td>{admin.role}</Td>
                                        <Td>{admin.adminStatus}</Td>
                                        <Td>
                                            <IconButton
                                                icon={<FiEdit />}
                                                aria-label="Edit"
                                                mr={2}
                                                onClick={() => openEditModal(admin)}
                                            />
                                            <IconButton
                                                icon={<FiTrash2 />}
                                                aria-label="Delete"
                                                colorScheme="red"
                                                onClick={() => handleDeleteAdmin(admin._id)}
                                            />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    )}

                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>
                                {selectedAdmin ? 'Edit Admin' : 'Add New Admin'}
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <FormControl mb={4} isRequired>
                                    <FormLabel>Username</FormLabel>
                                    <Input
                                        name="username"
                                        value={form.username}
                                        onChange={handleChange}
                                        readOnly={!!selectedAdmin}
                                    />
                                </FormControl>

                                <FormControl mb={4} isRequired={!selectedAdmin}>
                                    <FormLabel>
                                        {selectedAdmin ? 'New Password (leave blank to keep current)' : 'Password'}
                                    </FormLabel>
                                    <Input
                                        name="password"
                                        type="password"
                                        value={form.password}
                                        onChange={handleChange}
                                    />
                                </FormControl>

                                <FormControl mb={4}>
                                    <FormLabel>Role</FormLabel>
                                    <Select
                                        name="role"
                                        value={form.role}
                                        onChange={handleChange}
                                    >
                                        <option value="employee">Employee</option>
                                        <option value="admin">Admin</option>
                                        <option value="manager">Manager</option>
                                    </Select>
                                </FormControl>

                                <FormControl mb={4}>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                        name="adminStatus"
                                        value={form.adminStatus}
                                        onChange={handleChange}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                        <option value="Suspended">Suspended</option>
                                    </Select>
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="blue" mr={3} onClick={handleAddOrEdit}>
                                    {selectedAdmin ? 'Update' : 'Add'}
                                </Button>
                                <Button variant="ghost" onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>
            </Box>
        </Box>
    );
}

export default Employees;