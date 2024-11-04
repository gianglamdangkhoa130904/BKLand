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
    const [building, setBuilding] = useState('');
    const [subdivision, setSubdivision] = useState('');
    const [project, setProject] = useState('');
    const fetchData = async () => {
        const dataApartment = location.state;
        setApartment(dataApartment);
        const responceBuilding = await axios.get(`http://localhost:1325/buildings/${dataApartment.buildingID._id}`);
        setBuilding(responceBuilding.data.data);
        // console.log(responceBuilding.data.data);
        const responceSubdivision = await axios.get(`http://localhost:1325/subdivisions/${responceBuilding.data.data.subdivision}`);
        setSubdivision(responceSubdivision.data.data);
        // console.log(responceSubdivision.data.data);
        const responceProject = await axios.get(`http://localhost:1325/projects/${responceSubdivision.data.data.project}`);
        setProject(responceProject.data.data);
        // console.log(responceProject.data.data);
    }
    const handleBuy = () => {
        const data =  {apartment: apartment, 
            building: building.buildingName, 
            subdivision: subdivision.subdivisionName,
            project: project.projectName};
        navigate('/customer/details', { state: data });
    }
    useEffect(() => {
        fetchData();
    }, [])
  return (
    <>
        <TopNavCustomer/>
        <Container maxW="5xl" h="auto" mt="100px" p="0">
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
            <HStack mt="40px" bg="white" h="500px" boxShadow="2xl" borderRadius="md" mb='150px'>
                <Tabs w="100%" alignSelf="start" align='center' isFitted variant='unstyled' mt="5px">
                    <TabList>
                        <Tab fontWeight="bold" fontSize="large">Thông tin dự án</Tab>
                        <Tab fontWeight="bold" fontSize="large">Phân khu</Tab>
                        <Tab fontWeight="bold" fontSize="large">Tòa</Tab>
                        <Tab fontWeight="bold" fontSize="large">Tổng quan căn hộ</Tab>
                    </TabList>
                    <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px'/>
                    <TabPanels>
                        <TabPanel>
                            <VStack align="start" fontSize="large">
                                <Box>
                                    Dự án: {project.projectName}
                                </Box>
                                <Box>
                                    Mô tả dự án: {project.projectDescription}
                                </Box>
                            </VStack>
                        </TabPanel>
                        <TabPanel>
                            <VStack align="start" fontSize="large">
                                <Box>
                                    Phân khu: {subdivision.subdivisionName}
                                </Box>
                                <Box>
                                    Mô tả phân khu: {subdivision.subdivisionDescription}
                                </Box>
                            </VStack>
                        </TabPanel>
                        <TabPanel>
                            <VStack align="start" fontSize="large">
                                <Box>
                                    Tòa: {building.buildingName}
                                </Box>
                                <Box>
                                    Mô tả tòa: {building.buildingDescription}
                                </Box>
                            </VStack>
                        </TabPanel>
                        <TabPanel>
                            <VStack align="start" fontSize="large">
                                <Box>
                                    Số lượng phòng ngủ: {apartment.numberOfBedroom}
                                </Box>
                                <Box>
                                    Số lượng nhà vệ sinh: {apartment.numberOfToilet}
                                </Box>
                                <Box>
                                    Hướng: {apartment.direction}
                                </Box>
                                <Box>
                                    Tầng: {apartment.floor}
                                </Box>
                            </VStack>
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
                <Button bg="blue.900" textColor="white" w="100%" h="50px" onClick={handleBuy}>
                    Đặt cọc 50.000.000 vnđ
                </Button>
            </VStack>
        </Flex>
    </>
  )
}

export default ApartmentDetails