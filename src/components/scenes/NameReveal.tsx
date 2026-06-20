"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const names = ["Nour", "نورة", "Nona", "نونة ❤️"];

export default function NameTransformation({ onNext }: { onNext: () => void }) {
  const [index, setIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (index < names.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 3500); // Slower, more elegant transitions
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsFinished(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [index]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Deep cinematic background glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-900/40 via-black to-black"
      />

      <motion.div 
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", stiffness: 30, damping: 30 }}
        className="z-10 h-64 flex items-center justify-center w-full relative"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-7xl md:text-9xl font-serif text-white drop-shadow-[0_0_30px_rgba(255,200,200,0.6)] text-center absolute"
          >
            {names[index]}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isFinished ? 1 : 0 }}
        transition={{ duration: 2 }}
        className="absolute bottom-10 z-20 flex flex-col items-center cursor-pointer group"
        onClick={() => isFinished && onNext()}
      >
        <span className="text-xs tracking-[0.3em] text-white/50 uppercase mb-4 group-hover:text-white transition-all duration-700">
          The Final Chapter
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
