"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ScanText,
  Sparkles,
  Star,
} from "lucide-react";
import { TextMorph } from "@/components/fx/text-morph";
import { AuroraBars } from "@/components/fx/aurora-bars";
import { ScrollBasedVelocity } from "@/components/fx/scroll-based-velocity";
import { VantaLightBackground } from "@/components/fx/vanta-light-background";
import {
  CTASection,
  Eyebrow,
  FeatureCard,
  LinkButton,
  PageShell,
  Section,
  SectionHeading,
  StatBlock,
} from "@/components/site/blocks";
import {
  CASE_STUDIES,
  HUBS,
  LOGO_MARQUEE,
  PROCESS_STEPS,
  STATS,
  TESTIMONIALS,
} from "@/components/site/data";
import { ROUTES, SITE } from "@/components/site/nav";

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
} as const;

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Sparkline() {
  return (
    <svg viewBox="0 0 120 36" className="h-9 w-28" aria-hidden="true">
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2563EB" stopOpacity="0.18" />
          <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 28 L14 26 L28 27 L42 21 L56 23 L70 17 L84 18 L98 11 L120 8 L120 36 L0 36 Z"
        fill="url(#spark-fill)"
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

function IntelligenceCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-md"
    >
      {/* Floating glow orbs */}
      <div
        aria-hidden="true"
        className="absolute -top-10 -right-8 h-40 w-40 rounded-full bg-blue-200/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-12 -left-10 h-44 w-44 rounded-full bg-blue-100/70 blur-3xl"
      />

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="glass relative rounded-3xl p-6 sm:p-7"
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold tracking-tight text-slate-900">
            Kramora Intelligence
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-700">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-600" />
            </span>
            Active
          </span>
        </div>

        <div className="mt-5 border-t border-slate-200/70 pt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Model performance
          </p>
          <div className="mt-2 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs text-slate-400">last 24h</p>
              <p className="text-3xl font-semibold tracking-tight text-blue-600">+34%</p>
            </div>
            <Sparkline />
          </div>
        </div>

        <div className="mt-5 border-t border-slate-200/70 pt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Intelligent automation engine
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200/80 bg-white/70 px-3.5 py-3">
              <p className="text-xl font-semibold tracking-tight text-slate-900">12</p>
              <p className="text-[11px] text-slate-500">models in production</p>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white/70 px-3.5 py-3">
              <p className="text-xl font-semibold tracking-tight text-slate-900">
                4<span className="text-blue-600"> · </span>running
              </p>
              <p className="text-[11px] text-slate-500">pipelines live</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating mini card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="absolute -bottom-7 -left-4 sm:-left-10"
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="glass flex items-center gap-3 rounded-2xl px-4 py-3"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600">
            <ScanText className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold tracking-tight text-slate-900">4,200 docs/hr</p>
            <p className="text-[11px] text-slate-500">Insurance claims pipeline</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden">
      {/* Atmospheric WebGL backdrop — Vanta NET in strict light mode
          (white background, brand-blue nodes). Mobile & reduced-motion get
          the pastel gradient fallback built into the component. */}
      <VantaLightBackground variant="net" />
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-blue-100/40 blur-3xl"
      />

      <PageShell className="relative grid gap-14 pb-24 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:py-24">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <Eyebrow>
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              AI-first engineering agency
            </Eyebrow>

            <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem]">
              We build
              {/* Fluid size: 8vw keeps the widest morph word ("Intelligent
                  Products" ≈ 11.2em) inside the px-4 gutters on every phone
                  down to ~313px viewports; caps at 1.95rem. */}
              <span className="mt-2 flex text-[clamp(1.5rem,8vw,1.95rem)] leading-[1.15] text-blue-600 sm:text-5xl sm:leading-[1.1] lg:text-[3.55rem]">
                <TextMorph words={[...SITE.morphWords]} interval={2600} />
              </span>
              <span className="mt-2 block">that scale.</span>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
              Kramora AI pairs senior engineers with applied intelligence — from LLM applications
              and RAG systems to the data platforms and cloud foundations underneath them. One
              accountable partner, from idea to production, in weeks.
            </p>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <LinkButton href={`#${ROUTES.contact}`} size="lg">
                <CalendarClock className="h-[18px] w-[18px]" aria-hidden="true" />
                Book a free 30-min strategy call
              </LinkButton>
              <LinkButton href={`#${ROUTES.services}`} variant="outline" size="lg">
                Explore services
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </LinkButton>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="flex items-center gap-1" aria-label="5.0 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-blue-500 text-blue-500" aria-hidden="true" />
                ))}
              </span>
              <span className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">5.0</span> average rating ·
                Trusted by <span className="font-semibold text-slate-900">27+ teams</span>
              </span>
            </div>
          </motion.div>
        </div>

        <IntelligenceCard />
      </PageShell>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Logo marquee                                                        */
/* ------------------------------------------------------------------ */

