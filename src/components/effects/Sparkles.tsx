"use client";

import { useEffect, useState } from "react";

export default function Sparkles() {
  const [mounted, setMounted] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    setMounted(true);
    // Minimal sparkles for mobile performance
    const newSparkles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }));
    setSparkles(newSparkles);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden mix-blend-screen">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-sparkle {
          0% { opacity: 0; transform: scale(0) translateY(0); }
          50% { opacity: 0.6; transform: scale(1) translateY(-5vh); }
          100% { opacity: 0; transform: scale(0) translateY(-10vh); }
        }
      `}} />
      {sparkles.map((s) => (
        <div
          key={`sparkle-${s.id}`}
          className="absolute w-1 h-1 bg-rose-200 rounded-full"
          style={{
            left: `${s.x}vw`,
            top: `${s.y}vh`,
            animation: `float-sparkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            willChange: 'transform, opacity'
          }}
        />
      ))}
    </div>
  );
}
