"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";

import { CursorDrivenParticleTypography } from "@/components/animations/cursor-driven-particle-typography";
import { Button } from "@/components/ui/button";
import { CONSULTATION } from "@/lib/content";
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

export default function ConsultationCta() {
  const open = useContactModal((state) => state.open);

  return (
    <section
      id="consult"
      className="relative overflow-hidden bg-white py-28 sm:py-32"
    >
      {/* Decorative layers: dotted blueprint grid + soft blue glows */}
      <div
        aria-hidden
        className="absolute inset-0 bg-grid-light [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,black_35%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Particle headline — canvas block (~fontSize × 1.4 tall), roomy parent */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="w-full py-6"
          >
            <CursorDrivenParticleTypography
              text={CONSULTATION.particleText}
              color="#2563eb"
              fontSize={140}
              className="mx-auto max-w-4xl"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="mt-8 text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl"
          >
            {withAccent(CONSULTATION.heading, "intelligent")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-slate-500"
          >
            {CONSULTATION.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.26 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" onClick={open}>
              {CONSULTATION.primaryCta}
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href={CONSULTATION.secondaryCtaHref} download>
                <Download aria-hidden />
                {CONSULTATION.secondaryCta}
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
