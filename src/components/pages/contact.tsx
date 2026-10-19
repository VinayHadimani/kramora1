'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import {
  CalendarClock,
  CheckCircle2,
  Download,
  Loader2,
  Mail,
  Map,
  MapPin,
  MessageSquare,
  Target,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CursorDrivenParticleTypography } from '@/components/fx/cursor-driven-particle-typography'
import {
  Eyebrow,
  FeatureCard,
  LinkButton,
  PageShell,
  Section,
  SectionHeading,
} from '@/components/site/blocks'
import { SITE } from '@/components/site/nav'

/* ------------------------------ form machinery ----------------------------- */

const INTENT_OPTIONS = ['AI & Gen AI', 'Data & Cloud', 'Web & Automation', 'Not sure yet'] as const

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const FIELD_CLASS =
  'h-11 rounded-xl border-slate-300 bg-white text-slate-900 shadow-none placeholder:text-slate-400 focus-visible:border-blue-600 focus-visible:ring-blue-600/20'

const TEXTAREA_CLASS =
  'min-h-[132px] rounded-xl border-slate-300 bg-white text-slate-900 shadow-none placeholder:text-slate-400 focus-visible:border-blue-600 focus-visible:ring-blue-600/20'

interface FormValues {
  name: string
  email: string
  company: string
  message: string
}

interface FieldErrors {
  name?: string
  email?: string
  message?: string
}

type SubmitStatus = 'idle' | 'submitting' | 'success'

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {}
  if (!values.name.trim()) {
    errors.name = 'Please tell us your name.'
  }
  if (!values.email.trim()) {
    errors.email = 'We need your work email to reply.'
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'That email address does not look quite right.'
  }
  if (values.message.trim().length < 10) {
    errors.message = 'A sentence or two about your project is all we need.'
  }
  return errors
}

function RequiredMark() {
  return (
    <>
      <span aria-hidden="true" className="ml-0.5 text-blue-600">*</span>
      <span className="sr-only">(required)</span>
    </>
  )
}

/* ---------------------------------- page ----------------------------------- */

