'use client'

import type { ReactNode } from 'react'
import { ArrowRight, Home } from 'lucide-react'
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

export function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How Kramora AI collects, uses, and protects information."
      >
        <p className="text-xs font-medium uppercase tracking-widest text-slate-400">Last updated · July 2025</p>
      </PageHero>

      <Section>
        <PageShell>
          <div className="mx-auto max-w-3xl">
            <p className="text-lg leading-relaxed text-slate-500">
              Kramora AI (&ldquo;Kramora&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) delivers AI, data, and product
              engineering from offices in Issaquah, Washington and Bengaluru, India. This policy explains what
              information we collect through this website and our engagements, why we collect it, and the control
              you have over it — in plain language.
            </p>

            <LegalSection id="information-we-collect" title="Information We Collect">
              <p>
                <strong className="font-semibold text-slate-900">Contact details.</strong> When you submit the
                contact form or email <EmailLink />, we receive your name, work email address, company (if
                provided), the content of your message, and the service area you marked. Nothing else is attached
                to the submission.
              </p>
              <p>
                <strong className="font-semibold text-slate-900">Usage data.</strong> Like most websites, our
                servers log basic technical data — pages requested, approximate region derived from IP address,
                browser and device type, and referring URL. We use privacy-respecting, cookie-less measurement
                and run no third-party advertising trackers.
              </p>
              <p>
                We do not collect sensitive or special-category personal data through this site, and we never
                purchase data from brokers.
              </p>
            </LegalSection>

            <LegalSection id="how-we-use-it" title="How We Use It">
              <p>We use the information we collect to:</p>
              <LegalList>
                <li>Respond to your inquiry — every serious message gets a reply within 24 hours.</li>
                <li>Deliver contracted services and communicate about active engagements.</li>
                <li>Keep the website secure — rate limiting, spam filtering, and abuse detection.</li>
                <li>Improve the site based on aggregate, de-identified usage patterns.</li>
              </LegalList>
              <p>
                <strong className="font-semibold text-slate-900">Legal basis.</strong> Where the GDPR applies, we
                process inquiry data to take steps prior to entering a contract, and on the basis of our
                legitimate interest in responding to business inquiries and keeping the site secure. You may
                object at any time by emailing us.
              </p>
            </LegalSection>

            <LegalSection id="sharing-subprocessors" title="Sharing &amp; Sub-processors">
              <p>
                We never sell, rent, or trade personal data — full stop. We share it only with the sub-processors
                required to operate the business: cloud infrastructure, email, and scheduling providers, each
                bound by a written data-processing agreement that mirrors these commitments.
              </p>
              <p>
                Client project data stays inside the environments provisioned for that engagement. It is never
                used to train models and never shared across clients.
              </p>
            </LegalSection>

            <LegalSection id="retention-security" title="Data Retention &amp; Security">
              <p>
                Contact inquiries are retained for up to 24 months so we can pick conversations back up where
                they left off — then they are deleted. Security controls include:
              </p>
              <LegalList>
                <li>Encryption in transit (TLS) and at rest.</li>
                <li>
                  Least-privilege access, limited to the people working your engagement, with multi-factor
                  authentication on all internal systems.
                </li>
                <li>Region pinning where a client or regulation requires data to stay put.</li>
              </LegalList>
            </LegalSection>

            <LegalSection id="your-rights" title="Your Rights">
              <p>Depending on where you live, you may have the right to:</p>
              <LegalList>
                <li>Access the personal data we hold about you.</li>
                <li>Correct data that is inaccurate.</li>
                <li>Delete your data, subject to legal retention duties.</li>
                <li>Receive a portable copy, or object to and restrict processing.</li>
              </LegalList>
              <p>
                Exercise any of these by emailing <EmailLink /> — a human reads that inbox, and we respond within
                30 days (usually much faster).
              </p>
            </LegalSection>

            <LegalSection id="international-transfers" title="International Transfers">
              <p>
                We operate from the United States and India, so personal data may be processed in either country.
                Where personal data of EU or UK residents is transferred, it is protected by standard contractual
                clauses or equivalent safeguards.
              </p>
            </LegalSection>

            <LegalSection id="children" title="Children">
              <p>
                This website is intended for business audiences. We do not knowingly collect personal data from
                children under 16. If we learn we have, we delete it promptly.
              </p>
            </LegalSection>

            <LegalSection id="changes" title="Changes">
              <p>
                When this policy changes, we update the date above and, for material changes, flag them at the
                top of this page for 30 days. Continued use of the site after a change means you accept the
                updated policy.
              </p>
            </LegalSection>

            <LegalSection id="contact" title="Contact">
              <p>
                Questions about privacy? Email <EmailLink />, or reach us at our offices in{' '}
                {SITE.usOffice.city}, {SITE.usOffice.country} (US HQ) and {SITE.indiaOffice.city},{' '}
                {SITE.indiaOffice.country} (delivery hub).
              </p>
            </LegalSection>

            <div className="mt-14 border-t border-slate-200 pt-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <LinkButton href="#/terms" variant="outline">
                  Read Terms of Service
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </LinkButton>
                <LinkButton href="#/" variant="ghost">
                  <Home className="h-4 w-4" aria-hidden="true" />
                  Back to home
                </LinkButton>
              </div>
            </div>
          </div>
        </PageShell>
      </Section>
    </>
  )
}
