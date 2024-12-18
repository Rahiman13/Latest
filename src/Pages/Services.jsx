import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

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

    // Services data (reused from Home page)
    const services = [
        {
            icon: "💻",
            title: "Custom Software Development",
            description: "Tailored solutions to meet your specific business needs and challenges."
        },
        {
            icon: "🌐",
            title: "Web Development",
            description: "Modern, responsive websites and web applications built with cutting-edge technologies."
        },
        // ... other services
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

    // Add new data for additional sections
    const serviceStats = [
        { number: "500+", label: "Projects Delivered" },
        { number: "95%", label: "Client Satisfaction" },
        { number: "50+", label: "Expert Developers" },
        { number: "24/7", label: "Support Available" },
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
                                    {stat.number}
                                </motion.h3>
                                <p className="text-gray-300">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Services Grid with Enhanced Animations */}
            <section className="relative z-10 py-20 px-4 md:px-6">
                <motion.div
                    className="max-w-7xl mx-auto"
                    style={{ y: parallax3 }}
                >
                    <motion.h2
                        className="text-5xl md:text-6xl font-bold text-center text-white mb-16"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        What We Offer
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                className="group relative backdrop-blur-lg bg-white/5 p-8 rounded-2xl overflow-hidden border border-white/10"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{
                                    y: -10,
                                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative z-10">
                                    <motion.div
                                        className="text-6xl mb-6"
                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                    >
                                        {service.icon}
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                                    <p className="text-gray-300">{service.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Process Section */}
            <section className="py-20 mt-20 px-4">
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
