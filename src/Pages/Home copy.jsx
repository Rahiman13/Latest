import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const { scrollYProgress } = useScroll();
  
  const scaleText = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);
  const yText = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const services = [
    {
      icon: "💻",
      title: "Custom Software Development",
      description: "Tailored solutions to meet your specific business needs and challenges."
    },
    {
      icon: "🌐",
      title: "Web Development",
      description: "Modern, responsive websites and web applications built with cutting-edge technologies."
    },
    {
      icon: "📱",
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications for iOS and Android."
    },
    {
      icon: "🎯",
      title: "Digital Marketing",
      description: "Strategic digital presence and marketing solutions for your business growth."
    },
    {
      icon: "🎨",
      title: "UI/UX Design",
      description: "Creative and intuitive user interfaces that enhance user experience."
    },
    {
      icon: "👥",
      title: "Staffing Solutions",
      description: "Connect with skilled professionals to build your dream team."
    }
  ];

  const stats = [
    { number: "250+", label: "Projects Completed" },
    { number: "50+", label: "Happy Clients" },
    { number: "15+", label: "Team Members" },
    { number: "5+", label: "Years Experience" }
  ];

  const features = [
    {
      title: "Innovative Solutions",
      description: "Cutting-edge technology meets creative problem-solving",
      icon: "🚀"
    },
    {
      title: "Expert Team",
      description: "Skilled professionals dedicated to your success",
      icon: "👥"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock assistance for your peace of mind",
      icon: "🛟"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#19234d] to-[#2b5a9e] overflow-hidden">
      {/* Hero Section */}
      <motion.section className="min-h-screen relative flex items-center justify-center px-4">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1 
            className="text-7xl md:text-8xl lg:text-9xl font-bold mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300 leading-tight">
              We Build
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-[#d9764a] leading-tight">
              Digital Excellence
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Transform your business with cutting-edge software solutions that drive growth, 
            innovation, and success in the digital age.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-wrap gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button 
              className="bg-gradient-to-r from-[#d9764a] to-[#de7527] text-white px-10 py-4 rounded-full text-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
            <motion.button 
              className="bg-white/10 backdrop-blur-lg text-white px-10 py-4 rounded-full text-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-5xl md:text-6xl font-bold text-white mb-2">{stat.number}</h3>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-center text-white mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why Choose Us
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-center text-white mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Process
          </motion.h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {['Discovery', 'Planning', 'Development', 'Launch'].map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 relative z-10">
                  <div className="text-7xl font-bold text-white/10 absolute -top-6 left-4">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{step}</h3>
                  <p className="text-gray-300">
                    {/* Add specific description for each step */}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-full h-0.5 bg-gradient-to-r from-white/20 to-transparent transform translate-x-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-center text-white mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            What Our Clients Say
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
                <p className="text-gray-300 mb-6">
                  "The team delivered exceptional results that exceeded our expectations. 
                  Their professionalism and expertise are unmatched."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full mr-4" />
                  <div>
                    <h4 className="text-white font-bold">John Doe</h4>
                    <p className="text-gray-400">CEO, Tech Corp</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 py-20 px-4 md:px-6">
        <motion.h2 
          className="text-7xl md:text-9xl font-bold text-white/10 mb-16 text-center overflow-hidden whitespace-nowrap"
          initial={{ x: "-100%" }}
          whileInView={{ x: "0%" }}
          transition={{ duration: 0.8 }}
        >
          Our Services
        </motion.h2>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative bg-white/5 backdrop-blur-lg p-8 rounded-2xl overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-white/10 transition-all duration-500"></div>
              
              <div className="relative z-10">
                <motion.div 
                  className="text-6xl mb-6"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <motion.section 
        className="relative py-32 px-4 md:px-6 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#2b5a9e] to-[#19234d] transform -skew-y-6"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            className="text-6xl font-bold text-white mb-8"
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
          >
            Stay Updated
          </motion.h2>
          <motion.p 
            className="text-2xl text-gray-300 mb-10"
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
          >
            Subscribe to our newsletter for the latest updates and insights.
          </motion.p>
          <motion.form 
            className="flex flex-col md:flex-row gap-4 justify-center"
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-4 rounded-full text-lg bg-white/10 backdrop-blur-lg text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d9764a] flex-1 max-w-md"
            />
            <motion.button 
              className="bg-gradient-to-r from-[#d9764a] to-[#de7527] px-10 py-4 rounded-full font-semibold text-white text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </motion.form>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
