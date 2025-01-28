import React, { useEffect, useState, memo, useRef } from 'react';
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
import digitalTransformationAnimation from '../assets/Home-Hero2.json'; // You'll need to add this animation file

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
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {bubbles.slice(0, 8).map((bubble, i) => (  // Reduced from 12 to 8
          <motion.div
            key={i}
            className="absolute rounded-full optimize-animation"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.initialX}%`,
              top: `${bubble.initialY}%`,
              background: `radial-gradient(circle at 30% 30%, ${bubble.color}, transparent)`,
              transform: 'translateZ(0)',
              opacity: 0.3
            }}
            animate={{
              y: [-bubble.moveRange/6, bubble.moveRange/6],  // Reduced range
              x: [-bubble.moveRange/8, bubble.moveRange/8],  // Reduced range
            }}
            transition={{
              duration: bubble.duration * 3,
              repeat: Infinity,
              ease: "linear",
              repeatType: "mirror"
            }}
          />
        ))}
      </div>
    );
  }, () => true);  // Prevent unnecessary re-renders

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

    return (
      <section className="relative py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div
            className="perspective-1000 mb-20 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
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

            {/* Animated Letters Container */}
            <motion.h2
              className="text-8xl md:text-9xl font-bold text-center relative flex justify-center gap-x-3 flex-wrap"
              style={{ transformStyle: "preserve-3d" }}
            >
              {mainLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  className={`inline-block ${letter === " " ? "w-8" : ""
                    } bg-clip-text text-transparent bg-gradient-to-r from-white via-[#d9764a] to-[#2b5a9e]`}
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
                    textShadow: "0 0 20px rgba(217,118,74,0.5)",
                    transition: { duration: 0.2 }
                  }}
                >
                  {letter}
                </motion.span>
              ))}
              <motion.span
                className="inline-block w-8"
                initial={{ opacity: 0, y: 100, rotateX: 90 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: mainLetters.length * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                &nbsp;
              </motion.span>
              {subLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  className={`inline-block ${letter === " " ? "w-8" : ""
                    } bg-clip-text text-transparent bg-gradient-to-r from-white via-[#d9764a] to-[#2b5a9e]`}
                  initial={{ opacity: 0, y: 100, rotateX: 90 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: (mainLetters.length + 1) * 0.1 + index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    scale: 1.2,
                    textShadow: "0 0 20px rgba(217,118,74,0.5)",
                    transition: { duration: 0.2 }
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h2>

            {/* Decorative Lines */}
            <div className="absolute top-36 left-0 bottom-0 right-0 flex justify-center gap-4">
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
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group perspective-1000"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <motion.div
                  className="relative bg-gradient-to-br from-white/5 to-white/10 rounded-3xl p-8 transform-gpu transition-all duration-500"
                  whileHover={{
                    rotateY: 15,
                    rotateX: -5,
                    translateZ: "50px",
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Updated Service Card Icon */}
                  <motion.div
                    className="absolute -top-10 left-10 w-20 h-20 flex items-center justify-center transform-gpu"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Rotating Background */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d9764a] to-[#2b5a9e]"
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />

                    {/* Static Icon */}
                    <div className="relative z-10 text-4xl text-white">
                      {service.icon}
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10 pl-16 pt-8">
                    <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">{service.description}</p>

                    {/* Interactive Features List */}
                    <motion.ul className="mt-6 space-y-3">
                      {service.features?.map((feature, i) => (
                        <motion.li
                          key={i}
                          className="flex items-center space-x-3 text-sm text-gray-300"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <motion.span
                            className="w-2 h-2 bg-[#d9764a] rounded-full"
                            whileHover={{ scale: 1.5 }}
                          />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-[#d9764a]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  <div className="absolute -left-4 -top-4 w-32 h-32 bg-[#2b5a9e]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
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
      <motion.section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 ">
          {/* Animated Code Rain Effect */}
          {/* <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-sm text-[#4CAF50] whitespace-nowrap"
                initial={{ y: -100, x: Math.random() * 100 + '%' }}
                animate={{
                  y: '100vh',
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              >
                {'{code}'}
              </motion.div>
            ))}
          </div> */}

          {/* Floating Tech Icons */}
          <div className="absolute inset-0">
            {[
              { icon: FaReact, color: '#FF69B4', position: { top: '50%', right: '5%' } },
              { icon: SiJavascript, color: '#FFD700', position: { bottom: '5%', right: '10%' } },
              // { icon: SiTypescript, color: '#007ACC', position: { bottom: '25%', right: '45%' } },
              // { icon: FaAws , color: '#33CC33', position: { top: '20%', right: '15%' } },
              { icon: FaNodeJs, color: '#FFA07A', position: { top: '20%', right: '40%' } },
              { icon: FaDatabase, color: '#007BFF', position: { bottom: '8%', right: '25%' } },
              { icon: SiMongodb, color: '#3FA037', position: { bottom: '40%', right: '43%' } },
              // { icon: FaDocker, color: '#008080', position: { top: '30%', right: '10%' } }
            ].map((tech, i) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    ...tech.position,
                    color: tech.color,
                    opacity: 0.2
                  }}
                  animate={{
                    y: [0, -20, 0],
                    // rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 5 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                >
                  <Icon size={50} /> {/* Changed size to 50 for all icons */}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 relative z-10">
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
  };

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
                    background: `radial-gradient(circle at center, ${
                      i % 2 ? '#d9764a20' : '#2b5a9e20'
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
                    {/* Letter with gradient */}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#d9764a] to-[#2b5a9e]">
                      {letter}
                    </span>
                    
                    {/* Glowing effect */}
                    <motion.span
                      className="absolute inset-0 bg-clip-text text-transparent bg-white blur-sm"
                      animate={{
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: index * 0.2,
                        repeat: Infinity,
                      }}
                    >
                      {letter}
                    </motion.span>
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
                    color: "#d9764a",
                    transition: { duration: 0.2 }
                  }}
                >
                  {letter}
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
    const mainText = "Client";
    const subText = "Success Stories";
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
                background: i % 2 ? '#d9764a20' : '#2b5a9e20',
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
                className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-[#d9764a] to-[#2b5a9e]"
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.1,
                  rotateY: 180,
                  transition: { duration: 0.3 }
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Sub Text Animation */}
          <div className="flex justify-center gap-x-2">
            {subLetters.map((letter, index) => (
              <motion.span
                key={index}
                className="text-4xl md:text-6xl font-bold text-white/80"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: mainLetters.length * 0.1 + index * 0.05,
                }}
                whileHover={{
                  scale: 1.1,
                  color: "#d9764a",
                  transition: { duration: 0.2 }
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Decorative Lines */}
          <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-3">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="h-1 w-16 rounded-full bg-gradient-to-r from-[#d9764a] to-[#2b5a9e]"
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
    // Double the testimonials array for seamless looping
    const duplicatedTestimonials = [...testimonials, ...testimonials];
    
    return (
      <Section>
        <div className="max-w-7xl mx-auto ">
          <TestimonialsHeading />
          
          <div className="relative overflow-hidden">
            {/* Single row scrolling container */}
            <motion.div 
              className="flex gap-8 py-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              {/* Single row - moving left */}
              <motion.div
                className="flex gap-8"
                animate={{
                  x: [0, -1920],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ willChange: 'transform' }}
              >
                {duplicatedTestimonials.map((testimonial, index) => (
                  <TestimonialCard key={`row1-${index}`} testimonial={testimonial} />
                ))}
              </motion.div>
            </motion.div>

            {/* Gradient overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black to-transparent z-10" />
          </div>
        </div>
      </Section>
    );
  };

  const TestimonialCard = ({ testimonial }) => (
    <motion.div
      className="relative min-w-[350px] group"
      whileHover={{ 
        scale: 1.05, 
        zIndex: 20,
        transition: { duration: 0.2 } 
      }}
    >
      <motion.div
        className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-8 h-full border border-white/10"
        whileHover={{
          translateZ: 50,
          rotateX: -5,
          rotateY: 5,
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Quote Icon */}
        <motion.div
          className="absolute -top-5 -right-5 w-12 h-12 bg-gradient-to-br from-[#d9764a] to-[#2b5a9e] rounded-full flex items-center justify-center"
          whileHover={{ scale: 1.2, rotate: 180 }}
        >
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </motion.div>

        {/* Content */}
        <p className="text-gray-300 mb-8">{testimonial.text}</p>

        {/* Author Info */}
        <div className="flex items-center mt-auto">
          <motion.div 
            className="relative w-12 h-12 mr-4 overflow-hidden rounded-full"
            whileHover={{ scale: 1.1 }}
          >
            <img
              src={testimonial.image}
              alt={testimonial.author}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div>
            <h4 className="text-white font-bold">{testimonial.author}</h4>
            <p className="text-gray-400">{testimonial.position}</p>
          </div>
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
    const text = "Our Process";
    const letters = Array.from(text);

    return (
      <div className="mb-20 relative">
        {/* Background Text */}
        <motion.h2
          className="text-[12rem] font-bold text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            WebkitTextStroke: "1px rgba(217,118,74,0.1)",
            color: "transparent",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Process
        </motion.h2>

        <div className="flex justify-center gap-2">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-[#d9764a] to-[#2b5a9e]"
              initial={{ y: 200 }}
              whileInView={{ y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                scale: 1.2,
                rotate: 360,
                transition: { duration: 0.3 }
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </div>
    );
  };

  const ServicesHeading = () => {
    const [text, setText] = useState("");
    const fullText = "Our Services";
    
    useEffect(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 150);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="mb-20 relative overflow-hidden">
        <motion.h2
          className="text-6xl font-bold text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="inline-block">
            {text}
            <motion.span
              className="inline-block w-[3px] h-12 bg-[#d9764a] ml-1"
              animate={{
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
              }}
            />
          </span>
        </motion.h2>
        
        {/* Sliding decorative text */}
        <div className="absolute -top-2 left-0 w-full overflow-hidden opacity-10">
          <motion.div
            className="whitespace-nowrap text-8xl font-bold"
            animate={{
              x: [0, -1000],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            SERVICES SERVICES SERVICES SERVICES
          </motion.div>
        </div>
      </div>
    );
  };

  const baseHeadingStyles = "text-5xl md:text-6xl lg:text-7xl font-bold mb-8"

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

<style jsx global>{`
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
`}</style>
