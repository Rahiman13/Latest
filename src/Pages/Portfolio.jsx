import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import PageLoader from '../components/PageLoader';


const Portfolio = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [hoveredProject, setHoveredProject] = useState(null);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Scroll progress tracking
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

    // Add new transform effects
    const rotateX = useTransform(smoothProgress, [0, 1], [0, 360]);
    const textGradient = useTransform(smoothProgress, [0, 1], ["0deg", "360deg"]);
    const textWave = useTransform(smoothProgress, [0, 0.5, 1], [-20, 0, -20]);
    const backgroundOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.5, 0.8, 0.5]);

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20
            }
        },
        hover: {
            y: -10,
            scale: 1.02,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
            }
        }
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
    const categories = [
        "All",
        "Web Development",
        "Mobile Development",
        "Machine Learning",
        "UI/UX Design"
    ];

    // Projects data
    const projects = [
        {
            title: "E-Commerce Platform",
            category: "Web Development",
            description: "Modern e-commerce solution with advanced features",
            image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
            technologies: ["React", "Node.js", "MongoDB"],
            stats: {
                users: "50K+",
                sales: "$2M+",
                rating: "4.8"
            }
        },
        {
            title: "Fitness Tracking App",
            category: "Mobile Development",
            description: "Cross-platform mobile app for fitness tracking",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
            technologies: ["React Native", "Firebase", "Redux"],
            stats: {
                downloads: "100K+",
                activeUsers: "30K+",
                rating: "4.7"
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
        },
        {
            title: "Banking Dashboard",
            category: "UI/UX Design",
            description: "Modern banking interface with intuitive design",
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
            technologies: ["Figma", "Adobe XD", "Sketch"],
            stats: {
                satisfaction: "95%",
                conversion: "+40%",
                engagement: "+60%"
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
            role: "CEO, TechVision",
            content: "Working with this team has been transformative for our business. Their attention to detail and innovative solutions exceeded our expectations.",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            rating: 5
        },
        {
            name: "Michael Chen",
            role: "CTO, InnovateLabs",
            content: "The level of expertise and professionalism displayed by the team is outstanding. They delivered our project ahead of schedule with exceptional quality.",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
            rating: 5
        },
        {
            name: "Emma Williams",
            role: "Marketing Director, GrowthCo",
            content: "Their creative approach to problem-solving and dedication to client success makes them stand out. A truly remarkable partnership.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            rating: 5
        },
        {
            name: "David Rodriguez",
            role: "Founder, StartupX",
            content: "Exceptional service from start to finish. Their team brought our vision to life with remarkable precision and creativity.",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
            rating: 5
        },
        {
            name: "Lisa Zhang",
            role: "Product Manager, FutureTech",
            content: "The team's technical expertise combined with their understanding of our business needs resulted in an outstanding final product.",
            image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
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

    // Add auto-play functionality
    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [testimonials.length]);

    // Replace the existing testimonials section with this enhanced version
    const testimonialVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.5,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        },
        exit: (direction) => ({
            x: direction > 0 ? -1000 : 1000,
            opacity: 0,
            scale: 0.5,
            transition: {
                duration: 0.5
            }
        })
    };

    // Add this function to handle testimonial navigation
    const paginate = (newDirection) => {
        setDirection(newDirection);
        setCurrentTestimonial((prev) => {
            if (newDirection === 1) {
                return prev === testimonials.length - 1 ? 0 : prev + 1;
            }
            return prev === 0 ? testimonials.length - 1 : prev - 1;
        });
    };

    const filterCardVariants = {
        hidden: { 
            opacity: 0,
            y: 50,
            scale: 0.9,
            rotateX: 45
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 25,
                mass: 0.5
            }
        },
        hover: {
            y: -15,
            scale: 1.05,
            rotateX: 5,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 20
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: 50,
            transition: {
                duration: 0.2
            }
        }
    };

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

                {/* Floating Gradient Orbs */}
                <div className="fixed inset-0 pointer-events-none">
                    <motion.div
                        className="absolute w-64 h-64 rounded-full bg-[#d9764a]/10 blur-3xl"
                        animate={{
                            x: [0, 100, 0],
                            y: [0, 50, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                            times: [0, 0.5, 1]
                        }}
                        style={{ top: '20%', left: '10%' }}
                    />
                    <motion.div
                        className="absolute w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"
                        animate={{
                            x: [0, -100, 0],
                            y: [0, -50, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear",
                            times: [0, 0.5, 1]
                        }}
                        style={{ bottom: '20%', right: '10%' }}
                    />
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

                {/* Hero Stats Section */}
                {/* <motion.section 
                className="relative z-10 -mt-20 mb-20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.3 }}
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { number: "150+", label: "Projects Completed" },
                            { number: "98%", label: "Client Satisfaction" },
                            { number: "10+", label: "Years Experience" },
                            { number: "25+", label: "Industry Awards" }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ 
                                    y: -10,
                                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                                }}
                            >
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</h3>
                                <p className="text-gray-300">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section> */}

                {/* Stats Section */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.3 }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center"
                            variants={{
                                hidden: { opacity: 0, scale: 0.5 },
                                visible: {
                                    opacity: 1,
                                    scale: 1,
                                    transition: {
                                        duration: 0.5,
                                        delay: index * 0.1,
                                        type: "spring",
                                        bounce: 0.4
                                    }
                                }
                            }}
                            whileHover={statHover}
                        >
                            <CountUp
                                start={0}
                                end={stat.number}
                                duration={stat.duration}
                                suffix={stat.suffix}
                                className="text-5xl font-bold text-white"
                                useEasing={true}
                                enableScrollSpy={true}
                                scrollSpyOnce={false}
                                scrollSpyDelay={100}
                            />
                            <p className="text-gray-300 mt-2">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Process Section */}
                <section className="py-20 px-4 relative overflow-hidden">
                    <motion.div
                        className="max-w-7xl mx-auto"
                        style={{ y: parallax2 }}
                    >
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ amount: 0.3, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                        >
                            Our Process
                        </motion.h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    icon: "💡",
                                    title: "Ideation",
                                    description: "We brainstorm and conceptualize your vision into actionable plans."
                                },
                                {
                                    icon: "🎨",
                                    title: "Design",
                                    description: "Creating stunning visuals that align with your brand identity."
                                },
                                {
                                    icon: "⚙️",
                                    title: "Development",
                                    description: "Building robust solutions using cutting-edge technologies."
                                },
                                {
                                    icon: "🚀",
                                    title: "Launch",
                                    description: "Deploying and optimizing for maximum performance."
                                }
                            ].map((step, index) => (
                                <motion.div
                                    key={index}
                                    className="relative group"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ amount: 0.3, margin: "-50px" }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.2,
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 15
                                    }}
                                >
                                    <motion.div
                                        className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 relative z-10"
                                        whileHover={{
                                            y: -10,
                                            scale: 1.02,
                                            transition: { type: "spring", stiffness: 400, damping: 25 }
                                        }}
                                    >
                                        <div className="text-5xl mb-6">{step.icon}</div>
                                        <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                                        <p className="text-gray-300">{step.description}</p>
                                    </motion.div>
                                    {index < 3 && (
                                        <motion.div
                                            className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 border-t-2 border-r-2 border-white/20 transform rotate-45"
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.2 + 0.5, duration: 0.3 }}
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

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



                {/* Testimonials Section */}
                <section className="py-20 px-4 relative overflow-hidden">
                    <motion.div
                        className="max-w-6xl mx-auto"
                        style={{ y: parallax2 }}
                    >
                        <h2 className="text-4xl font-bold text-white mb-16 text-center">Client Testimonials</h2>

                        <div className="relative h-[500px] flex items-center justify-center">
                            {/* Enhanced background decorative elements */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    className="w-[600px] h-[600px] rounded-full border border-white/10"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                />
                                <motion.div
                                    className="absolute w-[400px] h-[400px] rounded-full border border-white/5"
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                />
                                <motion.div
                                    className="absolute w-[200px] h-[200px] rounded-full border border-white/5"
                                    animate={{ rotate: 180 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                />
                            </div>

                            {/* Navigation buttons */}
                            <button
                                className="absolute left-4 z-10 p-4 rounded-full bg-white/5 hover:bg-white/20 transition-colors group"
                                onClick={() => paginate(-1)}
                            >
                                <FiChevronLeft className="w-6 h-6 text-white group-hover:scale-125 transition-transform" />
                            </button>
                            <button
                                className="absolute right-4 z-10 p-4 rounded-full bg-white/5 hover:bg-white/20 transition-colors group"
                                onClick={() => paginate(1)}
                            >
                                <FiChevronRight className="w-6 h-6 text-white group-hover:scale-125 transition-transform" />
                            </button>

                            {/* Testimonial carousel */}
                            <AnimatePresence initial={false} custom={direction} mode="wait">
                                <motion.div
                                    key={currentTestimonial}
                                    custom={direction}
                                    variants={testimonialVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="absolute w-full max-w-2xl"
                                >
                                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 border border-white/10">
                                        <div className="flex flex-col items-center text-center">
                                            <motion.div className="relative mb-8">
                                                <motion.img
                                                    src={testimonials[currentTestimonial].image}
                                                    alt={testimonials[currentTestimonial].name}
                                                    className="w-24 h-24 rounded-full object-cover"
                                                    whileHover={{ scale: 1.1 }}
                                                    transition={{ type: "spring", stiffness: 300 }}
                                                />
                                                <motion.div
                                                    className="absolute -inset-2 rounded-full border-2 border-[#d9764a]/30"
                                                    animate={{
                                                        rotate: 360,
                                                        scale: [1, 1.1, 1]
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        repeat: Infinity,
                                                        ease: "linear"
                                                    }}
                                                />
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="space-y-4"
                                            >
                                                <h3 className="text-2xl font-bold text-white">
                                                    {testimonials[currentTestimonial].name}
                                                </h3>
                                                <p className="text-[#d9764a]">{testimonials[currentTestimonial].role}</p>
                                                <div className="flex justify-center gap-1 mb-6">
                                                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                                        <motion.svg
                                                            key={i}
                                                            className="w-5 h-5 text-yellow-500"
                                                            initial={{ opacity: 0, scale: 0 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: 0.3 + i * 0.1 }}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </motion.svg>
                                                    ))}
                                                </div>
                                                <motion.p
                                                    className="text-gray-300 text-lg italic"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.4 }}
                                                >
                                                    "{testimonials[currentTestimonial].content}"
                                                </motion.p>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Enhanced pagination dots */}
                            <div className="absolute -bottom-12 flex gap-3">
                                {testimonials.map((_, index) => (
                                    <motion.button
                                        key={index}
                                        className={`w-3 h-3 rounded-full transition-colors ${index === currentTestimonial ? 'bg-[#d9764a]' : 'bg-white/20'
                                            }`}
                                        onClick={() => {
                                            setDirection(index > currentTestimonial ? 1 : -1);
                                            setCurrentTestimonial(index);
                                        }}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Skills Section */}
                <section className="py-20 px-4 relative">
                    <motion.div
                        className="max-w-7xl mx-auto"
                        style={{ y: parallax2 }}
                    >
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ amount: 0.3 }}
                        >
                            Our Expertise
                        </motion.h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {[
                                { skill: "React", level: 95 },
                                { skill: "Node.js", level: 90 },
                                { skill: "UI/UX Design", level: 85 },
                                { skill: "TypeScript", level: 88 },
                                { skill: "Python", level: 82 },
                                { skill: "AWS", level: 85 },
                                { skill: "DevOps", level: 80 },
                                { skill: "Mobile Dev", level: 85 }
                            ].map((skill, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <h3 className="text-white font-bold mb-4">{skill.skill}</h3>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-[#d9764a] rounded-full"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            transition={{ duration: 1, delay: index * 0.1 }}
                                        />
                                    </div>
                                    <div className="text-right text-sm text-gray-300 mt-2">
                                        {skill.level}%
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Category Filter */}
                <motion.section 
                    className="py-16 px-4 relative overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ amount: 0.3 }}
                >
                    {/* Enhanced background animation elements */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <motion.div
                            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#d9764a]/10 to-[#de7527]/5 blur-3xl"
                            animate={{
                                x: [0, 100, 0],
                                y: [0, 50, 0],
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360]
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            style={{ top: '10%', left: '-20%' }}
                        />
                        <motion.div
                            className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/5 blur-3xl"
                            animate={{
                                x: [0, -50, 0],
                                y: [0, 100, 0],
                                scale: [1, 1.1, 1],
                                rotate: [360, 180, 0]
                            }}
                            transition={{
                                duration: 15,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            style={{ bottom: '0%', right: '-10%' }}
                        />
                    </div>

                    <div className="max-w-7xl mx-auto relative">
                        <motion.div
                            className="text-center mb-12"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.h3
                                className="text-2xl md:text-4xl font-bold text-white mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                Explore Our Work
                            </motion.h3>
                            <motion.p
                                className="text-gray-300 text-lg max-w-2xl mx-auto"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                Discover our diverse portfolio of projects across different domains
                            </motion.p>
                        </motion.div>

                        <motion.div
                            className="flex flex-wrap justify-center gap-4"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.3 }}
                        >
                            {categories.map((category, index) => (
                                <motion.button
                                    key={category}
                                    className={`relative px-6 py-3 rounded-full backdrop-blur-lg border transition-all
                                        ${selectedCategory === category
                                            ? 'bg-[#d9764a] border-[#d9764a] text-white shadow-lg shadow-[#d9764a]/20'
                                            : 'border-white/10 text-white/70 hover:border-[#d9764a] hover:text-[#d9764a]'
                                        }`}
                                    onClick={() => setSelectedCategory(category)}
                                    variants={fadeInUp}
                                    whileHover={filterCardVariants.hover}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {selectedCategory === category && (
                                        <motion.div
                                            className="absolute inset-0 bg-[#d9764a]/20 rounded-full"
                                            layoutId="categoryHighlight"
                                            initial={false}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 30
                                            }}
                                        />
                                    )}
                                    <motion.span
                                        className="relative z-10"
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 + 0.2 }}
                                    >
                                        {category}
                                    </motion.span>
                                </motion.button>
                            ))}
                        </motion.div>
                    </div>
                </motion.section>

                {/* Portfolio Grid Section */}
                <section className="py-20 px-4">
                    <motion.div
                        className="max-w-7xl mx-auto"
                        style={{ y: parallax2 }}
                    >
                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.2 }}
                        >
                            <AnimatePresence mode="wait">
                                {filteredProjects.map((project, index) => (
                                    <motion.div
                                        key={project.title}
                                        className="relative group"
                                        variants={filterCardVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        whileHover="hover"
                                        custom={index}
                                        layout
                                    >
                                        <motion.div 
                                            className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-lg border border-white/10"
                                            layoutId={`project-${project.title}`}
                                        >
                                            <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                                                <motion.img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="object-cover w-full h-full"
                                                    initial={{ scale: 1.2 }}
                                                    animate={{ scale: 1 }}
                                                    whileHover={{ scale: 1.1 }}
                                                    transition={{ duration: 0.4 }}
                                                />
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    initial={{ opacity: 0 }}
                                                    whileHover={{ opacity: 1 }}
                                                />
                                            </div>
                                            <motion.div 
                                                className="p-6"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <motion.span 
                                                    className="inline-block px-3 py-1 bg-[#d9764a]/10 text-[#d9764a] rounded-full text-sm mb-4"
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    {project.category}
                                                </motion.span>
                                                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                                <p className="text-gray-300 mb-4">{project.description}</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.technologies.map((tech, i) => (
                                                        <motion.span
                                                            key={i}
                                                            className="px-2 py-1 bg-white/5 rounded-md text-sm text-gray-300"
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: 0.3 + (i * 0.1) }}
                                                            whileHover={{ 
                                                                scale: 1.1,
                                                                backgroundColor: "rgba(255,255,255,0.1)" 
                                                            }}
                                                        >
                                                            {tech}
                                                        </motion.span>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Call to Action Section */}
                <section className="pt-28 px-4 relative">
                    <motion.div
                        className="max-w-4xl mx-auto text-center"
                        style={{ y: parallax1 }}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ amount: 0.3 }}
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
        </>

    );
};

export default Portfolio;
