"use client";

/**
 * VantaLightBackground — atmospheric WebGL background for the light theme.
 *
 * Strictly light-mode configuration: pure white background (#FFFFFF) with the
 * brand blue (#2563EB) as the effect color. Effects are loaded lazily via
 * dynamic import (three.js stays out of pages that don't use it) and are
 * DESTROYED on unmount — the hash router swaps page components, so the WebGL
 * context lifecycle is tied to the page's mount cycle (no leaks across
 * navigation).
 *
 * Guards:
 * - Mobile: STAYS ENABLED (never disabled) — optimized instead via Vanta's
 *   own `scaleMobile: 0.5` pixel-ratio reduction plus a lighter node grid
 *   (fewer points, wider spacing) so phones keep the full effect at a
 *   fraction of the GPU cost.
 * - prefers-reduced-motion: static pastel gradient fallback (a11y).
 * - StrictMode double-mount safe: async init checks a `disposed` flag.
 */

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type VantaVariant = "net" | "waves";

/** Pastel blue atmosphere used whenever the WebGL layer is absent. */
const FALLBACK_GRADIENT =
  "bg-[radial-gradient(62%_52%_at_72%_18%,rgba(219,234,254,0.95),transparent_72%),radial-gradient(48%_42%_at_16%_84%,rgba(239,246,255,0.95),transparent_70%)]";

export function VantaLightBackground({
  variant = "net",
  className,
}: {
  variant?: VantaVariant;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const effectRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !hostRef.current) return;

    // Mobile keeps the live effect — just a lighter constellation.
    const isMobileView = window.innerWidth < 768;

    let disposed = false;

    (async () => {
      try {
        const [THREE, effectModule] = await Promise.all([
          import("three"),
          variant === "waves"
            ? import("vanta/dist/vanta.waves.min")
            : import("vanta/dist/vanta.net.min"),
        ]);
        if (disposed || !hostRef.current) return;

        const shared = {
          el: hostRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 0.5,
          backgroundColor: 0xffffff, // pure white — strict light mode
          color: 0x2563eb, // brand blue accent
        };

        const handle =
          variant === "waves"
            ? effectModule.default({
                ...shared,
                // Pastel wave mesh (blue-300) on pure white — reads as a soft
                // silk-ocean, never a dark block.
                color: 0xbfdbfe,
                shininess: 32,
                waveHeight: 13,
                waveSpeed: 0.38,
                zoom: 0.82,
              })
            : effectModule.default({
                ...shared,
                // Constellation density. Desktop: 11×11 node grid at 16-unit
                // spacing (line intensity ≈ 2·(1−16/24) = 0.67 toward brand
                // blue — clearly readable connections, still airy on white).
                // Mobile: fewer nodes + wider spacing ≈ half the draw cost,
                // paired with Vanta's scaleMobile 0.5 pixel-ratio reduction.
                points: isMobileView ? 6 : 10,
                spacing: isMobileView ? 22 : 16,
                maxDistance: isMobileView ? 20 : 24,
                showDots: true,
              });

        // --- Vanta/Three compatibility patch ---------------------------------
        // Vanta passes `vertexColors: THREE.VertexColors` to the line material,
        // but THREE.VertexColors was removed in three r125 — on modern three it
        // resolves to undefined, which disables vertex colors and leaves the
        // constellation lines rendering white-on-white (invisible). Re-enable
        // them on the live instance.
        const linesMesh = (
          handle as unknown as {
            linesMesh?: { material?: { vertexColors: boolean; blending: number; needsUpdate: boolean } | null };
          }
        ).linesMesh;
        if (linesMesh?.material) {
          linesMesh.material.vertexColors = true;
          linesMesh.material.blending = THREE.NormalBlending;
          linesMesh.material.needsUpdate = true;
        }

        effectRef.current = handle;
      } catch (err) {
        console.warn("[vanta] effect unavailable, using gradient fallback:", err);
      }
    })();

    return () => {
      disposed = true;
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, [variant]);

  return (
    <div ref={hostRef} aria-hidden="true" className={cn("absolute inset-0 overflow-hidden", className)}>
      <div className={cn("absolute inset-0", FALLBACK_GRADIENT)} />
    </div>
  );
}
