import {
  BrainCircuit,
  Database,
  Cloud,
  Globe,
  Smartphone,
  Workflow,
  ScanText,
  Users,
  HeartPulse,
  Landmark,
  ShieldCheck,
  Truck,
  ShoppingBag,
  Factory,
  Building2,
  Scale,
  GraduationCap,
  Zap,
  Signal,
  Building,
  type LucideIcon,
} from "lucide-react";
import { ROUTES } from "./nav";

/* ------------------------------------------------------------------ */
/* Site facts                                                          */
/* ------------------------------------------------------------------ */

export const STATS = [
  { value: "2–3×", label: "Faster delivery", sub: "vs. traditional agency cycles" },
  { value: "97%", label: "Client retention", sub: "partners who extend engagements" },
  { value: "24/7", label: "Delivery coverage", sub: "US + India follow-the-sun pods" },
  { value: "5.0", label: "Average rating", sub: "across 27+ partner teams" },
] as const;

export const LOGO_MARQUEE = [
  "Northwind Insurance",
  "Vertex FinTech",
  "Meridian Health",
  "Cascade Logistics",
  "Lumen Retail",
  "Apex Manufacturing",
  "Solstice Energy",
  "Harbor Legal",
  "Quantum Telecom",
  "Bluepeak Realty",
];

/* ------------------------------------------------------------------ */
/* The 8 technical hubs                                                */
/* ------------------------------------------------------------------ */

export interface Hub {
  id: string;
  icon: LucideIcon;
  name: string;
  short: string;
  description: string;
  href: string;
  tags: string[];
}

export const HUBS: Hub[] = [
  {
    id: "ai",
    icon: BrainCircuit,
    name: "AI & Generative AI",
    short: "ML, NLP, LLM apps, RAG, agents",
    description:
      "Custom machine learning, NLP, LLM applications, retrieval-augmented generation, and autonomous AI agents that reason over your data.",
    href: ROUTES.ai,
    tags: ["Machine Learning", "NLP", "LLM Apps", "RAG", "AI Agents"],
  },
  {
    id: "data",
    icon: Database,
    name: "Data Engineering",
    short: "ETL/ELT, streaming, warehousing",
    description:
      "Batch and streaming pipelines, warehouse and lakehouse architecture, and data models built for analytics and AI at scale.",
    href: ROUTES.dataCloud,
    tags: ["ETL / ELT", "Streaming", "Warehousing"],
  },
  {
    id: "cloud",
    icon: Cloud,
    name: "Cloud & DevOps",
    short: "Kubernetes, multi-cloud, SRE",
    description:
      "Kubernetes orchestration, multi-cloud architecture, and 24/7 delivery infrastructure with observability baked in.",
    href: ROUTES.dataCloud,
    tags: ["Kubernetes", "Multi-cloud", "CI/CD", "SRE"],
  },
  {
    id: "web",
    icon: Globe,
    name: "Web Development",
    short: "Next.js platforms & portals",
    description:
      "High-performance web platforms on Next.js and React — sub-second loads, accessibility, and design systems that scale.",
    href: ROUTES.webMobile,
    tags: ["Next.js", "React", "Design Systems"],
  },
  {
    id: "mobile",
    icon: Smartphone,
    name: "Mobile Development",
    short: "React Native for iOS & Android",
    description:
      "Native-quality React Native applications shipped from a single codebase, with OTA updates and offline-first data.",
    href: ROUTES.webMobile,
    tags: ["React Native", "iOS", "Android"],
  },
  {
    id: "automation",
    icon: Workflow,
    name: "Intelligent Automation",
    short: "Workflow automation, RPA, orchestration",
    description:
      "Workflow automation, robotic process automation, and agent orchestration that remove toil from operations.",
    href: ROUTES.webMobile,
    tags: ["Workflow Automation", "RPA", "Orchestration"],
  },
  {
    id: "ocr",
    icon: ScanText,
    name: "OCR & Document AI",
    short: "IDP and intelligent extraction",
    description:
      "Intelligent document processing — OCR, classification, and data extraction running at thousands of documents per hour.",
    href: ROUTES.ocrStaff,
    tags: ["IDP", "OCR", "Data Extraction"],
  },
  {
    id: "staff",
    icon: Users,
    name: "Staff Augmentation",
    short: "Dedicated teams & managed pods",
    description:
      "Senior engineers embedded in your org as dedicated teams or fully managed pods — ramped in days, retained for years.",
    href: ROUTES.ocrStaff,
    tags: ["Dedicated Teams", "Managed Pods"],
  },
];

/* ------------------------------------------------------------------ */
/* Case studies                                                        */
/* ------------------------------------------------------------------ */

