"use client";

import { motion } from "framer-motion";
import { messages } from "@/data/messages";
import { useEffect, useState } from "react";

export default function InvitationCard() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Immersive Background */}
      {messages.invitation.image && (
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-[-5%] w-[110%] h-[110%] z-0"
        >
          <img 
            src={messages.invitation.image} 
            alt="Invitation Background" 
            className="w-full h-full object-cover mix-blend-screen opacity-40" 
          />
          {/* Deep Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/60 to-black" />
        </motion.div>
      )}

      {/* Foreground Content */}
      <motion.div 
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", stiffness: 20, damping: 30 }}
        className="z-10 flex flex-col items-center text-center px-6 max-w-2xl w-full"
      >
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.5, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif text-5xl md:text-7xl font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] mb-16"
        >
          {messages.invitation.title}
        </motion.h2>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.8, delayChildren: 2.5 }
            }
          }}
          className="flex flex-col space-y-10 w-full"
        >
          {messages.invitation.locations.map((loc, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
                show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 2, ease: "easeOut" } }
              }}
              whileHover={{ scale: 1.05, textShadow: "0 0 15px rgba(255,255,255,0.8)" }}
              className="font-serif text-2xl md:text-4xl text-rose-100/90 font-light cursor-pointer transition-all duration-500 drop-shadow-md"
            >
              {loc}
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 6 }}
          className="mt-32 text-xs font-sans tracking-[0.5em] text-white/40 uppercase"
        >
          Happy Birthday
        </motion.div>
      </motion.div>
    </div>
  );
}
