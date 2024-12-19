import React, { useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import axios from 'axios';

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
                const response = await axios.get('http://localhost:1337/api/blogs?populate=*');
                const allBlogs = response.data.data;

                // Sort blogs by date
                const sortedBlogs = allBlogs.sort((a, b) =>
                    new Date(b.posted_on) - new Date(a.posted_on)
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
        return `http://localhost:1337${image.url}`;
    };

    // Helper function to get author image URL with fallback
    const getAuthorImageUrl = (authorImage) => {
        if (!authorImage || !authorImage.url) return FALLBACK_AVATAR;
        return `http://localhost:1337${authorImage.url}`;
    };

    // Add new scroll-based animations
    const fadeInUp = {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" }
    };

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

            {/* Modified Recent Blog Section */}
            <motion.section 
                className="py-20 px-4"
                {...fadeInUp}
            >
                <div className="max-w-7xl mx-auto">
                    <motion.h2 
                        className="text-4xl font-bold text-white mb-8 flex items-center gap-3"
                        {...fadeInUp}
                    >
                        <span className="text-[#d9764a]">📰</span> Latest Post
                    </motion.h2>
                    {recentBlogs.map((blog) => (
                        <motion.article
                            key={blog.id}
                            className="relative group"
                            {...fadeInUp}
                        >
                            <div className="relative h-[600px] rounded-2xl overflow-hidden">
                                <motion.img
                                    src={getImageUrl(blog.image)}
                                    alt={blog.title || 'Blog post'}
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.05 }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-0 p-6 w-full">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-3 py-1 bg-[#d9764a] rounded-full text-sm text-white">
                                            {blog.category || 'Uncategorized'}
                                        </span>
                                        <span className="text-gray-300 text-sm">
                                            {blog.posted_on 
                                                ? new Date(blog.posted_on).toLocaleDateString()
                                                : '-'
                                            }
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {blog.title || 'Untitled Post'}
                                    </h3>
                                    <p className="text-gray-300 line-clamp-2 mb-4">
                                        {blog.excerpt || 'No excerpt available'}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={getAuthorImageUrl(blog.authorImage)}
                                                alt={blog.author || 'Author'}
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <span className="text-white text-sm">
                                                {blog.author || 'Anonymous'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-white/80 text-sm">
                                            <span>{blog.readingTime || '-'} min read</span>
                                            <span>•</span>
                                            <span>{blog.views || '0'} views</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </motion.section>

            {/* Categories Section with Stats */}
            <motion.section 
                className="py-8 px-4"
                {...fadeInUp}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap gap-4 mb-8">
                        {categories.map(({ name, icon }) => (
                            <motion.button
                                key={name}
                                onClick={() => setSelectedCategory(name)}
                                className={`px-6 py-3 rounded-full backdrop-blur-md flex items-center gap-2 transition-all
                                    ${selectedCategory === name
                                        ? 'bg-[#d9764a] text-white'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
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

            {/* Blog Grid */}
            <motion.section 
                className="py-12 px-4"
                {...fadeInUp}
            >
                <div className="max-w-7xl mx-auto">
                    <motion.div 
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        layout
                    >
                        {filteredBlogs.map((blog, index) => (
                            <motion.article
                                key={blog.id}
                                className="group bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10"
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                            >
                                <div className="relative overflow-hidden aspect-[16/9]">
                                    <motion.img
                                        src={getImageUrl(blog.image)}
                                        alt={blog.title || 'Blog post'}
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.1 }}
                                    />
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <motion.span 
                                            className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-sm text-white"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            {blog.likes || '0'} ❤️
                                        </motion.span>
                                        <motion.span 
                                            className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-sm text-white"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            {blog.views || '0'} 👁️
                                        </motion.span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="px-3 py-1 bg-[#d9764a]/20 rounded-full text-[#d9764a]">
                                            {blog.category || 'Uncategorized'}
                                        </span>
                                        <span className="text-gray-400 text-sm">
                                            {blog.posted_on 
                                                ? new Date(blog.posted_on).toLocaleDateString()
                                                : '-'
                                            }
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                                        {blog.title || 'Untitled Post'}
                                    </h3>
                                    <p className="text-gray-300 mb-4 line-clamp-3">
                                        {blog.excerpt || 'No excerpt available'}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <img 
                                                src={getAuthorImageUrl(blog.authorImage)}
                                                alt={blog.author || 'Author'}
                                                className="w-8 h-8 rounded-full border border-white/20"
                                            />
                                            <div>
                                                <p className="text-white text-sm">
                                                    {blog.author || 'Anonymous'}
                                                </p>
                                                <p className="text-gray-400 text-sm">
                                                    {blog.readingTime || '-'} min read
                                                </p>
                                            </div>
                                        </div>
                                        <motion.button
                                            className="text-[#d9764a] hover:text-[#de7527] flex items-center gap-1"
                                            whileHover={{ x: 5 }}
                                        >
                                            Read More 
                                            <span className="text-lg">→</span>
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default Blog;
