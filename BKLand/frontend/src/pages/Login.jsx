import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spiner';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie'
import { FiLock, FiLogIn, FiUser, FiUserPlus } from 'react-icons/fi';
const Login = () => {
  const location = useLocation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const handleLogin = () => {
        axios
        .get(`https://bkland.onrender.com/users/username/${username}`)
        .then((response) => {
            setLoading(false);
            if(password === ''){
              enqueueSnackbar('Chưa nhập đầy đủ thông tin', { variant: 'error' });
            }
            else{
              if(password === response.data.password){
                enqueueSnackbar('Đăng nhập thành công', { variant: 'success' });
                Cookie.set('nameID', response.data._id);
                Cookie.set('name', response.data.name);
                if(location.state != null){
                  navigate('/customer/details', {state: location.state});
                }
                else{
                  navigate('/home'); 
                }
              }
              else{
                enqueueSnackbar('Sai mật khẩu', { variant: 'error' });
              }
            }
        })
        .catch((error) => {
          axios.get(`https://bkland.onrender.com/admins/username/${username}`)
          .then((response) => {
            console.log(response.data);
            if(password === response.data.password){
              enqueueSnackbar('Đăng nhập thành công', { variant: 'success' });
              Cookie.set('adminID', response.data._id);
              Cookie.set('adminRole', response.data.role);
              Cookie.set('adminUsername', response.data.username);
              navigate('/admin/dashboard'); 
            }
            else{
              enqueueSnackbar('Sai mật khẩu', { variant: 'error' });
            }
          })
          .catch((error) => {
            enqueueSnackbar('Người dùng không tồn tại', { variant: 'error' });
          })
        });
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5E6D3] bg-[url('/path/to/vintage-pattern.png')] relative">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-repeat opacity-10" 
           style={{ backgroundImage: "url('/path/to/vintage-pattern.png')" }}></div>
      
      <div className="w-full max-w-md px-8 py-10 relative">
        {loading && <Spinner />}
        
        {/* Main Login Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.1)] 
                        border-2 border-[#8B7355] p-8 transform hover:scale-[1.02] transition-transform">
          
          {/* Vintage Header */}
          <div className="text-center mb-8">
            <h1 className="font-serif text-4xl text-[#5C4033] mb-2 
                         border-b-2 border-[#8B7355] pb-4">
              Welcome Back
            </h1>
            <p className="text-[#8B7355] font-light italic">
              Please sign in to continue
            </p>
          </div>

          {/* Username Input */}
          <div className="mb-6 relative">
            <label className="block font-serif text-[#5C4033] mb-2">
              Username
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B7355]" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-[#8B7355] rounded-lg
                         bg-[#FFF8DC]/50 focus:outline-none focus:border-[#5C4033]
                         transition-all font-serif text-[#5C4033]"
                placeholder="Enter your username"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-8 relative">
            <label className="block font-serif text-[#5C4033] mb-2">
              Password
            </label>
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

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-[#8B7355] text-white py-3 rounded-lg mb-4
                     transform hover:bg-[#5C4033] transition-all duration-300
                     flex items-center justify-center gap-2 font-serif"
          >
            <FiLogIn className="text-xl" />
            <span>Sign In</span>
          </button>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-[#8B7355] mb-4 font-serif">
              Don't have an account?
            </p>
            <Link 
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-2
                       bg-[#F5E6D3] text-[#5C4033] rounded-lg
                       hover:bg-[#8B7355] hover:text-white
                       transition-all duration-300 font-serif"
            >
              <FiUserPlus className="text-xl" />
              <span>Register Now</span>
            </Link>
          </div>

          {/* Vintage Decorative Elements */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-[#8B7355]"></div>
          <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-[#8B7355]"></div>
          <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-[#8B7355]"></div>
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-[#8B7355]"></div>
        </div>
      </div>
    </div>
  )
}

export default Login