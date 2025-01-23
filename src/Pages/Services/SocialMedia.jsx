import React from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimation } from 'framer-motion';
import CountUp from 'react-countup';
import { useEffect, useState } from 'react';
import PageLoader from '../../components/PageLoader';
import { AnimatePresence } from 'framer-motion';

const SocialMedia = () => {
  // Scroll and animation setup
  const { scrollYProgress } = useScroll();
  
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
    { number: "1000", suffix: "+", label: "Social Campaigns", duration: 2.5 },
    { number: "97", suffix: "%", label: "Client Satisfaction", duration: 2 },
    { number: "45", suffix: "M+", label: "Social Reach", duration: 2 },
    { number: "24", suffix: "/7", label: "Support Available", duration: 2 }
  ];

  // Features data
  const features = [
    {
      icon: "📱",
      title: "Social Strategy",
      description: "Custom social media strategies tailored to your brand's voice and goals",
      metrics: { number: "500", suffix: "+", label: "Campaigns Created" }
    },
    {
      icon: "📊",
      title: "Analytics & Insights",
      description: "Deep data analysis and performance tracking for optimal results",
      metrics: { number: "250", suffix: "%", label: "Average ROI" }
    },
    {
      icon: "🎯",
      title: "Audience Targeting",
      description: "Precise audience targeting and engagement strategies",
      metrics: { number: "10", suffix: "M+", label: "Audience Reach" }
    },
    {
      icon: "🚀",
      title: "Growth Acceleration",
      description: "Sustainable social media growth and engagement solutions",
      metrics: { number: "300", suffix: "K+", label: "New Followers" }
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

  const controls = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

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

        {/* Hero Section */}
        <motion.section 
          className="relative min-h-screen flex items-center justify-center"
          style={{
            scale,
            opacity,
            filter: `blur(${blurValue}px)`
          }}
        >
          <div className="absolute inset-0">
            <img 
              src="/images/social-media-hero.jpg"
              alt="Social Media Marketing"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#19234d]/90 to-[#2b5a9e]/90" />
          </div>
          <div className="relative container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="animate-reset"
              animate={controls}
            >
              <h1 className="text-7xl md:text-9xl font-bold mb-8">
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300 leading-tight filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                  Social Media
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#d9764a] to-[#de7527]">
                  Marketing
                </span>
              </h1>
              <p className="text-xl md:text-3xl text-gray-300 max-w-3xl mx-auto mb-12">
                Elevate your brand's social presence with our expert marketing solutions
              </p>
            </motion.div>

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
                  className="text-center animate-reset"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 0.5 }
                  }}
                  viewport={{ amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  animate={controls}
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
              viewport={{ amount: 0.3 }}
            >
              Social Media Platforms
            </motion.h2>

            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.3 }}
            >
              {[
                { icon: "/icons/facebook.svg", name: "Facebook" },
                { icon: "/icons/instagram.svg", name: "Instagram" },
                { icon: "/icons/twitter.svg", name: "Twitter" },
                { icon: "/icons/linkedin.svg", name: "LinkedIn" },
                { icon: "/icons/tiktok.svg", name: "TikTok" },
                { icon: "/icons/youtube.svg", name: "YouTube" },
                { icon: "/icons/pinterest.svg", name: "Pinterest" },
                { icon: "/icons/snapchat.svg", name: "Snapchat" }
              ].map((platform, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-6 flex flex-col items-center animate-reset"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  viewport={{ amount: 0.3 }}
                  animate={controls}
                >
                  <img src={platform.icon} alt={platform.name} className="w-16 h-16 mb-4" />
                  <p className="text-white font-medium">{platform.name}</p>
                </motion.div>
              ))}
            </motion.div>
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
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                  }}
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 mb-6">{feature.description}</p>
                  <div className="border-t border-white/10 pt-4">
                    <CountUp 
                      start={0} 
                      end={parseInt(feature.metrics.number)} 
                      duration={2.5} 
                      separator="," 
                      suffix={feature.metrics.suffix}
                      className="text-3xl font-bold text-white mb-1 block"
                      useEasing={true}
                      enableScrollSpy={true}
                      scrollSpyOnce={false}
                      scrollSpyDelay={500}
                    />
                    <p className="text-sm text-gray-400">{feature.metrics.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
              Our Marketing Process
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: "01", title: "Research", description: "In-depth market and audience analysis" },
                { number: "02", title: "Strategy", description: "Custom social media content strategy" },
                { number: "03", title: "Execution", description: "Content creation and campaign management" },
                { number: "04", title: "Analytics", description: "Performance tracking and optimization" }
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
      </div>
    </>
  );
};

export default SocialMedia;
