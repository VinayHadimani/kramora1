"use client";

import { motion, MotionConfig, type Variants } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import {
  CTASection,
  LinkButton,
  PageHero,
  PageShell,
  Section,
  SectionHeading,
} from "@/components/site/blocks";
import { TECH_LAYERS } from "@/components/site/data";
import { ROUTES } from "@/components/site/nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ---------------- reveal choreography (once, subtle) ---------------- */

const revealContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ---------------- how each layer is used in production ---------------- */

const LAYER_NOTES: Record<string, string> = {
  Frontend:
    "We build interfaces on Next.js and React with TypeScript end to end, which keeps design systems coherent as your team scales. Sub-second loads and accessibility are treated as release gates, not afterthoughts. When you need iOS and Android too, the same TypeScript core ships as a React Native app.",
  Backend:
    "Node.js and Python services sit behind a typed API contract — REST by default, GraphQL when clients need flexible reads, gRPC for internal hot paths. Every service ships with health checks, structured logs, and contract tests from day one, so the boring middle of your stack never surprises anyone.",
  "AI / ML":
    "Models live or die on data quality, so model work always ships with pipeline work. We train and fine-tune with PyTorch and Hugging Face, keep experiments reproducible, and ground retrieval in vector stores wired to your own data — never a model's imagination.",
  "AI Tools":
    "We treat LLM features as production systems: permission-aware RAG pipelines, evaluation harnesses that score every prompt change, and guardrails that fail safe. Model choice is an engineering decision — OpenAI, Anthropic, or open weights, whichever passes your evals at your price point.",
  "Data Engineering":
    "Airflow and dbt orchestrate tested, documented transformations; Kafka, Spark, and Flink handle anything that streams. Iceberg-based lakehouse tables give you schema history and time travel. This is the quiet layer every AI initiative depends on — we build it first, not last.",
  Cloud:
    "Terraform-defined infrastructure across AWS, Azure, and GCP means nothing is hand-built. Kubernetes absorbs scale and failure; serverless takes the spiky workloads. Multi-cloud isn't dogma for us — it's leverage in contract negotiations and a hedge on outages.",
  Blockchain:
    "We deploy blockchain only where provenance genuinely matters — supply-chain custody, credential verification, immutable audit trails. Smart contracts are written in Solidity and audited before mainnet, then paired with conventional APIs so the rest of your stack stays simple.",
  DevOps:
    "CI/CD gates every merge — tests, security scans, and cost checks included. Observability dashboards and SLO alerts mean we know your system is degrading before your users do. FinOps reviews keep cloud spend tied to value, quarter after quarter.",
};

/* ---------------- page ---------------- */

export function TechStackPage() {
  return (
    <MotionConfig reducedMotion="user">
      <PageHero
        eyebrow="Technology"
        title="The 8-layer engineering matrix."
        description="Frontend to DevOps, every layer of the modern stack under one roof — paired with the judgment to know which pieces your product actually needs."
      />

      {/* Interactive layer browser */}
      <Section>
        <PageShell>
          <SectionHeading
            eyebrow="Layer browser"
            title="Explore the stack, layer by layer"
            description="Pick a layer to see the tools we reach for and how they behave in production."
          />
          <motion.div
            variants={revealItem}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-12"
          >
            <Tabs defaultValue="Frontend" className="gap-6">
              <TabsList
                aria-label="Technology layers"
                className="flex h-auto w-full flex-wrap justify-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 p-1.5"
              >
                {TECH_LAYERS.map((layer) => (
                  <TabsTrigger
                    key={layer.layer}
                    value={layer.layer}
                    className="h-11 min-h-[44px] flex-none rounded-xl px-3.5 text-sm font-medium text-slate-500 hover:text-slate-900 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm sm:px-4"
                  >
                    {layer.layer}
                  </TabsTrigger>
                ))}
              </TabsList>
              {TECH_LAYERS.map((layer) => (
                <TabsContent key={layer.layer} value={layer.layer} className="mt-2">
                  <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)] sm:p-8">
                    <header className="flex flex-col gap-1.5">
                      <h3 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                        {layer.layer}
                      </h3>
                      <p className="text-sm font-medium text-blue-600">{layer.tagline}</p>
                    </header>
                    <ul
                      aria-label={`${layer.layer} tools and technologies`}
                      className="mt-6 flex flex-wrap gap-2"
                    >
                      {layer.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 text-sm leading-relaxed text-slate-500 sm:text-base">
                      {LAYER_NOTES[layer.layer]}
                    </p>
                  </article>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </PageShell>
      </Section>

      {/* Full matrix */}
      <Section tone="tint">
        <PageShell>
          <SectionHeading
            eyebrow="The full matrix"
            title="All eight layers, one glance"
            description="The whole stack, scannable at once — so you can see exactly how much ground one partner covers."
          />
          <motion.ol
            variants={revealContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            aria-label="Full technology matrix"
            className="mt-12 grid gap-4 sm:grid-cols-2"
          >
            {TECH_LAYERS.map((layer, index) => (
              <motion.li
                key={layer.layer}
                variants={revealItem}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-blue-200"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-base font-semibold tracking-tight text-slate-900">
                    {layer.layer}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="select-none text-xs font-semibold text-slate-400"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-blue-600">{layer.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {layer.items.join(" · ")}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </PageShell>
      </Section>

      {/* Boring where it counts */}
      <Section>
        <PageShell>
          <motion.div
            variants={revealItem}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)] sm:p-10"
          >
            <span
              aria-hidden="true"
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600"
            >
              <ShieldCheck className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Boring where it counts
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              Nothing on this page is exotic — that's the point. Every tool in the matrix already
              runs at planetary scale somewhere bigger than your problem. We keep the foundations
              dependably boring and spend your innovation budget on the AI layer, where novelty
              actually compounds.
            </p>
            <div className="mt-8 flex justify-center">
              <LinkButton href={`#${ROUTES.process}`} variant="outline">
                See how we deliver
              </LinkButton>
            </div>
          </motion.div>
        </PageShell>
      </Section>

      <CTASection
        title="This stack, pointed at your roadmap"
        description="Tell us where the pain is. On a free 30-minute strategy call we'll map which layers matter for your case — and which you can safely ignore."
        primaryLabel="Start a conversation"
        primaryHref={ROUTES.contact}
        secondaryLabel="Explore services"
        secondaryHref={ROUTES.services}
      />
    </MotionConfig>
  );
}
