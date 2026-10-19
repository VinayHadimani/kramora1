'use client'

/**
 * CaseStudyFlipStack — a deck of layered case-study cards.
 *
 * The top card (white, rounded-3xl, generous padding) shows the industry
 * eyebrow chip, title, summary, the hero metric (large blue-600 number) and
 * up to 3 secondary metrics separated by `border-l border-slate-200`. Card
 * aspect ratio is responsive: `aspect-[3/4]` on phones (fits the screen
 * height) and `aspect-[16/9]` from `sm:` up — with min-height floors as a
 * safety net. Mobile compaction: summary clamps to 4 lines and the third
 * secondary metric defers to ≥sm (so the card fits 375px screens cleanly).
 * Up to two cards peek out behind (translated up, scaled, rotated ±2.4°, blue-50 /
 * slate-50 faces). Advancing — "Next" button, clicking the stack (or focusing
 * it and pressing Enter/Space), or auto-advance every 6s (paused on hover, paused while a card is mid-flight,
 * timer resets on manual navigation) — flips the front card off (x + rotate +
 * rotateY + fade, AnimatePresence) while the next card springs forward and
 * the flown card re-enters at the back of the deck (circular).
 *
 * A subtle blue-600 progress bar at the bottom of the card fills during
 * auto-advance (rAF-accumulated, pausable/resumable); a mono "1 / 4" counter
 * and pill "Next case study" button sit below the stack.
 *
 * Reduced motion: instant swaps, no auto-advance, no progress bar.
 *
 * Usage:
 *   <CaseStudyFlipStack items={CASE_STUDIES} />
 *
 * @packageDocumentation
 */

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CaseStudyMetric {
  value: string
  label: string
}

export interface CaseStudyItem {
  industry: string
  title: string
  summary: string
  metric: string
  metricLabel: string
  metrics?: CaseStudyMetric[]
}

export interface CaseStudyFlipStackProps {
  items: CaseStudyItem[]
  className?: string
}

const AUTO_ADVANCE_MS = 6000
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const EXIT_EASE: [number, number, number, number] = [0.3, 0, 0.4, 1]

interface StackPosition {
  y: number
  scale: number
  rotate: number
  zIndex: number
}

/** Positions for the peeking cards behind the front card (index 0 = front, in flow). */
const STACK: StackPosition[] = [
  { y: 0, scale: 1, rotate: 0, zIndex: 30 },
  { y: -14, scale: 0.955, rotate: 2.4, zIndex: 20 },
  { y: -26, scale: 0.91, rotate: -2.2, zIndex: 10 },
]

