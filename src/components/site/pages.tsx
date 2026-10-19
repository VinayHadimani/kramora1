import type { ComponentType } from "react";
import { LandingPage } from "@/components/pages/landing";
import { ServicesPage } from "@/components/pages/services";
import { AiServicePage } from "@/components/pages/service-ai";
import { DataCloudServicePage } from "@/components/pages/service-data-cloud";
import { WebMobileServicePage } from "@/components/pages/service-web-mobile";
import { OcrStaffServicePage } from "@/components/pages/service-ocr-staff";
import { AboutPage } from "@/components/pages/about";
import { ProcessPage } from "@/components/pages/process";
import { TechStackPage } from "@/components/pages/tech-stack";
import { IndustriesPage } from "@/components/pages/industries";
import { CaseStudiesPage } from "@/components/pages/case-studies";
import { InsightsPage } from "@/components/pages/insights";
import { EngagementPage } from "@/components/pages/engagement";
import { TestimonialsPage } from "@/components/pages/testimonials";
import { ContactPage } from "@/components/pages/contact";
import { PrivacyPage } from "@/components/pages/privacy";
import { TermsPage } from "@/components/pages/terms";
import { NotFoundPage } from "@/components/pages/not-found";

export interface PageMeta {
  title: string;
  component: ComponentType;
}

export const PAGES: Record<string, PageMeta> = {
  "/": {
    title: "Kramora AI — We build intelligent products that scale",
    component: LandingPage,
  },
  "/services": {
    title: "Services — One partner across the modern stack | Kramora AI",
    component: ServicesPage,
  },
  "/services/ai": {
    title: "AI & Generative AI — ML, LLM Apps, RAG, Agents | Kramora AI",
    component: AiServicePage,
  },
  "/services/data-cloud": {
    title: "Data Engineering & Cloud — Pipelines, Kubernetes | Kramora AI",
    component: DataCloudServicePage,
  },
  "/services/web-mobile": {
    title: "Web, Mobile & Automation — Products & RPA | Kramora AI",
    component: WebMobileServicePage,
  },
  "/services/ocr-staff": {
    title: "OCR, Document AI & Staff Augmentation | Kramora AI",
    component: OcrStaffServicePage,
  },
  "/about": {
    title: "About Us — AI-First. Innovation-Driven. | Kramora AI",
    component: AboutPage,
  },
  "/process": {
    title: "Our Process — Discover, Design, Build, Scale | Kramora AI",
    component: ProcessPage,
  },
  "/tech-stack": {
    title: "Technology Stack — The 8-Layer Matrix | Kramora AI",
    component: TechStackPage,
  },
  "/industries": {
    title: "Industries — 12 Verticals, Deeply Understood | Kramora AI",
    component: IndustriesPage,
  },
  "/case-studies": {
    title: "Case Studies — Outcomes We've Shipped | Kramora AI",
    component: CaseStudiesPage,
  },
  "/insights": {
    title: "Insights Hub — Field Notes from Applied AI | Kramora AI",
    component: InsightsPage,
  },
  "/engagement": {
    title: "Engagement Models — Pods, Fixed Scope, Staff | Kramora AI",
    component: EngagementPage,
  },
  "/testimonials": {
    title: "Testimonials & FAQ — What Partners Say | Kramora AI",
    component: TestimonialsPage,
  },
  "/contact": {
    title: "Let's Build — Contact Kramora AI",
    component: ContactPage,
  },
  "/privacy": {
    title: "Privacy Policy | Kramora AI",
    component: PrivacyPage,
  },
  "/terms": {
    title: "Terms of Service | Kramora AI",
    component: TermsPage,
  },
};

export const NOT_FOUND: PageMeta = {
  title: "404 — Page not found | Kramora AI",
  component: NotFoundPage,
};

export function getPage(route: string): PageMeta {
  return PAGES[route] ?? NOT_FOUND;
}
