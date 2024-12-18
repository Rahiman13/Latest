import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Contact = () => {
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

  // Add bubble configuration
  const bubbles = Array.from({ length: 50 }, (_, i) => ({
    size: Math.random() * 15 + 5,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    moveRange: Math.random() * 30 + 20,
  }));

  const contactInfo = [
    { icon: "📍", title: "Address", details: "P No 305 Sa Society Khanamet, Kondapur, Hyderabad, Telangana 500084" },
    { icon: "📞", title: "Phone", details: "+91 96018 43090" },
    { icon: "📧", title: "Email", details: "contact@projexino.com" },
    { icon: "⏰", title: "Hours", details: "Mon-Fri: 9AM-6PM EST" }
  ];

  const contactForms = [
    { label: "Name", type: "text", placeholder: "Your Name" },
    { label: "Email", type: "email", placeholder: "your@email.com" },
    { label: "Subject", type: "text", placeholder: "How can we help?" },
    { label: "Message", type: "textarea", placeholder: "Your message here..." }
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

      {/* Hero Section */}
      <motion.section 
        className="relative min-h-[60vh] flex items-center justify-center"
        style={{ y: parallax1 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-9xl font-bold mb-8">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300 leading-tight filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                Contact Us
              </span>
            </h1>
            <p className="text-xl md:text-3xl text-gray-300 max-w-3xl mx-auto mb-12">
              Let's start a conversation about your next project
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Information Section */}
      <section className="py-20 px-4">
        <motion.div 
          className="max-w-7xl mx-auto"
          style={{ y: parallax2 }}
        >
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-8">Send us a message</h2>
              <form className="space-y-6">
                {contactForms.map((field, index) => (
                  <motion.div
                    key={field.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <label className="text-gray-300">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea
                        className="w-full p-3 bg-white/10 rounded-lg border border-white/20 text-white"
                        placeholder={field.placeholder}
                        rows={4}
                      />
                    ) : (
                      <input
                        type={field.type}
                        className="w-full p-3 bg-white/10 rounded-lg border border-white/20 text-white"
                        placeholder={field.placeholder}
                      />
                    )}
                  </motion.div>
                ))}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 px-6 bg-gradient-to-r from-[#d9764a] to-[#de7527] rounded-lg text-white font-bold"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{info.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-white">{info.title}</h3>
                      <p className="text-gray-300">{info.details}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
