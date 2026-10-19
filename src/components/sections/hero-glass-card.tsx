"use client";

import { useEffect, useRef, useState } from "react";

import { useLiquidGlass } from "@/hooks/use-liquid-glass";
import { HERO } from "@/lib/content";

/** Blue gradient sparkline — model performance, last 24h. */
function Sparkline() {
  return (
    <svg viewBox="0 0 120 36" className="h-9 w-28" aria-hidden="true">
      <defs>
        <linearGradient id="hero-glass-spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2563EB" stopOpacity="0.18" />
          <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 28 L14 26 L28 27 L42 21 L56 23 L70 17 L84 18 L98 11 L120 8 L120 36 L0 36 Z"
        fill="url(#hero-glass-spark)"
      />
      <path
        d="M0 28 L14 26 L28 27 L42 21 L56 23 L70 17 L84 18 L98 11 L120 8"
        fill="none"
        stroke="#2563EB"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="120" cy="8" r="3" fill="#2563EB" />
    </svg>
  );
}

/**
 * HeroGlassCard — the floating "Kramora Intelligence" liquid-glass lens.
 *
 * liquidGL's scroll-sync is engineered for `position: fixed` / `sticky`
 * targets (its README contract), so:
 *
 * - **xl+**: the card is `position: fixed` below the header — the library's
 *   native pattern (same as its menu-bar demo). An IntersectionObserver on
 *   the hero section mounts/unmounts it, so the lens (and its GPU context)
 *   exists only while the hero is on screen — no stale panes floating over
 *   later sections, no leaks. While pinned, the parallaxing headline and
 *   the floating watercolour hands drift behind the glass and refract in
 *   real time.
 * - **< xl**: the hero section's `overflow-hidden` (needed to clip the
 *   artwork) makes sticky a no-op, and in-flow lenses desync on scroll —
 *   so the card renders in-flow under the hero copy wearing the CSS
 *   frosted-glass base (`.liquid-glass-target`), visually consistent with
 *   the shader per the design system.
 *
 * Strict light-mode content: slate text on clean white glass, blue accents.
 */
export default function HeroGlassCard({ className }: { className?: string }) {
  const glassRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  // Track the xl breakpoint (the fixed/lens mode) reactively.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Mount-gate: the fixed lens exists only while the hero is on screen.
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  const lensActive = isDesktop && heroVisible;

  useLiquidGlass(
    glassRef,
    {
      tilt: true,
      tiltFactor: 5,
      magnify: 1.02,
      // Clean white dye — keeps the pane bright, never muddy.
      tint: "rgba(255, 255, 255, 0.45)",
      // Tight bevel so the pane never ghosts neighbouring copy into the glass.
      refraction: 0.012,
      bevelWidth: 0.14,
      // Animated elements that pass behind this pane: the parallaxing hero
      // content and the two floating hand artworks.
      dynamicSelector:
        "#hero-content, .animate-float-left, .animate-float-right",
      // The WebGL lens only runs in fixed mode (xl+, hero visible).
      enabled: lensActive,
    },
  );

  const card = HERO.engineCard;

  // Fixed mode unmounts once the hero has scrolled away.
  if (isDesktop && !heroVisible) return null;

  return (
    // liquidGL lens target — the library owns this element's surface.
    // Structure per the liquidGL spec: target + .content child.
    <div ref={glassRef} className={className}>
      <div className="content relative rounded-2xl p-6 sm:p-7">
        {/* Header row — engine name + live badge */}
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold tracking-tight text-slate-900">
            {card.title}
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-700">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-600" />
            </span>
            {card.liveLabel}
          </span>
        </div>

        {/* Performance block */}
        <div className="mt-5 border-t border-slate-200/70 pt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            {card.performanceLabel}
          </p>
          <div className="mt-2 flex items-end justify-between gap-4">
            <div>
              <p className="text-3xl font-semibold tracking-tight text-blue-600">
                {card.performanceValue}
              </p>
              <p className="mt-1 text-xs text-slate-500">{card.statusLine}</p>
            </div>
            <Sparkline />
          </div>
        </div>

        {/* Fleet chips */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-200/70 bg-white/50 px-3.5 py-3">
            <p className="text-sm font-semibold text-slate-900">
              {card.models}
            </p>
            <p className="text-[11px] text-slate-400">in production</p>
          </div>
          <div className="rounded-xl border border-slate-200/70 bg-white/50 px-3.5 py-3">
            <p className="text-sm font-semibold text-slate-900">
              {card.pipelines.replace(" running", "")}
            </p>
            <p className="text-[11px] text-slate-400">running</p>
          </div>
        </div>
      </div>
    </div>
  );
}
