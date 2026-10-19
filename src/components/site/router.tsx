"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { Header } from "./header";
import { Footer } from "./footer";
import { getPage } from "./pages";
import { KramoraMark } from "./logo";

/* ------------------------------------------------------------------ */
/* Hash router with "Swoosh" clip-path page transitions                */
/* ------------------------------------------------------------------ */

function parseRoute(): string {
  if (typeof window === "undefined") return "/";
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw || raw === "/") return "/";
  const withSlash = raw.startsWith("/") ? raw : `/${raw}`;
  const trimmed = withSlash.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

const COVER_MS = 460;
const REVEAL_MS = 540;

type Phase = "hiddenRight" | "covered" | "hiddenLeft";

const swooshEase = [0.83, 0, 0.17, 1] as const;

export function SiteShell() {
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const [route, setRoute] = useState("/");
  const [phase, setPhase] = useState<Phase>("covered"); // intro: start covered, then reveal
  const routeRef = useRef(route);
  const busyRef = useRef(false);
  const pendingRef = useRef<string | null>(null);
  const timersRef = useRef<number[]>([]);

  const commit = useCallback(
    (next: string) => {
      routeRef.current = next;
      setRoute(next);
      const meta = getPage(next);
      if (meta?.title) document.title = meta.title;
      // Route swap → top of the new page. Lenis drives the *native* scroll
      // position, so an immediate scrollTo through Lenis keeps the virtual and
      // real scroll in lockstep (no fight between the two).
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    },
    [lenis]
  );

  /* Sync deep-linked hash before first paint (post-hydration). */
  useLayoutEffect(() => {
    const initial = parseRoute();
    if (initial !== "/") {
      const id = requestAnimationFrame(() => commit(initial));
      return () => cancelAnimationFrame(id);
    }
  }, [commit]);

  /* Intro reveal. */
  useEffect(() => {
    if (reduced) return; // overlay not rendered under reduced motion
    const t = window.setTimeout(() => {
      if (!busyRef.current) setPhase("hiddenLeft");
    }, 260);
    return () => window.clearTimeout(t);
  }, [reduced]);

  /* Listen for hash navigation. */
  useEffect(() => {
    const onHashChange = () => {
      const next = parseRoute();
      if (next === routeRef.current) return;

      if (reduced) {
        commit(next);
        return;
      }

      if (busyRef.current) {
        pendingRef.current = next; // always remember the latest target
        return;
      }

      busyRef.current = true;
      // Instant, invisible reset to the right edge, then swoosh in.
      setPhase("hiddenRight");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase("covered"));
      });

      timersRef.current.push(
        window.setTimeout(() => {
          commit(pendingRef.current ?? next);
          pendingRef.current = null;
          setPhase("hiddenLeft");
          timersRef.current.push(
            window.setTimeout(() => {
              busyRef.current = false;
            }, REVEAL_MS)
          );
        }, COVER_MS)
      );
    };

    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      timersRef.current.forEach((t) => window.clearTimeout(t));
      timersRef.current = [];
    };
  }, [commit, reduced]);

  const meta = getPage(route);
  const Page = meta.component;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header route={route} />

      <main className="flex-1">
        {reduced ? (
          <div key={route}>
            <Page />
          </div>
        ) : (
          <motion.div
            key={route}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <Page />
          </motion.div>
        )}
      </main>

      <Footer />

      {/* Swoosh overlay — SSRs fully covering for a clean intro reveal */}
      {!reduced ? (
        <div className="pointer-events-none fixed inset-0 z-[90]" aria-hidden="true">
          {/* Blue accent band — trails behind the white panel */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600"
            initial={{ clipPath: "inset(0 0 0 0)" }}
            animate={phase}
            variants={{
              hiddenRight: { clipPath: "inset(0 0 0 100%)", transition: { duration: 0.01 } },
              covered: { clipPath: "inset(0 0 0 0)", transition: { duration: 0.46, delay: 0.06, ease: swooshEase } },
              hiddenLeft: { clipPath: "inset(0 100% 0 0)", transition: { duration: 0.52, delay: 0.07, ease: swooshEase } },
            }}
          />
          {/* White panel — leads the sweep */}
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ clipPath: "inset(0 0 0 0)" }}
            animate={phase}
            variants={{
              hiddenRight: { clipPath: "inset(0 0 0 100%)", transition: { duration: 0.01 } },
              covered: { clipPath: "inset(0 0 0 0)", transition: { duration: 0.42, ease: swooshEase } },
              hiddenLeft: { clipPath: "inset(0 100% 0 0)", transition: { duration: 0.5, ease: swooshEase } },
            }}
          />
          {/* Branding moment while covered */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === "covered" ? 1 : 0 }}
            transition={{ duration: 0.18 }}
          >
            <KramoraMark className="h-12 w-12 drop-shadow-[0_8px_24px_rgba(37,99,235,0.35)]" />
          </motion.div>
        </div>
      ) : null}
    </div>
  );
}
