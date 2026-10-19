"use client";

import { motion, type MotionProps } from "framer-motion";
import { Timer } from "lucide-react";
import { Timeline } from "@/components/animations/timeline";
import { PROCESS } from "@/lib/content";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

const ACCENT_PHRASE = "four moves";

export default function Process() {
  const [headingBefore, headingAfter] = PROCESS.heading.split(ACCENT_PHRASE);
  const timelineData = PROCESS.steps.map((step) => ({
    date: step.date,
    title: step.title,
    content: step.content,
  }));

  return (
    <section id="process" className="relative bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Sticky intro */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.p
              {...reveal()}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600"
            >
              {PROCESS.eyebrow}
            </motion.p>
            <motion.h2
              {...reveal(0.08)}
              className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.1]"
            >
              {headingBefore}
              <span className="font-serif italic text-blue-600">
                {ACCENT_PHRASE}
              </span>
              {headingAfter}
            </motion.h2>
            <motion.p
              {...reveal(0.16)}
              className="mt-5 max-w-md text-base leading-relaxed text-slate-500"
            >
              A senior, transparent delivery rhythm that turns ambitious ideas
              into production software — week after week.
            </motion.p>
            <motion.div {...reveal(0.24)} className="mt-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
                <Timer className="h-3.5 w-3.5 text-blue-600" aria-hidden />
                Avg. first demo in 2 weeks
              </span>
            </motion.div>
          </div>

          {/* Delivery timeline */}
          <div>
            <Timeline data={timelineData} />
          </div>
        </div>
      </div>
    </section>
  );
}