export interface CaseStudy {
  industry: string;
  title: string;
  summary: string;
  metric: string;
  metricLabel: string;
  metrics: { value: string; label: string }[];
  tags: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    industry: "Insurance",
    title: "Generative AI underwriting intelligence",
    summary:
      "A national insurer processed underwriting submissions manually across siloed systems. We built a Gen AI pipeline that classifies, extracts, and summarizes submission documents — with human-in-the-loop review and full audit trails.",
    metric: "4,200/hr",
    metricLabel: "documents processed",
    metrics: [
      { value: "81%", label: "less manual review" },
      { value: "6 wks", label: "to production" },
      { value: "99.2%", label: "extraction accuracy" },
    ],
    tags: ["Generative AI", "Document AI", "RAG"],
  },
  {
    industry: "FinTech",
    title: "Real-time risk data platform",
    summary:
      "A payments platform needed sub-second risk decisions across billions of events. We re-architected their pipeline to a streaming lakehouse with feature stores serving both analytics and ML inference.",
    metric: "40ms",
    metricLabel: "p99 decision latency",
    metrics: [
      { value: "3.4B", label: "events per day" },
      { value: "99.99%", label: "platform uptime" },
      { value: "5 wks", label: "zero-downtime migration" },
    ],
    tags: ["Data Engineering", "Streaming", "ML"],
  },
  {
    industry: "Healthcare",
    title: "Claims automation with Document AI",
    summary:
      "A regional health network drowning in claims paperwork. Our IDP stack digitizes intake, auto-adjudicates clean claims, and routes exceptions with explainability for compliance teams.",
    metric: "92%",
    metricLabel: "straight-through processing",
    metrics: [
      { value: "4×", label: "faster adjudication" },
      { value: "HIPAA", label: "aligned workflows" },
      { value: "12 wks", label: "network-wide rollout" },
    ],
    tags: ["OCR", "IDP", "Healthcare"],
  },
  {
    industry: "Logistics",
    title: "Autonomous operations control tower",
    summary:
      "A global freight carrier ran dispatch on spreadsheets and phone calls. We shipped an AI control tower that orchestrates loads, predicts exceptions, and automates customer communication.",
    metric: "38%",
    metricLabel: "operating cost reduction",
    metrics: [
      { value: "24/7", label: "autonomous coverage" },
      { value: "500+", label: "workflows automated" },
      { value: "0", label: "downtime cutovers" },
    ],
    tags: ["Automation", "Agents", "Orchestration"],
  },
];

/* ------------------------------------------------------------------ */
/* Insights / articles                                                 */
/* ------------------------------------------------------------------ */

export interface Article {
  title: string;
  category: string;
  description: string;
  tag: string;
  readTime: string;
  date: string;
}

export const ARTICLES: Article[] = [
  {
    title: "Beyond the Chatbot: Where AI Actually Creates Value",
    category: "AI Strategy",
    description:
      "Chat interfaces are the tip of the iceberg. The durable returns live in document processing, decision automation, and domain-specific copilots wired into your systems of record.",
    tag: "Strategy",
    readTime: "6 min read",
    date: "May 2025",
  },
  {
    title: "The Data Foundation: Why AI Projects Fail Before They Start",
    category: "Data Engineering",
    description:
      "Most failed AI initiatives were never AI problems. Untidy pipelines, unowned datasets, and missing lineage quietly cap what any model can do for you.",
    tag: "Data",
    readTime: "8 min read",
    date: "Apr 2025",
  },
  {
    title: "RAG in Regulated Industries: Getting Gen AI Past Compliance",
    category: "AI Engineering",
    description:
      "Retrieval-augmented generation is how regulated teams ship Gen AI safely: grounded answers, cited sources, and permission-aware retrieval by design.",
    tag: "RAG",
    readTime: "7 min read",
    date: "Mar 2025",
  },
  {
    title: "Shipping ML: From Notebook to Production in Six Weeks",
    category: "MLOps",
    description:
      "A field-tested path from experimentation to monitored production inference — feature stores, CI for models, and rollback plans that actually work.",
    tag: "MLOps",
    readTime: "9 min read",
    date: "Feb 2025",
  },
  {
    title: "Build vs. Augment: Choosing Your AI Delivery Model",
    category: "AI Strategy",
    description:
      "Fixed scope, dedicated pods, or staff augmentation? A decision framework based on outcome clarity, internal maturity, and how fast you need to compound.",
    tag: "Delivery",
    readTime: "5 min read",
    date: "Jan 2025",
  },
];

