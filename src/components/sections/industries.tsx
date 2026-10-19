"use client";

import { motion, type MotionProps } from "framer-motion";
import { ScrollBasedVelocity } from "@/components/animations/scroll-based-velocity";
import { INDUSTRIES } from "@/lib/content";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

const ACCENT_PHRASE = "turns tech into outcomes";

export default function Industries() {
  const [headingBefore, headingAfter] = INDUSTRIES.heading.split(
    ACCENT_PHRASE,
  );

  return (
    <section id="industries" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <motion.p
          {...reveal()}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600"
        >
          {INDUSTRIES.eyebrow}
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
      </div>

      {/* Domain ticker band */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        className="mt-12 overflow-hidden border-y border-slate-100 py-6"
      >
        <ScrollBasedVelocity
          items={[...INDUSTRIES.ticker]}
          itemClassName="text-xl font-semibold tracking-tight text-slate-300"
          baseVelocity={2.5}
        />
      </motion.div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {INDUSTRIES.items.map((item, index) => (
            <motion.div
              key={item.title}
              {...reveal(0.05 * (index % 4))}
              className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-200/60"
            >
              <p className="font-mono text-[10px] text-slate-300">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1.5 text-sm font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-1 text-xs text-slate-500">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
