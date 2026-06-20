"use client";

import { motion } from "framer-motion";
import { messages } from "@/data/messages";

export default function HandsStory({ onNext }: { onNext: () => void }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 relative">
      {/* Romantic warm glow overlay specific to this scene */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 3 }}
        className="absolute inset-0 bg-gradient-to-t from-warm-gold/20 via-transparent to-transparent pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="text-center z-10 flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1 }}
        >
          <h2 className="font-serif text-4xl md:text-6xl font-medium text-foreground text-glow mb-6">
            {messages.hands.title}
          </h2>
          <p className="font-sans text-lg md:text-2xl text-foreground/80 font-light italic">
            &quot;{messages.hands.subtitle}&quot;
          </p>
        </motion.div>

        {/* Abstract glowing circle to represent hands/connection */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 2.5, ease: "easeOut" }}
          className="mt-16 relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full bg-rose-gold/20 blur-3xl animate-pulse" />
          <div className="absolute inset-4 rounded-full bg-blush-pink/30 blur-2xl" />
          <div className="glass rounded-full w-full h-full flex items-center justify-center border-white/40 overflow-hidden">
            {messages.hands.image ? (
              <img src={messages.hands.image} alt="Hands" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl">✨</span>
            )}
          </div>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={onNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-16 text-foreground font-sans tracking-widest uppercase text-sm border-b border-foreground/30 pb-1"
      >
        Continue
      </motion.button>
    </div>
  );
}
