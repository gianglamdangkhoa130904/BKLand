import React from 'react';
import { Box, Heading, Text, VStack, Avatar, useColorMode, useColorModeValue } from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar';
import TopNav from '../../components/TopNav';
import BreadcrumbBar from '../../components/Breadcrumbar';
function Profile() {

  const { colorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800'); 
  const borderColor = useColorModeValue('gray.200', 'gray.700'); 
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box minH="87vh" bg={bg} color={textColor}>
      <VStack spacing={4} align="center">
        <Avatar size="xl" src="https://via.placeholder.com/150" />
        <Heading size="lg">Lương Thiên Bảo</Heading>
        <Text fontSize="md">Position: Code dạo không biết làm gì</Text>
        <Text fontSize="md">Email: luongbaothien12@gmail.com</Text>
        <Text fontSize="md">Phone: 0909885060</Text>
        <Text fontSize="md">Department: IT</Text>
      </VStack>
    </Box>
  );
}

export default Profile;
