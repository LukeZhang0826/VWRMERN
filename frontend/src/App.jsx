import React from 'react'
import Navbar from './components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/footer/Footer';

const App = () => {
  return (
    <>
      <Navbar />
      <ToastContainer /> 
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App