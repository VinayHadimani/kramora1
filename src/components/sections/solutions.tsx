"use client";

import { motion, type MotionProps } from "framer-motion";
import {
  Cloud,
  Database,
  FileSearch,
  Rocket,
  Users,
  Workflow,
} from "lucide-react";
import { SOLUTIONS } from "@/lib/content";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

const ACCENT_PHRASE = "business outcomes";

const SOLUTION_ICONS = [Rocket, Workflow, Cloud, Database, FileSearch, Users];

export default function Solutions() {
  const [headingBefore, headingAfter] = SOLUTIONS.heading.split(ACCENT_PHRASE);

  return (
    <section id="solutions" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <motion.p
          {...reveal()}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600"
        >
          {SOLUTIONS.eyebrow}
        </motion.p>
        <motion.h2
          {...reveal(0.08)}
          className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.1]"
        >
          {headingBefore}
          <span className="font-serif italic text-blue-600">
            {ACCENT_PHRASE}
          </span>
          {headingAfter}
        </motion.h2>
        <motion.p
          {...reveal(0.16)}
          className="mt-5 max-w-3xl text-base leading-relaxed text-slate-500 sm:text-lg"
        >
          {SOLUTIONS.distinction}
        </motion.p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.items.map((item, index) => {
            const SolutionIcon = SOLUTION_ICONS[index];
            return (
              <motion.article
                key={item.title}
                {...reveal(0.06 * (index % 3))}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-200/60"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <SolutionIcon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
