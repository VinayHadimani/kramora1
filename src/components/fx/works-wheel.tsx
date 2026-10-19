'use client'

/**
 * WorksWheel — interactive rotating showcase for 5–8 articles.
 *
 * The 3D wheel runs at EVERY breakpoint — nothing is hidden or downgraded on
 * mobile. Cards sit on a virtual cylinder (real `rotateY` + `translateZ`
 * geometry, `transform-style: preserve-3d`, 950px perspective on phones /
 * 1300px on larger screens). The front card is elevated with a blue-600
 * border accent; neighbors recede (scale ~0.86 after perspective, opacity
 * 0.5, slight blur); next-ring cards fade to ghosts.
 *
 * Touch & pointer controls (mobile-first):
 * - Drag/swipe anywhere on the wheel (framer-motion `drag="x"` handles mouse,
 *   pen and touch via pointer events — onTouchStart/Move/End equivalent).
 * - `touch-action: pan-y` on the drag surface: horizontal drags spin the
 *   wheel, vertical drags scroll the page natively — no accidental page
 *   scroll while spinning, no wheel hijack while scrolling.
 * - 44px prev/next chevrons, clickable side cards (real <button> overlays),
 *   progress dots (44px hit areas), auto-advance every 5s (paused while
 *   hovering/dragging).
 *
 * Responsive geometry: on <640px the wheel radius shrinks (300 → 205px), the
 * perspective tightens, and cards/cards-gaps re-size so the same 3D rotation
 * fits a phone screen legibly.
 *
 * Reduced motion: no auto-advance, instant (0s) position changes; drag still
 * works for user-initiated moves.
 *
 * Usage:
 *   <WorksWheel items={ARTICLES} />
 *
 * @packageDocumentation
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/hooks/use-media-query'

export interface WorksWheelItem {
  title: string
  category: string
  description: string
  tag?: string
}

export interface WorksWheelProps {
  items: WorksWheelItem[]
  className?: string
}

const AUTO_ADVANCE_MS = 5000
/** Degrees of wheel rotation between neighbouring cards. */
const STEP_DEG = 38
/** Virtual wheel radius in px — shrinks on phones for a tighter, legible ring. */
const RADIUS_DESKTOP = 300
const RADIUS_MOBILE = 205
const PERSPECTIVE_DESKTOP = 1300
const PERSPECTIVE_MOBILE = 950
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const DRAG_THRESHOLD = 70

/**
 * Wheel geometry: cards live on a cylinder whose axis sits behind the front
 * card — `translateZ(-R) rotateY(θ) translateZ(R)` puts the front card at
 * z=0 and neighbours at x = R·sinθ, z = R·(cosθ−1) (receding).
 */
function wheelTransform(offset: number, radius: number): string {
  const theta = offset * STEP_DEG
  const scale = 1 - Math.min(Math.abs(offset), 2) * 0.1
  return `translate(-50%, -50%) translateZ(${-radius}px) rotateY(${theta}deg) translateZ(${radius}px) scale(${scale})`
}

function WheelCard({ item, compact }: { item: WorksWheelItem; compact: boolean }) {
  return (
    <>
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">{item.category}</span>
      <h3 className="mt-2 line-clamp-2 text-xl font-semibold tracking-tight text-slate-900">{item.title}</h3>
      <p className={cn('mt-3 leading-relaxed text-slate-500', compact ? 'line-clamp-3 text-sm' : 'line-clamp-3 text-sm')}>
        {item.description}
      </p>
      <div className="mt-auto pt-5">
        {item.tag ? (
          <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
            {item.tag}
          </span>
        ) : null}
      </div>
    </>
  )
}

