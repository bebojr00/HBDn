"use client";

import { useEffect } from "react";
import { StoryProvider } from "@/components/core/StoryProvider";
import { StoryOrchestrator } from "@/components/core/StoryOrchestrator";
import ButterflyOverlay from "@/components/effects/ButterflyOverlay";
import Sparkles from "@/components/effects/Sparkles";
import { LoveCounter } from "@/components/ui/LoveCounter";
import AudioPlayer from "@/components/ui/AudioPlayer";
import Preloader from "@/components/ui/Preloader";

export default function Home() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white selection:bg-rose-500/30">
      <Preloader />
      <Sparkles />
      <ButterflyOverlay />
      
      {/* Love Counter Global Overlay */}
      <LoveCounter />
      
      {/* Background Voice Note */}
      <AudioPlayer />

      <StoryProvider>
        <StoryOrchestrator />
      </StoryProvider>
    </main>
  );
}
