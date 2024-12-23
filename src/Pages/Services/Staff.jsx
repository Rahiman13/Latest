import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import CountUp from 'react-countup';

const Staff = () => {
  const { scrollYProgress } = useScroll();
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 15,
    mass: 0.1
  });

  const scale = useTransform(smoothProgress, [0, 0.15], [1, 1.5]);
  const yMove = useTransform(smoothProgress, [0, 0.15], [0, 500]);
  const opacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const blurValue = useTransform(smoothProgress, [0, 0.15], [0, 10]);

  const features = [
    {
      title: "Expert Talent Pool",
      description: "Access to highly skilled professionals across various tech domains",
      icon: "👥"
    },
    {
      title: "Flexible Hiring",
      description: "Choose from temporary, permanent, or project-based staffing solutions",
      icon: "⚡"
    },
    {
      title: "Verified Professionals",
      description: "Pre-vetted candidates with proven expertise and experience",
      icon: "✓"
    }
  ];

  const processSteps = [
    {
      title: "Requirements Analysis",
      description: "We understand your staffing needs and project requirements",
      icon: "📋",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
    },
    {
      title: "Candidate Selection",
      description: "Rigorous screening and selection of qualified professionals",
      icon: "🎯",
      image: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a"
    },
    {
      title: "Team Integration",
      description: "Smooth onboarding and integration with your existing team",
      icon: "🤝",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c"
    }
  ];

  // Enhanced parallax effects
  const parallax1 = useTransform(smoothProgress, [0, 1], [0, -200]);
  const parallax2 = useTransform(smoothProgress, [0, 1], [0, -100]);
  const parallax3 = useTransform(smoothProgress, [0, 1], [0, -50]);

  // Add floating bubbles configuration
  const bubbles = Array.from({ length: 50 }, (_, i) => ({
    size: Math.random() * 15 + 5,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    moveRange: Math.random() * 30 + 20,
  }));

  // Add stats data
  const stats = [
    { 
      number: "500", 
      suffix: "+",
      label: "Experts Placed",
      duration: 2.5
    },
    { 
      number: "95", 
      suffix: "%",
      label: "Retention Rate",
      duration: 2
    },
    { 
      number: "48", 
      suffix: "h",
      label: "Avg. Placement Time",
      duration: 2
    },
    { 
      number: "30", 
      suffix: "+",
      label: "Industries Served",
      duration: 2
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#19234d] to-[#2b5a9e] overflow-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d9764a] to-[#de7527] origin-left z-50"
        style={{ scaleX: smoothProgress }}
      />

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

      {/* Updated Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center"
        style={{
          scale,
          opacity,
          filter: `blur(${blurValue}px)`,
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
                Expert Staff
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#d9764a] to-[#de7527]">
                Solutions
              </span>
            </h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Build your dream team with our expert staffing solutions. Access top talent 
              for your technology needs.
            </motion.p>

            {/* CTA Buttons */}
            {/* <motion.div 
              className="flex flex-wrap gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.button 
                className="bg-gradient-to-r from-[#d9764a] to-[#de7527] text-white px-10 py-4 rounded-full text-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Hire Talent
              </motion.button>
              <motion.button 
                className="bg-white/10 backdrop-blur-lg text-white px-10 py-4 rounded-full text-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div> */}
          </motion.div>
        </div>
      </motion.section>

      {/* New Stats Section */}
      <section className="py-20 relative z-10">
        <motion.div 
          className="max-w-7xl mx-auto px-4"
          style={{ y: parallax2 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, 5, -5, 0],
                  transition: { duration: 0.5 }
                }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  bounce: 0.4
                }}
              >
                <CountUp 
                  start={0} 
                  end={stat.number} 
                  duration={stat.duration} 
                  separator="," 
                  suffix={stat.suffix}
                  className="text-5xl md:text-6xl font-bold text-white mb-2"
                />
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Update Features Section styling */}
      <motion.section className="py-20 relative">
        <motion.div 
          className="max-w-7xl mx-auto"
          style={{ y: parallax3 }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-center text-white mb-16"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Why Choose Our Staffing
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
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
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
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
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Process Section - Updated with enhanced animations */}
      <motion.section 
        className="py-20 relative"
        style={{ y: parallax3 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-center text-white mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Hiring Process
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
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
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Staff;
