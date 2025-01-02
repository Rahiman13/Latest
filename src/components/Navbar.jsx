import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/projexino.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    {
      name: 'Services',
      path: '/services',
      dropdownItems: [
        { name: 'Web Design', path: '/services/web-design' },
        { name: 'Web Development', path: '/services/web-development' },
        { name: 'App Development', path: '/services/app-development' },
        { name: 'Digital Marketing', path: '/services/digital-marketing' },
        { name: 'Staffing Services', path: '/services/staffing-solutions' },
      ],
    },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
    { name: 'Industries', path: '/industries' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed w-full z-50 transition-all duration-300 py-5 bg-gradient-to-r from-[#19234d]/85 to-[#2b5a9e]/85 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-xl bg-black/10 backdrop-blur-md'
              }`}
            >
              <img src={Logo} alt="Logo" className="h-14 w-auto" />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.path} className="relative group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setActiveDropdown(item.name)}
                  onHoverEnd={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.path}
                    className={`relative px-3 py-2 w-full h-full rounded-lg font-medium transition-colors flex items-center text-white hover:text-white/80'
                    }`}
                  >
                    {item.name}
                    {item.dropdownItems && (
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </motion.svg>
                    )}
                    {(location.pathname === item.path ||
                      (item.dropdownItems &&
                        item.dropdownItems.some(
                          (dropItem) => location.pathname === dropItem.path
                        ))) && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className={`absolute inset-0 rounded-lg -z-10 bg-white/10 backdrop-blur-sm'
                        }`}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.dropdownItems && (
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 w-64 rounded-xl overflow-hidden shadow-lg"
                          style={{
                            backdropFilter: 'blur(10px)',
                          }}
                        >
                          <div className="py-2">
                            {item.dropdownItems.map((dropItem) => (
                              <motion.div
                                key={dropItem.path}
                                whileHover={{ x: 5 }}
                              >
                                <Link
                                  to={dropItem.path}
                                  className="block w-full relative px-4 py-3 text-sm hover:bg-[#2b5a9e]/5 text-white hover:text-white/80"
                                >
                                  <div className="relative z-10">{dropItem.name}</div>
                                  {location.pathname === dropItem.path && (
                                    <motion.div
                                      layoutId="dropdown-indicator"
                                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-[#2b5a9e] to-[#d9764a]"
                                    />
                                  )}
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </motion.div>
              </div>
            ))}
          </div>

          {/* Contact Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden lg:block"
          >
            <Link
              to="/contact"
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                scrolled
                  ? 'bg-gradient-to-r from-[#d9764a] to-[#de7527] text-white shadow-lg hover:shadow-xl hover:brightness-110'
                  : 'bg-white/10 text-white backdrop-blur-md hover:bg-white/20'
              }`}
            >
              Get in Touch
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
                className={`w-full h-0.5 rounded-full transform origin-left transition-all ${
                  scrolled ? 'bg-[#19234d]' : 'bg-white'
                }`}
              />
              <motion.span
                animate={{ opacity: isOpen ? 0 : 1 }}
                className={`w-full h-0.5 rounded-full transition-all ${
                  scrolled ? 'bg-[#19234d]' : 'bg-white'
                }`}
              />
              <motion.span
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
                className={`w-full h-0.5 rounded-full transform origin-left transition-all ${
                  scrolled ? 'bg-[#19234d]' : 'bg-white'
                }`}
              />
            </div>
          </motion.button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item, index) => (
                  <div key={item.path}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => !item.dropdownItems && setIsOpen(false)}
                        className={`block px-4 py-2 rounded-lg transition-colors ${
                          location.pathname === item.path
                            ? 'bg-[#2b5a9e]/10 text-[#2b5a9e]'
                            : scrolled
                            ? 'text-[#19234d] hover:bg-gray-100'
                            : 'text-white hover:bg-white/10'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                    {item.dropdownItems && (
                      <div className="pl-4 mt-2 space-y-1">
                        {item.dropdownItems.map((dropItem, dropIndex) => (
                          <motion.div
                            key={dropItem.path}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (index + dropIndex) * 0.1 }}
                          >
                            <Link
                              to={dropItem.path}
                              onClick={() => setIsOpen(false)}
                              className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === dropItem.path
                                  ? 'bg-[#2b5a9e]/10 text-[#2b5a9e]'
                                  : scrolled
                                  ? 'text-[#19234d] hover:bg-gray-100'
                                  : 'text-white/90 hover:bg-white/10'
                              }`}
                            >
                              {dropItem.name}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
