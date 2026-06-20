import { Variants } from "framer-motion";

export const mobileCinematicVariants: Variants = {
  initial: (dir: number) => ({
    opacity: 0,
    scale: dir > 0 ? 1.02 : 0.98,
  }),
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: "easeOut" }, 
  },
  exit: (dir: number) => ({
    opacity: 0,
    scale: dir > 0 ? 0.98 : 1.02,
    transition: { duration: 1, ease: "easeIn" },
  }),
};
