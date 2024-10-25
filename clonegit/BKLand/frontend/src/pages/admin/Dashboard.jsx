import React from 'react';
import { Box, Heading, Text, VStack, Avatar, useColorMode, useColorModeValue } from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar';
import TopNav from '../../components/TopNav';
import BreadcrumbBar from '../../components/Breadcrumbar';

function Dashboard() {

  const { colorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800'); 
  const borderColor = useColorModeValue('gray.200', 'gray.700'); 
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box minH="100vh" display="flex" bg={bg} color={textColor}>
      <Sidebar />
      <Box flex="1" display="flex" flexDirection="column">
        <TopNav />
        <BreadcrumbBar />
        <Box flex="1" bg={bg} color={textColor}>
          <Box minH="87vh" bg={bg} color={textColor}>
            <VStack spacing={4} align="center">
              <Text>HOME PAGE</Text>
            </VStack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default Dashboard
