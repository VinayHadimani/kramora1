"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * CursorDrivenParticleTypography — canvas particle system forming `text`.
 *
 * The text is drawn to an offscreen canvas (bold sans, size = `fontSize`,
 * scaled down to fit the container width) and its pixels are sampled on a
 * grid to produce spring targets. Particles spring toward their targets with
 * friction, are repelled by the cursor within ~90px (quadratic falloff), and
 * are drawn as small circles in `color` at ~0.9 alpha. Resizes re-measure and
 * re-sample while preserving particle continuity; the rAF loop and all
 * listeners are cleaned up on unmount.
 */

interface CursorDrivenParticleTypographyProps {
  text: string;
  color?: string;
  className?: string;
  fontSize?: number;
  particleRadius?: number;
}

interface Target {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  radius: number;
}

const MAX_PARTICLES = 3200;
const MIN_SAMPLING_GAP = 4;
const MAX_SAMPLING_GAP = 12;
const SPRING = 0.018;
const FRICTION = 0.86;
const REPEL_RADIUS = 90;
const REPEL_FORCE = 3;

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

function sampleTargets(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  gap: number,
): Target[] {
  const targets: Target[] = [];
  for (let y = Math.floor(gap / 2); y < height; y += gap) {
    for (let x = Math.floor(gap / 2); x < width; x += gap) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha > 128) {
        targets.push({ x, y });
      }
    }
  }
  return targets;
}

export function CursorDrivenParticleTypography({
  text,
  color = "#2563eb",
  className,
  fontSize = 120,
  particleRadius = 1.6,
}: CursorDrivenParticleTypographyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || !text) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const [r, g, b] = hexToRgb(color);
    const mouse = { x: -9999, y: -9999 };
    let width = 0;
    let height = 0;
    let raf = 0;

    const offscreen = document.createElement("canvas");
    const offscreenCtx = offscreen.getContext("2d", {
      willReadFrequently: true,
    });
    if (!offscreenCtx) return;

    const build = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(Math.round(rect.width), 1);
      height = Math.max(Math.round(rect.height), 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      offscreen.width = width;
      offscreen.height = height;

      // Use the computed font stack so next/font families are picked up.
      const fontFamily =
        window.getComputedStyle(canvas).fontFamily || "sans-serif";

      // Fit the text within the container width.
      let size = fontSize;
      offscreenCtx.font = `700 ${size}px ${fontFamily}`;
      const measured = offscreenCtx.measureText(text);
      const padding = 8;
      if (measured.width > width - padding * 2 && measured.width > 0) {
        size = Math.max(
          12,
          Math.floor((size * (width - padding * 2)) / measured.width),
        );
      }

      offscreenCtx.clearRect(0, 0, width, height);
      offscreenCtx.font = `700 ${size}px ${fontFamily}`;
      offscreenCtx.textAlign = "center";
      offscreenCtx.textBaseline = "middle";
      offscreenCtx.fillStyle = "#000000";
      offscreenCtx.fillText(text, width / 2, height / 2);

      const imageData = offscreenCtx.getImageData(0, 0, width, height);

      // Escalate the sampling gap if there are too many targets.
      let gap = MIN_SAMPLING_GAP;
      let targets = sampleTargets(imageData.data, width, height, gap);
      while (targets.length > MAX_PARTICLES && gap < MAX_SAMPLING_GAP) {
        gap += 1;
        targets = sampleTargets(imageData.data, width, height, gap);
      }
      if (targets.length > MAX_PARTICLES) {
        targets = targets.slice(0, MAX_PARTICLES);
      }

      // Preserve particle positions across re-samples for continuity.
      const previous = particlesRef.current;
      particlesRef.current = targets.map((target, index) => {
        const existing = previous[index];
        if (existing) {
          return { ...existing, targetX: target.x, targetY: target.y };
        }
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0,
          vy: 0,
          targetX: target.x,
          targetY: target.y,
          radius: particleRadius * (0.7 + Math.random() * 0.6),
        };
      });
    };

    const step = () => {
      const particles = particlesRef.current;
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.beginPath();

      const repelSquared = REPEL_RADIUS * REPEL_RADIUS;
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        // Spring toward target.
        particle.vx += (particle.targetX - particle.x) * SPRING;
        particle.vy += (particle.targetY - particle.y) * SPRING;

        // Cursor repulsion with quadratic falloff.
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < repelSquared) {
          const d = Math.sqrt(d2) || 1;
          const falloff = 1 - d / REPEL_RADIUS;
          const force = REPEL_FORCE * falloff * falloff;
          particle.vx += (dx / d) * force;
          particle.vy += (dy / d) * force;
        }

        particle.vx *= FRICTION;
        particle.vy *= FRICTION;
        particle.x += particle.vx;
        particle.y += particle.vy;

        ctx.moveTo(particle.x + particle.radius, particle.y);
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      }

      ctx.fill();
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(step);
    };

    const setMouseFromPoint = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;
    };

    const handleMouseMove = (event: MouseEvent) => {
      setMouseFromPoint(event.clientX, event.clientY);
    };
    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      setMouseFromPoint(touch.clientX, touch.clientY);
    };
    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("touchmove", handleTouchMove, {
      passive: true,
    });
    container.addEventListener("touchend", handleMouseLeave);

    build();
    raf = requestAnimationFrame(step);

    const resizeObserver = new ResizeObserver(() => {
      build();
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleMouseLeave);
      particlesRef.current = [];
    };
  }, [text, color, fontSize, particleRadius]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full touch-pan-y", className)}
      style={{ height: `${Math.round(fontSize * 1.4)}px` }}
      aria-label={text}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" aria-hidden="true" />
    </div>
  );
}
