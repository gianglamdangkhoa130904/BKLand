import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Cookie from 'js-cookie'
const PaymentPage = () => {
  const location = useLocation();
  const [amount, setAmount] = useState(0);
  const [orderId, setOrderId] = useState('');
  const [product, setProduct] = useState('');

  const handlePayment = async () => {
    try {
      if(location.state.transactionType === 'buy'){
        const order ={
          orderType: 'Thanh toán đặt cọc căn hộ',
          orderDescription: orderId,
          orderAmount: amount,
          orderStatus: 'Chưa thanh toán',
          customerID: Cookie.get('nameID')
        }
        const response = await axios.post('https://bkland.onrender.com/order', order);
        // console.log(response.data);
        if(response){
          const res = await axios.post('https://bkland.onrender.com/vnpay/payment', {
              amount,
              orderId: response.data._id,
              returnURL: window.location.origin
            });
            window.location.href = res.data.paymentUrl; 
            Cookie.set('apartment', location.state.apartment._id);
            Cookie.set('transactionType', location.state.transactionType);
        }
      }
      else{
        const order ={
          orderType: 'Thanh toán đặt thuê căn hộ',
          orderDescription: orderId,
          orderAmount: amount,
          orderStatus: 'Chưa thanh toán',
          customerID: Cookie.get('nameID')
        }
        const response = await axios.post('https://bkland.onrender.com/order', order);
        // console.log(response.data);
        if(response){
          const res = await axios.post('https://bkland.onrender.com/vnpay/payment', {
              amount,
              orderId: response.data._id,
              returnURL: window.location.origin
            });
            window.location.href = res.data.paymentUrl; 
            Cookie.set('apartment', location.state.apartment._id);
            Cookie.set('rentDay', location.state.rentDay);
            Cookie.set('numberOfRentDay', location.state.numberOfRentDay);
            Cookie.set('transactionType', location.state.transactionType);
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
    }
  };
  useEffect(() => {
      // setAmount((location.state.sellingPrice *1.12).toFixed(0));
      if(location.state.transactionType === 'buy'){
        setAmount(50000000);
        setProduct(location.state.apartment);
        setOrderId('Đơn hàng ' + location.state.apartment._id + '/' + Cookie.get('nameID'))
      }
      else{
        setAmount((location.state.apartment.rentPrice * location.state.numberOfRentDay).toFixed(0));
        setProduct(location.state.apartment);
        setOrderId('Đơn hàng ' + location.state.apartment._id + '/' + Cookie.get('nameID')+'/'+ location.state.rentDay+'/'+location.state.numberOfRentDay);
      }
  }, [])
  return (
    <div className="min-h-screen w-full bg-[#F5E6D3] flex items-center justify-center p-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0zMCAzMG0tMjggMGEyOCAyOCAwIDEgMCA1NiAwYTI4IDI4IDAgMSAwLTU2IDB6IiBzdHJva2U9IiNENEJFQTIiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==')] bg-opacity-50">
      <div className="w-full max-w-md">
        {/* Vintage Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl  text-[#5C4033] mb-2 tracking-wide">
            Thanh Toán
          </h1>
          <div className="flex items-center justify-center">
            <div className="h-px w-16 bg-[#8B4513]"></div>
            <div className="mx-4 text-[#8B4513]">✦</div>
            <div className="h-px w-16 bg-[#8B4513]"></div>
          </div>
        </div>
        
        {/* Main Card */}
        <div className="bg-[#FFFAF0] rounded-lg border-2 border-[#8B4513] p-8 space-y-6 shadow-[8px_8px_0_0_rgba(139,69,19,0.3)] relative overflow-hidden">
          {/* Corner Ornaments */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#8B4513] -translate-x-1 -translate-y-1"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#8B4513] translate-x-1 -translate-y-1"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#8B4513] -translate-x-1 translate-y-1"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#8B4513] translate-x-1 translate-y-1"></div>

          <h2 className="text-2xl text-[#8B4513] text-center border-b-2 border-[#D4BEA2] pb-4">
            Thông tin đơn hàng
          </h2>
          
          {/* Order Details */}
          <div className="space-y-6 px-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between border-b border-[#D4BEA2] pb-2">
                <span className="text-[#8B4513]">Khách hàng:</span>
                <span className="font-medium text-[#5C4033]">{Cookie.get("name")}</span>
              </div>
              
              <div className="flex items-center justify-between border-b border-[#D4BEA2] pb-2">
                <span className="text-[#8B4513] ">Số tiền thanh toán:</span>
                {location.state.transactionType === 'buy' ? (
                  <span className="font-medium text-[#5C4033]">50.000.000 vnđ</span>
                ):(
                  <span className="font-medium text-[#5C4033]">{amount} vnđ</span>
                )}
              </div>
              
              <div className="flex items-center justify-between border-b border-[#D4BEA2] pb-2">
                <span className="text-[#8B4513] ">Loại đơn hàng:</span>
                <span className="font-medium text-[#5C4033]">Thanh toán đặt cọc căn hộ</span>
              </div>
              
              <div className="space-y-2 border-b border-[#D4BEA2] pb-2">
                <span className="text-[#8B4513] ">Mô tả đơn hàng:</span>
                {location.state.transactionType === 'buy' ? (
                  <p className="text-[#5C4033] italic">
                    Thanh toán đặt cọc cho căn hộ {product._id}
                  </p>
                ) : (
                  <p className="text-[#5C4033] italic">
                    Thanh toán tổng tiền thuê căn hộ {product._id} trong vòng {location.state.numberOfRentDay} tháng
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Payment Button */}
          <div className="text-center pt-4">
            <button
              onClick={handlePayment}
              className="bg-[#8B4513] text-[#FFFAF0]  py-3 px-8 rounded border-2 border-[#8B4513] hover:bg-[#FFFAF0] hover:text-[#8B4513] transition-all duration-300 transform hover:-translate-y-1 shadow-md"
            >
              Thanh Toán
            </button>
          </div>
        </div>

        {/* Bottom Ornament */}
        <div className="text-center mt-6 text-[#8B4513]">
          • • • • •
        </div>
      </div>
    </div>
  )
}

export default PaymentPage
