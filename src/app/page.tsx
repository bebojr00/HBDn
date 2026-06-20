"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MagicalParticles from "@/components/Particles";
import { SCENES, getTotalScenes } from "@/data/timeline";

// Dynamic imports
const WelcomeScreen = dynamic(() => import("@/components/WelcomeScreen"));
const NoursWorld = dynamic(() => import("@/components/NoursWorld"));
const Memories = dynamic(() => import("@/components/Memories"));
const HandsStory = dynamic(() => import("@/components/HandsStory"));
const BirthdayMoment = dynamic(() => import("@/components/BirthdayMoment"));
const NameTransformation = dynamic(() => import("@/components/NameTransformation"));
const FinalSurprise = dynamic(() => import("@/components/FinalSurprise"));
const InvitationCard = dynamic(() => import("@/components/InvitationCard"));

export default function Home() {
  const [currentScene, setCurrentScene] = useState<number>(SCENES.WELCOME);
  const [direction, setDirection] = useState(1);

  const nextScene = () => {
    if (currentScene < getTotalScenes() - 1) {
      setDirection(1);
      setCurrentScene((prev) => prev + 1);
    }
  };

  const prevScene = () => {
    if (currentScene > 0) {
      setDirection(-1);
      setCurrentScene((prev) => prev - 1);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const renderScene = () => {
    switch (currentScene) {
      case SCENES.WELCOME: return <WelcomeScreen key="scene-0" onNext={nextScene} />;
      case SCENES.NOURS_WORLD: return <NoursWorld key="scene-1" onNext={nextScene} />;
      case SCENES.MEMORIES: return <Memories key="scene-2" onNext={nextScene} />;
      case SCENES.HANDS_STORY: return <HandsStory key="scene-3" onNext={nextScene} />;
      case SCENES.BIRTHDAY_MOMENT: return <BirthdayMoment key="scene-4" onNext={nextScene} />;
      case SCENES.NAME_TRANSFORMATION: return <NameTransformation key="scene-5" onNext={nextScene} />;
      case SCENES.FINAL_SURPRISE: return <FinalSurprise key="scene-6" onNext={nextScene} />;
      case SCENES.INVITATION: return <InvitationCard key="scene-7" />;
      default: return null;
    }
  };

  // Cinematic Variants
  const cinematicVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      scale: dir > 0 ? 1.05 : 0.95,
      filter: "blur(10px)",
    }),
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }, // Elegant, slow ease
    },
    exit: (dir: number) => ({
      opacity: 0,
      scale: dir > 0 ? 0.95 : 1.05,
      filter: "blur(10px)",
      transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] },
    }),
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white selection:bg-rose-500/30">
      <MagicalParticles />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentScene}
          custom={direction}
          variants={cinematicVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center z-10"
        >
          {renderScene()}
        </motion.div>
      </AnimatePresence>

      {/* Story Progression UI */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
        className="fixed top-8 left-8 md:top-12 md:left-12 z-50 pointer-events-none mix-blend-screen"
      >
        <p className="font-serif italic tracking-[0.2em] text-white/50 text-xs md:text-sm">
          Chapter {currentScene + 1} <span className="mx-2 opacity-30">/</span> {getTotalScenes()}
        </p>
      </motion.div>

      {/* Elegant Navigation */}
      <div className="fixed bottom-8 md:bottom-12 w-full z-50 flex justify-between px-8 md:px-16 pointer-events-none">
        <button
          onClick={prevScene}
          disabled={currentScene === 0}
          className={`p-4 text-white/40 pointer-events-auto transition-all duration-700 hover:text-white hover:scale-110 active:scale-95 flex items-center justify-center ${
            currentScene === 0 ? "opacity-0 cursor-default pointer-events-none" : "opacity-100 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          }`}
          aria-label="Previous scene"
        >
          <ChevronLeft size={32} strokeWidth={1} />
        </button>

        <button
          onClick={nextScene}
          disabled={currentScene === getTotalScenes() - 1}
          className={`p-4 text-white/40 pointer-events-auto transition-all duration-700 hover:text-white hover:scale-110 active:scale-95 flex items-center justify-center ${
            currentScene === getTotalScenes() - 1 ? "opacity-0 cursor-default pointer-events-none" : "opacity-100 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          }`}
          aria-label="Next scene"
        >
          <ChevronRight size={32} strokeWidth={1} />
        </button>
      </div>
    </main>
  );
}
