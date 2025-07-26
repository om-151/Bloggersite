import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import { Routes, Route } from "react-router-dom";
import AboutUs from './pages/About/About'

function App() {

  return (
    <>
      <Navbar/>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      <Footer />
    </>
  )
}

export default App
