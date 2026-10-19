'use client'

import type { ReactNode } from 'react'
import { ArrowRight, CalendarClock } from 'lucide-react'
import { LinkButton, PageHero, PageShell, Section } from '@/components/site/blocks'
import { SITE } from '@/components/site/nav'

/* --------------------------- hand-styled legal prose ------------------------ */

function LegalSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-10">
      <h2 id={id} className="text-2xl font-semibold tracking-tight text-slate-900">
        {title}
      </h2>
      <div className="mt-4 space-y-4 leading-relaxed text-slate-600">{children}</div>
    </section>
  )
}

function EmailLink() {
  return (
    <a
      href={`mailto:${SITE.email}`}
      className="font-medium text-blue-600 underline underline-offset-2 transition-colors hover:text-blue-700"
    >
      {SITE.email}
    </a>
  )
}

function LegalList({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-2 pl-6 marker:text-blue-600">{children}</ul>
}

/* ---------------------------------- page ----------------------------------- */

export function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="The rules of engagement — written to be read."
      >
        <p className="text-xs font-medium uppercase tracking-widest text-slate-400">Last updated · July 2025</p>
      </PageHero>

      <Section>
        <PageShell>
          <div className="mx-auto max-w-3xl">
            <p className="text-lg leading-relaxed text-slate-500">
              These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the Kramora AI website and form the
              baseline under which we deliver services. They are short on purpose — the specifics of any
              engagement live in the paperwork you actually sign.
            </p>

            <LegalSection id="acceptance" title="Acceptance">
              <p>
                By accessing this website or engaging Kramora AI (&ldquo;Kramora&rdquo;, &ldquo;we&rdquo;,
                &ldquo;us&rdquo;), you agree to these Terms. If you engage us on behalf of a company, you confirm
                you are authorized to bind that company. If you do not agree, please do not use the site or
                engage us.
              </p>
            </LegalSection>

            <LegalSection id="services" title="Services">
              <p>
                Kramora AI delivers AI &amp; Generative AI, data engineering &amp; cloud, and web, mobile &amp;
                automation engineering through three engagement models:
              </p>
              <LegalList>
                <li>
                  <strong className="font-semibold text-slate-900">Fixed-scope projects</strong> — defined
                  deliverables, timeline, and price agreed up front.
                </li>
                <li>
                  <strong className="font-semibold text-slate-900">Dedicated pods</strong> — small senior teams
                  that embed with yours and ship continuously.
                </li>
                <li>
                  <strong className="font-semibold text-slate-900">Staff augmentation</strong> — vetted engineers
                  working under your direction.
                </li>
              </LegalList>
              <p>
                Every engagement is governed by a separate statement of work (SOW) or master services agreement
                (MSA) signed by both parties. Where a signed SOW or MSA conflicts with these Terms, the SOW or MSA
                prevails.
              </p>
            </LegalSection>

            <LegalSection id="intellectual-property" title="Intellectual Property">
              <p>
                Upon full payment of the relevant invoices, you own the custom deliverables created for your
                engagement — the code, documentation, models, and configuration built specifically for you.
              </p>
              <p>
                Kramora retains all rights to its pre-existing tools, frameworks, libraries, and know-how
                (&ldquo;Kramora Tools&rdquo;). Where Kramora Tools are embedded in deliverables, you receive a
                perpetual, worldwide, non-exclusive license to use them as part of those deliverables.
              </p>
            </LegalSection>

            <LegalSection id="fees-payment" title="Fees &amp; Payment">
              <p>
                Fees, rates, and payment schedules are defined per SOW. Retainers and dedicated pods are billed
                monthly in advance; fixed-scope projects typically follow a milestone schedule.
              </p>
              <p>
                Invoices are due within 15 days of receipt unless your SOW states otherwise. We may pause work on
                overdue accounts after fair notice — and we will always tell you before we do.
              </p>
            </LegalSection>

            <LegalSection id="confidentiality" title="Confidentiality">
              <p>
                Confidentiality runs both ways. We treat your data, roadmap, and business context as
                confidential, and we are NDA-first: we will sign yours before the first discovery call, or send
                ours for you to review. These obligations survive the end of an engagement.
              </p>
            </LegalSection>

            <LegalSection id="warranties-disclaimers" title="Warranties &amp; Disclaimers">
              <p>
                We deliver services with the skill and care of a senior engineering practice, and we stand behind
                the service-level commitments written into your SOW. Beyond that, this website and its content
                are provided &ldquo;as is&rdquo; without warranty of any kind.
              </p>
              <p>
                We cannot guarantee specific business outcomes from AI systems — anyone who does is selling
                something else.
              </p>
            </LegalSection>

            <LegalSection id="limitation-of-liability" title="Limitation of Liability">
              <p>
                To the maximum extent permitted by law, Kramora&apos;s aggregate liability under or related to an
                engagement is capped at the fees paid for that engagement in the 12 months before the claim.
                Neither party is liable for indirect, incidental, or consequential damages.
              </p>
              <p>
                Nothing in these Terms limits liability that cannot be limited by law — including for gross
                negligence or willful misconduct.
              </p>
            </LegalSection>

            <LegalSection id="term-termination" title="Term &amp; Termination">
              <p>
                These Terms apply while you use this website and for as long as we work together. Engagements end
                per their SOW — normally with a clean handover of code, documentation, and credentials.
              </p>
              <p>
                Either party may terminate an engagement for material breach with 30 days&apos; written notice if
                the breach is not cured within that period.
              </p>
            </LegalSection>

            <LegalSection id="governing-law" title="Governing Law">
              <p>
                These Terms are governed by the laws of the State of Washington, USA, without regard to
                conflict-of-law rules. Disputes are heard in the state or federal courts of King County,
                Washington, unless your signed MSA specifies otherwise.
              </p>
              <p>
                Engagements delivered from our India entity follow the governing law stated in that contract.
              </p>
            </LegalSection>

            <LegalSection id="contact" title="Contact">
              <p>
                Questions about these Terms? Email <EmailLink /> — we would rather answer a question than
                litigate one.
              </p>
            </LegalSection>

            <div className="mt-14 border-t border-slate-200 pt-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <LinkButton href="#/privacy" variant="outline">
                  Read the Privacy Policy
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </LinkButton>
                <LinkButton href="#/contact">
                  Book a free strategy call
                  <CalendarClock className="h-4 w-4" aria-hidden="true" />
                </LinkButton>
              </div>
            </div>
          </div>
        </PageShell>
      </Section>
    </>
  )
}
