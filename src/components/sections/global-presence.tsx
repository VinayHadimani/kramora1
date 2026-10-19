"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

import { GLOBAL_PRESENCE } from "@/lib/content";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Renders a heading with one phrase set in serif italic blue (accent word style). */
function withAccent(heading: string, accent: string): React.ReactNode {
  const index = heading.indexOf(accent);
  if (index === -1) return heading;
  return (
    <>
      {heading.slice(0, index)}
      <span className="font-serif italic text-blue-600">{accent}</span>
      {heading.slice(index + accent.length)}
    </>
  );
}

/** Decorative "world dots" strip — 12 dots, 3 highlighted (US / India / Europe). */
const HIGHLIGHTED_DOTS = new Set([1, 6, 10]);

export default function GlobalPresence() {
  return (
    <section id="global" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            {GLOBAL_PRESENCE.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {withAccent(GLOBAL_PRESENCE.heading, "globally connected")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500">
            {GLOBAL_PRESENCE.body}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {GLOBAL_PRESENCE.regions.map((region, index) => (
            <motion.article
              key={region.region}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md hover:shadow-slate-200/60"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                  <MapPin aria-hidden className="h-5 w-5 text-blue-600" />
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                  {region.role}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                {region.region}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {region.locations}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          aria-hidden
          className="mx-auto mt-12 flex max-w-2xl items-center justify-between"
        >
          {Array.from({ length: 12 }).map((_, dotIndex) => (
            <span
              key={dotIndex}
              className={
                HIGHLIGHTED_DOTS.has(dotIndex)
                  ? "h-2 w-2 rounded-full bg-blue-600"
                  : "h-1.5 w-1.5 rounded-full bg-slate-200"
              }
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
