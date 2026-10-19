'use client'

/**
 * ScrollBasedVelocity — infinite horizontal marquee of client wordmarks whose
 * speed and direction react to scroll velocity (framer-motion useScroll +
 * useVelocity + useAnimationFrame). The list is duplicated 4× and x is wrapped
 * modulo one copy's width for a seamless loop. Wordmarks get a subtle skew
 * while flinging. Pauses on hover. Edge fade masks on both sides.
 *
 * Usage:
 *   <ScrollBasedVelocity items={['Northwind', 'Acme Corp', 'Helios', ...]} />
 *
 * Reduced motion: a static single row with the same masks (no marquee).
 *
 * @packageDocumentation
 */

import { Fragment, useEffect, useLayoutEffect, useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { cn } from '@/lib/utils'

export interface ScrollBasedVelocityProps {
  /** Client wordmarks to display. */
  items: string[]
  className?: string
}

/** Resting marquee speed in px/s. */
const BASE_VELOCITY = 45
/** Number of duplicated copies of the list (guarantees coverage on wide screens). */
const COPIES = 4
const EDGE_MASK = 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'

function wrapRange(min: number, max: number, value: number): number {
  const range = max - min
  if (range <= 0) return min
  return ((((value - min) % range) + range) % range) + min
}

export function ScrollBasedVelocity({ items, className }: ScrollBasedVelocityProps) {
  const prefersReducedMotion = useReducedMotion()

  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  // 0 → 4 as scroll velocity rises (negative when scrolling up, so direction flips).
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], { clamp: false })
  const skewX = useTransform(smoothVelocity, [-1200, 0, 1200], [-2.5, 0, 2.5])

  const copyRef = useRef<HTMLDivElement | null>(null)
  const halfWidthRef = useRef(0)
  const directionFactor = useRef(1)
  const pausedRef = useRef(false)
  const reducedRef = useRef(false)

  // Mirror the reduced-motion flag into a ref read inside useAnimationFrame.
  useEffect(() => {
    reducedRef.current = Boolean(prefersReducedMotion)
  }, [prefersReducedMotion])

  // Measure one copy of the list; keep it fresh on resize / font load.
  useLayoutEffect(() => {
    const copy = copyRef.current
    if (!copy) return
    const measure = () => {
      halfWidthRef.current = copy.offsetWidth
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(copy)
    return () => observer.disconnect()
  }, [items])

  useAnimationFrame((_, delta) => {
    if (pausedRef.current || reducedRef.current) return
    const half = halfWidthRef.current
    if (half <= 0) return
    const dt = Math.min(delta, 64) / 1000 // clamp delta (e.g. after tab switches)
    let moveBy = directionFactor.current * BASE_VELOCITY * dt
    const factor = velocityFactor.get()
    if (factor < 0) directionFactor.current = -1
    else if (factor > 0) directionFactor.current = 1
    moveBy += directionFactor.current * moveBy * factor
    baseX.set(wrapRange(-half, 0, baseX.get() + moveBy))
  })

  if (items.length === 0) return null

  const renderCopy = (copyIndex: number) => (
    <div key={copyIndex} ref={copyIndex === 0 ? copyRef : undefined} className="flex shrink-0 items-center gap-x-10">
      {items.map((item, i) => (
        <Fragment key={`${copyIndex}-${i}`}>
          <span className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 transition-colors duration-300 hover:text-slate-900">
            {item}
          </span>
          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-300" />
        </Fragment>
      ))}
    </div>
  )

  const srList = (
    <ul className="sr-only">
      {items.map((item, i) => (
        <li key={`sr-${i}`}>{item}</li>
      ))}
    </ul>
  )

  if (prefersReducedMotion) {
    return (
      <div
        className={cn('relative w-full overflow-hidden py-2', className)}
        style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
      >
        <div className="flex items-center gap-x-10 px-12">{renderCopy(0)}</div>
        {srList}
      </div>
    )
  }

  return (
    <div
      className={cn('relative w-full overflow-hidden py-2', className)}
      style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
      onPointerEnter={() => {
        pausedRef.current = true
      }}
      onPointerLeave={() => {
        pausedRef.current = false
      }}
    >
      <motion.div
        aria-hidden="true"
        className="flex w-max items-center gap-x-10 will-change-transform"
        style={{ x: baseX, skewX }}
      >
        {Array.from({ length: COPIES }, (_, copyIndex) => renderCopy(copyIndex))}
      </motion.div>
      {srList}
    </div>
  )
}
