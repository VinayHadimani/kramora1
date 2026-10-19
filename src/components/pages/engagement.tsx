'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Award, Check, HeartHandshake, Presentation, ShieldCheck } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  CTASection,
  FeatureCard,
  LinkButton,
  PageHero,
  PageShell,
  Section,
  SectionHeading,
} from '@/components/site/blocks'
import { ENGAGEMENT_MODELS } from '@/components/site/data'
import { ROUTES } from '@/components/site/nav'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const DECISION_ROWS = [
  {
    question: 'Is the outcome crisply defined?',
    model: 'Fixed Scope',
    hint: 'A bounded build with a committed budget — we own the delivery risk, you approve scope.',
  },
  {
    question: 'Compounding on a multi-quarter roadmap?',
    model: 'Dedicated Pods',
    hint: 'A senior pod that ships against your backlog every single week, scaling on demand.',
  },
  {
    question: 'Strong internal leads who need horsepower?',
    model: 'Staff Augmentation',
    hint: 'Vetted senior engineers slotted straight into your org chart, scaling both directions.',
  },
]

export function EngagementPage() {
  return (
    <>
      <PageHero
        eyebrow="Engagement"
        title="Three ways to plug us in."
        description="Fixed scope, dedicated pods, or staff augmentation. Pick the shape that matches your roadmap — the senior-only staffing, weekly demos, and delivery spine never change."
      />

      {/* The three models */}
      <Section className="pt-4 sm:pt-8">
        <PageShell>
          <h2 className="sr-only">Engagement models</h2>
          <div className="grid items-stretch gap-6 pt-4 sm:gap-8 lg:grid-cols-3">
            {ENGAGEMENT_MODELS.map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: index * 0.1, ease: EASE }}
                className="flex"
              >
                <article
                  className={cn(
                    'relative flex w-full flex-col p-8',
                    model.popular
                      ? 'rounded-3xl border-2 border-blue-600 bg-white shadow-lg shadow-blue-600/10 lg:-translate-y-2'
                      : 'rounded-3xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)]'
                  )}
                >
                  {model.popular ? (
                    <span className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold tracking-wide text-white shadow">
                      MOST POPULAR
                    </span>
                  ) : null}

                  <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                    {model.name}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium text-blue-600">{model.bestFor}</p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {model.description}
                  </p>

                  <ul className="mt-6 flex flex-col gap-3">
                    {model.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-slate-600">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"
                          aria-hidden="true"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <LinkButton
                      href={`#${ROUTES.contact}`}
                      variant="primary"
                      className="w-full"
                    >
                      Start {model.name}
                    </LinkButton>
                  </div>
                </article>
              </motion.div>
            ))}
          </div>
        </PageShell>
      </Section>

      {/* Which one fits? */}
      <Section tone="tint">
        <PageShell>
          <SectionHeading
            eyebrow="Quick triage"
            title="Which one fits?"
            description="Three questions, three honest answers — the same ones we give on discovery calls."
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {DECISION_ROWS.map((row, index) => (
              <motion.li
                key={row.question}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
              >
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="text-base font-medium leading-snug text-slate-900">
                    {row.question}
                  </h3>
                  <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-600">
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {row.model}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{row.hint}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </PageShell>
      </Section>

      {/* Reassurance strip */}
      <Section>
        <PageShell>
          <SectionHeading
            eyebrow="Non-negotiables"
            title="All models include"
            description="However you plug us in, these four never change."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={Award}
              title="Senior-only staffing"
              description="No pyramids, no junior benches — the people who scope your work are the ones who build it."
            />
            <FeatureCard
              icon={Presentation}
              title="Weekly demos"
              description="Working software every Friday with a shared backlog in the open. You never have to ask where things stand."
            />
            <FeatureCard
              icon={ShieldCheck}
              title="NDA-first"
              description="Confidentiality paperwork before anything moves. Your data, your roadmap, and your IP stay yours."
            />
            <FeatureCard
              icon={HeartHandshake}
              title="97% retention culture"
              description="We run engagements partners choose to extend — not contracts they wait out."
            />
          </div>
        </PageShell>
      </Section>

      <CTASection
        title="Still weighing the options?"
        description="Bring your roadmap and your constraints. We will recommend the model that fits — even when it is the cheaper one."
        primaryLabel="Pick your model on a call"
        primaryHref={ROUTES.contact}
        secondaryLabel="See how we work"
        secondaryHref={ROUTES.process}
      />
    </>
  )
}
