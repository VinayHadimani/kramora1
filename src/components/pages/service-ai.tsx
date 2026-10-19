'use client';

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Database,
  FileSearch,
  Languages,
  LineChart,
  Newspaper,
  Sparkles,
  Trophy,
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
import { ARTICLES, CASE_STUDIES } from "@/components/site/data";
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
    icon: LineChart,
    title: "Machine Learning",
    tag: "Custom models",
    description:
      "We design, train, and ship custom models where off-the-shelf falls short — demand forecasting, ranking and recommendation, and vision-based quality control. Feature work is grounded in your data reality, not public benchmarks. Every model arrives with an evaluation baseline, monitoring hooks, and a rollback plan, because nothing should reach production as a black box.",
  },
  {
    icon: Languages,
    title: "Natural Language Processing",
    tag: "Text intelligence",
    description:
      "Classification, entity extraction, and summarization pipelines that turn unstructured text into structured decisions. We handle the messy corpora real companies have — multilingual claims notes, contracts, support threads — with pre-processing you can audit. Models are tuned against your taxonomy and acceptance thresholds, not a generic one, so accuracy numbers mean something to your reviewers.",
  },
  {
    icon: Sparkles,
    title: "LLM Applications",
    tag: "Copilots & assistants",
    description:
      "Copilots and assistants wired into your systems of record, with guardrails and offline evals treated as first-class deliverables rather than launch-week patchwork. We version prompts like code, gate releases on eval scores, and instrument every interaction for tracing and cost control. The result is generative AI your compliance team can actually sign off on.",
  },
  {
    icon: FileSearch,
    title: "RAG Systems",
    tag: "Grounded answers",
    description:
      "Permission-aware retrieval architectures that ground every answer in your documents and cite the source passage it came from. We design chunking, hybrid search, and re-ranking around your content — not a default recipe — and enforce access controls at query time so nobody reads what they should not. Answers arrive with receipts, which is what gets Gen AI past compliance review.",
  },
  {
    icon: Bot,
    title: "AI Agents",
    tag: "Autonomy with brakes",
    description:
      "Autonomous workflows that plan, call tools, and act across your stack — with human-in-the-loop checkpoints wherever risk actually lives. We orchestrate multi-agent systems with deterministic fallbacks, retry budgets, and full audit trails on every action taken. You set the guardrails once; the agents take the toil from there.",
  },
];

const DELIVERABLES: { title: string; detail: string }[] = [
  {
    title: "Discovery & feasibility spike",
    detail: "A two-week pressure test of your highest-leverage use case, ending in a go/no-go recommendation with a cost envelope.",
  },
  {
    title: "Model selection & fine-tuning",
    detail: "Build-vs-buy analysis across open-weight and commercial models, then adaptation to your domain, taxonomy, and edge cases.",
  },
  {
    title: "Evaluation harness",
    detail: "Golden datasets, regression suites, and CI gates so every prompt or model change is scored before it ever ships.",
  },
  {
    title: "Production inference & monitoring",
    detail: "Servable endpoints with latency budgets, drift alerts, and dashboards your on-call engineers can actually read at 3 a.m.",
  },
  {
    title: "Guardrails & compliance docs",
    detail: "Red-team results, refusal policies, data-handling notes, and audit trails written for your compliance reviewers, not ours.",
  },
];

const CROSS_LINKS = [
  {
    icon: Database,
    title: "Data Engineering & Cloud",
    tag: "Next stop",
    description: "AI is only ever as good as the pipelines feeding it. See the foundation layer that makes models trustworthy.",
    href: ROUTES.dataCloud,
  },
  {
    icon: Trophy,
    title: "Case Studies",
    tag: "Proof",
    description: "Four production outcomes with the numbers attached — documents per hour, latency, and straight-through rates.",
    href: ROUTES.caseStudies,
  },
  {
    icon: Newspaper,
    title: "Insights Hub",
    tag: "Field notes",
    description: "How ML, RAG, and agents actually behave in production — written by the engineers who ship them.",
    href: ROUTES.insights,
  },
] satisfies { icon: LucideIcon; title: string; tag: string; description: string; href: string }[];

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl border border-slate-200 bg-white p-4 text-center sm:p-5">
      <span className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{value}</span>
      <span className="text-xs font-medium text-slate-500">{label}</span>
    </div>
  );
}

