"use client";

/**
 * SmoothScrollProvider — global Lenis inertial scrolling.
 *
 * - Lenis runs in `root` mode: it drives the *native* window scroll position,
 *   so Framer Motion's `useScroll` / `useVelocity` (used by ScrollBasedVelocity
 *   and the whileInView reveals) keep measuring the real scroll — they stay in
 *   sync by construction, no extra wiring needed.
 * - `autoRaf: false` + the manual rAF driver below means Lenis is driven by a
 *   single dedicated ticker loop instead of its own internal one.
 * - Touch devices keep native scrolling (Lenis default: syncTouch off), and
 *   `respectReducedMotion` (Lenis default) disables smoothing for users who
 *   prefer reduced motion.
 */

import { useEffect, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";

function LenisRafDriver() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    let rafId = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [lenis]);

  return null;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.5,
        smoothWheel: true,
        // Native touch behavior on phones/tablets — flick-scrolling stays
        // 100% native (no smoothing lag); Lenis only smooths wheel/trackpad.
        syncTouch: false,
        autoRaf: false,
        respectReducedMotion: true,
      }}
    >
      <LenisRafDriver />
      {children}
    </ReactLenis>
  );
}
