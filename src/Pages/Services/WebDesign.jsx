import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import CountUp from 'react-countup';
import PageLoader from '../../components/PageLoader';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

const WebDesign = () => {
  // Scroll and animation setup
  const { scrollYProgress } = useScroll();
  const [isLoading, setIsLoading] = useState(true);
  

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform effects
  const scale = useTransform(smoothProgress, [0, 0.2], [1, 1.5]);
  const opacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const blurValue = useTransform(smoothProgress, [0, 0.2], [0, 10]);
  const parallax1 = useTransform(smoothProgress, [0, 1], [0, -300]);
  const parallax2 = useTransform(smoothProgress, [0, 1], [0, -150]);
  const parallax3 = useTransform(smoothProgress, [0, 1], [0, -75]);

  // Bubble configuration
  const bubbles = Array.from({ length: 50 }, (_, i) => ({
    size: Math.random() * 15 + 5,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    moveRange: Math.random() * 30 + 20,
  }));

  // Web Design specific content
  const features = [
    {
      icon: "🎨",
      title: "Custom Design",
      description: "Unique, tailored designs that reflect your brand identity"
    },
    {
      icon: "📱",
      title: "Responsive Layout",
      description: "Perfect viewing experience across all devices"
    },
    {
      icon: "⚡",
      title: "Fast Performance",
      description: "Optimized for speed and smooth user experience"
    },
    {
      icon: "🔍",
      title: "SEO Ready",
      description: "Built with search engine optimization in mind"
    }
  ];

  const stats = [
    { number: "100", suffix: "+", label: "Websites Designed", duration: 2.5 },
    { number: "95", suffix: "%", label: "Client Satisfaction", duration: 2 },
    { number: "5", suffix: "s", label: "Avg. Load Time", duration: 2 },
    { number: "50", suffix: "+", label: "Awards Won", duration: 2 }
  ];

  // Process Timeline Section
  const processSteps = [
    {
      icon: "🎯",
      title: "Discovery",
      description: "Understanding your brand, goals, and target audience"
    },
    {
      icon: "✏️",
      title: "Design",
      description: "Creating wireframes and visual designs that align with your vision"
    },
    {
      icon: "💻",
      title: "Development",
      description: "Building your website with clean, efficient code"
    },
    {
      icon: "🚀",
      title: "Launch",
      description: "Testing, optimization, and deployment of your website"
    }
  ];

  // Portfolio Showcase
  const portfolioItems = [
    {
      title: "E-Commerce Platform",
      category: "Web Design",
      image: "/portfolio1.jpg"
    },
    {
      title: "Corporate Website",
      category: "UI/UX Design",
      image: "/portfolio2.jpg"
    },
    {
      title: "Mobile App Interface",
      category: "App Design",
      image: "/portfolio3.jpg"
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
    <AnimatePresence>
    {isLoading && <PageLoader />}
    </AnimatePresence>
    <div className="min-h-screen bg-gradient-to-b from-[#19234d] to-[#2b5a9e] overflow-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d9764a] to-[#de7527] origin-left z-50"
        style={{ scaleX: smoothProgress }}
      />

      {/* Enhanced Floating Bubbles */}
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
              background: `radial-gradient(circle at 30% 30%, rgba(217, 118, 74, 0.2), rgba(43, 90, 158, 0.05))`,
              backdropFilter: "blur(2px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 0 15px rgba(217, 118, 74, 0.2)",
            }}
            animate={{
              y: [-bubble.moveRange, bubble.moveRange],
              x: [-bubble.moveRange/2, bubble.moveRange/2],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
              boxShadow: [
                "0 0 15px rgba(217, 118, 74, 0.2)",
                "0 0 25px rgba(217, 118, 74, 0.4)",
                "0 0 15px rgba(217, 118, 74, 0.2)"
              ]
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

      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center"
        style={{
          scale,
          opacity,
          filter: `blur(${blurValue}px)`,
          perspective: "2000px",
          transformStyle: "preserve-3d"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#19234d]/90 to-[#2b5a9e]/90" />
        
        {/* Enhanced Floating Gradient Orbs */}
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
        
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-7xl md:text-9xl font-bold mb-8"
              initial={{ opacity: 0, rotateX: 45 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{ duration: 1, type: "spring" }}
            >
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300 leading-tight filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transform hover:translate-z-10 transition-transform duration-300">
                UI/UX Design
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#d9764a] to-[#de7527] transform hover:translate-z-10 transition-transform duration-300">
                Solutions
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-3xl text-gray-300 max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Creating intuitive and engaging user experiences that drive results
            </motion.p>
            
            {/* Animated scroll indicator */}
            <motion.div 
              className="absolute bottom-15  left-1/2 transform -translate-x-1/2"
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

      {/* Features Section */}
      <section className="py-20 relative z-10">
        <motion.div 
          className="max-w-7xl mx-auto px-4"
          style={{ y: parallax2 }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-center text-white mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ margin: "-100px" }}
          >
            Our Expertise
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative z-10">
        <motion.div 
          className="max-w-7xl mx-auto px-4"
          style={{ y: parallax3 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ margin: "-100px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
              >
                <CountUp 
                  start={0} 
                  end={stat.number} 
                  duration={stat.duration} 
                  separator="," 
                  suffix={stat.suffix}
                  className="text-5xl md:text-6xl font-bold text-white mb-2"
                  useEasing={true}
                  enableScrollSpy={true}
                  scrollSpyOnce={false}
                  scrollSpyDelay={500}
                />
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Process Timeline Section */}
      <section className="py-20 relative z-10">
        <motion.div
          className="max-w-7xl mx-auto px-4"
          style={{ y: parallax2 }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-center text-white mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ margin: "-100px" }}
          >
            Our Process
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Timeline connector */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#d9764a] to-[#de7527] transform -translate-y-1/2 hidden lg:block" />

            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 relative z-10">
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
                {/* Step number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#d9764a] rounded-full flex items-center justify-center text-white font-bold z-20">
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 relative z-10 overflow-hidden">
        <motion.div
          className="max-w-7xl mx-auto px-4"
          style={{ y: parallax3 }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-center text-white mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ margin: "-100px" }}
          >
            Recent Work
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ margin: "-100px" }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[#d9764a] text-sm font-semibold mb-2">{item.category}</span>
                  <h3 className="text-white text-xl font-bold">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
    </>
  );
};

export default WebDesign;
