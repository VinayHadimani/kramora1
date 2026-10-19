'use client'

import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { VantaLightBackground } from '@/components/fx/vanta-light-background'
import { Eyebrow, LinkButton, PageShell } from '@/components/site/blocks'
import { ROUTES } from '@/components/site/nav'

function QuickLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex min-h-[44px] items-center rounded-md px-2 text-sm font-medium text-slate-500 underline-offset-4 transition-colors hover:text-blue-700 hover:underline"
    >
      {children}
    </a>
  )
}

export function NotFoundPage() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="relative flex min-h-[60vh] items-center overflow-hidden"
    >
      {/* Drifting constellation network behind "Signal lost" — Vanta NET in
          strict light mode (white bg, brand-blue nodes). */}
      <VantaLightBackground variant="net" />
      <PageShell className="relative py-20 sm:py-28">
        <div className="flex flex-col items-center text-center">
          <p
            aria-hidden="true"
            className="text-gradient-blue select-none text-[7rem] font-semibold leading-none tracking-tighter sm:text-[10rem]"
          >
            404
          </p>
          <div className="mt-6">
            <Eyebrow>Signal lost</Eyebrow>
          </div>
          <h1
            id="not-found-heading"
            className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            This page drifted off the grid.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
            The route you requested isn&apos;t one of our 18 pages — but our uptime and our models never drift.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <LinkButton href="#/" size="lg">
              <Home className="h-4 w-4" aria-hidden="true" />
              Back to home
            </LinkButton>
            <LinkButton href={`#${ROUTES.services}`} variant="outline" size="lg">
              Explore services
            </LinkButton>
          </div>
          <nav aria-label="Quick links" className="mt-12">
            <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm">
              <li>
                <QuickLink href={`#${ROUTES.process}`}>Process</QuickLink>
              </li>
              <li aria-hidden="true" className="text-slate-300">
                ·
              </li>
              <li>
                <QuickLink href={`#${ROUTES.caseStudies}`}>Case Studies</QuickLink>
              </li>
              <li aria-hidden="true" className="text-slate-300">
                ·
              </li>
              <li>
                <QuickLink href={`#${ROUTES.insights}`}>Insights</QuickLink>
              </li>
              <li aria-hidden="true" className="text-slate-300">
                ·
              </li>
              <li>
                <QuickLink href={`#${ROUTES.contact}`}>Contact</QuickLink>
              </li>
            </ul>
          </nav>
        </div>
      </PageShell>
    </section>
  )
}