export function ContactPage() {
  const [values, setValues] = useState<FormValues>({ name: '', email: '', company: '', message: '' })
  const [intent, setIntent] = useState<string | null>(null)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [serverError, setServerError] = useState<string | null>(null)

  function onFieldChange(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next: FieldErrors = { ...prev }
      delete next[field]
      return next
    })
  }

  function resetForm() {
    setValues({ name: '', email: '', company: '', message: '' })
    setIntent(null)
    setErrors({})
    setServerError(null)
    setStatus('idle')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting') return

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (nextErrors.name || nextErrors.email || nextErrors.message) {
      const firstInvalid = nextErrors.name
        ? 'contact-name'
        : nextErrors.email
          ? 'contact-email'
          : 'contact-message'
      document.getElementById(firstInvalid)?.focus()
      return
    }

    setStatus('submitting')
    setServerError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          message: values.message.trim(),
          intent: intent ?? 'General',
        }),
      })

      if (response.ok) {
        setStatus('success')
        return
      }

      let message = `Something went wrong on our side. Please try again in a moment — or email ${SITE.email} directly.`
      if (response.status === 400) {
        try {
          const data = (await response.json()) as { error?: unknown }
          if (typeof data.error === 'string' && data.error.trim().length > 0) {
            message = data.error
          }
        } catch {
          /* malformed error body — keep the default message */
        }
      }
      setServerError(message)
      setStatus('idle')
    } catch {
      setServerError(
        `We could not reach the server. Check your connection and try again — or email ${SITE.email} directly.`
      )
      setStatus('idle')
    }
  }

  return (
    <>
      {/* Hero — particle typography headline */}
      <section aria-labelledby="contact-page-heading" className="relative overflow-hidden">
        <h1 id="contact-page-heading" className="sr-only">
          Let&apos;s build — contact Kramora AI
        </h1>
        <div
          aria-hidden="true"
          className="bg-grid-light bg-grid-fade absolute inset-0 [background-size:56px_56px]"
        />
        <div
          aria-hidden="true"
          className="absolute -top-32 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-blue-100/60 blur-3xl"
        />
        <PageShell className="relative flex flex-col items-center gap-6 pt-16 pb-10 sm:pt-24 sm:pb-14">
          <Eyebrow>Contact · Free 30-minute strategy call</Eyebrow>
          <div className="w-full max-w-4xl">
            <div className="h-[300px] sm:h-[380px]">
              <CursorDrivenParticleTypography text="LET'S BUILD" />
            </div>
          </div>
          <p className="max-w-xl text-center text-base leading-relaxed text-slate-500 sm:text-lg">
            Tell us where you&apos;re headed. One form, one reply — {SITE.replyTime.toLowerCase()}.
          </p>
        </PageShell>
      </section>

      {/* Body — the form + direct channels */}
      <Section>
        <PageShell>
          {/* grid-cols-1 is load-bearing: bare `grid` places children in ONE row
              of implicit columns (side-by-side) — phones need an explicit single
              column until the lg: two-column layout takes over. */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr]">
            {/* LEFT — the form card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              {status === 'success' ? (
                <div role="status" className="flex flex-col items-center py-8 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
                    <CheckCircle2 className="h-8 w-8 text-blue-600" aria-hidden="true" />
                  </span>
                  <h2 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">
                    You&apos;re on the board.
                  </h2>
                  <p className="mt-2 max-w-sm text-base leading-relaxed text-slate-600">
                    We reply within 24 hours — usually much faster.
                  </p>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
                    Watch your inbox for a note from {SITE.email} — no newsletter, no sequence, just a
                    calendar link.
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-8 inline-flex min-h-[44px] items-center rounded-full px-5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                    Book your free strategy call
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    A senior engineer reads every message — never a sales rep — and replies within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6" aria-label="Contact form">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">
                          Full name
                          <RequiredMark />
                        </Label>
                        <Input
                          id="contact-name"
                          name="name"
                          autoComplete="name"
                          placeholder="Ada Lovelace"
                          value={values.name}
                          onChange={(e) => onFieldChange('name', e.target.value)}
                          aria-invalid={errors.name ? true : undefined}
                          aria-describedby={errors.name ? 'contact-name-error' : undefined}
                          className={FIELD_CLASS}
                        />
                        {errors.name ? (
                          <p id="contact-name-error" className="text-sm text-red-600">
                            {errors.name}
                          </p>
                        ) : null}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact-email">
                          Work email
                          <RequiredMark />
                        </Label>
                        <Input
                          id="contact-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="ada@company.com"
                          value={values.email}
                          onChange={(e) => onFieldChange('email', e.target.value)}
                          aria-invalid={errors.email ? true : undefined}
                          aria-describedby={errors.email ? 'contact-email-error' : undefined}
                          className={FIELD_CLASS}
                        />
                        {errors.email ? (
                          <p id="contact-email-error" className="text-sm text-red-600">
                            {errors.email}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-company">Company</Label>
                      <Input
                        id="contact-company"
                        name="company"
                        autoComplete="organization"
                        placeholder="Analytical Engines Inc."
                        value={values.company}
                        onChange={(e) => onFieldChange('company', e.target.value)}
                        className={FIELD_CLASS}
                      />
                    </div>

                    <fieldset className="space-y-3">
                      <legend className="text-sm font-medium leading-none text-slate-700">
                        What are you exploring?
                      </legend>
                      <div className="flex flex-wrap gap-2">
                        {INTENT_OPTIONS.map((option) => (
                          <label key={option} className="cursor-pointer">
                            <input
                              type="radio"
                              name="intent"
                              value={option}
                              checked={intent === option}
                              onChange={() => {
                                setIntent(option)
                                setServerError(null)
                              }}
                              className="peer sr-only"
                            />
                            <span className="flex min-h-[44px] items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-blue-400 hover:text-blue-700 peer-checked:border-blue-600 peer-checked:bg-blue-600 peer-checked:text-white peer-checked:hover:border-blue-700 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-blue-600/50 peer-focus-visible:ring-offset-2">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <div className="space-y-2">
                      <Label htmlFor="contact-message">
                        Message
                        <RequiredMark />
                      </Label>
                      <Textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        placeholder="What are you building, what's in the way, and when do you want it live?"
                        value={values.message}
                        onChange={(e) => onFieldChange('message', e.target.value)}
                        aria-invalid={errors.message ? true : undefined}
                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                        className={TEXTAREA_CLASS}
                      />
                      {errors.message ? (
                        <p id="contact-message-error" className="text-sm text-red-600">
                          {errors.message}
                        </p>
                      ) : null}
                    </div>

                    {serverError ? (
                      <div
                        role="alert"
                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-600"
                      >
                        {serverError}
                      </div>
                    ) : null}

                    <div className="space-y-3">
                      <Button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="h-12 w-full rounded-full bg-blue-600 px-8 text-base font-medium text-white shadow-sm hover:bg-blue-700 sm:w-auto"
                      >
                        {status === 'submitting' ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                            Sending…
                          </>
                        ) : (
                          <>
                            <CalendarClock className="h-4 w-4" aria-hidden="true" />
                            Book my free 30-minute strategy call
                          </>
                        )}
                      </Button>
                      <p className="text-xs leading-relaxed text-slate-400">
                        Submitting this form books nothing — we email you a set of times to choose from.
                      </p>
                    </div>
                  </form>
                </>
              )}
            </motion.div>

            {/* RIGHT — direct channels */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-slate-900">Book directly</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                  Skip the form — these reach the people who do the work.
                </p>
                <div className="mt-5 space-y-3">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="card-hover-lift flex min-h-[44px] items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-colors hover:border-blue-200 sm:p-5"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-slate-900">{SITE.email}</span>
                      <span className="mt-0.5 block text-xs text-slate-500">Email us directly</span>
                    </span>
                  </a>

                  <div className="flex min-h-[44px] items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-slate-900">{SITE.usOffice.city}</span>
                      <span className="mt-0.5 block text-xs text-slate-500">{SITE.usOffice.detail}</span>
                    </span>
                  </div>

                  <div className="flex min-h-[44px] items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-slate-900">{SITE.indiaOffice.city}</span>
                      <span className="mt-0.5 block text-xs text-slate-500">{SITE.indiaOffice.detail}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold tracking-tight text-slate-900">Prefer reading first?</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                  Our full capability deck — services, stack, and engagement models in six pages.
                </p>
                <div className="mt-5">
                  <LinkButton href="/kramora-capability-deck.pdf" variant="outline" download>
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Download capability deck
                  </LinkButton>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-slate-600">
                    <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                    97% client retention
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-600">
                    <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                    5.0 average rating
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-600">
                    <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                    {SITE.replyTime}
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </PageShell>
      </Section>

      {/* Bottom strip — what happens on the call */}
      <Section tone="tint">
        <PageShell>
          <SectionHeading
            eyebrow="The 30 minutes"
            title="What happens on the call"
            description="A working session, not a sales call — with people who will actually build the thing."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={Target}
              title="We listen"
              description="You talk, we take notes. Context, constraints, what's been tried — the full, unfiltered picture."
            />
            <FeatureCard
              icon={Map}
              title="We map one high-leverage opportunity"
              description="By minute thirty you have one concrete, sequenced bet — the thing worth building before anything else."
            />
            <FeatureCard
              icon={MessageSquare}
              title="You get a straight yes/no"
              description="If AI won't move your number, we say so. If it will, you'll know exactly where to start."
            />
          </div>
          <p className="mt-8 text-center text-sm font-medium tracking-wide text-slate-500">
            No pitch decks. No juniors. Signal only.
          </p>
        </PageShell>
      </Section>
    </>
  )
}
