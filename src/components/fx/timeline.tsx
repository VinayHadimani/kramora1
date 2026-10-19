'use client'

/**
 * Timeline — vertical process timeline on a strictly light palette.
 *
 * A 2px blue gradient line (blue-500 → blue-600 → blue-200) runs down the
 * left gutter and draws itself progressively with scroll (useScroll +
 * useSpring, scaleY origin-top). Each step is a white rounded-2xl card with
 * a 14px blue-600 node dot (white ring + blue-100 halo) on the line, a large
 * slate-200 numeral watermark behind the title, and optional meta chips
 * (`duration` → blue-50 chip, `tag` → slate outline chip). Steps reveal on
 * scroll with a fade + 24px rise (once).
 *
 * Layout: mobile — line at left-4, cards full width; sm+ — line at left-6
 * with a wider gutter.
 *
 * Usage:
 *   <Timeline steps={PROCESS_STEPS} />
 *
 * @packageDocumentation
 */

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface TimelineStep {
  title: string
  description: string
  duration?: string
  tag?: string
}

export interface TimelineProps {
  steps: TimelineStep[]
  className?: string
}

const REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function Timeline({ steps, className }: TimelineProps) {
  const prefersReducedMotion = useReducedMotion()
  const rootRef = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ['start 80%', 'end 55%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })

  if (steps.length === 0) return null

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      {/* Faint full track */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-[15px] top-2 w-0.5 rounded-full bg-blue-100/70 sm:left-[23px]"
      />

      {/* Progressively drawn blue gradient line */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-8 left-[15px] top-2 w-0.5 origin-top rounded-full bg-gradient-to-b from-blue-500 via-blue-600 to-blue-200 sm:left-[23px]"
        style={prefersReducedMotion ? undefined : { scaleY }}
      />

      <ol className="space-y-8 sm:space-y-10">
        {steps.map((step, i) => (
          <li key={`${step.title}-${i}`} className="relative pl-10 sm:pl-16">
            {/* Node: 14px blue-600 dot, white ring, blue-100 halo */}
            <motion.span
              aria-hidden="true"
              className="absolute left-0.5 top-6 flex h-7 w-7 items-center justify-center sm:left-2.5"
              initial={prefersReducedMotion ? false : { scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.12 }}
            >
              <span className="absolute inset-0 rounded-full bg-blue-100" />
              <span className="relative h-3.5 w-3.5 rounded-full border-2 border-white bg-blue-600" />
            </motion.span>

            <motion.article
              className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-48px' }}
              transition={{ duration: 0.6, ease: REVEAL_EASE }}
            >
              {/* Step number watermark */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-2 left-4 select-none text-[64px] font-bold leading-none text-slate-200"
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {(step.duration || step.tag) && (
                <div className="relative z-10 flex flex-wrap items-center gap-2">
                  {step.duration ? (
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                      {step.duration}
                    </span>
                  ) : null}
                  {step.tag ? (
                    <span className="rounded-full border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-500">
                      {step.tag}
                    </span>
                  ) : null}
                </div>
              )}

              <h3 className="relative z-10 mt-3 text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
                {step.title}
              </h3>
              <p className="relative z-10 mt-2 text-sm leading-relaxed text-slate-500 sm:text-base">
                {step.description}
              </p>
            </motion.article>
          </li>
        ))}
      </ol>
    </div>
  )
}
