'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Clock, Database, ShieldCheck } from 'lucide-react'

import { WorksWheel, type WorksWheelItem } from '@/components/fx/works-wheel'
import {
  CTASection,
  Eyebrow,
  LinkButton,
  PageHero,
  PageShell,
  Section,
  SectionHeading,
} from '@/components/site/blocks'
import { ARTICLES } from '@/components/site/data'
import { ROUTES } from '@/components/site/nav'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const WHEEL_ITEMS: WorksWheelItem[] = ARTICLES.map((article) => ({
  title: article.title,
  category: article.category,
  description: article.description,
  tag: article.tag,
}))

/** ARTICLES[2] — "RAG in Regulated Industries" · ARTICLES[1] — "The Data Foundation" */
const REGULATED_START = ARTICLES[2]
const MESSY_DATA_START = ARTICLES[1]

export function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Field notes from applied AI."
        description="No hot takes. These are working notes from teams shipping production AI — what broke, what compounded, and what we would do differently, written by the engineers who shipped it."
      />

      {/* The wheel */}
      <Section className="pt-4 sm:pt-8">
        <PageShell>
          <SectionHeading
            eyebrow="The wheel"
            title="The wheel — five pieces worth your coffee"
            description="Drag it, tap a side card, or let it drift. Every card is something we learned the hard way, so you don't have to."
          />
          <div className="mx-auto mt-12 max-w-4xl">
            <WorksWheel items={WHEEL_ITEMS} />
          </div>
        </PageShell>
      </Section>

      {/* Full article index */}
      <Section tone="tint">
        <PageShell>
          <SectionHeading
            eyebrow="Full index"
            title="The complete shelf"
            description="Five field notes, newest first. Skim the titles, steal the frameworks, then ask us the follow-up questions."
          />
          <ul className="mt-12 flex flex-col gap-4">
            {ARTICLES.map((article, index) => (
              <motion.li
                key={article.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
              >
                <article className="rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-blue-200 sm:p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <Eyebrow>{article.category}</Eyebrow>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <Clock className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                      {article.readTime} · {article.date}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                    {article.title}
                  </h3>
                  <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
                    {article.description}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                      {article.tag}
                    </span>
                    <a
                      href={`#${ROUTES.contact}`}
                      className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50"
                    >
                      Ask us about this
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              </motion.li>
            ))}
          </ul>
        </PageShell>
      </Section>

      {/* Where to start */}
      <Section>
        <PageShell>
          <SectionHeading
            eyebrow="Where to start"
            title="Not sure which one to read first?"
            description="Two honest recommendations, based on the situations we see most on discovery calls."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease: EASE }}
              className="flex flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="mt-5 text-sm font-medium text-blue-600">
                If you are in a regulated industry
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
                Start with &ldquo;{REGULATED_START.title}&rdquo;
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Compliance does not kill Gen AI — ungoverned answers do. This is the pattern that
                gets retrieval-augmented systems past legal review: grounded answers, cited sources,
                and permission-aware retrieval by design.
              </p>
              <div className="mt-auto pt-8">
                <LinkButton href={`#${ROUTES.contact}`} variant="outline">
                  Discuss your compliance path
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </LinkButton>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
              className="flex flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
                <Database className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="mt-5 text-sm font-medium text-blue-600">If your data is a mess</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
                Start with &ldquo;{MESSY_DATA_START.title}&rdquo;
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Most failed AI initiatives were never AI problems. This note walks through the
                pipelines, ownership, and lineage you need in place before a single model can earn
                its keep.
              </p>
              <div className="mt-auto pt-8">
                <LinkButton href={`#${ROUTES.contact}`} variant="outline">
                  Talk through your data
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </LinkButton>
              </div>
            </motion.article>
          </div>
        </PageShell>
      </Section>

      <CTASection
        title="Prefer your field notes with a pulse?"
        description="Every note here came from a real engagement with real constraints. Bring yours — the first strategy call is free and refreshingly concrete."
        primaryLabel="Trade notes with our team"
        primaryHref={ROUTES.contact}
        secondaryLabel="See the outcomes"
        secondaryHref={ROUTES.caseStudies}
      />
    </>
  )
}
