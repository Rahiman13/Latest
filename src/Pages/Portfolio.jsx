import React, { useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';

const Portfolio = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [hoveredProject, setHoveredProject] = useState(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    // Scroll progress tracking
    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Create scroll-based transformations
    const scale = useTransform(smoothProgress, [0, 0.2], [1, 1.5]);
    const opacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
    const blurValue = useTransform(smoothProgress, [0, 0.2], [0, 10]);

    // Parallax effects
    const parallax1 = useTransform(smoothProgress, [0, 1], [0, -300]);
    const parallax2 = useTransform(smoothProgress, [0, 1], [0, -150]);
    const parallax3 = useTransform(smoothProgress, [0, 1], [0, -75]);

    // Add new transform effects
    const rotateX = useTransform(smoothProgress, [0, 1], [0, 360]);
    const textGradient = useTransform(smoothProgress, [0, 1], ["0deg", "360deg"]);
    const textWave = useTransform(smoothProgress, [0, 0.5, 1], [-20, 0, -20]);
    const backgroundOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.5, 0.8, 0.5]);

    // Enhanced fadeInUp animation
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, type: "spring", stiffness: 100 }
    };

    // Add hover animations for stats
    const statHover = {
        scale: 1.1,
        rotate: [0, 5, -5, 0],
        transition: { duration: 0.5 }
    };

    // Add bubble configuration
    const bubbles = Array.from({ length: 50 }, (_, i) => ({
        size: Math.random() * 15 + 5,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        moveRange: Math.random() * 30 + 20,
    }));

    // Portfolio statistics
    const stats = [
        {
            number: 150,
            suffix: "+",
            label: "Projects Completed",
            duration: 2.5
        },
        {
            number: 98,
            suffix: "%",
            label: "Client Satisfaction",
            duration: 2
        },
        {
            number: 25,
            suffix: "+",
            label: "Industry Awards",
            duration: 2
        },
        {
            number: 10,
            suffix: "M+",
            label: "Revenue Generated",
            duration: 2
        }
    ];

    // Categories
    const categories = ["All", "Web Development", "Mobile Development", "Machine Learning", "UI/UX Design"];

    // Projects data
    const projects = [
        {
            title: "E-Commerce Platform",
            category: "Web Development",
            description: "Full-stack e-commerce solution with real-time inventory management",
            image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
            technologies: ["React", "Node.js", "MongoDB", "AWS"],
            stats: {
                users: "50K+",
                transactions: "100K+",
                uptime: "99.9%"
            }
        },
        {
            title: "Mobile Banking App",
            category: "Mobile Development",
            description: "Secure and intuitive mobile banking solution",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
            technologies: ["React Native", "Firebase", "Node.js"],
            stats: {
                downloads: "500K+",
                rating: "4.8",
                transactions: "5M+"
            }
        },
        {
            title: "AI Analytics Platform",
            category: "Machine Learning",
            description: "Advanced analytics platform powered by machine learning",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
            technologies: ["Python", "TensorFlow", "AWS"],
            stats: {
                accuracy: "98%",
                predictions: "1M+",
                users: "10K+"
            }
        }
    ];

    // Filter projects based on selected category
    const filteredProjects = selectedCategory === "All"
        ? projects
        : projects.filter(project => project.category === selectedCategory);

    // Add testimonials data
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "CEO, TechStart",
            content: "The team delivered exceptional results that exceeded our expectations.",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            rating: 5
        },
        {
            name: "Michael Chen",
            role: "CTO, InnovateCorp",
            content: "Outstanding technical expertise and professional delivery.",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
            rating: 5
        }
    ];

    // Add achievements data
    const achievements = [
        {
            year: "2023",
            title: "Best Digital Agency",
            organization: "Digital Excellence Awards"
        },
        {
            year: "2022",
            title: "Innovation in Technology",
            organization: "Tech Leaders Summit"
        }
    ];

    return (
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

            {/* Floating Gradient Orbs */}
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
                    filter: `blur(${blurValue}px)`,
                    rotateX
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
                            <motion.span
                                className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300 leading-tight filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                                animate={{
                                    backgroundPosition: ['0%', '100%'],
                                    filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)']
                                }}
                                transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            >
                                Our Work
                            </motion.span>
                        </h1>
                        <p className="text-xl md:text-3xl text-gray-300 max-w-3xl mx-auto mb-12">
                            Showcasing our finest digital creations and innovations
                        </p>

                        {/* Animated scroll indicator */}
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

            {/* Add Timeline Section before Stats */}
            <section className="py-20 px-4 relative">
                <motion.div
                    className="max-w-6xl mx-auto"
                    style={{ y: parallax3 }}
                >
                    <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Journey</h2>
                    <div className="space-y-8">
                        {achievements.map((achievement, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center gap-8"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <div className="w-32 text-4xl font-bold text-[#d9764a]">{achievement.year}</div>
                                <div className="flex-1 bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                                    <h3 className="text-xl font-bold text-white">{achievement.title}</h3>
                                    <p className="text-gray-300">{achievement.organization}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Stats Section */}
            <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 mb-16"
                onViewportEnter={() => setHasAnimated(true)}
            >
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={statHover}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.1,
                            type: "spring",
                            bounce: 0.4
                        }}
                    >
                        <CountUp
                            start={0}
                            end={stat.number}
                            duration={stat.duration}
                            suffix={stat.suffix}
                            className="text-5xl font-bold text-white"
                            useEasing={true}
                            enableScrollSpy={true}
                            scrollSpyOnce={true}
                            scrollSpyDelay={100}
                        />
                        <p className="text-gray-300 mt-2">{stat.label}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Add Testimonials Section before Portfolio Grid */}
            <section className="py-20 px-4 relative">
                <motion.div
                    className="max-w-6xl mx-auto"
                    style={{ y: parallax2 }}
                >
                    <h2 className="text-4xl font-bold text-white mb-12 text-center">Client Testimonials</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                                        <p className="text-gray-300">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 italic">"{testimonial.content}"</p>
                                <div className="flex gap-1 mt-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Portfolio Grid Section */}
            <section className="py-20 px-4">
                <motion.div
                    className="max-w-7xl mx-auto"
                    style={{ y: parallax2 }}
                >
                    {/* Filter Buttons */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-4 mb-12"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 }
                            }
                        }}
                        initial="hidden"
                        whileInView="show"
                    >
                        {categories.map((category, index) => (
                            <motion.button
                                key={index}
                                className={`px-6 py-2 rounded-full ${selectedCategory === category
                                    ? 'bg-[#d9764a] text-white'
                                    : 'bg-white/10 text-white hover:bg-[#d9764a]'
                                    } transition-colors`}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    show: { opacity: 1, y: 0 }
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Projects Grid */}
                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        layout
                    >
                        <AnimatePresence>
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.title}
                                    className="group bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 50 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{
                                        y: -10,
                                        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                                    }}
                                >
                                    <div className="relative overflow-hidden aspect-video">
                                        <motion.img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.6 }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#19234d] via-transparent to-transparent opacity-60" />
                                    </div>

                                    <div className="p-6">
                                        <div className="text-sm text-[#d9764a] mb-2">{project.category}</div>
                                        <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                                        <p className="text-gray-300 mb-4">{project.description}</p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.technologies.map((tech, i) => (
                                                <span key={i} className="px-3 py-1 text-sm bg-white/10 rounded-full text-gray-300">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 mb-6">
                                            {Object.entries(project.stats).map(([key, value], i) => (
                                                <div key={i} className="text-center">
                                                    <div className="text-xl font-bold text-white">{value}</div>
                                                    <div className="text-sm text-gray-400">{key}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </section>

            {/* Call to Action Section */}
            <section className="py-20 px-4 relative">
                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    style={{ y: parallax1 }}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                        Ready to Start Your Project?
                    </h2>
                    <p className="text-xl text-gray-300 mb-12">
                        Let's transform your ideas into reality with our expertise and innovation
                    </p>
                    <motion.button
                        className="px-8 py-4 bg-[#d9764a] text-white rounded-lg font-bold text-lg hover:bg-[#de7527] transition-colors"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 0 20px rgba(217,118,74,0.5)"
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get in Touch
                    </motion.button>
                </motion.div>
            </section>
        </div>
    );
};

export default Portfolio;
