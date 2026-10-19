"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * useLiquidGlass — reusable liquidGL lens hook.
 *
 * Wraps `liquid-gl` (WebGPU/WebGL Apple-style "Liquid Glass" refraction)
 * with everything the Kramora AI site needs:
 *
 * - **SSR-safe**: the library is loaded via dynamic `import()` inside the
 *   effect, so nothing touches `window` during server rendering.
 * - **Lifecycle-safe**: `destroy()` runs on unmount (and if the component
 *   unmounts mid-import, a `disposed` flag aborts initialisation) — no
 *   WebGL memory leaks, no orphaned listeners.
 * - **Mobile-aware**: snapshot resolution drops to 1.0 below 768px
 *   (battery / 60fps), 2.0 on desktop, unless explicitly overridden.
 * - **Reduced-motion**: the lens is skipped entirely — the CSS frosted-glass
 *   base (`.liquid-glass-target` in globals.css) remains as the surface.
 * - **Light-mode tuned defaults**: subtle refraction, soft bevel, gentle
 *   frost, specular highlights, fade reveal — the "clean premium" glass
 *   look, per the design system (white / slate / blue, never muddy).
 */

export interface LiquidGlassOptions {
  refraction?: number;
  aberration?: number;
  bevelDepth?: number;
  bevelWidth?: number;
  frost?: number;
  shadow?: boolean;
  specular?: boolean;
  reveal?: "none" | "fade";
  tilt?: boolean;
  tiltFactor?: number;
  tiltEase?: number;
  magnify?: number;
  tint?: string | null;
  zIndex?: number;
  /** Explicit resolution override; otherwise 2.0 desktop / 1.0 mobile. */
  resolution?: number;
  /**
   * CSS selector of elements that animate and intersect this lens
   * (framer-motion parallax, CSS keyframe floats). They are registered via
   * `liquidGL.registerDynamic()` so the refracted texture stays live.
   */
  dynamicSelector?: string;
  /**
   * Gate the WebGL lens. liquidGL's scroll-sync is engineered for
   * `position: fixed` / `sticky` targets — set this to false when the
   * element renders in-flow (the CSS frosted base in globals.css takes
   * over, matching the shader's fallback look).
   */
  enabled?: boolean;
}

let lensCounter = 0;

export function useLiquidGlass(
  targetRef: RefObject<HTMLElement | null>,
  options: LiquidGlassOptions = {},
): void {
  // `enabled` is reactive: the lens (re)initialises when it flips — e.g.
  // the hero card only becomes a fixed lens at the xl breakpoint. All other
  // options are initial-only config (liquidGL lenses are too).
  const enabled = options.enabled !== false;
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    if (!enabled) return;

    const el = targetRef.current;
    if (!el) return;

    // Reduced motion → keep the CSS frosted fallback, skip the shader.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Stable, unique selector for this lens target.
    if (!el.id) {
      lensCounter += 1;
      el.id = `liquid-glass-${lensCounter}`;
    }
    const selector = `#${el.id}`;

    // Lower snapshot resolution on phones (battery / 60fps budget).
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    let disposed = false;
    let lens: { destroy: () => void } | null = null;

    (async () => {
      try {
        const { default: liquidGL } = await import("liquid-gl");
        if (disposed || typeof liquidGL !== "function") return;

        const opts = optionsRef.current;
        lens = liquidGL({
          target: selector,
          snapshot: "body",
          resolution: opts.resolution ?? (isMobile ? 1.0 : 2.0),
          // Light-mode premium defaults (subtle refraction, high frost feel).
          refraction: 0.015,
          bevelDepth: 0.1,
          bevelWidth: 0.2,
          frost: 0.8,
          shadow: true,
          specular: true,
          reveal: "fade",
          ...opts,
          on: {
            init(instance) {
              console.log("Liquid Glass ready on Kramora AI", instance);
            },
          },
        });

        // Animated elements intersecting the pane stay live in the snapshot.
        if (opts.dynamicSelector) {
          liquidGL.registerDynamic?.(opts.dynamicSelector);
        }
      } catch (err) {
        console.warn(
          "[liquidGL] unavailable — CSS glass fallback active:",
          err,
        );
      }
    })();

    return () => {
      disposed = true;
      try {
        lens?.destroy();
      } catch {
        /* teardown best-effort */
      }
      lens = null;
    };
    // `enabled` is the only reactive input; the rest are initial-only
    // (re-running on object identity would thrash GPU contexts).
  }, [enabled, targetRef]);
}
