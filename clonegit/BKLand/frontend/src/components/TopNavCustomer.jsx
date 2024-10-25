import React, { useState } from 'react';
import {
  Box,
  HStack,
  IconButton,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Image,
  Spacer
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FiBell, FiUser, FiSettings } from 'react-icons/fi';
import bokaLogo from '../assets/bokaboka.png';
import england from '../assets/england.png';
import vietnam from '../assets/vietnam.png';

const translations = {
  en: {
    buy: 'Buy',
    rent: 'Rent',
    about: 'About Bokaland',
    support: 'Support',
    stock: 'VHM : HOSE 47.800 VNĐ',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
  },
  vi: {
    buy: 'Mua',
    rent: 'Thuê',
    about: 'Về Bokaland',
    support: 'Hỗ trợ',
    stock: 'VHM : HOSE 47.800 VNĐ',
    profile: 'Hồ sơ',
    settings: 'Cài đặt',
    logout: 'Đăng xuất',
  },
};

const TopNavCustomer = () => {
  const [language, setLanguage] = useState('vi');
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  const t = translations[language];

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <Box
      bg={bg}
      color={textColor}
      w="full"
      px={8}
      py={4}
      boxShadow="md"
      borderBottom="1px solid"
      borderColor={borderColor}
      position="fixed"
      top="0"
      left="0"
      zIndex="1000"
    >
      <HStack maxW="1200px" mx="auto" w="full" spacing={6} align="center">
        {/* Left Section - Logo and Menu */}
        <HStack spacing={12} align="center">
          <Image src={bokaLogo} alt="Bokaland Logo" height="40px" />
          <Text fontSize="lg" fontWeight="bold" textTransform="uppercase">
            <Link to="/home">Bokaland</Link>
          </Text>
          <Text><Link to="/transaction">{t.buy}</Link></Text>
          <Text><Link to="/transaction">{t.rent}</Link></Text>
          <Text>{t.about}</Text>
          <Text>{t.support}</Text>
        </HStack>

        <Spacer />

        <HStack spacing={10} align="center">
          <HStack spacing={5}>
            <Image
              src={vietnam}
              alt="Vietnam Flag"
              boxSize="20px"
              cursor="pointer"
              onClick={() => handleLanguageChange('vi')}
            />
            <Image
              src={england}
              alt="UK Flag"
              boxSize="20px"
              cursor="pointer"
              onClick={() => handleLanguageChange('en')}
            />
          </HStack>
          <HStack align="center">
            <Text color="red.400" fontWeight="bold">
              {t.stock}
            </Text>
          </HStack>
          <IconButton icon={<FiBell />} aria-label="Notifications" variant="ghost" size="lg" />
          <Menu>
            <MenuButton>
              <IconButton icon={<FiUser />} aria-label="Notifications" variant="ghost" size="lg" />
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} to="/profileCus" icon={<FiUser />}>
                {t.profile}
              </MenuItem>
              <MenuItem icon={<FiSettings />}>{t.settings}</MenuItem>
              <MenuItem>{t.logout}</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </HStack>
    </Box>
  );
};

export default TopNavCustomer;
