"use client";

import { motion } from "framer-motion";
import { messages } from "@/data/messages";
import { useEffect, useState } from "react";

export default function BirthdayMoment({ onNext }: { onNext: () => void }) {
  const [showSub, setShowSub] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSub(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 relative cursor-pointer" onClick={onNext}>
      {/* Intense glow for the peak moment */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute inset-0 m-auto w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] rounded-full bg-[radial-gradient(circle,var(--color-soft-pink)_0%,transparent_70%)] blur-3xl -z-10"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="text-center z-10"
      >
        <h1 className="font-serif text-5xl md:text-8xl font-bold text-foreground text-glow mb-6 leading-tight">
          {messages.birthday.main}
        </h1>
        
        {/* Arabic subtitle reveals slightly after */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showSub ? 1 : 0, y: showSub ? 0 : 20 }}
          transition={{ duration: 1.5 }}
          className="font-serif text-3xl md:text-5xl text-rose-gold text-glow"
        >
          {messages.birthday.sub}
        </motion.p>

        {messages.birthday.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: showSub ? 1 : 0, scale: showSub ? 1 : 0.8 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="w-56 h-56 md:w-72 md:h-72 mx-auto mt-12 rounded-full overflow-hidden shadow-[0_0_40px_rgba(255,182,193,0.6)] border-4 border-white"
          >
            <img src={messages.birthday.image} alt="Birthday" className="w-full h-full object-cover" />
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 5 }}
        className="absolute bottom-10 flex flex-col items-center"
      >
        <span className="text-xs tracking-widest text-foreground/60 uppercase mb-2">Tap Anywhere</span>
      </motion.div>
    </div>
  );
}
