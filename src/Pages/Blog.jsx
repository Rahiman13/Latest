import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

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

    // Featured blog post
    const featuredPost = {
        title: "Building the Future of Web Development",
        excerpt: "An in-depth look at emerging technologies and methodologies that are reshaping how we build for the web...",
        date: "March 20, 2024",
        category: "Featured",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
        readTime: "12 min read",
        author: {
            name: "John Smith",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
        }
    };

    // Extended blog posts data
    const blogPosts = [
        {
            title: "The Future of Web Development",
            excerpt: "Exploring upcoming trends and technologies that will shape the future of web development...",
            date: "March 15, 2024",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop",
            readTime: "5 min read",
            author: {
                name: "Alice Johnson",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            }
        },
        {
            title: "Mastering React Performance",
            excerpt: "Essential tips and tricks to optimize your React applications for better performance...",
            date: "March 10, 2024",
            category: "React",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop",
            readTime: "8 min read",
            author: {
                name: "Bob Wilson",
                avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop"
            }
        },
        {
            title: "AI in Modern Web Applications",
            excerpt: "How artificial intelligence is revolutionizing web development and user experiences...",
            date: "March 8, 2024",
            category: "AI",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
            readTime: "6 min read",
            author: {
                name: "Sarah Chen",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
            }
        },
        {
            title: "The Rise of Web3 Technologies",
            excerpt: "Understanding blockchain, cryptocurrencies, and their impact on web development...",
            date: "March 5, 2024",
            category: "Web3",
            image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=500&fit=crop",
            readTime: "10 min read",
            author: {
                name: "Mike Brown",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
            }
        }
    ];

    // Blog categories
    const categories = [
        "All", "Technology", "React", "AI", "Web3", "Design", "Development"
    ];

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
                            x: [-bubble.moveRange/2, bubble.moveRange/2],
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

            {/* Featured Post Section */}
            <section className="relative py-20 px-4">
                <motion.div 
                    className="max-w-7xl mx-auto"
                    style={{ y: parallax2 }}
                >
                    <motion.article
                        className="relative bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ 
                            y: -10,
                            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                        }}
                    >
                        <div className="relative h-[60vh] overflow-hidden">
                            <motion.img
                                src={featuredPost.image}
                                alt={featuredPost.title}
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.6 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#19234d] via-[#19234d]/50 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <span className="inline-block px-4 py-2 bg-[#d9764a] rounded-full text-white text-sm mb-4">
                                    {featuredPost.category}
                                </span>
                                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-xl text-gray-300 mb-6 max-w-3xl">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="flex items-center gap-4">
                                    <img 
                                        src={featuredPost.author.avatar} 
                                        alt={featuredPost.author.name}
                                        className="w-12 h-12 rounded-full border-2 border-white/20"
                                    />
                                    <div>
                                        <p className="text-white">{featuredPost.author.name}</p>
                                        <p className="text-gray-400">{featuredPost.date} · {featuredPost.readTime}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.article>
                </motion.div>
            </section>

            {/* Categories Section */}
            <section className="py-8 px-4">
                <motion.div 
                    className="max-w-7xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                        {categories.map((category, index) => (
                            <motion.button
                                key={category}
                                className="px-6 py-2 rounded-full bg-white/10 text-white hover:bg-[#d9764a] transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Blog Posts Grid with Author Info */}
            <section className="py-20 px-4">
                <motion.div 
                    className="max-w-7xl mx-auto"
                    style={{ y: parallax2 }}
                >
                    <div className="grid md:grid-cols-2 gap-8">
                        {blogPosts.map((post, index) => (
                            <motion.article
                                key={index}
                                className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ 
                                    y: -10,
                                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                                }}
                            >
                                <div className="relative overflow-hidden h-60">
                                    <motion.img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#19234d] via-transparent to-transparent opacity-60" />
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-[#d9764a]">{post.category}</span>
                                        <span className="text-gray-400 text-sm">{post.readTime}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-3">{post.title}</h2>
                                    <p className="text-gray-300 mb-4">{post.excerpt}</p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <img 
                                                src={post.author.avatar} 
                                                alt={post.author.name}
                                                className="w-8 h-8 rounded-full border border-white/20"
                                            />
                                            <span className="text-gray-400">{post.author.name}</span>
                                        </div>
                                        <motion.button
                                            className="text-[#d9764a] hover:text-[#de7527]"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            Read More →
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Blog;
