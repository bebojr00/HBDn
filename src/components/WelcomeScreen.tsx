"use client";

import { motion } from "framer-motion";
import { messages } from "@/data/messages";

export default function WelcomeScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 text-center space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
      >
        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-wide text-foreground text-glow mb-4">
          {messages.welcome.title}
        </h1>
        <p className="font-sans text-lg md:text-2xl text-rose-gold tracking-widest font-light mb-8">
          {messages.welcome.subtitle}
        </p>
        
        {messages.welcome.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="w-48 h-48 md:w-64 md:h-64 mx-auto mt-8 rounded-full overflow-hidden border-4 border-white/50 shadow-2xl glass"
          >
            <img src={messages.welcome.image} alt="Welcome" className="w-full h-full object-cover" />
          </motion.div>
        )}
      </motion.div>

      <motion.button
        onClick={onNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 182, 193, 0.5)" }}
        whileTap={{ scale: 0.95 }}
        className="glass px-10 py-3 rounded-full text-foreground font-sans tracking-widest uppercase text-sm mt-12 transition-all"
      >
        {messages.welcome.button}
      </motion.button>
    </div>
  );
}
