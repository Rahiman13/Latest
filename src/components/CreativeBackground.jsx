import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random';
import { useRef, useState, useEffect, useMemo, memo, Suspense } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const BackgroundLayer = memo(() => (
  <div 
    className="fixed inset-0 bg-gradient-to-b from-[#19234d] to-[#2b5a9e] -z-50"
    style={{
      willChange: 'transform',
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden'
    }}
  />
));

const CreativeBackground = () => {
  const { scrollYProgress } = useScroll();
  const scrollRef = useRef(null);
  
  // Pre-load animations
  useEffect(() => {
    const preloadAnimations = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.style.willChange = 'transform, opacity';
                observer.unobserve(entry.target);
              }
            });
          },
          { rootMargin: '50%' } // Start preparing 50% before element comes into view
        );
        observer.observe(element);
      });
    };

    preloadAnimations();
    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach(element => {
        element.style.willChange = 'auto';
      });
    };
  }, []);

  return (
    <>
      <BackgroundLayer />
      
      <div className="fixed inset-0 pointer-events-none -z-40">
        {/* 3D Particles Layer */}
        <div className="absolute inset-0" style={{ opacity: 0.6 }}>
          <Canvas camera={{ position: [0, 0, 1] }}>
            <Suspense fallback={null}>
              <ParticleField />
              <MovingLights />
            </Suspense>
          </Canvas>
        </div>

        {/* Optimized Background Elements */}
        <OptimizedBackgroundElements />
        
        {/* Dynamic Grid System */}
        <DynamicGrid />
        
        {/* Professional Glow Effects */}
        <GlowEffects />
      </div>
    </>
  );
};

// Three.js Particle Field
const ParticleField = () => {
  const points = useRef();
  const [sphere] = useState(() => 
    random.inSphere(new Float32Array(5000), { radius: 1.5 })
  );

  useFrame((state, delta) => {
    points.current.rotation.x -= delta / 10;
    points.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={points} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// Animated Lights
const MovingLights = () => {
  const light = useRef();
  const [spring, api] = useSpring(() => ({
    position: [1, 1, 0],
    config: { mass: 2, tension: 200 }
  }));

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    api.start({
      position: [
        Math.sin(time / 2) * 2,
        Math.cos(time / 3) * 2,
        Math.sin(time / 4) * 2
      ]
    });
  });

  return (
    <animated.pointLight
      ref={light}
      position={spring.position}
      intensity={0.8}
      color="#d9764a"
    />
  );
};

// Optimized Background Elements Component
const OptimizedBackgroundElements = memo(() => {
  const elements = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: 100 + Math.random() * 200,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 0.5 + Math.random() * 0.5
    })), []
  );

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      {elements.map(element => (
        <motion.div
          key={element.id}
          className="absolute rounded-full animate-on-scroll"
          style={{
            width: element.size,
            height: element.size,
            left: `${element.x}%`,
            top: `${element.y}%`,
            background: `radial-gradient(circle at 30% 30%, 
              ${element.id % 2 ? 'rgba(217,118,74,0.08)' : 'rgba(43,90,158,0.08)'}, 
              transparent)`,
            willChange: 'transform',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
          initial={{ 
            scale: 0.8,
            opacity: 0 
          }}
          animate={{
            y: [-20 * element.speed, 20 * element.speed],
            x: [-10 * element.speed, 10 * element.speed],
            scale: [1, 1.05, 1],
            opacity: 1
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
            delay: element.id * 0.2
          }}
        />
      ))}
    </div>
  );
});

// Dynamic Grid Component
const DynamicGrid = memo(() => (
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
));

// Glow Effects Component
const GlowEffects = memo(() => (
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
));

// Add this CSS to your global styles
const styles = `
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  .animate-on-scroll.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-on-scroll {
      transition: none;
      opacity: 1;
      transform: none;
    }
  }
`;

export default CreativeBackground;
