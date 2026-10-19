"use client";

import { motion, type MotionProps } from "framer-motion";
import { CircuitBoard } from "@/components/animations/circuit-board";
import { SERVICES } from "@/lib/content";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

const ACCENT_PHRASE = "entire modern stack";

export default function Services() {
  const [headingBefore, headingAfter] = SERVICES.heading.split(ACCENT_PHRASE);

  return (
    <section id="services" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <motion.p
          {...reveal()}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600"
        >
          {SERVICES.eyebrow}
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
          {SERVICES.subheading}
        </motion.p>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.15fr]">
          {/* Live engineering grid visual */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              {...reveal(0.1)}
              className="relative h-[420px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              <CircuitBoard />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent"
              />
              <div className="glass-light absolute bottom-4 left-4 max-w-[260px] rounded-xl px-4 py-3 text-xs text-slate-600">
                Live engineering grid — every hub, one team
              </div>
            </motion.div>
          </div>

          {/* The 8 delivery hubs */}
          <div className="grid gap-4 sm:grid-cols-2">
            {SERVICES.items.map((item, index) => (
              <motion.article
                key={item.number}
                {...reveal(0.05 * (index % 2))}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-200/60"
              >
                <p className="font-mono text-[11px] text-blue-600">
                  {item.number}
                </p>
                <h3 className="mt-2 text-base font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {item.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
