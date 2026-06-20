"use client";

import { motion } from "framer-motion";
import { messages } from "@/data/messages";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function HandsStory({ onNext }: { onNext: () => void }) {
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
      {/* Full screen cinematic background */}
      {messages.hands.image && (
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            scale: { duration: 20, ease: "easeOut" },
            opacity: { duration: 2, ease: "easeOut" }
          }}
          className="absolute inset-[-5%] w-[110%] h-[110%] z-0"
        >
          <Image 
            src={messages.hands.image} 
            alt="Hands Connection" 
            fill
            priority
            className="object-cover opacity-60 mix-blend-screen" 
            sizes="100vw"
          />
          {/* Warm romantic glow overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/30 via-black/60 to-black" />
        </motion.div>
      )}

      {/* Foreground Content with subtle parallax */}
      <motion.div 
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", stiffness: 30, damping: 30 }}
        className="z-10 flex flex-col items-center justify-center text-center px-6 max-w-3xl mt-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.5, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full max-w-[90vw]"
        >
          <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl font-medium text-white drop-shadow-[0_0_30px_rgba(255,200,150,0.5)] mb-6 sm:mb-8 leading-tight">
            {messages.hands.title}
          </h2>
          <p className="font-sans text-lg sm:text-xl md:text-3xl text-rose-100/90 font-light italic leading-relaxed drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
            &quot;{messages.hands.subtitle}&quot;
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 3.5 }}
          className="mt-32 cursor-pointer group flex flex-col items-center"
          onClick={onNext}
        >
          <span className="text-xs tracking-[0.3em] text-white/50 uppercase mb-6 group-hover:text-white transition-all duration-700">
            Hold On
          </span>
          <motion.div
            animate={{ y: [0, 15, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
