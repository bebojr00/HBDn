"use client";

import { motion, AnimatePresence } from "framer-motion";
import { messages } from "@/data/messages";
import { useEffect, useState } from "react";

export default function FinalSurprise({ onNext }: { onNext: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 0: Music softens, screen darkens (handled by CSS opacity)
    // Stage 1: "One Last Thing..."
    const t1 = setTimeout(() => setStage(1), 3000);
    // Stage 2: Reveal the arabic message
    const t2 = setTimeout(() => setStage(2), 7000);
    // Stage 3: Show button to move to invitation
    const t3 = setTimeout(() => setStage(3), 11000);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Immersive Background (Opacity only, no blur) */}
      {messages.surprise.image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 5, ease: "easeOut" }}
          className="absolute inset-[-5%] w-[110%] h-[110%] z-0"
        >
          <img 
            src={messages.surprise.image} 
            alt="Surprise Background" 
            className="w-full h-full object-cover mix-blend-screen" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </motion.div>
      )}

      {/* Intro Text */}
      <AnimatePresence>
        {stage === 1 && (
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="font-serif text-3xl md:text-5xl text-white/80 italic absolute z-10 text-center tracking-wide px-6"
          >
            {messages.surprise.intro}
          </motion.p>
        )}
      </AnimatePresence>

      {/* The Big Reveal */}
      <AnimatePresence>
        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="z-20 flex flex-col items-center justify-center text-center absolute pointer-events-none w-full"
          >
            <motion.h2
              className="font-serif text-4xl md:text-6xl font-bold text-white drop-shadow-lg leading-relaxed max-w-4xl px-6"
            >
              {messages.surprise.reveal}
            </motion.h2>

            <AnimatePresence>
              {stage === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                  className="mt-24 cursor-pointer group flex flex-col items-center pointer-events-auto"
                  onClick={onNext}
                >
                  <span className="text-xs tracking-[0.3em] text-white/70 uppercase mb-4 group-hover:text-white transition-opacity duration-500 drop-shadow-md">
                    {messages.surprise.button}
                  </span>
                  <motion.div
                    animate={{ y: [0, 15, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
