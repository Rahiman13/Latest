import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll({
    // Measure all scrollable content
    container: typeof window !== "undefined" ? document.documentElement : null,
    offset: ["start start", "end end"]
  });
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,  // Increased for faster response
    damping: 30,
    restDelta: 0.001,
    mass: 0.1
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#d9764a] via-[#de7527] to-[#d9764a] origin-left z-[9999]"
      style={{ 
        scaleX,
        transformOrigin: "0%",
        willChange: "transform",
        backgroundSize: "200% 100%"
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

export default ScrollProgress; 