function Marquee() {
  return (
    <section className="border-y border-slate-200/70 bg-white py-10 sm:py-12">
      <p className="mb-7 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        Trusted by 27+ teams across 12 industries
      </p>
      <ScrollBasedVelocity items={LOGO_MARQUEE} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Stats over aurora                                                   */
/* ------------------------------------------------------------------ */

function StatsBand() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <AuroraBars intensity={1.15} />
      <PageShell className="relative">
        <motion.div
          {...reveal}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong grid grid-cols-2 gap-8 rounded-3xl px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-4"
        >
          {STATS.map((stat) => (
            <StatBlock key={stat.label} value={stat.value} label={stat.label} sub={stat.sub} />
          ))}
        </motion.div>
        <p className="mt-5 text-center text-xs text-slate-400">
          Numbers partners re-sign for — 97% of engagements extend past first launch.
        </p>
      </PageShell>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The 8 technical hubs                                                */
/* ------------------------------------------------------------------ */

function HubsGrid() {
  return (
    <Section>
      <PageShell>
        <SectionHeading
          eyebrow="The 8 technical hubs"
          title="One partner across the entire modern stack"
          description="Every hub is staffed by senior specialists and delivered with the same weekly-demo discipline. Explore the one that matches your roadmap — or hand us the whole board."
        />

        <motion.div
          {...reveal}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {HUBS.map((hub) => (
            <FeatureCard
              key={hub.id}
              icon={hub.icon}
              title={hub.name}
              description={hub.short}
              href={hub.href}
              tag={hub.tags[0]}
            />
          ))}
        </motion.div>

        <div className="mt-10 flex justify-center">
          <LinkButton href={`#${ROUTES.services}`} variant="ghost">
            See all services in detail
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </LinkButton>
        </div>
      </PageShell>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Featured case study                                                 */
/* ------------------------------------------------------------------ */

function FeaturedCase() {
  const featured = CASE_STUDIES[0];
  return (
    // overflow-hidden: the decorative blur orb behind the glass card bleeds
    // -right-6 past its column — clipped at section bounds so phones never
    // get a horizontal scrollbar (desktop bleed look is preserved).
    <Section tone="tint" className="overflow-hidden">
      <PageShell>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div {...reveal} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <Eyebrow>Featured case · Insurance</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Generative AI underwriting, at {featured.metric.replace("/hr", "")} documents an
              hour
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
              {featured.summary}
            </p>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
              {featured.metrics.map((m) => (
                <div key={m.label} className="flex flex-col">
                  <span className="text-2xl font-semibold tracking-tight text-slate-900">
                    {m.value}
                  </span>
                  <span className="text-xs text-slate-500">{m.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <LinkButton href={`#${ROUTES.caseStudies}`} variant="outline">
                Read the case studies
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </LinkButton>
            </div>
          </motion.div>

          <motion.div
            {...reveal}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              aria-hidden="true"
              className="absolute -top-10 -right-6 h-44 w-44 rounded-full bg-blue-200/40 blur-3xl"
            />
            <div className="glass relative overflow-hidden rounded-3xl p-8 sm:p-10">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Throughput · live pipeline
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" aria-hidden="true" />
                  99.2% accuracy
                </span>
              </div>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-6xl font-semibold tracking-tighter text-blue-600 sm:text-7xl">
                  4,200
                </span>
                <span className="text-lg font-medium text-slate-400">docs / hour</span>
              </div>
              <div className="mt-8 space-y-3">
                {["Submissions ingested", "Classified & extracted", "Routed for review"].map(
                  (label, i) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white/70 px-4 py-3"
                    >
                      <span className="flex items-center gap-3 text-sm text-slate-700">
                        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-[11px] font-semibold text-blue-600">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {label}
                      </span>
                      <CheckCircle2 className="h-4 w-4 text-blue-600" aria-hidden="true" />
                    </div>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </PageShell>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Process teaser                                                      */
/* ------------------------------------------------------------------ */

function ProcessTeaser() {
  return (
    <Section>
      <PageShell>
        <SectionHeading
          eyebrow="How we work"
          title="From idea to production — in four moves"
          description="A demo-driven path that puts working software in front of you every week."
        />
        <motion.div
          {...reveal}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.title}
              className="card-hover-lift relative rounded-2xl border border-slate-200 bg-white p-6"
            >
              <span
                aria-hidden="true"
                className="absolute right-5 top-4 text-5xl font-semibold tracking-tighter text-slate-100"
              >
                {i + 1}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-sm font-semibold text-blue-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-900">
                {step.title}
              </h3>
              <p className="mt-1.5 text-xs font-medium text-blue-600">{step.duration}</p>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-500">
                {step.description}
              </p>
            </div>
          ))}
        </motion.div>
        <div className="mt-10 flex justify-center">
          <LinkButton href={`#${ROUTES.process}`} variant="ghost">
            Walk through the process
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </LinkButton>
        </div>
      </PageShell>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonial teaser                                                  */
/* ------------------------------------------------------------------ */

function TestimonialTeaser() {
  const picks = [TESTIMONIALS[0], TESTIMONIALS[3]];
  return (
    <Section tone="tint" className="pb-20 sm:pb-24">
      <PageShell>
        <SectionHeading
          eyebrow="What partners say"
          title="Reference calls, on the record"
          description="5.0 average rating across 27+ partner teams — here's two of them."
        />
        <motion.div
          {...reveal}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 grid gap-6 lg:grid-cols-2"
        >
          {picks.map((t) => (
            <figure
              key={t.name}
              className="card-hover-lift relative rounded-2xl border border-slate-200 bg-white p-7"
            >
              <span
                aria-hidden="true"
                className="absolute right-6 top-4 font-serif text-6xl leading-none text-slate-100"
              >
                &ldquo;
              </span>
              <blockquote className="relative text-base leading-relaxed text-slate-700">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
                  {t.initials}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-900">{t.name}</span>
                  <span className="text-xs text-slate-500">
                    {t.role} · {t.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </motion.div>
        <div className="mt-10 flex justify-center">
          <LinkButton href={`#${ROUTES.testimonials}`} variant="ghost">
            All testimonials &amp; FAQ
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </LinkButton>
        </div>
      </PageShell>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function LandingPage() {
  return (
    <>
      <Hero />
      <Marquee />
      <StatsBand />
      <HubsGrid />
      <FeaturedCase />
      <ProcessTeaser />
      <TestimonialTeaser />
      <CTASection />
    </>
  );
}
