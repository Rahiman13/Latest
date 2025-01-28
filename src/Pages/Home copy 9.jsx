import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import NewsletterForm from '../components/NewsLetter';
import { toast, Toaster } from 'react-hot-toast';
import CountUp from 'react-countup';
import PageLoader from '../components/PageLoader';
import { AnimatePresence } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 25,
    mass: 0.1,
    restDelta: 0.001
  });

  // Optimized transformations
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.1]);
  const heroY = useTransform(smoothProgress, [0, 0.2], [0, 100]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroBlur = useTransform(smoothProgress, [0, 0.15], [0, 4]);

  // Smoother parallax
  const parallax1 = useTransform(smoothProgress, [0, 1], [0, -200]);
  const parallax2 = useTransform(smoothProgress, [0, 1], [0, -150]);
  const parallax3 = useTransform(smoothProgress, [0, 1], [0, -75]);

  const services = [
    // {
    //   icon: "💻",
    //   title: "Custom Software Development",
    //   description: "Tailored solutions to meet your specific business needs and challenges."
    // },
    {
      icon: "🌐",
      title: "Web Development",
      description: "Modern, responsive websites and web applications built with cutting-edge technologies."
    },
    {
      icon: "📱",
      title: "App Development",
      description: "Native and cross-platform mobile applications for iOS and Android."
    },
    {
      icon: "🎯",
      title: "Digital Marketing",
      description: "Strategic digital presence and marketing solutions for your business growth."
    },
    {
      icon: "🎨",
      title: "Web Design",
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
    size: Math.random() * 20 + 10,
    delay: Math.random() * 5,
    duration: Math.random() * 4 + 3,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    moveRange: Math.random() * 40 + 30,
    color: `hsla(${Math.random() * 360}, 70%, 50%, 0.15)`,
  }));

  // Add scroll animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  // Update the services section
  const handleServiceClick = (service) => {
    // Navigate to specific service route
    navigate(`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`);
  };

  // Add this new array of projects with size configurations
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Modern shopping experience with seamless transactions and user-friendly interface",
      path: "/projects/e-commerce",
      size: "large", // takes 2x2 grid space
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: 2,
      title: "Healthcare App",
      description: "Patient management system",
      path: "/projects/healthcare",
      size: "small", // takes 1x1 grid space
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: 3,
      title: "IoT Dashboard",
      description: "Device monitoring system",
      path: "/projects/iot",
      size: "small",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: 4,
      title: "Financial Dashboard",
      description: "Real-time analytics and financial insights",
      path: "/projects/finance",
      size: "medium", // takes 2x1 grid space
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: 5,
      title: "Social Network",
      description: "Community platform",
      path: "/projects/social",
      size: "small",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: 6,
      title: "Learning Management",
      description: "Educational platform revolutionizing online learning",
      path: "/projects/education",
      size: "medium",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: 7,
      title: "Cloud Infrastructure",
      description: "Scalable and secure cloud solutions",
      path: "/projects/cloud",
      size: "small",
      image: "https://media.istockphoto.com/id/1669453534/photo/3d-render-cloud-computing-circuit-board-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=jgKabe5sTZmFbj0gHwh5U3Dw5NBa6TQuU1J4plYcAJI="
    },
  ];

  const [isLoading, setIsLoading] = useState(true);

  // Add this near the top of your component
  useEffect(() => {
    // Simulate data fetching or other initialization
    const initializeData = async () => {
      try {
        // Add your actual data fetching here
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  const BubblesBackground = () => {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {bubbles.map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full backdrop-blur-sm"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.initialX}%`,
              top: `${bubble.initialY}%`,
              background: `radial-gradient(circle at 30% 30%, ${bubble.color}, rgba(255, 255, 255, 0))`,
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
            animate={{
              y: [-bubble.moveRange, bubble.moveRange],
              x: [-bubble.moveRange/2, bubble.moveRange/2],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 180, 360],
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
    );
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, -0.01, 0.9],
        staggerChildren: 0.2
      }
    }
  };

  const LoadingScreen = () => (
    <motion.div
      className="fixed inset-0 bg-[#19234d] z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-20 h-20 border-4 border-[#d9764a] rounded-full border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );

  const FloatingOrbs = () => {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle at center, rgba(217,118,74,0.08), transparent 60%)",
            filter: "blur(80px)",
            mixBlendMode: "soft-light",
            top: '5%',
            left: '0%',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle at center, rgba(43,90,158,0.1), transparent 60%)",
            filter: "blur(60px)",
            mixBlendMode: "color-dodge",
            bottom: '10%',
            right: '5%',
          }}
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    );
  };

  const ServicesSection = () => {
    return (
      <section className="relative py-32 overflow-hidden">
        {/* Animated Background Lines */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-full"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(217,118,74,${0.1 - (i * 0.005)}), transparent)`,
                top: `${(100 / 20) * i}%`,
              }}
              animate={{
                x: [-1000, 1000],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Services Content */}
        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.h2
            className="text-8xl md:text-9xl font-bold text-center mb-20"
            style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.1)",
              color: "transparent"
            }}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Services
          </motion.h2>

          {/* Services Grid with 3D Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group perspective"
                initial={{ opacity: 0, rotateX: -30 }}
                whileInView={{ opacity: 1, rotateX: 0 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <motion.div
                  className="relative bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-8 transform-gpu transition-all duration-500 group-hover:rotate-y-12"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d9764a]/20 to-[#2b5a9e]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Service Content */}
                  <div className="relative z-10">
                    <motion.div
                      className="text-7xl mb-6"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      {service.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-400">{service.description}</p>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#d9764a]/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const HeroSection = () => {
    return (
      <motion.section className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
          {[...Array(64)].map((_, i) => (
            <motion.div
              key={i}
              className="border border-white/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{
                duration: 4,
                delay: i * 0.1,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            className="mb-8"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-8xl md:text-9xl font-bold relative">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-white">
                We Build
              </span>
              <motion.span 
                className="block bg-clip-text text-transparent bg-gradient-to-r from-[#2b5a9e] via-[#d9764a] to-[#de7527]"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Digital Excellence
              </motion.span>
            </h1>
          </motion.div>

          {/* Animated Underline */}
          <motion.div
            className="h-1 w-0 mx-auto bg-gradient-to-r from-[#d9764a] to-[#de7527]"
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </motion.section>
    );
  };

  return (
    <>
      <AnimatePresence>

        {isLoading && <PageLoader />}
      </AnimatePresence>
      <div className="min-h-screen bg-gradient-to-b from-[#19234d] to-[#2b5a9e] overflow-hidden">
        {/* Add Toaster component */}
        <Toaster />

        {/* Progress Bar - smoother animation */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d9764a] to-[#de7527] origin-left z-50"
          style={{ scaleX: smoothProgress }}
        />

        {/* Floating Bubbles Container - spans entire page */}
        <BubblesBackground />

        {/* Gradient Mesh Background */}
        {/* <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-30 mix-blend-overlay">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-orange-500/20 animate-gradient" />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-pink-500/20 animate-gradient" />
          </div>
        </div> */}

        {/* Hero Section - adjusted timing */}
        <HeroSection />

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
          .perspective-text {
            perspective: 1000px;
            transform-style: preserve-3d;
          }
          .translate-z-10 {
            transform: translateZ(10px);
          }
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          .floating {
            animation: float 6s ease-in-out infinite;
          }
          @keyframes glow {
            0%, 100% { filter: drop-shadow(0 0 15px rgba(217,118,74,0.3)); }
            50% { filter: drop-shadow(0 0 30px rgba(217,118,74,0.6)); }
          }
          .glowing {
            animation: glow 3s ease-in-out infinite;
          }
          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          .shimmer-effect {
            background: linear-gradient(
              90deg,
              rgba(255,255,255,0) 0%,
              rgba(255,255,255,0.1) 50%,
              rgba(255,255,255,0) 100%
            );
            background-size: 200% 100%;
            animation: shimmer 3s infinite;
          }
          .glass-card {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          }
          .text-glow {
            text-shadow: 0 0 10px rgba(217,118,74,0.5),
                         0 0 20px rgba(217,118,74,0.3),
                         0 0 30px rgba(217,118,74,0.1);
          }
          .hover-lift {
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          .hover-lift:hover {
            transform: translateY(-8px) scale(1.02);
          }
          @keyframes morphShape {
            0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
            50% { border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; }
          }
          .morph-shape {
            animation: morphShape 15s infinite;
          }
          .service-card-hover {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .service-card-hover:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          }
          @keyframes iconFloat {
            0%, 100% { transform: translateY(0) rotate(0); }
            50% { transform: translateY(-10px) rotate(5deg); }
          }
          .icon-float {
            animation: iconFloat 3s ease-in-out infinite;
          }
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .gradient-shift {
            background-size: 200% 200%;
            animation: gradientShift 15s ease infinite;
          }
          .perspective {
            perspective: 2000px;
          }
          .rotate-y-12 {
            transform: rotateY(12deg);
          }
          .transform-gpu {
            transform: translateZ(0);
            backface-visibility: hidden;
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
                      className="glass-card rounded-2xl p-8 hover-lift relative overflow-hidden group"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ amount: "some" }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="shimmer-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <motion.h3
                        className="text-6xl md:text-7xl font-bold text-white mb-2 text-glow"
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
                      <p className="text-gray-300 text-lg">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="relative py-20 overflow-hidden">
              {/* Background Elements */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#19234d] to-[#2b5a9e]/20" />
              <motion.div
                className="absolute -right-40 -top-40 w-96 h-96 bg-[#d9764a]/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <motion.h2
                  className="text-6xl md:text-7xl font-bold text-center mb-16"
                  variants={fadeInUp}
                >
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-[#d9764a]">
                    Why Choose Us
                  </span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="relative group"
                      variants={fadeInUp}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#2b5a9e]/20 to-[#d9764a]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                      <div className="glass-card relative p-8 rounded-2xl overflow-hidden">
                        <div className="text-5xl mb-4">{feature.icon}</div>
                        <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                        <p className="text-gray-300">{feature.description}</p>
                        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#d9764a]/10 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-300" />
                      </div>
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
                    viewport={{ amount: 0.5 }}
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
                    viewport={{ amount: 0.5 }}
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
            <section className="relative py-20">
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[#19234d]/90" />
                <div className="absolute inset-0">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-1 w-1 bg-white/30 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="max-w-7xl mx-auto px-4 relative">
                <motion.h2
                  className="text-6xl md:text-7xl font-bold text-center mb-20"
                  variants={fadeInUp}
                >
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-[#d9764a]">
                    Our Process
                  </span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {processSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      className="relative group"
                      variants={fadeInUp}
                      whileHover={{ y: -10 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#2b5a9e]/20 to-[#d9764a]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                      <div className="glass-card relative p-6 rounded-2xl overflow-hidden">
                        <div className="relative h-48 mb-6 overflow-hidden rounded-xl">
                          <img 
                            src={step.image} 
                            alt={step.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#19234d] to-transparent" />
                          <div className="absolute bottom-4 right-4 text-4xl">{step.icon}</div>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-white">{step.title}</h3>
                        <p className="text-gray-300">{step.description}</p>
                      </div>
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
                  viewport={{ amount: 0.5 }}
                  transition={{ duration: 0.6 }}
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
                      viewport={{ amount: 0.5 }}
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
                  variants={fadeInRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ amount: 0.5 }}
                >
                  Featured Projects
                </motion.h2>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-4 auto-rows-[180px] gap-4"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ amount: 0.5 }}
                >
                  {projects.map((project, index) => (
                    <motion.div
                      key={index}
                      className={`group relative overflow-hidden rounded-3xl cursor-pointer
                        ${project.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
                        ${project.size === 'medium' ? 'md:col-span-2' : ''}
                        backdrop-blur-sm bg-white/5 border border-white/10
                      `}
                      variants={fadeInUp}
                      onClick={() => navigate(project.path)}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {/* Background Image with Gradient Overlay */}
                      <div className="absolute inset-0">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="relative h-full p-6 flex flex-col justify-end">
                        {/* Project Icon/Badge */}
                        <motion.div
                          className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
                          whileHover={{ rotate: 180 }}
                        >
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </motion.div>

                        {/* Project Info */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gray-300 line-clamp-2">
                            {project.description}
                          </p>

                          {/* Tags/Technologies (optional) */}
                          <div className="flex gap-2 mt-3">
                            {['React', 'Node.js', 'MongoDB'].map((tech, i) => (
                              <span
                                key={i}
                                className="text-xs px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      </div>

                      {/* Hover Effect Overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-[#d9764a]/80 to-transparent opacity-0 transition-opacity duration-300"
                        whileHover={{ opacity: 1 }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* Services Section */}
            <ServicesSection />

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
                amount: 0.3,
                margin: "-50px"
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
                    viewport={{ amount: 0.5 }}
                    transition={{ duration: 0.4 }}
                    className="text-center lg:text-left"
                  >
                    <motion.h2
                      className="text-5xl md:text-6xl font-bold mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ amount: 0.5 }}
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
                      viewport={{ amount: 0.5 }}
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
                      viewport={{ amount: 0.5 }}
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
                    viewport={{ amount: 0.5 }}
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
    </>
  );
};

export default Home;
