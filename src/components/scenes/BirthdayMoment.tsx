"use client";

import { motion, AnimatePresence } from "framer-motion";
import { messages } from "@/data/messages";
import { useEffect, useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";

// Optimized Butterfly Icon for the Swarm
const SwarmButterfly = ({ delay }: { delay: number }) => (
  <motion.svg
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5, delay }}
    width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" xmlns="http://www.w3.org/2000/svg"
    className="absolute mix-blend-screen"
  >
    <path d="M12 2C12 2 10.5 5 8 5C5.5 5 3 4 3 6C3 8 7 10 10 11C10 11 8 13 6 15C4 17 2 19 3 20C4 21 7 19 9 17C11 15 12 13 12 13C12 13 13 15 15 17C17 19 20 21 21 20C22 19 20 17 18 15C16 13 14 11 14 11C17 10 21 8 21 6C21 4 18.5 5 16 5C13.5 5 12 2 12 2Z" />
  </motion.svg>
);

export default function BirthdayMoment({ onNext }: { onNext: () => void }) {
  const [showSub, setShowSub] = useState(false);
  const [wowMoment, setWowMoment] = useState(false);

  useEffect(() => {
    // Stage 1: The WOW moment (Swarm forms "Nona ❤️")
    const wowTimer = setTimeout(() => {
      setWowMoment(true);
    }, 1000);

    // Stage 2: WOW moment explodes, birthday message reveals
    const revealTimer = setTimeout(() => {
      setWowMoment(false);
      setShowSub(true);
      
      // Fire Confetti!
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFD700', '#FF69B4', '#FFC0CB']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFD700', '#FF69B4', '#FFC0CB']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }, 6000);
    
    return () => {
      clearTimeout(wowTimer);
      clearTimeout(revealTimer);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* Cinematic Background (No Blur for Performance) */}
      {messages.birthday.image && (
        <motion.div
          initial={{ scale: 1.1, opacity: 0.2 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 5, ease: "easeOut" }}
          className="absolute inset-[-5%] w-[110%] h-[110%] z-0"
        >
          <Image 
            src={messages.birthday.image} 
            alt="Birthday Background" 
            fill
            priority
            className="object-cover mix-blend-screen" 
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/90" />
        </motion.div>
      )}

      {/* WOW MOMENT: Swarm forming Nona */}
      <AnimatePresence>
        {wowMoment && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1.5 }}
            className="z-20 absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {/* Swirling Sparks Overlay */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute w-64 h-64 border-[40px] border-dotted border-yellow-500/20 rounded-full animate-pulse"
            />
            
            {/* The Text Formed by "Butterflies" (Simulated via glowing text for mobile performance instead of rendering 100 SVGs) */}
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1 }}
              className="font-serif text-7xl md:text-9xl font-bold text-yellow-300 drop-shadow-[0_0_20px_rgba(255,215,0,0.8)] tracking-widest bg-clip-text text-transparent bg-gradient-to-b from-yellow-100 to-yellow-500"
            >
              Nona ❤️
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Foreground Content (Revealed after WOW moment) */}
      <AnimatePresence>
        {showSub && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="z-10 flex flex-col items-center justify-center text-center px-6 mt-16"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 0.5 }}
              className="font-serif text-5xl md:text-8xl font-bold text-white drop-shadow-md leading-tight mb-8"
            >
              {messages.birthday.main}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 1.5 }}
              className="font-serif text-3xl md:text-5xl text-rose-100 drop-shadow-sm tracking-wide"
            >
              {messages.birthday.sub}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSub && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 3 }}
            className="absolute bottom-10 z-20 flex flex-col items-center cursor-pointer group"
            onClick={onNext}
          >
            <span className="text-xs tracking-[0.3em] text-white/50 uppercase mb-4 group-hover:text-white transition-all duration-700">
              Make a Wish
            </span>
            <motion.div
              animate={{ y: [0, 15, 0], opacity: [0.2, 0.8, 0.2] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
