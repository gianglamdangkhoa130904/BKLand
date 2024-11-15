import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie'
import CanHo from '../../assets/apartment_1.jpeg'
import {
    Box,
    Text,
    Button,
    HStack, VStack, StackDivider,
    Image,
    AbsoluteCenter,
    Flex,
    Menu, MenuButton, MenuList, MenuItem,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    Container,
    useDisclosure,
    Input,
    Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator,
    useToast,
    Divider
  } from '@chakra-ui/react';
  import { VscTriangleDown } from "react-icons/vsc";
  import axios from 'axios';
import { useSnackbar } from 'notistack';
import { FiCalendar, FiCreditCard, FiMail, FiPhone, FiUser, FiFlag } from 'react-icons/fi';

const FormInput = ({ icon: Icon, label, value, type = "text", colors, disabled, functionCode }) => (
  <Box w="full">
      <Text 
          mb={2} 
          color={colors.secondary}
          display="flex"
          alignItems="center"
      >
          <Icon style={{marginRight: '8px'}}/>
          {label}
      </Text>
      <Input
          type={type}
          value={value || ''}
          bg={colors.input}
          borderColor={colors.accent}
          _hover={{ borderColor: colors.primary }}
          _focus={{ 
              borderColor: colors.primary, 
              boxShadow: `0 0 0 1px ${colors.primary}` 
          }}
          disabled = {disabled}
          onChange={functionCode}
      />
  </Box>
);

const InfoRow = ({ label, value, colors, isBold }) => (
  <HStack w="full" justify="space-between">
      <Text 
          color={colors.secondary} 
          fontWeight={isBold ? "bold" : "normal"}
      >
          {label}
      </Text>
      <Text 
          color={colors.primary} 
          fontWeight={isBold ? "bold" : "normal"}
      >
          {value}
      </Text>
  </HStack>
);

