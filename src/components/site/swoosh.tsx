"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useLayoutEffect } from "react";

/**
 * Swoosh — premium splash intro.
 * KRAMORA. wordmark holds until the window `load` event fires, then the
 * white panel wipes upward via clip-path.
 *
 * Timing contract:
 * - Rendered with `loading = true` from the very first server paint, so the
 *   loader is the first thing on screen (no flash of page content).
 * - Scroll is locked in `useLayoutEffect` (before the browser paints after
 *   hydration) and released when the exit animation is triggered.
 * - The exit is driven by the real `window.load` event — never a fixed
 *   `setTimeout` — plus a 400ms grace period for visual smoothness.
 *
 * NOTE: `useLayoutEffect` is swapped for `useEffect` on the server to avoid
 * React's SSR warning; on the client (the only place it matters for paint
 * locking) it is always `useLayoutEffect`.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Swoosh() {
  const [loading, setLoading] = useState(true);

  useIsomorphicLayoutEffect(() => {
    // Instantly hide scrollbar to prevent flash of content
    document.body.style.overflow = "hidden";

    const handleLoad = () => {
      // Wait a tiny bit for the initial paint to settle, then trigger exit
      setTimeout(() => {
        setLoading(false);
        document.body.style.overflow = "";
      }, 400);
    };

    if (document.readyState === "complete") {
      // Hydration finished after the load event already fired
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
          exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-white"
          aria-hidden
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-serif text-4xl font-bold tracking-tighter text-slate-900"
          >
            KRAMORA<span className="text-blue-600">.</span>
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Swoosh;
