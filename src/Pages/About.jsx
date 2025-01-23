import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import PageLoader from '../components/PageLoader';

const About = () => {
  // Update the scroll progress tracking
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });
  const [isLoading, setIsLoading] = useState(true);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 25,
    mass: 0.1,
    restDelta: 0.001
  });

  // Optimize transformations
  const scale = useTransform(smoothProgress, [0, 0.2], [1, 1.1]);
  const opacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const blurValue = useTransform(smoothProgress, [0, 0.15], [0, 4]);

  // Smoother parallax effects
  const parallax1 = useTransform(smoothProgress, [0, 1], [0, -200]);
  const parallax2 = useTransform(smoothProgress, [0, 1], [0, -150]);
  const parallax3 = useTransform(smoothProgress, [0, 1], [0, -75]);

  // Add new transform effects
  const rotateX = useTransform(smoothProgress, [0, 1], [0, 360]);
  const textGradient = useTransform(smoothProgress, [0, 1], ["0deg", "360deg"]);

  // Enhanced fadeInUp animation
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, type: "spring", stiffness: 100 }
  };

  // Add hover animations for stats
  const statHover = {
    scale: 1.1,
    rotate: [0, 5, -5, 0],
    transition: { duration: 0.5 }
  };

  // Add bubble configuration similar to Home page
  const bubbles = Array.from({ length: 50 }, (_, i) => ({
    size: Math.random() * 15 + 5,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    moveRange: Math.random() * 30 + 20,
  }));

  const achievements = [
    {
      number: "98",
      suffix: "%",
      label: "Client Satisfaction",
      duration: 2.5

    },
    {
      number: "250",
      suffix: "+",
      label: "Projects Delivered",
      duration: 2

    },
    {
      number: "15",
      suffix: "+",
      label: "Industry Awards",
      duration: 2

    },
    {
      number: "24",
      suffix: "/7",
      label: "Support Available",
      duration: 2

    },
  ];

  const values = [
    {
      icon: "🎯",
      title: "Innovation First",
      description: "Pushing boundaries with cutting-edge solutions and creative thinking."
    },
    {
      icon: "🤝",
      title: "Client Partnership",
      description: "Building lasting relationships through trust and collaboration."
    },
    {
      icon: "⚡",
      title: "Rapid Delivery",
      description: "Swift execution without compromising on quality."
    },
    {
      icon: "🌟",
      title: "Excellence",
      description: "Maintaining the highest standards in everything we do."
    }
  ];

  const teamMembers = [
    {
      name: "Ram Manavarthi",
      position: "CEO & Founder",
      bio: "Visionary leader with 15+ years in tech innovation",
      //   image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=500&fit=crop",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&h=500&fit=crop",

      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      name: "Harsha",
      position: "Co-Founder",
      bio: "Architecture expert specializing in scalable solutions",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&h=500&fit=crop",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      name: "Prajwala",
      position: "Creative Director",
      bio: "Award-winning designer with a passion for UX",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    }
  ];

  return (<>
    <AnimatePresence>
      {isLoading && <PageLoader />}
    </AnimatePresence>
    <div className="min-h-screen bg-gradient-to-b from-[#19234d] to-[#2b5a9e] overflow-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d9764a] to-[#de7527] origin-left z-50"
        style={{ scaleX: smoothProgress }}
      />

      {/* Add 3D perspective container */}
      <motion.div
        className="relative"
        style={{
          perspective: "2000px",
          transformStyle: "preserve-3d"
        }}
      >
        {/* Wrap all sections in this container */}
        <motion.div style={{ y: parallax3 }}>
          {/* Floating Bubbles */}
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
                  x: [-bubble.moveRange / 2, bubble.moveRange / 2],
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

          {/* Enhanced Floating Gradient Orbs */}
          <div className="fixed inset-0 pointer-events-none">
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full"
              style={{
                background: "radial-gradient(circle at center, rgba(217,118,74,0.15), transparent 70%)",
                filter: "blur(60px)",
                top: '10%',
                left: '5%',
              }}
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute w-[600px] h-[600px] rounded-full"
              style={{
                background: "radial-gradient(circle at center, rgba(43,90,158,0.15), transparent 70%)",
                filter: "blur(60px)",
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
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {/* Hero Section with enhanced animations */}
          <motion.section
            className="relative min-h-screen flex items-center justify-center"
            style={{
              scale,
              opacity,
              filter: `blur(${blurValue}px)`,
              rotateX // Add 3D rotation effect
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#19234d]/90 to-[#2b5a9e]/90" />
            <div className="relative container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-7xl md:text-9xl font-bold mb-8">
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300 leading-tight filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                    Our Story
                  </span>
                </h1>
                <p className="text-xl md:text-3xl text-gray-300 max-w-3xl mx-auto mb-12">
                  Crafting digital experiences that inspire, innovate, and transform businesses
                </p>

                {/* Animated scroll indicator */}
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                    <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>

          {/* Animated Stats Section */}
          <section className="py-20 relative z-10">
            <motion.div
              className="max-w-7xl mx-auto px-4"
              style={{ y: parallax2 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {achievements.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="relative group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.3 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 25
                    }}
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
                      
                      <motion.div
                        className="text-5xl md:text-6xl font-bold text-white mb-2 relative"
                        whileHover={{ 
                          scale: 1.1,
                          transition: { type: "spring", stiffness: 200 }
                        }}
                      >
                        <CountUp
                          start={0}
                          end={stat.number}
                          duration={2.5}
                          separator=","
                          suffix={stat.suffix}
                          enableScrollSpy
                          scrollSpyDelay={100}
                          redraw={true}
                          className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300"
                        />
                      </motion.div>
                      <p className="text-gray-300 text-lg">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Enhanced Company History Section */}
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div
                className="grid md:grid-cols-2 gap-12 items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <div>
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                    Pioneering Digital
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#d9764a] to-[#de7527]">
                      Innovation
                    </span>
                  </h2>
                  <p className="text-xl text-gray-300 mb-6">
                    Since 2015, we've been pushing the boundaries of what's possible in the digital realm.
                    Our journey began with a simple mission: to create technology that makes a difference.
                  </p>
                  <div className="space-y-4">
                    {[2015, 2018, 2020, 2023].map((year, index) => (
                      <motion.div
                        key={year}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        <span className="text-[#d9764a] font-bold text-xl">{year}</span>
                        <p className="text-gray-300">Major milestone description for {year}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <motion.div
                    className="rounded-2xl overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                      alt="Our Team"
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#19234d] via-transparent to-transparent opacity-60" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Values Section with Stagger Animation */}
          <section className="py-20 px-4">
            <motion.div
              className="max-w-7xl mx-auto"
              style={{ y: parallax3 }}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.3 }}
            >
              <motion.h2
                className="text-5xl md:text-6xl font-bold text-center text-white mb-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.3 }}
              >
                Our Values
              </motion.h2>
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2
                    }
                  }
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ amount: 0.3 }}
              >
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
                    variants={{
                      hidden: { opacity: 0, y: 50 },
                      show: { opacity: 1, y: 0 }
                    }}
                    whileHover={{
                      y: -10,
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 15
                      }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="text-5xl mb-6"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      {value.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                    <p className="text-gray-300">{value.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </section>

          {/* Team Section with Enhanced Animations */}
          <section className="py-20 mt-20 px-4">
            <motion.div
              className="max-w-7xl mx-auto"
              style={{ y: parallax1 }}
            >
              <motion.h2
                className="text-5xl md:text-6xl font-bold text-center text-white mb-16"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ amount: 0.3 }}
              >
                Meet Our Team
              </motion.h2>
              <motion.div
                className="grid md:grid-cols-3 gap-8"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.3
                    }
                  }
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ amount: 0.3 }}
              >
                <AnimatePresence>
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={member.name}
                      className="group bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10"
                      variants={{
                        hidden: { opacity: 0, x: -50 },
                        show: { opacity: 1, x: 0 }
                      }}
                      whileHover={{
                        y: -10,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 15
                        }
                      }}
                      exit={{ opacity: 0, x: 50 }}
                      viewport={{ amount: 0.3 }}
                    >
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-80 object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#19234d] via-transparent to-transparent opacity-60" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {member.name}
                        </h3>
                        <p className="text-[#d9764a] font-semibold mb-2">{member.position}</p>
                        <p className="text-gray-300 mb-4">{member.bio}</p>
                        <div className="flex gap-4">
                          {Object.entries(member.social).map(([platform, link]) => (
                            <a
                              key={platform}
                              href={link}
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              <i className={`fab fa-${platform}`}></i>
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </section>
        </motion.div>
      </motion.div>
    </div>
  </>

  );
};

export default About;
