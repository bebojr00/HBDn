"use client";

import { motion } from "framer-motion";
import { messages } from "@/data/messages";
import { useEffect, useState } from "react";

export default function FinalSurprise({ onNext }: { onNext: () => void }) {
  const [showReveal, setShowReveal] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const revealTimer = setTimeout(() => {
      setShowReveal(true);
    }, 4000); // 4 seconds of suspense
    
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 7000); // Button appears after the reveal
    
    return () => {
      clearTimeout(revealTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 relative">
      {/* Darker elegant romantic background overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-black/40 pointer-events-none"
      />

      <div className="z-10 text-center flex flex-col items-center justify-center h-full">
        {/* Intro Text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showReveal ? 0 : 1, y: showReveal ? -10 : 0 }}
          transition={{ duration: 1.5 }}
          className="font-serif text-2xl md:text-4xl text-white/80 italic absolute"
        >
          {messages.surprise.intro}
        </motion.p>

        {/* The Big Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ 
            opacity: showReveal ? 1 : 0, 
            scale: showReveal ? 1 : 0.9,
            filter: showReveal ? "blur(0px)" : "blur(10px)"
          }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute flex flex-col items-center"
        >
          {messages.surprise.image && (
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden mb-8 border-4 border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <img src={messages.surprise.image} alt="Surprise" className="w-full h-full object-cover" />
            </div>
          )}

          <h2 className="font-serif text-3xl md:text-6xl font-bold text-white text-glow leading-normal max-w-2xl px-4">
            {messages.surprise.reveal}
          </h2>

          <motion.button
            onClick={onNext}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showButton ? 1 : 0, y: showButton ? 0 : 20 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className={`mt-12 glass border-white/50 text-white px-8 py-3 rounded-full font-sans tracking-widest uppercase text-sm ${!showButton ? 'pointer-events-none' : ''}`}
          >
            {messages.surprise.button}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
