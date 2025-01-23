import React, { useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useAnimation } from 'framer-motion';
import CountUp from 'react-countup';
import PageLoader from '../components/PageLoader';

const useScrollAnimation = () => {
    const [hasAnimated, setHasAnimated] = useState(false);
    const controls = useAnimation();

    const handleViewportEnter = () => {
        controls.start("visible");
        setHasAnimated(true);
    };

    const handleViewportLeave = () => {
        controls.start("hidden");
        setHasAnimated(false);
    };

    return { controls, hasAnimated, handleViewportEnter, handleViewportLeave };
};

const SearchAndFilter = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, totalJobs, jobCategories }) => {
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
    };

    return (
        <div className="mb-12 space-y-8">
            <div className="relative group">
                {/* Animated background effects */}
                <div className="absolute -inset-0.5 bg-gradient-to-r  rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
                
                {/* Search container */}
                <div className="relative flex items-center bg-white/5 backdrop-blur-lg rounded-lg border border-white/10 overflow-hidden">
                    {/* Animated search icon */}
                    <motion.div 
                        className="absolute left-6 text-2xl text-gray-400"
                        animate={{ 
                            scale: searchQuery ? [1, 0.9, 1] : 1,
                            rotate: searchQuery ? [0, -10, 0] : 0
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        🔍
                    </motion.div>

                    {/* Enhanced input field */}
                    <input
                        type="text"
                        placeholder="Search your dream position..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full px-16 py-6 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-0 text-lg"
                    />

                    {/* Clear button */}
                    {searchQuery && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            onClick={() => setSearchQuery('')}
                            className="absolute right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            ✕
                        </motion.button>
                    )}

                    {/* Animated border gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d9764a] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </div>

            {/* Results count with animation */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center"
            >
                <span className="text-gray-400">
                    Found <span className="text-white font-semibold">{totalJobs}</span> positions
                </span>
            </motion.div>

            {/* Categories */}
            <motion.div 
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                {jobCategories.map((category) => (
                    <motion.button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-6 py-3 rounded-lg backdrop-blur-lg transition-all duration-300 ${
                            selectedCategory === category
                                ? "bg-gradient-to-r from-[#d9764a] to-[#de7527] text-white shadow-lg shadow-[#d9764a]/30"
                                : "bg-white/5 text-gray-300 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {category}
                    </motion.button>
                ))}
            </motion.div>
        </div>
    );
};

const Careers = () => {
    const [isLoading, setIsLoading] = useState(true);
    const openPositionsRef = React.useRef(null);

    const { scrollYProgress } = useScroll({
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 25,
        mass: 0.1,
        restDelta: 0.001
    });

    // Enhanced transformations
    const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.1]);
    const heroY = useTransform(smoothProgress, [0, 0.2], [0, 100]);
    const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
    const heroBlur = useTransform(smoothProgress, [0, 0.15], [0, 4]);

    // Smoother parallax effects
    const parallax1 = useTransform(smoothProgress, [0, 1], [0, -200]);
    const parallax2 = useTransform(smoothProgress, [0, 1], [0, -150]);
    const parallax3 = useTransform(smoothProgress, [0, 1], [0, -75]);

    // Add state for tracking if stats are in view
    const [isStatsInView, setIsStatsInView] = React.useState(false);

    // Career stats data
    const careerStats = [
        {
            number: 50,
            suffix: "+",
            label: "Open Positions",
            duration: 2.5
        },
        {
            number: 95,
            suffix: "%",
            label: "Employee Satisfaction",
            duration: 2
        },
        {
            number: 4.8,
            suffix: "/5",
            label: "Glassdoor Rating",
            duration: 2
        },
        {
            number: 85,
            suffix: "%",
            label: "Internal Promotions",
            duration: 2
        },
    ];

    const jobCategories = [
        "All",
        "Engineering",
        "Design",
        "Product",
        "Marketing",
        "Sales",
        "Operations"
    ];

    // Expanded job openings
    const jobOpenings = [
        {
            title: "Senior Full Stack Developer",
            department: "Engineering",
            location: "Remote / Hybrid",
            type: "Full-time",
            experience: "5+ years",
            description: "We're looking for a senior full-stack developer to lead complex projects...",
            requirements: [
                "Expert in React and Node.js",
                "Experience with cloud platforms",
                "Strong system design skills"
            ]
        },
        {
            title: "Frontend Developer",
            department: "Engineering",
            location: "Remote",
            type: "Full-time",
            experience: "2+ years",
            description: "Join our frontend team to build beautiful, responsive web applications...",
            requirements: [
                "Strong React/Vue experience",
                "CSS/SASS expertise",
                "Performance optimization skills"
            ]
        },
        // Add more positions here...
    ];

    // Hiring process steps
    const hiringProcess = [
        {
            icon: "📝",
            title: "Application Review",
            description: "We carefully review your application and resume"
        },
        {
            icon: "💬",
            title: "Initial Interview",
            description: "Get to know you and discuss your experience"
        },
        {
            icon: "💻",
            title: "Technical Assessment",
            description: "Demonstrate your skills through practical exercises"
        },
        {
            icon: "🤝",
            title: "Final Interview",
            description: "Meet the team and discuss next steps"
        }
    ];

    // Benefits
    const benefits = [
        {
            icon: "🏥",
            title: "Health & Wellness",
            items: ["Medical Insurance", "Dental Coverage", "Mental Health Support"]
        },
        {
            icon: "💰",
            title: "Financial Benefits",
            items: ["Competitive Salary", "401(k) Match", "Stock Options"]
        },
        {
            icon: "🌴",
            title: "Time Off",
            items: ["Unlimited PTO", "Paid Parental Leave", "Flexible Hours"]
        },
        {
            icon: "📚",
            title: "Growth",
            items: ["Learning Budget", "Conference Allowance", "Mentorship"]
        }
    ];

    // Add bubble configuration like About page
    const bubbles = Array.from({ length: 50 }, (_, i) => ({
        size: Math.random() * 15 + 5,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        moveRange: Math.random() * 30 + 20,
    }));

    // Add new transform effects
    const rotateX = useTransform(smoothProgress, [0, 1], [0, 360]);
    const textGradient = useTransform(smoothProgress, [0, 1], ["0deg", "360deg"]);

    // Add hover animations for stats (same as About page)
    const statHover = {
        scale: 1.1,
        rotate: [0, 5, -5, 0],
        transition: { duration: 0.5 }
    };

    const arrowAnimation = {
        initial: { x: -10, opacity: 0 },
        animate: {
            x: [0, 10, 0],
            opacity: 1,
            transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const companyValues = [
        {
            icon: "🎯",
            title: "Mission-Driven",
            description: "We're committed to making a positive impact through technology."
        },
        {
            icon: "🤝",
            title: "Collaborative",
            description: "Success comes from working together and sharing knowledge."
        },
        {
            icon: "💡",
            title: "Innovative",
            description: "We encourage creative thinking and novel solutions."
        },
        {
            icon: "🌱",
            title: "Growth-Focused",
            description: "Continuous learning and development are core to our culture."
        }
    ];

    const testimonials = [
        {
            name: "David Chen",
            role: "Software Engineer",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500",
            quote: "The mentorship program here is exceptional. I've grown more in one year than in my previous roles combined."
        },
        {
            name: "Sarah Williams",
            role: "Product Manager",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
            quote: "The work-life balance and flexible hours have made a huge difference in my productivity and happiness."
        },
        {
            name: "James Rodriguez",
            role: "UX Designer",
            image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=500",
            quote: "The collaborative environment and focus on innovation allow me to do my best work every day."
        }
    ];

    const AnimatedBackground = () => (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <motion.div
                className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-[#d9764a]/10 to-[#de7527]/5 blur-3xl"
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
                className="absolute w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-3xl"
                animate={{
                    x: [0, -50, 0],
                    y: [0, 100, 0],
                    scale: [1, 1.1, 1],
                    rotate: [0, -180, -360]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{ bottom: '10%', right: '-10%' }}
            />
        </div>
    );

    const { controls: statsControls, handleViewportEnter: statsEnter, handleViewportLeave: statsLeave } = useScrollAnimation();

    const cultureAnimation = {
        container: {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.1
                }
            }
        },
        item: {
            hidden: { opacity: 0, y: 20 },
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                }
            }
        }
    };

    const statsAnimation = {
        container: {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                }
            }
        },
        item: {
            hidden: { opacity: 0, y: 20 },
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                }
            }
        }
    };

    const processAnimation = {
        container: {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.4
                }
            }
        },
        item: {
            hidden: { x: -50, opacity: 0 },
            visible: {
                x: 0,
                opacity: 1,
                transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                }
            }
        },
        line: {
            hidden: { scaleX: 0 },
            visible: {
                scaleX: 1,
                transition: { duration: 0.8, ease: "easeInOut" }
            }
        }
    };

    // Enhanced animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
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

    const scrollToOpenPositions = () => {
        openPositionsRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    };

    // Add these near the top of the component
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    
    // Add this function to filter jobs
    const filteredJobs = jobOpenings.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            job.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || job.department === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Add these near other state declarations
    const [currentPage, setCurrentPage] = useState(1);
    const positionsPerPage = 6;

    // Add this pagination helper function
    const paginatedJobs = (jobs) => {
        const indexOfLastPosition = currentPage * positionsPerPage;
        const indexOfFirstPosition = indexOfLastPosition - positionsPerPage;
        return jobs.slice(indexOfFirstPosition, indexOfLastPosition);
    };

    const Pagination = ({ totalJobs, positionsPerPage, currentPage, setCurrentPage }) => {
        const pageNumbers = Math.ceil(totalJobs / positionsPerPage);
        
        return (
            <motion.div 
                className="flex flex-col items-end gap-4 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="text-gray-400 text-sm">
                    Page {currentPage} of {pageNumbers}
                </div>
                
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-lg p-2 rounded-full border border-white/10">
                    <motion.button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`relative group w-8 h-8 rounded-full flex items-center justify-center ${
                            currentPage === 1 
                                ? 'opacity-50 cursor-not-allowed' 
                                : 'hover:bg-[#d9764a]/20'
                        }`}
                        whileHover={currentPage !== 1 ? { scale: 1.1 } : {}}
                        whileTap={currentPage !== 1 ? { scale: 0.9 } : {}}
                    >
                        <span className="relative z-10 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </motion.button>

                    <div className="flex gap-1">
                        {[...Array(pageNumbers)].map((_, idx) => (
                            <motion.button
                                key={idx + 1}
                                onClick={() => setCurrentPage(idx + 1)}
                                className={`relative w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                                    currentPage === idx + 1
                                        ? "bg-gradient-to-r from-[#d9764a] to-[#de7527] text-white"
                                        : "text-gray-300 hover:bg-white/10"
                                }`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {currentPage === idx + 1 && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#d9764a] to-[#de7527] blur-sm"
                                        layoutId="activePageGlow"
                                        transition={{ type: "spring", bounce: 0.2 }}
                                    />
                                )}
                                <span className="relative z-10">{idx + 1}</span>
                            </motion.button>
                        ))}
                    </div>

                    <motion.button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageNumbers))}
                        disabled={currentPage === pageNumbers}
                        className={`relative group w-8 h-8 rounded-full flex items-center justify-center ${
                            currentPage === pageNumbers 
                                ? 'opacity-50 cursor-not-allowed' 
                                : 'hover:bg-[#d9764a]/20'
                        }`}
                        whileHover={currentPage !== pageNumbers ? { scale: 1.1 } : {}}
                        whileTap={currentPage !== pageNumbers ? { scale: 0.9 } : {}}
                    >
                        <span className="relative z-10 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </motion.button>
                </div>
            </motion.div>
        );
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

                {/* Enhanced Hero Section */}
                <motion.section
                    className="relative min-h-screen flex items-center justify-center"
                    style={{
                        scale: heroScale,
                        opacity: heroOpacity,
                        filter: `blur(${heroBlur}px)`,
                        y: heroY
                    }}
                >
                    <div className="absolute inset-0">
                        <motion.img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200"
                            alt="Career Hero"
                            className="w-full h-full object-cover opacity-20"
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 2 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#19234d]/90 to-[#2b5a9e]/90" />
                    </div>

                    <div className="relative container mx-auto px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-7xl md:text-9xl font-bold mb-8">
                                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300 leading-tight">
                                    Join Our Team
                                </span>
                            </h1>
                            <p className="text-xl md:text-3xl text-gray-300 max-w-3xl mx-auto mb-12">
                                Build the future with us. Discover exciting opportunities and grow your career.
                            </p>

                            <motion.button
                                onClick={scrollToOpenPositions}
                                className="bg-gradient-to-r from-[#d9764a] to-[#de7527] text-white px-10 py-4 rounded-full text-lg font-semibold"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View Open Positions
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.section>

                {/* New Culture Section */}
                <section className="py-20 px-24 relative overflow-hidden">
                    <motion.div
                        variants={cultureAnimation.container}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.3 }}
                        className="grid md:grid-cols-2 gap-12 items-center"
                    >
                        <motion.div
                            variants={cultureAnimation.item}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                        >
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                                Our Culture
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#d9764a] to-[#de7527]">
                                    Defines Us
                                </span>
                            </h2>
                            <p className="text-xl text-gray-300 mb-6">
                                Join a workplace where innovation meets collaboration, and where your
                                ideas can make a real impact. We believe in fostering an environment
                                where creativity thrives and every voice is heard.
                            </p>
                            <div className="grid grid-cols-2 gap-6 mt-8">
                                {[
                                    { icon: "🚀", text: "Innovation First" },
                                    { icon: "🤝", text: "Collaborative Spirit" },
                                    { icon: "🌱", text: "Growth Mindset" },
                                    { icon: "🎯", text: "Impact Driven" }
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-center gap-3"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <span className="text-2xl">{item.icon}</span>
                                        <span className="text-gray-300">{item.text}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div
                            className="relative group"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ amount: 0.3 }}
                        >
                            <div className="relative rounded-2xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
                                    alt="Team Collaboration"
                                    className="w-full h-[500px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#19234d] via-transparent opacity-60" />
                            </div>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-[#000]/20 rounded-2xl to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                whileHover={{ scale: 1.05 }}
                            />
                        </motion.div>
                    </motion.div>
                </section>

                {/* Updated Stats Section with scroll trigger */}
                <motion.section
                    className="py-20 relative z-10"
                    onViewportEnter={() => {
                        setIsStatsInView(true);
                        statsEnter();
                    }}
                    onViewportLeave={() => {
                        setIsStatsInView(false);
                        statsLeave();
                    }}
                    viewport={{ amount: 0.3 }}
                >
                    <motion.div
                        variants={statsAnimation.container}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.3 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    >
                        {careerStats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={statsAnimation.item}
                                className="text-center"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { type: "spring", stiffness: 300 }
                                }}
                            >
                                {isStatsInView ? (
                                    <CountUp
                                        start={0}
                                        end={stat.number}
                                        duration={stat.duration}
                                        separator=","
                                        suffix={stat.suffix}
                                        decimals={stat.number % 1 !== 0 ? 1 : 0}
                                        className="text-5xl md:text-6xl font-bold text-white mb-2"
                                    />
                                ) : (
                                    <span className="text-5xl md:text-6xl font-bold text-white mb-2">0{stat.suffix}</span>
                                )}
                                <p className="text-gray-300">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.section>

                {/* Enhanced Job Openings Section */}
                <section ref={openPositionsRef} className="py-20 px-4">
                    <motion.div
                        className="max-w-7xl mx-auto"
                        style={{ y: parallax3 }}
                    >
                        <motion.h2
                            className="text-5xl md:text-6xl font-bold text-center text-white mb-16"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ amount: 0.3 }}
                        >
                            Open Positions
                        </motion.h2>

                        <SearchAndFilter 
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            totalJobs={filteredJobs.length}
                            jobCategories={jobCategories}
                        />

                        <AnimatePresence mode="wait">
                            {filteredJobs.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="text-center text-gray-300 py-12"
                                >
                                    No positions found matching your criteria
                                </motion.div>
                            ) : (
                                <>
                                    <motion.div
                                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        {paginatedJobs(filteredJobs).map((job, index) => (
                                            <motion.div
                                                key={job.title}
                                                className="group relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 overflow-hidden"
                                                initial={{ opacity: 0, y: 50 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                whileHover={{ y: -10 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#d9764a]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                <h3 className="text-2xl font-bold text-white mb-4">{job.title}</h3>
                                                <div className="flex flex-wrap gap-4 mb-6">
                                                    <span className="px-3 py-1 bg-[#d9764a]/20 text-[#d9764a] rounded-full text-sm">
                                                        {job.department}
                                                    </span>
                                                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                                                        {job.location}
                                                    </span>
                                                    <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                                                        {job.type}
                                                    </span>
                                                </div>
                                                <p className="text-gray-300 mb-6">{job.description}</p>
                                                <ul className="space-y-2 mb-6">
                                                    {job.requirements.map((req, i) => (
                                                        <li key={i} className="text-gray-300 flex items-center gap-2">
                                                            <span className="text-[#d9764a]">•</span> {req}
                                                        </li>
                                                    ))}
                                                </ul>
                                                <motion.button
                                                    className="w-full bg-[#d9764a] hover:bg-[#de7527] text-white py-3 rounded-lg font-bold"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    Apply Now
                                                </motion.button>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                    <Pagination 
                                        totalJobs={filteredJobs.length}
                                        positionsPerPage={positionsPerPage}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                    />
                                </>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </section>

                {/* New Employee Stories Section */}
                <section className="pt-20 px-4">
                    <motion.div
                        className="max-w-7xl mx-auto"
                        style={{ y: parallax1 }}
                    >
                        <motion.h2
                            className="text-5xl md:text-6xl font-bold text-center text-white mb-16"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ amount: 0.3 }}
                        >
                            Employee Stories
                        </motion.h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            {testimonials.map((story, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{ y: -10 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="relative h-64">
                                        <img
                                            src={story.image}
                                            alt={story.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#19234d] via-transparent" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-2">{story.name}</h3>
                                        <p className="text-[#d9764a] mb-4">{story.role}</p>
                                        <p className="text-gray-300 italic">"{story.quote}"</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Hiring Process Section */}
                <section className=" mb-60 px-24 relative">
                    <h2 className="text-5xl md:text-6xl font-bold text-center text-white mb-16">
                        Our Hiring Process
                    </h2>
                    <motion.div
                        variants={processAnimation.container}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.3 }}
                        className="grid md:grid-cols-4 gap-8 relative"
                    >
                        {hiringProcess.map((step, index) => (
                            <React.Fragment key={index}>
                                <motion.div
                                    variants={processAnimation.item}
                                    className="relative z-10"
                                >
                                    <motion.div
                                        className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 h-full"
                                        whileHover={{ y: -10 }}
                                    >
                                        <span className="text-4xl mb-4 block">{step.icon}</span>
                                        <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                                        <p className="text-gray-300">{step.description}</p>
                                    </motion.div>
                                </motion.div>
                                {index < hiringProcess.length - 1 && (
                                    <motion.div
                                        variants={processAnimation.line}
                                        className="absolute top-1/2 h-0.5 bg-[#d9764a]/30"
                                        style={{
                                            left: `${(index + 1) * 25}%`,
                                            width: '25%',
                                            transformOrigin: 'left'
                                        }}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </motion.div>
                </section>

                {/* Benefits Section */}
                <section className="py-20 px-4">
                    <motion.div
                        className="max-w-7xl mx-auto"
                        style={{ y: parallax1 }}
                    >
                        <motion.h2
                            className="text-5xl md:text-6xl font-bold text-center text-white mb-16"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ amount: 0.3 }}
                        >
                            Benefits & Perks
                        </motion.h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{ y: -10 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <span className="text-4xl mb-6 block">{benefit.icon}</span>
                                    <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
                                    <ul className="space-y-2">
                                        {benefit.items.map((item, i) => (
                                            <li key={i} className="text-gray-300 flex items-center gap-2">
                                                <span className="text-[#d9764a]">•</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Animated Background */}
                <AnimatedBackground />
            </div>
        </>

    );
};

export default Careers;
