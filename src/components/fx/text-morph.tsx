'use client'

/**
 * TextMorph — cycles through a list of words with a per-letter blur/fade morph.
 * Outgoing letters drift up and blur out while incoming letters rise from below
 * (staggered ~25ms per letter). The container is sized by the widest word
 * (grid-stack technique) so surrounding layout never shifts.
 *
 * Usage:
 *   <h1>We build <TextMorph words={['Intelligent Products', 'Data Platforms', 'Autonomous Systems']} /> that scale.</h1>
 *
 * Reduced motion: words cross-fade without per-letter movement.
 *
 * @packageDocumentation
 */

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface TextMorphProps {
  /** Words to cycle through. */
  words: string[]
  /** Time each word stays on screen, in ms (clamped to a 600ms minimum). */
  interval?: number
  className?: string
}

const ENTER_STAGGER = 0.025
const EXIT_STAGGER = 0.018

const containerVariants: Variants = {
  enter: { transition: { staggerChildren: ENTER_STAGGER, delayChildren: 0.04 } },
  exit: { transition: { staggerChildren: EXIT_STAGGER, staggerDirection: -1 } },
}

const letterVariants: Variants = {
  enter: { opacity: 0, y: 18, filter: 'blur(6px)' },
  center: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.21, 0.68, 0.19, 1] },
  },
  exit: {
    opacity: 0,
    y: -16,
    filter: 'blur(5px)',
    transition: { duration: 0.34, ease: [0.5, 0, 0.75, 0.2] },
  },
}

export function TextMorph({ words, interval = 2600, className }: TextMorphProps) {
  const prefersReducedMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [barWidth, setBarWidth] = useState(0)
  const wordRef = useRef<HTMLSpanElement | null>(null)

  const safeWords = words.length > 0 ? words : ['']
  const count = safeWords.length
  const word = safeWords[Math.min(index, count - 1)] ?? ''

  useEffect(() => {
    if (count <= 1 || interval <= 0) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count)
    }, Math.max(600, interval))
    return () => window.clearInterval(id)
  }, [count, interval])

  // Measure the live word so the underline bar tracks its exact width.
  useLayoutEffect(() => {
    const el = wordRef.current
    if (el) setBarWidth(Math.ceil(el.getBoundingClientRect().width))
  }, [index, word])

  return (
    <span className={cn('relative inline-grid font-semibold tracking-tight text-slate-900', className)}>
      {/* Invisible sizers stacked in the same grid cell keep the box at the widest word — no layout shift. */}
      {safeWords.map((w, i) => (
        <span key={`sizer-${i}`} aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {w}
        </span>
      ))}

      {/* Screen-reader friendly current word (no live region — cycling every few seconds would be noisy). */}
      <span className="sr-only">{word}</span>

      <AnimatePresence initial={false}>
        <motion.span
          key={index}
          ref={wordRef}
          aria-hidden="true"
          className="col-start-1 row-start-1 justify-self-start whitespace-nowrap"
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial={prefersReducedMotion ? { opacity: 0 } : 'enter'}
          animate={prefersReducedMotion ? { opacity: 1 } : 'center'}
          exit={prefersReducedMotion ? { opacity: 0 } : 'exit'}
          transition={prefersReducedMotion ? { duration: 0.25 } : undefined}
        >
          {prefersReducedMotion
            ? word
            : Array.from(word).map((char, i) => (
                <motion.span
                  key={`ch-${i}`}
                  variants={letterVariants}
                  className="inline-block whitespace-pre will-change-transform"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
        </motion.span>
      </AnimatePresence>

      {/* Blue accent underline that follows the current word width. */}
      <motion.span
        aria-hidden="true"
        className="absolute -bottom-1.5 left-0 h-[3px] rounded-full bg-blue-600"
        animate={prefersReducedMotion ? undefined : { width: barWidth }}
        transition={prefersReducedMotion ? undefined : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={prefersReducedMotion ? { width: barWidth } : undefined}
      />
    </span>
  )
}