const CustomerDetails = () => {
  const [showBottomBar, setShowBottomBar] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const toast = useToast()
    const location = useLocation();
    const navigate = useNavigate();
    const [dataApartment, setData] = useState('');
    const [apartment, setApartment] = useState('');
    const [customer, setCustomer] = useState('');
    const nationalities = [
      "Afghan",
      "Albanian",
      "Algerian",
      "American",
      "Andorran",
      "Angolan",
      "Antiguan",
      "Argentine",
      "Armenian",
      "Australian",
      "Austrian",
      "Azerbaijani",
      "Bahamian",
      "Bahraini",
      "Bangladeshi",
      "Barbadian",
      "Belarusian",
      "Belgian",
      "Belizean",
      "Beninese",
      "Bhutanese",
      "Bolivian",
      "Bosnian",
      "Botswanan",
      "Brazilian",
      "British",
      "Bruneian",
      "Bulgarian",
      "Burkinabé",
      "Burmese",
      "Burundian",
      "Cabo Verdean",
      "Cambodian",
      "Cameroonian",
      "Canadian",
      "Central African",
      "Chadian",
      "Chilean",
      "Chinese",
      "Colombian",
      "Comoran",
      "Congolese (Congo-Brazzaville)",
      "Congolese (Congo-Kinshasa)",
      "Costa Rican",
      "Croatian",
      "Cuban",
      "Cypriot",
      "Czech",
      "Danish",
      "Djiboutian",
      "Dominican",
      "Dutch",
      "East Timorese",
      "Ecuadorean",
      "Egyptian",
      "Emirati",
      "Equatorial Guinean",
      "Eritrean",
      "Estonian",
      "Eswatini",
      "Ethiopian",
      "Fijian",
      "Finnish",
      "French",
      "Gabonese",
      "Gambian",
      "Georgian",
      "German",
      "Ghanaian",
      "Greek",
      "Grenadian",
      "Guatemalan",
      "Guinean",
      "Guinea-Bissauan",
      "Guyanese",
      "Haitian",
      "Honduran",
      "Hungarian",
      "Icelandic",
      "Indian",
      "Indonesian",
      "Iranian",
      "Iraqi",
      "Irish",
      "Israeli",
      "Italian",
      "Ivorian",
      "Jamaican",
      "Japanese",
      "Jordanian",
      "Kazakh",
      "Kenyan",
      "Kiribati",
      "Kittitian and Nevisian",
      "Kuwaiti",
      "Kyrgyzstani",
      "Lao",
      "Latvian",
      "Lebanese",
      "Liberian",
      "Libyan",
      "Liechtensteiner",
      "Lithuanian",
      "Luxembourger",
      "Macedonian",
      "Malagasy",
      "Malawian",
      "Malaysian",
      "Maldivian",
      "Malian",
      "Maltese",
      "Marshallese",
      "Mauritanian",
      "Mauritian",
      "Mexican",
      "Micronesian",
      "Moldovan",
      "Monacan",
      "Mongolian",
      "Montenegrin",
      "Moroccan",
      "Mozambican",
      "Namibian",
      "Nauruan",
      "Nepalese",
      "New Zealander",
      "Nicaraguan",
      "Nigerien",
      "Nigerian",
      "North Korean",
      "Norwegian",
      "Omani",
      "Pakistani",
      "Palauan",
      "Palestinian",
      "Panamanian",
      "Papua New Guinean",
      "Paraguayan",
      "Peruvian",
      "Philippine",
      "Polish",
      "Portuguese",
      "Qatari",
      "Romanian",
      "Russian",
      "Rwandan",
      "Saint Lucian",
      "Samoan",
      "San Marinese",
      "Sao Tomean",
      "Saudi",
      "Senegalese",
      "Serbian",
      "Seychellois",
      "Sierra Leonean",
      "Singaporean",
      "Slovak",
      "Slovenian",
      "Solomon Islander",
      "Somali",
      "South African",
      "South Korean",
      "South Sudanese",
      "Spanish",
      "Sri Lankan",
      "Sudanese",
      "Surinamese",
      "Swedish",
      "Swiss",
      "Syrian",
      "Taiwanese",
      "Tajikistani",
      "Tanzanian",
      "Thai",
      "Togolese",
      "Tongan",
      "Trinidadian or Tobagonian",
      "Tunisian",
      "Turkish",
      "Turkmen",
      "Tuvaluan",
      "Ugandan",
      "Ukrainian",
      "Uruguayan",
      "Uzbekistani",
      "Vanuatuan",
      "Venezuelan",
      "Vietnamese",
      "Yemeni",
      "Zambian",
      "Zimbabwean"
    ];

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[phone, setPhone] = useState('');
    const[dob, setDob] = useState('');
    const[nationality, setNationality] = useState('');
    const[identityNumber, setIdentityNumber] = useState('');

    const[showDob, setShowDOB] = useState('');
    
    const colors = {
      background: '#F5E6D3',
      primary: '#8B7355',
      secondary: '#5C4033',
      accent: '#DEB887',
      text: '#2C1810',
      input: '#FFF8DC'
  };

    const isOverDOB = (birthDate) => {
      const today = new Date();
      const birth = new Date(birthDate);
  
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      const dayDiff = today.getDate() - birth.getDate();
  
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }
  
      return age >= 20;
    };

    function isValidIdentityNumber(INumber) {
      const lengthCheck = INumber.length == 12;
      const upperCaseCheck = /[A-Z]/.test(INumber);
      const lowerCaseCheck = /[a-z]/.test(INumber);
      const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/.test(INumber);
      return !upperCaseCheck && !lowerCaseCheck && !specialCharCheck && lengthCheck;
    }

    const handleBuy_Customer = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?(\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
      if(name === '' || email === '' || phone === '' || dob === '' || nationality === '' || identityNumber === ''){
        enqueueSnackbar('Thiếu thông tin', { variant: 'warning' });
      }
      else if(name.length > 50){
        enqueueSnackbar('Họ và tên có độ dài bé hơn 50 ký tự', { variant: 'warning' });
      }
      else if(email.length > 50){
        enqueueSnackbar('Email có độ dài bé hơn 50 ký tự', { variant: 'warning' });
      }
      else if(!emailRegex.test(email)){
        enqueueSnackbar('Email sai định dạng', { variant: 'warning' });
      }
      else if(phone.length != 10 || !phoneRegex.test(phone)){
        enqueueSnackbar('Số điện thoại có độ dài 10 ký tự số', { variant: 'warning' });
      }
      else if(!isOverDOB(dob)){
        enqueueSnackbar('Người dùng phải có độ tuổi trên 20', { variant: 'warning' });
      }
      else if(!isValidIdentityNumber(identityNumber)){
        enqueueSnackbar('Số giấy tờ chứng thực cá nhân không hợp lệ', { variant: 'warning' });
      }
      else{
        const dataUser = {
          name: name,
          phone: phone,
          email: email,
          dob: dob,
          nationality: nationality,
          identityNumber: identityNumber
        }
        axios.put(`https://bkland.onrender.com/users/${Cookie.get('nameID')}`, dataUser)
        .then((response) => {
          enqueueSnackbar('Cập nhật thông tin thành công', { variant: 'success' })
          const data = apartment;
          navigate('/payment', {state: data});
        })
      }
    }
    useEffect(() => {
        setData(location.state);
        const name = Cookie.get('name');
        const customerID = Cookie.get('nameID');
        //Chưa đăng nhập
        if(!name || !customerID){
            navigate('/login', {state: location.state});
        }
        //Đã đăng nhập
        else{
          setApartment(location.state.apartment);
          axios.get(`https://bkland.onrender.com/users/${customerID}`)
          .then((response) => {
            setCustomer(response.data);
            if(response.data.dob!= null){
              const birthday = new Date(response.data.dob);
              const birthdayShow = `${birthday.getDay()}/${birthday.getMonth()}/${birthday.getFullYear()}`;
              setShowDOB(birthdayShow);
            }
            setIdentityNumber(response.data.identityNumber != null ? response.data.identityNumber : '');
            setName(response.data.name != null ? response.data.name : '');
            setPhone(response.data.phone != null ? response.data.phone : '');
            setEmail(response.data.email != null ? response.data.email : '');
            setDob(response.data.dob != null ? response.data.dob : '');
            setNationality(response.data.nationality != null ? response.data.nationality : '');
          })
        }
    },[])
  return (
    // <>
    //   <Container maxW="5xl" bg="white" mt="30px" boxShadow="dark-lg" p='4' borderRadius='md'>
    //     <Text mb="30px" textAlign="center" fontSize="2xl" fontWeight="bold">Thông tin bên mua</Text>
    //     <HStack w="full" justify="center" align="start">

    //     <Tabs w='70%' position='relative' variant='unstyled'>
    //       <TabList>
    //         <Tab>Thông tin người dùng</Tab>
    //         <Tab>Cập nhật thông tin</Tab>
    //       </TabList>
    //       <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
    //       <TabPanels>
    //         <TabPanel className='flex justify-center' w="full" align="start" gap="4">
    //           <VStack w="50%">
    //             <Text alignSelf="start" ml="10px" fontWeight="bold">Họ và tên</Text>
    //               <Input bg="white" type='text' value={name} disabled></Input>
    //             <Text alignSelf="start" ml="10px" fontWeight="bold" >Ngày sinh</Text>
    //               <Input bg="white" type='text' value={showDob} disabled></Input>
    //             <Text alignSelf="start" ml="10px" fontWeight="bold">Số giấy tờ chứng thực cá nhân</Text>
    //               <Input bg="white" type='text' value={identityNumber} disabled></Input>
    //           </VStack>
    //           <VStack w="50%" >
    //             <Text alignSelf="start" ml="10px" fontWeight="bold">Số điện thoại</Text>
    //               <Input bg="white" type='tel' value={phone} disabled></Input>
    //             <Text alignSelf="start" ml="10px" fontWeight="bold">Email</Text>
    //               <Input bg="white" type='email' value={email} disabled></Input>
    //             <Text alignSelf="start" ml="10px" fontWeight="bold">Quốc tịch</Text>
    //               <Input bg="white" type='email' value={nationality} disabled></Input>
    //           </VStack>
    //         </TabPanel>
    //         <TabPanel className='flex justify-center' w="full" align="start" gap="4">
    //           <VStack w="50%">
    //             <Text alignSelf="start" ml="10px" fontWeight="bold">Họ và tên</Text>
    //               <Input bg="white" type='text' placeholder='Nhập họ và tên...' value={name} onChange={(e) => setName(e.target.value)}></Input>
    //             <Text alignSelf="start" ml="10px" fontWeight="bold">Ngày sinh</Text>
    //               <Input bg="white" type='datetime-local' onChange={(e) => setDob(e.target.value)}></Input>
    //             <Text alignSelf="start" ml="10px" fontWeight="bold">Số giấy tờ chứng thực cá nhân</Text>
    //               <Input bg="white" type='text' placeholder='Nhập số giấy tờ...' value={identityNumber} onChange={(e) => {setIdentityNumber(e.target.value);}}></Input>
    //           </VStack>
    //           <VStack w="50%" >
    //             <Text alignSelf="start" ml="10px" fontWeight="bold">Số điện thoại</Text>
    //               <Input bg="white" type='tel' placeholder='Nhập số điện thoại...' value={phone} onChange={(e) => setPhone(e.target.value)}></Input>
    //             <Text alignSelf="start" ml="10px" fontWeight="bold">Email</Text>
    //               <Input bg="white" type='email' placeholder='Nhập email...' value={email} onChange={(e) => setEmail(e.target.value)}></Input>
    //             <Text alignSelf="start" ml="10px" fontWeight="bold">Quốc tịch</Text>
    //             <Menu w="30%" h="100%" m="0px" >
    //               {nationality != '' ? (
    //                 <MenuButton as={Button} bg="white" border='1px' borderColor='gray.300' w='100%' rightIcon={<VscTriangleDown/>} >
    //                   {nationality}
    //                 </MenuButton>
    //               ) : (
    //                 <MenuButton as={Button} bg="white" border='1px' borderColor='gray.300' w='100%' rightIcon={<VscTriangleDown/>}>
    //                   Chọn quốc tịch
    //                 </MenuButton>
    //               )}
    //               <MenuList overflow="hidden scroll" h="200px">
    //                 {nationalities.map((area, index) => (
    //                   <MenuItem key={index} onClick={(e) => setNationality(area)}>{area}</MenuItem>
    //                 ))}
    //               </MenuList>
    //             </Menu>
    //           </VStack>
    //         </TabPanel>
    //       </TabPanels>
    //     </Tabs>

          
    //       {/* Thông tin căn hộ */}
    //       <VStack w="30%" borderRadius="md" boxShadow="2xl" gap="0">
    //         <Box w="full" h="200px">
    //           <Image w="full" h="full" src={CanHo} objectFit="cover" borderTopRadius="md"/>
    //         </Box>
    //         <HStack p='2' w="100%" divider={<StackDivider borderColor='gray.200' />}>
    //           <Text>Căn hộ {dataApartment.project}</Text>
    //           {apartment.floor === '' ? (
    //             <Text display="none" textAlign="start"></Text>
    //           ) : (
    //             <Text textAlign="end">Tầng {apartment.floor}</Text>
    //           )}
    //         </HStack>
    //         <HStack p='2' w="100%" divider={<StackDivider borderColor='gray.200' />}>
    //           <Text>Phân khu {dataApartment.subdivision}</Text>
    //           <Text>{dataApartment.building}</Text>
    //         </HStack>
    //         <HStack divider={<StackDivider borderColor='gray.200' />} alignSelf="start" p='2'>
    //           <Text>{apartment.numberOfBedroom} ngủ</Text>
    //           <Text>{apartment.numberOfBedroom} toilet</Text>
    //           <Text>{apartment.direction}</Text>
    //         </HStack>
    //         <StackDivider borderColor='gray.200' w="full"/>
    //         <HStack w="100%" p='2'>
    //           <Text w="50%" textAlign="start" fontWeight="bold">Tạm tính</Text>
    //           <Text w="50%" textAlign="end">{(apartment.sellingPrice * 1.12).toFixed(0)} vnđ</Text>
    //         </HStack>
    //         <HStack w="100%" p='2'>
    //           <Text w="50%" textAlign="start" alignSelf="start" fontWeight="bold">Tổng cộng</Text>
    //           <VStack w="50%" gap="0">
    //             <Text w="100%"  textAlign="end">{(apartment.sellingPrice * 1.12).toFixed(0)} vnđ</Text>
    //             <Text w="100%"  textAlign="end" fontSize="x-small">Đã bao gồm VAT & KPBT</Text>
    //           </VStack>
    //         </HStack>
    //       </VStack>
    //     </HStack>
    //   </Container>
    //   <Flex pos="fixed" 
    //   w="100%" h="100px" 
    //   bottom="20px" maxW="2000px" 
    //   justifyContent="center" alignItems="center">
    //       <VStack w="30%" h="auto" bg="white" borderRadius="md" p="2" boxShadow="dark-lg">
    //           <HStack w="100%" fontWeight="bold">
    //               <Text w="50%">Giá niêm yết</Text>
    //               <Text w="50%" textAlign="end">{(apartment.sellingPrice * 1.12).toFixed(0)} vnđ</Text>
    //           </HStack>
    //           <Text alignSelf="start" fontSize="small">Đã bao gồm VAT & KPBT</Text>
    //           <Button bg="blue.900" textColor="white" w="100%" h="50px" onClick={handleBuy_Customer}>
    //               Xác nhận thông tin
    //           </Button>
    //       </VStack>
    //   </Flex>
    // </>
    
    <Box 
      minH="100vh" 
      bg={colors.background} 
      py={10}
      position="relative"
      backgroundBlendMode="soft-light">
      <Container 
          maxW="6xl" 
          bg="white" 
          borderRadius="xl" 
          boxShadow="xl"
          p={8}
          position="relative"
          mb={20}
          _before={{
              content: '""',
              position: 'absolute',
              top: -4,
              left: -4,
              right: -4,
              bottom: -4,
              border: `2px solid ${colors.accent}`,
              borderRadius: 'xl',
              pointerEvents: 'none'}}>
          {/* Header Section */}
          <VStack mb={8}>
            <Text 
                fontSize="3xl" 
                fontFamily="'Playfair Display', serif"
                color={colors.secondary}
                borderBottom={`2px solid ${colors.accent}`}
                pb={2}>Thông Tin Khách Hàng</Text>
            <Text 
                fontSize="md" 
                color={colors.primary}
                fontStyle="italic">Vui lòng xác nhận thông tin của bạn</Text>
          </VStack>

          <HStack spacing={8} align="start">

          <Tabs position='relative' variant='unstyled' w='60%'>
            <TabList>
              <Tab>Thông tin người dùng</Tab>
              <Tab>Cập nhật thông tin</Tab>
            </TabList>
            <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
            <TabPanels>
              <TabPanel>
                <VStack flex={2} spacing={6}>
                {/* Personal Info */}
                  <Box w="full">
                      <Text 
                          fontSize="xl" 
                          fontFamily="'Playfair Display', serif"
                          color={colors.secondary}
                          mb={4}
                      >
                          Thông Tin Cá Nhân
                      </Text>
                      <VStack spacing={4}>
                          <FormInput 
                              icon={FiUser}
                              label="Họ và tên"
                              value={name}
                              colors={colors}
                              disabled={'true'}
                          />
                          <FormInput 
                              icon={FiCalendar}
                              label="Ngày sinh"
                              type="text"
                              value={showDob}
                              colors={colors}
                              disabled={'true'}
                          />
                          <FormInput 
                              icon={FiCreditCard}
                              label="Số giấy tờ chứng thực"
                              value={identityNumber}
                              disabled={'true'}
                              colors={colors}
                          />
                      </VStack>
                  </Box>

                  {/* Contact Info */}
                  <Box w="full">
                      <Text 
                          fontSize="xl" 
                          fontFamily="'Playfair Display', serif"
                          color={colors.secondary}
                          mb={4}
                      >
                          Thông Tin Liên Hệ
                      </Text>
                      <VStack spacing={4}>
                          <FormInput 
                              icon={FiPhone}
                              label="Số điện thoại"
                              value={phone}
                              colors={colors}
                              disabled={'true'}
                          />
                          <FormInput 
                              icon={FiMail}
                              label="Email"
                              value={email}
                              colors={colors}
                              disabled={'true'}
                          />
                          <FormInput 
                              icon={FiFlag}
                              label="Quốc tịch"
                              type="text"
                              value={nationality}
                              colors={colors}
                              disabled={'true'}
                          />
                      </VStack>
                  </Box>
                </VStack>
              </TabPanel>
              <TabPanel>
                <VStack flex={2} spacing={6}>
                {/* Personal Info */}
                  <Box w="full">
                      <Text 
                          fontSize="xl" 
                          fontFamily="'Playfair Display', serif"
                          color={colors.secondary}
                          mb={4}
                      >
                          Thông Tin Cá Nhân
                      </Text>
                      <VStack spacing={4}>
                          <FormInput 
                              icon={FiUser}
                              label="Họ và tên"
                              value={name}
                              colors={colors}
                              functionCode={(e) => setName(e.target.value)}
                          />
                          <FormInput 
                              icon={FiCalendar}
                              label="Ngày sinh"
                              type="datetime-local"
                              value={dob}
                              colors={colors}
                              functionCode={(e) => {setDob(e.target.value); 
                                const birthday = new Date(response.data.dob);
                                const birthdayShow = `${birthday.getDay()}/${birthday.getMonth()}/${birthday.getFullYear()}`;
                                setShowDOB(birthdayShow);
                              }}
                          />
                          <FormInput 
                              icon={FiCreditCard}
                              label="Số giấy tờ chứng thực"
                              value={identityNumber}
                              colors={colors}
                              functionCode={(e) => setIdentityNumber(e.target.value)}
                          />
                      </VStack>
                  </Box>

                  {/* Contact Info */}
                  <Box w="full">
                      <Text 
                          fontSize="xl" 
                          fontFamily="'Playfair Display', serif"
                          color={colors.secondary}
                          mb={4}
                      >
                          Thông Tin Liên Hệ
                      </Text>
                      <VStack spacing={4}>
                          <FormInput 
                              icon={FiPhone}
                              label="Số điện thoại"
                              value={phone}
                              colors={colors}
                              functionCode={(e) => setPhone(e.target.value)}
                          />
                          <FormInput 
                              icon={FiMail}
                              label="Email"
                              value={email}
                              colors={colors}
                              functionCode={(e) => setEmail(e.target.value)}
                          />
                          <Box w="full">
                              <Text 
                                  mb={2} 
                                  color={colors.secondary}
                                  display="flex"
                                  alignItems="center"
                              >
                                  <FiFlag style={{marginRight: '8px'}}/>
                                  Quốc tịch
                              </Text>
                              <Menu>
                                  <MenuButton
                                      as={Button}
                                      w="full"
                                      bg={colors.input}
                                      color={colors.text}
                                      borderColor={colors.accent}
                                      border="1px"
                                      rightIcon={<VscTriangleDown />}
                                      _hover={{ bg: colors.accent, color: 'white' }}
                                  >
                                      {nationality || 'Chọn quốc tịch'}
                                  </MenuButton>
                                  <MenuList maxH="200px" overflow="auto">
                                      {nationalities.map((area, index) => (
                                          <MenuItem key={index} onClick={(e) => setNationality(area)}>{area}</MenuItem>
                                      ))}
                                  </MenuList>
                              </Menu>
                          </Box>
                      </VStack>
                  </Box>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>

            
            {/* Customer Information Section */}
            

              {/* Apartment Summary Section */}
              <VStack 
                  flex={1} 
                  bg={colors.input}
                  borderRadius="xl"
                  overflow="hidden"
                  boxShadow="lg"
                  spacing={0}
                  border={`1px solid ${colors.accent}`}
              >
                  <Image 
                      src={CanHo} 
                      alt="Apartment" 
                      w="full"
                      h="200px"
                      objectFit="cover"
                  />
                  
                  <VStack p={4} spacing={4} w="full">
                      <Text
                          fontSize="xl"
                          fontFamily="'Playfair Display', serif"
                          color={colors.secondary}
                          borderBottom={`1px solid ${colors.accent}`}
                          pb={2}
                          w="full"
                          textAlign="center"
                      >
                          Chi Tiết Căn Hộ
                      </Text>

                      <InfoRow 
                          label="Dự án"
                          value={dataApartment.project}
                          colors={colors}
                      />
                      <InfoRow 
                          label="Phân khu"
                          value={dataApartment.subdivision}
                          colors={colors}
                      />
                      <InfoRow 
                          label="Tòa nhà"
                          value={dataApartment.building}
                          colors={colors}
                      />
                      
                      <Divider borderColor={colors.accent} />
                      
                      <HStack w="full" justify="space-between">
                          <Text>Phòng ngủ: {apartment.numberOfBedroom}</Text>
                          <Text>Phòng tắm: {apartment.numberOfToilet}</Text>
                      </HStack>
                      
                      <Text w="full">Hướng: {apartment.direction}</Text>
                      
                      <Divider borderColor={colors.accent} />
                      
                      <VStack w="full" align="stretch">
                          <InfoRow 
                              label="Tổng giá trị"
                              value={`${(apartment.sellingPrice * 1.12).toFixed(0)} VNĐ`}
                              colors={colors}
                              isBold
                          />
                          <Text fontSize="xs" color={colors.primary} textAlign="right">
                              Đã bao gồm VAT & KPBT
                          </Text>
                      </VStack>
                  </VStack>
              </VStack>
          </HStack>
      </Container>

      {/* Hover Detection Area */}
      <Box
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          height="30px"
          onMouseEnter={() => setShowBottomBar(true)}
          zIndex={998}
      />

      {/* Bottom Bar with Animation */}
      <Flex
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          transform={`translateY(${showBottomBar ? '0' : '100%'})`}
          opacity={showBottomBar ? 1 : 0}
          transition="all 0.3s ease-in-out"
          bg={colors.background}
          p={4}
          borderTop={`1px solid ${colors.accent}`}
          justifyContent="center"
          zIndex={999}
          onMouseEnter={() => setShowBottomBar(true)}
          onMouseLeave={() => setShowBottomBar(false)}
      >
          <VStack 
              w="container.md"
              bg="white"
              p={4}
              borderRadius="xl"
              spacing={4}
              boxShadow="xl"
          >
              <HStack 
                  justify="space-between" 
                  w="full"
                  transition="all 0.3s ease"
                  _hover={{ transform: 'scale(1.02)' }}
              >
                  <Text 
                      fontSize="lg" 
                      fontFamily="'Playfair Display', serif" 
                      color={colors.secondary}
                  >
                      Tổng thanh toán
                  </Text>
                  <Text 
                      fontSize="xl" 
                      fontWeight="bold" 
                      color={colors.primary}
                  >
                      {apartment && (apartment.sellingPrice * 1.12).toFixed(0)} VNĐ
                  </Text>
              </HStack>
              <Button
                  w="full"
                  bg={colors.secondary}
                  color="white"
                  h="56px"
                  _hover={{ 
                      bg: colors.primary,
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg'
                  }}
                  onClick={handleBuy_Customer}
                  fontSize="lg"
                  transition="all 0.3s ease"
              >
                  Xác Nhận Thông Tin
              </Button>
          </VStack>
      </Flex>

      {/* Optional: Fade Overlay */}
      <Box
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        height="100vh"
        bg="blackAlpha.200"
        opacity={showBottomBar ? 1 : 0}
        visibility={showBottomBar ? 'visible' : 'hidden'}
        transition="all 0.3s ease-in-out"
        zIndex={997}
        pointerEvents="none"/>
    </Box>
  )
}

export default CustomerDetails