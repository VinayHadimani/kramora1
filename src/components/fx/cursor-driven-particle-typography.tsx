'use client'

/**
 * CursorDrivenParticleTypography — canvas typography made of particles.
 *
 * The text (e.g. "LET'S BUILD") is rasterized offscreen (900-weight Geist,
 * responsive size clamped to fit one or two lines) and sampled on a ~6px
 * grid; every opaque sample becomes a particle target. Particles are small
 * circles in `particleColor` with opacity variance (0.5–0.9) and ±15% size
 * variance. Per frame: spring toward target (k ≈ 0.033, damping 0.875) +
 * cursor repulsion within ~110px (force falls off linearly) + tiny drift
 * noise. On pointer leave they re-form.
 *
 * Engineering notes:
 * - DPR-aware canvas (capped at 2), transparent background (parent is white).
 * - Pointer events on the canvas itself; `touch-action: pan-y` keeps page
 *   scroll working on mobile while horizontal drags scatter particles.
 * - ResizeObserver re-samples layout, debounced 150ms, RETARGETING existing
 *   particles (they morph into the new layout) — also re-samples once Geist
 *   finishes loading (document.fonts.ready).
 * - Rendering is batched: one Path2D-style beginPath/fill per alpha bucket
 *   (10 buckets) — comfortably 60fps for a few thousand particles. The canvas
 *   font stack is resolved from the live `--font-geist-sans` CSS variable so
 *   particles sample the REAL Geist glyphs (next/font uses obfuscated family
 *   names that a literal "Geist" string cannot match).
 * - An IntersectionObserver suspends physics + painting off-screen.
 * - Reduced motion: static dotted text rendered once (no rAF loop).
 * - Full cleanup: rAF, observers, listeners, timers.
 *
 * The PARENT sets the height (e.g. `h-[320px] sm:h-[420px]` — pass it via
 * `className` or a sized parent). Fallback min-height: 220px.
 *
 * Usage:
 *   <CursorDrivenParticleTypography text="LET'S BUILD" className="h-[320px] sm:h-[420px]" />
 *
 * @packageDocumentation
 */

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

export interface CursorDrivenParticleTypographyProps {
  text: string
  className?: string
  particleColor?: string
  particleSize?: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  tx: number
  ty: number
  size: number
  alpha: number
  drift: number
  driftSpeed: number
}

const TAU = Math.PI * 2
const SPRING = 0.033
const DAMPING = 0.875
const REPEL_RADIUS = 110
const REPEL_FORCE = 1.7
const MAX_PARTICLES = 3600

