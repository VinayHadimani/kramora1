'use client';

import { Fragment } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowDown, ArrowRight, Braces, FileStack, Handshake, Phone, Rocket, ScanText, Trophy, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AuroraBars } from "@/components/fx/aurora-bars";
import {
  CTASection,
  Eyebrow,
  FeatureCard,
  GlassCard,
  LinkButton,
  PageHero,
  PageShell,
  Section,
  SectionHeading,
} from "@/components/site/blocks";
import { CASE_STUDIES, STATS } from "@/components/site/data";
import { ROUTES } from "@/components/site/nav";

/* Local scroll-reveal wrapper — subtle, once. */
function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface Capability {
  icon: LucideIcon;
  title: string;
  tag: string;
  description: string;
}

const CAPABILITIES: Capability[] = [
  {
    icon: FileStack,
    title: "Intelligent Document Processing",
    tag: "Classify to route",
    description:
      "The full IDP loop: documents are classified on arrival, key fields extracted against typed schemas, validated against your business rules, and routed to the right system or queue. Every step is measured — throughput, accuracy, exception rates — and every exception lands in front of a human with full context attached. Paper becomes a pipeline with a dashboard.",
  },
  {
    icon: ScanText,
    title: "OCR at Scale",
    tag: "4,200 docs/hour",
    description:
      "OCR infrastructure that clears thousands of documents per hour across scanned forms, emails, PDFs, and faxed manifests — the same throughput that powers our insurance underwriting pipeline. Pre-processing handles skew, noise, and handwriting; post-processing reconciles layout chaos into clean, typed fields. Volume stops being the constraint on your operations.",
  },
  {
    icon: Braces,
    title: "Data Extraction",
    tag: "Schemas + thresholds",
    description:
      "Typed schemas define what correct means for every field, with confidence thresholds that decide machine-speed processing versus human review. Low-confidence extractions queue for people with the source document side by side, and every correction feeds back into the loop. Accuracy compounds week over week — the 99.2 percent kind, not the vendor-demo kind.",
  },
  {
    icon: Users,
    title: "Dedicated Teams",
    tag: "Embedded pods",
    description:
      "Senior engineers embedded in your org — your standups, your standards, your tools. They ramp in days because they have shipped this stack before, and they stay because the work is real: our partners retain at 97 percent. You lead; we add senior horsepower that actually moves your velocity instead of your headcount spreadsheet.",
  },
  {
    icon: Rocket,
    title: "Managed Pods",
    tag: "We run delivery",
    description:
      "Whole delivery engagements we run end to end: backlog, architecture, QA, releases, and weekly demos of working software. One accountable team with a named lead, transparent metrics, and no vendor handoffs to chase. You get outcomes and a Thursday demo link — not coordination overhead and a status deck.",
  },
];

const IDP_STEPS: { title: string; detail: string }[] = [
  { title: "Ingest", detail: "Email, fax, upload, API — every channel lands in one normalized queue." },
  { title: "Classify", detail: "Documents are typed on arrival: claim, invoice, contract, or exception." },
  { title: "Extract", detail: "Schemas pull the fields that matter, each with a confidence score attached." },
  { title: "Validate", detail: "Business rules and thresholds decide: auto-approve or route to a human queue." },
  { title: "Deliver", detail: "Clean data flows into your systems; exceptions arrive with full context." },
];

const CROSS_LINKS = [
  {
    icon: Trophy,
    title: "Case Studies",
    tag: "The numbers",
    description: "Insurance, FinTech, Healthcare, and Logistics — the outcomes behind these throughput claims.",
    href: ROUTES.caseStudies,
  },
  {
    icon: Handshake,
    title: "Engagement Models",
    tag: "The structure",
    description: "How dedicated teams and managed pods are priced, staffed, and scaled over time.",
    href: ROUTES.engagement,
  },
  {
    icon: Phone,
    title: "Talk to Us",
    tag: "The first step",
    description: "Bring your worst document problem. We reply within 24 hours — usually faster.",
    href: ROUTES.contact,
  },
] satisfies { icon: LucideIcon; title: string; tag: string; description: string; href: string }[];

function StepCard({ step, index }: { step: { title: string; detail: string }; index: number }) {
  return (
    <li className="flex flex-1 flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-center sm:p-6">
      <span
        className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-base font-semibold text-white"
        aria-hidden="true"
      >
        {index + 1}
      </span>
      <h4 className="text-base font-semibold tracking-tight text-slate-900">{step.title}</h4>
      <p className="text-sm leading-relaxed text-slate-500">{step.detail}</p>
    </li>
  );
}

function FlowArrow() {
  return (
    <li aria-hidden="true" className="flex items-center justify-center py-1 lg:py-0">
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-600">
        <ArrowDown className="h-5 w-5 lg:hidden" />
        <ArrowRight className="hidden h-5 w-5 lg:block" />
      </span>
    </li>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl border border-slate-200 bg-white p-4 text-center sm:p-5">
      <span className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{value}</span>
      <span className="text-xs font-medium text-slate-500">{label}</span>
    </div>
  );
}

