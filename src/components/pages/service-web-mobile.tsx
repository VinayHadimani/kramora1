'use client';

import { Fragment } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  Bot,
  BrainCircuit,
  Globe,
  Handshake,
  Monitor,
  Network,
  ScanText,
  Server,
  Smartphone,
  Workflow,
  Zap,
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
    icon: Globe,
    title: "Next.js Platforms",
    tag: "Sub-second",
    description:
      "Marketing sites, customer portals, and product platforms on Next.js and React that load in under a second and rank the way they should. Server rendering, edge caching, and Core Web Vitals are treated as product features, not cleanup-week chores. Design systems are built component by component, so your team keeps shipping consistently long after we leave.",
  },
  {
    icon: Smartphone,
    title: "React Native Apps",
    tag: "One codebase",
    description:
      "iOS and Android apps from a single React Native codebase — native-quality gestures and performance without two teams and two backlogs. Over-the-air updates sidestep store review cycles when something needs fixing today. Offline-first data layers keep field crews working in elevators, warehouses, and dead zones. Ship Tuesday, fix Friday, no release train required.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    tag: "Intake to delivery",
    description:
      "End-to-end workflow engines that move work from intake through approvals to delivery — with SLA timers, escalation paths, and status visible to everyone who cares. Forms stop being where data goes to die; every step writes structured records your analytics can read. Operations gets a control panel instead of a shared inbox and a status meeting.",
  },
  {
    icon: Bot,
    title: "Robotic Process Automation",
    tag: "Legacy bridges",
    description:
      "Software robots that bridge the legacy systems no API will ever reach — screen-driven, deterministic, and scheduled to the minute. Document handoffs between systems that were never designed to talk become automatic, logged, and auditable. The repetitive work goes to the robots; exceptions route to humans with full context attached.",
  },
  {
    icon: Network,
    title: "Orchestration",
    tag: "Agents + humans",
    description:
      "Task routing across AI agents and human operators, with an audit trail on every decision along the way. We define which tasks agents may take autonomously, which require a human approval, and which stay human-only — then enforce it in code, not in policy documents. You get autonomy where it pays and brakes where it matters.",
  },
];

const FULL_STACK_SLICE: { icon: LucideIcon; title: string; detail: string }[] = [
  { icon: Monitor, title: "Frontend", detail: "Interfaces users feel instantly" },
  { icon: Server, title: "Backend", detail: "APIs, data models, integrations" },
  { icon: Zap, title: "Automation", detail: "Workflows that run themselves" },
  { icon: BrainCircuit, title: "AI", detail: "Decisions made for you" },
];

const CROSS_LINKS = [
  {
    icon: BrainCircuit,
    title: "AI & Generative AI",
    tag: "The intelligence",
    description: "The models, copilots, and agents your product wraps — built to the same production bar.",
    href: ROUTES.ai,
  },
  {
    icon: ScanText,
    title: "OCR & Document AI",
    tag: "The paperwork",
    description: "Document pipelines and the senior teams that run them — the unstructured-data feeder for your product.",
    href: ROUTES.ocrStaff,
  },
  {
    icon: Handshake,
    title: "Engagement Models",
    tag: "The shape",
    description: "Fixed scope, dedicated pods, or staff augmentation — pick the way you want this team to work.",
    href: ROUTES.engagement,
  },
] satisfies { icon: LucideIcon; title: string; tag: string; description: string; href: string }[];

function SliceCard({ icon: Icon, title, detail }: { icon: LucideIcon; title: string; detail: string }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-center sm:p-6">
      <span
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600"
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <h4 className="text-base font-semibold tracking-tight text-slate-900">{title}</h4>
        <p className="mt-1 text-sm text-slate-500">{detail}</p>
      </div>
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

export function WebMobileServicePage() {
  const logisticsCase = CASE_STUDIES.find((c) => c.industry === "Logistics") ?? CASE_STUDIES[3];

  return (
    <>
      <PageHero
        eyebrow="Services · Web, Mobile & Automation"
        title="Products people feel in the first second."
        description="Web platforms, mobile apps, and the automation layer between them — engineered for the moment a user decides to stay, and the years after it when they keep coming back."
      />

      {/* Capability deep-dives */}
      <Section>
        <PageShell>
          <SectionHeading
            eyebrow="Capabilities"
            title="What we ship, end to end"
            description="Five practices that turn ambitious roadmaps into products in people's hands — each one delivered by engineers who have shipped it before, at scale."
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

      {/* Full-stack, one team band */}
      <Section tone="tint">
        <PageShell>
          <SectionHeading
            eyebrow="One team"
            title="Full-stack, one team"
            description="No handoffs between agencies — the same senior pod owns the whole slice, from the pixel a user touches to the decision an agent makes."
          />
          <Reveal className="mt-12">
            <div className="flex flex-col items-stretch gap-4 rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-blue-50/40 p-5 sm:p-8 lg:flex-row lg:items-center lg:gap-3">
              {FULL_STACK_SLICE.map((slice, index) => (
                <Fragment key={slice.title}>
                  <SliceCard icon={slice.icon} title={slice.title} detail={slice.detail} />
                  {index < FULL_STACK_SLICE.length - 1 ? <FlowArrow /> : null}
                </Fragment>
              ))}
            </div>
          </Reveal>
        </PageShell>
      </Section>

      {/* Proof */}
      <Section>
        <PageShell>
          <SectionHeading
            eyebrow="Proof"
            title="A control tower that runs itself"
            description="A global freight carrier ran dispatch on spreadsheets and phone calls. We shipped an AI control tower that orchestrates loads, predicts exceptions, and automates customer communication."
          />
          <Reveal className="mt-12">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <AuroraBars intensity={0.8} />
              <div className="relative flex flex-col gap-6 p-6 sm:p-10 lg:flex-row lg:items-stretch lg:gap-10">
                <GlassCard className="flex flex-1 flex-col gap-5 p-6 sm:p-8">
                  <Eyebrow>Logistics · Case study</Eyebrow>
                  <h3 className="text-2xl font-semibold tracking-tight text-slate-900">{logisticsCase.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{logisticsCase.summary}</p>
                  <div className="mt-auto flex flex-wrap items-end gap-x-3 gap-y-1">
                    <span className="text-4xl font-semibold tracking-tight text-blue-600 sm:text-5xl">
                      {logisticsCase.metric}
                    </span>
                    <span className="pb-1 text-sm font-medium text-slate-500">{logisticsCase.metricLabel}</span>
                  </div>
                  <LinkButton href={`#${ROUTES.caseStudies}`} variant="outline" className="self-start">
                    Read the full case study
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </LinkButton>
                </GlassCard>
                <div className="grid w-full grid-cols-3 gap-4 lg:w-64 lg:shrink-0 lg:grid-cols-1 lg:content-center">
                  {logisticsCase.metrics.map((metric) => (
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
            description="Products that compound pull in more of the stack over time. These are the pages our product clients read next."
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
        title="Ship the product your users remember."
        description="Book a free 30-minute strategy call. Bring the roadmap — we will bring the honest read on what it takes to build it right, and how fast it can realistically move."
        primaryLabel="Start the conversation"
        primaryHref={ROUTES.contact}
        secondaryLabel="Explore engagement models"
        secondaryHref={ROUTES.engagement}
      />
    </>
  );
}
