"use client";

import { motion, MotionConfig, type Variants } from "framer-motion";
import { AlertTriangle, LineChart, MessageSquare, PlayCircle } from "lucide-react";
import { Timeline } from "@/components/fx/timeline";
import {
  CTASection,
  FeatureCard,
  PageHero,
  PageShell,
  Section,
  SectionHeading,
  StatBlock,
} from "@/components/site/blocks";
import { PROCESS_STEPS, STATS } from "@/components/site/data";
import { ROUTES } from "@/components/site/nav";

/* ---------------- reveal choreography (once, subtle) ---------------- */

const revealContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ---------------- what you get every week ---------------- */

const WEEKLY_EXPECTATIONS = [
  {
    icon: PlayCircle,
    title: "Working demo",
    description:
      "A clickable build running on real data — not slides. Progress you can verify in five minutes, every single week.",
  },
  {
    icon: LineChart,
    title: "Updated burn & metrics",
    description:
      "Burn-down against the plan, plus the metrics we signed at kickoff. Numbers first, narrative second.",
  },
  {
    icon: AlertTriangle,
    title: "Risk callout",
    description:
      "The risks that moved this week, what they cost, and the plan to kill them. Surprises are treated as bugs.",
  },
  {
    icon: MessageSquare,
    title: "Straight answers",
    description:
      "If something slipped, you hear it Friday — with the recovery plan already attached, not a follow-up meeting.",
  },
] as const;

/* ---------------- page ---------------- */

export function ProcessPage() {
  return (
    <MotionConfig reducedMotion="user">
      <PageHero
        eyebrow="Our Process"
        title="From idea to production — in four moves."
        description="Demo-driven delivery with working software every week. Every move has an exit criterion and a metric attached, so progress is something you verify — not something you're told about."
      />

      {/* The four moves — timeline */}
      <Section className="pb-20 sm:pb-28">
        <PageShell>
          <SectionHeading
            eyebrow="The four moves"
            title="Discover. Design. Build. Scale."
            description="A senior pod takes your idea from whiteboard sketch to monitored production — and stays accountable at every checkpoint along the way."
          />
          <motion.div
            variants={revealItem}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mx-auto mt-14 max-w-3xl"
          >
            <Timeline steps={PROCESS_STEPS} />
          </motion.div>
          <motion.p
            variants={revealItem}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-slate-500"
          >
            Most builds reach production inside the Build window — weeks 4 to 10. Everything after
            Scale is compounding, not babysitting.
          </motion.p>
        </PageShell>
      </Section>

      {/* What you can expect every week */}
      <Section tone="tint">
        <PageShell>
          <SectionHeading
            eyebrow="Every Friday"
            title="What you can expect every week"
            description="No status-report theater. Four artifacts arrive like clockwork — whether the week went well or not."
          />
          <motion.ul
            variants={revealContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            aria-label="Weekly delivery expectations"
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {WEEKLY_EXPECTATIONS.map((expectation) => (
              <motion.li key={expectation.title} variants={revealItem}>
                <FeatureCard
                  icon={expectation.icon}
                  title={expectation.title}
                  description={expectation.description}
                  className="h-full"
                />
              </motion.li>
            ))}
          </motion.ul>
        </PageShell>
      </Section>

      {/* How fast? */}
      <Section>
        <PageShell>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)] sm:p-10 lg:p-12">
            <div className="grid items-center gap-10 lg:grid-cols-[1.6fr_1fr]">
              <motion.div
                variants={revealItem}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
              >
                <SectionHeading
                  align="left"
                  eyebrow="Velocity"
                  title="How fast?"
                  description="Two to three times faster than traditional agency cycles isn't a marketing number — it's arithmetic."
                />
                <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-slate-600">
                  <p>
                    Senior pods don't pay the coordination tax. The engineer who scopes your
                    architecture also writes the code, reviews the pull request, and answers for it
                    in Friday's demo — no handoffs to drop, no juniors to babysit.
                  </p>
                  <p>
                    And when a decision needs making, it gets made against working software — the
                    fastest feedback loop there is. That's the whole trick.
                  </p>
                </div>
              </motion.div>
              <motion.div
                variants={revealItem}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="flex justify-center rounded-2xl border border-slate-200/70 bg-slate-50/80 p-8 sm:p-10"
                aria-label="Delivery speed"
              >
                <StatBlock value={STATS[0].value} label={STATS[0].label} sub={STATS[0].sub} />
              </motion.div>
            </div>
          </div>
        </PageShell>
      </Section>

      <CTASection
        title="Ready to make move one?"
        description="Discover starts with a free 30-minute strategy call. We'll pressure-test the idea, map the data reality, and be blunt about what it takes."
        primaryLabel="Start with Discover"
        primaryHref={ROUTES.contact}
        secondaryLabel="Compare engagement models"
        secondaryHref={ROUTES.engagement}
      />
    </MotionConfig>
  );
}
