import React, { useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import axios from 'axios';
import Api_url from '../API';
import { gsap } from 'gsap';
import { Reveal } from 'react-awesome-reveal';
import PageLoader from '../components/PageLoader';
import { AnimatePresence } from 'framer-motion';

const FALLBACK_IMAGE = 'https://via.placeholder.com/400x300?text=No+Image';
const FALLBACK_AVATAR = 'https://via.placeholder.com/100x100?text=User';

const Blog = () => {
    // Add scroll progress tracking
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

    const [blogs, setBlogs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 4;

    // Updated categories array with icons
    const categories = [
        { name: "All", icon: "🌟" },
        { name: "Technology", icon: "💻" },
        { name: "React", icon: "⚛️" },
        { name: "AI", icon: "🤖" },
        { name: "Web3", icon: "🌐" },
        { name: "Design", icon: "🎨" },
        { name: "Development", icon: "⚡" },
        { name: "Programming", icon: "🖥️" }
    ];

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${Api_url}/api/blogs`);
                const allBlogs = response.data;

                // Sort blogs by created date
                const sortedBlogs = allBlogs.sort((a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
                );

                // Set featured/recent blogs (those marked as isFeatured or most recent)
                const featuredBlogs = sortedBlogs.filter(blog => blog.isFeatured);
                const recentBlogsData = featuredBlogs.length > 0
                    ? featuredBlogs
                    : sortedBlogs.slice(0, 1);

                setRecentBlogs(recentBlogsData);
                setBlogs(sortedBlogs);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    // Filter blogs by category and handle pagination
    const { paginatedBlogs, totalPages } = useMemo(() => {
        const filtered = selectedCategory === 'All'
            ? blogs
            : blogs.filter(blog => blog.category === selectedCategory);

        const lastBlogIndex = currentPage * blogsPerPage;
        const firstBlogIndex = lastBlogIndex - blogsPerPage;
        const paginated = filtered.slice(firstBlogIndex, lastBlogIndex);

        return {
            paginatedBlogs: paginated,
            totalPages: Math.ceil(filtered.length / blogsPerPage)
        };
    }, [blogs, selectedCategory, currentPage]);

    // Add bubble configuration
    const bubbles = Array.from({ length: 50 }, (_, i) => ({
        size: Math.random() * 15 + 5,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        moveRange: Math.random() * 30 + 20,
    }));

    // Add these new scroll-based transformations
    const scale = useTransform(smoothProgress, [0, 0.2], [1, 1.5]);
    const opacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
    const blurValue = useTransform(smoothProgress, [0, 0.2], [0, 10]);

    // Helper function to get image URL with fallback
    const getImageUrl = (image) => {
        if (!image || !image.url) return FALLBACK_IMAGE;
        return `${Api_url}${image.url}`;
    };

    // Helper function to get author image URL with fallback
    const getAuthorImageUrl = (authorImage) => {
        if (!authorImage || !authorImage.url) return FALLBACK_AVATAR;
        return `${Api_url}${authorImage.url}`;
    };

    // Add reusable animation variants
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        },
        viewport: {
            amount: 0.3,
            margin: "-50px"
        }
    };

    const fadeIn = {
        initial: { opacity: 0 },
        whileInView: {
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        },
        viewport: {
            amount: 0.3,
            margin: "-50px"
        }
    };

    const slideInLeft = {
        initial: { opacity: 0, x: -30 },
        whileInView: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        },
        viewport: {
            amount: 0.3,
            margin: "-50px"
        }
    };

    const slideInRight = {
        initial: { opacity: 0, x: 50 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true }
    };

    // Add reusable animation variants with new effects
    const bounceIn = {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
    };

    const staggeredFadeIn = {
        initial: { opacity: 0 },
        whileInView: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                ease: "easeOut"
            }
        },
        viewport: {
            amount: 0.3,
            margin: "-50px"
        }
    };

    const zoomOnHover = {
        whileHover: { scale: 1.10 },
    };

    // New animation variants for the hero section
    const floatAnimation = {
        initial: { y: 0 },
        animate: { y: -10, transition: { yoyo: Infinity, duration: 2, ease: "easeInOut" } },
    };

    const buttonHoverEffect = {
        whileHover: { scale: 1.1, transition: { duration: 0.3 } },
    };

    useEffect(() => {
        // GSAP animation for the main section
        gsap.from('.blog-section', {
            duration: 1,
            opacity: 0,
            y: 50,
            stagger: 0.2,
            ease: 'power3.out',
        });
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory]);

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

                {/* Updated Hero Section with enhanced animations */}
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
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut"
                            }}
                        >
                            <h1 className="text-7xl md:text-9xl font-bold mb-8">
                                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300 leading-tight filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                    Our Blog
                                </span>
                            </h1>
                            <motion.p
                                className="text-xl md:text-3xl text-gray-300 max-w-3xl mx-auto mb-12"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                            >
                                Insights, tutorials, and updates from our team
                            </motion.p>
                            {/* <motion.button
                                className="px-8 py-4 bg-[#d9764a] text-white rounded-full shadow-lg"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ delay: 0.4, duration: 0.4 }}
                            >
                                Get Started
                            </motion.button> */}
                        </motion.div>
                        {/* Add Animated scroll indicator */}
                        <motion.div
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                                <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Featured/Recent Blog Section with zoom effect */}
                <motion.section
                    className="relative py-20 px-4 blog-section"
                    {...fadeInUp}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1, transition: { duration: 0.5 } }}
                >
                    <motion.div
                        className="max-w-7xl mx-auto"
                        style={{ y: parallax2 }}
                    >
                        {recentBlogs.map((blog) => (
                            <Reveal key={blog._id} effect="fadeInUp">
                                <motion.article
                                    className="relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 shadow-lg transition-transform duration-300 hover:scale-105"
                                    {...fadeInUp}
                                    transition={{ duration: 0.6 }}
                                >
                                    <div className="relative h-[60vh] overflow-hidden">
                                        <motion.img
                                            src={blog.featuredImage || FALLBACK_IMAGE}
                                            alt={blog.title}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                            whileHover={{ scale: 1.05 }}
                                            {...fadeIn}
                                            transition={{ duration: 0.6 }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#19234d] via-[#19234d]/50 to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-8">
                                            <div className="flex items-center gap-3 mb-4">
                                                <motion.span
                                                    className="inline-block px-4 py-2 bg-[#d9764a] rounded-full text-white text-sm shadow-md"
                                                    {...slideInLeft}
                                                    transition={{ delay: 0.2 }}
                                                >
                                                    {blog.category}
                                                </motion.span>
                                                {blog.tags && blog.tags.length > 0 && (
                                                    <div className="flex gap-2">
                                                        {JSON.parse(blog.tags[0]).map((tag, index) => (
                                                            <span key={index} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white text-sm">
                                                                #{tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <motion.h2
                                                className="text-4xl md:text-6xl font-bold text-white mb-4"
                                                {...fadeInUp}
                                                transition={{ delay: 0.3 }}
                                            >
                                                {blog.title}
                                            </motion.h2>
                                            <motion.p
                                                className="text-xl text-gray-300 mb-6 max-w-3xl"
                                                {...fadeInUp}
                                                transition={{ delay: 0.4 }}
                                            >
                                                {blog.excerpt}
                                            </motion.p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <img
                                                        src={blog.authorImage || FALLBACK_AVATAR}
                                                        alt={blog.authorName}
                                                        className="w-12 h-12 rounded-full border-2 border-white/20 shadow-md"
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="text-white font-bold">{blog.authorName}</span>
                                                        <span className="text-gray-400 text-sm">
                                                            {new Date(blog.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 text-white/80">
                                                    <span>{blog.readingTime} min read</span>
                                                    <span>•</span>
                                                    <span>{blog.views} views</span>
                                                    <span>•</span>
                                                    <span>{blog.likes} likes</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            </Reveal>
                        ))}
                    </motion.div>
                </motion.section>

                {/* Categories Section with rotating buttons */}
                <motion.section
                    className="pt-2 pb-6 px-4"
                    {...staggeredFadeIn}
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-wrap gap-4 mb-8">
                            {categories.map(({ name, icon }) => (
                                <motion.button
                                    key={name}
                                    onClick={() => setSelectedCategory(name)}
                                    className={`px-6 py-3 rounded-full backdrop-blur-md flex items-center gap-2 transition-all
                                    ${selectedCategory === name
                                            ? 'bg-[#d9764a] text-white shadow-lg'
                                            : 'bg-white/10 text-white hover:bg-white/20'
                                        }`}
                                    {...zoomOnHover}
                                >
                                    <span>{icon}</span>
                                    {name}
                                    <span className="ml-2 text-sm">
                                        ({blogs.filter(blog => name === 'All' || blog.category === name).length})
                                    </span>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Blog Posts Grid with staggered fade-in effect */}
                <motion.section
                    className="pt-20 px-4 blog-section relative"
                    {...fadeInUp}
                >
                    <motion.div
                        className="max-w-7xl mx-auto"
                        style={{ y: parallax2 }}
                    >
                        <motion.div
                            className="grid md:grid-cols-2 gap-8 mt-4"
                            initial="initial"
                            whileInView="whileInView"
                            viewport={{ amount: 0.3, margin: "-50px" }}
                        >
                            {paginatedBlogs.map((blog, index) => (
                                <Reveal key={blog._id} effect="fadeInUp">
                                    <motion.article
                                        className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 shadow-lg"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                duration: 0.4,
                                                delay: index * 0.1,
                                                ease: "easeOut"
                                            }
                                        }}
                                        viewport={{ amount: 0.3, margin: "-50px" }}
                                        whileHover={{
                                            y: -10,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        <div className="relative overflow-hidden h-60">
                                            <motion.img
                                                src={blog.featuredImage || FALLBACK_IMAGE}
                                                alt={blog.title}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                                whileHover={{ scale: 1.1 }}
                                                {...fadeIn}
                                                transition={{ duration: 0.6 }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#19234d] via-transparent to-transparent opacity-60" />
                                            <div className="absolute top-4 right-4 flex gap-2">
                                                <motion.span
                                                    className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-sm text-white"
                                                    whileHover={{ scale: 1.1 }}
                                                >
                                                    {blog.likes} ❤️
                                                </motion.span>
                                                <motion.span
                                                    className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-sm text-white"
                                                    whileHover={{ scale: 1.1 }}
                                                >
                                                    {blog.views} 👁️
                                                </motion.span>
                                            </div>
                                        </div>
                                        <motion.div
                                            className="p-6"
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{
                                                opacity: 1,
                                                y: 0,
                                                transition: {
                                                    duration: 0.4,
                                                    delay: index * 0.1,
                                                    ease: "easeOut"
                                                }
                                            }}
                                            viewport={{ amount: 0.3, margin: "-50px" }}
                                        >
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="text-[#d9764a]">{blog.category}</span>
                                                <span className="text-gray-400 text-sm">{blog.readingTime} min read</span>
                                            </div>
                                            <motion.h2
                                                className="text-2xl font-bold text-white mb-3 line-clamp-2"
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{
                                                    opacity: 1,
                                                    y: 0,
                                                    transition: {
                                                        duration: 0.4,
                                                        delay: index * 0.1,
                                                        ease: "easeOut"
                                                    }
                                                }}
                                                viewport={{ amount: 0.3, margin: "-50px" }}
                                            >
                                                {blog.title}
                                            </motion.h2>
                                            <motion.p
                                                className="text-gray-300 mb-4 line-clamp-3"
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{
                                                    opacity: 1,
                                                    y: 0,
                                                    transition: {
                                                        duration: 0.4,
                                                        delay: index * 0.1,
                                                        ease: "easeOut"
                                                    }
                                                }}
                                                viewport={{ amount: 0.3, margin: "-50px" }}
                                            >
                                                {blog.excerpt}
                                            </motion.p>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={blog.authorImage || FALLBACK_AVATAR}
                                                        alt={blog.authorName}
                                                        className="w-8 h-8 rounded-full border border-white/20 shadow-md"
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="text-gray-400 font-bold">{blog.authorName}</span>
                                                        <span className="text-gray-400 text-sm">
                                                            {new Date(blog.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <motion.button
                                                    className="text-[#d9764a] hover:text-[#de7527] flex items-center gap-1"
                                                    initial={{ opacity: 0, x: 30 }}
                                                    whileInView={{
                                                        opacity: 1,
                                                        x: 0,
                                                        transition: {
                                                            duration: 0.4,
                                                            delay: index * 0.1,
                                                            ease: "easeOut"
                                                        }
                                                    }}
                                                    viewport={{ amount: 0.3, margin: "-50px" }}
                                                >
                                                    Read More
                                                    <span className="text-lg">→</span>
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    </motion.article>
                                </Reveal>
                            ))}
                        </motion.div>

                        {/* New Pagination Section */}
                        <motion.div
                            className="flex justify-end mt-12 relative z-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10 flex items-center gap-6">
                                <motion.button
                                    className={`relative group px-4 py-2 rounded-xl flex items-center gap-2
                                    ${currentPage === 1
                                            ? 'text-white/40 cursor-not-allowed'
                                            : 'text-white hover:text-[#d9764a]'}`}
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                                    whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                                >
                                    <motion.span
                                        className="text-xl"
                                        animate={{ x: currentPage === 1 ? 0 : [-3, 0, -3] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        ←
                                    </motion.span>
                                </motion.button>

                                <div className="flex items-center gap-2">
                                    {[...Array(totalPages)].map((_, index) => (
                                        <motion.button
                                            key={index + 1}
                                            className={`relative group w-10 h-10 rounded-xl flex items-center justify-center
                                            ${currentPage === index + 1
                                                    ? 'bg-gradient-to-r from-[#d9764a] to-[#de7527] text-white'
                                                    : 'bg-white/10 text-white hover:bg-white/20'
                                                }`}
                                            onClick={() => setCurrentPage(index + 1)}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <div className={`absolute inset-0 bg-gradient-to-r from-[#d9764a] to-[#de7527] rounded-xl blur opacity-0 
                                            ${currentPage === index + 1 ? 'opacity-50' : 'group-hover:opacity-25'}`}
                                            />
                                            <motion.div
                                                className="relative flex items-center gap-1"
                                                initial={false}
                                                animate={currentPage === index + 1 ? { scale: 1.1 } : { scale: 1 }}
                                            >
                                                {index + 1}
                                            </motion.div>
                                        </motion.button>
                                    ))}
                                </div>

                                <motion.button
                                    className={`relative group px-4 py-2 rounded-xl flex items-center gap-2
                                    ${currentPage === totalPages
                                            ? 'text-white/40 cursor-not-allowed'
                                            : 'text-white hover:text-[#d9764a]'}`}
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                                    whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                                >
                                    <motion.span
                                        className="text-xl"
                                        animate={{ x: currentPage === totalPages ? 0 : [3, 0, 3] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        →
                                    </motion.span>
                                </motion.button>

                                <div className="border-l border-white/10 pl-4 ml-2">
                                    <motion.span
                                        className="text-white/50 text-sm"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        Page {currentPage} of {totalPages}
                                    </motion.span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.section>
            </div>
        </>
    );
};

export default Blog;
