"use client";

import { ArrowRight, Mail, MapPin } from "lucide-react";
import { ROUTES, SITE } from "./nav";
import { KramoraLogo } from "./logo";
import { PageShell } from "./blocks";

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: ROUTES.privacy },
  { label: "Terms of Service", href: ROUTES.terms },
];

const RESOURCE_LINKS = [
  { label: "Case Studies", href: ROUTES.caseStudies },
  { label: "Insights Hub", href: ROUTES.insights },
  { label: "Engagement Models", href: ROUTES.engagement },
  { label: "Testimonials & FAQ", href: ROUTES.testimonials },
];

const COMPANY_LINKS = [
  { label: "About Us", href: ROUTES.about },
  { label: "Our Process", href: ROUTES.process },
  { label: "Technology Stack", href: ROUTES.techStack },
  { label: "Industries", href: ROUTES.industries },
];

const SERVICES_LINKS = [
  { label: "Services Overview", href: ROUTES.services },
  { label: "AI & Generative AI", href: ROUTES.ai },
  { label: "Data Engineering & Cloud", href: ROUTES.dataCloud },
  { label: "Web, Mobile & Automation", href: ROUTES.webMobile },
  { label: "OCR, Document AI & Staff", href: ROUTES.ocrStaff },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav aria-label={title}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{title}</p>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={`#${link.href}`}
              className="text-sm text-slate-600 transition-colors hover:text-blue-700"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-gradient-to-b from-slate-50/60 to-blue-50/30">
      <PageShell className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          {/* Brand block */}
          <div className="flex flex-col gap-5">
            <a href="#/" aria-label="Kramora AI — home">
              <KramoraLogo />
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-slate-500">
              {SITE.tagline} We build intelligent products that scale — one senior partner across
              AI, data, cloud, and product engineering.
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2.5 text-slate-600 transition-colors hover:text-blue-700"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                {SITE.email}
              </a>
              <div className="flex flex-col gap-2.5">
                <span className="inline-flex items-center gap-2.5 text-slate-600">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {SITE.usOffice.city} — US HQ
                </span>
                <span className="inline-flex items-center gap-2.5 text-slate-600">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {SITE.indiaOffice.city} — India
                </span>
              </div>
            </div>
            <a
              href={`#${ROUTES.contact}`}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
            >
              Book a free 30-min call
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <FooterColumn title="Services" links={SERVICES_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
          <FooterColumn title="Work" links={RESOURCE_LINKS} />
          <FooterColumn title="Legal" links={LEGAL_LINKS} />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-xs text-slate-400">{SITE.replyTime} · 97% client retention</p>
        </div>
      </PageShell>
    </footer>
  );
}