export function OcrStaffServicePage() {
  const healthcareCase = CASE_STUDIES.find((c) => c.industry === "Healthcare") ?? CASE_STUDIES[2];
  const retentionStat = STATS.find((stat) => stat.label === "Client retention");

  return (
    <>
      <PageHero
        eyebrow="Services · Document AI & Staff"
        title="Every document, intelligent. Every seat, senior."
        description="Intelligent document processing at industrial scale, and senior engineering talent that slots straight into your org — two ways we compound your throughput without compounding your headcount."
      />

      {/* Capability deep-dives */}
      <Section>
        <PageShell>
          <SectionHeading
            eyebrow="Capabilities"
            title="From paper problem to production pipeline"
            description="Five practices that cover the document side of your operation and the people side of your roadmap — mix them as the work demands."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((capability, index) => (
              <Reveal key={capability.title} delay={(index % 3) * 0.07} className="h-full">
                <FeatureCard
                  icon={capability.icon}
                  title={capability.title}
                  description={capability.description}
                  tag={capability.tag}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
        </PageShell>
      </Section>

      {/* The IDP pipeline stepper */}
      <Section tone="tint">
        <PageShell>
          <SectionHeading
            eyebrow="The pipeline"
            title="The IDP pipeline, step by step"
            description="Five stages between a document arriving and a decision being made — each one measurable, each one auditable."
          />
          <Reveal className="mt-12">
            <ol className="flex flex-col items-stretch gap-4 rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 lg:flex-row lg:items-center lg:gap-3">
              {IDP_STEPS.map((step, index) => (
                <Fragment key={step.title}>
                  <StepCard step={step} index={index} />
                  {index < IDP_STEPS.length - 1 ? <FlowArrow /> : null}
                </Fragment>
              ))}
            </ol>
            <p className="mt-6 text-center text-sm text-slate-500">
              Straight-through processing is the metric that matters: the share of documents that never needs a human
              touch. Our best runs clear 90 percent.
            </p>
          </Reveal>
        </PageShell>
      </Section>

      {/* Proof */}
      <Section>
        <PageShell>
          <SectionHeading
            eyebrow="Proof"
            title="Straight-through by design"
            description="A regional health network was drowning in claims paperwork. Our IDP stack digitizes intake, auto-adjudicates clean claims, and routes exceptions with explainability for compliance teams."
          />
          <Reveal className="mt-12">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <AuroraBars intensity={0.8} />
              <div className="relative flex flex-col gap-6 p-6 sm:p-10 lg:flex-row lg:items-stretch lg:gap-10">
                <GlassCard className="flex flex-1 flex-col gap-5 p-6 sm:p-8">
                  <Eyebrow>Healthcare · Case study</Eyebrow>
                  <h3 className="text-2xl font-semibold tracking-tight text-slate-900">{healthcareCase.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{healthcareCase.summary}</p>
                  <div className="mt-auto flex flex-wrap items-end gap-x-3 gap-y-1">
                    <span className="text-4xl font-semibold tracking-tight text-blue-600 sm:text-5xl">
                      {healthcareCase.metric}
                    </span>
                    <span className="pb-1 text-sm font-medium text-slate-500">{healthcareCase.metricLabel}</span>
                  </div>
                  <LinkButton href={`#${ROUTES.caseStudies}`} variant="outline" className="self-start">
                    Read the full case study
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </LinkButton>
                </GlassCard>
                <div className="grid w-full grid-cols-2 gap-4 lg:w-64 lg:shrink-0 lg:grid-cols-1 lg:content-center">
                  {healthcareCase.metrics.map((metric) => (
                    <MiniStat key={metric.label} value={metric.value} label={metric.label} />
                  ))}
                  {retentionStat ? (
                    <div className="col-span-2 flex flex-col items-center gap-1 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-center sm:p-5 lg:col-span-1">
                      <span className="text-2xl font-semibold tracking-tight text-blue-600 sm:text-3xl">
                        {retentionStat.value}
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        {retentionStat.label} — {retentionStat.sub}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </Reveal>
        </PageShell>
      </Section>

      {/* Cross-links */}
      <Section tone="tint" className="pt-12 sm:pt-16">
        <PageShell>
          <SectionHeading
            eyebrow="Keep exploring"
            title="Where to next?"
            description="Document pipelines and senior teams tend to grow into programs. These are the pages these clients read next."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {CROSS_LINKS.map((link, index) => (
              <Reveal key={link.title} delay={index * 0.07} className="h-full">
                <FeatureCard
                  icon={link.icon}
                  title={link.title}
                  description={link.description}
                  href={link.href}
                  tag={link.tag}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
        </PageShell>
      </Section>

      <CTASection
        title="Point us at the paper."
        description="Book a free 30-minute strategy call. Bring your worst document problem — we will show you what a 4,200-documents-per-hour pipeline with human-in-the-loop brakes would do for it."
        primaryLabel="Start the conversation"
        primaryHref={ROUTES.contact}
        secondaryLabel="See the case studies"
        secondaryHref={ROUTES.caseStudies}
      />
    </>
  );
}
