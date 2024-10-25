import React, {useState, useEffect} from 'react';
import { SimpleGrid,Box, Heading, Text, VStack, Avatar, useColorMode, useColorModeValue, HStack, Button, Image, Spacer } from '@chakra-ui/react';
import mainImage from '../../assets/main.jpg'
import smartCityImage from '../../assets/smart_city.jpg'
import grandParkImage from '../../assets/grand_park.jpg'
import oceanParkImage from '../../assets/ocean_park.jpg'
import { FaCrown, FaShoppingCart, FaNewspaper, FaGlobe, FaMapMarkedAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import phoneImage from '../../assets/2dt.png'
import TopNavCustomer from '../../components/TopNavCustomer';


function useTypingEffect(text = '', speed = 100) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!text || typeof text !== 'string') return;

    let index = 0;
    setDisplayedText(''); // Clear displayed text when a new phrase starts

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        index += 1;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return displayedText;
}

function HomePage() {
  const gradientBg = useColorModeValue(
    'linear(to-r, blue.800, blue.600)',
    'linear(to-r, blue.900, blue.700)'
  );
  const urbanAreas = [
    {
      name: 'Vinhomes Smart City',
      description: 'Vinhomes Smart City enjoy you with a luxurious and classy life, the first smart mega city in Vietnam.',
      imgSrc: smartCityImage, // Use the variable directly, not inside {}
    },
    {
      name: 'Vinhomes Grand Park',
      description: 'Operated to internationally successful models such as Singapore, Korea Songdo, Japan Fujisawa or Europe & American smart cities, Vinhomes Grand Park is...',
      imgSrc: grandParkImage, // Use the variable directly, not inside {}
    },
    {
      name: 'Vinhomes Ocean Park',
      description: 'Vinhomes Ocean Park, a world-class city, defines a new City of Nature - Life and People with a fresh appearance and exciting spirit, ready for amazing...',
      imgSrc: oceanParkImage, // Use the variable directly, not inside {}
    },
  ];
  const { colorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800'); 
  const borderColor = useColorModeValue('gray.200', 'gray.700'); 
  const textColor = useColorModeValue('gray.800', 'white');

  const [index, setIndex] = useState(0);

  const phrases = [
    ' Hạnh phúc là tận hưởng từng khoảnh khắc bên gia đình.',
    ' Hạnh phúc là việc vun trọn tổ ấm trên khắp Việt Nam..'
  ];
  const displayedText = useTypingEffect(phrases[index] || '', 50); 

  useEffect(() => {
    const changePhrase = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 2700); 

    return () => clearTimeout(changePhrase);
  }, [index, phrases.length]);


  const bgColor = useColorModeValue('white', 'gray.800');
  return (
    <Box bg={bg}>
      <TopNavCustomer/>
      <Box position="relative" h="600px">
        <Image
          src={mainImage}
          alt="Cityscape"
          objectFit="cover"
          objectPosition="center"
          w="90.5%"
          h="110%"
          style={{ transform: 'scale(1.2)' }}/>
        <Box
          position="absolute"
          bottom="-128"
          left="0"
          right="0"
          h="40%" // Adjust the height to cover the desired area
          bgGradient="linear(to-t, rgba(0, 0, 0, 0.6), transparent)" // Darker gradient for more shadow
          zIndex="0"/>
        <Box
        position="absolute"
        bottom="-18%" 
        left="50%"
        transform="translate(-50%, -50%)"
        textAlign="center"
        color="white">
          <Text fontSize="4xl" fontWeight="bold"textShadow="2px 2px 5px rgba(0, 0, 0, 0.5)" fontFamily={"Montserrat"}>
            NƠI HẠNH PHÚC NGẬP TRÀN
          </Text>
          <Text fontSize="lg" mt={2} fontWeight="bold" fontFamily={"Montserrat"} textShadow="1px 1px 3px rgba(0, 0, 0, 0.5)">
            {displayedText}
          </Text>
        </Box>
      </Box>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <Box bg="#f8f5f0" py={10} px={6} textAlign="center">
        <Text 
          fontSize="2xl" 
          fontWeight="bold" 
          mb={4} 
          fontFamily="garamondpremrpro" 
          color="#162b75"
          lineHeight="1.5"
          w='900px'
          textAlign="center" 
          mx="auto">
          Vinhomes là thương hiệu bất động sản số 1 Việt Nam, hoạt động trong lĩnh vực
        </Text>
        <Text
          fontSize="2xl" 
          fontWeight="700" 
          mb={4} 
          fontFamily="garamondpremrpro" 
          color="#162b75"
          lineHeight="1.5"
          w='900px'
          textAlign="center" 
          mx="auto">
          phát triển, chuyển nhượng và vận hành bất động sản
        </Text>       

        <HStack justify="center" spacing={4} bg="white" borderRadius="md" boxShadow="sm" p={2} maxW="60%" mx="auto" >
          <HStack
            align="center"
            bg="white"
            borderRadius="md"
            boxShadow="md"
            p={4}
            transition="background-color 0.3s, color 0.3s"
            _hover={{ bg: 'yellow.500', color: 'white' }}
            w="250px" 
            h="100px"
          >
            <Box as={FaCrown} boxSize={10} color="blue.600" />
            <Text fontWeight="semibold" textAlign="center" fontSize="sm">
              THƯƠNG HIỆU BẤT ĐỘNG SẢN GIÁ TRỊ NHẤT VIỆT NAM
            </Text>
          </HStack>
          <HStack
            align="center"
            bg="white"
            borderRadius="md"
            boxShadow="md"
            p={4}
            transition="background-color 0.3s, color 0.3s"
            _hover={{ bg: 'yellow.500', color: 'white' }}
            w="200px"
            h="100px"
          >
            <Box as={FaShoppingCart} boxSize={6} color="blue.600" />
            <Text fontWeight="semibold" textAlign="center" fontSize="sm">
              MUA TRỰC TIẾP
            </Text>
          </HStack>
          <HStack
            align="center"
            bg="white"
            borderRadius="md"
            boxShadow="md"
            p={4}
            transition="background-color 0.3s, color 0.3s"
            _hover={{ bg: 'yellow.500', color: 'white' }}
            w="200px"
            h="100px"
          >
            <Box as={FaNewspaper} boxSize={6} color="blue.600" />
            <Text fontWeight="semibold" textAlign="center" fontSize="sm">
              TIN TỨC MỚI NHẤT
            </Text>
          </HStack>
          <HStack
            align="center"
            bg="white"
            borderRadius="md"
            boxShadow="md"
            p={4}
            transition="background-color 0.3s, color 0.3s"
            _hover={{ bg: 'yellow.500', color: 'white' }}
            w="200px"
            h="100px"
          >
            <Box as={FaGlobe} boxSize={6} color="blue.600" />
            <Text fontWeight="semibold" textAlign="center" fontSize="sm">
              VIRTUAL TOUR
            </Text>
          </HStack>
          <HStack
            align="center"
            bg="white"
            borderRadius="md"
            boxShadow="md"
            p={4}
            transition="background-color 0.3s, color 0.3s"
            _hover={{ bg: 'yellow.500', color: 'white' }}
            w="200px"
            h="100px"
          >
            <Box as={FaMapMarkedAlt} boxSize={6} color="blue.600" />
            <Text fontWeight="semibold" textAlign="center" fontSize="sm">
              BẢN ĐỒ DỰ ÁN
            </Text>
          </HStack>
        </HStack>
        <br/>
        <Text fontSize='20px' mt={4} fontFamily={'montserrat'}>
          Vinhomes sẽ không ngừng nỗ lực để kiến tạo nên những Khu đô thị đẳng cấp bậc nhất Việt Nam.
        </Text>
      </Box>
      <Box bg="#e5d2ae" py={12} px={6} position="relative">
        <Box display="flex" justifyContent="space-between" alignItems="center" maxW="1200px" mx="auto">
          {/* Left Text Content */}
          <VStack align="start" maxW="400px" spacing={6}>
            <Heading as="h2" fontSize="3xl" fontWeight="bold" color="blue.800">
              DỰ ÁN MỚI NHẤT
            </Heading>
            <Text color="gray.700" fontSize="md" lineHeight="1.6">
              Tiên phong mang đến trải nghiệm sống lý tưởng giữa lòng đô thị với những khu dân cư
              được quy hoạch chuyên nghiệp, tiện ích dịch vụ đồng bộ, môi trường xanh sạch, giúp
              định hình phong cách sống mới cho người dân Việt Nam.
            </Text>
            <Button variant="outline" colorScheme="blue" borderRadius="md">
              XEM TẤT CẢ DỰ ÁN
            </Button>
          </VStack>

          {/* Large Background Text */}
          <Text
            position="absolute"
            right="0"
            top="50%"
            transform="translateY(-50%)"
            fontSize="150px"
            color="rgba(0, 0, 0, 0.1)" // Faint color
            fontWeight="bold"
            lineHeight="1"
            zIndex="-1" // Ensures it stays behind other elements
            whiteSpace="nowrap"
          >
            VINHOMES
          </Text>
        </Box>
      </Box>
      <Box bg={bg} color={textColor} py={20} position="relative">
        <Box
          position="absolute"
          inset="0"
          bgImage={`url(${mainImage})`}
          bgSize="cover"
          bgPosition="center"
          opacity={0.3}
          zIndex="-1"/>
        <Box bg={bg}>
          <Box maxW="1200px" mx="auto" textAlign="center" p={6}>
            <Heading as="h1" fontSize="5xl" fontWeight="bold" color="blue.800" mb={6}>
              VINHOMES RESIDENTS
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="800px" mx="auto" mb={10}>
              Vinhomes desires to connect the community, build a civilized and dynamic living environment with green spaces for your good and quality life.
            </Text>

            <SimpleGrid columns={[1, 1, 3]} spacing={10} mb={10}>
              {urbanAreas.map((area) => (
                <Box
                  key={area.name}
                  boxShadow="lg"
                  borderRadius="md"
                  overflow="hidden"
                  bg="white"
                  position="relative"
                  _hover={{ transform: 'scale(1.02)', boxShadow: 'xl' }}
                  transition="0.3s"
                  className="group" // Add a className for better hover control
                >
                  {/* Image */}
                  <Image src={area.imgSrc} alt={area.name} />

                  {/* Basic Info */}
                  <Box p={6} bg="white">
                    <Text fontSize="sm" color="gray.500" mb={2}>
                      URBAN AREA
                    </Text>
                    <Heading as="h3" size="md" color="blue.800">
                      {area.name}
                    </Heading>
                  </Box>
                  <Box
                    p={6}
                    bg="rgba(255, 255, 255, 0.95)"
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    transform="translateY(100%)"
                    opacity={0}
                    visibility="hidden"
                    transition="opacity 0.3s ease, transform 0.3s ease"
                    _groupHover={{ opacity: 1, visibility: 'visible', transform: 'translateY(0)' }}
                  >
                    <Text fontSize="sm" color="gray.500" mb={2}>
                      URBAN AREA
                    </Text>
                    <Heading as="h3" size="md" color="blue.800" mb={2}>
                      {area.name}
                    </Heading>
                    <Text color="gray.700">{area.description}</Text>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>

            <Button
              as={Link}
              to="/projects"
              variant="solid"
              colorScheme="yellow"
              size="lg"
              borderRadius="md">
              VIEW ALL
            </Button>
          </Box>
        </Box>
      </Box> {/* Đây là phần 3 khung ảnh */}
        <Box bgGradient={gradientBg} p={8} color="white" minH="50vh" display="flex" alignItems="center" justifyContent="center">
          <HStack spacing={8} align="center" maxW="1200px" mx="auto" flexWrap="wrap">
            <VStack align="start" spacing={6} maxW="600px">
              <Text fontSize="sm" textTransform="uppercase" fontWeight="bold">
                CUỘC SỐNG THÔNG MINH TRONG TẦM TAY
              </Text>
              <Heading as="h1" fontSize='40px' color="#e0de0a">
                KẾT NỐI TIỆN ÍCH VỚI CƯ DÂN
              </Heading>
              <Text fontSize="md" lineHeight="1.6">
                Tiện ích phần mềm thông minh Vinhomes sẵn sàng trên các nền tảng di động phổ biến.
                Tất cả các nhu cầu đã được gói gọn trong một công cụ để giúp cuộc sống của bạn tại
                Vinhomes trở nên thuận tiện nhất có thể. Từ việc đăng ký dịch vụ, cho đến giao tiếp với
                ban quản lý / bộ phận Chăm sóc khách hàng. Tất cả trong một!
              </Text>
            </VStack>
            {/* Image Section */}
            <Box
              bg="blue.750"
              borderRadius="2xl"
              overflow="hidden"
              boxShadow="2xl"
              maxW="400px"
              w="100%"
              transform="rotate(-3deg)"
              transition="transform 0.3s"
              _hover={{ transform: 'rotate(-1deg) scale(1.05)' }}>
              <Image
                src={phoneImage}
                alt="App Screen"
                objectFit="cover"
                w="100%"
                h="auto"
                bg={gradientBg} />
            </Box>
          </HStack>
        </Box>
    </Box>
  );
}
export default HomePage
