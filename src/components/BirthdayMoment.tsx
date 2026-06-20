"use client";

import { motion } from "framer-motion";
import { messages } from "@/data/messages";
import { useEffect, useState } from "react";

export default function BirthdayMoment({ onNext }: { onNext: () => void }) {
  const [showSub, setShowSub] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSub(true);
    }, 2500);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* Cinematic Background */}
      {messages.birthday.image && (
        <motion.div
          initial={{ scale: 1.2, filter: "brightness(0.2) blur(10px)" }}
          animate={{ scale: 1, filter: "brightness(0.6) blur(0px)" }}
          transition={{ duration: 5, ease: "easeOut" }}
          className="absolute inset-[-5%] w-[110%] h-[110%] z-0"
        >
          <img 
            src={messages.birthday.image} 
            alt="Birthday Background" 
            className="w-full h-full object-cover mix-blend-screen opacity-70" 
          />
          {/* Intense vignette for focus on text */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/90" />
        </motion.div>
      )}

      {/* Foreground Content */}
      <motion.div
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", stiffness: 20, damping: 20 }}
        className="z-10 flex flex-col items-center justify-center text-center px-6 mt-16"
      >
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 3, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif text-6xl md:text-9xl font-bold text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.7)] leading-tight mb-8"
        >
          {messages.birthday.main}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
          animate={{ 
            opacity: showSub ? 1 : 0, 
            y: showSub ? 0 : 20,
            filter: showSub ? "blur(0px)" : "blur(5px)"
          }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="font-serif text-4xl md:text-6xl text-rose-100 drop-shadow-[0_0_20px_rgba(255,200,200,0.6)] tracking-wide"
        >
          {messages.birthday.sub}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 5 }}
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
    </div>
  );
}
