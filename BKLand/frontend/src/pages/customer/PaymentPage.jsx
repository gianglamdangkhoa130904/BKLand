import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Cookie from 'js-cookie'
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
import Cookies from 'js-cookie';
const PaymentPage = () => {
    const location = useLocation();
    const [amount, setAmount] = useState(0);
    const [orderId, setOrderId] = useState('');
    const [product, setProduct] = useState('');

    const handlePayment = async () => {
    try {
      const res = await axios.post('https://bkland.onrender.com/vnpay/payment', {
        amount,
        orderId
      });
      window.location.href = res.data.paymentUrl; // Chuyển hướng đến VNPay URL
      Cookie.set('statusPay', 'buy'); 
      Cookie.set('apartment', location.state._id);
      Cookie.set('customer', Cookie.get('nameID'));
    } catch (error) {
      console.error('Payment error:', error);
    }
    };
    useEffect(() => {
        // setAmount((location.state.sellingPrice *1.12).toFixed(0));
        setAmount(50000000);
        setProduct(location.state);
        setOrderId('Đơn hàng ' + location.state._id + '/' + Cookie.get('nameID'))
    }, [])
  return (
    <Box position="relative" className='h-screen bg-gradient-to-tl from-cyan-50 to-cyan-500 '>
      <AbsoluteCenter p="4" textAlign="center">
        <Box fontSize="3xl" fontWeight="bold" mb="20px" textColor="white">Thanh Toán</Box>
        <VStack p="4" boxShadow="dark-lg" borderRadius="md"gap="4" className='bg-white'>
          <Box fontSize="large" fontWeight="bold" >Thông tin đơn hàng</Box>
          <Box alignSelf="start">Khách hàng: {Cookie.get("name")}</Box>
          <Box alignSelf="start">Số tiền thanh toán: 50.000.000 vnđ</Box>
          <Box alignSelf="start">Loại đơn hàng: Thanh toán đặt cọc căn hộ</Box>
          <Box className='h-auto block w-96' textAlign="start">Mô tả đơn hàng: Thanh toán đặt cọc cho căn hộ {product._id}</Box>
          <Button onClick={handlePayment}>Thanh Toán</Button> 
        </VStack>
          
      </AbsoluteCenter>
      
    </Box>
  )
}

export default PaymentPage