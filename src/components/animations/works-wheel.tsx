"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * WorksWheel — premium rotating showcase of article cards for the Insights
 * section. The active card sits center at full scale/opacity; neighbors sit
 * slightly scaled down, nudged down and dimmed. Auto-advances every 4.5s
 * (pauses on hover/focus/swipe), with chevron controls, progress dots and
 * pointer/touch swipe support.
 */

export type WorksWheelItem = {
  title: string;
  description: string;
  image: string;
  eyebrow?: string;
  tags?: string[];
};

interface WorksWheelProps {
  items: WorksWheelItem[];
  className?: string;
}

const AUTO_ADVANCE_MS = 4500;
const SWIPE_THRESHOLD = 56;

interface WheelLayout {
  cardWidth: number;
  spacing: number;
  height: number;
}

interface WheelCardProps {
  item: WorksWheelItem;
  index: number;
  active: number;
  count: number;
  layout: WheelLayout;
  onSelect: (index: number) => void;
}

function WheelCard({ item, index, active, count, layout, onSelect }: WheelCardProps) {
  // Shortest circular distance from the active index.
  let offset = index - active;
  if (offset > count / 2) offset -= count;
  if (offset < -count / 2) offset += count;
  const absOffset = Math.abs(offset);
  const isActive = offset === 0;
  const isNeighbor = absOffset === 1;

  return (
    <motion.article
      className="absolute inset-x-0 top-0 m-auto flex h-full origin-center flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-lg shadow-slate-200/50"
      style={{
        width: layout.cardWidth,
        zIndex: isActive ? 30 : isNeighbor ? 20 : 10,
      }}
      initial={false}
      animate={{
        x: offset * layout.spacing,
        y: isActive ? 0 : 22,
        scale: isActive ? 1 : isNeighbor ? 0.9 : 0.85,
        opacity: isNeighbor ? 0.55 : isActive ? 1 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 26,
        opacity: { duration: 0.35 },
      }}
      aria-hidden={isActive || isNeighbor ? undefined : true}
      onClick={isNeighbor ? () => onSelect(index) : undefined}
    >
      <div className="aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-100">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          draggable={false}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden p-5 sm:p-6">
        {item.eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-600">
            {item.eyebrow}
          </p>
        ) : null}
        <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug text-slate-900">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
          {item.description}
        </p>
        {item.tags && item.tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        <div className="mt-auto pt-5">
          <button
            type="button"
            tabIndex={isActive ? 0 : -1}
            aria-label={`Read article: ${item.title}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-600"
          >
            Read article
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function WorksWheel({ items, className }: WorksWheelProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [layout, setLayout] = useState<WheelLayout>({
    // Desktop-first defaults (max-w-7xl container) — refined by ResizeObserver.
    cardWidth: 400,
    spacing: 432,
    height: 540,
  });
  const viewportRef = useRef<HTMLDivElement>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);

  const count = items.length;

  const goTo = useCallback(
    (index: number) => {
      if (count === 0) return;
      setActive(((index % count) + count) % count);
    },
    [count],
  );
  const next = useCallback(() => {
    setActive((current) => (current + 1) % count);
  }, [count]);
  const previous = useCallback(() => {
    setActive((current) => (current - 1 + count) % count);
  }, [count]);

  // Responsive card sizing.
  useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;
    const measure = () => {
      const availableWidth = element.clientWidth;
      if (availableWidth === 0) return;
      const cardWidth = Math.round(
        Math.max(280, Math.min(400, availableWidth * 0.76)),
      );
      setLayout({
        cardWidth,
        spacing: cardWidth + 32,
        // image (5/8 of width) + worst-case body budget
        // (eyebrow + 2-line title + 2-line description + tags + pill + padding).
        height: Math.round(cardWidth * 0.625 + 290),
      });
    };
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, []);

  // Auto-advance (paused on hover / focus / swipe).
  useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % count);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
    setPaused(true);
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = pointerStartRef.current;
    pointerStartRef.current = null;
    setPaused(false);
    if (!start || count < 2) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else previous();
    }
  };

  const handlePointerCancel = () => {
    pointerStartRef.current = null;
    setPaused(false);
  };

  if (!items || count === 0) return null;

  return (
    <div className={cn("relative w-full", className)}>
      <div
        ref={viewportRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured articles"
        className="relative w-full touch-pan-y select-none overflow-hidden"
        style={{ height: layout.height }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={handlePointerCancel}
      >
        {items.map((item, index) => (
          <WheelCard
            key={`${item.title}-${index}`}
            item={item}
            index={index}
            active={active}
            count={count}
            layout={layout}
            onSelect={goTo}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-4 sm:gap-6">
        <button
          type="button"
          onClick={previous}
          aria-label="Previous article"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:border-blue-300 hover:text-blue-600"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="flex items-center gap-1">
          {items.map((item, index) => (
            <button
              key={`${item.title}-${index}`}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to article ${index + 1}: ${item.title}`}
              aria-current={index === active ? "true" : undefined}
              className="flex h-10 w-10 items-center justify-center"
            >
              <span
                className={cn(
                  "block rounded-full transition-all duration-300",
                  index === active
                    ? "h-1.5 w-5 bg-blue-600"
                    : "h-1.5 w-1.5 bg-slate-200 hover:bg-slate-300",
                )}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          aria-label="Next article"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:border-blue-300 hover:text-blue-600"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
