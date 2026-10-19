'use client'

/**
 * CircuitBoard — an animated SVG "circuit board" centerpiece.
 *
 * The layout is generated DETERMINISTICALLY (mulberry32 PRNG with a fixed
 * seed) so SSR and client renders match and the board is stable across
 * reloads: 14 orthogonal/45° traces in blue-200/blue-300, minor + major nodes
 * (blue-400 / blue-600) with soft pulsing halos, via dots at bends, and 4
 * "signal" dots traveling along the trace paths via requestAnimationFrame +
 * SVGPathElement.getPointAtLength (paused while off-screen via
 * IntersectionObserver, fully cleaned up on unmount). Optional `labels`
 * (up to 8) are placed as tiny white chips near major nodes using
 * golden-angle distribution for a spread-out, non-overlapping arrangement.
 *
 * The SVG fills its container (`w-full h-full`, viewBox 800×520,
 * preserveAspectRatio="xMidYMid slice") — the PARENT provides a white
 * background and explicit sizing (e.g. `h-[420px]`).
 *
 * Usage:
 *   <div className="relative h-[420px] bg-white">
 *     <CircuitBoard labels={['AI & GenAI', 'Data Engineering', 'Cloud']} />
 *   </div>
 *
 * Reduced motion: static board (no pulsing, no traveling signals).
 *
 * @packageDocumentation
 */

import { useEffect, useMemo, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface CircuitBoardProps {
  className?: string
  /** Up to 8 labels rendered as tiny chips near major nodes. */
  labels?: string[]
}

const VIEW_W = 800
const VIEW_H = 520
const MARGIN = 46

interface Point {
  x: number
  y: number
}

interface TraceSpec {
  id: string
  d: string
  start: Point
  bends: Point[]
  /** blue-300 stroke instead of blue-200. */
  accent: boolean
  signal: boolean
  signalDuration: number
  signalBegin: number
}

interface NodeSpec {
  x: number
  y: number
  major: boolean
  pulseDelay: number
}

interface ChipSpec {
  label: string
  x: number
  y: number
  width: number
  node: Point
}

interface CircuitModel {
  traces: TraceSpec[]
  nodes: NodeSpec[]
}

/** Small deterministic PRNG so the layout is identical on server and client. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const clamp = (value: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, value))

/** 8 compass directions — orthogonal + 45° only. */
const DIRECTIONS: ReadonlyArray<readonly [number, number]> = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
]

