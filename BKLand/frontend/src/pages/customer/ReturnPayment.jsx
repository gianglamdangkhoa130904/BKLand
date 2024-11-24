import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { Box, AbsoluteCenter, Button, Text, VStack, Divider } from '@chakra-ui/react';
import { useSnackbar } from 'notistack';
const ReturnPayment = () => {
  const {enqueueSnackbar} = useSnackbar(); 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const orderId = queryParams.get('vnp_OrderInfo');
  const amount = queryParams.get('vnp_Amount') / 100;
  const paymentStatus = queryParams.get('vnp_TransactionStatus');

  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrderDetails = async () => {
    try {
      const extractedOrderId = orderId.substring(24);
      console.log('Extracted Order ID:', extractedOrderId);
      
      if (!extractedOrderId) {
        console.log('No valid OrderId found in:', orderId);
        setIsLoading(false);
        return;
      }

      const response = await axios.get(`https://bkland.onrender.com/order/${extractedOrderId}`);
      console.log('Order API Response:', response.data);
      
      if (response.data) {
        setOrderDetails(response.data);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      enqueueSnackbar('Không thể tải thông tin đơn hàng', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const processPayment = (apartment) => {
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
        // console.log(response.data.data);
      })
    })
  }
  const processPayment_Rent = (apartment) => {
    const data = {
      orderStatus: 'Đã thanh toán'
    }
    axios.put(`https://bkland.onrender.com/order/${orderId.substring(24)}`, data)
    .then((response) => {
      // console.log(response.data);
      const dataAparment = {
        apartmentStatus: 'Đã thuê'
      }
      axios.put(`https://bkland.onrender.com/apartments/updateStatus/${apartment}`, dataAparment)
      .then((response) => {
        // console.log(response.data.data);
        const dataOwnerShipCertificate = {
          ticketType: 'Thuê',
          validityPeriod: addMonthsToDate(Cookies.get('rentDay'), Cookies.get('numberOfRentDay')),
          publishDate: new Date(Cookies.get('rentDay')),
          customerID: Cookies.get('nameID'),
          apartmentID: response.data.data._id
        }
        axios.post('https://bkland.onrender.com/certificates', dataOwnerShipCertificate)
        .then((response) => {
          console.log(response.data);
          fetchOrderDetails()
        })
      })
    })
  }
  useEffect(() => {
    const apartment = Cookies.get('apartment');
    if(paymentStatus === '02'){
      navigate('/home');
      enqueueSnackbar('Thanh toán thất bại', { variant: 'warning' });
      if(Cookies.get('transactionType') === 'buy'){
        Cookies.remove('apartment');
        Cookies.remove('transactionType');
      }
      else if(Cookies.get('transactionType') === 'rent'){
        Cookies.remove('apartment');
        Cookies.remove('rentDay');
        Cookies.remove('numberOfRentDay');
        Cookies.remove('transactionType');
      }
    }
    else if(paymentStatus === '00'){
      enqueueSnackbar('Thanh toán thành công', { variant: 'success' });
      if(Cookies.get('transactionType') === 'buy'){
        processPayment(apartment);
      }
      else if(Cookies.get('transactionType') === 'rent'){
        processPayment_Rent(apartment);
      }
    }
  }, [navigate])
  function addMonthsToDate(inputDate, monthsToAdd) {
    const resultDate = new Date(inputDate); // Sao chép đối tượng Date để không thay đổi inputDate
    resultDate.setMonth(resultDate.getMonth() + parseInt(monthsToAdd)); 
    return resultDate;
  }
  function formatDate(dateString) {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return new Date().toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
    
    return date.toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
  return (
    <>
    <Box position="relative" className="min-h-screen w-full bg-[#F5E6D3] p-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0zMCAzMG0tMjggMGEyOCAyOCAwIDEgMCA1NiAwYTI4IDI4IDAgMSAwLTU2IDB6IiBzdHJva2U9IiNENEJFQTIiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==')] bg-opacity-50">
      <AbsoluteCenter p="4" color="white" textAlign="center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl text-[#5C4033] mb-2 tracking-wide">
              Kết Quả Thanh Toán
            </h1>
            <div className="flex items-center justify-center">
              <div className="h-px w-16 bg-[#8B4513]"></div>
              <div className="mx-4 text-[#8B4513]">✦</div>
              <div className="h-px w-16 bg-[#8B4513]"></div>
            </div>
          </div>

          <div className="bg-[#FFFAF0] rounded-lg border-2 border-[#8B4513] p-8 space-y-6 shadow-[8px_8px_0_0_rgba(139,69,19,0.3)] relative">
            {isLoading ? (
              <Text className="text-[#8B4513] text-center">Đang tải thông tin đơn hàng...</Text>
            ) : queryParams.get('vnp_ResponseCode') === '00' ? (
              <VStack spacing={4} align="stretch">
                <Text className="text-2xl text-green-600 font-bold text-center">
                  Thanh toán thành công
                </Text>
                
                <Divider className="border-[#D4BEA2]" />
                
                <Box className="space-y-4">
                  <div className="flex justify-between">
                    <Text className="text-[#8B4513]">Mã đơn hàng:</Text>
                    <Text className="text-[#5C4033] font-medium">
                      {orderId.substring(24) || 'N/A'}
                    </Text>
                  </div>

                  <div className="flex justify-between">
                    <Text className="text-[#8B4513]">Loại đơn hàng:</Text>
                    <Text className="text-[#5C4033] font-medium">
                      {Cookies.get('transactionType') === 'buy' ? 'Thanh toán đặt cọc căn hộ' : 'Thanh toán đặt thuê căn hộ'}
                    </Text>
                  </div>

                  <div className="flex justify-between">
                    <Text className="text-[#8B4513]">Ngày đặt hàng:</Text>
                    <Text className="text-[#5C4033] font-medium">
                      {formatDate(new Date())}
                    </Text>
                  </div>
                  
                  <div className="flex justify-between">
                    <Text className="text-[#8B4513]">Số tiền:</Text>
                    <Text className="text-[#5C4033] font-medium">
                      {amount.toLocaleString('vi-VN')} VNĐ
                    </Text>
                  </div>
                  
                  <div className="flex justify-between">
                    <Text className="text-[#8B4513]">Trạng thái:</Text>
                    <Text className="text-green-600 font-medium">
                      Đã thanh toán
                    </Text>
                  </div>

                  <div className="flex justify-center">
                    <Text className="text-[#8B4513] text-start w-1/3">Mô tả:</Text>
                    <Text className="text-[#5C4033] font-medium text-right w-2/3">
                      {orderId || 'N/A'}
                    </Text>
                  </div>
                </Box>
              </VStack>
            ) : (
              <Text className="text-2xl text-red-600 font-bold text-center">
                Thanh toán thất bại
              </Text>
            )}
            
            <div className="text-center pt-6">
              <Link to="/home">
                <Button className="bg-[#8B4513] text-[#FFFAF0] py-3 px-8 rounded border-2 border-[#8B4513] hover:bg-[#FFFAF0] hover:text-[#8B4513] transition-all duration-300 transform hover:-translate-y-1 shadow-md">
                  Về trang chủ
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-center mt-6 text-[#8B4513]">
            • • • • •
          </div>
        </div>
      </AbsoluteCenter>
    </Box>
    
    </>
  )
}

export default ReturnPayment