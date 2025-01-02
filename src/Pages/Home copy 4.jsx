import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import NewsletterForm from '../components/NewsLetter';
import { toast, Toaster } from 'react-hot-toast';
import CountUp from 'react-countup';
import './Home.css';


const Home = () => {
  const { scrollYProgress } = useScroll({
    throttle: 0,
    smooth: 0.1
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 15,
    mass: 0.1,
    restDelta: 0.001
  });

  const scale = useTransform(smoothProgress, [0, 0.15], [1, 1.5]);
  const yMove = useTransform(smoothProgress, [0, 0.15], [0, 500]);
  const opacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const blurValue = useTransform(smoothProgress, [0, 0.15], [0, 10]);
  
  const parallax1 = useTransform(smoothProgress, [0, 1], [0, -200]);
  const parallax2 = useTransform(smoothProgress, [0, 1], [0, -100]);
  const parallax3 = useTransform(smoothProgress, [0, 1], [0, -50]);

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
    { number: 250, label: "Projects Completed", suffix: "+" },
    { number: 50, label: "Happy Clients", suffix: "+" },
    { number: 15, label: "Team Members", suffix: "+" },
    { number: 5, label: "Years Experience", suffix: "+" }
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

  const processSteps = [
    {
      title: "Discovery",
      description: "We dive deep into understanding your business needs, goals, and challenges through comprehensive consultation.",
      icon: "🔍",
      image: "https://media.istockphoto.com/id/1465316262/photo/businessman-inspecting-paperwork-document-of-business-data-analysis-working-management-report.webp?a=1&b=1&s=612x612&w=0&k=20&c=82eFZNGe9kKbLXaITf8YEL6jV-g113gP2rOKtV2kTJY="
    },
    {
      title: "Planning",
      description: "Our team creates detailed roadmaps and strategies tailored to your specific requirements.",
      icon: "📋",
      image: "https://images.unsplash.com/photo-1580795478844-5ed694336c90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBsYW5uaW5nfGVufDB8fDB8fHww"
    },
    {
      title: "Development",
      description: "We bring your vision to life using cutting-edge technologies and best development practices.",
      icon: "⚙️",
      image: "https://media.istockphoto.com/id/2156387160/photo/hispanic-latin-american-couple-software-engineer-developer-use-computer-work-on-program.webp?a=1&b=1&s=612x612&w=0&k=20&c=MwCwZmlsa6rhG5ppvCCN-OR67mdcx2WkD5SUouSzSrE="
    },
    {
      title: "Launch",
      description: "Your solution goes live with our full support and continuous optimization.",
      icon: "🚀",
      image: "https://plus.unsplash.com/premium_photo-1683288537140-e5dd2c5f0911?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxhdW5jaHxlbnwwfHwwfHx8MA%3D%3D"
    }
  ];

  const testimonials = [
    {
      text: "Projexino Solutions transformed our business with their innovative web solutions. Their team's expertise and dedication are truly exceptional.",
      author: "Sarah Johnson",
      position: "CTO, TechVision Inc",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmZlc2lvbmFsJTIwcGVvcGxlfGVufDB8fDB8fHww"
    },
    {
      text: "The mobile app they developed for us exceeded our expectations. Professional, responsive, and highly skilled team.",
      author: "Michael Chen",
      position: "Founder, StartUp Hub",
      image: "https://images.unsplash.com/photo-1558222218-b7b54eede3f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmZlc2lvbmFsJTIwcGVvcGxlfGVufDB8fDB8fHww"
    },
    {
      text: "Outstanding digital marketing results! They helped us achieve a 200% increase in online presence.",
      author: "Emma Williams",
      position: "Marketing Director, Growth Co",
      image: "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZmZXNpb25hbCUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
    }
  ];

  // Enhanced bubble configuration
  const bubbles = Array.from({ length: 50 }, (_, i) => ({
    size: Math.random() * 15 + 5,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    moveRange: Math.random() * 30 + 20,
  }));

  const [currentService, setCurrentService] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#19234d] to-[#2b5a9e] overflow-hidden">
      {/* Add Toaster component */}
      <Toaster />

      {/* Progress Bar - smoother animation */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d9764a] to-[#de7527] origin-left z-50"
        style={{ scaleX: smoothProgress }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />

      {/* Floating Bubbles Container - spans entire page */}
      <div className="fixed inset-0 pointer-events-none">
        {bubbles.map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.initialX}%`,
              top: `${bubble.initialY}%`,
              background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))`,
              backdropFilter: "blur(2px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            animate={{
              y: [-bubble.moveRange, bubble.moveRange],
              x: [-bubble.moveRange/2, bubble.moveRange/2],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              delay: bubble.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Gradient Mesh Background */}
      {/* <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-orange-500/20 animate-gradient" />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-pink-500/20 animate-gradient" />
        </div>
      </div> */}

      {/* Hero Section - adjusted timing */}
      <motion.section 
        className="min-h-screen relative flex items-center justify-center px-4"
        style={{
          scale,
          y: yMove,
          opacity,
          filter: `blur(${blurValue}px)`
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        {/* Animated Background Lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{ top: `${20 * i}%` }}
              animate={{
                x: [-1000, 1000],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* Enhanced Hero Content */}
        <motion.div 
          className="max-w-7xl mx-auto text-center relative z-10"
          style={{ y: parallax2 }}
        >
          {/* Glowing Text Effect */}
          <motion.h1 
            className="text-7xl md:text-8xl lg:text-9xl font-bold mb-8 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300 leading-tight filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              We Build
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-[#d9764a] leading-tight filter drop-shadow-[0_0_10px_rgba(217,118,74,0.3)]">
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
        </motion.div>

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

      {/* Add new styles to your existing CSS */}
      <style jsx>{`
        @keyframes gradient {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.5); }
          100% { transform: rotate(360deg) scale(1); }
        }
        .animate-gradient {
          animation: gradient 15s linear infinite;
        }
      `}</style>

      {/* Update the perspective container for smoother 3D effects */}
      <motion.div 
        className="relative"
        style={{
          perspective: "2000px",
          transformStyle: "preserve-3d"
        }}
      >
        {/* Update each section with parallax and 3D effects */}
        <motion.div style={{ y: parallax3 }}>
          {/* Stats Section */}
          <section className="py-20 relative z-10">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="relative group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="text-center relative">
                      {/* Animated background glow */}
                      <motion.div 
                        className="absolute inset-0 bg-[#d9764a]/20 rounded-full blur-3xl"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      <motion.h3 
                        className="text-6xl md:text-7xl font-bold text-white mb-2 relative"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <CountUp
                          end={stat.number}
                          duration={2.5}
                          suffix={stat.suffix}
                          enableScrollSpy
                          scrollSpyOnce
                        />
                      </motion.h3>
                      <p className="text-gray-300 text-lg relative">{stat.label}</p>
                    </div>
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

          {/* About Section with Image */}
          <section className="py-20 relative z-10">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGlkZWElMjB0byUyMGRpZ2l0YWwlMjBzdWNjZXNzfGVufDB8fDB8fHww" 
                    alt="About Us" 
                    className="rounded-2xl shadow-xl"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-[#d9764a] to-[#de7527] p-6 rounded-xl text-white">
                    <h3 className="text-2xl font-bold">5+</h3>
                    <p>Years Experience</p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Transforming Ideas into Digital Success Stories
                  </h2>
                  <p className="text-gray-300 mb-8">
                    At Projexino Solutions, we combine creativity with technical expertise to deliver 
                    innovative digital solutions that drive business growth. Our team of experts is 
                    passionate about helping businesses thrive in the digital age.
                  </p>
                  <ul className="space-y-4">
                    {['Innovative Solutions', 'Expert Team', '24/7 Support'].map((item, index) => (
                      <li key={index} className="flex items-center text-white">
                        <span className="text-[#d9764a] mr-2">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Process Section with Images */}
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
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden">
                      <div className="relative h-48">
                        <img 
                          src={step.image} 
                          alt={step.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#19234d] to-transparent" />
                        <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-lg rounded-full w-12 h-12 flex items-center justify-center text-2xl">
                          {step.icon}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                        <p className="text-gray-300">{step.description}</p>
                      </div>
                    </div>
                    {index < 3 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 border-t-2 border-r-2 border-white/20 transform rotate-45" />
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
                Client Success Stories
              </motion.h2>
              
              <div className="grid lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className="relative group h-full"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    {/* Card container with hover effects */}
                    <motion.div 
                      className="h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-8 relative overflow-hidden"
                      whileHover={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      {/* Animated gradient border */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-[#d9764a]/0 via-[#d9764a]/30 to-[#d9764a]/0"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      
                      {/* Glowing orb */}
                      <motion.div
                        className="absolute -top-10 -right-10 w-32 h-32 bg-[#d9764a]/20 rounded-full blur-3xl"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />

                      {/* Quote icon with animation */}
                      <motion.div 
                        className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-[#d9764a] to-[#de7527] rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </motion.div>
                      
                      {/* Rating stars with staggered animation */}
                      <div className="flex mb-6">
                        {[...Array(5)].map((_, i) => (
                          <motion.svg
                            key={i}
                            className="w-5 h-5 text-yellow-500 mr-1"
                            initial={{ opacity: 0, scale: 0, rotate: -180 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ 
                              delay: 0.1 * i,
                              type: "spring",
                              stiffness: 200
                            }}
                            whileHover={{ scale: 1.2, rotate: 180 }}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </motion.svg>
                        ))}
                      </div>

                      {/* Testimonial content */}
                      <motion.p 
                        className="text-gray-300 mb-8 relative z-10 min-h-[100px]"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {testimonial.text}
                      </motion.p>
                      
                      {/* Author info with hover effects */}
                      <div className="flex items-center mt-auto">
                        <motion.div 
                          className="relative w-12 h-12 mr-4"
                          whileHover={{ scale: 1.1 }}
                        >
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.author}
                            className="w-full h-full rounded-full object-cover"
                          />
                          <motion.div 
                            className="absolute inset-0 rounded-full border-2 border-[#d9764a]"
                            initial={{ opacity: 0, scale: 1.2 }}
                            whileHover={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                          />
                        </motion.div>
                        <div>
                          <motion.h4 
                            className="text-white font-bold"
                            whileHover={{ x: 5 }}
                          >
                            {testimonial.author}
                          </motion.h4>
                          <motion.p 
                            className="text-gray-400"
                            whileHover={{ x: 5 }}
                          >
                            {testimonial.position}
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Portfolio Section */}
          <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4">
              <motion.h2 
                className="text-5xl md:text-6xl font-bold text-center text-white mb-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Featured Projects
              </motion.h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                  <motion.div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                  >
                    <img 
                      // src={`/images/project${index + 1}.jpg`}
                      src={`https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdlYiUyMHByb2plY3RzfGVufDB8fDB8fHww`}
                      alt={`Project ${index + 1}`}
                      className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-bold text-white mb-2">Project Title</h3>
                        <p className="text-gray-300">Brief project description goes here</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="h-screen sticky top-0 overflow-hidden backdrop-blur-lg bg-transparent relative z-10">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#19234d]/30 to-transparent pointer-events-none" />
            <div className="absolute inset-0">
              <div className="absolute w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(217,118,74,0.1),transparent_70%)]" />
            </div>

            {/* Arc Path for Icons */}
            <div className="absolute right-0 h-full w-1/2 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d="M 50,100 A 50,50 0 0,1 50,0"
                  fill="none"
                  stroke="rgba(217,118,74,0.1)"
                  strokeWidth="0.5"
                />
              </svg>
            </div>

            {/* Services Content */}
            <div className="relative h-screen">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0 flex items-center px-4 md:px-6"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: index === currentService ? 1 : 0,
                    transition: { duration: 0.5 }
                  }}
                >
                  <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between">
                    {/* Text Content */}
                    <motion.div 
                      className="w-full md:w-1/2 md:pr-8"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ 
                        opacity: index === currentService ? 1 : 0,
                        x: index === currentService ? 0 : -50
                      }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <h3 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        {service.title}
                      </h3>
                      <p className="text-xl text-gray-300 mb-8">
                        {service.description}
                      </p>
                      <motion.button
                        className="px-8 py-3 bg-gradient-to-r from-[#d9764a] to-[#de7527] rounded-full text-white font-semibold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Learn More
                      </motion.button>
                    </motion.div>

                    {/* Floating Icon */}
                    <motion.div 
                      className="w-full md:w-1/2 flex justify-center items-center"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ 
                        opacity: index === currentService ? 1 : 0,
                        scale: index === currentService ? 1 : 0.5
                      }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <motion.div
                        className="relative"
                        animate={{
                          y: [0, -20, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-[#d9764a]/20 rounded-full blur-3xl"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <div className="text-[200px] relative">
                          {service.icon}
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}

              {/* Navigation Dots */}
              <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
                {services.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentService 
                        ? 'bg-[#d9764a] scale-125' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    onClick={() => setCurrentService(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>

            {/* Scroll Progress Indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-white/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-sm">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↓
              </motion.div>
            </motion.div>
          </section>

          <section className="h-screen sticky top-0 overflow-hidden backdrop-blur-lg bg-gradient-to-b from-[#19234d] to-[#2b5a9e] relative">
  {/* Arc Path for Icon */}
  <svg className="absolute right-0 top-0 w-1/2 h-full pointer-events-none">
    <path
      id="arc-path"
      d="M 50,100 A 50,50 0 0,1 50,0"
      fill="none"
      stroke="rgba(217,118,74,0.1)"
      strokeWidth="1"
    />
  </svg>

  <div className="relative h-full flex flex-col justify-center">
    {services.map((service, index) => (
      <motion.div
        key={index}
        className="absolute inset-0 flex items-center px-6"
        initial={{ opacity: 0 }}
        animate={{
          opacity: currentService === index ? 1 : 0,
          y: currentService === index ? 0 : 50,
          scale: currentService === index ? 1 : 0.9,
        }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-between w-full">
          {/* Service Text */}
          <motion.div
            className="w-1/2"
            initial={{ x: -50, opacity: 0 }}
            animate={{
              x: currentService === index ? 0 : -50,
              opacity: currentService === index ? 1 : 0,
            }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-6xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              {service.title}
            </h3>
            <p className="text-lg text-gray-300 mt-4">{service.description}</p>
          </motion.div>

          {/* Service Icon */}
          <motion.div
            className="w-1/2 flex justify-center"
            style={{ translatePath: `path("arc-path")` }}
            animate={{
              opacity: currentService === index ? 1 : 0,
              translateY: currentService === index ? 0 : 100,
              scale: currentService === index ? 1 : 0.8,
            }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-[120px] text-[#d9764a] drop-shadow-xl">
              {service.icon}
            </div>
          </motion.div>
        </div>
      </motion.div>
    ))}

    {/* Navigation Dots */}
    <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-3">
      {services.map((_, idx) => (
        <button
          key={idx}
          className={`w-4 h-4 rounded-full transition-transform duration-300 ${
            idx === currentService ? 'bg-[#d9764a] scale-125' : 'bg-white/20 hover:bg-white/50'
          }`}
          onClick={() => setCurrentService(idx)}
        />
      ))}
    </div>
  </div>

  {/* Scroll Handler */}
  <div
    onWheel={(e) => {
      const isScrollUp = e.deltaY < 0;
      setCurrentService((prev) =>
        isScrollUp
          ? (prev - 1 + services.length) % services.length
          : (prev + 1) % services.length
      );
    }}
    className="absolute inset-0 z-50"
  />
</section>


          {/* Newsletter Section - Optimized animations */}
          <motion.section 
            className="relative py-32 px-4 md:px-6 overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ 
              opacity: 1,
              transition: {
                duration: 0.4,
                ease: "easeOut"
              }
            }}
            viewport={{ 
              once: true, 
              margin: "-50px",
              amount: 0.3
            }}
          >
            {/* Background gradient overlay - Simplified */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#19234d]/50 to-[#2b5a9e]/50 backdrop-blur-sm" />

            {/* Animated circles - Optimized */}
            <div className="absolute inset-0">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full mix-blend-overlay"
                  style={{
                    width: `${200 + i * 80}px`,
                    height: `${200 + i * 80}px`,
                    border: '1px solid rgba(255,255,255,0.1)',
                    left: `${20 + i * 10}%`,
                    top: `${20 + i * 5}%`,
                    willChange: 'transform'
                  }}
                  animate={{
                    rotate: 360,
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 15 + i * 5,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop"
                  }}
                />
              ))}
            </div>

            {/* Content container */}
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left column - Text content */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="text-center lg:text-left"
                >
                  <motion.h2 
                    className="text-5xl md:text-6xl font-bold mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                      Stay Ahead of
                    </span>
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#d9764a] to-[#de7527]">
                      the Future
                    </span>
                  </motion.h2>
                  
                  <motion.p 
                    className="text-xl text-gray-300 mb-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                  >
                    Join our newsletter and get exclusive insights, industry updates, 
                    and special offers delivered straight to your inbox.
                  </motion.p>
                  
                  {/* Stats with optimized animations */}
                  <motion.div 
                    className="grid grid-cols-2 gap-6 mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center lg:text-left">
                      <div className="text-3xl font-bold text-white mb-2">5000+</div>
                      <div className="text-gray-400">Subscribers</div>
                    </div>
                    <div className="text-center lg:text-left">
                      <div className="text-3xl font-bold text-white mb-2">Weekly</div>
                      <div className="text-gray-400">Updates</div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Right column - Newsletter form */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  {/* Simplified decorative elements */}
                  <div className="absolute -top-12 -right-12 w-20 h-20 bg-gradient-to-r from-[#d9764a] to-[#de7527] rounded-full blur-xl opacity-20" />
                  <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-gradient-to-r from-[#19234d] to-[#2b5a9e] rounded-full blur-xl opacity-20" />
                  
                  {/* Newsletter component */}
                  <NewsletterForm />
                </motion.div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
