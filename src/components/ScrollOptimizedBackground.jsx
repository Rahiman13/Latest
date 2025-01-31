import { useRef, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useThrottledCallback } from 'use-debounce';

const ScrollOptimizedBackground = () => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    smooth: 0.3,
    throttle: 16 // Limit to ~60fps
  });

  // Optimized transform values with spring physics
  const springConfig = { mass: 0.5, stiffness: 100, damping: 20 };
  
  const yPosAnim = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -50]),
    springConfig
  );
  
  const opacityAnim = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0.5]),
    springConfig
  );

  // Memoized background elements
  const backgroundElements = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: 100 + Math.random() * 200,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 0.5 + Math.random() * 0.5
    })), []
  );

  // Throttled animation update
  const updateAnimation = useThrottledCallback(
    (element) => ({
      y: [-20 * element.speed, 20 * element.speed],
      x: [-10 * element.speed, 10 * element.speed],
      scale: [1, 1.05, 1],
    }), 
    100
  );

  // Optimized render function for background elements
  const renderBackgroundElement = useCallback((element) => (
    <motion.div
      key={element.id}
      className="absolute rounded-full will-change-transform"
      style={{
        width: element.size,
        height: element.size,
        left: `${element.x}%`,
        top: `${element.y}%`,
        background: `radial-gradient(circle at 30% 30%, 
          ${element.id % 2 ? 'rgba(217,118,74,0.08)' : 'rgba(43,90,158,0.08)'}, 
          transparent)`,
        translateZ: 0,
        backfaceVisibility: 'hidden'
      }}
      animate={updateAnimation(element)}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
        delay: element.id * 0.2
      }}
    />
  ), [updateAnimation]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Performance optimized container */}
      <motion.div
        ref={scrollRef}
        className="absolute inset-0"
        style={{ 
          y: yPosAnim,
          opacity: opacityAnim,
          translateZ: 0,
          backfaceVisibility: 'hidden'
        }}
      >
        {/* Background Elements */}
        {backgroundElements.map(renderBackgroundElement)}
        
        {/* Optimized gradient overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent to-[#19234d]/20"
          style={{ 
            mixBlendMode: 'multiply',
            willChange: 'opacity',
            translateZ: 0 
          }}
        />
      </motion.div>
    </div>
  );
};

export default ScrollOptimizedBackground; 