function buildCircuit(): CircuitModel {
  const rand = mulberry32(0x4b52414d) // "KRAM"
  const traces: TraceSpec[] = []
  const nodes: NodeSpec[] = []

  for (let i = 0; i < 14; i++) {
    // Loose 5-column grid with jitter guarantees an even, organic spread.
    const col = i % 5
    const row = Math.floor(i / 5)
    let x = clamp(96 + col * 152 + (rand() - 0.5) * 64, MARGIN, VIEW_W - MARGIN)
    let y = clamp(112 + row * 148 + (rand() - 0.5) * 56, MARGIN, VIEW_H - MARGIN)

    const start: Point = { x: Math.round(x), y: Math.round(y) }
    const points: Point[] = [start]
    let dir = Math.floor(rand() * 8)
    const segments = 3 + Math.floor(rand() * 3)

    for (let s = 0; s < segments; s++) {
      const length = 48 + rand() * 104
      const [dx, dy] = DIRECTIONS[dir] ?? [1, 0]
      x = clamp(x + dx * length, MARGIN, VIEW_W - MARGIN)
      y = clamp(y + dy * length, MARGIN, VIEW_H - MARGIN)
      const point: Point = { x: Math.round(x), y: Math.round(y) }
      const last = points[points.length - 1]
      if (last && (point.x !== last.x || point.y !== last.y)) points.push(point)
      // Turn ±45° or ±90° but never reverse.
      const turn = (rand() < 0.5 ? -1 : 1) * (rand() < 0.65 ? 2 : 1)
      dir = (dir + turn + 8) % 8
    }

    const d = points.map((p, j) => `${j === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

    traces.push({
      id: `kfx-trace-${i}`,
      d,
      start: points[0] ?? start,
      bends: points.slice(1, -1),
      accent: i % 3 === 2,
      signal: i % 4 === 1, // traces 1, 5, 9, 13 → 4 traveling signals
      signalDuration: 4.5 + rand() * 4,
      signalBegin: rand() * 2,
    })

    const end = points[points.length - 1] ?? start
    nodes.push({ x: start.x, y: start.y, major: false, pulseDelay: (i * 0.41) % 2.6 })
    nodes.push({ x: end.x, y: end.y, major: i % 2 === 0, pulseDelay: (i * 0.53 + 0.7) % 2.6 })
  }

  return { traces, nodes }
}

/** Place label chips near major nodes, spread out via golden-angle targets. */
function buildChips(labels: string[], nodes: NodeSpec[]): ChipSpec[] {
  const limited = labels.filter((l) => l.trim().length > 0).slice(0, 8)
  if (limited.length === 0) return []

  const cx = VIEW_W / 2
  const cy = VIEW_H / 2
  const majors = nodes.filter((n) => n.major)
  if (majors.length === 0) return []

  // Deterministic iteration order for stable assignment.
  const sorted = [...majors].sort(
    (a, b) => Math.atan2(a.y - cy, a.x - cx) - Math.atan2(b.y - cy, b.x - cx),
  )

  const used = new Set<NodeSpec>()
  const chips: ChipSpec[] = []
  const GOLDEN_ANGLE = 137.508
  const TARGET_RADIUS = 215

  for (let i = 0; i < limited.length; i++) {
    const angle = (((i * GOLDEN_ANGLE) % 360) * Math.PI) / 180
    const tx = cx + Math.cos(angle) * TARGET_RADIUS
    const ty = cy + Math.sin(angle) * TARGET_RADIUS

    let best: NodeSpec | null = null
    let bestDist = Number.POSITIVE_INFINITY
    for (const node of sorted) {
      if (used.has(node)) continue
      const dist = (node.x - tx) ** 2 + (node.y - ty) ** 2
      if (dist < bestDist) {
        bestDist = dist
        best = node
      }
    }
    if (!best) break
    used.add(best)

    // Push the chip away from the board center so it clears the trace work.
    const vx = best.x - cx
    const vy = best.y - cy
    const len = Math.hypot(vx, vy) || 1
    const label = limited[i] ?? ''
    const width = Math.round(label.length * 6.2) + 22
    const rawX = best.x + (vx / len) * (width / 2 + 18)
    const rawY = best.y + (vy / len) * 34
    const x = clamp(Math.round(rawX - width / 2), 14, VIEW_W - width - 14)
    const y = clamp(Math.round(rawY - 12), 14, VIEW_H - 40)

    chips.push({ label, x, y, width, node: { x: best.x, y: best.y } })
  }

  return chips
}

export function CircuitBoard({ className, labels = [] }: CircuitBoardProps) {
  const prefersReducedMotion = useReducedMotion()
  const circuit = useMemo(() => buildCircuit(), [])
  const labelKey = labels.join('\u0000')
  const chips = useMemo(
    () => buildChips(labelKey.length > 0 ? labelKey.split('\u0000') : [], circuit.nodes),
    [labelKey, circuit],
  )

  const svgRef = useRef<SVGSVGElement | null>(null)
  const pathRefs = useRef<Map<string, SVGPathElement>>(new Map())
  const signalRefs = useRef<Map<string, SVGCircleElement>>(new Map())

  // Traveling signal dots — rAF + getPointAtLength along the trace paths.
  // Paused while the board is off-screen; rAF + observer fully cleaned up.
  useEffect(() => {
    if (prefersReducedMotion) return
    const svg = svgRef.current
    if (!svg) return

    const entries: Array<{
      path: SVGPathElement
      circle: SVGCircleElement
      duration: number
      offset: number
      length: number
    }> = []
    for (const trace of circuit.traces) {
      if (!trace.signal) continue
      const path = pathRefs.current.get(trace.id)
      const circle = signalRefs.current.get(trace.id)
      if (!path || !circle) continue
      entries.push({
        path,
        circle,
        duration: trace.signalDuration,
        offset: trace.signalBegin,
        length: path.getTotalLength(),
      })
    }
    if (entries.length === 0) return

    let onScreen = true
    const observer = new IntersectionObserver(
      (observed) => {
        onScreen = observed[0]?.isIntersecting ?? true
      },
      { threshold: 0 },
    )
    observer.observe(svg)

    let frame = 0
    const tick = (now: number) => {
      if (onScreen) {
        const seconds = now / 1000
        for (const entry of entries) {
          const phase = (((seconds + entry.offset) / entry.duration) % 1 + 1) % 1
          const point = entry.path.getPointAtLength(phase * entry.length)
          entry.circle.setAttribute('cx', `${point.x}`)
          entry.circle.setAttribute('cy', `${point.y}`)
        }
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [circuit, prefersReducedMotion])

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn('h-full w-full', className)}
      aria-hidden="true"
      fill="none"
    >
      {/* Traces */}
      {circuit.traces.map((trace) => (
        <path
          key={trace.id}
          id={trace.id}
          ref={(el) => {
            if (el) pathRefs.current.set(trace.id, el)
            else pathRefs.current.delete(trace.id)
          }}
          d={trace.d}
          stroke={trace.accent ? '#93C5FD' : '#BFDBFE'}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}

      {/* Via dots at trace bends */}
      {circuit.traces.map((trace) =>
        trace.bends.map((bend, j) => (
          <circle key={`${trace.id}-via-${j}`} cx={bend.x} cy={bend.y} r={2} fill="#BFDBFE" />
        )),
      )}

      {/* Nodes with pulsing halos */}
      {circuit.nodes.map((node, i) => (
        <g key={`node-${i}`}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={node.major ? 11 : 7}
            fill={node.major ? '#3B82F6' : '#93C5FD'}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            animate={
              prefersReducedMotion
                ? { opacity: 0.22 }
                : { scale: [1, node.major ? 1.8 : 1.6], opacity: [0.35, 0] }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : {
                    duration: node.major ? 2.6 : 2.2,
                    repeat: Infinity,
                    ease: 'easeOut',
                    delay: node.pulseDelay,
                  }
            }
          />
          <circle cx={node.x} cy={node.y} r={node.major ? 5 : 3} fill={node.major ? '#2563EB' : '#60A5FA'} />
        </g>
      ))}

      {/* Traveling signal dots (rAF-driven along the trace paths) */}
      {!prefersReducedMotion &&
        circuit.traces
          .filter((trace) => trace.signal)
          .map((trace) => (
            <circle
              key={`${trace.id}-signal`}
              ref={(el) => {
                if (el) signalRefs.current.set(trace.id, el)
                else signalRefs.current.delete(trace.id)
              }}
              cx={trace.start.x}
              cy={trace.start.y}
              r={3.4}
              fill="#2563EB"
            />
          ))}

      {/* Label chips near major nodes */}
      {chips.map((chip) => (
        <g
          key={`chip-${chip.label}`}
          style={{ filter: 'drop-shadow(0 1px 2px rgba(15, 23, 42, 0.08))' }}
        >
          <line
            x1={chip.node.x}
            y1={chip.node.y}
            x2={chip.x + chip.width / 2}
            y2={chip.y + 12}
            stroke="#BFDBFE"
            strokeWidth={1}
            strokeDasharray="2 3"
          />
          <rect
            x={chip.x}
            y={chip.y}
            width={chip.width}
            height={24}
            rx={12}
            fill="#FFFFFF"
            stroke="#BFDBFE"
            strokeWidth={1}
          />
          <text
            x={chip.x + chip.width / 2}
            y={chip.y + 12.5}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={11}
            fontWeight={500}
            fill="#1D4ED8"
          >
            {chip.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
