"use client";

import { motion } from "framer-motion";
import { messages } from "@/data/messages";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function WelcomeScreen({ onNext }: { onNext: () => void }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* Full viewport background image with slow cinematic zoom and subtle parallax */}
      {messages.welcome.image && (
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            x: mousePos.x,
            y: mousePos.y
          }}
          transition={{ 
            scale: { duration: 15, ease: "easeOut" },
            opacity: { duration: 2, ease: "easeOut" },
            x: { type: "spring", stiffness: 40, damping: 30 },
            y: { type: "spring", stiffness: 40, damping: 30 }
          }}
          className="absolute inset-[-5%] w-[110%] h-[110%] z-0"
        >
          <Image 
            src={messages.welcome.image} 
            alt="Welcome Background" 
            fill
            priority
            className="object-cover opacity-50 mix-blend-screen" 
            sizes="100vw"
          />
          {/* Gradient overlay for text readability and cinematic vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black" />
        </motion.div>
      )}

      {/* Foreground Content */}
      <div className="z-10 flex flex-col items-center justify-center text-center px-6 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.5, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="font-serif text-5xl md:text-8xl font-medium tracking-wide text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)] mb-8">
            {messages.welcome.title}
          </h1>
          <p className="font-sans text-xl md:text-2xl text-rose-200 tracking-[0.4em] font-light uppercase">
            {messages.welcome.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 3.5 }}
          className="mt-32 cursor-pointer group flex flex-col items-center"
          onClick={onNext}
        >
          <span className="text-xs tracking-[0.3em] text-white/50 uppercase mb-6 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-700">
            {messages.welcome.button}
          </span>
          <motion.div
            animate={{ y: [0, 15, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent"
          />
        </motion.div>
      </div>
    </div>
  );
}
