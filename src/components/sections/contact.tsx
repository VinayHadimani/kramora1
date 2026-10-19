"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/lib/content";
import { useContactModal } from "@/lib/store";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Renders a heading with one phrase set in serif italic blue (accent word style). */
function withAccent(heading: string, accent: string): React.ReactNode {
  const index = heading.indexOf(accent);
  if (index === -1) return heading;
  return (
    <>
      {heading.slice(0, index)}
      <span className="font-serif italic text-blue-600">{accent}</span>
      {heading.slice(index + accent.length)}
    </>
  );
}

const NEXT_STEPS = [
  {
    number: "01",
    title: "You reach out — 24h reply",
    description:
      "Tell us what you're building. A senior engineer replies personally, not a sales bot.",
  },
  {
    number: "02",
    title: "Free 30-min strategy call",
    description:
      "Thirty focused minutes on your problem, your data and your roadmap. No pitch, no pressure.",
  },
  {
    number: "03",
    title: "A concrete plan, not a pitch deck",
    description:
      "You leave with a scoped roadmap, honest timelines and clear next steps — in writing.",
  },
] as const;

export default function Contact() {
  const open = useContactModal((state) => state.open);

  return (
    <section id="contact" className="relative bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            {CONTACT_INFO.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {withAccent(CONTACT_INFO.heading, "India-engineered")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500">
            {CONTACT_INFO.body}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left — direct contact card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
          >
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Direct contact
            </h3>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                <Mail aria-hidden className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400">
                  Direct email
                </p>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-lg font-semibold text-slate-900 transition-colors hover:text-blue-600"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {CONTACT_INFO.offices.map((office) => (
                <div
                  key={office.country}
                  className="rounded-xl border border-slate-200 p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2">
                      <MapPin
                        aria-hidden
                        className="h-4 w-4 shrink-0 text-blue-600"
                      />
                      <span className="text-sm font-semibold text-slate-900">
                        {office.country}
                      </span>
                    </span>
                    <span
                      className={
                        office.label === "US HQ"
                          ? "rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white"
                          : "rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white"
                      }
                    >
                      {office.label}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-medium text-slate-900">
                    {office.name}
                  </p>
                  <div className="mt-2 space-y-1">
                    {office.lines.map((line) => (
                      <p key={line} className="text-sm text-slate-500">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — what happens next panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
          >
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              What happens next
            </h3>

            <ol className="mt-6 space-y-6">
              {NEXT_STEPS.map((step) => (
                <li key={step.number} className="flex gap-4">
                  <span
                    aria-hidden
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-semibold text-blue-600"
                  >
                    {step.number}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {step.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <Button size="lg" className="mt-8 w-full" onClick={open}>
              Start the conversation
            </Button>
            <p className="mt-4 text-center text-xs text-slate-400">
              Prefer email? {CONTACT_INFO.email}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
