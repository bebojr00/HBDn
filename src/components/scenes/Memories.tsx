"use client";

import { motion, Variants } from "framer-motion";
import { messages } from "@/data/messages";
import { memories } from "@/data/memories";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Memories({ onNext }: { onNext: () => void }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.8, delayChildren: 1 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 2, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Dynamic Background based on the first memory (Opacity only) */}
      {memories[0] && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 4 }}
          className="absolute inset-[-10%] w-[120%] h-[120%] z-0"
        >
          <Image src={memories[0].image} alt="" fill priority className="object-cover opacity-10 mix-blend-screen" sizes="100vw" />
        </motion.div>
      )}

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-16 md:top-24 z-30 w-full text-center px-4"
      >
        <p className="font-serif text-3xl md:text-5xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] italic font-light">
          &quot;{messages.memories.quote}&quot;
        </p>
      </motion.div>

      {/* Cinematic Memories Collage */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative w-full h-[70vh] flex items-center justify-center z-10"
      >
        {memories.map((memory, i) => {
          const isCenter = i === Math.floor(memories.length / 2);
          const xOffset = (i - Math.floor(memories.length / 2)) * 25; // vw
          const yOffset = i % 2 === 0 ? 10 : -10; // vh
          const rotation = i % 2 === 0 ? 2 : -2;

          return (
            <motion.div
              key={memory.id}
              variants={cardVariants}
              animate={{ 
                x: mousePos.x * (isCenter ? 1 : 1.5) + xOffset + "vw", 
                y: mousePos.y * (isCenter ? 1 : 1.5) + yOffset + "vh",
                rotate: rotation
              }}
              transition={{ type: "spring", stiffness: 30, damping: 25 }}
              whileHover={{ scale: 1.05, zIndex: 40, rotate: 0 }}
              className={`absolute ${isCenter ? 'w-[75vw] md:w-[45vw] h-[60vh] md:h-[75vh] z-20' : 'w-[50vw] md:w-[30vw] h-[40vh] md:h-[50vh] z-10'} rounded-lg overflow-hidden shadow-2xl border-[1px] border-white/20`}
            >
              {/* Image */}
              <Image
                src={memory.image}
                alt={memory.caption}
                fill
                className="object-cover opacity-80 mix-blend-lighten"
                sizes="(max-width: 768px) 75vw, 45vw"
                priority={i === 0}
              />
              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 pointer-events-none" />
              
              <p className="absolute bottom-8 left-0 right-0 text-center font-sans text-sm md:text-xl text-white font-light tracking-[0.2em] drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
                {memory.caption}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 5 }}
        className="absolute bottom-10 flex flex-col items-center cursor-pointer z-30 group"
        onClick={onNext}
      >
        <span className="text-xs tracking-[0.3em] text-white/50 uppercase mb-4 group-hover:text-white transition-all duration-700">
          Turn the Page
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
