"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Timeline — vertical scroll-driven timeline.
 *
 * A slate track runs down the left edge; an `activeColor` progress line fills
 * it (scaleY driven by `useScroll` with offset ["start center", "end center"]).
 * Each item is a node dot that fills + gains a soft ring as the progress line
 * passes it, with a content card (date / title / content) to the right that
 * reveals via framer-motion `whileInView` fade-up.
 */

export type TimelineItem = {
  date: string;
  title: string;
  content: string;
};

interface TimelineProps {
  data: TimelineItem[];
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  className?: string;
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "").trim();
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const value = Number.parseInt(full, 16);
  if (Number.isNaN(value)) return `rgba(37, 99, 235, ${alpha})`;
  return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${alpha})`;
}

interface TimelineEntryProps {
  item: TimelineItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  textColor: string;
  mutedTextColor: string;
  activeColor: string;
  backgroundColor: string;
}

function TimelineEntry({
  item,
  index,
  total,
  progress,
  textColor,
  mutedTextColor,
  activeColor,
  backgroundColor,
}: TimelineEntryProps) {
  // Node activates as the progress line sweeps past this item's position.
  const threshold = (index + 0.5) / total;
  const rampStart = Math.max(threshold - 0.12, 0);
  const rampEnd = Math.max(threshold, rampStart + 0.02);

  const activation = useTransform(progress, [rampStart, rampEnd], [0, 1]);
  const dotScale = useTransform(activation, [0, 1], [0.8, 1]);
  const dotBackground = useTransform(activation, [0, 1], ["#ffffff", activeColor]);
  const dotBorder = useTransform(activation, [0, 1], ["#e2e8f0", activeColor]);
  const ringOpacity = useTransform(activation, [0, 1], [0, 1]);
  const ringColor = hexToRgba(activeColor, 0.18);

  return (
    <li className="relative pb-10 pl-10 last:pb-0 sm:pl-12">
      {/* Node */}
      <span className="absolute left-0 top-1.5 z-10 flex h-4 w-4 items-center justify-center">
        <motion.span
          className="absolute -inset-1 rounded-full"
          style={{ opacity: ringOpacity, backgroundColor: ringColor }}
          aria-hidden="true"
        />
        <motion.span
          className="relative flex h-4 w-4 items-center justify-center rounded-full border-2"
          style={{
            scale: dotScale,
            backgroundColor: dotBackground,
            borderColor: dotBorder,
          }}
          aria-hidden="true"
        />
      </span>

      {/* Card */}
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-slate-200 p-5 shadow-sm transition-shadow hover:shadow-md hover:shadow-slate-200/60 sm:p-6"
        style={{ backgroundColor }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-[0.18em]"
          style={{ color: mutedTextColor }}
        >
          {item.date}
        </p>
        <h3
          className="mt-2 text-lg font-semibold tracking-tight"
          style={{ color: textColor }}
        >
          {item.title}
        </h3>
        <p
          className="mt-2 text-sm leading-relaxed"
          style={{ color: mutedTextColor }}
        >
          {item.content}
        </p>
      </motion.article>
    </li>
  );
}

export function Timeline({
  data,
  textColor = "#0f172a",
  mutedTextColor = "#64748b",
  activeColor = "#2563eb",
  backgroundColor = "#ffffff",
  className,
}: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  if (!data || data.length === 0) return null;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Track */}
      <span
        className="absolute bottom-3 left-[7px] top-2 w-0.5 rounded-full bg-slate-200"
        aria-hidden="true"
      />
      {/* Active progress */}
      <motion.span
        className="absolute bottom-3 left-[7px] top-2 w-0.5 origin-top rounded-full"
        style={{ scaleY: scrollYProgress, backgroundColor: activeColor }}
        aria-hidden="true"
      />
      <ol className="relative list-none p-0">
        {data.map((item, index) => (
          <TimelineEntry
            key={`${item.title}-${index}`}
            item={item}
            index={index}
            total={data.length}
            progress={scrollYProgress}
            textColor={textColor}
            mutedTextColor={mutedTextColor}
            activeColor={activeColor}
            backgroundColor={backgroundColor}
          />
        ))}
      </ol>
    </div>
  );
}