function CaseStudyFace({ item }: { item: CaseStudyItem }) {
  const extra = (item.metrics ?? []).slice(0, 3)
  return (
    <div className="flex h-full flex-col">
      <span className="inline-flex w-fit items-center rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700">
        {item.industry}
      </span>
      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{item.title}</h3>
      <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-slate-600 sm:line-clamp-none sm:text-base">{item.summary}</p>

      <div className="mt-auto flex flex-wrap items-end gap-x-10 gap-y-5 pt-6 sm:gap-y-6 sm:pt-8">
        <div>
          <span className="block text-4xl font-semibold tracking-tight text-blue-600 sm:text-5xl">
            {item.metric}
          </span>
          <span className="mt-1 block text-sm text-slate-500">{item.metricLabel}</span>
        </div>
        {extra.map((m, i) => (
          <div
            key={`${m.value}-${m.label}`}
            className={cn('border-l border-slate-200 pl-4 sm:pl-6', i >= 2 && 'hidden sm:block')}
          >
            <span className="block text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">{m.value}</span>
            <span className="mt-1 block text-xs text-slate-500 sm:text-sm">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CaseStudyFlipStack({ items, className }: CaseStudyFlipStackProps) {
  const prefersReducedMotion = useReducedMotion()
  const count = items.length

  const [order, setOrder] = useState<number[]>(() => items.map((_, i) => i))
  const [exiting, setExiting] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)

  const elapsedRef = useRef(0)
  const barRef = useRef<HTMLDivElement | null>(null)
  const orderRef = useRef(order)
  const exitingRef = useRef(exiting)

  // Mirror the latest state into refs (read by the advance callback + rAF loop).
  useEffect(() => {
    orderRef.current = order
  }, [order])
  useEffect(() => {
    exitingRef.current = exiting
  }, [exiting])

  const advance = useCallback(() => {
    if (count < 2 || exitingRef.current !== null) return
    elapsedRef.current = 0
    if (barRef.current) barRef.current.style.width = '0%'
    const front = orderRef.current[0]
    if (front === undefined) return
    setExiting(front)
    setOrder((prev) => [...prev.slice(1), prev[0] ?? 0])
  }, [count])

  // Auto-advance loop — rAF-accumulated so it can pause/resume mid-cycle
  // (drives the progress bar directly via refs; no per-frame React renders).
  const autoAdvanceEnabled = !prefersReducedMotion && !paused && exiting === null && count > 1

  useEffect(() => {
    if (!autoAdvanceEnabled) return
    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100)
      last = now
      elapsedRef.current += dt
      const progress = Math.min(1, elapsedRef.current / AUTO_ADVANCE_MS)
      if (barRef.current) barRef.current.style.width = `${(progress * 100).toFixed(2)}%`
      if (elapsedRef.current >= AUTO_ADVANCE_MS) {
        advance()
        return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [autoAdvanceEnabled, advance])

  if (count === 0) return null

  const frontIndex = order[0] ?? 0
  const behind = order.slice(1, 3)

  // Clicking the stack (or focusing it and pressing Enter/Space) advances —
  // unless the user is selecting text inside the card.
  const handleStackActivate = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().length > 0) return
    advance()
  }

  const handleStackKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleStackActivate()
    }
  }

  return (
    <div
      className={cn('relative', className)}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div
        className="relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50 focus-visible:ring-offset-4 rounded-3xl"
        role="button"
        tabIndex={0}
        aria-label="Advance to the next case study"
        onClick={handleStackActivate}
        onKeyDown={handleStackKeyDown}
      >
        {/* Peek cards behind */}
        {behind.map((itemIndex, position) => {
          const pos = STACK[position + 1] ?? STACK[2]!
          const face = position === 0 ? 'border-blue-100 bg-blue-50' : 'border-slate-200 bg-slate-50'
          const item = items[itemIndex]
          return (
            <motion.div
              key={`behind-${itemIndex}`}
              className={cn('absolute inset-0 rounded-3xl border', face)}
              style={{ zIndex: pos.zIndex }}
              initial={{ y: -34, scale: 0.88, rotate: -3, opacity: 0 }}
              animate={{ y: pos.y, scale: pos.scale, rotate: pos.rotate, opacity: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: EASE }}
            >
              {item ? (
                <span className="absolute left-7 top-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-700/70">
                  {item.industry}
                </span>
              ) : null}
            </motion.div>
          )
        })}

        {/* Front card flying off */}
        <AnimatePresence onExitComplete={() => setExiting(null)}>
          {exiting !== null && items[exiting] ? (
            <motion.article
              key={`exit-${exiting}`}
              initial={false}
              exit={{
                x: 360,
                y: -28,
                rotate: 10,
                rotateY: 26,
                opacity: 0,
                transition: { duration: prefersReducedMotion ? 0 : 0.55, ease: EXIT_EASE },
              }}
              className="absolute inset-0 z-40 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)] sm:p-9"
              style={{ transformPerspective: 1000 }}
            >
              <CaseStudyFace item={items[exiting]} />
            </motion.article>
          ) : null}
        </AnimatePresence>

        {/* Front card */}
        {items[frontIndex] ? (
          <motion.article
            key={`front-${frontIndex}`}
            className="relative z-30 aspect-[3/4] min-h-[400px] overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)] sm:aspect-[16/9] sm:min-h-[420px] sm:p-9"
            initial={{ y: -14, scale: 0.955, rotate: 2.4 }}
            animate={{ y: 0, scale: 1, rotate: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: EASE }}
          >
            <CaseStudyFace item={items[frontIndex]} />
            {!prefersReducedMotion && count > 1 && (
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-blue-100/70">
                <div ref={barRef} className="h-full bg-blue-600" style={{ width: '0%' }} />
              </div>
            )}
          </motion.article>
        ) : null}
      </div>

      {count > 1 && (
        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="font-mono text-sm text-slate-400" aria-label={`Case study ${frontIndex + 1} of ${count}`}>
            {frontIndex + 1} / {count}
          </span>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              advance()
            }}
            disabled={exiting !== null}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-blue-600 px-6 text-sm font-semibold text-white transition-all hover:bg-blue-700 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50 focus-visible:ring-offset-2 disabled:opacity-60"
          >
            Next case study
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}
