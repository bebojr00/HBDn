"use client";

import { useContext } from "react";
import { StoryContext } from "@/components/core/StoryProvider";

export function useScene() {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error("useScene must be used within a StoryProvider");
  }
  return context;
}
