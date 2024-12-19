import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Services from './Pages/Services';
import Blog from './Pages/Blog';
import Contact from './Pages/Contact';
import ScrollToTop from './components/ScrolltoTop';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
