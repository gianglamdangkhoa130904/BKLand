import React, { useState } from 'react';
import Spinner from '../components/Spiner';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { FiLock, FiLogIn, FiMail, FiPhone, FiUser, FiUserPlus } from 'react-icons/fi';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
  
    const handleRegister = async () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?(\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
      if(name.length > 50){
        enqueueSnackbar('Họ và tên có độ dài bé hơn 50 ký tự', { variant: 'warning' });
      }
      else if(email.length > 50){
        enqueueSnackbar('Email có độ dài bé hơn 50 ký tự', { variant: 'warning' });
      }
      else if(!emailRegex.test(email)){
        enqueueSnackbar('Email sai định dạng', { variant: 'warning' });
      }
      else if(phone.length != 10 || !phoneRegex.test(phone)){
        enqueueSnackbar('Số điện thoại có độ dài 10 ký tự số', { variant: 'warning' });
    }
      else if(username.length > 30){
        enqueueSnackbar('Tên đăng nhập có độ dài bé hơn 30 ký tự', { variant: 'warning' });
      }
      else if(password.length > 30){
        enqueueSnackbar('Mật khẩu có độ dài bé hơn 30 ký tự', { variant: 'warning' });
      }
      else if(repassword.length > 30){
        enqueueSnackbar('Nhập lại mật khẩu có độ dài bé hơn 30 ký tự', { variant: 'warning' });
      }
      else if(!(password === repassword)){
        enqueueSnackbar('Mật khẩu nhập lại không trùng khớp', { variant: 'warning' });
      }
      else{
        const responseUsername = await axios.get(`https://bkland.onrender.com/users/username/${username}`);
        console.log(responseUsername);
        if(responseUsername.data == null){
          const data = {
            username,
            password,
            name,
            email,
            phone
          };
          setLoading(true);
          axios
            .post('https://bkland.onrender.com/users', data)
            .then(() => {
              setLoading(false);
              enqueueSnackbar('Sign up successfully', { variant: 'success' });
              navigate('/login');
            })
            .catch((error) => {
              setLoading(false);
              // alert('An error happened. Please Chack console');
              enqueueSnackbar('Error', { variant: 'warning' });
              console.log(error);
            });
        }
        else{
          enqueueSnackbar('Tên đăng nhập đã tồn tại', { variant: 'warning' });
        }
      }
    };
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5E6D3] bg-[url('/path/to/vintage-pattern.png')] py-12">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-repeat opacity-10"
           style={{ backgroundImage: "url('/path/to/vintage-pattern.png')" }}></div>

      <div className="w-full max-w-2xl px-8 relative">
        {loading && <Spinner />}

        {/* Main Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.1)]
                      border-2 border-[#8B7355] p-8 transform hover:scale-[1.01] transition-transform">
          
          {/* Vintage Header */}
          <div className="text-center mb-8">
            <h1 className="font-serif text-4xl text-[#5C4033] mb-2 
                         border-b-2 border-[#8B7355] pb-4">
              Join Our Community
            </h1>
            <p className="text-[#8B7355] font-light italic">
              Begin your journey with us
            </p>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input */}
            <div className="relative">
              <label className="block font-serif text-[#5C4033] mb-2">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B7355]" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-[#8B7355] rounded-lg
                           bg-[#FFF8DC]/50 focus:outline-none focus:border-[#5C4033]
                           transition-all font-serif text-[#5C4033]"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="relative">
              <label className="block font-serif text-[#5C4033] mb-2">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B7355]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-[#8B7355] rounded-lg
                           bg-[#FFF8DC]/50 focus:outline-none focus:border-[#5C4033]
                           transition-all font-serif text-[#5C4033]"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Phone Input */}
            <div className="relative">
              <label className="block font-serif text-[#5C4033] mb-2">Phone</label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B7355]" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-[#8B7355] rounded-lg
                           bg-[#FFF8DC]/50 focus:outline-none focus:border-[#5C4033]
                           transition-all font-serif text-[#5C4033]"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Username Input */}
            <div className="relative">
              <label className="block font-serif text-[#5C4033] mb-2">Username</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B7355]" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-[#8B7355] rounded-lg
                           bg-[#FFF8DC]/50 focus:outline-none focus:border-[#5C4033]
                           transition-all font-serif text-[#5C4033]"
                  placeholder="Choose a username"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <label className="block font-serif text-[#5C4033] mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B7355]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-[#8B7355] rounded-lg
                           bg-[#FFF8DC]/50 focus:outline-none focus:border-[#5C4033]
                           transition-all font-serif text-[#5C4033]"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <label className="block font-serif text-[#5C4033] mb-2">Confirm Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B7355]" />
                <input
                  type="password"
                  value={repassword}
                  onChange={(e) => setRepassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-[#8B7355] rounded-lg
                           bg-[#FFF8DC]/50 focus:outline-none focus:border-[#5C4033]
                           transition-all font-serif text-[#5C4033]"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="w-full bg-[#8B7355] text-white py-3 rounded-lg mt-8 mb-4
                     transform hover:bg-[#5C4033] transition-all duration-300
                     flex items-center justify-center gap-2 font-serif"
          >
            <FiUserPlus className="text-xl" />
            <span>Create Account</span>
          </button>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-[#8B7355] mb-4 font-serif">
              Already have an account?
            </p>
            <Link 
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-2
                       bg-[#F5E6D3] text-[#5C4033] rounded-lg
                       hover:bg-[#8B7355] hover:text-white
                       transition-all duration-300 font-serif"
            >
              <FiLogIn className="text-xl" />
              <span>Sign In</span>
            </Link>
          </div>

          {/* Vintage Decorative Corners */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-[#8B7355]"></div>
          <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-[#8B7355]"></div>
          <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-[#8B7355]"></div>
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-[#8B7355]"></div>
        </div>
      </div>
    </div>
    );
  }
  
  export default Register