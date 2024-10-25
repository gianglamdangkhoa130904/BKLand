import React from 'react';
import {
  Box,
  VStack,
  Button,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaUser, FaHome, FaFileAlt, FaHistory } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function CustomerSidebar() {
  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const activeBg = useColorModeValue('blue.100', 'blue.700');

  return (
    <Box
      bg={bg}
      color={textColor}
      w="250px"
      p={4}
      borderRight="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      minH="100vh"
    >
      <VStack align="start" spacing={4}>
        <Button
          as={Link}
          to="/profileCus"
          w="100%"
          justifyContent="flex-start"
          variant="ghost"
          _hover={{ bg: activeBg }}
          leftIcon={<Icon as={FaUser} />}
        >
          Xem thông tin cá nhân
        </Button>
        <Button
          as={Link}
          to="/purchased-apartments"
          w="100%"
          justifyContent="flex-start"
          variant="ghost"
          _hover={{ bg: activeBg }}
          leftIcon={<Icon as={FaHome} />}
        >
          Căn hộ đã mua
        </Button>
        <Button
          as={Link}
          to="/rented-apartments"
          w="100%"
          justifyContent="flex-start"
          variant="ghost"
          _hover={{ bg: activeBg }}
          leftIcon={<Icon as={FaHome} />}
        >
          Căn hộ đã thuê
        </Button>
        <Button
          as={Link}
          to="/ownership-certificates"
          w="100%"
          justifyContent="flex-start"
          variant="ghost"
          _hover={{ bg: activeBg }}
          leftIcon={<Icon as={FaFileAlt} />}
        >
          Phiếu sở hữu
        </Button>
        <Button
          as={Link}
          to="/purchase-history"
          w="100%"
          justifyContent="flex-start"
          variant="ghost"
          _hover={{ bg: activeBg }}
          leftIcon={<Icon as={FaHistory} />}
        >
          Lịch sử mua
        </Button>
      </VStack>
    </Box>
  );
}

export default CustomerSidebar;