/* ------------------------------------------------------------------ */
/* Testimonials & FAQ                                                  */
/* ------------------------------------------------------------------ */

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Kramora shipped in six weeks what our previous vendor couldn't in six months. The underwriting pipeline now clears 4,200 documents an hour — our actuaries finally do actuarial work again.",
    name: "Priya S.",
    role: "VP of Engineering",
    company: "Northwind Insurance",
    initials: "PS",
  },
  {
    quote:
      "The rare agency that argues with you — respectfully, with data. They cut our risk-decision latency to 40 milliseconds and our infra spend by a third in the same quarter.",
    name: "Daniel R.",
    role: "Chief Technology Officer",
    company: "Vertex FinTech",
    initials: "DR",
  },
  {
    quote:
      "Their pod feels like our own senior team, not a vendor. Same standups, same standards, zero hand-holding. Two years in and still our most productive squad.",
    name: "Meera K.",
    role: "Head of Data Platform",
    company: "Meridian Health",
    initials: "MK",
  },
  {
    quote:
      "We came for a Document AI pilot and stayed for the automation program. 92% of our claims now process straight through, and compliance signed off without a single exception.",
    name: "James T.",
    role: "COO",
    company: "Cascade Logistics",
    initials: "JT",
  },
  {
    quote:
      "The 97% retention number is real — every engagement we've started with Kramora has been extended. They treat your roadmap like their own P&L.",
    name: "Elena V.",
    role: "Chief Product Officer",
    company: "Lumen Retail",
    initials: "EV",
  },
  {
    quote:
      "Transparent, fast, and genuinely senior. Weekly demos, honest tradeoffs, and a production-grade agent platform delivered while our internal team was still writing requirements.",
    name: "Arjun M.",
    role: "Director of Operations",
    company: "Apex Manufacturing",
    initials: "AM",
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: "How quickly can we get started?",
    answer:
      "Discovery calls happen within 24 hours of outreach. Fixed-scope and pod engagements typically kick off within five business days of signature — with a named senior lead, a shared workspace, and a working backlog from week one.",
  },
  {
    question: "What does a typical engagement look like?",
    answer:
      "Four moves: Discover (we map outcomes and constraints), Design (architecture and success metrics), Build (weekly demo-driven delivery), and Scale (hardening, monitoring, and 24/7 coverage). You see working software every single week.",
  },
  {
    question: "How do you handle data security and compliance?",
    answer:
      "NDA-first onboarding, SOC 2-aligned delivery practices, region-pinned infrastructure, and audit trails on every automated decision. For regulated work we deploy permission-aware RAG with human-in-the-loop review by default.",
  },
  {
    question: "Fixed scope, pods, or staff augmentation — which fits us?",
    answer:
      "If the outcome is crisply defined, fixed scope de-risks your budget. If you're compounding on a multi-quarter roadmap, a dedicated pod is the velocity play. If you have strong internal leads and need senior horsepower, augmentation slots straight into your org chart.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Nothing gets thrown over a wall. Production systems get monitoring, model drift alerts, SLAs, and a 24/7 follow-the-sun support path across our Issaquah and Bengaluru hubs. 97% of our partners extend past their first launch.",
  },
];

/* ------------------------------------------------------------------ */
/* Engagement models                                                   */
/* ------------------------------------------------------------------ */

