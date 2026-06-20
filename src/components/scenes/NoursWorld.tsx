"use client";

import { motion } from "framer-motion";
import { messages } from "@/data/messages";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function NoursWorld({ onNext }: { onNext: () => void }) {
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
      {/* Immersive background with a slow pan effect */}
      {messages.world.image && (
        <motion.div
          initial={{ scale: 1.15, x: "5%", opacity: 0 }}
          animate={{ 
            scale: 1.05, 
            x: "0%", 
            opacity: 1,
          }}
          transition={{ 
            scale: { duration: 25, ease: "linear" },
            x: { duration: 25, ease: "linear" },
            opacity: { duration: 2, ease: "easeOut" }
          }}
          className="absolute inset-[-10%] w-[120%] h-[120%] z-0"
        >
          <Image 
            src={messages.world.image} 
            alt="World Background" 
            fill
            priority
            className="object-cover opacity-60 mix-blend-screen" 
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/50 to-black" />
        </motion.div>
      )}

      {/* Foreground Content */}
      <motion.div 
        animate={{ x: mousePos.x * 1.5, y: mousePos.y * 1.5 }}
        transition={{ type: "spring", stiffness: 40, damping: 30 }}
        className="z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl mt-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.5, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="font-serif text-4xl md:text-7xl font-medium text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.6)] mb-8">
            {messages.world.title}
          </h2>
          <p className="font-sans text-lg md:text-2xl text-white/80 font-light max-w-2xl mx-auto italic leading-relaxed drop-shadow-md">
            &quot;{messages.world.subtitle}&quot;
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 3 }}
          className="mt-32 cursor-pointer group flex flex-col items-center"
          onClick={onNext}
        >
          <span className="text-xs tracking-[0.3em] text-white/50 uppercase mb-6 group-hover:text-white transition-all duration-700">
            Journey Deeper
          </span>
          <motion.div
            animate={{ y: [0, 15, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
