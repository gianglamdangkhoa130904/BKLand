import React from 'react';
import {
  Box,
  HStack,
  IconButton,
  Button,
  Text,
  Avatar,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiMenu, FiBell, FiUser, FiSettings } from 'react-icons/fi';
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';
import { Link } from 'react-router-dom';

function TopNav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800'); // Light: white, Dark: gray.800
  const borderColor = useColorModeValue('gray.200', 'gray.800'); // Light: gray.200, Dark: gray.700
  const textColor = useColorModeValue('gray.800', 'white'); // Text color

  return (
    <Box
      bg={bg}
      color={textColor}
      w="full"
      px={6}
      py={3}
      boxShadow="md"
      borderBottom="1px solid"
      borderColor={borderColor}
      display="flex"
      alignItems="center"
    >
      <HStack spacing={4}>
        <IconButton icon={<FiMenu />} aria-label="Menu" variant="ghost" size="lg" />
        <Text
          fontSize={{ base: '22', sm: '28' }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          <Link to="/">Novaland</Link>
        </Text>
      </HStack>
      <Spacer />
      <HStack spacing={4}>
        <Button onClick={toggleColorMode} variant="ghost">
          {colorMode === 'light' ? <IoMoon size="20" /> : <LuSun size="20" />}
        </Button>
        <IconButton icon={<FiBell />} aria-label="Notifications" variant="ghost" size="lg" />
        <Menu>
          <MenuButton as={Box} cursor="pointer">
            <Avatar size="md" name="User" src="https://via.placeholder.com/150" />
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to="/profile" icon={<FiUser />}>
              Profile
            </MenuItem>
            <MenuItem icon={<FiSettings />}>Settings</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Box>
  );
}

export default TopNav;
