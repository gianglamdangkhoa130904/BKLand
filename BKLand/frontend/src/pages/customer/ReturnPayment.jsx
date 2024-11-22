import axios from 'axios';
import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie'
import { Box, AbsoluteCenter, Button } from '@chakra-ui/react';
import { useSnackbar } from 'notistack';
const ReturnPayment = () => {
  const {enqueueSnackbar} = useSnackbar(); 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const orderId = queryParams.get('vnp_OrderInfo');
  const amount = queryParams.get('vnp_Amount') / 100;
  const paymentStatus = queryParams.get('vnp_TransactionStatus');
  useEffect(() => {
    const apartment = Cookie.get('apartment');
    if(paymentStatus === '02'){
      navigate('/home');
      enqueueSnackbar('Thanh toán thất bại', { variant: 'warning' });
    }
    else if(paymentStatus === '00'){
      const data = {
        orderStatus: 'Đã thanh toán'
      }
      axios.put(`https://bkland.onrender.com/order/${orderId.substring(24)}`, data)
      .then((response) => {
        // console.log(response.data);
        const dataAparment = {
          apartmentStatus: 'Đã đặt cọc'
        }
        axios.put(`https://bkland.onrender.com/apartments/updateStatus/${apartment}`, dataAparment)
        .then((response) => {
          console.log(response.data.data);
        })
      })
    }
  }, [])
  return (
    <>
    <Box position="relative" className='h-screen bg-gradient-to-tl from-cyan-50 to-cyan-500 '>
      <AbsoluteCenter p="4" textAlign="center">
        {paymentStatus === '00' ? (
        <Box fontSize="2xl" textColor="black" fontWeight="bold" p='6' boxShadow="dark-lg" borderRadius="3xl" className='bg-white'>
          Thanh toán thành công
        </Box>
      ) : (
        <Box fontSize="2xl" textColor="black" fontWeight="bold" p='6' boxShadow="dark-lg" borderRadius="3xl" className='bg-white'>Thanh toán thất bại</Box>
      )}
      </AbsoluteCenter>
      <Link to={'/home'}><Button>Về trang chủ</Button></Link>
    </Box>
    
    </>
  )
}

export default ReturnPayment
