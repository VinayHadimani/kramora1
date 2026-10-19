"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * TextMorph — per-character staggered morph between words.
 *
 * Each character is keyed by `${char}-${index}`. When the `text` prop changes,
 * characters whose key persists render statically (no animation), while changed
 * characters exit (y offset + fade) and enter simultaneously via AnimatePresence
 * in `popLayout` mode, producing the classic "text morph" effect.
 */

const characterVariants: Variants = {
  enter: (index: number) => ({
    y: 14,
    opacity: 0,
    transition: {
      delay: Math.min(index * 0.02, 0.35),
      duration: 0.24,
      ease: "easeOut",
    },
  }),
  center: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.24, ease: "easeOut" },
  },
  exit: (index: number) => ({
    y: -14,
    opacity: 0,
    transition: {
      delay: Math.min(index * 0.02, 0.35),
      duration: 0.18,
      ease: "easeIn",
    },
  }),
};

export function TextMorph({ text, className }: { text: string; className?: string }) {
  const characters = Array.from(text);

  return (
    <span className={cn("relative inline-block", className)} aria-label={text}>
      <AnimatePresence mode="popLayout" initial={false}>
        {characters.map((character, index) => (
          <motion.span
            key={`${character}-${index}`}
            custom={index}
            variants={characterVariants}
            initial="enter"
            animate="center"
            exit="exit"
            aria-hidden="true"
            className="inline-block will-change-transform"
          >
            {character === " " ? "\u00A0" : character}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
}
