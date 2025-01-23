import React from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useAnimation } from 'framer-motion';
import CountUp from 'react-countup';
import PageLoader from '../../components/PageLoader';
import { useEffect, useState } from 'react';


const WebDev = () => {
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      // Reset animations when elements are out of view
      const elements = document.querySelectorAll('.animate-reset');
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isOutOfView = rect.bottom < 0 || rect.top > window.innerHeight;
        if (isOutOfView) {
          controls.start("hidden");
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

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

  // Stats data
  const stats = [
    { number: "500", suffix: "+", label: "Projects Completed", duration: 2.5 },
    { number: "99", suffix: "%", label: "Client Satisfaction", duration: 2 },
    { number: "85", suffix: "%", label: "Faster Development", duration: 2 },
    { number: "24", suffix: "/7", label: "Support Available", duration: 2 }
  ];

  // Features data
  const features = [
    {
      icon: "⚡",
      title: "High Performance",
      description: "Optimized code for maximum speed and efficiency"
    },
    {
      icon: "🛠️",
      title: "Scalable Solutions",
      description: "Built to grow with your business needs"
    },
    {
      icon: "🔒",
      title: "Secure Code",
      description: "Enterprise-grade security implementations"
    },
    {
      icon: "📱",
      title: "Cross-Platform",
      description: "Works seamlessly across all devices"
    }
  ];

  // Bubble configuration
  const bubbles = Array.from({ length: 50 }, (_, i) => ({
    size: Math.random() * 15 + 5,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    moveRange: Math.random() * 30 + 20,
  }));

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

      {/* Add Floating Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-[#d9764a]/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ top: '20%', left: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ bottom: '20%', right: '10%' }}
        />
      </div>

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

      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center"
        style={{
          scale,
          opacity,
          filter: `blur(${blurValue}px)`,
          rotateX: useTransform(smoothProgress, [0, 1], [0, 360])
        }}
      >
        <div className="absolute inset-0">
          <img 
            src="/images/webdev-hero.jpg"
            alt="Web Development"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#19234d]/90 to-[#2b5a9e]/90" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="animate-reset"
            animate={controls}
          >
            <h1 className="text-7xl md:text-9xl font-bold mb-8">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300 leading-tight filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                Web Development
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#d9764a] to-[#de7527]">
                Solutions
              </span>
            </h1>
            <p className="text-xl md:text-3xl text-gray-300 max-w-3xl mx-auto mb-12">
              Building powerful, scalable web applications for the modern digital world
            </p>
            
            {/* Add Animated scroll indicator */}
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

      {/* Stats Section */}
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
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CountUp 
                  start={0} 
                  end={stat.number} 
                  duration={stat.duration} 
                  separator="," 
                  suffix={stat.suffix}
                  className="text-5xl md:text-6xl font-bold text-white mb-2"
                  enableScrollSpy={true}
                  scrollSpyOnce={false}
                  scrollSpyDelay={0}
                />
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative z-10">
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
            Our Expertise
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
            viewport={{ margin: "-100px" }}
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
                }}
              >
                <motion.div 
                  className="text-5xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 relative z-10 overflow-hidden">
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
            Technologies We Use
          </motion.h2>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ margin: "-100px" }}
          >
            {[
              { icon: "/icons/react.svg", name: "React" },
              { icon: "/icons/node.svg", name: "Node.js" },
              { icon: "/icons/python.svg", name: "Python" },
              { icon: "/icons/aws.svg", name: "AWS" },
              { icon: "/icons/mongodb.svg", name: "MongoDB" },
              { icon: "/icons/docker.svg", name: "Docker" },
              { icon: "/icons/typescript.svg", name: "TypeScript" },
              { icon: "/icons/nextjs.svg", name: "Next.js" }
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <img src={tech.icon} alt={tech.name} className="w-16 h-16 mb-4" />
                <p className="text-white font-medium">{tech.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Process Section */}
      <section className="py-20 relative z-10">
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
            Our Development Process
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "01", title: "Planning", description: "Detailed project scope and requirements analysis" },
              { number: "02", title: "Design", description: "Creating intuitive and responsive UI/UX designs" },
              { number: "03", title: "Development", description: "Clean, efficient, and scalable code implementation" },
              { number: "04", title: "Launch", description: "Thorough testing and seamless deployment" }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative p-8 border border-white/10 rounded-2xl"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-6xl font-bold text-white/10 absolute -top-8 -left-4">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Let's transform your ideas into reality with cutting-edge web development solutions.
          </p>
          <motion.button
            className="bg-gradient-to-r from-[#d9764a] to-[#de7527] text-white px-8 py-4 rounded-full text-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </section>
    </div>
    </>
  );
};

export default WebDev;
