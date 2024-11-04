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
    Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator
  } from '@chakra-ui/react';
  import { VscTriangleDown } from "react-icons/vsc";
  import axios from 'axios';
const CustomerDetails = () => {
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
    const handleBuy = () => {
      const data = apartment;
      navigate('/payment', {state: data});
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
          axios.get(`http://localhost:1325/users/${customerID}`)
          .then((response) => {
            setCustomer(response.data);
          })
        }
    })
  return (
    <>
      <Container maxW="5xl" bg="white" mt="30px" boxShadow="dark-lg" p='4' borderRadius='md'>
        <Text mb="30px" textAlign="center" fontSize="2xl" fontWeight="bold">Thông tin bên mua</Text>
        <HStack w="full" justify="center" spacing="3%" align="start">
          <VStack w="30%">
            <Text alignSelf="start" ml="10px" fontWeight="bold">Họ và tên</Text>
            <Input bg="white" type='text' placeholder='Nhập họ và tên...' value={customer.name}></Input>
            <Text alignSelf="start" ml="10px" fontWeight="bold">Ngày sinh</Text>
            <Input bg="white" type='datetime-local'></Input>
            <Text alignSelf="start" ml="10px" fontWeight="bold">Số giấy tờ chứng thực cá nhân</Text>
            {customer.identityNumber != null ? (
              <Input bg="white" type='text' placeholder='Nhập số giấy tờ...' value={customer.identityNumber}></Input>
            ) : (
              <Input bg="white" type='text' placeholder='Nhập số giấy tờ...' value={customer.identityNumber}></Input>
            )}
          </VStack>
          <VStack w="30%" >
            <Text alignSelf="start" ml="10px" fontWeight="bold">Số điện thoại</Text>
            <Input bg="white" type='tel' placeholder='Nhập số điện thoại...' value={customer.phone}></Input>
            <Text alignSelf="start" ml="10px" fontWeight="bold">Email</Text>
            <Input bg="white" type='email' placeholder='Nhập email...' value={customer.email}></Input>
            <Text alignSelf="start" ml="10px" fontWeight="bold">Quốc tịch</Text>
            <Menu w="30%" h="100%" m="0px" >
              {customer.nationality != null ? (
                <MenuButton as={Button} bg="white" border='1px' borderColor='gray.300' w='100%' rightIcon={<VscTriangleDown/>}>
                  {customer.nationality}
                </MenuButton>
              ) : (
                <MenuButton as={Button} bg="white" border='1px' borderColor='gray.300' w='100%' rightIcon={<VscTriangleDown/>}>
                  Chọn quốc tịch
                </MenuButton>
              )}
              <MenuList overflow="hidden scroll" h="200px">
                {nationalities.map((nationality, index) => (
                  <MenuItem key={index}>{nationality}</MenuItem>
                ))}
              </MenuList>
            </Menu>
          </VStack>
          <VStack w="30%" borderRadius="md" boxShadow="2xl" gap="0">
            <Box w="full" h="200px">
              <Image w="full" h="full" src={CanHo} objectFit="cover" borderTopRadius="md"/>
            </Box>
            <HStack p='2' w="100%" divider={<StackDivider borderColor='gray.200' />}>
              <Text>Căn hộ {dataApartment.project}</Text>
              {apartment.floor === '' ? (
                <Text display="none" textAlign="start"></Text>
              ) : (
                <Text textAlign="end">Tầng {apartment.floor}</Text>
              )}
            </HStack>
            <HStack p='2' w="100%" divider={<StackDivider borderColor='gray.200' />}>
              <Text>Phân khu {dataApartment.subdivision}</Text>
              <Text>{dataApartment.building}</Text>
            </HStack>
            <HStack divider={<StackDivider borderColor='gray.200' />} alignSelf="start" p='2'>
              <Text>{apartment.numberOfBedroom} ngủ</Text>
              <Text>{apartment.numberOfBedroom} toilet</Text>
              <Text>{apartment.direction}</Text>
            </HStack>
            <StackDivider borderColor='gray.200' w="full"/>
            <HStack w="100%" p='2'>
              <Text w="50%" textAlign="start" fontWeight="bold">Tạm tính</Text>
              <Text w="50%" textAlign="end">{(apartment.sellingPrice * 1.12).toFixed(0)} vnđ</Text>
            </HStack>
            <HStack w="100%" p='2'>
              <Text w="50%" textAlign="start" alignSelf="start" fontWeight="bold">Tổng cộng</Text>
              <VStack w="50%" gap="0">
                <Text w="100%"  textAlign="end">{(apartment.sellingPrice * 1.12).toFixed(0)} vnđ</Text>
                <Text w="100%"  textAlign="end" fontSize="x-small">Đã bao gồm VAT & KPBT</Text>
              </VStack>
            </HStack>
          </VStack>
        </HStack>
      </Container>
      <Flex pos="fixed" 
      w="100%" h="100px" 
      bottom="20px" maxW="2000px" 
      justifyContent="center" alignItems="center">
          <VStack w="30%" h="auto" bg="white" borderRadius="md" p="2" boxShadow="dark-lg">
              <HStack w="100%" fontWeight="bold">
                  <Text w="50%">Giá niêm yết</Text>
                  <Text w="50%" textAlign="end">{(apartment.sellingPrice * 1.12).toFixed(0)} vnđ</Text>
              </HStack>
              <Text alignSelf="start" fontSize="small">Đã bao gồm VAT & KPBT</Text>
              <Button bg="blue.900" textColor="white" w="100%" h="50px" onClick={handleBuy}>
                  Xác nhận thông tin
              </Button>
          </VStack>
      </Flex>
    </>
    
  )
}

export default CustomerDetails