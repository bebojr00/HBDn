"use client";

import { motion } from "framer-motion";
import { messages } from "@/data/messages";
import { useEffect, useState } from "react";

export default function InvitationCard() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 1: Show background and start golden sparkles burst
    const t1 = setTimeout(() => setStage(1), 500);
    // Stage 2: Reveal Title
    const t2 = setTimeout(() => setStage(2), 2000);
    // Stage 3: Reveal Locations
    const t3 = setTimeout(() => setStage(3), 3500);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Immersive Background (Opacity only) */}
      {messages.invitation.image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 5, ease: "easeOut" }}
          className="absolute inset-[-5%] w-[110%] h-[110%] z-0 pointer-events-none"
        >
          <img 
            src={messages.invitation.image} 
            alt="Invitation Background" 
            className="w-full h-full object-cover mix-blend-screen" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
        </motion.div>
      )}

      {/* Lightweight Golden Sparkle Burst */}
      {stage >= 1 && (
        <motion.div 
          className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{ 
                x: (Math.random() - 0.5) * 400, 
                y: (Math.random() - 0.5) * 400,
                scale: Math.random() * 2 + 1,
                opacity: 0
              }}
              transition={{ duration: 1.5 + Math.random(), ease: "easeOut" }}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
            />
          ))}
        </motion.div>
      )}

      {/* Foreground Content */}
      <div className="z-20 flex flex-col items-center text-center px-6 max-w-2xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: stage >= 2 ? 1 : 0, y: stage >= 2 ? 0 : 20 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="font-serif text-5xl md:text-7xl font-bold text-white mb-16 drop-shadow-md"
        >
          {messages.invitation.title}
        </motion.h2>

        <motion.div
          className="flex flex-col space-y-10 w-full"
        >
          {messages.invitation.locations.map((loc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: stage >= 3 ? 1 : 0, 
                y: stage >= 3 ? 0 : 20 
              }}
              transition={{ duration: 1.5, delay: i * 0.4, ease: "easeOut" }}
              className="font-serif text-2xl md:text-4xl text-rose-100/90 font-light drop-shadow-md"
            >
              {loc}
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 3 ? 1 : 0 }}
          transition={{ duration: 2, delay: 2.5 }}
          className="mt-32 text-xs font-sans tracking-[0.5em] text-white/40 uppercase"
        >
          Happy Birthday
        </motion.div>
      </div>
    </div>
  );
}
