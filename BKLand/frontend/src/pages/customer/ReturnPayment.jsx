import axios from 'axios';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Cookie from 'js-cookie'
import { Box, AbsoluteCenter } from '@chakra-ui/react';
const ReturnPayment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const orderId = queryParams.get('orderId');
  const amount = queryParams.get('amount');
  const paymentStatus = queryParams.get('paymentstatus');

  const order = orderId.substring(9);
  const apartmentID = order.split('/')[0];
  const customerID = order.split('/')[1];
  const fetchData = async () => {
    const apartment = await axios.get(`http://localhost:1325/apartments/${Cookie.get('apartment')}`);
    console.log(apartment.data.data);
    const customer = await axios.get(`http://localhost:1325/users/${Cookie.get('customer')}`);
    console.log(customer.data);
    console.log(Cookie.get('statusPay'));
    console.log(Cookie.get('apartment'));
    console.log(Cookie.get('customer'));
  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <>
    <Box position="relative" className='h-screen bg-gradient-to-tl from-cyan-50 to-cyan-500 '>
      <AbsoluteCenter p="4" textAlign="center">
        {paymentStatus == 1 ? (
        <Box fontSize="2xl" textColor="black" fontWeight="bold" p='6' boxShadow="dark-lg" borderRadius="3xl" className='bg-white'>
          Thanh toán thành công
        </Box>
      ) : (
        <Box fontSize="2xl" textColor="black" fontWeight="bold" p='6' boxShadow="dark-lg" borderRadius="3xl" className='bg-white'>Thanh toán thất bại</Box>
      )}
      </AbsoluteCenter>
    </Box>
    
    </>
  )
}

export default ReturnPayment