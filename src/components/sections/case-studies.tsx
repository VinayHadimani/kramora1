"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { CaseStudyFlipStack } from "@/components/animations/case-study-flip-stack";
import { Button } from "@/components/ui/button";
import { CASE_STUDIES } from "@/lib/content";
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

export default function CaseStudies() {
  const open = useContactModal((state) => state.open);

  return (
    <section id="work" className="relative bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            {CASE_STUDIES.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {withAccent(CASE_STUDIES.heading, "Measurable impact")}
          </h2>
        </motion.div>

        {/* The flip stack positions its cards internally (sticky) — no motion
            transform wrapper here so sticky behavior stays reliable. */}
        <div className="mt-16">
          <CaseStudyFlipStack
            items={CASE_STUDIES.items.map((study) => ({
              eyebrow: study.eyebrow,
              title: study.title,
              description: study.description,
              metric: study.metric,
            }))}
            className="mx-auto max-w-5xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-12 flex justify-center"
        >
          <Button variant="outline" size="lg" onClick={open}>
            {CASE_STUDIES.ctaLabel}
            <ArrowRight aria-hidden />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
