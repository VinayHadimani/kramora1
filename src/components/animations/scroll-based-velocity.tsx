"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * ScrollBasedVelocity — horizontal marquee whose speed responds to scroll.
 *
 * Two rows of `items` repeated 4x scroll continuously. `useScroll` +
 * `useVelocity` + `useSpring` produce a smoothed scroll velocity; scrolling
 * down speeds the marquee up and scrolling up reverses it. Rows share the same
 * direction but are staggered by half a repetition for a layered feel.
 */

interface VelocityRowProps {
  items: string[];
  baseVelocity: number;
  itemClassName?: string;
  initialX: number;
}

function VelocityRow({ items, baseVelocity, itemClassName, initialX }: VelocityRowProps) {
  const baseX = useMotionValue(initialX);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });
  const directionFactor = useRef(1);
  // One repetition of the 4x-duplicated track is exactly 25% of its width,
  // so wrapping x within [-25%, 0%] loops seamlessly.
  const x = useTransform(baseX, (latest) => `${wrap(-25, 0, latest)}%`);

  useAnimationFrame((_, delta) => {
    const clampedDelta = Math.min(delta, 64);
    let moveBy = directionFactor.current * baseVelocity * (clampedDelta / 1000);
    const factor = velocityFactor.get();
    if (factor < 0) {
      directionFactor.current = -1;
    } else if (factor > 0) {
      directionFactor.current = 1;
    }
    moveBy += directionFactor.current * moveBy * Math.abs(factor);
    baseX.set(baseX.get() + moveBy);
  });

  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <motion.div className="flex w-max items-center" style={{ x }} aria-hidden="true">
      {repeatedItems.map((item, index) => (
        <span key={index} className="flex shrink-0 items-center">
          <span className={cn("whitespace-nowrap text-slate-400", itemClassName)}>
            {item}
          </span>
          <span className="mx-6 select-none text-slate-300" aria-hidden="true">
            •
          </span>
        </span>
      ))}
    </motion.div>
  );
}

interface ScrollBasedVelocityProps {
  items: string[];
  className?: string;
  baseVelocity?: number;
  itemClassName?: string;
}

export function ScrollBasedVelocity({
  items,
  className,
  baseVelocity = 3,
  itemClassName,
}: ScrollBasedVelocityProps) {
  const marqueeItems = items.filter((item) => item.length > 0);
  if (marqueeItems.length === 0) return null;

  return (
    <div className={cn("relative w-full overflow-hidden py-1", className)}>
      {/* Readable list for assistive tech (visual rows are decorative repeats) */}
      <ul className="sr-only m-0 list-none p-0">
        {marqueeItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="overflow-hidden">
        <VelocityRow
          items={marqueeItems}
          baseVelocity={baseVelocity}
          itemClassName={itemClassName}
          initialX={0}
        />
      </div>
      <div className="mt-2 overflow-hidden">
        <VelocityRow
          items={marqueeItems}
          baseVelocity={baseVelocity}
          itemClassName={itemClassName}
          initialX={-12.5}
        />
      </div>
    </div>
  );
}
