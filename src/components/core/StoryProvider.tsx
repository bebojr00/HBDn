"use client";

import { createContext, useState, ReactNode } from "react";
import { SCENES, getTotalScenes } from "@/data/scenes";

interface StoryContextType {
  currentScene: number;
  direction: number;
  isTransitioning: boolean;
  nextScene: () => void;
  prevScene: () => void;
  getTotalScenes: () => number;
}

export const StoryContext = createContext<StoryContextType | undefined>(undefined);

export function StoryProvider({ children }: { children: ReactNode }) {
  const [currentScene, setCurrentScene] = useState<number>(SCENES.WELCOME);
  const [direction, setDirection] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextScene = () => {
    if (currentScene < getTotalScenes() - 1 && !isTransitioning) {
      setDirection(1);
      setCurrentScene((prev) => prev + 1);
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 1500);
    }
  };

  const prevScene = () => {
    if (currentScene > 0 && !isTransitioning) {
      setDirection(-1);
      setCurrentScene((prev) => prev - 1);
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 1500);
    }
  };

  return (
    <StoryContext.Provider
      value={{
        currentScene,
        direction,
        isTransitioning,
        nextScene,
        prevScene,
        getTotalScenes,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
}
