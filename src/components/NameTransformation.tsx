"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const names = ["Nour", "نورة", "Nona", "نونة ❤️"];

export default function NameTransformation({ onNext }: { onNext: () => void }) {
  const [index, setIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (index < names.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 2500); // Wait 2.5s before changing name
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsFinished(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative cursor-pointer" onClick={() => isFinished && onNext()}>
      <div className="h-40 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="text-6xl md:text-8xl font-serif text-foreground text-glow text-center"
          >
            {names[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isFinished ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center"
      >
        <span className="text-xs tracking-widest text-foreground/60 uppercase mb-2">Tap Anywhere</span>
      </motion.div>
    </div>
  );
}
