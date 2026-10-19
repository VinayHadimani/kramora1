'use client'

/**
 * AuroraBars — decorative animated background layer for light-mode sections.
 *
 * Renders 6 soft aurora "bars" (blurred rounded gradients in blue-100 / blue-50 /
 * slate-100 tints) that drift and undulate on 18–30s mirrored loops, plus a
 * faint 24px slate dot grid on top. Extremely subtle — designed to sit BEHIND
 * white stat blocks and cards.
 *
 * Mobile budget: the bar COUNT is reduced (6 → 4) below 640px via a
 * useMediaQuery hook — the two full-bleed horizontal bars are the priciest
 * (large blurred surfaces) and are dropped on phones, keeping the effect
 * fully live at a fraction of the CPU.
 *
 * IMPORTANT: the parent element must be `relative` (this layer is
 * `absolute inset-0 pointer-events-none overflow-hidden`).
 *
 * Usage:
 *   <section className="relative ...">
 *     <AuroraBars intensity={1} />
 *     <div className="relative">...content...</div>
 *   </section>
 *
 * @packageDocumentation
 */

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/hooks/use-media-query'

export interface AuroraBarsProps {
  className?: string
  /** 0–1.5. Scales the opacity of the aurora bars. 0 renders nothing. */
  intensity?: number
}

interface BarSpec {
  /** Position + size classes. */
  box: string
  /** Tailwind gradient classes (strictly light tints). */
  gradient: string
  /** Transform keyframes — transform-only for 60fps. */
  keyframes: { x?: number[]; y?: number[]; scaleX?: number[]; scaleY?: number[] }
  /** Loop duration in seconds. */
  duration: number
  /** Negative delay so bars start desynchronized. */
  delay: number
  /** Base opacity (multiplied by intensity). */
  baseOpacity: number
}

const BARS: BarSpec[] = [
  {
    box: 'left-[5%] top-[-26%] h-[152%] w-44',
    gradient: 'bg-gradient-to-b from-blue-100 via-blue-50 to-transparent',
    keyframes: { x: [0, 42, 0], scaleY: [1, 1.14, 1] },
    duration: 26,
    delay: -3.2,
    baseOpacity: 0.7,
  },
  {
    box: 'left-[27%] top-[-18%] h-[136%] w-36',
    gradient: 'bg-gradient-to-b from-slate-100 via-slate-50 to-transparent',
    keyframes: { x: [0, -34, 0], y: [0, 22, 0] },
    duration: 22,
    delay: -8.1,
    baseOpacity: 0.55,
  },
  {
    box: 'left-[52%] top-[-22%] h-[144%] w-40',
    gradient: 'bg-gradient-to-b from-blue-100/80 via-blue-50/60 to-transparent',
    keyframes: { x: [0, 30, 0], y: [0, -24, 0] },
    duration: 29,
    delay: -14.6,
    baseOpacity: 0.6,
  },
  {
    box: 'left-[76%] top-[-28%] h-[156%] w-48',
    gradient: 'bg-gradient-to-b from-blue-50 via-blue-100/70 to-transparent',
    keyframes: { x: [0, -40, 0], scaleY: [1, 1.12, 1] },
    duration: 24,
    delay: -5.5,
    baseOpacity: 0.65,
  },
  {
    box: 'left-[-12%] top-[12%] h-36 w-[124%]',
    gradient: 'bg-gradient-to-r from-blue-100 via-blue-50/50 to-transparent',
    keyframes: { y: [0, 22, 0], x: [0, 26, 0] },
    duration: 21,
    delay: -11.4,
    baseOpacity: 0.5,
  },
  {
    box: 'left-[-8%] top-[64%] h-44 w-[116%]',
    gradient: 'bg-gradient-to-r from-slate-100 via-blue-50 to-transparent',
    keyframes: { y: [0, -20, 0], x: [0, 24, 0] },
    duration: 28,
    delay: -18.9,
    baseOpacity: 0.5,
  },
]

const DOT_GRID_MASK =
  'radial-gradient(ellipse 85% 75% at 50% 42%, black 35%, transparent 78%)'

export function AuroraBars({ className, intensity = 1 }: AuroraBarsProps) {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 639px)')
  const level = Math.max(0, Math.min(1.5, intensity))

  if (level <= 0) return null

  // Mobile CPU budget: drop the two full-bleed horizontal bars, keep the
  // four vertical drifters (the signature look survives untouched).
  const bars = isMobile ? BARS.slice(0, 4) : BARS

  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {bars.map((bar, i) => (
        <motion.div
          key={`bar-${i}`}
          className={cn('absolute rounded-full blur-3xl will-change-transform', bar.box, bar.gradient)}
          style={{ opacity: bar.baseOpacity * level }}
          animate={prefersReducedMotion ? undefined : bar.keyframes}
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: bar.duration,
                  delay: bar.delay,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                }
          }
        />
      ))}

      {/* Faint dot grid (slate-900 at 3% alpha, 24px pitch), softly masked at the edges. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(15, 23, 42, 0.03) 1px, transparent 1.4px)',
          backgroundSize: '24px 24px',
          maskImage: DOT_GRID_MASK,
          WebkitMaskImage: DOT_GRID_MASK,
        }}
      />
    </div>
  )
}
