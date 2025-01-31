import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import Layout from './components/Layout';
import CustomCursor from './components/CustomCursor';
import PageLoader from './components/PageLoader';
import CreativeBackground from './components/CreativeBackground';
import ScrollOptimizedBackground from './components/ScrollOptimizedBackground';

// Lazy load all pages
const Home = lazy(() => import('./Pages/Home'));
const About = lazy(() => import('./Pages/About'));
const Services = lazy(() => import('./Pages/Services'));
const Blog = lazy(() => import('./Pages/Blog'));
const Contact = lazy(() => import('./Pages/Contact'));
const Staff = lazy(() => import('./Pages/Services/Staff'));
const WebDesign = lazy(() => import('./Pages/Services/WebDesign'));
const WebDev = lazy(() => import('./Pages/Services/WebDev'));
const AppDev = lazy(() => import('./Pages/Services/AppDev'));
const SocialMedia = lazy(() => import('./Pages/Services/SocialMedia'));
const Portfolio = lazy(() => import('./Pages/Portfolio'));
const Careers = lazy(() => import('./Pages/Careers'));
const Industries = lazy(() => import('./Pages/Industries'));

const App = () => {
  return (
    <>
      <CustomCursor />
      <CreativeBackground />
      <ScrollOptimizedBackground />
      <BrowserRouter>
        {/* <ScrollToTop /> */}
        <Header />
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
