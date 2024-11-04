import './App.css'
import {Routes, Route} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Register from './pages/Register';
import Login from './pages/Login'
import Customers from './pages/admin/Customers';
import Tickets from './pages/admin/Tickets';
import Profile from './pages/admin/Profile';
import Information from './pages/admin/Information';
import Province from './pages/admin/Province';
import Employees from './pages/admin/Employees';
import Projects from './pages/admin/Projects';
import ProjectTypes from './pages/admin/ProjectTypes';
import Dashboard from './pages/admin/Dashboard';
import HomePage from './pages/customer/HomePage';
import ProfileCus from './pages/customer/ProfileCus';
import TransactionPage from './pages/customer/TransactionPage';
import ApartmentDetails from './pages/customer/ApartmentDetails';
import CustomerDetails from './pages/customer/CustomerDetails';
import PaymentPage from './pages/customer/PaymentPage';
import ReturnPayment from './pages/customer/ReturnPayment';
import FailedPayment from './pages/customer/FailedPayment';
import Subdivision from './pages/admin/Subdivision';
import Building from './pages/admin/Building';
import Apartment from './pages/admin/Apartment';
import ApartmentList from './pages/admin/ApartmentList';
import BuildingList from './pages/admin/BuildingList';
import SubdivisionList from './pages/admin/SubdivisionList';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/profileCus' element={<ProfileCus/>}/>
      <Route path='/transaction' element={<TransactionPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/apartment/details' element={<ApartmentDetails/>}/>
      <Route path='/customer/details' element={<CustomerDetails/>}/>
      <Route path='/payment' element={<PaymentPage/>}/>
      <Route path='/payment/return' element={<ReturnPayment/>}/>
      <Route path='/payment/failed' element={<FailedPayment/>}/>

      <Route path="/admin/tickets" element={<Tickets />} />
      <Route path="/admin/profile" element={<Profile />} />
      <Route path="/admin/information" element={<Information />} />
      <Route path="/admin/province" element={<Province />} />
      <Route path="/admin/customers" element={<Customers />} />
      <Route path="/admin/employees" element={<Employees />} />
      <Route path="/admin/projects" element={<Projects />} />
      <Route path="/admin/projecttypes" element={<ProjectTypes />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/subdivision" element={<Subdivision />} />
      <Route path="/admin/building" element={<Building />} />
      <Route path="/admin/apartment" element={<Apartment />} />
      <Route path="/admin/apartmentlist" element={<ApartmentList/>} /> {/* CRUD Căn hộ */}
      <Route path="/admin/buildinglist" element={<BuildingList />} />   {/* CRUD Toà nhà*/}
      <Route path="/admin/subdivisionlist" element={<SubdivisionList />} />  {/* CRUD Phân khu */}
    </Routes>
  )
}

export default App
