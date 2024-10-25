import React from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  HStack,
  Icon,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FiArchive,
  FiTrello,
  FiBriefcase,
  FiHome,
  FiFileText,
  FiSend,
  FiDollarSign,
  FiUser,
  FiLayers,
  FiPackage,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Sidebar() {
  const { colorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.800'); 
  const hoverBg = useColorModeValue('cyan.50', 'gray.700');

  return (
    <ChakraProvider>
      <Box
        bg={bg}
        color={useColorModeValue('gray.800', 'white')}
        w="250px"
        minH="100vh"
        py={5}
        px={4}
        borderRight="1px solid"
        borderColor={borderColor} // Ensure border matches bg in dark mode
      >
        <Text
          fontSize={{ base: '22', sm: '28' }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          <Link to="/admin/dashboard">Novaland</Link>
        </Text>
        <Text
          fontSize="sm"
          color={useColorModeValue('gray.600', 'gray.400')} // Adjust for better visibility in dark mode
          fontWeight="bold"
          textTransform="uppercase"
          mb={4}
          px={2}
          align="center"
        >
          Navigation
        </Text>
        <VStack align="start" spacing={1}>
          <Link to="/admin/province">
            <HStack spacing={4} w="full" px={3} py={2} borderRadius="md" _hover={{ bg: hoverBg }}>
              <Icon as={FiDollarSign} boxSize={5} />
              <Text>Tỉnh thành</Text>
            </HStack>
          </Link>
          <Link to="/admin/projecttypes">
            <HStack spacing={4} w="full" px={3} py={2} borderRadius="md" _hover={{ bg: hoverBg }}>
              <Icon as={FiSend} boxSize={5} />
              <Text>Loại dự án</Text>
            </HStack>
          </Link>
          <Link to="/admin/projects">
            <HStack spacing={4} w="full" px={3} py={2} borderRadius="md" _hover={{ bg: hoverBg }}>
              <Icon as={FiBriefcase} boxSize={5} />
              <Text>Dự án</Text>
            </HStack>
          </Link>
          <Link to="/admin/customers">
            <HStack spacing={4} w="full" px={3} py={2} borderRadius="md" _hover={{ bg: hoverBg }}>
              <Icon as={FiUser} boxSize={5} />
              <Text>Khách hàng</Text>
            </HStack>
          </Link>
          <Link to="/admin/employees">
            <HStack spacing={4} w="full" px={3} py={2} borderRadius="md" _hover={{ bg: hoverBg }}>
              <Icon as={FiLayers} boxSize={5} />
              <Text>Nhân viên</Text>
            </HStack>
          </Link>
          <Link to="/admin/tickets">
            <HStack spacing={4} w="full" px={3} py={2} borderRadius="md" _hover={{ bg: hoverBg }}>
              <Icon as={FiPackage} boxSize={5} />
              <Text>Phiếu sở hữu căn hộ</Text>
            </HStack>
          </Link>
          <Link to="/admin/information">
            <HStack spacing={4} w="full" px={3} py={2} borderRadius="md" _hover={{ bg: hoverBg }}>
              <Icon as={FiFileText} boxSize={5} />
              <Text>Thông tin liên hệ</Text>
            </HStack>
          </Link>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default Sidebar;
