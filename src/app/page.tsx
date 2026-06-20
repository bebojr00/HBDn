"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import MagicalParticles from "@/components/Particles";
import { SCENES, getTotalScenes } from "@/data/timeline";

// Dynamic imports for scenes to optimize loading and support the linear flow
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

  const nextScene = () => {
    if (currentScene < getTotalScenes() - 1) {
      setCurrentScene((prev) => prev + 1);
    }
  };

  // Prevent default scrolling on body to enforce linear cinematic experience
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const renderScene = () => {
    switch (currentScene) {
      case SCENES.WELCOME:
        return <WelcomeScreen key="scene-0" onNext={nextScene} />;
      case SCENES.NOURS_WORLD:
        return <NoursWorld key="scene-1" onNext={nextScene} />;
      case SCENES.MEMORIES:
        return <Memories key="scene-2" onNext={nextScene} />;
      case SCENES.HANDS_STORY:
        return <HandsStory key="scene-3" onNext={nextScene} />;
      case SCENES.BIRTHDAY_MOMENT:
        return <BirthdayMoment key="scene-4" onNext={nextScene} />;
      case SCENES.NAME_TRANSFORMATION:
        return <NameTransformation key="scene-5" onNext={nextScene} />;
      case SCENES.FINAL_SURPRISE:
        return <FinalSurprise key="scene-6" onNext={nextScene} />;
      case SCENES.INVITATION:
        return <InvitationCard key="scene-7" />;
      default:
        return null;
    }
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-background">
      {/* Global Particle System runs across all scenes */}
      <MagicalParticles />

      {/* Cinematic Scene Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center z-10"
        >
          {renderScene()}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
