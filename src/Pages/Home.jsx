import React, { useEffect, useState, memo, useRef, Suspense, ErrorBoundary, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimation, useInView } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import NewsletterForm from '../components/NewsLetter';
import { toast, Toaster } from 'react-hot-toast';
import CountUp from 'react-countup';
import PageLoader from '../components/PageLoader';
import { AnimatePresence } from 'framer-motion';
import { FaReact, FaNodeJs, FaAws, FaDocker, FaDatabase } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiMongodb } from 'react-icons/si';
import Lottie from 'lottie-react';
// import digitalTransformationAnimation from '../assets/Home-Hero-section.json'; // You'll need to add this animation file
import digitalTransformationAnimation from '../assets/Home-hero2.json'; // You'll need to add this animation file
import { useInView as useInViewObserver } from 'react-intersection-observer';
import { HeroModel, ServicesModel, FeaturesModel, ProcessModel } from '../components/ThreeModels';
import { Canvas } from '@react-three/fiber';
import ModelErrorBoundary from '../components/ErrorBoundary';
import { createGlobalStyle } from 'styled-components';

// Move styles to a styled-components GlobalStyle
const GlobalStyles = createGlobalStyle`
  .optimize-animation {
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000;
    will-change: transform, opacity;
  }

  .smooth-scroll {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }

  @media (prefers-reduced-motion: reduce) {
    .optimize-animation {
      animation: none !important;
      transform: none !important;
      transition: none !important;
    }
    
    .smooth-scroll {
      scroll-behavior: auto;
    }
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
    smooth: 0.05  // Reduced from 0.1
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 15,      // Reduced from 25
    damping: 50,        // Increased from 40
    mass: 0.8,          // Increased from 0.5
    restDelta: 0.0001,
    restSpeed: 0.0001
  });

  // Optimized transformations
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.1]);
  const heroY = useTransform(smoothProgress, [0, 0.2], [0, 100]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroBlur = useTransform(smoothProgress, [0, 0.15], [0, 4]);

  // Smoother parallax
  const parallax1 = useTransform(smoothProgress, [0, 1], [0, -100], {
    clamp: false
  });
  const parallax2 = useTransform(smoothProgress, [0, 1], [0, -50], {
    clamp: false
  });
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
      description: "Modern, responsive websites and web applications built with cutting-edge technologies.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      icon: "📱",
      title: "App Development",
      description: "Native and cross-platform mobile applications for iOS and Android.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },

    {
      icon: "🎯",
      title: "Digital Marketing",
      description: "Strategic digital presence and marketing solutions for your business growth.",
      image: "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZmZXNpb25hbCUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      icon: "🎨",
      title: "Web Design",
      description: "Creative and intuitive user interfaces that enhance user experience.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      icon: "👥",
      title: "Staffing Solutions",
      description: "Connect with skilled professionals to build your dream team.",
      image: "https://images.unsplash.com/photo-1558222218-b7b54eede3f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmZlc2lvbmFsJTIwcGVvcGxlfGVufDB8fDB8fHww"
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
    },
    {
      text: "Their cybersecurity solutions have been invaluable in protecting our business from potential threats.",
      author: "John Doe",
      position: "CEO, SecureTech",
      image: "https://images.unsplash.com/photo-1580455561444-8a5f2d0a5f4a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZmZXNpb25hbCUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      text: "The team at Projexino Solutions is always available to help and provide guidance. Their customer support is top-notch.",
      author: "Jane Smith",
      position: "Operations Manager, TechCorp",
      image: "https://images.unsplash.com/photo-1580455561444-8a5f2d0a5f4a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZmZXNpb25hbCUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
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

  const useThrottledScroll = (callback, delay = 16) => {
    const lastRun = useRef(Date.now());
    const timeout = useRef(null);

    return useCallback(() => {
      if (timeout.current) {
        cancelAnimationFrame(timeout.current);
      }

      timeout.current = requestAnimationFrame(() => {
        const now = Date.now();
        if (now - lastRun.current >= delay) {
          callback();
          lastRun.current = now;
        }
      });
    }, [callback, delay]);
  };

  useEffect(() => {
    let rafId;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const direction = currentScrollY > lastScrollY ? 'down' : 'up';
        lastScrollY = currentScrollY;

        // Handle scroll-based animations here
        document.documentElement.style.setProperty('--scroll-y', `${currentScrollY}px`);
        document.documentElement.setAttribute('data-scroll-direction', direction);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const BubblesBackground = memo(() => {
    const bubbleElements = useMemo(() => 
      bubbles.slice(10, 150).map((bubble, i) => ({
        ...bubble,
        key: i,
        style: {
          width: bubble.size * 1.5,
          height: bubble.size * 1.5,
          left: `${bubble.initialX}%`,
          top: `${bubble.initialY}%`,
          background: `radial-gradient(circle at 30% 30%, 
            ${i % 2 === 0 ? 'rgba(217,118,74,0.15)' : 'rgba(43,90,158,0.15)'}, 
            transparent)`,
        }
      })), 
      []
    );

    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {bubbleElements.map(bubble => (
          <motion.div
            key={bubble.key}
            className="absolute rounded-full optimize-animation"
            style={{
              ...bubble.style,
              transform: 'translateZ(0)',
              willChange: 'transform',
              backfaceVisibility: 'hidden'
            }}
            animate={{
              y: [-bubble.moveRange, bubble.moveRange],
              x: [-bubble.moveRange / 2, bubble.moveRange / 2],
            }}
            transition={{
              duration: bubble.duration * 3,
              repeat: Infinity,
              ease: "linear",
              repeatType: "mirror",
              delay: bubble.key * 0.1
            }}
          />
        ))}
      </div>
    );
  }, () => true);

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

  const FloatingShapes = () => {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Hexagon */}
        <motion.div
          className="absolute w-96 h-96"
          style={{
            clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            background: "linear-gradient(45deg, rgba(217,118,74,0.1), rgba(43,90,158,0.1))",
            border: "2px solid rgba(255,255,255,0.05)",
            top: "10%",
            right: "5%",
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Diamond */}
        <motion.div
          className="absolute w-64 h-64"
          style={{
            transform: "rotate(45deg)",
            background: "linear-gradient(-45deg, rgba(43,90,158,0.1), rgba(217,118,74,0.1))",
            border: "2px solid rgba(255,255,255,0.05)",
            bottom: "15%",
            left: "10%",
          }}
          animate={{
            rotate: [45, 405],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    );
  };

  const MeshGrid = () => {
    return (
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-full"
              style={{
                background: `linear-gradient(90deg, 
                  transparent, 
                  rgba(217,118,74,${0.1 - (i * 0.005)}), 
                  rgba(43,90,158,${0.1 - (i * 0.005)}), 
                  transparent)`,
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
      </div>
    );
  };

  const ServicesSection = () => {
    const mainText = "Our";
    const subText = "Services";
    const mainLetters = Array.from(mainText);
    const subLetters = Array.from(subText);
    const controls = useAnimation();

    useEffect(() => {
      controls.start("visible");
    }, [controls]);

    return (
      <Section>
        <div className="max-w-7xl mx-auto px-4 py-20 relative">
          {/* Animated Heading Container */}
          <div className="relative mb-20">
            {/* Background Text Effect */}
            <motion.h2
              className="text-[150px] font-bold text-center opacity-5 absolute top-[-80px] left-[300px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.05 }}
              viewport={{ once: false, margin: "-10px" }}
              transition={{ duration: 0.8 }}
            >
              SERVICES
            </motion.h2>

            {/* Main Animated Text */}
            <div className="flex items-center justify-center gap-x-4">
              {/* "Our" Text sliding from left */}
              <motion.div 
                className="flex gap-x-2"
                initial={{ x: "-100vw", opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ amount: 0.5, margin: "-10px" }}
                variants={{
                  hidden: { x: "-100vw", opacity: 0 },
                  visible: { 
                    x: 0, 
                    opacity: 1,
                    transition: {
                      type: "spring",
                      duration: 1.5,
                      bounce: 0.3
                    }
                  }
                }}
                animate={controls}
              >
                {mainLetters.map((letter, index) => (
                  <motion.span
                    key={index}
                    className="text-6xl md:text-7xl font-bold"
                    whileHover={{
                      scale: 1.2,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
                      {letter}
                    </span>
                  </motion.span>
                ))}
              </motion.div>

              {/* "Services" Text sliding from right */}
              <motion.div 
                className="flex gap-x-2"
                initial="hidden"
                whileInView={{ opacity: 1 }}
                viewport={{ amount: 0.5, margin: "-10px" }}
                variants={{
                  hidden: { x: "100vw", opacity: 0 },
                  visible: { 
                    x: 0, 
                    opacity: 1,
                    transition: {
                      type: "spring",
                      duration: 1.5,
                      bounce: 0.3
                    }
                  }
                }}
                animate={controls}
              >
                {subLetters.map((letter, index) => (
                  <motion.span
                    key={index}
                    className="text-6xl md:text-7xl font-bold"
                    whileHover={{
                      scale: 1.2,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#d9764a] to-[#de7527]">
                      {letter}
                    </span>
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Decorative Lines */}
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-4">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1 w-20 rounded-full bg-gradient-to-r from-[#d9764a] to-[#2b5a9e]"
                  animate={{
                    scaleX: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Rest of your services grid content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group perspective-[2000px]"
                initial={{ opacity: 0, rotateX: -30, y: 50 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                transition={{ 
                  duration: 0.8,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <motion.div
                  className="relative h-[400px] rounded-2xl overflow-hidden group cursor-pointer"
                  style={{ transformStyle: "preserve-3d" }}
                  whileHover={{
                    rotateY: 15,
                    rotateX: -5,
                    translateZ: 50,
                    transition: { duration: 0.4 }
                  }}
                >
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ 
                      backgroundImage: `url(${service.image})`,
                      backgroundBlendMode: 'overlay',
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

                  {/* Floating Icon */}
                  <div className="absolute top-4 right-4 w-16 h-16">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#d9764a] to-[#2b5a9e] rounded-xl"
                      animate={{
                        rotate: [0, 360]
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-3xl text-white z-10">
                      {service.icon}
                    </div>
                  </div>

                  {/* Content Container */}
                  <motion.div
                    className="absolute inset-x-0 bottom-0 p-6 transform transition-transform duration-500 group-hover:-translate-y-[calc(100%-80px)]"
                  >
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {service.title}
                    </h3>
                    
                    <div className="text-gray-300 opacity-0 transform translate-y-10 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      <p className="mb-4">{service.description}</p>
                      
                      {/* Features List */}
                      <ul className="space-y-2">
                        {service.features?.map((feature, i) => (
                          <motion.li
                            key={i}
                            className="flex items-center space-x-2"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <motion.div
                              className="w-1.5 h-1.5 bg-[#d9764a] rounded-full"
                              whileHover={{ scale: 1.5 }}
                            />
                            <span className="text-sm">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    );
  };

  const HeroSection = () => (
    <motion.section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute right-0 w-1/2 h-[100vh]">
        <ModelErrorBoundary>
          <HeroModel />
        </ModelErrorBoundary>
      </div>
      
      {/* Rest of the hero content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Existing hero content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div className="mb-6 flex items-center space-x-2">
              <div className="h-1 w-12 bg-[#d9764a]" />
              <span className="text-[#d9764a] font-semibold">INNOVATIVE SOLUTIONS</span>
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <motion.span
                className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Transforming Ideas
              </motion.span>
              <motion.span
                className="block bg-clip-text text-transparent bg-gradient-to-r from-[#d9764a] to-[#de7527] leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Into Digital Reality
              </motion.span>
            </h1>

            <motion.p
              className="text-lg text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              We craft cutting-edge software solutions that empower businesses
              to thrive in the digital age. From web applications to cloud
              infrastructure, we bring your vision to life.
            </motion.p>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <button className="px-8 py-3 bg-gradient-to-r from-[#d9764a] to-[#de7527] rounded-lg text-white font-semibold hover:scale-105 transition-transform flex items-center gap-2">
                Start Project
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </button>
              <button className="px-8 py-3 border border-[#d9764a]/30 rounded-lg text-white font-semibold hover:bg-[#d9764a]/10 transition-colors">
                Our Services
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Lottie Animation */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full aspect-square max-w-[600px] mx-auto">
              <Lottie
                animationData={digitalTransformationAnimation}
                loop={true}
                autoplay={true}
                className="w-full h-full"
              />

              {/* Floating Stats */}
              <motion.div
                className="absolute -left-10 top-1/4 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-2xl font-bold text-white">250+</div>
                <div className="text-sm text-gray-300">Projects Delivered</div>
              </motion.div>

              <motion.div
                className="absolute -right-5 bottom-1/4 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <div className="text-2xl font-bold text-white">99%</div>
                <div className="text-sm text-gray-300">Client Satisfaction</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );

  // Enhanced Scroll-Triggered Animations
  const scrollVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] // Custom bezier curve for smooth animation
      }
    }
  };

  // Floating Animation Effect
  const floatingAnimation = {
    animate: {
      y: [-20, 20],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  // Gradient Movement Animation
  const gradientAnimation = {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      } 
    }
  };

  // Enhanced Section Component
  const Section = ({ children, className }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
      once: true,
      margin: "-10% 0px -10% 0px",
      amount: 0.2
    });
    const controls = useAnimation();

    useEffect(() => {
      if (isInView) {
        controls.start("visible");
      }
    }, [isInView, controls]);

    return (
      <motion.section
        ref={ref}
        className={`relative py-32 overflow-hidden optimize-animation ${className}`}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.4,
              ease: [0.25, 0.1, 0.25, 1],
              staggerChildren: 0.05
            }
          }
        }}
      >
        {children}
      </motion.section>
    );
  };

  // Animated Background Component
  const AnimatedBackground = () => (
    <div className="absolute inset-0 -z-10">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${i % 2 ? '#d9764a10' : '#2b5a9e10'} 0%, transparent 70%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  const FeaturedProjectsSection = () => {
    const mainText = "Featured";
    const subText = "Projects";
    const mainLetters = Array.from(mainText);
    const subLetters = Array.from(subText);

    return (
      <section className="relative  overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div
            className="perspective-1000 mb-20 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {/* Floating Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: `radial-gradient(circle at center, ${i % 2 ? '#d9764a20' : '#2b5a9e20'
                      }, transparent)`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3],
                    y: [-20, 20, -20],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Main Title - "Featured" */}
            <motion.div className="flex justify-center gap-x-4 mb-4">
              {mainLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  className="text-8xl md:text-9xl font-bold relative"
                  initial={{ opacity: 0, y: 100, rotateZ: -45 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    rotateZ: 0,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                    type: "spring",
                    bounce: 0.5,
                  }}
                >
                  <span className="relative inline-block">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
                      {letter}
                    </span>
                  </span>
                </motion.span>
              ))}
            </motion.div>

            {/* Sub Title - "Projects" */}
            <motion.div
              className="flex justify-center gap-x-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {subLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  className="text-6xl md:text-7xl font-bold relative inline-block"
                  initial={{ scale: 0, rotateX: 90 }}
                  whileInView={{
                    scale: 1,
                    rotateX: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1 + 0.7,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.2 }
                  }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#d9764a] to-[#de7527]">
                    {letter}
                  </span>
                </motion.span>
              ))}
            </motion.div>

            {/* Decorative Line */}
            <motion.div
              className="absolute bottom-0 left-[300px] transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#d9764a] to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            />
          </motion.div>

          {/* Projects Grid Container */}
          {/* Your existing projects grid code here */}
        </div>
      </section>
    );
  };

  const TestimonialsHeading = () => {
    const mainText = "Voices";
    const subText = "That Inspire";
    const mainLetters = Array.from(mainText);
    const subLetters = Array.from(subText);
  
    return (
      <motion.div
        className="mb-20 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: i % 2 ? '#ff7e6720' : '#4a90e220',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
  
        {/* Main Text Animation */}
        <div className="flex flex-col items-center relative">
          <div className="flex justify-center gap-x-4 mb-2">
            {mainLetters.map((letter, index) => (
              <motion.span
                key={index}
                className="text-8xl md:text-9xl font-bold relative"
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -50 : 50,
                  y: index % 3 === 0 ? -50 : 50,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
                  {letter}
                </span>
              </motion.span>
            ))}
          </div>
  
          {/* Sub Text Animation */}
          <div className="flex justify-center gap-x-2">
            {subLetters.map((letter, index) => (
              <motion.span
                key={index}
                className="text-4xl md:text-6xl font-bold"
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? 50 : -50,
                  y: index % 2 === 0 ? -50 : 50,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: mainLetters.length * 0.1 + index * 0.05,
                  type: "spring",
                  stiffness: 80,
                }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#d9764a] to-[#de7527]">
                  {letter}
                </span>
              </motion.span>
            ))}
          </div>
  
          {/* Decorative Lines */}
          <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-3">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="h-1 w-16 rounded-full bg-gradient-to-r from-[#ff7e67] to-[#4a90e2]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    );
  };
  

  const TestimonialsSection = () => {
    const [[ direction], setPage] = useState([0, 0]);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const slideVariants = {
      enter: (direction) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      }),
      center: {
        zIndex: 1,
        x: 0,
        opacity: 1
      },
      exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset, velocity) => {
      return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection) => {
      const newIndex = (currentIndex + newDirection + testimonials.length) % testimonials.length;
      setPage([newIndex, newDirection]);
    };

    // Auto scroll effect
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        
        );
      }, 3000);

      return () => clearInterval(timer);
    }, []);

    return (
      <Section>
        <div className="max-w-7xl mx-auto px-4">
          <TestimonialsHeading />

          <div className="relative h-[400px] overflow-hidden">
            {/* Navigation Arrows */}
            <motion.button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(-1)}
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(1)}
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>

            {/* Testimonial Cards */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <TestimonialCard testimonial={testimonials[currentIndex]} />
              </motion.div>
            </AnimatePresence>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-[#d9764a]' : 'bg-white/20'
                    }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    const direction = index > currentIndex ? 1 : -1;
                    setPage([index, direction]);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>
    );
  };

  const TestimonialCard = ({ testimonial }) => (
    <motion.div
      className="relative min-w-[350px] group"
      whileHover={{
        scale: 1.1,
        zIndex: 20,
        transition: { duration: 0.3 },
      }}
    >
      <motion.div
        className="relative bg-gradient-to-br from-[#19234d] to-[#2b5a9e] backdrop-blur-md rounded-3xl p-8 h-full border border-white/10 shadow-lg shadow-[#4a90e2]/30"
        whileHover={{
          translateZ: 50,
          rotateX: -10,
          rotateY: 10,
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Fancy Glowing Border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#4a90e2] via-[#ff7e67] to-[#ffb74a] opacity-20 blur-xl"></div>
  
        {/* Animated Floating Quote Icon */}
        <motion.div
          className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-[#ff7e67] to-[#4a90e2] rounded-full flex items-center justify-center shadow-lg"
          whileHover={{ scale: 1.3, rotate: 180 }}
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </motion.div>
  
        {/* Testimonial Content */}
        <p className="text-gray-300 text-lg italic leading-relaxed mb-8">
          {testimonial.text}
        </p>
  
        {/* Author Info Section */}
        <div className="flex items-center mt-auto">
          <motion.div
            className="relative w-14 h-14 mr-4 overflow-hidden rounded-full border-2 border-[#4a90e2] shadow-lg"
            whileHover={{ scale: 1.2 }}
          >
            <img
              src={testimonial.image}
              alt={testimonial.author}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div>
            <h4 className="text-white text-xl font-bold">{testimonial.author}</h4>
            <p className="text-gray-400 text-sm">{testimonial.position}</p>
          </div>
        </div>
  
        {/* Glowing Accent Lines */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="h-1 w-12 bg-gradient-to-r from-[#ff7e67] to-[#4a90e2] rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{
                duration: 0.8,
                delay: i * 0.2,
                type: "spring",
                stiffness: 80,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
  

  // Newsletter Section - Optimized animations
  const NewsletterSection = () => (
    <Section>
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
    </Section>
  );

  const useScrollAnimation = () => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, {
      once: true,
      margin: "-50px 0px"
    });

    useEffect(() => {
      if (isInView) {
        controls.start("visible");
      }
    }, [isInView, controls]);

    return [ref, controls];
  };

  const ProcessHeading = () => {
    const mainText = "Our";
    const subText = "Process";
    const mainLetters = Array.from(mainText);
    const subLetters = Array.from(subText);

    return (
      <div className="mb-20 relative">
        {/* Background Text */}
        <motion.h2
          className="text-[12rem] md:text-[16rem] font-bold text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            WebkitTextStroke: "1px rgba(217,118,74,0.1)",
            color: "transparent",
          }}
        >
          Process
        </motion.h2>

        {/* Main Title Container - Side by side "Our Process" */}
        <div className="flex justify-center items-center gap-x-6">
          {/* "Our" Text */}
          <motion.div className="flex gap-x-2">
            {mainLetters.map((letter, index) => (
              <motion.span
                key={index}
                className="text-7xl md:text-8xl font-bold relative"
                initial={{ opacity: 0, y: 100, rotateX: 90 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.2 }
                }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
                  {letter}
                </span>
              </motion.span>
            ))}
          </motion.div>

          {/* "Process" Text */}
          <motion.div className="flex gap-x-2">
            {subLetters.map((letter, index) => (
              <motion.span
                key={index}
                className="text-7xl md:text-8xl font-bold relative inline-block"
                initial={{ scale: 0, rotateX: 90 }}
                whileInView={{
                  scale: 1,
                  rotateX: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1 + 0.3,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.2 }
                }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#d9764a] to-[#de7527]">
                  {letter}
                </span>
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Decorative Lines */}
        <div className="absolute top-28 left-0 bottom-0 right-0 flex justify-center gap-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="h-1 w-20 rounded-full bg-gradient-to-r from-[#d9764a] to-[#2b5a9e]"
              animate={{
                scaleX: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  const ServicesHeading = () => {
    const mainText = "Our";
    const subText = "Services";
    const mainLetters = Array.from(mainText);
    const subLetters = Array.from(subText);

    // Use react-intersection-observer instead
    const { ref, inView } = useInViewObserver({
      threshold: 0.5,
      triggerOnce: false
    });

    // Add controls for animations
    const controls = useAnimation();

    // Trigger animation when component comes into view
    useEffect(() => {
      if (inView) {
        controls.start("visible");
      } else {
        controls.start("hidden");
      }
    }, [controls, inView]);

    return (
      <div ref={ref} className="mb-20 relative overflow-hidden h-[300px]">
        {/* Background Text */}
        <motion.h2
          className="text-[12rem] md:text-[16rem] font-bold text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            WebkitTextStroke: "1px rgba(217,118,74,0.1)",
            color: "transparent",
          }}
        >
          Services
        </motion.h2>

        {/* Main Content */}
        <div className="relative z-10 flex justify-center items-center h-full">
          <div className="flex items-center gap-x-6">
            {/* "Our" Text sliding from left */}
            <motion.div 
              className="flex gap-x-2"
              variants={{
                hidden: { x: "-100vw", opacity: 0 },
                visible: { 
                  x: 0, 
                  opacity: 1,
                  transition: {
                    type: "spring",
                    duration: 1.5,
                    bounce: 0.3
                  }
                }
              }}
              initial="hidden"
              animate={controls}
            >
              {mainLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  className="text-7xl md:text-8xl font-bold relative"
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.2 }
                  }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
                    {letter}
                  </span>
                </motion.span>
              ))}
            </motion.div>

            {/* "Services" Text sliding from right */}
            <motion.div 
              className="flex gap-x-2"
              variants={{
                hidden: { x: "100vw", opacity: 0 },
                visible: { 
                  x: 0, 
                  opacity: 1,
                  transition: {
                    type: "spring",
                    duration: 1.5,
                    bounce: 0.3
                  }
                }
              }}
              initial="hidden"
              animate={controls}
            >
              {subLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  className="text-7xl md:text-8xl font-bold relative inline-block"
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.2 }
                  }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#d9764a] to-[#de7527]">
                    {letter}
                  </span>
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Optional: Impact Effect when words collide */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full"
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: {
              scale: [0, 2, 0],
              opacity: [0, 0.2, 0],
              transition: {
                duration: 0.5,
                delay: 0.75,
                ease: "easeOut"
              }
            }
          }}
          initial="hidden"
          animate={controls}
          style={{
            background: "radial-gradient(circle, rgba(217,118,74,0.3) 0%, transparent 70%)"
          }}
        />
      </div>
    );
  };

  const baseHeadingStyles = "text-5xl md:text-6xl lg:text-7xl font-bold mb-8"

  const EnhancedBackground = () => {
    const [techBubbles, setTechBubbles] = useState([]);
    const maxBubbles = 8;

    useEffect(() => {
      const createBubble = () => {
        if (techBubbles.length >= maxBubbles) return;

        const newBubble = {
          id: Date.now(),
          size: 40 + Math.random() * 60,
          x: Math.random() * 100,
          y: Math.random() * 100,
          lifespan: 8000 + Math.random() * 4000, // Random lifespan between 8-12 seconds
        };

        setTechBubbles(prev => [...prev, newBubble]);

        // Remove bubble after lifespan
        setTimeout(() => {
          setTechBubbles(prev => prev.filter(b => b.id !== newBubble.id));
        }, newBubble.lifespan);
      };

      // Create new bubbles periodically
      const interval = setInterval(createBubble, 2000);
      return () => clearInterval(interval);
    }, [techBubbles.length]);

    return (
      <>
        {/* Tech Circuit Lines */}
        <div className="fixed inset-0 pointer-events-none">
          <svg className="w-full h-full opacity-[0.07]">
            <pattern
              id="circuit-pattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <motion.path
                d="M 10 50 L 40 50 M 60 50 L 90 50 M 50 10 L 50 40 M 50 60 L 50 90"
                stroke="url(#tech-gradient)"
                strokeWidth="0.5"
                fill="none"
                animate={{
                  strokeDasharray: ["0,200", "200,0"],
                  strokeDashoffset: [0, -200],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <circle cx="50" cy="50" r="3" fill="url(#tech-gradient)" opacity="0.5" />
            </pattern>
            <defs>
              <linearGradient id="tech-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#d9764a" />
                <stop offset="100%" stopColor="#2b5a9e" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
          </svg>
        </div>

        {/* Floating Tech Elements with Creation/Destruction */}
        <div className="fixed inset-0 pointer-events-none">
          {techBubbles.map((bubble) => (
            <motion.div
              key={bubble.id}
              className="absolute"
              style={{
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                left: `${bubble.x}%`,
                top: `${bubble.y}%`,
                background: 'rgba(255, 255, 255, 0.01)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '20%',
              }}
              initial={{ 
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                opacity: [0, 0.6, 0.3],
                rotate: [0, 180],
                scale: [0.5, 1.1, 1],
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
                transition: { duration: 0.5 }
              }}
              transition={{
                duration: bubble.lifespan / 1000,
                ease: "linear",
              }}
            >
              {/* Inner Tech Details */}
              <motion.div 
                className="absolute inset-2 border border-[#d9764a]/20 rounded-[15%]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div 
                className="absolute inset-4 border border-[#2b5a9e]/20 rounded-[10%]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Dynamic Grid System */}
        <div className="fixed inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(217,118,74,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(43,90,158,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
            }}
          >
            <motion.div
              className="w-full h-full"
              animate={{
                x: [-100, 0],
                y: [-100, 0],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        </div>

        {/* Professional Glow Effects */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-[100px]"
              style={{
                width: `${400 + i * 200}px`,
                height: `${400 + i * 200}px`,
                background: i % 2 === 0
                  ? 'radial-gradient(circle, rgba(217,118,74,0.03), transparent 70%)'
                  : 'radial-gradient(circle, rgba(43,90,158,0.03), transparent 70%)',
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </>
    );
  };

  // Add these performance optimization classes
  const performanceOptimizedAnimation = {
    className: "will-change-transform transform-gpu",
    style: {
      backfaceVisibility: "hidden",
      perspective: 1000,
      translateZ: 0
    }
  }

  // Use React.memo for animated components
  const AnimatedElement = memo(({ children, ...props }) => (
    <motion.div
      {...performanceOptimizedAnimation}
      {...props}
    >
      {children}
    </motion.div>
  ));

  // Add animation preloading
  useEffect(() => {
    const preloadAnimations = () => {
      const elements = document.querySelectorAll('.motion-section');
      elements.forEach(element => {
        element.style.willChange = 'transform, opacity';
      });
    };
    preloadAnimations();
  }, []);

  return (
    <>
      <GlobalStyles />
      <AnimatePresence>

        {isLoading && <PageLoader />}
      </AnimatePresence>
      <div className="min-h-screen bg-gradient-to-b from-[#19234d] to-[#2b5a9e] overflow-hidden">
        {/* Add Toaster component */}
        <Toaster />
        <EnhancedBackground />

        {/* Progress Bar - smoother animation */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d9764a] to-[#de7527] origin-left z-50"
          style={{ scaleX: smoothProgress }}
        />

        {/* Floating Bubbles Container - spans entire page */}
        <BubblesBackground />
        {/* <EnhancedBackground /> */}


        {/* Enhanced Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {/* Floating Geometric Shapes */}
          {[...Array(8)].map((_, i) => ( // Reduced from 15 to 8
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: `${20 + Math.random() * 30}px`,
                height: `${20 + Math.random() * 30}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 2 === 0
                  ? 'linear-gradient(45deg, #d9764a20, #2b5a9e20)'
                  : 'linear-gradient(45deg, #2b5a9e20, #d9764a20)',
                borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '30%' : '0%',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                willChange: 'transform',
                transform: 'translateZ(0)'
              }}
              animate={{
                y: [0, -30, 0], // Reduced range
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 15 + Math.random() * 5, // Reduced variation
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.8,
              }}
            />
          ))}

          {/* Animated Grid Lines */}
          <div className="absolute inset-0" style={{ opacity: 0.1 }}>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-[1px] w-full"
                style={{
                  top: `${(100 / 20) * i}%`,
                  background: 'linear-gradient(90deg, transparent, rgba(217, 118, 74, 0.3), transparent)',
                }}
                animate={{
                  scaleX: [1, 1.5, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Glowing Orbs */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full blur-2xl"
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                background: i % 2 === 0
                  ? 'radial-gradient(circle, #d9764a15, transparent 70%)'
                  : 'radial-gradient(circle, #2b5a9e15, transparent 70%)',
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Animated Mesh Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.15]">
            <pattern
              id="mesh-pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <motion.path
                d="M 20 0 L 40 20 L 20 40 L 0 20 Z"
                fill="none"
                stroke="url(#mesh-gradient)"
                strokeWidth="0.5"
                animate={{
                  strokeDasharray: ["0,100", "100,0"],
                  strokeDashoffset: [0, -100],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </pattern>
            <defs>
              <linearGradient id="mesh-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#d9764a10" />
                <stop offset="50%" stopColor="#2b5a9e10" />
                <stop offset="100%" stopColor="#d9764a10" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#mesh-pattern)" />
          </svg>
        </div>

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
            0%, 100% {
              border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            }
            50% {
              border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            }
          }
          .morph-shape {
            animation: morphShape 8s ease-in-out infinite;
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
            perspective: 1000;
            will-change: transform;
          }
          @keyframes gradientFlow {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .gradient-flow {
            background: linear-gradient(
              45deg,
              rgba(217,118,74,0.1),
              rgba(43,90,158,0.1),
              rgba(217,118,74,0.1)
            );
            background-size: 200% 200%;
            animation: gradientFlow 15s ease infinite;
          }
          .glass-effect {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          }
          .perspective-1000 {
            perspective: 1000px;
            transform-style: preserve-3d;
          }
          @media (prefers-reduced-motion: reduce) {
            .transform-gpu {
              transition: none !important;
              transform: none !important;
              animation: none !important;
            }
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
            <Section>
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
            </Section>



            {/* About Section with Image */}
            <Section>
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
            </Section>
            
            


            {/* Features Section */}
            <Section>
              {/* 3D Background Elements */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#19234d] via-[#2b5a9e]/20 to-[#19234d]" />
                <motion.div
                  className="absolute w-full h-full"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(217,118,74,0.15), transparent 70%)',
                  }}
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
              </div>

              <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Feature Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="relative group perspective-2000"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ rotateY: 10, rotateX: -5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        delay: index * 0.1
                      }}
                    >
                      {/* Card Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#d9764a]/10 to-[#2b5a9e]/10 rounded-2xl transform -skew-x-12 group-hover:skew-x-0 transition-transform duration-300" />

                      {/* Card Content */}
                      <div className="glass-card relative p-8 rounded-2xl backdrop-blur-lg border border-white/10">
                        <motion.div
                          className="text-5xl mb-6"
                          whileHover={{ scale: 1.2, rotateY: 180 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          {feature.icon}
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                        <p className="text-gray-300">{feature.description}</p>

                        {/* Hover Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-[#d9764a]/5 to-[#2b5a9e]/5 rounded-2xl"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Section>

            {/* Process Section with Images */}
            <Section>
              {/* 3D Connection Lines */}
              <div className="absolute inset-0 flex items-center">
                <svg className="w-full h-1" viewBox="0 0 1000 1">
                  <motion.path
                    d="M0,0.5 C250,0.5 750,0.5 1000,0.5"
                    stroke="url(#processGradient)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5 }}
                  />
                  <defs>
                    <linearGradient id="processGradient">
                      <stop offset="0%" stopColor="#d9764a" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#2b5a9e" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#d9764a" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <ProcessHeading />

              <div className="max-w-7xl mx-auto px-4 relative z-10">

                <div className="grid md:grid-cols-4 gap-8">
                  {processSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      className="relative perspective-1000"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ rotateY: 15, rotateX: -5 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <div className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden transform preserve-3d">
                        <motion.div
                          className="relative h-48"
                          whileHover={{ scale: 1.05 }}
                        >
                          <img
                            src={step.image}
                            alt={step.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

                          {/* 3D Floating Icon */}
                          <motion.div
                            className="absolute top-4 left-4 bg-white/10 backdrop-blur-lg rounded-full w-12 h-12 flex items-center justify-center text-2xl"
                            animate={{
                              y: [0, -10, 0],
                              rotateY: [0, 360],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            {step.icon}
                          </motion.div>
                        </motion.div>

                        <div className="p-6">
                          <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                          <p className="text-gray-300">{step.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Section>



            {/* Services Section */}
            <ServicesSection />


            {/* Portfolio Section */}
            <Section>
              <div className="max-w-7xl mx-auto px-4">
                <FeaturedProjectsSection />

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
            </Section>

            {/* Testimonials Section */}
            <TestimonialsSection />

            {/* Newsletter Section - Optimized animations */}
            <NewsletterSection />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Home;

