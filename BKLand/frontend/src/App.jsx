import './App.css'
import {Routes, Route} from 'react-router-dom'
import React from 'react'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login'
import ListUser from './pages/admin/ListUser';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/user/list' element={<ListUser/>}/>
    </Routes>
  )
}

export default App
