import React, {useState, useEffect} from 'react';
import { FormControl,FormLabel,Input, Button,ModalFooter,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,useDisclosure,Modal,Box, IconButton, Heading, Text, VStack, Avatar, useColorMode, useColorModeValue, Table, Thead, Tr, Th, Tbody, Td, Select, Flex } from '@chakra-ui/react';
import {
  FiEdit,
  FiTrash2,
} from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import TopNav from '../../components/TopNav';
import BreadcrumbBar from '../../components/Breadcrumbar';
import { useSnackbar } from 'notistack';
import Cookie from 'js-cookie'
import axios from 'axios';
import Spinner from '../../components/Spiner';
import { Link } from 'react-router-dom';

function Customers() {

  const { colorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800'); 
  const borderColor = useColorModeValue('gray.200', 'gray.700'); 
  const textColor = useColorModeValue('gray.800', 'white');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    fetchUser();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [selectedStatus, customers]);

  const fetchUser = () => {
    axios
    .get('https://bkland.onrender.com/users')
    .then((response) => {
      setCustomers(response.data.data);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }

  const filterCustomers = () => {
    if (selectedStatus === "") {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(
        (customer) => customer.statusAccount === selectedStatus
      );
      setFilteredCustomers(filtered);
    }
  };

  const handleStatusFilter = (e) => {
    setSelectedStatus(e.target.value);
  };

  // Handle delete action
  const handleDelete = async (id) => {
    axios.delete(`https://bkland.onrender.com/users/${id}`)
    .then((response) =>{
      enqueueSnackbar(`Xóa người dùng thành công`, { variant: 'success' });
      fetchUser();
    })
    .catch((error) => {
      enqueueSnackbar(`Xóa người dùng thất bại` + error, { variant: 'success' });
    })
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    onOpen();
    console.log(customer._id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedCustomer({ ...selectedCustomer, [name]: value });
  };

  const handleSave = () => {
    console.log(selectedCustomer);
    axios.put(`https://bkland.onrender.com/users/${selectedCustomer._id}`, selectedCustomer)
    .then((response) =>{
      enqueueSnackbar(`Cập nhật người dùng thành công`, { variant: 'success' });
      fetchUser(); // Gọi lại hàm fetchUser để cập nhật danh sách khách hàng sau khi cập nhật thành công
    })
    .catch((error) => {
      console.error('Error updating user:', error.response.data); // Log lỗi nếu có
      enqueueSnackbar(`Cập nhật người dùng thất bại`, { variant: 'error' });
    })
    onClose();
  };

  return (
    <Box minH="100vh" display="flex" bg={bg} color={textColor}>
      <Sidebar />
      <Box flex="1" display="flex" flexDirection="column">
        <TopNav />
        <BreadcrumbBar />
        <Box flex="1" bg={bg} color={textColor} p={4}>
          <Box minH="87vh" bg={bg} color={textColor}>
            <Flex justify="space-between" align="center" mb={4}>
              <Select
                value={selectedStatus}
                onChange={handleStatusFilter}
                placeholder="Lọc theo trạng thái"
                maxW="200px"
              >
                <option value="">Tất cả</option>
                <option value="active">Active</option>
                <option value="Inactive">Inactive</option>
              </Select>
            </Flex>
            <Box overflowX="auto">
              <Table variant="simple" minWidth="1000px">
                <Thead>
                  <Tr>
                    <Th width="5%">STT</Th>
                    <Th width="10%">Username</Th>
                    <Th width="10%">Password</Th>
                    <Th width="15%">Tên khách hàng</Th>
                    <Th width="15%">Email</Th>
                    <Th width="20%">Số điện thoại</Th>
                    <Th width="10%">Trạng thái</Th>
                    <Th isNumeric width="15%">Hành động</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredCustomers.map((customer, index) => (
                    <Tr key={customer._id}>
                      <Td width="5%">{index + 1}</Td>
                      <Td width="10%">{customer.username}</Td>
                      <Td width="10%">{customer.password}</Td>
                      <Td width="15%">{customer.name}</Td>
                      <Td width="15%">{customer.email}</Td>
                      <Td width="20%">{customer.phone}</Td>
                      <Td width="10%">{customer.statusAccount}</Td>
                      <Td isNumeric width="15%">
                        <IconButton
                          icon={<FiEdit />}
                          aria-label="Edit"
                          mr={2}
                          onClick={() => handleEdit(customer)}
                        />
                        <IconButton
                          icon={<FiTrash2 />}
                          aria-label="Delete"
                          colorScheme="red"
                          onClick={() => handleDelete(customer._id)}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit Customer</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {selectedCustomer && (
                    <>
                      <FormControl mb={4}>
                        <FormLabel>Username</FormLabel>
                        <Input
                          name="username"
                          value={selectedCustomer.username}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl mb={4}>
                        <FormLabel>Password</FormLabel>
                        <Input
                          name="password"
                          value={selectedCustomer.password}
                          onChange={handleChange}
                          type="password"
                        />
                      </FormControl>
                      <FormControl mb={4}>
                        <FormLabel>Tên khách hàng</FormLabel>
                        <Input
                          name="name"
                          value={selectedCustomer.name}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl mb={4}>
                        <FormLabel>Email</FormLabel>
                        <Input
                          name="email"
                          value={selectedCustomer.email}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl mb={4}>
                        <FormLabel>Số điện thoại</FormLabel>
                        <Input
                          name="phone"
                          value={selectedCustomer.phone}
                          onChange={handleChange}
                          type="tel"
                        />
                      </FormControl>
                      <FormControl mb={4}>
                        <FormLabel>Ngày sinh</FormLabel>
                        <Input
                          name="dob"
                          value={selectedCustomer.dob}
                          onChange={handleChange}
                          type="datetime-local"
                        />
                      </FormControl>
                      <FormControl mb={4}>
                        <FormLabel>Quốc tịch</FormLabel>
                        <Input
                          name="nationality"
                          value={selectedCustomer.nationality}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl mb={4}>
                        <FormLabel>Trạng thái</FormLabel>
                        <Select
                          name="statusAccount"
                          value={selectedCustomer.statusAccount}
                          onChange={handleChange}
                        >
                          <option value="active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </Select>
                      </FormControl>
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={handleSave}>
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Customers;