'use client';

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { FileCheck, UserPlus, Users } from "lucide-react";
import { CircuitBoard } from "@/components/fx/circuit-board";
import {
  CTASection,
  FeatureCard,
  GlassCard,
  LinkButton,
  PageHero,
  PageShell,
  Section,
  SectionHeading,
  StatBlock,
} from "@/components/site/blocks";
import { ENGAGEMENT_MODELS, HUBS, STATS } from "@/components/site/data";
import { ROUTES } from "@/components/site/nav";
import type { LucideIcon } from "lucide-react";

/* Local scroll-reveal wrapper — subtle, once. */
function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const ENGAGEMENT_ICONS: LucideIcon[] = [FileCheck, Users, UserPlus];

const ENGAGEMENT_ONE_LINERS: Record<string, string> = {
  "Fixed Scope": "A crisply bounded build — committed timeline, committed price, weekly demos from week one.",
  "Dedicated Pods": "A senior cross-functional pod that ramps in days and ships continuously against your roadmap.",
  "Staff Augmentation": "Vetted senior engineers embedded in your org, scaling month to month with a replacement guarantee.",
};

export function ServicesPage() {
  return (
    <>
      <PageHero
        vanta="net"
        eyebrow="Services"
        title="One partner across the entire modern stack."
        description="Senior pods spanning AI, data, cloud, and product engineering — from first strategy session to production scale. No vendor juggling, no handoff gaps, one accountable team."
      >
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <LinkButton href={`#${ROUTES.contact}`} variant="primary" size="lg">
            Discuss your roadmap
          </LinkButton>
          <LinkButton href={`#${ROUTES.engagement}`} variant="outline" size="lg">
            How engagements run
          </LinkButton>
        </div>
      </PageHero>

      {/* Circuit board centerpiece */}
      <Section className="pb-12 sm:pb-16">
        <PageShell>
          <Reveal>
            <div
              role="img"
              aria-label="Animated circuit board connecting Kramora AI's eight technical hubs into one delivery network"
              className="relative h-[380px] overflow-hidden rounded-3xl border border-slate-200 bg-white sm:h-[460px]"
            >
              <CircuitBoard className="h-full w-full" labels={HUBS.map((hub) => hub.name)} />
              <div className="absolute bottom-4 left-4 z-10 sm:bottom-6 sm:left-6">
                <GlassCard className="flex items-center gap-3 px-4 py-3 sm:px-5">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white"
                    aria-hidden="true"
                  >
                    8
                  </span>
                  <p className="text-sm font-medium text-slate-900">
                    8 technical hubs · one accountable team
                  </p>
                </GlassCard>
              </div>
            </div>
          </Reveal>
        </PageShell>
      </Section>

      {/* The 8 hubs */}
      <Section tone="tint">
        <PageShell>
          <SectionHeading
            eyebrow="The hubs"
            title="Eight specialities. One delivery spine."
            description="Every hub is a deep bench of senior engineers. Engagements draw across hubs as the work demands — so nothing gets lost between vendors, because there are none."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HUBS.map((hub, index) => (
              <Reveal key={hub.id} delay={(index % 4) * 0.06} className="h-full">
                <FeatureCard
                  icon={hub.icon}
                  title={hub.name}
                  description={hub.description}
                  href={hub.href}
                  tag={hub.tags[0]}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
        </PageShell>
      </Section>

      {/* Stats band */}
      <Section className="py-12 sm:py-16">
        <PageShell>
          <Reveal>
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-blue-50/40 px-6 py-10 sm:px-12 sm:py-14">
              <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
                {STATS.map((stat) => (
                  <StatBlock key={stat.label} value={stat.value} label={stat.label} sub={stat.sub} />
                ))}
              </div>
            </div>
          </Reveal>
        </PageShell>
      </Section>

      {/* How engagements run */}
      <Section tone="tint" className="pt-12 sm:pt-16">
        <PageShell>
          <SectionHeading
            eyebrow="Engagement models"
            title="How engagements run"
            description="Three ways to put a Kramora team on your roadmap — same senior bar, same weekly demo rhythm, different commercial shape."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ENGAGEMENT_MODELS.map((model, index) => (
              <Reveal key={model.name} delay={index * 0.07} className="h-full">
                <FeatureCard
                  icon={ENGAGEMENT_ICONS[index] ?? Users}
                  title={model.name}
                  description={ENGAGEMENT_ONE_LINERS[model.name] ?? model.description}
                  href={ROUTES.engagement}
                  tag={model.bestFor}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
        </PageShell>
      </Section>

      <CTASection
        title="Not sure which hub you need first?"
        description="Book a free 30-minute strategy call. We will map your highest-leverage starting point across the stack — and be blunt about what can wait."
        primaryLabel="Start a conversation"
        primaryHref={ROUTES.contact}
        secondaryLabel="Explore engagement models"
        secondaryHref={ROUTES.engagement}
      />
    </>
  );
}
