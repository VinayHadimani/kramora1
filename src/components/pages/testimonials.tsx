'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

import {
  CTASection,
  PageHero,
  PageShell,
  Section,
  SectionHeading,
  StatBlock,
} from '@/components/site/blocks'
import { FAQS, TESTIMONIALS } from '@/components/site/data'
import { ROUTES } from '@/components/site/nav'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const RATING_STARS = [0, 1, 2, 3, 4]

export function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials & FAQ"
        title="Reference calls, on the record."
        description="A 5.0 average rating across 27+ teams partnered, with 97% client retention to back it. Here is what those numbers sound like in full sentences — plus the questions every partner asks before signing."
      />

      {/* Rating band */}
      <Section tone="tint" className="pt-4 sm:pt-8">
        <PageShell>
          <div className="flex flex-col items-center gap-10">
            <div
              role="img"
              aria-label="Average rating: 5.0 out of 5 stars"
              className="flex items-center gap-1.5"
            >
              {RATING_STARS.map((star) => (
                <Star
                  key={star}
                  className="h-6 w-6 fill-blue-500 text-blue-500 sm:h-7 sm:w-7"
                  aria-hidden="true"
                />
              ))}
            </div>
            <div className="grid w-full gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-12">
              <StatBlock value="5.0" label="Average rating" sub="reported on every engagement" />
              <StatBlock value="27+" label="Teams partnered" sub="from insurance to freight" />
              <StatBlock
                value="97%"
                label="Client retention"
                sub="partners who extend engagements"
              />
            </div>
          </div>
        </PageShell>
      </Section>

      {/* Testimonial grid */}
      <Section>
        <PageShell>
          <SectionHeading
            eyebrow="On the record"
            title="What partners actually say"
            description="Unedited, attributed, and sayable on a reference call — ask us for one."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.figure
                key={testimonial.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: EASE }}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)] sm:p-7"
              >
                <span
                  aria-hidden="true"
                  className="block select-none font-serif text-6xl leading-[0.6] text-slate-200"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-3 pb-6 text-sm leading-relaxed text-slate-700 sm:text-base">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3.5 border-t border-slate-100 pt-5">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700"
                  >
                    {testimonial.initials}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-900">{testimonial.name}</span>
                    <span className="text-xs text-slate-500">
                      {testimonial.role} · {testimonial.company}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </PageShell>
      </Section>

      {/* FAQ */}
      <Section tone="tint">
        <PageShell className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions partners actually ask"
            description="The same answers we give on discovery calls — no gatekeeping."
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="mt-12"
          >
            <Accordion type="single" collapsible className="flex flex-col gap-4">
              {FAQS.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`faq-${index}`}
                  className="rounded-2xl border border-slate-200 bg-white px-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)] transition-colors last:border-b data-[state=open]:border-blue-200"
                >
                  <AccordionTrigger className="py-5 text-base font-medium text-slate-900 hover:no-underline [&>svg]:size-5 [&>svg]:text-blue-600 sm:py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-slate-600">
                    <p className="max-w-2xl pb-6 pr-2 sm:pr-8">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </PageShell>
      </Section>

      <CTASection
        title="Become the next reference call"
        description="The 97% is not a marketing number — it is what happens when engagements are run like partnerships. Start yours with a free strategy call."
        primaryLabel="Join the 97%"
        primaryHref={ROUTES.contact}
        secondaryLabel="See the case studies"
        secondaryHref={ROUTES.caseStudies}
      />
    </>
  )
}
