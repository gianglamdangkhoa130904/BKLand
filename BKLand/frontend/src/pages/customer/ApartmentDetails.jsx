import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import TopNavCustomer from '../../components/TopNavCustomer';
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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ApartmentDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [apartment, setApartment] = useState('');
    const fetchData = async () => {
        const dataApartment = location.state;
        setApartment(dataApartment);
        const responceBuilding = await axios.get(`http://localhost:1325/buildings/${dataApartment.buildingID}`);
        console.log(responceBuilding.data.data);
        const responceSubdivision = await axios.get(`http://localhost:1325/subdivisions/${responceBuilding.data.data.subdivision}`);
        console.log(responceSubdivision.data.data);
        const responceProject = await axios.get(`http://localhost:1325/projects/${responceSubdivision.data.data.project}`);
        console.log(responceProject.data.data);
    }
    useEffect(() => {
        fetchData();
    }, [])
  return (
    <>
        <TopNavCustomer/>
        <Container maxW="5xl" h="2000px" mt="100px" p="0">
            <HStack h="350px" w="100%">
                <Box w="50%" m="0" h="100%"><Image w="100%" h="100%" objectFit='cover' src={CanHo} borderRadius="md"></Image></Box>
                <VStack w="25%" h="100%">
                    <Box h="50%" ><Image w="100%" h="100%" objectFit='cover' src={CanHo} borderRadius="md"></Image></Box>
                    <Box h="50%" ><Image w="100%" h="100%" objectFit='cover' src={CanHo} borderRadius="md"></Image></Box>
                </VStack>
                <VStack w="25%" h="100%">
                    <Box h="50%"><Image w="100%" h="100%" objectFit='cover' src={CanHo} borderRadius="md"></Image></Box>
                    <Box h="50%"><Image w="100%" h="100%" objectFit='cover' src={CanHo} borderRadius="md"></Image></Box>
                </VStack>
            </HStack>
            <HStack mt="40px" bg="white" h="500px" boxShadow="2xl" borderRadius="md">
                <Tabs w="100%" alignSelf="start" align='center' isFitted variant='unstyled' mt="5px">
                    <TabList>
                        <Tab fontWeight="bold">Thông tin dự án</Tab>
                        <Tab fontWeight="bold">Phân khu</Tab>
                        <Tab fontWeight="bold">Tòa</Tab>
                        <Tab fontWeight="bold">Tổng quan căn hộ</Tab>
                    </TabList>
                    <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px'/>
                    <TabPanels>
                        <TabPanel>
                        <p>Dự án</p>
                        </TabPanel>
                        <TabPanel>
                        <p>Phân khu</p>
                        </TabPanel>
                        <TabPanel>
                        <p>Tòa</p>
                        </TabPanel>
                        <TabPanel>
                        <p>Căn hộ</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </HStack>
        </Container>
        <Flex pos="fixed" 
        w="100%" h="100px" 
        bottom="20px" maxW="2000px" 
        justifyContent="center" alignItems="center">
            <VStack w="30%" h="auto" bg="white" borderRadius="md" p="2" boxShadow="dark-lg">
                <HStack w="100%" fontWeight="bold">
                    <Text w="50%">Giá niêm yết</Text>
                    <Text w="50%" textAlign="end">{apartment.sellingPrice} vnđ</Text>
                </HStack>
                <Text alignSelf="start" fontSize="small">Đã bao gồm VAT & KPBT</Text>
                <Button bg="blue.900" textColor="white" w="100%" h="50px">
                    Đặt mua căn hộ
                </Button>
            </VStack>
        </Flex>
    </>
  )
}

export default ApartmentDetails