"use client";

import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { VantaLightBackground, type VantaVariant } from "@/components/fx/vanta-light-background";

/* ---------------- Layout primitives ---------------- */

export function PageShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>
  );
}

export function Section({
  children,
  className,
  id,
  tone = "white",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "white" | "tint";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-24",
        tone === "tint" && "border-y border-slate-200/70 bg-gradient-to-b from-slate-50/80 to-blue-50/40",
        className
      )}
    >
      {children}
    </section>
  );
}

/* ---------------- Typography ---------------- */

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-medium tracking-wide text-blue-700",
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
  vanta,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
  className?: string;
  /** Optional atmospheric WebGL backdrop (desktop only; light-mode config). */
  vanta?: VantaVariant;
}) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      {vanta ? (
        <VantaLightBackground variant={vanta} />
      ) : (
        <div
          aria-hidden="true"
          className="bg-grid-light bg-grid-fade absolute inset-0 [background-size:56px_56px]"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl"
      />
      <PageShell className="relative flex flex-col items-center gap-6 pt-16 pb-12 text-center sm:pt-24 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6"
        >
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">{description}</p>
          {children}
        </motion.div>
      </PageShell>
    </section>
  );
}

/* ---------------- Cards & stats ---------------- */

export function GlassCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("glass rounded-2xl", className)}>{children}</div>;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
  tag,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  tag?: string;
  className?: string;
}) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        {tag ? (
          <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-500">
            {tag}
          </span>
        ) : null}
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">{description}</p>
      {href ? (
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600">
          Explore
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      ) : null}
    </>
  );

  return href ? (
    <a
      href={`#${href}`}
      className={cn(
        "card-hover-lift group block rounded-2xl border border-slate-200 bg-white p-6 hover:border-blue-200",
        className
      )}
    >
      {inner}
    </a>
  ) : (
    <div className={cn("card-hover-lift rounded-2xl border border-slate-200 bg-white p-6", className)}>
      {inner}
    </div>
  );
}

export function StatBlock({
  value,
  label,
  sub,
  className,
}: {
  value: string;
  label: string;
  sub?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-1 text-center", className)}>
      <span className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">{value}</span>
      <span className="text-sm font-medium text-blue-600">{label}</span>
      {sub ? <span className="text-xs text-slate-400">{sub}</span> : null}
    </div>
  );
}

/* ---------------- Buttons (hash links) ---------------- */

export function LinkButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  download,
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "white";
  size?: "md" | "lg";
  className?: string;
  download?: boolean;
  external?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50 focus-visible:ring-offset-2";
  const sizes = size === "lg" ? "h-12 px-7 text-base" : "h-11 px-6 text-sm";
  const variants = {
    primary: "bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow-md active:scale-[0.98]",
    outline:
      "border border-slate-300 bg-white text-slate-700 hover:border-blue-600 hover:text-blue-700 active:scale-[0.98]",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    white: "bg-white text-blue-700 shadow-sm hover:bg-blue-50 hover:shadow-md active:scale-[0.98]",
  } as const;

  return (
    <a
      href={href}
      download={download}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(base, sizes, variants[variant], "min-h-[44px]", className)}
    >
      {children}
    </a>
  );
}

/* ---------------- CTA banner ---------------- */

export function CTASection({
  title = "Ready to build something intelligent?",
  description = "Book a free 30-minute strategy call. We'll map your highest-leverage AI opportunity — and be blunt about the ones that aren't.",
  primaryLabel = "Start a conversation",
  primaryHref = "/contact",
  secondaryLabel = "Explore services",
  secondaryHref = "/services",
  className,
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}) {
  return (
    <Section className={cn("pb-20 sm:pb-28", className)}>
      <PageShell>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-600 to-blue-500 px-6 py-14 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.18), transparent 45%), radial-gradient(circle at 85% 90%, rgba(219,234,254,0.25), transparent 40%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[24px] border-white/10"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border-[32px] border-white/10"
          />
          <div className="relative flex flex-col items-center gap-6">
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-blue-100">{description}</p>
            <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
              <LinkButton href={`#${primaryHref}`} variant="white" size="lg">
                {primaryLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </LinkButton>
              {secondaryLabel ? (
                <LinkButton
                  href={`#${secondaryHref}`}
                  size="lg"
                  variant="ghost"
                  className="border border-white/40 text-white hover:bg-white/10 hover:text-white"
                >
                  {secondaryLabel}
                </LinkButton>
              ) : null}
            </div>
            <p className="text-xs text-blue-200">We reply within 24 hours · No pitch decks, just signal</p>
          </div>
        </div>
      </PageShell>
    </Section>
  );
}
