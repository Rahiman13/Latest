import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useAnimation } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import PageLoader from '../components/PageLoader';

const Industries = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { scrollYProgress } = useScroll({
        offset: ["start start", "end end"]
    });

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

    // Add bubble configuration
    const bubbles = Array.from({ length: 50 }, (_, i) => ({
        size: Math.random() * 15 + 5,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        moveRange: Math.random() * 30 + 20,
    }));

    const industries = [
        {
            title: "Healthcare",
            description: "Revolutionizing patient care through innovative software solutions, telemedicine platforms, and medical data management systems.",
            image: "/images/healthcare.jpg",
            icon: "🏥"
        },
        {
            title: "Finance & Banking",
            description: "Delivering secure, scalable fintech solutions including mobile banking, payment processing, and blockchain integration.",
            image: "/images/finance.jpg",
            icon: "💰"
        },
        {
            title: "E-commerce",
            description: "Building powerful online retail platforms with seamless user experiences and robust backend systems.",
            image: "/images/ecommerce.jpg",
            icon: "🛍️"
        },
        {
            title: "Education",
            description: "Creating engaging learning management systems and educational tools for remote and hybrid learning environments.",
            image: "/images/education.jpg",
            icon: "📚"
        }
    ];

    // Add ref for stats section
    const statsRef = useRef(null);
    const isInView = useInView(statsRef, { once: true, margin: "-100px" });

    const achievements = [
        {
            number: "98",
            suffix: "%",
            label: "Client Satisfaction",
            duration: 2.5
        },
        {
            number: "250",
            suffix: "+",
            label: "Projects Delivered",
            duration: 2
        },
        {
            number: "15",
            suffix: "+",
            label: "Industry Awards",
            duration: 2
        },
        {
            number: "24",
            suffix: "/7",
            label: "Support Available",
            duration: 2
        },
    ];

    // Add industry milestones
    const industryMilestones = [
        {
            year: 2015,
            description: "Launched our first healthcare management system"
        },
        {
            year: 2018,
            description: "Expanded into fintech with blockchain solutions"
        },
        {
            year: 2020,
            description: "Pioneered remote learning platforms"
        },
        {
            year: 2023,
            description: "Achieved 500+ successful project deliveries"
        }
    ];

    const controls = useAnimation();

    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        whileInView: { 
            opacity: 1, 
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 0.5
            }
        }
    };

    const staggerContainer = {
        initial: { opacity: 0 },
        whileInView: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const floatingAnimation = {
        initial: { y: 0 },
        animate: {
            y: [-20, 20],
            transition: {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
            }
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const elements = document.querySelectorAll('.animate-section');
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
        // Add smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';

        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
        };
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

                {/* Hero Section */}
                <motion.section
                    className="relative min-h-screen flex items-center justify-center overflow-hidden"
                    style={{
                        scale: heroScale,
                        y: heroY,
                        opacity: heroOpacity,
                        filter: `blur(${heroBlur}px)`,
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#19234d]/90 to-[#2b5a9e]/90" />
                    
                    {/* Add floating elements */}
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full mix-blend-overlay"
                            style={{
                                width: `${200 + i * 100}px`,
                                height: `${200 + i * 100}px`,
                                border: '1px solid rgba(255,255,255,0.1)',
                                left: `${20 + i * 10}%`,
                                top: `${20 + i * 5}%`,
                            }}
                            animate={{
                                rotate: 360,
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 15 + i * 5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    ))}

                    <div className="relative container mx-auto px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 20,
                                mass: 0.5
                            }}
                        >
                            <motion.h1 
                                className="text-7xl md:text-9xl font-bold mb-8"
                                style={{ y: parallax1 }}
                                whileInView={{
                                    textShadow: [
                                        "0 0 10px rgba(255,255,255,0.3)",
                                        "0 0 20px rgba(255,255,255,0.5)",
                                        "0 0 10px rgba(255,255,255,0.3)"
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300 leading-tight">
                                    Industries
                                </span>
                            </motion.h1>
                            <motion.p 
                                className="text-xl md:text-3xl text-gray-300 max-w-3xl mx-auto mb-12"
                                style={{ y: parallax2 }}
                                variants={fadeInUp}
                            >
                                Transforming businesses across sectors with innovative digital solutions
                            </motion.p>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Industries Grid */}
                <section className="py-20 px-4">
                    <motion.div
                        className="max-w-7xl mx-auto"
                        style={{ y: parallax2 }}
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                    >
                        <motion.div className="grid md:grid-cols-2 gap-8">
                            {industries.map((industry, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10"
                                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                    whileInView={{ 
                                        opacity: 1, 
                                        scale: 1, 
                                        y: 0,
                                        transition: {
                                            type: "spring",
                                            stiffness: 100,
                                            damping: 20,
                                            delay: index * 0.2
                                        }
                                    }}
                                    whileHover={{
                                        y: -10,
                                        scale: 1.02,
                                        transition: {
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 25
                                        }
                                    }}
                                >
                                    <div className="relative overflow-hidden group">
                                        <motion.img
                                            src={industry.image}
                                            alt={industry.title}
                                            className="w-full h-64 object-cover transition-transform duration-700 ease-out"
                                            whileHover={{ 
                                                scale: 1.1,
                                                transition: { duration: 0.6 }
                                            }}
                                        />
                                        <motion.div 
                                            className="absolute inset-0 bg-gradient-to-t from-[#19234d] via-transparent to-transparent opacity-60"
                                            whileHover={{ opacity: 0.8 }}
                                        />
                                    </div>
                                    <div className="p-8">
                                        <motion.div
                                            className="text-5xl mb-6"
                                            variants={floatingAnimation}
                                            initial="initial"
                                            animate="animate"
                                        >
                                            {industry.icon}
                                        </motion.div>
                                        <h3 className="text-2xl font-bold text-white mb-4">{industry.title}</h3>
                                        <p className="text-gray-300">{industry.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </section>

                {/* Stats Section - Updated with scroll trigger */}
                <section className="py-20 relative z-10" ref={statsRef}>
                    <motion.div
                        className="max-w-7xl mx-auto px-4"
                        style={{ y: parallax2 }}
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {achievements.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="text-center"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{
                                        opacity: 1,
                                        scale: 1,
                                        transition: {
                                            type: "spring",
                                            stiffness: 100,
                                            damping: 15,
                                            mass: 0.1
                                        }
                                    }}
                                    viewport={{ amount: 0.3 }}
                                    whileHover={{
                                        scale: 1.1,
                                        rotate: [0, 5, -5, 0],
                                        transition: {
                                            duration: 0.5,
                                            type: "spring",
                                            stiffness: 200
                                        }
                                    }}
                                >
                                    <CountUp
                                        start={0}
                                        end={parseInt(stat.number)}
                                        duration={2.5}
                                        separator=","
                                        suffix={stat.suffix}
                                        className="text-5xl md:text-6xl font-bold text-white mb-2"
                                        enableScrollSpy
                                        scrollSpyOnce={false}
                                    />
                                    <p className="text-gray-300">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Industry History Section */}
                <section className="py-20 px-4">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            className="grid md:grid-cols-2 gap-12 items-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ amount: 0.3 }}
                            animate={controls}
                        >
                            <div>
                                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                                    Industry
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#d9764a] to-[#de7527]">
                                        Expertise
                                    </span>
                                </h2>
                                <p className="text-xl text-gray-300 mb-6">
                                    Our journey in transforming industries through innovative solutions has been marked by significant milestones and achievements.
                                </p>
                                <div className="space-y-4">
                                    {industryMilestones.map((milestone, index) => (
                                        <motion.div
                                            key={milestone.year}
                                            className="flex items-start gap-4"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.2 }}
                                        >
                                            <span className="text-[#d9764a] font-bold text-xl">{milestone.year}</span>
                                            <p className="text-gray-300">{milestone.description}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative">
                                <motion.div
                                    className="rounded-2xl overflow-hidden shadow-2xl"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                                        alt="Industry Evolution"
                                        className="w-full h-auto"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#19234d] via-transparent to-transparent opacity-60" />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Industry Solutions Grid */}
                <section className="py-20 px-4">
                    <motion.div
                        className="max-w-7xl mx-auto"
                        style={{ y: parallax3 }}
                    >
                        <motion.h2
                            className="text-5xl md:text-6xl font-bold text-center text-white mb-16"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ amount: 0.3 }}
                            animate={controls}
                        >
                            Our Solutions
                        </motion.h2>
                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                            viewport={{ amount: 0.3 }}
                            animate={controls}
                        >
                            {[
                                {
                                    title: "Digital Transformation",
                                    description: "End-to-end digital solutions for modern businesses",
                                    icon: "🚀",
                                    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500"
                                },
                                {
                                    title: "Cloud Integration",
                                    description: "Seamless cloud solutions for scalable operations",
                                    icon: "☁️",
                                    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500"
                                },
                                {
                                    title: "AI & Machine Learning",
                                    description: "Intelligent solutions for automated processes",
                                    icon: "🤖",
                                    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500"
                                }
                            ].map((solution, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10"
                                    variants={{
                                        hidden: { opacity: 0, y: 50 },
                                        show: { opacity: 1, y: 0 }
                                    }}
                                    whileHover={{
                                        y: -10,
                                        scale: 1.02,
                                        boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                                    }}
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <motion.img
                                            src={solution.image}
                                            alt={solution.title}
                                            className="w-full h-full object-cover"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.6 }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#19234d] via-transparent to-transparent opacity-60" />
                                    </div>
                                    <div className="p-6">
                                        <motion.div
                                            className="text-4xl mb-4"
                                            whileHover={{ scale: 1.2, rotate: 5 }}
                                        >
                                            {solution.icon}
                                        </motion.div>
                                        <h3 className="text-xl font-bold text-white mb-2">{solution.title}</h3>
                                        <p className="text-gray-300">{solution.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </section>

                {/* Call to Action */}
                <section className="pt-20 pb-10 px-4 mt-24">
                    <motion.div
                        className="max-w-7xl mx-auto"
                        style={{ y: parallax1 }}
                    >
                        <motion.div
                            className="bg-gradient-to-r from-[#d9764a] to-[#de7527] rounded-2xl p-12 text-center"
                            whileHover={{ scale: 1.02 }}
                        >
                            <h2 className="text-4xl font-bold text-white mb-6">
                                Ready to Transform Your Industry?
                            </h2>
                            <p className="text-xl text-white/90 mb-8">
                                Let's discuss how we can help your business thrive in the digital age.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-[#d9764a] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
                                onClick={() => window.location.href = '/contact'}
                            >
                                Contact Us Today
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </section>
            </div>
        </>
    );
};

export default Industries;
