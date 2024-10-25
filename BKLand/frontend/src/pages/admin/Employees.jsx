import React, { useEffect, useState } from 'react';
import { 
  useColorMode, useColorModeValue, Box, Heading, Button, FormControl, FormLabel, Input, Modal, ModalOverlay, 
  ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Table, Thead, Tr, Th, Tbody, Td, IconButton
} from '@chakra-ui/react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import TopNav from '../../components/TopNav';
import BreadcrumbBar from '../../components/Breadcrumbar';
import axios from 'axios';
import { useSnackbar } from 'notistack';

function Employees() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { enqueueSnackbar } = useSnackbar();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    phone: '',
    dob: '',
    nationality: '',
    statusAccount: '',
    role: '',
  });

  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:1325/employees');
      setEmployees(response.data);
    } catch (error) {
      enqueueSnackbar('Failed to fetch employees', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrEdit = () => {
    if (selectedEmployee) {
      handleUpdateEmployee();
    } else {
      handleCreateEmployee();
    }
  };

  const handleCreateEmployee = async () => {
    try {
      await axios.post(`http://localhost:1325/employees`, form);
      enqueueSnackbar('Employee added successfully', { variant: 'success' });
      fetchEmployees();
    } catch (error) {
      enqueueSnackbar('Failed to add employee', { variant: 'error' });
    } finally {
      onClose();
    }
  };
  
  const handleUpdateEmployee = async () => {
    try {
      await axios.put(`http://localhost:1325/employees/${selectedEmployee._id}`, form);
      enqueueSnackbar('Employee updated successfully', { variant: 'success' });
      fetchEmployees(); 
    } catch (error) {
      enqueueSnackbar('Failed to update employee', { variant: 'error' });
    } finally {
      onClose();
    }
  };
  
  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:1325/employees/${id}`);
      enqueueSnackbar('Employee deleted successfully', { variant: 'success' });
      fetchEmployees();
    } catch (error) {
      enqueueSnackbar('Failed to delete employee', { variant: 'error' });
    }
  };

  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setForm({
      username: employee.username,
      password: '', // Đặt lại mật khẩu trống để bảo mật
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      dob: employee.dob,
      nationality: employee.nationality,
      statusAccount: employee.statusAccount,
      role: employee.role,
    });
    onOpen();
  };

  const openAddModal = () => {
    setSelectedEmployee(null);
    setForm({
        username: '',
        password: '',
        name: '',
        email: '',
        phone: '',
        dob: '',
        nationality: '',
        statusAccount: 'Active',
        role: 'Admin', // Hoặc bỏ qua nếu mặc định từ backend
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
          <Heading mb={4}>Employee Management</Heading>
          <Button colorScheme="blue" onClick={openAddModal} mb={4}>
            Add Employee
          </Button>
          <Table variant="simple" width="100%">
            <Thead>
              <Tr>
                <Th width="5%">ID</Th>
                <Th width="15%">Name</Th>
                <Th width="15%">Email</Th>
                <Th width="10%">Phone</Th>
                <Th width="10%">Role</Th>
                <Th width="10%">Status</Th>
                <Th width="15%" textAlign="right">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {employees.map((employee, index) => (
                <Tr key={employee._id}>
                  <Td width="5%">{index + 1}</Td>
                  <Td width="15%">{employee.name}</Td>
                  <Td width="15%">{employee.email}</Td>
                  <Td width="10%">{employee.phone}</Td>
                  <Td width="10%">{employee.role}</Td>
                  <Td width="10%">{employee.statusAccount}</Td>
                  <Td width="15%" textAlign="right">
                    <IconButton
                      icon={<FiEdit />}
                      aria-label="Edit"
                      mr={2}
                      onClick={() => openEditModal(employee)}
                    />
                    <IconButton
                      icon={<FiTrash2 />}
                      aria-label="Delete"
                      colorScheme="red"
                      onClick={() => handleDeleteEmployee(employee._id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {/* Modal for Adding/Editing Employee */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedEmployee ? 'Edit Employee' : 'Add New Employee'}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl mb={4}>
                  <FormLabel>Username</FormLabel>
                  <Input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Role</FormLabel>
                  <Input
                    name="role"
                    value={form.role}
                    isReadOnly={true} // Không cho phép chỉnh sửa
                    disabled={true}  // Hoặc sử dụng `disabled` nếu muốn
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleAddOrEdit}>
                  {selectedEmployee ? 'Update' : 'Add'}
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

export default Employees;
