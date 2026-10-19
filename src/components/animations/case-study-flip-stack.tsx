"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * CaseStudyFlipStack — scroll-driven stacked cards.
 *
 * Each card is `sticky` with an increasing top offset (96px + i*12px), so the
 * next card scrolls up over the previous one. As coverage progresses, covered
 * cards recede: scale down toward ~0.9, dim opacity, and a slight brightness
 * filter — driven by one container-level scroll progress mapped per card.
 * Every card carries a big faded index number for a blueprint feel.
 */

export type CaseStudy = {
  eyebrow: string;
  title: string;
  description: string;
  metric: string;
};

interface CaseStudyFlipStackProps {
  items: CaseStudy[];
  className?: string;
}

interface StackCardProps {
  item: CaseStudy;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function StackCard({ item, index, total, progress }: StackCardProps) {
  const cardsAbove = total - 1 - index;
  const rampStart = index / total;

  const targetScale = Math.max(1 - cardsAbove * 0.05, 0.9);
  const targetOpacity = Math.max(1 - cardsAbove * 0.11, 0.65);
  const targetBrightness = Math.max(1 - cardsAbove * 0.02, 0.94);

  const scale = useTransform(progress, [rampStart, 1], [1, targetScale]);
  const opacity = useTransform(progress, [rampStart, 1], [1, targetOpacity]);
  const brightness = useTransform(
    progress,
    [rampStart, 1],
    ["brightness(1)", `brightness(${targetBrightness.toFixed(3)})`],
  );

  const indexLabel = String(index + 1).padStart(2, "0");

  return (
    <div
      className="sticky"
      style={{ top: 96 + index * 12, zIndex: index + 1 }}
    >
      <motion.article
        style={{ scale, opacity, filter: brightness, transformOrigin: "50% 0%" }}
        className="relative mb-8 flex min-h-[380px] flex-col rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm md:p-12"
      >
        {/* Faded blueprint index number (behind content) */}
        <span
          aria-hidden="true"
          className="absolute right-6 top-4 select-none text-6xl font-bold leading-none tracking-tighter text-slate-200 md:right-8 md:top-6 md:text-8xl"
        >
          {indexLabel}
        </span>

        <div className="relative flex flex-1 flex-col">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            {item.eyebrow}
          </p>
          <h3 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            {item.title}
          </h3>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-slate-700">
            {item.description}
          </p>

          {/* Metric block pinned to the bottom */}
          <div className="mt-auto pt-10 md:pt-14">
            <div className="h-px w-full bg-slate-200" />
            <div className="mt-5 flex items-center gap-2.5">
              <span className="text-2xl font-semibold tracking-tight text-blue-600 md:text-3xl">
                {item.metric}
              </span>
              <ArrowUpRight
                className="h-5 w-5 text-blue-600 md:h-6 md:w-6"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export function CaseStudyFlipStack({ items, className }: CaseStudyFlipStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  if (!items || items.length === 0) return null;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {items.map((item, index) => (
        <StackCard
          key={`${item.title}-${index}`}
          item={item}
          index={index}
          total={items.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}
