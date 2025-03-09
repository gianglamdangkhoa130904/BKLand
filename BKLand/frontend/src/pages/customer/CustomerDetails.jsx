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

const FormInput = ({ icon: Icon, label, value, type = "text", colors, disabled, functionCode, lengthText, name}) => (
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
          name={name}
          type={type}
          maxLength={lengthText}
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
    const location = useLocation();
    const navigate = useNavigate();
    const [dataApartment, setData] = useState('');
    const [apartment, setApartment] = useState('');
    const [customer, setCustomer] = useState('');
    const [isShowMenuNationality, setIsShowMenuNationality] = useState(false);
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

    const[startRent, setStartRent] = useState('');
    const[numberOfRentDay, setNumberOfRentDay] = useState('');
    const[isShowNumberRent, setIsShowNumberRent] = useState(false);

    const[showDob, setShowDOB] = useState('');
    const[activeTab, setActiveTab] = useState('infor');
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
    function isFutureDate(inputDate) {
      const selectedDate = new Date(inputDate);
      const currentDate = new Date(); // Ngày hiện tại
      const oneMonthLater = new Date();
      oneMonthLater.setMonth(currentDate.getMonth() + 1); // Ngày hiện tại + 1 tháng

      // So sánh ngày nhập với khoảng thời gian hợp lệ
      return selectedDate > currentDate && selectedDate < oneMonthLater;
    }

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
          const data = {
            apartment: apartment,
            transactionType: location.state.transactionType
          };
          navigate('/payment', {state: data});
        })
      }
    }
    const handleRent_Customer = () => {
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
      else if(!isFutureDate(startRent) || startRent === ''){
        enqueueSnackbar('Ngày bắt đầu thuê phải lớn hơn ngày hiện tại', { variant: 'warning' });
      }
      else if(numberOfRentDay === ''){
        enqueueSnackbar('Vui lòng chọn số tháng thuê', { variant: 'warning' });
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
          const data = {
            apartment: apartment,
            transactionType: location.state.transactionType,
            rentDay: startRent,
            numberOfRentDay: numberOfRentDay
          };
          navigate('/payment', {state: data});
        })
      }
    }
    const handleTab = () => {
      // console.log(activeTab);
      if(activeTab === 'infor'){
        document.getElementById('tabBar').style.transform = 'translate(185px)'
        setActiveTab('update');
      }
      else if(activeTab === 'update'){
        document.getElementById('tabBar').style.transform = 'translate(0px)'
        setActiveTab('infor');
      }

    }
    const handleMouseEnter = () => {
      document.getElementById('acceptBar').style.transform = 'translate(0)'
    }
    const handleMouseLeave = () => {
      document.getElementById('acceptBar').style.transform = 'translate(0, 150px)'
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
              const birthdayShow = `${birthday.getDate()}/${birthday.getMonth()+1}/${birthday.getFullYear()}`;
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
                              value={customer.name}
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
                              value={customer.identityNumber}
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
                              value={customer.phone}
                              colors={colors}
                              disabled={'true'}
                          />
                          <FormInput 
                              icon={FiMail}
                              label="Email"
                              value={customer.email}
                              colors={colors}
                              disabled={'true'}
                          />
                          <FormInput 
                              icon={FiFlag}
                              label="Quốc tịch"
                              type="text"
                              value={customer.nationality}
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
                              lengthText={50}
                              functionCode={(e) => setName(e.target.value)}
                              name={'nameCus'}
                          />
                          <FormInput 
                              icon={FiCalendar}
                              label="Ngày sinh"
                              type="datetime-local"
                              value={dob}
                              colors={colors}
                              name={'dobCus'}
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
                              lengthText={12}
                              colors={colors}
                              name={'iNumberCus'}
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
                              lengthText={10}
                              colors={colors}
                              name={'phoneCus'}
                              functionCode={(e) => setPhone(e.target.value)}
                          />
                          <FormInput 
                              icon={FiMail}
                              label="Email"
                              lengthText={50}
                              value={email}
                              colors={colors}
                              name={'mailCus'}
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
                                      name="btn_nationality"
                                      rightIcon={<VscTriangleDown />}
                                      _hover={{ bg: colors.accent, color: 'white' }}
                                  >
                                      {nationality || 'Chọn quốc tịch'}
                                  </MenuButton>
                                  <MenuList maxH="200px" overflow="auto">
                                      {nationalities.map((area, index) => (
                                          <MenuItem key={index} onClick={(e) => setNationality(area)} name={"nationality_"+index}>{area}</MenuItem>
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
                      {location.state.transactionType === 'buy' ? (
                        <div className='flex w-full '>
                        <p className='w-1/2 text-md font-bold' style={{color:`${colors.secondary}`}}>Tổng giá trị: </p>
                        <p className='w-1/2  text-end' style={{color:`${colors.primary}`}}>
                            <b className='text-md'>{(apartment.sellingPrice * 1.12).toFixed(0)} VNĐ</b>
                            <p className='text-sm'>Đã bao gồm VAT & KPBT</p>
                        </p>
                        </div>
                        ):(
                        <div>
                            <div className='flex gap-4 pb-6' style={{borderBottom:`1px solid ${colors.accent}`}}>
                            <div className='w-1/2'>
                                <p>Ngày bắt đầu:</p>
                                <input type='date' className='w-full px-2 py-2 rounded-md bg-white' value={startRent}
                                style={{ border:`1px solid ${colors.accent}`}}
                                onChange={(e) => setStartRent(e.target.value)}/>
                            </div>
                            <div className='w-1/2 relative'>
                                <p>Số tháng thuê:</p>
                                <div className='w-full px-2 py-2 rounded-md flex bg-white hover:cursor-pointer' onClick={() => setIsShowNumberRent(!isShowNumberRent)}
                                style={{ border:`1px solid ${colors.accent}`}}>
                                {numberOfRentDay === ''?(<p>Chọn số lượng tháng</p>):(<p>{numberOfRentDay} tháng</p>)}
                                </div>
                                {isShowNumberRent?(
                                <div className='absolute right-0 bottom-12 bg-white h-22 w-full px-4 rounded-lg'
                                style={{ border:`1px solid ${colors.accent}`}}>
                                    <p className='py-2 hover:cursor-pointer' onClick={() => {
                                    setIsShowNumberRent(!isShowNumberRent);
                                    setNumberOfRentDay(1)}}
                                    style={{borderBottom: `1px solid ${colors.accent}`}}>1 tháng</p>
                                    <p className='py-2 hover:cursor-pointer' onClick={() => {
                                    setIsShowNumberRent(!isShowNumberRent);
                                    setNumberOfRentDay(2)}}
                                    style={{borderBottom: `1px solid ${colors.accent}`}}>2 tháng</p>
                                    <p className='py-2 hover:cursor-pointer' onClick={() => {
                                    setIsShowNumberRent(!isShowNumberRent);
                                    setNumberOfRentDay(3)}}>3 tháng</p>
                                </div>
                                ):(
                                <div className='hidden'></div>
                                )}
                            </div>
                            </div>
                            <div className='flex w-full mt-2'>
                            <p className='w-1/2 text-md font-bold' style={{color:`${colors.secondary}`}}>Tổng giá trị: </p>
                            <p className='w-1/2  text-end' style={{color:`${colors.primary}`}}>
                                {numberOfRentDay === ''?(
                                <b className='text-md'>{(apartment.rentPrice)} VNĐ</b>
                                ):(
                                <b className='text-md'>{(apartment.rentPrice * numberOfRentDay).toFixed(0)} VNĐ</b>
                                )}
                            </p>
                            </div>
                        </div>
                        )}
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
          height="100px"
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
                  {location.state.transactionType === 'buy' ? (
                    <Text 
                    fontSize="xl" 
                    fontWeight="bold" 
                    color={colors.primary}>
                        {apartment && (apartment.sellingPrice * 1.12).toFixed(0)} VNĐ
                    </Text>
                    ):(
                    numberOfRentDay === ''? (
                        <Text 
                        fontSize="xl" 
                        fontWeight="bold" 
                        color={colors.primary}>
                            {(apartment.rentPrice)} VNĐ
                        </Text>
                    ):(
                        <Text 
                        fontSize="xl" 
                        fontWeight="bold" 
                        color={colors.primary}>
                            {(apartment.rentPrice * numberOfRentDay).toFixed(0)} VNĐ
                        </Text>
                    )
                    )}
                  
              </HStack>
              {location.state.transactionType === 'buy' ? (
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
            ):(
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
                  onClick={handleRent_Customer}
                  fontSize="lg"
                  transition="all 0.3s ease"
              >
                  Xác Nhận Thông Tin
              </Button>
            )}
              
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
