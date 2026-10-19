"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FAQ } from "@/lib/content";
import { useContactModal } from "@/lib/store";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Faq() {
  const open = useContactModal((state) => state.open);

  return (
    <section id="faq" className="relative bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Left column — intro + escalation card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              {FAQ.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {FAQ.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-500">
              Straight answers, no sales pitch.
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">
                Still curious?
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Skip the back-and-forth — talk directly to the people who
                would build it.
              </p>
              <Button
                variant="outline"
                className="mt-5 w-full sm:w-auto"
                onClick={open}
              >
                Talk to an engineer
                <ArrowRight aria-hidden />
              </Button>
            </div>
          </motion.div>

          {/* Right column — accordion */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            <div className="rounded-2xl border border-slate-200 bg-white px-6 shadow-sm">
              <Accordion type="single" collapsible className="w-full">
                {FAQ.items.map((item, index) => (
                  <AccordionItem
                    key={item.question}
                    value={`faq-${index}`}
                    className="border-slate-100"
                  >
                    <AccordionTrigger className="py-5 text-left text-base font-medium text-slate-900 hover:no-underline [&>svg]:text-blue-600">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-slate-500">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
