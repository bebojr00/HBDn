"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useScene } from "@/hooks/useScene";
import { SCENES } from "@/data/scenes";
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { mobileCinematicVariants } from "@/utils/animations";

// Dynamic imports
const Welcome = dynamic(() => import("@/components/scenes/Welcome"));
const NoursWorld = dynamic(() => import("@/components/scenes/NoursWorld"));
const Memories = dynamic(() => import("@/components/scenes/Memories"));
const HandsStory = dynamic(() => import("@/components/scenes/HandsStory"));
const BirthdayMoment = dynamic(() => import("@/components/scenes/BirthdayMoment"));
const NameReveal = dynamic(() => import("@/components/scenes/NameReveal"));
const FinalScene = dynamic(() => import("@/components/scenes/FinalScene"));
const InvitationCard = dynamic(() => import("@/components/scenes/InvitationCard"));

export function StoryOrchestrator() {
  const { currentScene, direction, isTransitioning, nextScene, prevScene, getTotalScenes } = useScene();
  const scenesCount = getTotalScenes();

  const renderScene = () => {
    switch (currentScene) {
      case SCENES.WELCOME: return <Welcome key="scene-0" onNext={nextScene} />;
      case SCENES.NOURS_WORLD: return <NoursWorld key="scene-1" onNext={nextScene} />;
      case SCENES.MEMORIES: return <Memories key="scene-2" onNext={nextScene} />;
      case SCENES.HANDS_STORY: return <HandsStory key="scene-3" onNext={nextScene} />;
      case SCENES.BIRTHDAY_MOMENT: return <BirthdayMoment key="scene-4" onNext={nextScene} />;
      case SCENES.NAME_TRANSFORMATION: return <NameReveal key="scene-5" onNext={nextScene} />;
      case SCENES.FINAL_SURPRISE: return <FinalScene key="scene-6" onNext={nextScene} />;
      case SCENES.INVITATION: return <InvitationCard key="scene-7" />;
      default: return null;
    }
  };

  return (
    <>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentScene}
          custom={direction}
          variants={mobileCinematicVariants}
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
        className="fixed top-8 left-8 md:top-12 md:left-12 z-50 pointer-events-none"
      >
        <p className="font-serif italic tracking-[0.2em] text-white/70 text-xs md:text-sm drop-shadow-md">
          Chapter {currentScene + 1} <span className="mx-2 opacity-50">/</span> {scenesCount}
        </p>
      </motion.div>

      {/* Elegant Navigation */}
      <div className="fixed bottom-8 md:bottom-12 w-full z-50 flex justify-between px-8 md:px-16 pointer-events-none">
        <button
          onClick={prevScene}
          disabled={currentScene === 0 || isTransitioning}
          className={`p-4 text-white/50 pointer-events-auto transition-opacity duration-500 flex items-center justify-center ${
            currentScene === 0 ? "opacity-0 cursor-default pointer-events-none" : "opacity-100 hover:opacity-100"
          }`}
          aria-label="Previous scene"
        >
          <ChevronLeft size={32} strokeWidth={1.5} />
        </button>

        <button
          onClick={nextScene}
          disabled={currentScene === scenesCount - 1 || isTransitioning}
          className={`p-4 text-white/50 pointer-events-auto transition-opacity duration-500 flex items-center justify-center ${
            currentScene === scenesCount - 1 ? "opacity-0 cursor-default pointer-events-none" : "opacity-100 hover:opacity-100"
          }`}
          aria-label="Next scene"
        >
          <ChevronRight size={32} strokeWidth={1.5} />
        </button>
      </div>

      {/* Butterfly Transition Guide */}
      <AnimatePresence>
        {isTransitioning && direction > 0 && (
          <motion.div
            initial={{ x: "-10vw", y: "60vh", opacity: 0, scale: 0.5 }}
            animate={{ x: "110vw", y: "40vh", opacity: [0, 1, 1, 0], scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed z-[100] pointer-events-none"
          >
             <svg width="40" height="40" viewBox="0 0 24 24" fill="#FFF0F5" opacity="0.9" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C12 2 10.5 5 8 5C5.5 5 3 4 3 6C3 8 7 10 10 11C10 11 8 13 6 15C4 17 2 19 3 20C4 21 7 19 9 17C11 15 12 13 12 13C12 13 13 15 15 17C17 19 20 21 21 20C22 19 20 17 18 15C16 13 14 11 14 11C17 10 21 8 21 6C21 4 18.5 5 16 5C13.5 5 12 2 12 2Z" />
             </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
