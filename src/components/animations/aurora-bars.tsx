"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * AuroraBars — canvas-rendered field of vertical bars whose heights undulate
 * via layered sine waves (different phases/frequencies), tinted across a soft
 * indigo → white palette with a gradient-alpha glow. Light-mode friendly.
 *
 * The component fills its container (absolute inset-0) so it can be dropped
 * behind hero/section content; the `height` prop optionally pins a height.
 */

type Rgb = [number, number, number];

function hexToRgb(hex: string): Rgb {
  const clean = hex.replace("#", "").trim();
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const value = Number.parseInt(full, 16);
  if (Number.isNaN(value)) return [99, 102, 241];
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function samplePalette(palette: Rgb[], t: number): Rgb {
  if (palette.length === 0) return [99, 102, 241];
  if (palette.length === 1) return palette[0];
  const clamped = Math.min(Math.max(t, 0), 1);
  const scaled = clamped * (palette.length - 1);
  const index = Math.min(Math.floor(scaled), palette.length - 2);
  const fraction = scaled - index;
  const from = palette[index];
  const to = palette[index + 1];
  return [
    Math.round(from[0] + (to[0] - from[0]) * fraction),
    Math.round(from[1] + (to[1] - from[1]) * fraction),
    Math.round(from[2] + (to[2] - from[2]) * fraction),
  ];
}

interface AuroraBarsProps {
  className?: string;
  colors?: string[];
  background?: string;
  barWidth?: number;
  gap?: number;
  height?: number;
}

export function AuroraBars({
  className,
  colors = ["#e0e7ff", "#c7d2fe", "#a5b4fc", "#818cf8", "#ffffff"],
  background = "#ffffff",
  barWidth = 14,
  gap = 8,
  height,
}: AuroraBarsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Stable effect dependency: inline array literals passed by parents would
  // otherwise re-fire the effect (and restart the rAF loop) on every render.
  const paletteKey = colors.join(",");

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const palette = colors.map(hexToRgb);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let heightInner = 0;
    let raf = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(Math.round(rect.width), 1);
      heightInner = Math.max(Math.round(rect.height), 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(heightInner * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const t = now / 1000;
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, heightInner);

      const stride = barWidth + gap;
      const barCount = Math.max(1, Math.ceil((width + gap) / stride));

      for (let i = 0; i < barCount; i++) {
        const x = i * stride;
        const u = barCount === 1 ? 0.5 : i / (barCount - 1);
        const [r, g, b] = samplePalette(palette, u);

        // Layered sine waves — distinct frequencies/phases per layer.
        const wave =
          Math.sin(t * 0.55 + i * 0.55) * 0.5 +
          Math.sin(t * 0.9 - i * 0.32 + 1.3) * 0.3 +
          Math.sin(t * 0.42 + i * 0.9 + 3.1) * 0.2;
        const normalized = wave * 0.5 + 0.5;
        const barHeight = Math.max(
          barWidth,
          heightInner * (0.16 + 0.5 * normalized),
        );
        const y = heightInner - barHeight;

        // Gradient alpha acts as the soft glow — fading toward the top.
        const gradient = ctx.createLinearGradient(0, y, 0, heightInner);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        gradient.addColorStop(0.55, `rgba(${r}, ${g}, ${b}, 0.5)`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.95)`);
        ctx.fillStyle = gradient;

        ctx.beginPath();
        const radius = Math.min(barWidth / 2, 7);
        if (typeof ctx.roundRect === "function") {
          ctx.roundRect(x, y, barWidth, barHeight, [radius, radius, 0, 0]);
        } else {
          ctx.rect(x, y, barWidth, barHeight);
        }
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
  }, [background, barWidth, gap, paletteKey]);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={height !== undefined ? { height: `${height}px` } : undefined}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
