"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLiquidGlass } from "@/hooks/use-liquid-glass";
import { ANNOUNCEMENT, BRAND, NAV_LINKS } from "@/lib/content";
import { useContactModal } from "@/lib/store";
import { cn } from "@/lib/utils";

/**
 * Header — Superdesign-theme fixed navigation.
 * Transparent and airy at rest (announcement strip + generous nav padding);
 * the nav row is a liquidGL lens (WebGPU/WebGL "Liquid Glass" refraction —
 * falls back to the frosted CSS surface in `.liquid-glass-target`) that
 * refracts the page content scrolling behind it and collapses into a
 * compact bar with a hairline border on scroll.
 */
export default function Header() {
  const openContact = useContactModal((state) => state.open);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Liquid Glass lens on the nav row — subtle refraction, no tilt, no
  // shadow (top-edge bar), clean white dye for the strict light theme.
  useLiquidGlass(navRef, {
    refraction: 0.007,
    bevelDepth: 0.05,
    bevelWidth: 0.22,
    frost: 1.2,
    shadow: false,
    tilt: false,
    tint: "rgba(255, 255, 255, 0.55)",
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 w-full transition-all duration-500",
        )}
      >
        {/* Announcement strip — collapses away on scroll */}
        <div
          className={cn(
            "overflow-hidden bg-primary text-primary-foreground transition-all duration-500",
            scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100",
          )}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-6 py-2 text-center">
            <p className="truncate text-xs font-medium tracking-wide sm:text-[13px]">
              {ANNOUNCEMENT.message}
            </p>
            <span
              aria-hidden
              className="hidden h-1 w-1 shrink-0 rounded-full bg-primary-foreground/60 sm:block"
            />
            <p className="hidden shrink-0 text-xs opacity-90 sm:block sm:text-[13px]">
              {ANNOUNCEMENT.support}
            </p>
          </div>
        </div>

        {/* Nav row — liquidGL glass lens; compact + hairline border on scroll */}
        <div
          ref={navRef}
          className={cn(
            "liquid-glass-target transition-all duration-500",
            scrolled
              ? "border-b border-slate-100 py-3 shadow-[0_8px_30px_-18px_rgba(15,23,42,0.15)]"
              : "border-b border-transparent py-6",
          )}
        >
          <div className="content mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
            {/* Brand — serif wordmark */}
            <a
              href="#hero"
              className="font-serif text-2xl font-bold tracking-tighter text-slate-900 transition-colors duration-300"
              aria-label={`${BRAND.name} — back to top`}
            >
              Kramora<span className="text-blue-600">.</span>
            </a>

            {/* Desktop nav */}
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors duration-300 hover:text-slate-900"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              <Button
                onClick={openContact}
                className="hidden rounded-full px-6 font-medium transition-all duration-300 hover:scale-105 hover:bg-blue-700 sm:inline-flex"
              >
                Start Project
                <ArrowUpRight className="ml-1 h-4 w-4" aria-hidden />
              </Button>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-600 backdrop-blur-sm transition-colors hover:border-blue-300 hover:text-blue-600 lg:hidden"
              >
                <Menu className="h-5 w-5" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-x-0 top-0 border-b border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="font-serif text-2xl font-bold tracking-tighter text-slate-900">
                Kramora<span className="text-blue-600">.</span>
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-600"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-6">
              <ul className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-xl px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-blue-600"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <Button
              className="mt-6 w-full rounded-full hover:bg-blue-700"
              size="lg"
              onClick={() => {
                setMobileOpen(false);
                openContact();
              }}
            >
              Start Project
              <ArrowUpRight className="ml-1.5 h-4 w-4" aria-hidden />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