export interface EngagementModel {
  name: string;
  bestFor: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    name: "Fixed Scope",
    bestFor: "Defined outcomes",
    description:
      "A crisply bounded build with a committed timeline and price. You approve scope, we own delivery — change requests handled transparently.",
    features: [
      "Outcome-based statement of work",
      "Committed timeline and budget",
      "Weekly demos from week one",
      "UAT, handover, and 30-day warranty",
    ],
  },
  {
    name: "Dedicated Pods",
    bestFor: "Compounding velocity",
    description:
      "A cross-functional senior pod — engineers, data, AI, QA — that ramps in days and ships continuously against your roadmap.",
    features: [
      "Senior-only pod composition",
      "Backlog-driven weekly delivery",
      "Scaled team size on demand",
      "Retainer pricing, pause anytime",
      "Direct Slack and shared rituals",
    ],
    popular: true,
  },
  {
    name: "Staff Augmentation",
    bestFor: "Elastic capacity",
    description:
      "Vetted senior engineers embedded directly into your org. You lead; we supply the horsepower — with a bench that scales in both directions.",
    features: [
      "Engineers in your tools & rituals",
      "Skills-matched in under a week",
      "Simple monthly per-seat pricing",
      "Two-week rolling replacement guarantee",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Industries (12 verticals)                                           */
/* ------------------------------------------------------------------ */

export interface Industry {
  name: string;
  icon: LucideIcon;
  blurb: string;
}

export const INDUSTRIES: Industry[] = [
  { name: "Healthcare", icon: HeartPulse, blurb: "Claims automation, clinical document AI, HIPAA-aligned pipelines." },
  { name: "FinTech", icon: Landmark, blurb: "Real-time risk platforms, fraud ML, streaming market data." },
  { name: "Insurance", icon: ShieldCheck, blurb: "Underwriting Gen AI, submission ingestion, actuarial copilots." },
  { name: "Logistics & Supply Chain", icon: Truck, blurb: "Control towers, autonomous dispatch, exception prediction." },
  { name: "Retail & E-commerce", icon: ShoppingBag, blurb: "Demand forecasting, personalization engines, ops automation." },
  { name: "Manufacturing", icon: Factory, blurb: "Predictive maintenance, vision QC, supplier document AI." },
  { name: "Real Estate", icon: Building2, blurb: "Deal-room intelligence, lease abstraction, portfolio analytics." },
  { name: "Legal", icon: Scale, blurb: "Contract review AI, discovery pipelines, citation-grounded RAG." },
  { name: "Education", icon: GraduationCap, blurb: "Adaptive learning platforms, assessment automation." },
  { name: "Energy & Utilities", icon: Zap, blurb: "Grid analytics, asset intelligence, compliance reporting." },
  { name: "Telecom", icon: Signal, blurb: "Network assurance ML, churn prediction, billing automation." },
  { name: "Public Sector", icon: Building, blurb: "Citizen service automation, records digitization." },
];

/* ------------------------------------------------------------------ */
/* Technology stack (8 layers)                                         */
/* ------------------------------------------------------------------ */

export interface TechLayer {
  layer: string;
  tagline: string;
  items: string[];
}

export const TECH_LAYERS: TechLayer[] = [
  {
    layer: "Frontend",
    tagline: "Interfaces that feel instant",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "React Native", "Framer Motion"],
  },
  {
    layer: "Backend",
    tagline: "APIs and services built to last",
    items: ["Node.js", "Python", "FastAPI", "GraphQL", "gRPC", "REST"],
  },
  {
    layer: "AI / ML",
    tagline: "Models that earn their keep",
    items: ["PyTorch", "TensorFlow", "scikit-learn", "Hugging Face", "LangChain", "Vector DBs"],
  },
  {
    layer: "AI Tools",
    tagline: "The Gen AI production stack",
    items: ["OpenAI", "Anthropic", "RAG pipelines", "LLM ops", "Evaluation harnesses", "Guardrails"],
  },
  {
    layer: "Data Engineering",
    tagline: "Pipelines you can trust",
    items: ["Airflow", "dbt", "Kafka", "Spark", "Flink", "Iceberg"],
  },
  {
    layer: "Cloud",
    tagline: "Multi-cloud by design",
    items: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform", "Serverless"],
  },
  {
    layer: "Blockchain",
    tagline: "Where provenance matters",
    items: ["Solidity", "Ethereum", "Smart contracts", "Audits", "Wallet infra"],
  },
  {
    layer: "DevOps",
    tagline: "Ship daily, sleep nightly",
    items: ["CI/CD", "GitHub Actions", "Observability", "SRE", "FinOps", "Security scanning"],
  },
];

/* ------------------------------------------------------------------ */
/* Process (4 moves)                                                   */
/* ------------------------------------------------------------------ */

export interface ProcessStep {
  title: string;
  description: string;
  duration: string;
  tag: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Discover",
    description:
      "We embed with your team to map outcomes, constraints, and the data reality on the ground. You get a ruthless scope and a success metric everyone signs.",
    duration: "Weeks 0–2",
    tag: "Alignment",
  },
  {
    title: "Design",
    description:
      "Architecture, data contracts, and delivery plan — reviewed with your engineers, not handed down. Risks surface now, while they're cheap.",
    duration: "Weeks 2–4",
    tag: "Blueprint",
  },
  {
    title: "Build",
    description:
      "Weekly demos of working software. The pod ships in vertical slices, so every week something real moves closer to production.",
    duration: "Weeks 4–10",
    tag: "Velocity",
  },
  {
    title: "Scale",
    description:
      "Hardening, observability, model monitoring, and 24/7 follow-the-sun coverage across our Issaquah and Bengaluru hubs. Then we compound.",
    duration: "Ongoing",
    tag: "Reliability",
  },
];

/* ------------------------------------------------------------------ */
/* Principles (4)                                                      */
/* ------------------------------------------------------------------ */

export interface Principle {
  title: string;
  description: string;
}

export const PRINCIPLES: Principle[] = [
  {
    title: "AI-first",
    description:
      "Every engagement starts from what intelligence could do — not from what software used to do. We default to automating decisions, not just digitizing forms.",
  },
  {
    title: "Senior talent",
    description:
      "No pyramids, no junior benches. The people who scope your work are the people who build it — senior engineers who have shipped production AI before.",
  },
  {
    title: "Outcome-obsessed",
    description:
      "We sign up for metrics — documents per hour, decision latency, retention — and report against them weekly. Activity is not a deliverable.",
  },
  {
    title: "Transparent & fast",
    description:
      "Shared backlogs, weekly demos, honest tradeoffs. You'll know the state of your project every Friday — without asking.",
  },
];
