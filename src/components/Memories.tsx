"use client";

import { motion } from "framer-motion";
import { messages } from "@/data/messages";
import { memories } from "@/data/memories";

export default function Memories({ onNext }: { onNext: () => void }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.4, delayChildren: 0.5 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" as const },
    },
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 relative">
      {/* Centered quote */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute top-24 z-20 w-full text-center px-4"
      >
        <p className="font-serif text-2xl md:text-4xl text-foreground text-glow italic font-medium">
          &quot;{messages.memories.quote}&quot;
        </p>
      </motion.div>

      {/* Floating Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative w-full max-w-4xl h-[60vh] mt-20 flex flex-wrap items-center justify-center gap-8"
      >
        {memories.map((memory, i) => {
          // Calculate arbitrary floating positions for a 'scattered' pinterest feel
          const isEven = i % 2 === 0;
          const yOffset = isEven ? -20 : 20;

          return (
            <motion.div
              key={memory.id}
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotate: isEven ? 2 : -2, zIndex: 30 }}
              className={`glass rounded-2xl p-4 w-40 h-56 md:w-56 md:h-72 flex flex-col items-center justify-end shadow-xl relative cursor-pointer`}
              style={{
                transform: `translateY(${yOffset}px) rotate(${isEven ? -3 : 3}deg)`,
              }}
            >
              {/* Image */}
              <div className="absolute inset-4 rounded-xl bg-white/20 overflow-hidden">
                {memory.image.startsWith("/") ? (
                  <img
                    src={memory.image}
                    alt={memory.caption}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-rose-gold/30 to-blush-pink/30 animate-pulse" />
                )}
              </div>
              
              <p className="font-sans text-xs md:text-sm text-foreground/80 font-medium z-10 bg-white/40 px-3 py-1 rounded-full backdrop-blur-md mb-2">
                {memory.caption}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 4 }}
        className="absolute bottom-10 flex flex-col items-center cursor-pointer z-30"
        onClick={onNext}
      >
        <span className="text-xs tracking-widest text-foreground/60 uppercase mb-2">Next Chapter</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-foreground/40 to-transparent"
        />
      </motion.div>
    </div>
  );
}
