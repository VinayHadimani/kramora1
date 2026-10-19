"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ENGAGEMENT } from "@/lib/content";
import { useContactModal } from "@/lib/store";

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

export default function Engagement() {
  const open = useContactModal((state) => state.open);

  return (
    <section id="engagement" className="relative bg-white py-24 sm:py-32">
      {/* Blue radial atmosphere behind the middle card — visually feeds the
          tinted glass of the “Dedicated Pods” card. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[52%] hidden h-[520px] w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(219,234,254,0.85),rgba(239,246,255,0.5),transparent)] blur-2xl md:block"
      />
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            {ENGAGEMENT.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {withAccent(ENGAGEMENT.heading, "your way")}
          </h2>
        </motion.div>

        <div className="relative mt-16 grid items-stretch gap-6 md:grid-cols-3">
          {ENGAGEMENT.models.map((model, index) => (
            <motion.article
              key={model.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
              className={
                model.highlight
                  ? "relative flex flex-col"
                  : "flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md hover:shadow-slate-200/60"
              }
            >
              {model.highlight ? (
                /* "Dedicated Pods" — tinted CSS liquid-glass card. This card
                   is static in-flow content, so per the liquidGL guidance
                   (and the engine’s fixed/sticky contract) it wears the
                   frosted-glass surface with an indigo tint instead of a
                   WebGL lens — visually consistent, zero scroll-sync risk.
                   The blue radial behind the section glows through it. */
                <div className="liquid-glass-target tint-indigo relative flex w-full flex-col rounded-2xl border-2 border-blue-600 p-8 shadow-xl shadow-blue-100/50">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-white shadow">
                    {model.badge}
                  </span>

                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                    {model.badge}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                    {model.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {model.description}
                  </p>

                  <div aria-hidden className="my-6 h-px bg-slate-100/80" />

                  <ul className="space-y-3">
                    {model.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check
                          aria-hidden
                          className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"
                        />
                        <span className="text-sm text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <Button
                      variant="default"
                      className="w-full"
                      onClick={open}
                    >
                      Start the conversation
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    {model.badge}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                    {model.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {model.description}
                  </p>

                  <div aria-hidden className="my-6 h-px bg-slate-100" />

                  <ul className="space-y-3">
                    {model.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check
                          aria-hidden
                          className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"
                        />
                        <span className="text-sm text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={open}
                    >
                      Start the conversation
                    </Button>
                  </div>
                </>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
