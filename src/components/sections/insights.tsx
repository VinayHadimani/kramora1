"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { WorksWheel } from "@/components/animations/works-wheel";
import { Button } from "@/components/ui/button";
import { INSIGHTS } from "@/lib/content";

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

export default function Insights() {
  return (
    <section id="insights" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            {INSIGHTS.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {withAccent(INSIGHTS.heading, "frontier of applied AI")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500">
            {INSIGHTS.subheading}
          </p>
        </motion.div>

        <div className="mt-16">
          <WorksWheel
            items={INSIGHTS.articles.map((article) => ({
              title: article.title,
              description: article.excerpt,
              image: article.image,
              eyebrow: article.category,
              tags: [article.readTime, article.eyebrow],
            }))}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-12 flex justify-center"
        >
          <Button variant="outline" size="lg" asChild>
            <a href="#insights">
              {INSIGHTS.ctaLabel}
              <ArrowUpRight aria-hidden />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
