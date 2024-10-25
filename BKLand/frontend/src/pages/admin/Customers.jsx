import React, {useState, useEffect} from 'react';
import { FormControl,FormLabel,Input, Button,ModalFooter,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,useDisclosure,Modal,Box, IconButton, Heading, Text, VStack, Avatar, useColorMode, useColorModeValue, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import {
  FiArchive,
  FiEdit,
  FiTrello,
  FiBriefcase,
  FiHome,
  FiFileText,
  FiSend,
  FiDollarSign, 
  FiUser,
  FiLayers,
  FiPackage,
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

  const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setLoading(true);
      fetchUser();
      enqueueSnackbar(`Chào mừng ${Cookie.get('name')} id: ${Cookie.get('nameID')}`, { variant: 'success' });
  }, []);
  const fetchUser = () => {
    axios
    .get('http://localhost:1325/users')
    .then((response) => {
      setCustomers(response.data.data);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }
  // Handle delete action
  const handleDelete = async (id) => {
    axios.delete(`http://localhost:1325/users/${id}`)
    .then((response) =>{
      enqueueSnackbar(`Xóa người dùng thành công`, { variant: 'success' });
      fetchUser();
    })
    .catch((error) => {
      enqueueSnackbar(`Xóa người dùng thất bại` + error, { variant: 'success' });
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
    // const updatedCustomers = customers.map((customer) =>
    //   customer.id === selectedCustomer.id ? selectedCustomer : customer
    // );
    console.log(selectedCustomer);
    axios.put(`http://localhost:1325/users/${selectedCustomer._id}`, selectedCustomer)
    .then((response) =>{
      enqueueSnackbar(`Cập nhật người dùng thành công`, { variant: 'success' });
      fetchUser();
    })
    .catch((error) => {
      enqueueSnackbar(`Cập nhật người dùng thất bại` + error, { variant: 'success' });
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
        <Box minH="87vh" bg={bg} color={textColor} overflowX="auto">
          <Table variant="simple" minWidth="1000px">
            <Thead>
              <Tr>
                <Th width="5%">STT</Th>
                <Th width="10%">Username</Th>
                <Th width="10%">Password</Th>
                <Th width="15%">Tên khách hàng</Th>
                <Th width="15%">Email</Th>
                <Th width="10%">Số điện thoại</Th>
                <Th width="10%">Trạng thái</Th>
                <Th isNumeric  width="25%">Hành động</Th>
              </Tr>
            </Thead>
            <Tbody>
              {customers.map((customer, index) => (
                <Tr key={customer._id}>
                  <Td width="5%">{index + 1}</Td>
                  <Td width="10%">{customer.username}</Td>
                  <Td width="10%">{customer.password}</Td>
                  <Td width="15%">{customer.name}</Td>
                  <Td width="15%">{customer.email}</Td>
                  <Td width="10%">{customer.phone}</Td>
                  <Td width="10%">{customer.statusAccount}</Td>
                  <Td isNumeric width="25%">
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
                      <FormLabel>Số điện thoại</FormLabel>
                      <Input
                        name="phone"
                        value={selectedCustomer.phone}
                        onChange={handleChange}
                        type="tel"
                      />
                    </FormControl>
                    <FormControl mb={4}>
                      <FormLabel>Ngày sinh</FormLabel>
                      <Input
                        name="dob"
                        value={selectedCustomer.dob}
                        onChange={handleChange}
                        type="datetime-local"
                      />
                    </FormControl>
                    <FormControl mb={4}>
                      <FormLabel>Quốc tịch</FormLabel>
                      <Input
                        name="nationality"
                        value={selectedCustomer.nationality}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl mb={4}>
                      <FormLabel>Trạng thái</FormLabel>
                      <Input
                        name="status"
                        value={selectedCustomer.status}
                        onChange={handleChange}
                      />
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

export default Customers