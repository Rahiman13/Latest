import React, { useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import axios from 'axios';
import Api_url from '../API';
import { gsap } from 'gsap';
import { Reveal } from 'react-awesome-reveal';

const FALLBACK_IMAGE = 'https://via.placeholder.com/400x300?text=No+Image';
const FALLBACK_AVATAR = 'https://via.placeholder.com/100x100?text=User';

const Blog = () => {
    // Add scroll progress tracking
    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Parallax effects
    const parallax1 = useTransform(smoothProgress, [0, 1], [0, -300]);
    const parallax2 = useTransform(smoothProgress, [0, 1], [0, -150]);

    const [blogs, setBlogs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [recentBlogs, setRecentBlogs] = useState([]);

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
                const response = await axios.get(`${Api_url}/api/blogs`);
                const allBlogs = response.data;

                // Sort blogs by created date
                const sortedBlogs = allBlogs.sort((a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
                );

                // Set only the most recent blog
                setRecentBlogs(sortedBlogs.slice(0, 1));
                setBlogs(sortedBlogs);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                
            }
        };

        fetchBlogs();
    }, []);

    // Filter blogs by category
    const filteredBlogs = useMemo(() => {
        return selectedCategory === 'All'
            ? blogs
            : blogs.filter(blog => blog.category === selectedCategory);
    }, [blogs, selectedCategory]);

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
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" }
    };

    const fadeIn = {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true }
    };

    const slideInLeft = {
        initial: { opacity: 0, x: -50 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true }
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
        animate: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };

    const rotateOnHover = {
        whileHover: { rotate: 15, scale: 1.05 },
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

            {/* Updated Hero Section with enhanced animations */}
            <motion.section
                className="relative min-h-screen flex items-center justify-center"
                style={{
                    scale,
                    opacity,
                    filter: `blur(${blurValue}px)`
                }}
                {...bounceIn}
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
                                Our Blog
                            </span>
                        </h1>
                        <p className="text-xl md:text-3xl text-gray-300 max-w-3xl mx-auto mb-12">
                            Insights, tutorials, and updates from our team
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
                                        src={getImageUrl(blog.image)}
                                        alt={blog.title || 'Blog post'}
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                        whileHover={{ scale: 1.05 }}
                                        {...fadeIn}
                                        transition={{ duration: 0.6 }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#19234d] via-[#19234d]/50 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-8">
                                        <motion.span
                                            className="inline-block px-4 py-2 bg-[#d9764a] rounded-full text-white text-sm mb-4 shadow-md"
                                            {...slideInLeft}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {blog.category || 'Uncategorized'}
                                        </motion.span>
                                        <motion.h2
                                            className="text-4xl md:text-6xl font-bold text-white mb-4"
                                            {...fadeInUp}
                                            transition={{ delay: 0.3 }}
                                        >
                                            {blog.title || 'Untitled Post'}
                                        </motion.h2>
                                        <motion.p
                                            className="text-xl text-gray-300 mb-6 max-w-3xl"
                                            {...fadeInUp}
                                            transition={{ delay: 0.4 }}
                                        >
                                            {blog.excerpt || 'No excerpt available'}
                                        </motion.p>
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={getAuthorImageUrl(blog.authorImage)}
                                                alt={blog.author || 'Author'}
                                                className="w-12 h-12 rounded-full border-2 border-white/20 shadow-md"
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-gray-400 font-bold">{blog.author || 'Anonymous'}</span>
                                                <span className="text-gray-400 text-sm">
                                                    {new Date(blog.createdAt).toLocaleDateString()}
                                                </span>
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
                                {...rotateOnHover}
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
                className="py-20 px-4 blog-section"
                {...fadeInUp}
            >
                <motion.div
                    className="max-w-7xl mx-auto"
                    style={{ y: parallax2 }}
                >
                    <motion.div
                        className="grid md:grid-cols-2 gap-8 mt-4"
                        {...staggeredFadeIn}
                    >
                        {filteredBlogs.map((blog, index) => (
                            <Reveal key={blog._id} effect="fadeInUp">
                                <motion.article
                                    className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 shadow-lg transition-transform duration-300 hover:scale-105"
                                    {...fadeInUp}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{
                                        y: -10,
                                        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                                    }}
                                >
                                    <div className="relative overflow-hidden h-60">
                                        <motion.img
                                            src={blog.featuredImage}
                                            alt={blog.title || 'Blog post'}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                            whileHover={{ scale: 1.1 }}
                                            {...fadeIn}
                                            transition={{ duration: 0.6 }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#19234d] via-transparent to-transparent opacity-60" />
                                    </div>
                                    <motion.div
                                        className="p-6"
                                        {...fadeInUp}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-[#d9764a]">{blog.category || 'Uncategorized'}</span>
                                            <span className="text-gray-400 text-sm">{blog.readingTime || '-'} min read</span>
                                        </div>
                                        <motion.h2
                                            className="text-2xl font-bold text-white mb-3"
                                            {...fadeInUp}
                                            transition={{ delay: 0.3 }}
                                        >
                                            {blog.title || 'Untitled Post'}
                                        </motion.h2>
                                        <motion.p
                                            className="text-gray-300 mb-4"
                                            {...fadeInUp}
                                            transition={{ delay: 0.4 }}
                                        >
                                            {blog.excerpt || 'No excerpt available'}
                                        </motion.p>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={blog.authorImage}
                                                    alt={blog.authorName || 'Author'}
                                                    className="w-8 h-8 rounded-full border border-white/20 shadow-md"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="text-gray-400 font-bold">{blog.authorName || 'Anonymous'}</span>
                                                    <span className="text-gray-400 text-sm">
                                                        {new Date(blog.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <motion.button
                                                className="text-[#d9764a] hover:text-[#de7527]"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                Read More →
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                </motion.article>
                            </Reveal>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.section>
        </div>
    );
};

export default Blog;
