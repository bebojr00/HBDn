"use client";

import { useState, useEffect } from "react";
import { messages } from "@/data/messages";

const MajesticButterfly = ({ color, isGolden }: { color: string, isGolden?: boolean }) => (
  <div className="relative w-8 h-8 flex items-center justify-center butterfly-container" style={{ perspective: "400px" }}>
    {isGolden && (
      <div className="absolute inset-0 bg-yellow-400/40 blur-[8px] rounded-full scale-150 animate-pulse" />
    )}
    
    <div className="absolute w-full h-full flex butterfly-body">
      <svg 
        style={{ transformOrigin: "right center" }}
        className="w-1/2 h-full drop-shadow-md wing-left" 
        viewBox="0 0 12 24" 
        fill="none"
      >
        <path d="M12 12C12 12 7 10 3 14C-1 18 0 22 2 23C4 24 8 20 10 16C12 14 12 12 12 12Z" fill={color} opacity="0.9"/>
        <path d="M12 12C12 12 8 8 4 3C0 -2 2 0 4 1C6 2 10 6 12 10C12 11 12 12 12 12Z" fill={color} opacity="0.7"/>
      </svg>
      
      <svg 
        style={{ transformOrigin: "left center" }}
        className="w-1/2 h-full drop-shadow-md wing-right" 
        viewBox="0 0 12 24" 
        fill="none"
      >
        <path d="M0 12C0 12 5 10 9 14C13 18 12 22 10 23C8 24 4 20 2 16C0 14 0 12 0 12Z" fill={color} opacity="0.9"/>
        <path d="M0 12C0 12 4 8 8 3C12 -2 10 0 8 1C6 2 2 6 0 10C0 11 0 12 0 12Z" fill={color} opacity="0.7"/>
      </svg>
    </div>
  </div>
);

type ButterflyData = {
  id: number;
  type: "normal" | "poetry" | "golden";
  x: number;
  y: number;
  duration: number;
  delay: number;
  scale: number;
};

export default function ButterflyOverlay() {
  const [mounted, setMounted] = useState(false);
  const [butterflies, setButterflies] = useState<ButterflyData[]>([]);
  const [activeMessage, setActiveMessage] = useState<{ id: number, text: string, x: number, y: number, golden: boolean } | null>(null);

  useEffect(() => {
    setMounted(true);
    const newButterflies: ButterflyData[] = [];
    
    // Exactly 8 butterflies (6 normal/poetry, 2 golden)
    for (let i = 0; i < 6; i++) {
      newButterflies.push({
        id: i,
        type: Math.random() > 0.6 ? "poetry" : "normal",
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 20 + Math.random() * 25,
        delay: Math.random() * 8,
        scale: 0.6 + Math.random() * 0.4,
      });
    }

    for (let i = 6; i < 8; i++) {
      newButterflies.push({
        id: i,
        type: "golden",
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 30 + Math.random() * 15,
        delay: Math.random() * 10,
        scale: 1 + Math.random() * 0.3,
      });
    }

    setButterflies(newButterflies);
  }, []);

  const getMessage = (type: string) => {
    if (type === "golden") return messages.butterflies.golden[Math.floor(Math.random() * messages.butterflies.golden.length)];
    if (type === "poetry") return messages.butterflies.poetry[Math.floor(Math.random() * messages.butterflies.poetry.length)];
    return messages.butterflies.normal[Math.floor(Math.random() * messages.butterflies.normal.length)];
  };

  const handleButterflyClick = (e: React.MouseEvent, b: ButterflyData) => {
    e.stopPropagation();
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
    setActiveMessage({
      id: b.id,
      text: getMessage(b.type),
      x: e.clientX,
      y: e.clientY,
      golden: b.type === "golden"
    });

    setTimeout(() => {
      setActiveMessage((prev) => prev?.id === b.id ? null : prev);
    }, 4500);
  };

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-path {
          0% { transform: translate(0, 0) rotate(0deg) scale(var(--scale)); opacity: 0; }
          20% { opacity: 1; }
          25% { transform: translate(40vw, -30vh) rotate(20deg) scale(var(--scale)); }
          50% { transform: translate(-30vw, -90vh) rotate(-20deg) scale(var(--scale)); }
          75% { transform: translate(20vw, -120vh) rotate(10deg) scale(var(--scale)); opacity: 1; }
          100% { transform: translate(0vw, -150vh) rotate(0deg) scale(var(--scale)); opacity: 0; }
        }
        @keyframes flap-left {
          0%, 100% { transform: rotateY(0deg); }
          50% { transform: rotateY(60deg); }
        }
        @keyframes flap-right {
          0%, 100% { transform: rotateY(0deg); }
          50% { transform: rotateY(-60deg); }
        }
        @keyframes body-tilt {
          0%, 100% { transform: rotateZ(0deg); }
          50% { transform: rotateZ(5deg); }
        }
        @keyframes msg-fade-in {
          0% { opacity: 0; transform: translate(-50%, -80%) scale(0.8); }
          100% { opacity: 1; transform: translate(-50%, -100%) scale(1); }
        }
        .wing-left { animation: flap-left 0.4s infinite ease-in-out; will-change: transform; }
        .wing-right { animation: flap-right 0.4s infinite ease-in-out; will-change: transform; }
        .butterfly-body { animation: body-tilt 4s infinite ease-in-out; will-change: transform; }
        .butterfly-wrapper {
          position: absolute;
          left: var(--start-x);
          bottom: -10vh;
          will-change: transform, opacity;
        }
      `}} />

      {butterflies.map((b) => (
        <div
          key={b.id}
          className="butterfly-wrapper pointer-events-auto cursor-pointer p-6 hover:z-[100] transition-transform"
          onClick={(e) => handleButterflyClick(e, b)}
          style={{
            '--start-x': `${b.x}vw`,
            '--scale': b.scale,
            animation: `float-path ${b.duration}s ease-in-out ${b.delay}s infinite`,
          } as React.CSSProperties}
        >
          <MajesticButterfly 
            color={b.type === "golden" ? "url(#goldGradient)" : "url(#roseGradient)"} 
            isGolden={b.type === "golden"}
          />
        </div>
      ))}

      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF7D6" />
            <stop offset="50%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
          <linearGradient id="roseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#FFB6C1" />
            <stop offset="100%" stopColor="#FF69B4" />
          </linearGradient>
        </defs>
      </svg>

      {activeMessage && (
        <div
          style={{
            position: 'absolute',
            left: activeMessage.x,
            top: activeMessage.y,
            animation: 'msg-fade-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
          }}
          className="pointer-events-none z-[70] flex flex-col items-center"
        >
          <div className={`
            px-6 py-3 rounded-full text-center whitespace-nowrap shadow-xl transition-all
            ${activeMessage.golden 
              ? 'bg-gradient-to-r from-yellow-900/90 to-black/90 text-yellow-300 font-bold border border-yellow-500/50' 
              : 'bg-black/70 text-rose-100 border border-rose-300/30'}
          `}>
            <p className="font-serif text-xl md:text-2xl drop-shadow-md tracking-wide">
              {activeMessage.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
