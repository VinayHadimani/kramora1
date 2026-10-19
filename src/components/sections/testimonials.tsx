"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import { TESTIMONIALS } from "@/lib/content";

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

/** "Stacy Heidte" → "SH" */
function initialsOf(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("");
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            {TESTIMONIALS.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {withAccent(TESTIMONIALS.heading, "we've delivered for")}
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.items.map((testimonial, index) => (
            <motion.figure
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE, delay: (index % 3) * 0.08 }}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md hover:shadow-slate-200/60"
            >
              <Quote aria-hidden className="h-5 w-5 text-blue-600/60" />
              <blockquote className="mt-4 text-[15px] leading-relaxed text-slate-700">
                <p>{testimonial.quote}</p>
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-6">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700"
                >
                  {initialsOf(testimonial.name)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-slate-900">
                    {testimonial.name}
                  </span>
                  <span className="block text-xs text-slate-500">
                    {testimonial.title} · {testimonial.company}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
