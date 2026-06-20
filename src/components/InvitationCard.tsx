"use client";

import { motion } from "framer-motion";
import { messages } from "@/data/messages";

export default function InvitationCard() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4 md:px-0">
      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="glass relative w-full max-w-lg rounded-[30px] p-8 md:p-12 overflow-hidden flex flex-col items-center text-center shadow-2xl border-white/60"
        style={{ perspective: 1000 }}
      >
        {/* Soft internal glow */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

        {/* Anime Couple Illustration Placeholder / Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-rose-gold/40 to-blush-pink/40 mb-8 border border-white/50 shadow-inner flex items-center justify-center overflow-hidden"
        >
          {messages.invitation.image ? (
            <img src={messages.invitation.image} alt="Couple" className="w-full h-full object-cover" />
          ) : (
            <div className="text-4xl animate-pulse">👩‍❤️‍👨</div>
          )}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-8"
        >
          {messages.invitation.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="flex flex-col space-y-4 w-full"
        >
          {messages.invitation.locations.map((loc, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.6)" }}
              className="w-full py-3 px-6 rounded-2xl bg-white/40 border border-white/30 font-sans text-lg text-foreground/90 flex justify-center items-center transition-colors"
            >
              {loc}
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.5 }}
          className="mt-12 text-sm font-sans tracking-widest text-foreground/50 uppercase"
        >
          Happy Birthday
        </motion.div>
      </motion.div>
    </div>
  );
}
