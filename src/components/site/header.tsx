"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, ArrowRight, CalendarClock } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_GROUPS, ROUTES, SITE } from "./nav";
import { KramoraLogo } from "./logo";
import { PageShell } from "./blocks";
import { cn } from "@/lib/utils";

function isActive(route: string, href: string): boolean {
  if (href === "/") return route === "/";
  return route === href || route.startsWith(`${href}/`);
}

function TopBanner() {
  return (
    <div className="bg-blue-600 text-white">
      <PageShell className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 py-2 text-center text-[12.5px] leading-5 sm:text-[13px]">
        <span className="inline-flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-200 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          <span className="font-medium">Now booking Q3 engagements — limited capacity</span>
        </span>
        <span className="hidden text-blue-300 sm:inline" aria-hidden="true">
          ·
        </span>
        <span className="hidden text-blue-100 sm:inline">{SITE.replyTime}</span>
        <a
          href={`#${ROUTES.contact}`}
          className="font-medium text-white underline decoration-blue-400 underline-offset-2 transition-colors hover:decoration-white"
        >
          Book a call
        </a>
      </PageShell>
    </div>
  );
}

function NavDropdown({
  label,
  items,
  route,
}: {
  label: string;
  items: { label: string; href: string; description: string }[];
  route: string;
}) {
  const [open, setOpen] = useState(false);
  const groupActive = items.some((item) => isActive(route, item.href));

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-11 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors",
          groupActive || open
            ? "text-blue-700"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        )}
      >
        {label}
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-full z-50 w-[19rem] -translate-x-1/2 pt-2"
          >
            <div className="glass-strong overflow-hidden rounded-2xl p-2">
              {items.map((item) => {
                const active = isActive(route, item.href);
                return (
                  <a
                    key={item.href}
                    href={`#${item.href}`}
                    className={cn(
                      "group block rounded-xl px-3.5 py-2.5 transition-colors",
                      active ? "bg-blue-50" : "hover:bg-blue-50/70"
                    )}
                  >
                    <span
                      className={cn(
                        "flex items-center justify-between text-sm font-medium",
                        active ? "text-blue-700" : "text-slate-900 group-hover:text-blue-700"
                      )}
                    >
                      {item.label}
                      <ArrowRight
                        className="h-3.5 w-3.5 -translate-x-1 text-blue-500 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">
                      {item.description}
                    </span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function MobileNav({ route }: { route: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open navigation menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-100 lg:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-[86vw] max-w-sm flex-col gap-0 overflow-y-auto border-slate-200 bg-white p-0"
      >
        <SheetHeader className="border-b border-slate-200 px-6 py-5 text-left">
          <SheetTitle asChild>
            <a href="#/" onClick={() => setOpen(false)} aria-label="Kramora AI home">
              <KramoraLogo />
            </a>
          </SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile navigation" className="flex-1 px-4 py-4">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="mb-5">
              <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                {group.label}
              </p>
              <div className="flex flex-col gap-0.5">
                {group.children.map((item) => {
                  const active = isActive(route, item.href);
                  return (
                    <a
                      key={item.href}
                      href={`#${item.href}`}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-xl px-3 py-2.5 transition-colors",
                        active ? "bg-blue-50" : "hover:bg-slate-50"
                      )}
                    >
                      <span
                        className={cn(
                          "block text-sm font-medium",
                          active ? "text-blue-700" : "text-slate-900"
                        )}
                      >
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">{item.description}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="border-t border-slate-200 px-6 py-5">
          <a
            href={`#${ROUTES.contact}`}
            onClick={() => setOpen(false)}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <CalendarClock className="h-4 w-4" aria-hidden="true" />
            Let&apos;s Build — Book a Call
          </a>
          <p className="mt-3 text-center text-xs text-slate-400">{SITE.replyTime}</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function Header({ route }: { route: string }) {
  return (
    <>
      <TopBanner />
      <div className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
        <PageShell className="flex h-16 items-center justify-between gap-4">
          <a href="#/" aria-label="Kramora AI — home" className="shrink-0">
            <KramoraLogo />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV_GROUPS.map((group) => (
              <NavDropdown key={group.label} label={group.label} items={group.children} route={route} />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`#${ROUTES.contact}`}
              className="hidden h-11 items-center gap-2 rounded-full bg-blue-600 px-5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md sm:inline-flex"
            >
              Let&apos;s Build
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <MobileNav route={route} />
          </div>
        </PageShell>
      </div>
    </>
  );
}
