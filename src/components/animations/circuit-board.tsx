"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * CircuitBoard — animated light-mode circuit board rendered on canvas.
 *
 * A subtle grid, ~14-20 orthogonal traces with rounded corners (L-shaped /
 * stepped paths snapped to the grid), pad nodes at endpoints/joints, and
 * traveling pulses with fading comet trails. The static scene (grid + traces +
 * nodes) is pre-rendered to an offscreen canvas and blitted each frame; only
 * pulses are re-drawn, keeping the rAF loop cheap.
 */

interface CircuitBoardProps {
  className?: string;
  gridColor?: string;
  traceColor?: string;
  pulseColor?: string;
  nodeColor?: string;
}

interface Point {
  x: number;
  y: number;
}

interface Trace {
  points: Point[];
  cumulative: number[];
  total: number;
}

interface Pulse {
  traceIndex: number;
  distance: number;
  speed: number;
  forward: boolean;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "").trim();
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const value = Number.parseInt(full, 16);
  if (Number.isNaN(value)) return [37, 99, 235];
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

const GRID = 44;
const CORNER_RADIUS = 7;
const PULSE_COUNT = 7;

export function CircuitBoard({
  className,
  gridColor = "rgba(64, 64, 64, 0.05)",
  traceColor = "rgba(37, 99, 235, 0.2)",
  pulseColor = "#2563eb",
  nodeColor = "#e2e8f0",
}: CircuitBoardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const staticCanvas = document.createElement("canvas");
    const staticCtx = staticCanvas.getContext("2d");
    if (!staticCtx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const [pr, pg, pb] = hexToRgb(pulseColor);

    let width = 0;
    let height = 0;
    let raf = 0;
    let lastTime = 0;
    let traces: Trace[] = [];
    let pulses: Pulse[] = [];

    const pointAt = (trace: Trace, distance: number): Point => {
      const { points, cumulative, total } = trace;
      const d = Math.min(Math.max(distance, 0), total);
      for (let i = 1; i < points.length; i++) {
        if (d <= cumulative[i] || i === points.length - 1) {
          const segmentLength = cumulative[i] - cumulative[i - 1];
          const t =
            segmentLength === 0
              ? 0
              : (d - cumulative[i - 1]) / segmentLength;
          const a = points[i - 1];
          const b = points[i];
          return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
        }
      }
      return points[points.length - 1];
    };

    const buildScene = () => {
      const cols = Math.max(Math.floor(width / GRID), 3);
      const rows = Math.max(Math.floor(height / GRID), 3);
      const traceCount = Math.min(
        20,
        Math.max(14, Math.round((width * height) / 70000) + 8),
      );
      traces = [];
      for (let t = 0; t < traceCount; t++) {
        let x = (1 + Math.floor(Math.random() * (cols - 2))) * GRID;
        let y = (1 + Math.floor(Math.random() * (rows - 2))) * GRID;
        let horizontal = Math.random() > 0.5;
        const points: Point[] = [{ x, y }];
        const segments = 2 + Math.floor(Math.random() * 4);
        for (let s = 0; s < segments; s++) {
          const cells = 1 + Math.floor(Math.random() * 4);
          const sign = Math.random() > 0.5 ? 1 : -1;
          if (horizontal) {
            x = Math.min(Math.max(x + cells * GRID * sign, GRID), width - GRID);
          } else {
            y = Math.min(Math.max(y + cells * GRID * sign, GRID), height - GRID);
          }
          const previous = points[points.length - 1];
          if (x !== previous.x || y !== previous.y) {
            points.push({ x, y });
          }
          horizontal = !horizontal;
        }
        if (points.length < 2) continue;
        const cumulative: number[] = [0];
        for (let i = 1; i < points.length; i++) {
          cumulative.push(
            cumulative[i - 1] +
              Math.hypot(
                points[i].x - points[i - 1].x,
                points[i].y - points[i - 1].y,
              ),
          );
        }
        traces.push({
          points,
          cumulative,
          total: cumulative[cumulative.length - 1],
        });
      }

      pulses = [];
      for (let i = 0; i < PULSE_COUNT && traces.length > 0; i++) {
        const traceIndex = Math.floor(Math.random() * traces.length);
        pulses.push({
          traceIndex,
          distance: Math.random() * traces[traceIndex].total,
          speed: 55 + Math.random() * 75,
          forward: Math.random() > 0.5,
        });
      }
    };

    const renderStatic = () => {
      staticCanvas.width = Math.round(width * dpr);
      staticCanvas.height = Math.round(height * dpr);
      staticCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      staticCtx.clearRect(0, 0, width, height);

      // Grid
      staticCtx.strokeStyle = gridColor;
      staticCtx.lineWidth = 1;
      staticCtx.beginPath();
      for (let gx = 0; gx <= width; gx += GRID) {
        staticCtx.moveTo(Math.round(gx) + 0.5, 0);
        staticCtx.lineTo(Math.round(gx) + 0.5, height);
      }
      for (let gy = 0; gy <= height; gy += GRID) {
        staticCtx.moveTo(0, Math.round(gy) + 0.5);
        staticCtx.lineTo(width, Math.round(gy) + 0.5);
      }
      staticCtx.stroke();

      // Traces with rounded corners
      staticCtx.strokeStyle = traceColor;
      staticCtx.lineWidth = 1.2;
      staticCtx.lineJoin = "round";
      staticCtx.lineCap = "round";
      for (const trace of traces) {
        staticCtx.beginPath();
        staticCtx.moveTo(trace.points[0].x, trace.points[0].y);
        for (let i = 1; i < trace.points.length - 1; i++) {
          staticCtx.arcTo(
            trace.points[i].x,
            trace.points[i].y,
            trace.points[i + 1].x,
            trace.points[i + 1].y,
            CORNER_RADIUS,
          );
        }
        const last = trace.points[trace.points.length - 1];
        staticCtx.lineTo(last.x, last.y);
        staticCtx.stroke();
      }

      // Nodes: small circles at joints, larger pads at endpoints
      for (const trace of traces) {
        for (let i = 0; i < trace.points.length; i++) {
          const p = trace.points[i];
          const isEndpoint = i === 0 || i === trace.points.length - 1;
          if (isEndpoint) {
            staticCtx.fillStyle = nodeColor;
            staticCtx.beginPath();
            if (typeof staticCtx.roundRect === "function") {
              staticCtx.roundRect(p.x - 3, p.y - 3, 6, 6, 1.5);
            } else {
              staticCtx.rect(p.x - 3, p.y - 3, 6, 6);
            }
            staticCtx.fill();
            staticCtx.strokeStyle = "rgba(148, 163, 184, 0.45)";
            staticCtx.lineWidth = 1;
            staticCtx.beginPath();
            if (typeof staticCtx.roundRect === "function") {
              staticCtx.roundRect(p.x - 3, p.y - 3, 6, 6, 1.5);
            } else {
              staticCtx.rect(p.x - 3, p.y - 3, 6, 6);
            }
            staticCtx.stroke();
          } else {
            staticCtx.fillStyle = nodeColor;
            staticCtx.beginPath();
            staticCtx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
            staticCtx.fill();
          }
        }
      }
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(Math.round(rect.width), 1);
      height = Math.max(Math.round(rect.height), 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildScene();
      renderStatic();
    };

    const draw = (now: number) => {
      const dt = lastTime === 0 ? 0 : Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(staticCanvas, 0, 0, width, height);

      for (const pulse of pulses) {
        if (traces.length === 0) break;
        const trace = traces[pulse.traceIndex];
        if (!trace) continue;
        pulse.distance += pulse.speed * dt * (pulse.forward ? 1 : -1);
        if (pulse.distance <= 0 || pulse.distance >= trace.total) {
          pulse.traceIndex = Math.floor(Math.random() * traces.length);
          const next = traces[pulse.traceIndex];
          pulse.distance = Math.random() * next.total;
          pulse.speed = 55 + Math.random() * 75;
          pulse.forward = Math.random() > 0.5;
          continue;
        }

        const head = pointAt(trace, pulse.distance);
        const direction = pulse.forward ? 1 : -1;

        // Fading comet trail
        for (let k = 1; k <= 4; k++) {
          const trailDistance = pulse.distance - direction * k * 8;
          if (trailDistance > 0 && trailDistance < trace.total) {
            const tp = pointAt(trace, trailDistance);
            ctx.fillStyle = `rgba(${pr}, ${pg}, ${pb}, ${0.32 * (1 - k / 5)})`;
            ctx.beginPath();
            ctx.arc(tp.x, tp.y, Math.max(1.8 - k * 0.3, 0.6), 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Radial glow
        const glow = ctx.createRadialGradient(
          head.x,
          head.y,
          0,
          head.x,
          head.y,
          10,
        );
        glow.addColorStop(0, `rgba(${pr}, ${pg}, ${pb}, 0.5)`);
        glow.addColorStop(1, `rgba(${pr}, ${pg}, ${pb}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 10, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `rgba(${pr}, ${pg}, ${pb}, 0.9)`;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
    };
  }, [gridColor, traceColor, pulseColor, nodeColor]);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
