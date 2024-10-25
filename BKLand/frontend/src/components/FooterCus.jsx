import React from 'react';
import { Box, Text, HStack, VStack, Input, Button, Divider, Icon, Link } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

function Footer() {
  return (
    <Box bg="#f8f5f0" py={10} px={6}>
      <VStack spacing={10} width="100%" alignItems="center" fontFamily='Montserrat' fontSize='18px'>
        {/* Left Section: Links */}
        <HStack
          align="flex-start"
          spacing={10}
          wrap="wrap"
          justify="center"
          width="100%"
          maxW="1200px"
        >
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" color="blue.800">
              Về Vinhomes
            </Text>
            <Link href="#">Giới thiệu</Link>
            <Link href="#">Khu đô thị</Link>
            <Link href="#">Tuyển dụng</Link>
          </VStack>
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" color="blue.800">
              Bất động sản bán
            </Text>
            <Link href="#">Mua trực tuyến</Link>
            <Link href="#">Dự án</Link>
            <Link href="#">BĐS nghỉ dưỡng</Link>
            <Link href="#">BĐS khác</Link>
            <Link href="#">Virtual Tour Collections</Link>
            <Link href="#">Bản Đồ Vinhomes</Link>
          </VStack>
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" color="blue.800">
              Bất động sản thuê
            </Text>
            <Link href="#">Cho thuê căn hộ</Link>
            <Link href="#">Cho thuê văn phòng</Link>
          </VStack>
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" color="blue.800">
              Quan hệ cổ đông
            </Text>
            <Link href="#">Cổ phiếu Vinhomes</Link>
            <Link href="#">Báo cáo tài chính</Link>
            <Link href="#">Báo cáo thường niên</Link>
            <Link href="#">Lịch sự kiện đầu tư</Link>
          </VStack>
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" color="blue.800">Tin tức</Text>
            <Link href="#">Tin tức - Sự kiện</Link>
            <Link href="#">Ưu đãi - Khuyến mãi</Link>

            <Text fontWeight="bold" color="blue.800" mt={4}>Pháp lý</Text>
            <Link href="#">Chính sách bảo vệ dữ liệu cá nhân</Link>
          </VStack>
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" color="blue.800">
              Hỗ trợ
            </Text>
            <Link href="#">Chăm sóc khách hàng</Link>
            <Link href="#">Hotline bán hàng</Link>
          </VStack>
        </HStack>

        <Divider />

        {/* Right Section: Contact and Registration */}
        <HStack
          justify="space-between"
          align="start"
          width="100%"
          maxW="1200px"
          wrap="wrap"
          spacing={8}
        >
          <VStack align="start" spacing={4} maxW="400px">
            <Text fontSize="lg" fontWeight="bold">
              Vinhomes
            </Text>
            <Text fontSize="sm">
              Công ty Cổ phần Vinhomes
              <br />
              Đại diện: Bà Vũ Thái Ninh (Theo giấy ủy quyền số 057 ngày
              25/10/2022)
              <br />
              Địa chỉ: Tòa nhà văn phòng Symphony, Đường Chu Huy Mân, Khu đô thị
              sinh thái Vinhomes Riverside, Phường Phúc Lợi, Quận Long Biên,
              Thành phố Hà Nội, Việt Nam.
              <br />
              Điện thoại: +84 24 39749350
            </Text>
            <Button
              bg="yellow.500"
              color="white"
              borderRadius="md"
              _hover={{ bg: 'yellow.600' }}
              w="100%"
            >
              Tổng đài CSKH 1900 2323 89
            </Button>
            <HStack spacing={4}>
              <Icon as={FaFacebook} boxSize={6} color="blue.600" />
              <Icon as={FaInstagram} boxSize={6} color="blue.600" />
              <Icon as={FaYoutube} boxSize={6} color="blue.600" />
            </HStack>
          </VStack>

          {/* Registration Form */}
          <VStack align="start" spacing={4} maxW="400px" width="100%">
            <Input placeholder="Họ và tên" size="md" bg="white" />
            <Input placeholder="Số điện thoại" size="md" bg="white" />
            <Input placeholder="Email" size="md" bg="white" />
            <Button
              bg="yellow.500"
              color="white"
              borderRadius="md"
              _hover={{ bg: 'yellow.600' }}
              w="100%"
            >
              Đăng ký
            </Button>
            <Text fontSize="xs">
              Bằng việc bấm vào nút "Đăng ký", bạn đồng ý với Chính sách Quyền
              Riêng tư và Chính Sách Bảo Mật Thông Tin của chúng tôi.
            </Text>
          </VStack>
        </HStack>

        <Divider />

        {/* Bottom Links */}
        <HStack justify="center" spacing={8} width="100%">
          <Text fontSize="sm">
            © 2024. Toàn bộ bản quyền thuộc Vinhomes JSC. Một thành viên của Tập
            đoàn Vingroup.
          </Text>
          <HStack spacing={4}>
            <Text fontSize="sm">VinFast</Text>
            <Text fontSize="sm">Vinmec</Text>
            <Text fontSize="sm">Vinpearl</Text>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
}

export default Footer;
