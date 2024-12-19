import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import CountUp from 'react-countup';

const Services = () => {
    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const scale = useTransform(smoothProgress, [0, 0.2], [1, 1.5]);
    const opacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
    const blurValue = useTransform(smoothProgress, [0, 0.2], [0, 10]);

    const parallax1 = useTransform(smoothProgress, [0, 1], [0, -300]);
    const parallax2 = useTransform(smoothProgress, [0, 1], [0, -150]);
    const parallax3 = useTransform(smoothProgress, [0, 1], [0, -75]);

    // Updated services data with detailed content from HTML files
    const services = [
        {
            icon: "💻",
            title: "Web Development",
            description: "End-to-end web programming solutions with cutting-edge technology.",
            details: {
                image: "/assets/images/resources/web-development.jpg",
                features: [
                    "Supply chain management web apps",
                    "Online services applications",
                    "Web portals",
                    "Custom CMS solutions"
                ],
                additionalInfo: "Our skilled web app development services offer both front-end and back-end solutions with user-friendly interfaces."
            }
        },
        {
            icon: "🎨",
            title: "UI/UX Design",
            description: "Creating intuitive and engaging user experiences.",
            details: {
                image: "/assets/images/resources/ui-design.jpg",
                features: [
                    "Research",
                    "Storyboarding",
                    "Sketching",
                    "Wireframes",
                    "Visual Design"
                ],
                additionalInfo: "Our User Experience Design process has proven itself time and time again with a systematic approach to each project."
            }
        },
        {
            icon: "📱",
            title: "App Development",
            description: "Native and hybrid mobile solutions for iOS and Android.",
            details: {
                image: "/assets/images/resources/app-development.jpg",
                features: [
                    "Native iOS / Android Development",
                    "Hybrid App Development",
                    "App Testing",
                    "App Maintenance"
                ],
                additionalInfo: "Comprehensive mobile app development services from concept to deployment and maintenance."
            }
        },
        {
            icon: "📢",
            title: "Digital Marketing",
            description: "Strategic online marketing solutions for business growth.",
            details: {
                image: "/assets/images/resources/digital-marketing.jpg",
                features: [
                    "SEO Services",
                    "Lead Generation",
                    "Affiliate Marketing",
                    "Brand Promotion"
                ],
                additionalInfo: "We deliver the best by focusing on PPC, Conversion Optimization, Social Media, and SEO strategies."
            }
        }
    ];

    // Enhanced bubble configuration (reused from Home page)
    const bubbles = Array.from({ length: 50 }, (_, i) => ({
        size: Math.random() * 15 + 5,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        moveRange: Math.random() * 30 + 20,
    }));

    // Stats data with animation values
    const serviceStats = [
        { 
            number: 500,
            suffix: "+",
            label: "Projects Delivered",
            duration: 2.5
        },
        { 
            number: 95,
            suffix: "%",
            label: "Client Satisfaction",
            duration: 2
        },
        { 
            number: 50,
            suffix: "+",
            label: "Expert Developers",
            duration: 2
        },
        { 
            number: 24,
            suffix: "/7",
            label: "Support Available",
            duration: 1.5
        }
    ];

    const processSteps = [
        {
            title: "Discovery",
            description: "Understanding your needs and project requirements",
            icon: "🔍"
        },
        {
            title: "Planning",
            description: "Creating detailed roadmap and technical specifications",
            icon: "📋"
        },
        {
            title: "Development",
            description: "Building your solution with cutting-edge technologies",
            icon: "💻"
        },
        {
            title: "Launch",
            description: "Deploying and maintaining your project",
            icon: "🚀"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#19234d] to-[#2b5a9e] overflow-hidden">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d9764a] to-[#de7527] origin-left z-50"
                style={{ scaleX: smoothProgress }}
            />

            {/* Floating Bubbles Container */}
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

            {/* Enhanced Hero Section */}
            <motion.section
                className="relative min-h-screen flex items-center justify-center"
                style={{
                    scale,
                    opacity,
                    filter: `blur(${blurValue}px)`
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
                                Our Services
                            </span>
                        </h1>
                        <p className="text-xl md:text-3xl text-gray-300 max-w-3xl mx-auto mb-12">
                            Innovative solutions for your digital transformation journey
                        </p>

                        {/* Animated scroll indicator */}
                        <motion.div
                            className="absolute bottom-[1px] left-1/2 transform -translate-x-1/2"
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

            {/* Enhanced Stats Section with Animations */}
            <section className="py-20 relative z-10">
                <motion.div
                    className="max-w-7xl mx-auto px-4"
                    style={{ y: parallax2 }}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {serviceStats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="text-center"
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                    type: "spring",
                                    bounce: 0.4
                                }}
                            >
                                <motion.h3
                                    className="text-5xl md:text-6xl font-bold text-white mb-2"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <CountUp
                                        end={stat.number}
                                        duration={stat.duration}
                                        suffix={stat.suffix}
                                        enableScrollSpy
                                        scrollSpyOnce
                                    />
                                </motion.h3>
                                <p className="text-gray-300">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Zigzag Service Sections */}
            {services.map((service, index) => (
                <motion.section
                    key={index}
                    className="relative py-20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="max-w-7xl mx-auto px-4">
                        <div className={`grid md:grid-cols-2 gap-16 items-center ${index % 2 === 0 ? '' : 'md:grid-flow-dense'}`}>
                            {/* Image Column */}
                            <motion.div
                                className={`relative ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}
                                initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
                                    <img
                                        src={service.details.image}
                                        alt={service.title}
                                        className="w-full h-[500px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                                </div>
                            </motion.div>

                            {/* Content Column */}
                            <motion.div
                                className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}
                                initial={{ x: index % 2 === 0 ? 100 : -100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                <div className="space-y-8">
                                    <motion.div
                                        className="text-7xl"
                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                    >
                                        {service.icon}
                                    </motion.div>
                                    
                                    <div>
                                        <h3 className="text-4xl font-bold text-white mb-4">{service.title}</h3>
                                        <p className="text-gray-300 text-lg leading-relaxed">{service.description}</p>
                                    </div>
                                    
                                    {/* Features List */}
                                    <div className="space-y-4">
                                        {service.details.features.map((feature, idx) => (
                                            <motion.div
                                                key={idx}
                                                className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-lg p-3"
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.1 }}
                                                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                            >
                                                <span className="text-green-400 text-xl">✓</span>
                                                <span className="text-gray-200">{feature}</span>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <p className="text-gray-400 italic border-l-4 border-[#d9764a] pl-4">
                                        {service.details.additionalInfo}
                                    </p>

                                    <motion.button
                                        className="px-8 py-4 bg-gradient-to-r from-[#d9764a] to-[#de7527] rounded-full text-white font-semibold shadow-lg hover:shadow-[#d9764a]/50 transition-shadow"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Learn More
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>
            ))}

            {/* Process Section */}
            <section className="py-10 mt-56 px-4">
                <motion.div
                    className="max-w-7xl mx-auto"
                    style={{ y: parallax1 }}
                >
                    <motion.h2
                        className="text-5xl md:text-6xl font-bold text-center text-white mb-16"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        Our Process
                    </motion.h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                className="relative"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                                    <motion.div
                                        className="text-5xl mb-6"
                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                    >
                                        {step.icon}
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                                    <p className="text-gray-300">{step.description}</p>
                                </div>
                                {index < processSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 border-t-2 border-r-2 border-white/20 transform rotate-45" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Services;
