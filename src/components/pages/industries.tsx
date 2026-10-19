"use client";

import { motion, MotionConfig, type Variants } from "framer-motion";
import { FileText, Gauge, ShieldCheck } from "lucide-react";
import {
  CTASection,
  FeatureCard,
  PageHero,
  PageShell,
  Section,
  SectionHeading,
  StatBlock,
} from "@/components/site/blocks";
import { CASE_STUDIES, INDUSTRIES, STATS } from "@/components/site/data";
import { ROUTES } from "@/components/site/nav";

/* ---------------- reveal choreography (once, subtle) ---------------- */

const revealContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ---------------- cross-industry patterns ---------------- */

const CROSS_PATTERNS = [
  {
    icon: FileText,
    title: "Document-heavy workflows",
    description:
      "Policies, claims, contracts, submissions, invoices. Wherever paperwork slows a vertical down, extraction-plus-review pipelines clear it at thousands of documents per hour.",
  },
  {
    icon: Gauge,
    title: "Real-time decisions",
    description:
      "Fraud checks, dispatch, underwriting, network assurance. We move decisions from overnight batches to sub-second streams — with full audit trails attached.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance-critical AI",
    description:
      "HIPAA, SOC 2, model governance. Grounded answers, permission-aware retrieval, human-in-the-loop review, and an audit trail on every automated decision.",
  },
] as const;

/* ---------------- sourced facts ---------------- */

const INSURANCE_CASE = CASE_STUDIES.find((study) => study.industry === "Insurance");
const RETENTION = STATS.find((stat) => stat.label === "Client retention");

/* ---------------- page ---------------- */

export function IndustriesPage() {
  return (
    <MotionConfig reducedMotion="user">
      <PageHero
        eyebrow="Industries"
        title="Twelve verticals. One engineering standard."
        description="We don't do shallow fly-bys. In every vertical we enter, we learn the workflows, the regulators, and the data — then apply the same senior engineering standard to all three."
      />

      {/* The 12 verticals */}
      <Section>
        <PageShell>
          <SectionHeading
            eyebrow="Verticals"
            title="Where we've shipped"
            description="Deep workflow knowledge, the same senior pods, and the same weekly demo rhythm — whatever the industry."
          />
          <motion.ul
            variants={revealContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            aria-label="Industries served"
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {INDUSTRIES.map((industry) => (
              <motion.li
                key={industry.name}
                variants={revealItem}
                className="card-hover-lift flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
                  <industry.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-slate-900">
                    {industry.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                    {industry.blurb}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </PageShell>
      </Section>

      {/* Cross-industry patterns */}
      <Section tone="tint">
        <PageShell>
          <SectionHeading
            eyebrow="Patterns"
            title="Different verticals, same three problems"
            description="Underneath the domain language, the same patterns repeat — which means the engineering transfers, even when the regulations don't."
          />
          <motion.ul
            variants={revealContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            aria-label="Cross-industry patterns"
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {CROSS_PATTERNS.map((pattern) => (
              <motion.li key={pattern.title} variants={revealItem}>
                <FeatureCard
                  icon={pattern.icon}
                  title={pattern.title}
                  description={pattern.description}
                  className="h-full"
                />
              </motion.li>
            ))}
          </motion.ul>
        </PageShell>
      </Section>

      {/* Proof strip */}
      <Section>
        <PageShell>
          <SectionHeading
            eyebrow="Proof"
            title="The pattern, in production"
            description="A document-heavy, compliance-critical insurance workflow — and the retention that followed."
          />
          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-12 grid gap-5 lg:grid-cols-[1.8fr_1fr]"
          >
            {INSURANCE_CASE ? (
              <motion.article
                variants={revealItem}
                className="card-hover-lift relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8"
              >
                <p className="text-xs font-medium uppercase tracking-widest text-blue-600">
                  {INSURANCE_CASE.industry} · {INSURANCE_CASE.title}
                </p>
                <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                    {INSURANCE_CASE.metric}
                  </span>
                  <span className="text-sm font-medium text-slate-500">
                    {INSURANCE_CASE.metricLabel}
                  </span>
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-500">
                  {INSURANCE_CASE.summary}
                </p>
                <ul
                  aria-label="Supporting metrics"
                  className="mt-6 flex flex-wrap gap-2 sm:gap-6"
                >
                  {INSURANCE_CASE.metrics.map((metric) => (
                    <li
                      key={metric.label}
                      className="flex items-baseline gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5"
                    >
                      <span className="text-sm font-semibold text-slate-900">{metric.value}</span>
                      <span className="text-xs text-slate-500">{metric.label}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ) : null}
            {RETENTION ? (
              <motion.aside
                variants={revealItem}
                className="card-hover-lift flex flex-col items-center justify-center gap-4 rounded-3xl border border-blue-100 bg-blue-50/50 p-8 text-center"
                aria-label="Client retention"
              >
                <StatBlock value={RETENTION.value} label={RETENTION.label} sub={RETENTION.sub} />
                <p className="max-w-xs text-sm leading-relaxed text-slate-500">
                  Every vertical we enter, the standard holds — which is why partners extend.
                </p>
              </motion.aside>
            ) : null}
          </motion.div>
        </PageShell>
      </Section>

      <CTASection
        title="Your vertical, our standard"
        description="Bring us the workflow that hurts. In 30 minutes we'll tell you which pattern it matches and what it takes to ship."
        primaryLabel="Find your pattern"
        primaryHref={ROUTES.contact}
        secondaryLabel="Read the case studies"
        secondaryHref={ROUTES.caseStudies}
      />
    </MotionConfig>
  );
}
