import React, { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  Avatar,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import TopNavCustomer from '../../components/TopNavCustomer';

function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Nguyen Van A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    address: '123 Đường ABC, Quận 1, TP. HCM',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Implement save functionality (e.g., send updated data to server)
    setIsEditing(false);
  };

  return (
    <>
      <TopNavCustomer/>
      <Box w="100%" h="81"/>
      <Box
        bg={useColorModeValue('gray.100', 'gray.700')}
        p={8}
        borderRadius="md"
        maxW="500px"
        mx="auto"
        boxShadow="lg"
        mt="20px"
      >
        <VStack spacing={4}align="start">
          <HStack spacing={4}>
            <Avatar size="xl" name={userInfo.name} />
            <Box>
              <Heading size="md">{userInfo.name}</Heading>
              <Text color="gray.500">{userInfo.email}</Text>
            </Box>
          </HStack>

          {isEditing ? (
            <>
              <FormControl>
                <FormLabel>Họ và tên</FormLabel>
                <Input
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Số điện thoại</FormLabel>
                <Input
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Địa chỉ</FormLabel>
                <Input
                  name="address"
                  value={userInfo.address}
                  onChange={handleInputChange}
                />
              </FormControl>
              <HStack spacing={4} mt={4}>
                <Button colorScheme="blue" onClick={handleSave}>
                  Lưu thay đổi
                </Button>
                <Button variant="outline" onClick={handleEditToggle}>
                  Hủy
                </Button>
              </HStack>
            </>
          ) : (
            <>
              <Text>
                <strong>Email:</strong> {userInfo.email}
              </Text>
              <Text>
                <strong>Số điện thoại:</strong> {userInfo.phone}
              </Text>
              <Text>
                <strong>Địa chỉ:</strong> {userInfo.address}
              </Text>
              <Button mt={4} colorScheme="blue" onClick={handleEditToggle}>
                Sửa thông tin cá nhân
              </Button>
            </>
          )}
        </VStack>
      </Box>
    </>
  );
}

export default UserProfile;
