import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Blogs from './pages/Blogs/Blogs'
import { Routes, Route } from "react-router-dom";
import AboutUs from './pages/About/About'
import Signup from './pages/Signup/Signup'
import CreateBlog from './pages/CreateBlog/CreateBlog'
import Blogdetails from './pages/BlogDetails/BlogDetails'
import EditBlog from './pages/CreateBlog/EditBlog'
import CursorFollower from './components/CursorFollower/CursorFollower'
import ScrollToTop from './components/CursorFollower/ScrollToTop'

function App() {

  return (
    <>
      <ScrollToTop />
      <CursorFollower />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/blogs/:id" element={<Blogdetails />} />
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
