"use client";

import { motion, MotionConfig, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Globe, GraduationCap, MapPin, Sparkles, Target, Zap } from "lucide-react";
import { AuroraBars } from "@/components/fx/aurora-bars";
import {
  CTASection,
  PageHero,
  PageShell,
  Section,
  SectionHeading,
  StatBlock,
} from "@/components/site/blocks";
import { PRINCIPLES, STATS } from "@/components/site/data";
import { ROUTES, SITE } from "@/components/site/nav";

/* ---------------- reveal choreography (once, subtle) ---------------- */

const revealContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ---------------- core principles ---------------- */

const PRINCIPLE_ICONS: readonly LucideIcon[] = [Sparkles, GraduationCap, Target, Zap];

function PrincipleCard({
  index,
  icon: Icon,
  title,
  description,
}: {
  index: number;
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <motion.li
      variants={revealItem}
      className="card-hover-lift relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-3 right-4 select-none text-[92px] font-bold leading-none text-slate-200"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="relative z-10 flex h-full flex-col gap-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">{description}</p>
        </div>
      </div>
    </motion.li>
  );
}

/* ---------------- offices ---------------- */

function OfficeCard({
  country,
  city,
  detail,
  description,
}: {
  country: string;
  city: string;
  detail: string;
  description: string;
}) {
  return (
    <motion.article
      variants={revealItem}
      className="card-hover-lift rounded-3xl border border-slate-200 bg-white p-6 sm:p-8"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
          <MapPin className="h-6 w-6" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-widest text-blue-600">{country}</p>
          <h3 className="mt-1 truncate text-xl font-semibold tracking-tight text-slate-900">{city}</h3>
        </div>
      </div>
      <p className="mt-5 text-sm font-medium text-slate-600">{detail}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">{description}</p>
    </motion.article>
  );
}

/* ---------------- page ---------------- */

export function AboutPage() {
  return (
    <MotionConfig reducedMotion="user">
      <PageHero
        eyebrow="About Us"
        title={SITE.tagline}
        description="Kramora AI is a senior-only AI engineering firm. From our Issaquah headquarters in Greater Seattle and a Bengaluru delivery hub, we build intelligent products that scale — and the data platforms underneath them."
      />

      {/* The four core principles */}
      <Section>
        <PageShell>
          <SectionHeading
            eyebrow="How we work"
            title="The four principles behind every build"
            description="Not values on a wall. The operating system behind every fixed scope, every pod, and every engineer we embed."
          />
          <motion.ul
            variants={revealContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            aria-label="Core principles"
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {PRINCIPLES.map((principle, index) => {
              const Icon = PRINCIPLE_ICONS[index] ?? Sparkles;
              return (
                <PrincipleCard
                  key={principle.title}
                  index={index}
                  icon={Icon}
                  title={principle.title}
                  description={principle.description}
                />
              );
            })}
          </motion.ul>
        </PageShell>
      </Section>

      {/* Why teams stay — stats band */}
      <Section tone="tint">
        <PageShell>
          <SectionHeading
            eyebrow="Track record"
            title="Why teams stay"
            description="Retention isn't a slogan. It's the byproduct of senior people shipping what they promised, week after week."
          />
          <motion.ul
            variants={revealContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            aria-label="Company track record"
            className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 lg:grid-cols-4"
          >
            {STATS.map((stat) => (
              <motion.li key={stat.label} variants={revealItem}>
                <StatBlock value={stat.value} label={stat.label} sub={stat.sub} />
              </motion.li>
            ))}
          </motion.ul>
        </PageShell>
      </Section>

      {/* Where we operate */}
      <Section>
        <PageShell>
          <SectionHeading
            eyebrow="Where we operate"
            title="Two hubs, one standard"
            description="Strategy and architecture lead from Greater Seattle. The build runs around the clock from Bengaluru."
          />
          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-12 grid gap-5 sm:grid-cols-2"
          >
            <OfficeCard
              country={SITE.usOffice.country}
              city={SITE.usOffice.city}
              detail={SITE.usOffice.detail}
              description="Client strategy, architecture, and executive partnerships run from the Greater Seattle HQ — close to North American leadership, in your time zone when decisions get made."
            />
            <OfficeCard
              country={SITE.indiaOffice.country}
              city={SITE.indiaOffice.city}
              detail="Delivery hub · Follow-the-sun 24/7"
              description="Senior engineering pods carry the build through IST hours and hand off warm — same board, same backlog, same standards."
            />
          </motion.div>
          <motion.div
            variants={revealItem}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-5 flex flex-col items-start gap-4 rounded-2xl border border-blue-100 bg-blue-50/60 px-6 py-5 sm:flex-row sm:items-center"
          >
            <span
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-white text-blue-600"
            >
              <Globe className="h-5 w-5" />
            </span>
            <p className="text-sm leading-relaxed text-slate-600">
              <span className="font-semibold text-slate-900">Follow-the-sun delivery.</span> When
              Issaquah logs off, Bengaluru picks up the same board — so your product moves forward
              every hour of the day, without a single handoff meeting.
            </p>
          </motion.div>
        </PageShell>
      </Section>

      {/* The story strip */}
      <Section tone="tint">
        <PageShell>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)] sm:p-10 lg:p-14">
            <AuroraBars intensity={0.4} />
            <motion.div
              variants={revealItem}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="relative z-10 mx-auto max-w-3xl"
            >
              <SectionHeading
                eyebrow="The story"
                title="Built the way we wished vendors had built for us"
              />
              <div className="mt-8 flex flex-col gap-5 text-left text-base leading-relaxed text-slate-600">
                <p>
                  Kramora AI was founded on a simple frustration: senior AI engineering was locked
                  inside big-tech labs and enterprise budgets. We set out to make it accessible —
                  the same caliber of talent, pointed at your roadmap.
                </p>
                <p>
                  So we built the firm we wished we could hire. No pyramids, no benches, no
                  bait-and-switch staffing: the engineers in your kickoff call are the engineers who
                  ship your system.
                </p>
                <p>
                  The culture holding it together is outcome-obsessed. We sign up for metrics at
                  kickoff, report against them weekly, and treat your roadmap like our own P&amp;L.
                  That's why teams stay.
                </p>
              </div>
            </motion.div>
          </div>
        </PageShell>
      </Section>

      <CTASection
        title="Meet the team behind your product"
        description="Book a free 30-minute strategy call. We'll show you who would actually work on your account — senior engineers, no account-manager relay."
        primaryLabel="Book a strategy call"
        primaryHref={ROUTES.contact}
        secondaryLabel="See how we work"
        secondaryHref={ROUTES.process}
      />
    </MotionConfig>
  );
}
