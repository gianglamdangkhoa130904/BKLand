import React, { useEffect } from 'react';
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
  Divider,
} from '@chakra-ui/react';
import { FiMenu, FiBell, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';

function TopNav() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  useEffect(() => {
    if(!Cookies.get('adminID')){
      navigate('/login');
      enqueueSnackbar(`Vui lòng đăng nhập`, { variant: 'error' });
    }
    else{
      // enqueueSnackbar(`Chào mừng ${Cookies.get('username')}, role: ${Cookies.get('adminRole')}`, { variant: 'success' });
    }
  }, []);

  const handleLogout = () => {
    try {
      // Xóa tất cả cookies liên quan đến authentication
      Cookies.remove('adminID');
      Cookies.remove('username');
      Cookies.remove('adminRole');
      Cookies.remove('token'); // nếu có
      
      // Hiển thị thông báo thành công
      enqueueSnackbar('Đăng xuất thành công', { 
        variant: 'success',
        autoHideDuration: 2000
      });

      // Chuyển hướng về trang đăng nhập
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      enqueueSnackbar('Có lỗi xảy ra khi đăng xuất', { variant: 'error' });
    }
  };

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
            <Avatar 
              size="md" 
              name={Cookies.get('username') || 'User'} 
              src="https://via.placeholder.com/150" 
            />
          </MenuButton>
          <MenuList>
            <Text px={3} py={2} fontSize="sm" fontWeight="bold" color="gray.500">
              {Cookies.get('username')}
            </Text>
            <Text px={3} pb={2} fontSize="xs" color="gray.500">
              Role: {Cookies.get('adminRole')}
            </Text>
            <Divider />
            <MenuItem as={Link} to="/profile" icon={<FiUser />}>
              Profile
            </MenuItem>
            <MenuItem icon={<FiSettings />}>Settings</MenuItem>
            <Divider />
            <MenuItem 
              icon={<FiLogOut />} 
              onClick={handleLogout}
              color="red.500"
              _hover={{ bg: 'red.50' }}
            >
              Đăng xuất
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Box>
  );
}

export default TopNav;