export function CursorDrivenParticleTypography({
  text,
  className,
  particleColor = '#2563EB',
  particleSize = 2.2,
}: CursorDrivenParticleTypographyProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas || text.length === 0) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let particles: Particle[] = []
    let width = 0
    let height = 0
    let frame = 0
    let onScreen = true
    let disposed = false
    let resizeTimer = 0
    const pointer = { x: 0, y: 0, active: false }

    /** Resolve the real Geist family for canvas text (next/font exposes it via a CSS variable with an obfuscated name, so a literal "Geist" string would silently fall back to Arial). */
    const resolveFontStack = (): string => {
      try {
        const family = getComputedStyle(document.body).getPropertyValue('--font-geist-sans').trim()
        if (family.length > 0) return `${family}, Arial, sans-serif`
      } catch {
        /* computed style unavailable — use the generic fallback below */
      }
      return 'Geist, Arial, sans-serif'
    }

    /** Re-sample the text layout (DPR-aware) and retarget particles. */
    const sample = () => {
      const rect = root.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const offscreen = document.createElement('canvas')
      offscreen.width = width
      offscreen.height = height
      const octx = offscreen.getContext('2d', { willReadFrequently: true })
      if (!octx) return

      // Split into (at most) two balanced lines for long text.
      const words = text.split(' ')
      let lines: string[] = [text]
      if (words.length > 1 && text.length > 12) {
        let split = 1
        let bestDiff = Number.POSITIVE_INFINITY
        for (let i = 1; i < words.length; i++) {
          const left = words.slice(0, i).join(' ').length
          const right = words.slice(i).join(' ').length
          const diff = Math.abs(left - right)
          if (diff < bestDiff) {
            bestDiff = diff
            split = i
          }
        }
        lines = [words.slice(0, split).join(' '), words.slice(split).join(' ')]
      }

      const longest = lines.reduce((max, line) => Math.max(max, line.length), 0)
      const fontSize = Math.max(
        16,
        Math.min(width / (longest * 0.62), 120, height / (lines.length * 1.35)),
      )
      octx.font = `900 ${Math.floor(fontSize)}px ${resolveFontStack()}`
      octx.textAlign = 'center'
      octx.textBaseline = 'middle'
      octx.fillStyle = '#000000'
      const lineHeight = fontSize * 1.12
      lines.forEach((line, i) => {
        const y = height / 2 + (i - (lines.length - 1) / 2) * lineHeight
        octx.fillText(line, width / 2, y)
      })

      const data = octx.getImageData(0, 0, width, height).data

      // Sample on a ~6px grid; widen the step if there are too many particles.
      let step = 6
      let targets: Array<{ x: number; y: number }> = []
      for (;;) {
        targets = []
        for (let y = 0; y < height; y += step) {
          for (let x = 0; x < width; x += step) {
            if (data[(y * width + x) * 4 + 3] > 128) targets.push({ x, y })
          }
        }
        if (targets.length <= MAX_PARTICLES || step >= 14) break
        step += 1
      }

      // Retarget existing particles (morph into the new layout), spawn the rest.
      const next: Particle[] = []
      for (let i = 0; i < targets.length; i++) {
        const target = targets[i]!
        const existing = particles[i]
        if (existing) {
          existing.tx = target.x
          existing.ty = target.y
          next.push(existing)
          continue
        }
        next.push({
          x: width / 2 + (Math.random() - 0.5) * width * 0.6,
          y: height / 2 + (Math.random() - 0.5) * height * 0.7,
          vx: 0,
          vy: 0,
          tx: target.x,
          ty: target.y,
          size: particleSize * (0.85 + Math.random() * 0.3),
          alpha: 0.5 + Math.random() * 0.4,
          drift: Math.random() * TAU,
          driftSpeed: 0.004 + Math.random() * 0.01,
        })
      }
      particles = next
    }

    /** Draw particles, bucketed by alpha (one fill call per bucket). */
    const render = (staticPositions: boolean) => {
      ctx.clearRect(0, 0, width, height)
      const groups: Particle[][] = []
      for (let i = 0; i < 10; i++) groups.push([])
      for (const p of particles) {
        const bucket = Math.min(9, Math.max(1, Math.round(p.alpha * 10)))
        const list = groups[bucket]
        if (list) list.push(p)
      }
      ctx.fillStyle = particleColor
      for (let bucket = 1; bucket < groups.length; bucket++) {
        const list = groups[bucket]
        if (!list || list.length === 0) continue
        ctx.globalAlpha = bucket / 10
        ctx.beginPath()
        for (const p of list) {
          const x = staticPositions ? p.tx : p.x
          const y = staticPositions ? p.ty : p.y
          ctx.moveTo(x + p.size, y)
          ctx.arc(x, y, p.size, 0, TAU)
        }
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const tick = () => {
      if (onScreen && particles.length > 0) {
        for (const p of particles) {
          // Spring toward target.
          p.vx += (p.tx - p.x) * SPRING
          p.vy += (p.ty - p.y) * SPRING
          // Cursor repulsion (falls off linearly inside the radius).
          if (pointer.active) {
            const dx = p.x - pointer.x
            const dy = p.y - pointer.y
            const distSq = dx * dx + dy * dy
            if (distSq < REPEL_RADIUS * REPEL_RADIUS && distSq > 1) {
              const dist = Math.sqrt(distSq)
              const force = (1 - dist / REPEL_RADIUS) * REPEL_FORCE
              p.vx += (dx / dist) * force
              p.vy += (dy / dist) * force
            }
          }
          // Tiny drift noise.
          p.drift += p.driftSpeed
          p.vx += Math.cos(p.drift) * 0.013
          p.vy += Math.sin(p.drift * 0.83) * 0.013
          p.vx *= DAMPING
          p.vy *= DAMPING
          p.x += p.vx
          p.y += p.vy
        }
        render(false)
      }
      frame = requestAnimationFrame(tick)
    }

    const setPointerFromEvent = (event: PointerEvent) => {
      pointer.x = event.offsetX
      pointer.y = event.offsetY
      pointer.active = true
    }
    const clearPointer = () => {
      pointer.active = false
    }

    const resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        if (disposed) return
        sample()
        if (reducedQuery.matches) render(true)
      }, 150)
    })
    resizeObserver.observe(root)

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? true
      },
      { threshold: 0 },
    )
    intersectionObserver.observe(canvas)

    const onReducedChange = () => {
      if (reducedQuery.matches) {
        cancelAnimationFrame(frame)
        frame = 0
        render(true)
      } else if (frame === 0) {
        frame = requestAnimationFrame(tick)
      }
    }

    canvas.addEventListener('pointermove', setPointerFromEvent)
    canvas.addEventListener('pointerdown', setPointerFromEvent)
    canvas.addEventListener('pointerleave', clearPointer)
    canvas.addEventListener('pointercancel', clearPointer)
    window.addEventListener('blur', clearPointer)
    reducedQuery.addEventListener('change', onReducedChange)

    // Re-sample once the real font is available (metrics change).
    if (document.fonts) {
      document.fonts.ready
        .then(() => {
          if (disposed) return
          sample()
          if (reducedQuery.matches) render(true)
        })
        .catch(() => {
          /* ignore font loading failures — fallback font metrics are fine */
        })
    }

    sample()
    if (reducedQuery.matches) {
      render(true)
    } else {
      frame = requestAnimationFrame(tick)
    }

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      window.clearTimeout(resizeTimer)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      canvas.removeEventListener('pointermove', setPointerFromEvent)
      canvas.removeEventListener('pointerdown', setPointerFromEvent)
      canvas.removeEventListener('pointerleave', clearPointer)
      canvas.removeEventListener('pointercancel', clearPointer)
      window.removeEventListener('blur', clearPointer)
      reducedQuery.removeEventListener('change', onReducedChange)
    }
  }, [text, particleColor, particleSize])

  return (
    <div ref={rootRef} className={cn('relative h-full min-h-[220px] w-full', className)}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={text.length > 0 ? text : 'Particle typography'}
        className="absolute inset-0 block h-full w-full"
        style={{ touchAction: 'pan-y' }}
      />
    </div>
  )
}
