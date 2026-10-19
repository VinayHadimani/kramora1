"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionProps,
} from "framer-motion";
import { ArrowRight, Brain, Target, Users, Zap } from "lucide-react";
import { ABOUT, BRAND, PRINCIPLES } from "@/lib/content";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, delay, ease: EASE },
});

const ACCENT_PHRASE = "built for growth";

const PRINCIPLE_ICONS = [Brain, Users, Target, Zap];

/**
 * Parallax wrapper — Superdesign theme card drift.
 * Cards in the left column drift down with scroll, right column drift up,
 * producing the quiet depth of the reference "works" grid.
 */
function ParallaxCard({
  direction,
  className,
  children,
}: {
  direction: "up" | "down";
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" ? [48, -48] : [-48, 48],
  );
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

export default function About() {
  const [headingBefore, headingAfter] = ABOUT.heading.split(ACCENT_PHRASE);
  const [teamsValue, ...teamsLabelParts] = ABOUT.teamsLabel.split(" ");
  const teamsLabel = teamsLabelParts.join(" ");

  return (
    <section id="about" className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* Faint dot-grid wash behind the statement (works-section pattern) */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-24 left-1/2 h-[560px] w-[120%] -translate-x-1/2 opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"
        style={{
          backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        {/* Mission statement — giant centered serif */}
        <motion.p
          {...reveal()}
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-blue-600"
        >
          {ABOUT.eyebrow}
        </motion.p>
        <motion.h2
          {...reveal(0.08)}
          className="mx-auto mt-4 max-w-4xl text-center font-serif text-3xl leading-tight text-slate-900 md:text-5xl lg:text-6xl"
        >
          {headingBefore}
          <span className="italic text-blue-600">{ACCENT_PHRASE}</span>
          {headingAfter}
        </motion.h2>
        <motion.p
          {...reveal(0.16)}
          className="mx-auto mt-8 max-w-3xl text-center text-base font-light leading-relaxed text-slate-500 sm:text-lg md:text-xl"
        >
          {ABOUT.body}
        </motion.p>

        {/* Stats row */}
        <motion.div
          {...reveal(0.2)}
          className="mt-14 grid grid-cols-3 divide-x divide-slate-100"
        >
          <div className="px-2 text-center sm:px-6">
            <p className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              {ABOUT.yearsPlaceholder}
            </p>
            <p className="mt-2 text-xs text-slate-500 sm:text-sm">
              {ABOUT.yearsLabel}
            </p>
          </div>
          <div className="px-2 text-center sm:px-6">
            <p className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              {PRINCIPLES.length}
            </p>
            <p className="mt-2 text-xs text-slate-500 sm:text-sm">
              Core delivery principles
            </p>
          </div>
          <div className="px-2 text-center sm:px-6">
            <p className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              {teamsValue}
            </p>
            <p className="mt-2 text-xs text-slate-500 sm:text-sm">
              {teamsLabel}
            </p>
          </div>
        </motion.div>

        {/* Principles — Superdesign works-cards grid */}
        <div className="mt-24 grid grid-cols-1 gap-8 md:grid-cols-2">
          {PRINCIPLES.map((principle, index) => {
            const PrincipleIcon = PRINCIPLE_ICONS[index];
            const accent = index === 0;
            const isRightColumn = index % 2 === 1;
            return (
              <ParallaxCard
                key={principle.number}
                direction={isRightColumn ? "up" : "down"}
                className={isRightColumn ? "md:mt-16" : undefined}
              >
                <motion.article
                  {...reveal(0.08 * (index % 2))}
                  className={
                    accent
                      ? "group flex aspect-auto cursor-default flex-col justify-between rounded-3xl bg-blue-600 p-8 shadow-2xl shadow-blue-200/70 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(37,99,235,0.28)] md:aspect-[4/5] md:p-12"
                      : "group flex aspect-auto cursor-default flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/50 transition-all duration-500 hover:border-blue-400/60 md:aspect-[4/5] md:p-12"
                  }
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={
                        accent
                          ? "flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-transform duration-500 group-hover:rotate-45"
                          : "flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-transform duration-500 group-hover:rotate-45"
                      }
                    >
                      <PrincipleIcon className="h-5 w-5" aria-hidden />
                    </div>
                    <span
                      className={
                        accent
                          ? "rounded-full border border-white/25 px-3 py-1 text-sm font-medium text-white"
                          : "rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-400"
                      }
                    >
                      {principle.number}
                    </span>
                  </div>

                  <div>
                    <h3
                      className={
                        accent
                          ? "mb-4 font-serif text-3xl leading-[1.1] tracking-tight text-white md:text-4xl"
                          : "mb-4 font-serif text-3xl leading-[1.1] tracking-tight text-slate-900 md:text-4xl"
                      }
                    >
                      {principle.title}
                    </h3>
                    <p
                      className={
                        accent
                          ? "text-lg leading-snug text-white/75"
                          : "text-lg leading-snug text-slate-500"
                      }
                    >
                      {principle.description}
                    </p>
                  </div>

                  <div
                    aria-hidden
                    className={
                      accent
                        ? "mt-8 h-px w-full bg-white/20"
                        : "mt-8 h-px w-full bg-slate-100"
                    }
                  />
                </motion.article>
              </ParallaxCard>
            );
          })}
        </div>

        {/* Motto banner */}
        <motion.div
          {...reveal(0.1)}
          className="mt-24 rounded-2xl border border-slate-100 bg-slate-50 px-6 py-5"
        >
          <div className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-4">
            <p className="font-serif text-xl italic text-slate-700">
              {BRAND.motto}
            </p>
            <span
              aria-hidden
              className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block"
            />
            <a
              href={ABOUT.ctaHref}
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
            >
              {ABOUT.ctaLabel}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
