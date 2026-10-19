'use client'

import { motion } from 'framer-motion'
import { Database, Star, TrendingUp, UserCheck } from 'lucide-react'

import { CaseStudyFlipStack, type CaseStudyItem } from '@/components/fx/case-study-flip-stack'
import {
  CTASection,
  Eyebrow,
  FeatureCard,
  PageHero,
  PageShell,
  Section,
  SectionHeading,
} from '@/components/site/blocks'
import { CASE_STUDIES } from '@/components/site/data'
import { ROUTES } from '@/components/site/nav'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Insurance — Generative AI: the flagship engagement. */
const FEATURED = CASE_STUDIES[0]

const FLIP_ITEMS: CaseStudyItem[] = CASE_STUDIES.map((study) => ({
  industry: study.industry,
  title: study.title,
  summary: study.summary,
  metric: study.metric,
  metricLabel: study.metricLabel,
  metrics: study.metrics,
}))

export function CaseStudiesPage() {
  return (
    <>
      <PageHero
        vanta="net"
        eyebrow="Case Studies"
        title="Outcomes, not decks."
        description="We don't sell slideware. Every engagement below is a production system with a name, an owner, and a metric the client still reports — measured weekly, in the wild."
      />

      {/* Featured case — Insurance, Generative AI */}
      <Section className="pt-4 sm:pt-8">
        <PageShell>
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE }}
            aria-labelledby="featured-case-title"
            className="relative overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_44px_rgba(15,23,42,0.08)] sm:p-12"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl"
            />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-3">
                <Eyebrow>{FEATURED.industry}</Eyebrow>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold tracking-wide text-white shadow-sm">
                  <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                  Featured
                </span>
              </div>

              <h2
                id="featured-case-title"
                className="mt-6 max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
              >
                {FEATURED.title}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
                {FEATURED.summary}
              </p>

              <div className="mt-10 border-t border-blue-100 pt-8">
                <p className="text-5xl font-semibold tracking-tight text-blue-600 sm:text-6xl">
                  {FEATURED.metric}
                </p>
                <p className="mt-2 text-sm font-medium text-slate-500 sm:text-base">
                  {FEATURED.metricLabel}
                </p>
              </div>

              <dl className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {FEATURED.metrics.map((metric) => (
                  <div
                    key={`${metric.value}-${metric.label}`}
                    className="border-l-2 border-blue-200 pl-4"
                  >
                    <dt className="sr-only">{metric.label}</dt>
                    <dd>
                      <span className="block text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                        {metric.value}
                      </span>
                      <span className="mt-1 block text-xs text-slate-500 sm:text-sm">
                        {metric.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technologies used">
                {FEATURED.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-600"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        </PageShell>
      </Section>

      {/* Interactive deck — all four engagements */}
      <Section tone="tint">
        <PageShell>
          <SectionHeading
            eyebrow="The portfolio"
            title="Spin through the portfolio"
            description="Four production systems across insurance, FinTech, healthcare, and logistics. Click the deck — or let it drift — to read each one."
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <CaseStudyFlipStack items={FLIP_ITEMS} />
          </div>
        </PageShell>
      </Section>

      {/* The pattern behind the numbers */}
      <Section>
        <PageShell>
          <SectionHeading
            eyebrow="The pattern"
            title="The pattern behind the numbers"
            description="Different industries, same operating system. These three defaults show up in every engagement on this page."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={Database}
              title="Grounded in your data"
              description="Every answer traces back to your systems of record — auditable, permission-aware, and cited. No generic models guessing at your business."
              href={ROUTES.process}
              tag="Data"
            />
            <FeatureCard
              icon={UserCheck}
              title="Human-in-the-loop by default"
              description="Automation drafts, experts approve. Exceptions route to people with full context, so compliance signs off once and stays signed off."
              href={ROUTES.insights}
              tag="Governance"
            />
            <FeatureCard
              icon={TrendingUp}
              title="Measured weekly"
              description="Documents per hour, decision latency, straight-through rate — the metric we signed up for shows up in every Friday demo."
              href={ROUTES.process}
              tag="Accountability"
            />
          </div>
        </PageShell>
      </Section>

      <CTASection
        title="The next case study starts with your number"
        description="Bring us a metric you want to move and we will scope the shortest path to production — on one call, in plain language."
        primaryLabel="Your metric goes here"
        primaryHref={ROUTES.contact}
        secondaryLabel="Hear it from partners"
        secondaryHref={ROUTES.testimonials}
      />
    </>
  )
}
