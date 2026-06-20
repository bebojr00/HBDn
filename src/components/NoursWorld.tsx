"use client";

import { motion } from "framer-motion";
import { messages } from "@/data/messages";

export default function NoursWorld({ onNext }: { onNext: () => void }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 text-center">
      {/* Background glass element to suggest a 'garden' or magical environment */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 m-auto w-[90%] md:w-[60%] h-[70%] glass rounded-[40px] z-0 flex items-center justify-center p-8 flex-col"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="z-10"
        >
          <h2 className="font-serif text-4xl md:text-6xl font-medium text-foreground text-glow mb-6">
            {messages.world.title}
          </h2>
          <p className="font-sans text-md md:text-xl text-foreground/80 font-light max-w-md mx-auto italic mb-8">
            &quot;{messages.world.subtitle}&quot;
          </p>

          {messages.world.image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 2 }}
              className="w-full max-w-xs mx-auto aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/40"
            >
              <img src={messages.world.image} alt="World" className="w-full h-full object-cover" />
            </motion.div>
          )}
        </motion.div>

        {/* Scroll indicator to move to next scene */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
          className="absolute bottom-10 flex flex-col items-center cursor-pointer"
          onClick={onNext}
        >
          <span className="text-xs tracking-widest text-foreground/60 uppercase mb-2">Continue</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-foreground/40 to-transparent"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
