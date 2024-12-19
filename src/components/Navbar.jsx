import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/Navbar_logo.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-4 bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.06)]' 
          : 'py-6 bg-gradient-to-r from-primary-navy/85 via-primary-blue/85 to-primary-navy/85 backdrop-blur-lg'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Enhanced Logo Section */}
          <Link 
            to="/" 
            className="relative z-10 flex items-center space-x-3 group"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center"
            >
              {/* Modernized Logo Container */}
              <div className={`relative w-14 h-14 rounded-2xl overflow-hidden ${
                scrolled 
                  ? 'bg-gradient-to-br from-primary-navy via-primary-blue to-accent-orange shadow-lg' 
                  : 'bg-white/15 backdrop-blur-xl'
              }`}>
                <div className="absolute inset-0.5 rounded-xl overflow-hidden bg-white/95">
                  <img 
                    src={Logo} 
                    alt="Logo" 
                    className={`w-full h-full object-contain p-2.5 transition-all duration-300 ${
                      scrolled ? 'filter-none' : 'brightness-110'
                    }`}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary-blue/10 to-accent-orange/20 mix-blend-overlay" />
              </div>
              {/* Enhanced Company Name with Split-Color X and Gradient Letters */}
              <div className="ml-3 relative">
                <div className="text-2xl font-bold tracking-tight transition-all duration-300 font-arial">
                  <span className={`${
                    scrolled
                      ? 'bg-gradient-to-t from-[#19234d] to-[#2b5a9e]'
                      : 'bg-gradient-to-t from-white to-white/90'
                  } bg-clip-text text-transparent`}>
                    PROJE
                  </span>
                  <span className="relative inline-block">
                    {/* Base x to maintain spacing - transparent */}
                    <span className="opacity-0">X</span>
                    {/* Top half of x */}
                    <span className="absolute inset-0 overflow-hidden bg-[#de7527] bg-clip-text text-transparent">
                      X
                    </span>
                    <span className="absolute inset-0 overflow-hidden w-1/2 bg-clip-text text-transparent" style={{
                      backgroundColor: scrolled ? '#19234d' : 'white'
                    }}>
                      X
                    </span>
                  </span>
                  {/* Split-colored i */}
                  <span className="relative">
                    <span className={`text-[77%] font-700 ${
                      scrolled ? 'text-[#19234d]' : 'text-white'
                    }`}>I</span>
                    <span className="absolute top-1 right-0 w-[3px] h-[0.20em] bg-[#de7527]" />
                    <span className={`absolute top-1.5 right-0 w-[4px] h-[1.5px] ${
                      scrolled ? 'bg-white' : 'bg-[#19234d]'
                    } `} style={{ transform: 'rotate(45deg)', transformOrigin: 'left bottom' }} />
                  </span>
                  <span className={`${
                    scrolled
                      ? 'bg-gradient-to-t from-[#19234d] to-[#2b5a9e]'
                      : 'bg-gradient-to-t from-white to-white/90'
                  } bg-clip-text text-transparent`}>
                    NO
                  </span>
                </div>
                <motion.div 
                  className={`h-1 w-0 group-hover:w-full transition-all duration-300 rounded-full ${
                    scrolled 
                      ? 'bg-gradient-to-r from-[#19234d] to-[#de7527] opacity-20' 
                      : 'bg-white/30'
                  }`}
                />
              </div>
            </motion.div>
          </Link>

          {/* Modified Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center space-x-3 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="relative px-4 py-2.5 group overflow-hidden rounded-xl"
              >
                <span className={`relative z-10 font-medium transition-all duration-300 ${
                  scrolled 
                    ? 'text-neutral-dark group-hover:text-primary-blue' 
                    : 'text-white/90 group-hover:text-white'
                }`}>
                  {item.name}
                </span>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeNav"
                    className={`absolute inset-0 ${
                      scrolled 
                        ? 'bg-gradient-to-r from-primary-blue/10 to-accent-orange/10' 
                        : 'bg-white/15 backdrop-blur-sm'
                    }`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <motion.div 
                  className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300 ${
                    scrolled 
                      ? 'bg-gradient-to-r from-primary-blue to-accent-orange' 
                      : 'bg-white'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* New Phone Number Section */}
          <div className="hidden md:flex items-center">
            <a 
              href="tel:+91 9601843090" 
              className={`flex items-center space-x-2 ${
                scrolled ? 'text-neutral-dark' : 'text-white'
              }`}
            >
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </motion.svg>
              <motion.span className="font-medium"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                +91 9601843090
              </motion.span>
            </a>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden relative z-10 p-2.5 rounded-xl overflow-hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${
                scrolled ? 'bg-gradient-to-r from-primary-navy to-primary-blue' : 'bg-white'
              } ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`} />
              <span className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${
                scrolled ? 'bg-gradient-to-r from-primary-blue to-accent-orange' : 'bg-white'
              } ${isOpen ? '-rotate-45' : 'translate-y-1'}`} />
            </div>
          </motion.button>
        </div>

        {/* Modified Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="py-4 space-y-2"
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className={`block px-4 py-2 rounded-lg transition-colors ${
                        location.pathname === item.path
                          ? 'bg-primary-blue/10 text-primary-blue'
                          : scrolled
                            ? 'text-neutral-dark hover:bg-neutral-light'
                            : 'text-white hover:bg-white/10'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="px-4 pt-2"
                >
                  <a 
                    href="tel:+1234567890"
                    className={`w-full px-6 py-2 rounded-full font-medium transition-all flex items-center justify-center space-x-2 ${
                      scrolled
                        ? 'bg-accent-orange text-white hover:bg-accent-orange-bright'
                        : 'bg-white text-primary-navy hover:bg-white/90'
                    }`}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                      />
                    </svg>
                    <span>+1 234 567 890</span>
                  </a>
                </motion.div>
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
