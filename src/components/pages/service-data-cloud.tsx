'use client';

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  Activity,
  ArrowDown,
  ArrowLeftRight,
  ArrowRight,
  Boxes,
  BrainCircuit,
  CloudCog,
  Database,
  Layers,
  Radio,
  Route,
  Warehouse,
} from "lucide-react";
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
import { CASE_STUDIES } from "@/components/site/data";
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
    icon: ArrowLeftRight,
    title: "ETL / ELT Pipelines",
    tag: "Batch + incremental",
    description:
      "Batch and incremental pipelines with idempotent runs, replayable backfills, and schema contracts enforced at every hop. We design for the night a job fails at 3 a.m. — retries that do not double-count, alerts that page the right owner, and lineage you can trace from dashboard back to source. Orchestration in Airflow, transformations in dbt, tests in the path of every merge.",
  },
  {
    icon: Radio,
    title: "Streaming",
    tag: "Kafka · Flink",
    description:
      "Event streams processed in motion with Kafka and Flink — exactly-once semantics, watermark-based windows, and late-data handling that keeps totals true at month-end. We build the difference between eventually right and right now, which is the difference a fraud model or a risk engine lives or dies on. Replay from any offset, schema evolution without downtime.",
  },
  {
    icon: Warehouse,
    title: "Warehousing & Lakehouses",
    tag: "dbt · Iceberg",
    description:
      "Warehouse and lakehouse architecture with layered dbt models, Iceberg tables, and cost-aware partitioning that keeps query bills predictable. Metrics are defined once and reused everywhere — the end of three teams quoting three different numbers for revenue. Modeling choices are documented, reviewed, and owned, not folklore.",
  },
  {
    icon: Activity,
    title: "DevOps & SRE",
    tag: "CI/CD · Observability",
    description:
      "Deployment pipelines, observability, and incident response baked into the platform from day one — not bolted on after the first outage. CI/CD for data and infrastructure code, SLOs with real error budgets, and runbooks your on-call can follow at 2 a.m. When you want it, we carry the pager for what we build.",
  },
  {
    icon: Boxes,
    title: "Kubernetes",
    tag: "Autoscaling · FinOps",
    description:
      "Cluster architecture with autoscaling tuned to your real workload shapes instead of defaults. We right-size requests, bin-pack batch jobs onto spot nodes, and cut the 30–40 percent of spend most clusters quietly waste. Scale events become non-events — traffic spikes show up as a slightly warmer line on a dashboard, nowhere else.",
  },
  {
    icon: CloudCog,
    title: "Multi-cloud",
    tag: "AWS · Azure · GCP",
    description:
      "Multi-cloud architecture with Terraform as the single source of truth, and region pinning where compliance demands data never leaves a jurisdiction. Configuration drift is detected, not discovered during an audit. You stay portable enough to negotiate on price and resilient enough to survive a zone outage.",
  },
];

interface BlueprintColumn {
  title: string;
  sub: string;
  items: string[];
}

const BLUEPRINT: BlueprintColumn[] = [
  {
    title: "Sources",
    sub: "Where data is born",
    items: ["OLTP databases", "Kafka topics", "SaaS & partner APIs", "Files, EDI & documents", "Clickstream & events"],
  },
  {
    title: "Pipelines",
    sub: "Governed in motion",
    items: [
      "Airflow batch orchestration",
      "Flink stream processing",
      "dbt modeling & tests",
      "Schema contracts & lineage",
      "Quality gates & alerting",
    ],
  },
  {
    title: "Serving",
    sub: "Where value lands",
    items: ["Analytics & BI", "ML feature stores", "Apps & APIs"],
  },
];

const CROSS_LINKS = [
  {
    icon: BrainCircuit,
    title: "AI & Generative AI",
    tag: "The payoff",
    description: "The layer this whole foundation exists to feed — models, copilots, RAG, and agents in production.",
    href: ROUTES.ai,
  },
  {
    icon: Layers,
    title: "Technology Stack",
    tag: "The matrix",
    description: "The full 8-layer tooling matrix we run in production, from frontend to FinOps.",
    href: ROUTES.techStack,
  },
  {
    icon: Route,
    title: "Our Process",
    tag: "The rhythm",
    description: "Discover, Design, Build, Scale — how the work actually runs week to week.",
    href: ROUTES.process,
  },
] satisfies { icon: LucideIcon; title: string; tag: string; description: string; href: string }[];

