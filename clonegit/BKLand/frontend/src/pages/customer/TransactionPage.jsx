import React, { useEffect, useState } from 'react'
import TopNavCustomer from '../../components/TopNavCustomer';
import mainImage from '../../assets/main.jpg'
import DangKyThamQuan from '../../assets/dang_ky_tham_quan.webp'
import HinhAnhThamQuan from '../../assets/active-direct.png'
import CanHo from '../../assets/apartment_1.jpeg'
import bokaLogo from '../../assets/bokaboka.png'
import {
    Box,
    Text,
    Button,
    HStack,
    Image,
    AbsoluteCenter,
    Flex,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    StackDivider,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    VStack,
    Container,
    useDisclosure,
    Input,
  } from '@chakra-ui/react';
import { FaChevronDown, FaSearch } from 'react-icons/fa';
import { TbBuildingFactory } from "react-icons/tb";
import { PiBuildingsFill } from "react-icons/pi";
import { FaBuilding } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const TransactionPage = () => {
    const navigate = useNavigate();
    // Dùng cho Mua căn hộ
    const [projectList, setProjectList] = useState([]);
    const [subdivisionList, setSubdivisionList] = useState([]);
    const [buildingList, setBuildingList] = useState([]);
    const [apartmentList, setApartmentList] = useState([]);
    const [project, setProject] = useState('');
    const [subdivision, setSubdivision] = useState('');
    const [building, setBuilding] = useState('');
    const [buildingID, setBuildingID] = useState('');
    
    // Overlay
    const { isOpen, onOpen, onClose } = useDisclosure()
    // các const dùng cho Đăng ký tham quan 
    const [visitedProject, setVisitedProject] = useState('');

    const fetchProject = async () => {
        const response = await axios.get('http://localhost:1325/projects');
        setProjectList(response.data.data);
    }
    const fetchSubdivision = async (project) => {
        setProject(project.projectName);
        const response = await axios.get(`http://localhost:1325/subdivisions/project/${project._id}`);
        setSubdivisionList(response.data.data);
    }
    const fetchBuilding = async (subdivision) => {
        setSubdivision(subdivision.subdivisionName);
        const response = await axios.get(`http://localhost:1325/buildings/subdivision/${subdivision._id}`);
        setBuildingList(response.data.data);
    }
    const handleBuilding = async (building) => {
        setBuilding(building.buildingName);
        setBuildingID(building._id);
    }
    const fetchApartment = async () => {
        const response = await axios.get(`http://localhost:1325/apartments/building/${buildingID}`);
        setApartmentList(response.data.data);

    }
    const handleApartment = (apartment) => {
        const data = apartment;
        navigate('/apartment/details', { state: data });
    }
    useEffect(() => {
        fetchProject();
    }, [])
  return (
    <>
        <TopNavCustomer/>
        <Box w="100%" h="81"/>
        <Box position="relative" h="400px">
            <Image
            src={mainImage}
            alt="Cityscape"
            objectFit="cover"
            objectPosition="center"
            w="90.5%"
            h="110%"
            style={{ transform: 'scale(1.2)' }}/>
            <AbsoluteCenter
            textAlign="center"
            w="70%"
            h="100px"
            color="white"
            bg="none">
                <HStack w="100%" h="45%" gap="2">
                    <Flex w="120px" h="100%" bg="white" borderTopRadius="md" justify="center" alignItems="center">
                        <Text textColor="blue.700" fontWeight="bold">Mua</Text>
                    </Flex>
                    <Flex w="120px" h="100%" bg="white" borderTopRadius="md" justify="center" alignItems="center" opacity="70%">
                        <Text textColor="blue.700" fontWeight="bold">Thuê</Text>
                    </Flex>
                </HStack>
                <HStack w="100%" h="55%" bg="0" gap="5">
                    <HStack divider={<StackDivider borderColor='gray.200' />} spacing='6%' h="100%" m="0" bg="white" w="80%" justify="center" borderBottomRadius="md" borderRightRadius="md">
                        <Menu h="100%" m="0px" w="30%">
                            <MenuButton as={Button} leftIcon={<TbBuildingFactory/>} rightIcon={<FaChevronDown />} bg="white">
                                {project === '' ? (<Text>Chọn dự án</Text>) : (<Text>{project}</Text>)}
                            </MenuButton>
                            <MenuList>
                                {projectList.length == 0 ? (
                                    <MenuItem textColor="black">No result</MenuItem>
                                ) : (
                                    projectList.map((project, index) => (
                                        <MenuItem key={index} textColor="black"  onClick={() => fetchSubdivision(project)}>{project.projectName}</MenuItem> 
                                    ))
                                )}
                            </MenuList>
                        </Menu>
                        <Menu w="30%" h="100%" m="0px">
                            <MenuButton as={Button} leftIcon={<PiBuildingsFill/>} rightIcon={<FaChevronDown />} bg="white">
                                {subdivision === '' ? (<Text>Chọn phân khu</Text>) : (<Text>{subdivision}</Text>)}
                            </MenuButton>
                            <MenuList>
                                {subdivisionList.length == 0 ? (
                                    <MenuItem textColor="black">No result</MenuItem>
                                ) : (
                                    subdivisionList.map((subdivision, index) => (
                                        <MenuItem key={index} textColor="black"  onClick={() => fetchBuilding(subdivision)}>{subdivision.subdivisionName}</MenuItem> 
                                    ))
                                )}
                            </MenuList>
                        </Menu>
                        <Menu w="30%" h="100%" m="0px">
                            <MenuButton as={Button} leftIcon={<FaBuilding/>} rightIcon={<FaChevronDown />} bg="white">
                                {building === '' ? (<Text>Chọn tòa</Text>) : (<Text>{building}</Text>)}
                            </MenuButton>
                            <MenuList>
                                {buildingList.length == 0 ? (
                                    <MenuItem textColor="black">No result</MenuItem>
                                ) : (
                                    buildingList.map((building, index) => (
                                        <MenuItem key={index} textColor="black"  onClick={() => handleBuilding(building)}>{building.buildingName}</MenuItem> 
                                    ))
                                )}
                            </MenuList>
                        </Menu>
                    </HStack>
                    <Button leftIcon={<FaSearch/>} bg="blue.400" borderRadius="md" justify="center" alignItems="center" h="100%" w="18%" textColor="white">
                        <Text fontSize="large" fontWeight="bold" onClick={fetchApartment}>Tìm kiếm</Text>
                    </Button>
                </HStack>
            </AbsoluteCenter>
        </Box>
        {apartmentList.length == 0 ? (
        <Container maxW='5xl' h="auto" p="0" marginTop="150px">
            <HStack h="360px">
                <VStack w="50%" p="4">
                    <Text fontSize="xx-large" fontWeight="bold">Đăng ký tham quan dự án và căn hộ mẫu BKLand</Text>
                    <Text fontSize="large">Để Quý khách hàng có được cái nhìn trực quan, chân thực và đa dạng về các dự án của Vinhomes, mời Quý khách đăng ký tham quan dự án và căn hộ mẫu tại đây.</Text>
                    <Button alignSelf="self-start" bg="blue.900" textColor="white" onClick={onOpen}>Đăng ký tham quan</Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                        <ModalHeader>
                            <VStack>
                                <Image src={bokaLogo} alt='logo' h="60px"></Image>
                                <Text fontSize="larger" color="blue.900" fontWeight="bold">Đăng ký tham quan</Text>
                            </VStack>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack>
                                <Menu>
                                    <MenuButton as={Button} rightIcon={<FaChevronDown />} bg="white" w="100%" borderWidth='1px'>
                                        {visitedProject === '' ? (<Text textAlign="start">Chọn dự án</Text>) : (<Text textAlign="start">{visitedProject}</Text>)}
                                    </MenuButton>
                                    <MenuList>
                                        {projectList.length == 0 ? (
                                            <MenuItem textColor="black">No result</MenuItem>
                                        ) : (
                                            projectList.map((project, index) => (
                                                <MenuItem key={index} 
                                                textColor="black"  
                                                onClick={() => setVisitedProject(project.projectName)}
                                                w="100%">
                                                    {project.projectName}
                                                </MenuItem> 
                                            ))
                                        )}
                                    </MenuList>
                                </Menu>
                                <Input type='text' placeholder='Họ và tên'></Input>
                                <Input type='email' placeholder='Email'></Input>
                                <Input type='tel' placeholder='Số điện thoại'></Input>
                                <Text fontSize="large" fontWeight="bold" alignSelf="start">Lựa chọn thời gian tham quan</Text>
                                <HStack gap="15">
                                    <Input type='time' w="180px" alignSelf="start"></Input>
                                    <Input type='date' w="180px" alignSelf="end"></Input>
                                </HStack>
                                <Text fontSize="large" fontWeight="bold" alignSelf="start">Hình thức tham quan</Text>
                                <Image src={HinhAnhThamQuan} w="120px"></Image>
                                <Text>Trải nghiệm thực tế tại dự án</Text>
                                <Text fontSize="small">Bằng việc bấm vào nút "Nhận tư vấn", bạn đồng ý với Chính Sách Bảo Mật Thông Tin của chúng tôi.</Text>
                            </VStack>
                        </ModalBody>
                        <ModalFooter textAlign="center" justifyContent="center">
                            <Button colorScheme='blue' >
                            Nhận tư vấn
                            </Button>
                        </ModalFooter>
                        </ModalContent>
                    </Modal>
                </VStack>
                <Image w="50%" src={DangKyThamQuan} h="100%"></Image>
            </HStack>
            <VStack h="360px" marginTop="50px">
                <Text fontSize="xx-large" alignSelf="self-start">Căn hộ tiêu biểu</Text>
                <Box position="relative" w="100%" h="300px" bg="blue.800" borderRadius="md">
                    <Image w="100%" h="100%" objectFit='cover' objectPosition="center" src={CanHo} borderRadius="md"></Image>
                    <Flex position="absolute" top="0" left="0" p="2" bg="white" mt="10px" ml="10px" borderRadius="md" fontWeight="bold" fontSize="small">
                        Căn hộ tiêu biểu
                    </Flex>
                    <Flex position="absolute" bottom="0" right="0" p="2" mb="10px" mr="10px" textColor="white">3.000.000.000 vnđ</Flex>
                    <VStack position="absolute" bottom="0" left="0" p="2" mb="10px" ml="10px" textColor="white" gap="0" fontWeight="bold">
                        <Text alignSelf="start">BKLand Ocean Park</Text>
                        <Text alignSelf="start">R1.01</Text>
                        <HStack divider={<StackDivider borderColor='gray.200' alignSelf="start"/>}>
                            <Text fontSize="small">2 phòng ngủ</Text>
                            <Text fontSize="small">1 toilet</Text>
                            <Text fontSize="small">Đông Bắc</Text>
                        </HStack>
                    </VStack>
                </Box>
            </VStack>
        </Container>
        ) : (
        <Container maxW='5xl' h="auto" p="0" marginTop="100px">
            <Text fontSize="x-large" fontWeight="bold">Kết quả tìm kiếm</Text>
            {apartmentList.map((apartment, index) => (
            <Box key={index} 
            position="relative" 
            w="100%" h="300px" 
            bg="blue.800" 
            borderRadius="md" 
            onClick={() => handleApartment(apartment)}
            mt="20px" mb="20px" 
            boxShadow='dark-lg'
            _hover={{cursor:"pointer"}}>
                <Image w="100%" h="100%" objectFit='cover' objectPosition="center" src={CanHo} borderRadius="md"></Image>
                <Flex position="absolute" bottom="0" right="0" p="2" mb="10px" mr="10px" textColor="white">{apartment.sellingPrice} vnđ</Flex>
                <VStack position="absolute" bottom="0" left="0" p="2" mb="10px" ml="10px" textColor="white" gap="0" fontWeight="bold">
                    <Text alignSelf="start">{project}</Text>
                    <Text alignSelf="start">{building}</Text>
                    <HStack divider={<StackDivider borderColor='gray.200'/>}  alignSelf="start">
                        <Text fontSize="small">{apartment.numberOfBedroom} phòng ngủ</Text>
                        <Text fontSize="small">{apartment.numberOfToilet} toilet</Text>
                        <Text fontSize="small">{apartment.direction}</Text>
                    </HStack>
                </VStack>
            </Box>
            ))}
        </Container>
        )}
    </>
  )
}

export default TransactionPage