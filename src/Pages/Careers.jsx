import React from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';

const Careers = () => {
    // Scroll animations setup
    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Parallax effects
    const parallax1 = useTransform(smoothProgress, [0, 1], [0, -300]);
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

    // Job openings data
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
            title: "UX/UI Designer",
            department: "Design",
            location: "New York",
            type: "Full-time",
            experience: "3+ years",
            description: "Join our design team to create beautiful, user-centric experiences...",
            requirements: [
                "Strong portfolio",
                "Figma expertise",
                "User research experience"
            ]
        },
        {
            title: "Product Manager",
            department: "Product",
            location: "San Francisco",
            type: "Full-time",
            experience: "4+ years",
            description: "Lead product strategy and execution for our core platforms...",
            requirements: [
                "Product lifecycle experience",
                "Strong analytical skills",
                "Technical background"
            ]
        }
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

            {/* Enhanced Hero Section */}
            <motion.section
                className="relative min-h-screen flex items-center justify-center"
                style={{
                    scale: useTransform(smoothProgress, [0, 0.2], [1, 1.5]),
                    opacity: useTransform(smoothProgress, [0, 0.2], [1, 0]),
                    filter: `blur(${useTransform(smoothProgress, [0, 0.2], [0, 10])}px)`,
                    rotateX
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
                            className="bg-[#d9764a] hover:bg-[#de7527] text-white px-8 py-4 rounded-full text-xl font-bold"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View Open Positions
                        </motion.button>
                    </motion.div>
                </div>
            </motion.section>

            {/* New Culture Section */}
            <section className="py-20 px-4 relative overflow-hidden">
                <motion.div
                    className="max-w-7xl mx-auto"
                    style={{ y: parallax2 }}
                >
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
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
                            viewport={{ once: true }}
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
                    </div>
                </motion.div>
            </section>

            {/* Updated Stats Section with scroll trigger */}
            <motion.section
                className="py-20 relative z-10"
                onViewportEnter={() => setIsStatsInView(true)}
                viewport={{ once: true, margin: "-100px" }}
            >
                <motion.div
                    className="max-w-7xl mx-auto px-4"
                    style={{ y: parallax2 }}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {careerStats.map((stat, index) => (
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
                    </div>
                </motion.div>
            </motion.section>

            {/* Enhanced Job Openings Section */}
            <section className="py-20 px-4">
                <motion.div
                    className="max-w-7xl mx-auto"
                    style={{ y: parallax3 }}
                >
                    <motion.h2
                        className="text-5xl md:text-6xl font-bold text-center text-white mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Open Positions
                    </motion.h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {jobOpenings.map((job, index) => (
                                <motion.div
                                    key={job.title}
                                    className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{
                                        y: -10,
                                        boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                                    }}
                                    transition={{ delay: index * 0.1 }}
                                >
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
                        </AnimatePresence>
                    </div>
                </motion.div>
            </section>

            {/* New Employee Stories Section */}
            <section className="py-20 px-4">
                <motion.div
                    className="max-w-7xl mx-auto"
                    style={{ y: parallax1 }}
                >
                    <motion.h2
                        className="text-5xl md:text-6xl font-bold text-center text-white mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Employee Stories
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Sarah Johnson",
                                role: "Senior Developer",
                                image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
                                quote: "The growth opportunities here are endless. I started as a junior developer and now lead a team of 10."
                            },
                            {
                                name: "Michael Chen",
                                role: "Product Designer",
                                image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500",
                                quote: "The collaborative culture and creative freedom here have helped me do the best work of my career."
                            },
                            {
                                name: "Emma Rodriguez",
                                role: "Engineering Manager",
                                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500",
                                quote: "What sets us apart is how we embrace innovation while maintaining a supportive environment."
                            }
                        ].map((story, index) => (
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
            <section className="py-20 px-4 relative">
                <motion.div
                    className="max-w-7xl mx-auto"
                    style={{ y: parallax2 }}
                >
                    <motion.h2
                        className="text-5xl md:text-6xl font-bold text-center text-white mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Our Hiring Process
                    </motion.h2>

                    <div className="grid md:grid-cols-4 gap-8">
                        {hiringProcess.map((step, index) => (
                            <motion.div
                                key={index}
                                className="relative"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <motion.div
                                    className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 h-full"
                                    whileHover={{ y: -10 }}
                                >
                                    <span className="text-4xl mb-4 block">{step.icon}</span>
                                    <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                                    <p className="text-gray-300">{step.description}</p>
                                </motion.div>
                                {index < hiringProcess.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                                        {/* <motion.div
                                            className="w-8 h-8 border-t-2 border-r-2 border-[#d9764a] transform rotate-45"
                                            animate={{ x: [0, 10, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        /> */}
                                        <motion.div
                                            className="w-8 h-8 border-t-2 border-r-2 border-[#d9764a]"
                                            style={{ transform: 'rotate(-45deg)  ' }} // Rotate to make the tip point to the right
                                            animate={{ x: [0, 10, 0] }} // Front and back motion
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />
                                    </div>

                                )}
                            </motion.div>
                        ))}
                    </div>
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
                        viewport={{ once: true }}
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
        </div>
    );
};

export default Careers;
