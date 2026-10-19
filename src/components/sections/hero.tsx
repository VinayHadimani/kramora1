"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, type MotionProps } from "framer-motion";
import { TextMorph } from "@/components/animations/text-morph";
import HeroGlassCard from "@/components/sections/hero-glass-card";
import { HERO } from "@/lib/content";
import { useContactModal } from "@/lib/store";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const mount = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

/**
 * Hero — Superdesign theme, light adaptation.
 * Full-viewport centered composition: atmospheric grid + soft glows,
 * two floating surrealist artworks, a giant serif headline with a morphing
 * italic line, a glow-on-hover pill CTA, and a live clock / location meta row.
 * The whole content block parallaxes down and fades out as you scroll.
 */
export default function Hero() {
  const openContact = useContactModal((state) => state.open);
  const [wordIndex, setWordIndex] = useState(0);
  const [time, setTime] = useState("");

  // Cycle the morphing capability line.
  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % HERO.morphWords.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // Live clock (visitor-local time, minute precision — theme behaviour).
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const id = setInterval(updateTime, 60000);
    return () => clearInterval(id);
  }, []);

  // Hero content parallax — drifts down at 0.4x scroll and fades out.
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 1000], [0, 400]);
  const contentOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white pt-36 pb-16 sm:pt-40 sm:pb-20"
    >
      {/* Atmosphere — dotted grid + soft radial glows + bottom fade */}
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
        <div className="absolute inset-0 bg-grid-light [mask-image:radial-gradient(ellipse_70%_60%_at_50%_42%,black,transparent)]" />
        <div className="absolute -top-40 left-1/2 h-[620px] w-[920px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(219,234,254,0.75),rgba(224,231,255,0.4),transparent)] blur-3xl" />
        <div className="absolute -bottom-24 -left-32 h-[420px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(224,231,255,0.55),transparent)] blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 z-10 h-56 bg-gradient-to-b from-transparent via-white/40 to-white" />
      </div>

      {/* Floating surrealist artworks — light watercolour hands */}
      <div
        aria-hidden
        className="animate-float-left pointer-events-none absolute -left-[10%] top-[-8%] z-10 w-[52vw] max-w-[800px] select-none opacity-70 mix-blend-multiply md:-left-[5%] md:top-[-14%] md:w-[38vw]"
      >
        <img
          src="/theme/hand-left.png"
          alt=""
          className="h-auto w-full object-contain"
          loading="eager"
        />
      </div>
      <div
        aria-hidden
        className="animate-float-right pointer-events-none absolute -right-[10%] -bottom-[8%] z-10 w-[48vw] max-w-[700px] select-none opacity-70 mix-blend-multiply md:-right-[5%] md:-bottom-[5%] md:w-[33vw]"
      >
        <img
          src="/theme/hand-right.png"
          alt=""
          className="h-auto w-full object-contain"
          loading="eager"
        />
      </div>

      {/* Hero content — parallaxes down + fades on scroll */}
      <motion.div
        id="hero-content"
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center"
      >
        <motion.p
          {...mount()}
          className="mb-6 text-[10px] font-medium uppercase tracking-[0.3em] text-slate-400 md:text-xs"
        >
          {HERO.eyebrow}
        </motion.p>

        <motion.h1
          {...mount(0.15)}
          className="mb-6 font-serif text-5xl font-medium leading-[1.1] tracking-tight text-slate-900 md:text-7xl"
        >
          Kramora<span className="text-blue-600">.</span>
          <br />
          <span className="font-light italic text-slate-800">
            {HERO.headlineStaticA}{" "}
            <span className="text-blue-600">
              <TextMorph text={HERO.morphWords[wordIndex]} />
            </span>{" "}
            {HERO.headlineStaticB}
          </span>
        </motion.h1>

        <motion.p
          {...mount(0.3)}
          className="mx-auto mb-10 max-w-lg text-base font-light leading-relaxed tracking-wide text-slate-500 md:mb-12 md:text-lg"
        >
          {HERO.subheadline}
        </motion.p>

        <motion.div
          {...mount(0.45)}
          className="flex flex-col items-center gap-6"
        >
          {/* Glow-on-hover pill CTA */}
          <button
            type="button"
            onClick={openContact}
            className="group relative cursor-pointer"
          >
            <div
              aria-hidden
              className="absolute inset-0 rounded-full bg-blue-600/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60"
            />
            <span className="relative flex items-center gap-3 rounded-full border border-slate-200 bg-white/60 px-6 py-2.5 text-xs uppercase tracking-widest text-slate-600 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white group-hover:text-slate-900 md:text-sm">
              {HERO.primaryCta}
            </span>
          </button>

          {/* Live clock + delivery locations */}
          <div className="mt-6 flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-slate-400 md:text-xs">
            <span suppressHydrationWarning>{time || "--:-- --"}</span>
            <span aria-hidden className="h-3 w-px bg-slate-200" />
            <span>Issaquah &middot; Bengaluru</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating liquid-glass intelligence card. In-flow under the hero
          copy below xl (CSS frosted glass); from xl up it becomes a
          position:fixed lens pinned below the header — liquidGL's native
          pattern — and unmounts once the hero scrolls away. The parallaxing
          headline and watercolour hands refract through it in real time. */}
      <HeroGlassCard className="liquid-glass-target relative z-30 mx-auto mt-12 w-[calc(100%-2.5rem)] max-w-[320px] rounded-2xl xl:fixed xl:top-24 xl:right-10 xl:z-30 xl:mt-0 xl:w-[300px] 2xl:right-14" />
    </section>
  );
}
