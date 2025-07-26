import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import { Routes, Route } from "react-router-dom";
import AboutUs from './pages/About/About'
import Signup from './pages/Signup/Signup'

function App() {

  return (
    <>
      <Navbar/>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      <Footer />
    </>
  )
}

export default App
