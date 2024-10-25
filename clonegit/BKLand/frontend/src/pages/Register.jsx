import React, { useState } from 'react';
import Spinner from '../components/Spiner';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
  
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
  
    const handleRegister = () => {
      if(name.length > 50){
        enqueueSnackbar('Họ và tên có độ dài bé hơn 50 ký tự', { variant: 'error' });
      }
      else if(email.length > 50){
        enqueueSnackbar('Email có độ dài bé hơn 50 ký tự', { variant: 'error' });
      }
      if(username.length > 30){
        enqueueSnackbar('Tên đăng nhập có độ dài bé hơn 30 ký tự', { variant: 'error' });
      }
      else if(password.length > 30){
        enqueueSnackbar('Mật khẩu có độ dài bé hơn 30 ký tự', { variant: 'error' });
      }
      else if(repassword.length > 30){
        enqueueSnackbar('Nhập lại mật khẩu có độ dài bé hơn 30 ký tự', { variant: 'error' });
      }
      else if(!(password === repassword)){
        enqueueSnackbar('Mật khẩu nhập lại không trùng khớp', { variant: 'error' });
      }
      else{
        const responseUsername = axios.get(`http://localhost:1325/users/username/${username}`);
        if(responseUsername != null){
          enqueueSnackbar('Tên đăng nhập đã tồn tại', { variant: 'error' });
        }
        else{
          const data = {
            username,
            password,
            name,
            email
          };
          setLoading(true);
          axios
            .post('http://localhost:1325/users', data)
            .then(() => {
              setLoading(false);
              enqueueSnackbar('Sign up successfully', { variant: 'success' });
              navigate('/login');
            })
            .catch((error) => {
              setLoading(false);
              // alert('An error happened. Please Chack console');
              enqueueSnackbar('Error', { variant: 'error' });
              console.log(error);
            });
        }
      }
    };
    return (
      <div className='p-4'>
        <h1 className='text-3xl my-4 text-center'>Sign Up</h1>
        {loading ? <Spinner /> : ''}
        <div className='flex flex-col border-2 shadow-lg shadow-sky-500/40 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Name</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='border-2 shadow-lg shadow-gray-500/40 px-4 py-2  w-full '
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Email</label>
            <input
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border-2 shadow-lg shadow-gray-500/40 px-4 py-2  w-full '
            />
          </div>
            <label className='text-xl mr-4 text-gray-500'>Username</label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='border-2 shadow-lg shadow-gray-500/40 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border-2 shadow-lg shadow-gray-500/40 px-4 py-2  w-full '
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Confirm password</label>
            <input
              type='password'
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
              className='border-2 shadow-lg shadow-gray-500/40 px-4 py-2  w-full '
            />
          </div>
          
          <button className='p-2 bg-sky-300 m-8 rounded-lg text-white font-semibold' onClick={handleRegister}>
            Đăng ký
          </button>
          <Link to={`/login`} className='flex justify-center'>
              <button className='rounded-md bg-sky-400 p-2 m-2 text-white font-semibold'>Login</button>
          </Link>
        </div>
      </div>
    );
  }
  
  export default Register