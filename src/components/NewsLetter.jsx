import React, { useState } from "react";
import API_URL from "../API";
import { motion } from "framer-motion";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { toast } from 'react-hot-toast';

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/subscribers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          data: {
            Name: name,
            Email: email,
            SubscribedAt: new Date().toISOString()
          }
        }),
      });
      const data = await response.json();
      if (data.data) {
        toast.success("Successfully subscribed to the newsletter!", {
          duration: 4000,
          position: "bottom-center",
        });
        setEmail("");
        setName("");
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        duration: 4000,
        position: "bottom-center",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="w-full p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden"
      style={{ willChange: 'transform' }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-[#d9764a] focus:border-transparent transition-all backdrop-blur-lg"
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-[#d9764a] focus:border-transparent transition-all backdrop-blur-lg"
          />
        </motion.div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSubmitting}
          className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-[#d9764a] to-[#de7527] text-white font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-70 group"
        >
          <span className="text-lg">{isSubmitting ? "Subscribing..." : "Subscribe Now"}</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <PaperAirplaneIcon className="w-5 h-5 transform rotate-0" />
          </motion.div>
        </motion.button>

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{ top: `${30 * i}%` }}
              animate={{
                x: [-1000, 1000],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </form>

      <motion.div 
        className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-[#d9764a]/30 to-[#de7527]/30 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      />
      <motion.div 
        className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-[#d9764a]/30 to-[#de7527]/30 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      />
    </motion.div>
  );
};

export default NewsletterForm;
