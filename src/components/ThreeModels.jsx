import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useGLTF, Text3D } from '@react-three/drei'
import { motion } from 'framer-motion'
import { motion as motion3d } from 'framer-motion-3d'
import * as THREE from 'three'
import { useRef, useState, useEffect } from 'react'

// Update TextWithFallback component
const TextWithFallback = ({ children, ...props }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/fonts/helvetiker_regular.typeface.json')
      .then(response => response.json())
      .then(() => setFontLoaded(true))
      .catch(() => setError(true));
  }, []);

  if (error || !fontLoaded) return null;

  
  return (
    <Text3D {...props}>
      {children}
      <meshStandardMaterial color="white" />
    </Text3D>
  );
};

// Hero Section Model - Digital Transformation Theme
export const HeroModel = () => {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

      <motion3d.group
        animate={{
          rotateY: [0, Math.PI * 2],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Digital World Sphere */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial
            color="#2b5a9e"
            wireframe={true}
            emissive="#d9764a"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Orbiting Data Points */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion3d.mesh
            key={i}
            position={[
              Math.cos(i * 0.5) * 3,
              Math.sin(i * 0.5) * 3,
              0
            ]}
            animate={{
              z: [-2, 2, -2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2 + i * 0.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#d9764a" emissive="#d9764a" />
          </motion3d.mesh>
        ))}
      </motion3d.group>
    </Canvas>
  )
}

// Services Section Model - Interactive Service Cubes
export const ServicesModel = () => {
  const cubeRefs = useRef([])

  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      <motion3d.group>
        {[
          { position: [-2, 0, 0], color: "#d9764a", label: "Web" },
          { position: [0, 0, 0], color: "#2b5a9e", label: "Mobile" },
          { position: [2, 0, 0], color: "#de7527", label: "Cloud" }
        ].map((service, i) => (
          <motion3d.group
            key={i}
            position={service.position}
            animate={{
              y: [0, 0.5, 0],
              rotateY: [0, Math.PI * 2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5
            }}
          >
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial
                color={service.color}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            <TextWithFallback
              position={[0, 1.2, 0]}
              size={0.2}
            >
              {service.label}
            </TextWithFallback>
          </motion3d.group>
        ))}
      </motion3d.group>
    </Canvas>
  )
}

// Features Section Model - Interactive Floating Features
export const FeaturesModel = () => {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

      <motion3d.group>
        {/* Central Core */}
        <mesh>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial
            color="#2b5a9e"
            wireframe={true}
            emissive="#d9764a"
          />
        </mesh>

        {/* Orbiting Feature Indicators */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion3d.group
            key={i}
            animate={{
              rotateZ: [0, Math.PI * 2],
              rotateY: [0, Math.PI]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: i * 0.5
            }}
          >
            <mesh position={[Math.cos(i * Math.PI/3) * 2, Math.sin(i * Math.PI/3) * 2, 0]}>
              <torusGeometry args={[0.2, 0.05, 16, 32]} />
              <meshStandardMaterial color="#d9764a" emissive="#d9764a" />
            </mesh>
          </motion3d.group>
        ))}
      </motion3d.group>
    </Canvas>
  )
}

// Process Section Model - Connected Steps
export const ProcessModel = () => {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

      <motion3d.group>
        {[0, 1, 2, 3].map((step, i) => (
          <motion3d.group
            key={i}
            position={[(i - 1.5) * 2, 0, 0]}
            animate={{
              y: [0, 0.5, 0],
              rotateY: [0, Math.PI * 2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5
            }}
          >
            {/* Step Node */}
            <mesh>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#d9764a" : "#2b5a9e"}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>

            {/* Connection Line */}
            {i < 3 && (
              <mesh position={[1, 0, 0]}>
                <boxGeometry args={[1, 0.05, 0.05]} />
                <meshStandardMaterial color="#de7527" />
              </mesh>
            )}
          </motion3d.group>
        ))}
      </motion3d.group>
    </Canvas>
  )
}

export { TextWithFallback }; 