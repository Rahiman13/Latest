import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Services from './Pages/Services';
import Blog from './Pages/Blog';
import Contact from './Pages/Contact';
import Staff from './Pages/Services/Staff';
import WebDesign from './Pages/Services/WebDesign';
import WebDev from './Pages/Services/WebDev';
import AppDev from './Pages/Services/AppDev';
import SocialMedia from './Pages/Services/SocialMedia';
import Portfolio from './Pages/Portfolio';
import Careers from './Pages/Careers';
import Industries from './Pages/Industries';

import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import Layout from './components/Layout';
import CustomCursor from './components/CustomCursor';


const App = () => {
  return (
    <>
      <CustomCursor />
      <BrowserRouter>
        {/* <ScrollToTop /> */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/staffing-solutions" element={<Staff />} />
          <Route path="/services/web-design" element={<WebDesign />} />
          <Route path="/services/web-development" element={<WebDev />} />
          <Route path="/services/app-development" element={<AppDev />} />
          <Route path="/services/digital-marketing" element={<SocialMedia />} />


          <Route path="/blog" element={<Blog />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
