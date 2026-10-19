"use client";

import { motion, type MotionProps } from "framer-motion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { TECH_STACK } from "@/lib/content";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

const ACCENT_PHRASE = "every layer";

export default function TechStack() {
  const [headingBefore, headingAfter] = TECH_STACK.heading.split(ACCENT_PHRASE);

  return (
    <section id="technology" className="relative bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <motion.p
          {...reveal()}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600"
        >
          {TECH_STACK.eyebrow}
        </motion.p>
        <motion.h2
          {...reveal(0.08)}
          className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.1]"
        >
          {headingBefore}
          <span className="font-serif italic text-blue-600">
            {ACCENT_PHRASE}
          </span>
          {headingAfter}
        </motion.h2>
        <motion.p
          {...reveal(0.16)}
          className="mt-5 max-w-3xl text-base leading-relaxed text-slate-500 sm:text-lg"
        >
          {TECH_STACK.intro}
        </motion.p>

        <motion.div {...reveal(0.2)} className="mt-12">
          <Tabs
            defaultValue={TECH_STACK.layers[0].layer}
            className="w-full"
          >
            <TabsList className="flex h-auto flex-wrap justify-center gap-2 bg-transparent">
              {TECH_STACK.layers.map((layer, index) => (
                <TabsTrigger
                  key={layer.layer}
                  value={layer.layer}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-500 data-[state=active]:bg-white data-[state=active]:text-blue-600"
                >
                  {`${String(index + 1).padStart(2, "0")} ${layer.layer}`}
                </TabsTrigger>
              ))}
            </TabsList>

            {TECH_STACK.layers.map((layer) => (
              <TabsContent
                key={layer.layer}
                value={layer.layer}
                className="mt-6"
              >
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {layer.layer}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {layer.tagline}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${
                        layer.status === "supplied"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-amber-200 bg-amber-50 text-amber-700"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`h-1.5 w-1.5 rounded-full ${
                          layer.status === "supplied"
                            ? "bg-emerald-500"
                            : "bg-amber-400"
                        }`}
                      />
                      {layer.status === "supplied"
                        ? "Supplied content"
                        : "Content to confirm"}
                    </span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {layer.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-slate-100 bg-slate-100 px-3 py-1.5 text-sm text-slate-600"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
