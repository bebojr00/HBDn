"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for the preloader animation to finish
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
        >
          <motion.svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          >
            <motion.path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              initial={{ pathLength: 0, fill: "rgba(255,255,255,0)" }}
              animate={{ 
                pathLength: 1, 
                fill: "rgba(255,255,255,1)" 
              }}
              transition={{ 
                pathLength: { duration: 1.5, ease: "easeInOut" },
                fill: { duration: 1, delay: 1.2, ease: "easeIn" }
              }}
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
