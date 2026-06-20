"use client";

import { useMemo, useEffect, useState } from "react";
import Particles, { ParticlesProvider, useParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Engine } from "@tsparticles/engine";
import { motion } from "framer-motion";

function ParticlesContent() {
  const { loaded } = useParticlesProvider();
  
  const options = useMemo(() => ({
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    particles: {
      color: { value: ["#FFD700", "#ffb6c1", "#ffffff"] },
      move: {
        direction: "top-right" as const,
        enable: true,
        outModes: { default: "out" as const },
        random: true,
        speed: 0.4,
        straight: false,
      },
      number: {
        density: { enable: true, width: 1000, height: 1000 },
        value: 30, // Sparse, elegant
      },
      opacity: {
        value: { min: 0.1, max: 0.6 },
        animation: { enable: true, speed: 0.5, sync: false },
      },
      shape: { type: "circle" },
      size: {
        value: { min: 0.5, max: 3 },
        animation: { enable: true, speed: 1, sync: false },
      },
    },
    detectRetina: true,
  }), []);

  if (!loaded) return null;

  return <Particles id="tsparticles" options={options} />;
}

const Butterfly = ({ delay, duration, yOffset }: { delay: number, duration: number, yOffset: number }) => {
  return (
    <motion.div
      initial={{ x: "-10vw", y: `${yOffset}vh`, opacity: 0, scale: 0.5 }}
      animate={{ 
        x: "110vw", 
        y: [`${yOffset}vh`, `${yOffset - 10}vh`, `${yOffset + 5}vh`, `${yOffset - 15}vh`],
        opacity: [0, 1, 1, 0],
      }}
      transition={{ 
        duration, 
        delay, 
        repeat: Infinity, 
        repeatDelay: delay * 1.5,
        ease: "linear" 
      }}
      className="absolute pointer-events-none z-10"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/30 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
        <motion.path 
          animate={{ scaleX: [1, 0.2, 1] }}
          transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
          d="M12 12C12 12 7 6 2 8C2 8 4 14 12 12Z" fill="currentColor" 
        />
        <motion.path 
          animate={{ scaleX: [1, 0.2, 1] }}
          transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
          d="M12 12C12 12 17 6 22 8C22 8 20 14 12 12Z" fill="currentColor" 
        />
        <motion.path 
          animate={{ scaleX: [1, 0.4, 1] }}
          transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
          d="M12 12C12 12 8 18 4 16C4 16 6 12 12 12Z" fill="currentColor" 
        />
        <motion.path 
          animate={{ scaleX: [1, 0.4, 1] }}
          transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
          d="M12 12C12 12 16 18 20 16C20 16 18 12 12 12Z" fill="currentColor" 
        />
      </svg>
    </motion.div>
  );
};

export default function MagicalParticles() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const init = async (engine: Engine) => {
    await loadSlim(engine);
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 mix-blend-screen opacity-80">
        <ParticlesProvider init={init}>
          <ParticlesContent />
        </ParticlesProvider>
      </div>
      
      {/* Subtle Butterflies */}
      {mounted && (
        <>
          <Butterfly delay={2} duration={20} yOffset={70} />
          <Butterfly delay={12} duration={25} yOffset={30} />
          <Butterfly delay={25} duration={22} yOffset={50} />
        </>
      )}
    </div>
  );
}
