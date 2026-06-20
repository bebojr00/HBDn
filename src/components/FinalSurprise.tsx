"use client";

import { motion } from "framer-motion";
import { messages } from "@/data/messages";
import { useEffect, useState } from "react";

export default function FinalSurprise({ onNext }: { onNext: () => void }) {
  const [showReveal, setShowReveal] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const revealTimer = setTimeout(() => {
      setShowReveal(true);
    }, 5000); // Suspense
    
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 8000); // Button appears after the reveal
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(buttonTimer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Immersive Background */}
      {messages.surprise.image && (
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ 
            scale: showReveal ? 1.05 : 1.1, 
            opacity: showReveal ? 1 : 0 
          }}
          transition={{ duration: 5, ease: "easeOut" }}
          className="absolute inset-[-5%] w-[110%] h-[110%] z-0"
        >
          <img 
            src={messages.surprise.image} 
            alt="Surprise Background" 
            className="w-full h-full object-cover mix-blend-screen opacity-50" 
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/50 to-black/90" />
        </motion.div>
      )}

      {/* Intro Text */}
      <motion.p
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: showReveal ? 0 : 1, 
          scale: showReveal ? 1.05 : 1,
          filter: showReveal ? "blur(10px)" : "blur(0px)" 
        }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="font-serif text-3xl md:text-5xl text-white/80 italic absolute z-10 text-center tracking-wide px-6 leading-relaxed"
      >
        {messages.surprise.intro}
      </motion.p>

      {/* The Big Reveal */}
      <motion.div
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", stiffness: 30, damping: 30 }}
        className="z-20 flex flex-col items-center justify-center text-center absolute pointer-events-none"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
          animate={{ 
            opacity: showReveal ? 1 : 0, 
            scale: showReveal ? 1 : 0.9,
            filter: showReveal ? "blur(0px)" : "blur(20px)"
          }}
          transition={{ duration: 3, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif text-4xl md:text-7xl font-bold text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] leading-normal max-w-4xl px-6"
        >
          {messages.surprise.reveal}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showButton ? 1 : 0 }}
          transition={{ duration: 2 }}
          className={`mt-24 cursor-pointer group flex flex-col items-center pointer-events-auto ${!showButton ? 'pointer-events-none' : ''}`}
          onClick={onNext}
        >
          <span className="text-xs tracking-[0.3em] text-white/70 uppercase mb-4 group-hover:text-white transition-all duration-700 drop-shadow-md">
            {messages.surprise.button}
          </span>
          <motion.div
            animate={{ y: [0, 15, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
