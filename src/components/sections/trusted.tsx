"use client";

import { motion, type MotionProps } from "framer-motion";
import { TRUSTED_LOGOS } from "@/lib/content";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, delay, ease: EASE },
});

/**
 * Trusted — Superdesign theme logo grid.
 * A quiet band of wordmarks that sit dimmed and spring to full contrast
 * when the grid is hovered, revealing one row at a time on scroll.
 */
export default function Trusted() {
  return (
    <section id="trusted" className="border-y border-slate-100 bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <motion.p
          {...reveal()}
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400"
        >
          Trusted by teams building the future
        </motion.p>

        <div className="group/grid mt-12 grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-10 opacity-40 transition-opacity duration-500 hover:opacity-100 sm:grid-cols-3 lg:grid-cols-4">
          {TRUSTED_LOGOS.map((name, index) => (
            <motion.div
              key={name}
              {...reveal(0.06 * (index % 4))}
              className="cursor-default text-center text-base font-bold tracking-widest text-slate-900 sm:text-lg"
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
