"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BRAND, FOOTER } from "@/lib/content";
import { useContactModal } from "@/lib/store";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, delay, ease: EASE },
});

/**
 * Footer — Superdesign theme, light adaptation.
 * A giant ghost wordmark anchors the left; link columns sit to the right,
 * with the legal strip pinned along the bottom.
 */
export default function Footer() {
  const open = useContactModal((state) => state.open);

  return (
    <footer id="footer" className="relative overflow-hidden border-t border-slate-100 bg-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
          {/* Giant wordmark + tagline + CTA */}
          <motion.div {...reveal()} className="w-full md:w-auto">
            <h2
              aria-hidden
              className="pointer-events-none select-none text-[10vw] font-bold leading-[0.8] tracking-tighter text-slate-200 md:text-[7vw]"
            >
              KRAMORA<span className="text-blue-200">.</span>
            </h2>
            <p className="mt-6 font-serif italic text-slate-500">
              {FOOTER.tagline} — {BRAND.legalName}
            </p>
            <Button
              className="mt-6 rounded-full transition-all duration-300 hover:scale-105 hover:bg-blue-700"
              onClick={open}
            >
              {FOOTER.cta}
              <ArrowRight aria-hidden />
            </Button>
          </motion.div>

          {/* Link columns */}
          <motion.div
            {...reveal(0.1)}
            className="grid grid-cols-2 gap-10 sm:grid-cols-3"
          >
            <nav aria-label="Solutions">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Solutions
              </h3>
              <ul className="mt-5 space-y-3">
                {FOOTER.solutionLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors duration-300 hover:text-blue-600"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Company">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Company
              </h3>
              <ul className="mt-5 space-y-3">
                {FOOTER.companyLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors duration-300 hover:text-blue-600"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Get in touch
              </h3>
              <a
                href={`mailto:${FOOTER.contact.email}`}
                className="mt-5 block text-sm font-medium text-slate-900 transition-colors duration-300 hover:text-blue-600"
              >
                {FOOTER.contact.email}
              </a>
              <p className="mt-3 text-sm text-slate-500">
                {FOOTER.contact.locations}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                {FOOTER.contact.address}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-100">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-6 py-6 text-xs text-slate-400 sm:flex-row lg:px-8">
          <p>{FOOTER.copyright}</p>
          <p>{FOOTER.blueprint}</p>
        </div>
      </div>
    </footer>
  );
}
