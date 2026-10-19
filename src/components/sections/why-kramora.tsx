"use client";

import { motion, type MotionProps } from "framer-motion";
import { AuroraBars } from "@/components/animations/aurora-bars";
import { WHY } from "@/lib/content";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

const ACCENT_PHRASE = "right, and fast";

export default function WhyKramora() {
  const [headingBefore, headingAfter] = WHY.heading.split(ACCENT_PHRASE);

  return (
    <section
      id="why"
      className="relative overflow-hidden bg-white py-24 sm:py-32"
    >
      {/* Soft aurora background, faded at top/bottom */}
      <div
        aria-hidden
        className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
      >
        <AuroraBars />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <motion.p
            {...reveal()}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600"
          >
            {WHY.eyebrow}
          </motion.p>
          <motion.h2
            {...reveal(0.08)}
            className="mx-auto mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.1]"
          >
            {headingBefore}
            <span className="font-serif italic text-blue-600">
              {ACCENT_PHRASE}
            </span>
            {headingAfter}
          </motion.h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {WHY.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              {...reveal(0.08 * index)}
              className="glass-light rounded-2xl border border-slate-200 p-8 text-center shadow-sm"
            >
              <p className="text-5xl font-semibold tracking-tight text-slate-900">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
                {stat.unit}
              </p>
              <p className="mt-4 text-xs uppercase tracking-widest text-slate-400">
                {stat.label}
              </p>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          {...reveal(0.2)}
          className="mt-10 text-center text-xs italic text-slate-400"
        >
          {WHY.footnote}
        </motion.p>
      </div>
    </section>
  );
}
