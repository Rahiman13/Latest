import React from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimation } from 'framer-motion';
import CountUp from 'react-countup';
import { useEffect, useState } from 'react';
import PageLoader from '../../components/PageLoader';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Staff = () => {
  const navigate = useNavigate();
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

  // Optimized transformations
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.1]);
  const heroY = useTransform(smoothProgress, [0, 0.2], [0, 100]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroBlur = useTransform(smoothProgress, [0, 0.15], [0, 4]);

  // Smoother parallax
  const parallax1 = useTransform(smoothProgress, [0, 1], [0, -200]);
  const parallax2 = useTransform(smoothProgress, [0, 1], [0, -150]);
  const parallax3 = useTransform(smoothProgress, [0, 1], [0, -75]);

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

  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
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

        {/* Animated circles */}
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

        {/* Hero Section */}
        <motion.section
          className="relative min-h-screen flex items-center justify-center"
          style={{
            scale: heroScale,
            y: heroY,
            opacity: heroOpacity,
            filter: `blur(${heroBlur}px)`,
          }}
        >
          <div className="absolute inset-0">
            <img
              src="/images/staffing-hero.jpg"
              alt="Staffing Solutions"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#19234d]/90 to-[#2b5a9e]/90" />
          </div>
          <div className="relative container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-7xl md:text-9xl font-bold mb-8">
                <motion.span
                  className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300 leading-tight filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.5 }}
                  transition={{ duration: 0.3 }}
                >
                  Expert Staff
                </motion.span>
                <motion.span
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-[#d9764a] to-[#de7527]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.5 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  Solutions
                </motion.span>
              </h1>
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Build your dream team with our expert staffing solutions. Access top talent
              for your technology needs.
            </motion.p>

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
                  className="text-center relative group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.5 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  <CountUp
                    start={0}
                    end={stat.number}
                    duration={2}
                    separator=","
                    suffix={stat.suffix}
                    className="text-5xl md:text-6xl font-bold text-white mb-2"
                    enableScrollSpy={true}
                    scrollSpyOnce={false}
                  />
                  <p className="text-gray-300">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Features Section - Update to match AppDev styling */}
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
              Our Hiring Process
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden"
                  initial={{ opacity: 0, y: 50, x: -50 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ margin: "-100px" }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{
                    scale: 1.02,
                    y: -10,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="relative h-48">
                    <motion.img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <motion.div
                      className="absolute top-4 left-4 bg-white/10 backdrop-blur-lg rounded-full w-12 h-12 flex items-center justify-center text-2xl"
                      whileHover={{
                        rotate: 360,
                        scale: 1.1,
                        transition: { duration: 0.6 }
                      }}
                    >
                      {step.icon}
                    </motion.div>
                    <motion.div
                      className="absolute -top-8 -left-4 text-6xl font-bold text-white/10"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.3 }}
                    >
                      {(index + 1).toString().padStart(2, '0')}
                    </motion.div>
                  </div>
                  <motion.div
                    className="p-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.3 + 0.2 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Add CTA Section */}
        <section className="py-20 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto px-4 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to Build Your Team?
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Let's find the perfect talent for your organization.
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

export default Staff;
