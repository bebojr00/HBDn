"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = new Audio("/song.mp3");
    audio.loop = true;
    audioRef.current = audio;

    const playAudio = async () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Audio autoplay prevented by browser. User must click first.");
        }
      }
    };

    window.addEventListener("click", playAudio, { once: true });
    window.addEventListener("touchstart", playAudio, { once: true });

    return () => {
      window.removeEventListener("click", playAudio);
      window.removeEventListener("touchstart", playAudio);
      audio.pause();
    };
  }, [hasInteracted]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      onClick={toggleAudio}
      className="fixed bottom-8 right-8 z-[100] p-3 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white transition-colors duration-300"
      aria-label="Toggle Audio"
    >
      {isPlaying ? <Volume2 size={24} strokeWidth={1.5} /> : <VolumeX size={24} strokeWidth={1.5} />}
    </motion.button>
  );
}