export function AiServicePage() {
  const insuranceCase = CASE_STUDIES.find((c) => c.industry === "Insurance") ?? CASE_STUDIES[0];
  const ragArticle = ARTICLES.find((a) => a.tag === "RAG");

  return (
    <>
      <PageHero
        eyebrow="Services · AI & Generative AI"
        title="Intelligence, engineered — not bolted on."
        description="Custom machine learning, NLP, LLM applications, RAG, and autonomous agents — built by senior engineers who ship to production, with the evals and guardrails that keep them there."
      />

      {/* Capability deep-dives */}
      <Section>
        <PageShell>
          <SectionHeading
            eyebrow="Capabilities"
            title="Five ways we put intelligence to work"
            description="Each practice is a production discipline, not a lab experiment. Cards below are the short version — engagements go deeper on all of them."
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
          <Reveal delay={0.1} className="mt-8">
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-blue-100 bg-blue-50/60 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-relaxed text-slate-600">
                <span className="font-medium text-slate-900">Related reading — </span>
                {ragArticle
                  ? `"${ragArticle.title}": grounded answers, cited sources, and permission-aware retrieval by design.`
                  : "Grounded answers, cited sources, and permission-aware retrieval by design."}
              </p>
              <LinkButton href={`#${ROUTES.insights}`} variant="outline" className="shrink-0">
                Read the article
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </LinkButton>
            </div>
          </Reveal>
        </PageShell>
      </Section>

      {/* Deliverables checklist band */}
      <Section tone="tint">
        <PageShell>
          <SectionHeading
            eyebrow="Deliverables"
            title="What we deliver"
            description="Every AI engagement ships the full artifact set — not a demo that dies in a notebook the week we leave."
          />
          <Reveal className="mt-12">
            <ul className="grid gap-x-10 gap-y-6 rounded-3xl border border-slate-200 bg-white p-6 sm:grid-cols-2 sm:p-10">
              {DELIVERABLES.map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-blue-600" aria-hidden="true" />
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </PageShell>
      </Section>

      {/* Proof */}
      <Section>
        <PageShell>
          <SectionHeading
            eyebrow="Proof"
            title="What this looks like in production"
            description="A national insurer came to us with underwriting submissions scattered across siloed systems. Six weeks later, the pipeline below was live."
          />
          <Reveal className="mt-12">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <AuroraBars intensity={0.8} />
              <div className="relative flex flex-col gap-6 p-6 sm:p-10 lg:flex-row lg:items-stretch lg:gap-10">
                <GlassCard className="flex flex-1 flex-col gap-5 p-6 sm:p-8">
                  <Eyebrow>Insurance · Case study</Eyebrow>
                  <h3 className="text-2xl font-semibold tracking-tight text-slate-900">{insuranceCase.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{insuranceCase.summary}</p>
                  <div className="mt-auto flex flex-wrap items-end gap-x-3 gap-y-1">
                    <span className="text-4xl font-semibold tracking-tight text-blue-600 sm:text-5xl">
                      {insuranceCase.metric}
                    </span>
                    <span className="pb-1 text-sm font-medium text-slate-500">{insuranceCase.metricLabel}</span>
                  </div>
                  <LinkButton href={`#${ROUTES.caseStudies}`} variant="outline" className="self-start">
                    Read the full case study
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </LinkButton>
                </GlassCard>
                <div className="grid w-full grid-cols-3 gap-4 lg:w-64 lg:shrink-0 lg:grid-cols-1 lg:content-center">
                  {insuranceCase.metrics.map((metric) => (
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
            description="The work rarely stops at one layer. These are the pages our AI clients read next."
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
        title="Let's find your first AI win."
        description="Book a free 30-minute strategy call. We will pressure-test your use case against your data reality — and tell you plainly if it is not worth building yet."
        primaryLabel="Start the conversation"
        primaryHref={ROUTES.contact}
        secondaryLabel="Explore engagement models"
        secondaryHref={ROUTES.engagement}
      />
    </>
  );
}