function BlueprintColumnCard({ column }: { column: BlueprintColumn }) {
  return (
    <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
      <h4 className="text-base font-semibold tracking-tight text-slate-900">{column.title}</h4>
      <p className="mt-0.5 text-xs font-medium text-blue-600">{column.sub}</p>
      <ul className="mt-4 space-y-2.5">
        {column.items.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FlowArrow() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center py-1 lg:py-0">
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-600">
        <ArrowDown className="h-5 w-5 lg:hidden" />
        <ArrowRight className="hidden h-5 w-5 lg:block" />
      </span>
    </div>
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

export function DataCloudServicePage() {
  const fintechCase = CASE_STUDIES.find((c) => c.industry === "FinTech") ?? CASE_STUDIES[1];

  return (
    <>
      <PageHero
        eyebrow="Services · Data & Cloud"
        title="Foundations that make AI possible."
        description="Pipelines, warehouses, and cloud infrastructure engineered for the moment AI enters production — reliable, observable, and costed to the dollar. Most failed AI projects were never AI problems; this is the layer that prevents yours from becoming one."
      />

      {/* Capability deep-dives */}
      <Section>
        <PageShell>
          <SectionHeading
            eyebrow="Capabilities"
            title="Six disciplines, one platform mindset"
            description="Each card is a production practice with an on-call story behind it — engagements combine them into one coherent platform, not a pile of tools."
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

      {/* Reference blueprint */}
      <Section tone="tint">
        <PageShell>
          <SectionHeading
            eyebrow="Reference architecture"
            title="The Kramora data blueprint"
            description="The shape we converge on across industries: sources flow through governed pipelines into serving layers for analytics, ML, and applications."
          />
          <Reveal className="mt-12">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Eyebrow>The Kramora data blueprint</Eyebrow>
                <span className="text-xs font-medium text-slate-400">governed · observable · costed</span>
              </div>
              <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-3">
                {BLUEPRINT.map((column, index) => (
                  <div key={column.title} className="contents">
                    <BlueprintColumnCard column={column} />
                    {index < BLUEPRINT.length - 1 ? <FlowArrow /> : null}
                  </div>
                ))}
              </div>
              <p className="mt-8 text-center text-sm text-slate-500">
                Every hop is versioned, tested, and traced — so when a number looks wrong, you can find out why in
                minutes, not days.
              </p>
            </div>
          </Reveal>
        </PageShell>
      </Section>

      {/* Proof */}
      <Section>
        <PageShell>
          <SectionHeading
            eyebrow="Proof"
            title="Four billion events a day, forty milliseconds to decide"
            description="A payments platform needed sub-second risk decisions across billions of events. We re-architected their pipeline to a streaming lakehouse with feature stores serving both analytics and ML inference."
          />
          <Reveal className="mt-12">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <AuroraBars intensity={0.8} />
              <div className="relative flex flex-col gap-6 p-6 sm:p-10 lg:flex-row lg:items-stretch lg:gap-10">
                <GlassCard className="flex flex-1 flex-col gap-5 p-6 sm:p-8">
                  <Eyebrow>FinTech · Case study</Eyebrow>
                  <h3 className="text-2xl font-semibold tracking-tight text-slate-900">{fintechCase.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{fintechCase.summary}</p>
                  <div className="mt-auto flex flex-wrap items-end gap-x-3 gap-y-1">
                    <span className="text-4xl font-semibold tracking-tight text-blue-600 sm:text-5xl">
                      {fintechCase.metric}
                    </span>
                    <span className="pb-1 text-sm font-medium text-slate-500">{fintechCase.metricLabel}</span>
                  </div>
                  <LinkButton href={`#${ROUTES.caseStudies}`} variant="outline" className="self-start">
                    Read the full case study
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </LinkButton>
                </GlassCard>
                <div className="grid w-full grid-cols-3 gap-4 lg:w-64 lg:shrink-0 lg:grid-cols-1 lg:content-center">
                  {fintechCase.metrics.map((metric) => (
                    <MiniStat key={metric.label} value={metric.value} label={metric.label} />
                  ))}
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
            description="The foundation is built for what sits on top of it. These are the pages our data and cloud clients read next."
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
        title="Fix the foundation before the model."
        description="Book a free 30-minute strategy call. We will audit your current pipelines and tell you exactly what has to change before AI can pay off — even if the answer is less than you hoped."
        primaryLabel="Start the conversation"
        primaryHref={ROUTES.contact}
        secondaryLabel="See the technology stack"
        secondaryHref={ROUTES.techStack}
      />
    </>
  );
}