export function WorksWheel({ items, className }: WorksWheelProps) {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 639px)')
  const count = items.length
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const dragMovedRef = useRef(false)

  const goTo = useCallback((index: number) => {
    setActive(index)
  }, [])

  const next = useCallback(() => {
    setActive((a) => (a + 1) % count)
  }, [count])

  const prev = useCallback(() => {
    setActive((a) => (a - 1 + count) % count)
  }, [count])

  // Auto-advance (paused on hover/drag; timer resets after every navigation).
  useEffect(() => {
    if (paused || prefersReducedMotion || count < 2) return
    const timer = window.setTimeout(() => {
      setActive((a) => (a + 1) % count)
    }, AUTO_ADVANCE_MS)
    return () => window.clearTimeout(timer)
  }, [paused, prefersReducedMotion, count, active])

  if (count === 0) return null

  const radius = isMobile ? RADIUS_MOBILE : RADIUS_DESKTOP
  const perspective = isMobile ? PERSPECTIVE_MOBILE : PERSPECTIVE_DESKTOP

  const offsetOf = (i: number): number => {
    let off = ((i - active) % count + count) % count
    if (off > count / 2) off -= count
    return off
  }

  return (
    <div
      className={cn('relative', className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured work"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      {/* 3D wheel — every breakpoint (phones included) */}
      <div
        className="relative overflow-hidden"
        style={{ perspective: `${perspective}px`, height: isMobile ? 380 : 400 }}
      >
        <motion.div
          className="relative h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
          style={{ transformStyle: 'preserve-3d', touchAction: 'pan-y' }}
          drag={count > 1 ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          dragMomentum={false}
          dragSnapToOrigin
          onDragStart={() => {
            dragMovedRef.current = false
          }}
          onDrag={(_event, info) => {
            if (Math.abs(info.offset.x) > 10) dragMovedRef.current = true
          }}
          onDragEnd={(_event, info) => {
            const power = info.offset.x + info.velocity.x * 0.16
            if (power < -DRAG_THRESHOLD) next()
            else if (power > DRAG_THRESHOLD) prev()
          }}
        >
          {items.map((item, i) => {
            const off = offsetOf(i)
            const visible = Math.abs(off) <= 2
            return (
              <motion.article
                key={`${item.title}-${i}`}
                aria-hidden={!visible}
                className={cn(
                  'absolute left-1/2 top-1/2 flex flex-col rounded-2xl border bg-white text-left transition-[box-shadow,border-color,filter] duration-300',
                  isMobile ? 'h-[280px] w-[88%] p-5' : 'h-[310px] w-[min(24rem,86%)] p-6',
                  off === 0
                    ? 'border-blue-600 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_44px_rgba(15,23,42,0.10)]'
                    : 'border-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)]',
                  Math.abs(off) === 2 ? 'blur-[1.5px]' : '',
                  visible ? '' : 'pointer-events-none',
                )}
                style={{ zIndex: visible ? 30 - Math.abs(off) * 10 : 0, willChange: 'transform' }}
                animate={{
                  transform: wheelTransform(off, radius),
                  opacity: off === 0 ? 1 : Math.abs(off) === 1 ? 0.45 : visible ? 0.18 : 0,
                }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.65, ease: EASE }}
              >
                <WheelCard item={item} compact={isMobile} />
                {visible && off !== 0 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (!dragMovedRef.current) goTo(i)
                    }}
                    className="absolute inset-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60"
                    aria-label={`Show article: ${item.title}`}
                  />
                ) : null}
              </motion.article>
            )
          })}
        </motion.div>

        {/* Prev / next controls (44px targets, tactile active state) */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous article"
          className="absolute left-2 top-1/2 z-40 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:border-blue-600 hover:text-blue-600 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50 sm:left-3"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next article"
          className="absolute right-2 top-1/2 z-40 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:border-blue-600 hover:text-blue-600 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50 sm:right-3"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Progress dots — 44px hit areas with a small visual bar inside */}
      {count > 1 && (
        <div className="mt-4 flex items-center justify-center gap-1">
          {items.map((item, i) => (
            <button
              key={`dot-${item.title}-${i}`}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show article: ${item.title}`}
              aria-current={i === active}
              className="inline-flex h-11 w-7 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50"
            >
              <span
                className={cn(
                  'block h-2 rounded-full transition-all duration-300',
                  i === active ? 'w-5 bg-blue-600' : 'w-2 bg-slate-300',
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
