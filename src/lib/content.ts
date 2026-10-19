/**
 * Kramora AI — centralized site content.
 * Extracted from "Kramora AI Homepage Content Architecture" (client PDF).
 * Statistical claims marked [VERIFY] are pending client confirmation (see TODO.md).
 */

export const BRAND = {
  name: "Kramora AI",
  legalName: "Kramora AI Technology",
  tagline: "Innovate · Integrate · Inspire",
  motto: "AI-First. Innovation-Driven. Built for Growth.",
} as const;

export const ANNOUNCEMENT = {
  message: "Now booking Q3 engagements — limited capacity for new AI builds",
  support: "We reply within 24 hours",
} as const;

export const NAV_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Technology", href: "#technology" },
  { label: "Work", href: "#work" },
  { label: "Insights", href: "#insights" },
  { label: "Contact Us", href: "#contact" },
] as const;

/* ------------------------------- SEC 01 HERO ------------------------------ */

export const HERO = {
  eyebrow: "AI-First Technology Studio",
  headlineStaticA: "We build",
  morphWords: ["Intelligent Products", "Data Platforms", "Autonomous Systems"],
  headlineStaticB: "that scale.",
  subheadline:
    "Kramora designs and engineers intelligent products, data platforms and autonomous systems — helping startups and enterprises turn artificial intelligence into real, durable advantage.",
  primaryCta: "Book a consultation",
  secondaryCta: "Explore solutions",
  secondaryCtaHref: "#services",
  rating: "5.0" /* [VERIFY] star rating source */,
  trustedBy: "Trusted by 27+ teams worldwide" /* [VERIFY] */,
  capabilityNodes: [
    { title: "AI & ML", detail: "Agents, LLMs, RAG" },
    { title: "Automation", detail: "Workflows, RPA" },
    { title: "Cloud", detail: "AWS, Azure, GCP" },
  ],
  engineCard: {
    title: "Kramora Intelligence",
    liveLabel: "Active",
    performanceLabel: "Model performance — last 24h",
    performanceValue: "+34%" /* [VERIFY] */,
    statusLine: "Intelligent automation engine",
    models: "12 models" /* [VERIFY] */,
    pipelines: "4 pipelines running" /* [VERIFY] */,
  },
} as const;

/* ------------------------------ SEC 02 TRUSTED ---------------------------- */

export const TRUSTED_LOGOS = [
  "Aspenware",
  "CadenceMD",
  "Daysaver",
  "EMI Health",
  "GCommerce",
  "MyCustomerData",
  "Nev's Ink",
  "Washington Publishing",
  "ProStar",
  "Geocorp",
  "Rocky Mountain HP",
] as const;

/* ------------------------------- SEC 03 ABOUT ----------------------------- */

export const ABOUT = {
  eyebrow: "About Us",
  heading: "A technology & innovation company, built for growth.",
  body: "Kramora AI helps businesses transform ideas into intelligent digital products. With a strong engineering presence in India and strategic leadership from the United States, we specialize in AI automation, cloud technologies, web and mobile applications, blockchain solutions, and enterprise software development. Our mission is simple: build innovative technology that creates measurable business impact.",
  yearsPlaceholder: "[X]+" /* [VERIFY] client to supply actual years */,
  yearsLabel: "Years building intelligent systems",
  teamsLabel: "27+ teams served worldwide" /* [VERIFY] */,
  ctaLabel: "Discover Our Story",
  ctaHref: "#process",
} as const;

export const PRINCIPLES = [
  {
    number: "01",
    title: "AI-first by default",
    description:
      "Intelligence baked into the architecture — not bolted on at the end.",
  },
  {
    number: "02",
    title: "Senior, in-house talent",
    description: "No outsourced black boxes. Builders who own the outcome.",
  },
  {
    number: "03",
    title: "Outcome-obsessed",
    description:
      "We measure success in business impact, not slide counts.",
  },
  {
    number: "04",
    title: "Transparent & fast",
    description:
      "Weekly demos, clear communication, momentum from week one.",
  },
] as const;

/* ------------------------------ SEC 04 SERVICES --------------------------- */

export const SERVICES = {
  eyebrow: "Services",
  heading: "One partner across the entire modern stack.",
  subheading:
    "From generative-AI agents to data platforms, cloud infrastructure and managed engineering pods — the capability of a global consultancy, with startup velocity.",
  items: [
    {
      number: "01",
      title: "Artificial Intelligence",
      description:
        "ML models, computer vision, predictive analytics and NLP — engineered for production scale.",
      tags: ["Vision", "Predictive", "NLP", "MLOps"],
    },
    {
      number: "02",
      title: "Generative AI & Agents",
      description:
        "LLM applications, autonomous AI agents and RAG systems grounded in your own data.",
      tags: ["Agents", "RAG", "LLM Apps", "Fine-tuning"],
    },
    {
      number: "03",
      title: "Data Engineering",
      description:
        "Pipelines, warehouses and real-time streaming that turn raw data into a trusted asset.",
      tags: ["ETL/ELT", "Streaming", "Warehousing"],
    },
    {
      number: "04",
      title: "Web & Mobile Apps",
      description:
        "High-performance web platforms and native-grade mobile apps, engineered with elite quality.",
      tags: ["Next.js", "React Native", "Enterprise"],
    },
    {
      number: "05",
      title: "DevOps & Cloud",
      description:
        "Cloud-native architecture, Kubernetes, infrastructure as code, and CI/CD across AWS, Azure, GCP.",
      tags: ["Kubernetes", "Terraform", "Multi-cloud"],
    },
    {
      number: "06",
      title: "OCR & Document AI",
      description:
        "Intelligent document processing that turns unstructured paperwork into structured, usable data.",
      tags: ["IDP", "OCR", "Data Extraction"],
    },
    {
      number: "07",
      title: "Enterprise Automation",
      description:
        "Workflow automation and intelligent orchestration that removes manual, repetitive work.",
      tags: ["Workflow", "RPA", "Orchestration"],
    },
    {
      number: "08",
      title: "IT Staff Augmentation",
      description:
        "Dedicated developers, offshore teams and managed pods that plug straight into your roadmap.",
      tags: ["Dedicated Teams", "Pods", "Offshore"],
    },
  ],
} as const;

/* ----------------------------- SEC 05 SOLUTIONS --------------------------- */

export const SOLUTIONS = {
  eyebrow: "Solutions",
  heading: "Solutions mapped to business outcomes.",
  distinction:
    "Services are what Kramora builds. Solutions are why clients hire us — outcomes first, technology second.",
  items: [
    {
      title: "Build AI-Powered Products",
      description:
        "Turn ideas into intelligent applications, AI agents, and data-driven products.",
    },
    {
      title: "Automate Business Operations",
      description:
        "Reduce repetitive manual work through intelligent workflows and orchestration.",
    },
    {
      title: "Modernize Cloud Infrastructure",
      description:
        "Improve deployment, scalability, reliability, and cloud operations.",
    },
    {
      title: "Unlock Business Data",
      description:
        "Build reliable data pipelines and turn fragmented information into usable insights.",
    },
    {
      title: "Transform Document-Heavy Processes",
      description:
        "Extract and process information from documents using OCR and Document AI.",
    },
    {
      title: "Extend Engineering Capacity",
      description:
        "Add experienced engineering talent through dedicated teams and managed pods.",
    },
  ],
} as const;

/* ------------------------------ SEC 06 PROCESS ---------------------------- */

export const PROCESS = {
  eyebrow: "How We Work",
  heading: "From idea to production — in four moves.",
  steps: [
    {
      date: "Step 01",
      title: "Discover",
      content:
        "We pressure-test the idea, map the data, and define what success actually measures.",
    },
    {
      date: "Step 02",
      title: "Design",
      content:
        "Architecture, UX and an AI strategy that's feasible and durable — not just impressive in a demo.",
    },
    {
      date: "Step 03",
      title: "Build",
      content:
        "Senior pods ship working software every week, with you in the loop at every step.",
    },
    {
      date: "Step 04",
      title: "Scale",
      content:
        "We harden, monitor and optimize for production — then help you grow the team around it.",
    },
  ],
} as const;

/* ---------------------------- SEC 07 WHY KRAMORA -------------------------- */

export const WHY = {
  eyebrow: "Why Kramora",
  heading: "We get things done — right, and fast.",
  stats: [
    {
      value: "2-3×",
      unit: "Faster",
      label: "Speed Advantage" /* [VERIFY] */,
      description:
        "Senior, AI-fluent engineers who ship working software every week — not 80-slide decks.",
    },
    {
      value: "97%",
      unit: "Retention",
      label: "Client Retention" /* [VERIFY] 97% vs 96% conflict */,
      description:
        "Nearly all of our clients return for their next build with us.",
    },
    {
      value: "24/7",
      unit: "Delivery",
      label: "Global Delivery Model" /* [VERIFY] */,
      description:
        "Distributed pods across 22 countries keep your roadmap moving around the clock.",
    },
  ],
  footnote:
    "Performance statistics pending final client verification.",
} as const;

/* ----------------------------- SEC 08 INDUSTRIES -------------------------- */

export const INDUSTRIES = {
  eyebrow: "Industry Expertise",
  heading: "Domain depth that turns tech into outcomes.",
  ticker: [
    "Healthcare",
    "FinTech",
    "Insurance",
    "Retail & E-com",
    "Logistics",
    "Education",
    "Government",
    "Manufacturing",
    "Real Estate",
    "Energy",
    "Travel",
    "Media",
  ],
  items: [
    { title: "Healthcare", detail: "HIPAA-ready clinical AI" },
    { title: "FinTech", detail: "Risk fraud & underwriting" },
    { title: "Insurance", detail: "Claims & policy automation" },
    { title: "Retail & E-com", detail: "Personalization at scale" },
    { title: "Logistics", detail: "Routing & forecasting" },
    { title: "Education", detail: "Adaptive learning" },
    { title: "Government", detail: "Secure, compliant systems" },
    { title: "Manufacturing", detail: "Predictive maintenance" },
    { title: "Real Estate", detail: "Deal & document automation" },
    { title: "Energy", detail: "Grid & asset intelligence" },
    { title: "Travel", detail: "Dynamic pricing & booking" },
    { title: "Media", detail: "Content & recommendation AI" },
  ],
} as const;

/* ----------------------------- SEC 09 TECH STACK -------------------------- */

export const TECH_STACK = {
  eyebrow: "Technology",
  heading: "The right tool for every layer.",
  intro: "Interfaces that load fast and feel instant.",
  layers: [
    {
      layer: "Frontend",
      status: "supplied" as const,
      tagline: "Interfaces that load fast and feel instant.",
      tools: [
        "React",
        "Next.js 15",
        "Angular",
        "Vue",
        "Svelte",
        "TypeScript",
        "Tailwind",
        "Framer Motion",
        "Redux",
        "Three.js",
      ],
    },
    {
      layer: "Backend",
      status: "confirm" as const,
      tagline: "APIs and services built for scale.",
      tools: ["APIs", "Microservices", "Node / Python / Go"],
    },
    {
      layer: "AI / ML",
      status: "confirm" as const,
      tagline: "Models engineered for production.",
      tools: ["PyTorch", "TensorFlow", "OpenCV"],
    },
    {
      layer: "AI Tools & Platforms",
      status: "confirm" as const,
      tagline: "The modern LLMOps ecosystem.",
      tools: ["LangChain", "LlamaIndex", "Pinecone"],
    },
    {
      layer: "Data Engineering",
      status: "confirm" as const,
      tagline: "Pipelines that keep AI honest.",
      tools: ["Spark", "Snowflake", "dbt", "Kafka"],
    },
    {
      layer: "Cloud",
      status: "confirm" as const,
      tagline: "Multi-cloud, no lock-in.",
      tools: ["AWS", "Azure", "Google Cloud Platform"],
    },
    {
      layer: "Blockchain",
      status: "confirm" as const,
      tagline: "Web3 when it earns its place.",
      tools: ["Solidity", "Web3.js", "Smart Contracts"],
    },
    {
      layer: "DevOps",
      status: "confirm" as const,
      tagline: "Ship fast, sleep well.",
      tools: ["Docker", "Kubernetes", "Terraform", "CI/CD"],
    },
  ],
} as const;

/* ---------------------------- SEC 10 ENGAGEMENT --------------------------- */

export const ENGAGEMENT = {
  eyebrow: "Engagement Models",
  heading: "Work with us, your way.",
  models: [
    {
      name: "Fixed Scope",
      badge: "Project Delivery",
      highlight: false,
      description:
        "A defined build, shipped end to end. Ideal when you know the destination and want it done right.",
      features: [
        "Clear fixed scope & timeline",
        "Full design-to-deploy ownership",
        "Predictable milestone-based pricing",
      ],
    },
    {
      name: "Dedicated Pods",
      badge: "Most Popular",
      highlight: true,
      description:
        "A senior, cross-functional team embedded in your roadmap — scaling up or down as you grow.",
      features: [
        "Senior cross-functional team",
        "Scales up or down dynamically",
        "Direct daily collaboration",
      ],
    },
    {
      name: "Staff Augmentation",
      badge: "Flexible",
      highlight: false,
      description:
        "Plug elite AI full-stack, cloud or data engineers straight into your existing team.",
      features: [
        "Vetted senior engineers",
        "Plugs into existing team",
        "Start in days, not months",
      ],
    },
  ],
} as const;

/* ---------------------------- SEC 11 CASE STUDIES ------------------------- */

export const CASE_STUDIES = {
  eyebrow: "Featured Work",
  heading: "Measurable impact, not just deliverables.",
  ctaLabel: "All case studies",
  items: [
    {
      eyebrow: "Insurance · Generative AI",
      title: "Document-intelligence platform",
      description:
        "Replaced manual claims data-entry with an AI document pipeline — cutting processing time dramatically while improving accuracy.",
      metric: "4.2k documents/hour processed",
      placeholder: false,
    },
    {
      eyebrow: "Healthcare · Data Engineering",
      title: "Clinical data platform",
      description:
        "Case study in progress — detailed metrics and outcomes to be supplied by client before launch.",
      metric: "[Metric pending client confirmation]",
      placeholder: true,
    },
    {
      eyebrow: "FinTech · Cloud & DevOps",
      title: "Multi-cloud modernization program",
      description:
        "Case study in progress — detailed metrics and outcomes to be supplied by client before launch.",
      metric: "[Metric pending client confirmation]",
      placeholder: true,
    },
    {
      eyebrow: "Logistics · Enterprise Automation",
      title: "Autonomous operations cockpit",
      description:
        "Case study in progress — detailed metrics and outcomes to be supplied by client before launch.",
      metric: "[Metric pending client confirmation]",
      placeholder: true,
    },
  ],
} as const;

/* --------------------------- SEC 12 GLOBAL PRESENCE ----------------------- */

export const GLOBAL_PRESENCE = {
  eyebrow: "Global Delivery Model",
  heading: "US-led, India-engineered, globally connected.",
  body: "Strategic leadership in the United States, an engineering hub in India, and partners in Europe — one connected team delivering around the clock.",
  regions: [
    {
      region: "United States",
      role: "Strategic Leadership",
      locations: "Los Angeles · Chicago · Atlanta · Issaquah (WA)",
    },
    {
      region: "India",
      role: "Core Engineering Hub",
      locations: "Delhi & Bengaluru Development Centers",
    },
    {
      region: "Europe",
      role: "Connected Network",
      locations: "Germany & The Netherlands delivery partners",
    },
  ],
} as const;

/* ---------------------------- SEC 13 TESTIMONIALS ------------------------- */

export const TESTIMONIALS = {
  eyebrow: "Client Retention",
  heading: "From the CTOs & founders we've delivered for.",
  note: "Client retention — from the CTOs & founders we've delivered for." /* 96% vs 97% conflict flagged */,
  items: [
    {
      quote:
        "They designed and implemented a complex integration for a large sports organization — professional, thorough and reliable at every step.",
      name: "Stacy Heidte",
      title: "Project Manager",
      company: "Aspenware",
    },
    {
      quote:
        "As an early-stage Seattle startup, we relied on the team to design and build a key technology component. Outstanding quality and partnership.",
      name: "Bonnie Cech",
      title: "Founder & CEO",
      company: "CadenceMD",
    },
    {
      quote:
        "They architected and delivered crucial cloud components for our platform. Their Azure expertise was exactly what we needed.",
      name: "Phil Brock",
      title: "CTO",
      company: "Daysaver Inc.",
    },
    {
      quote:
        "They kept us compliant with difficult new CMS guidelines as we took on federal exchange business. Their healthcare integration expertise was critical.",
      name: "Joe Campbell",
      title: "CIO",
      company: "EMI Health",
    },
    {
      quote:
        "The relationship has been enormously beneficial — the quality of work and depth of Azure integration expertise is simply unmatched.",
      name: "Jason Popillion",
      title: "CTO",
      company: "GCommerce Inc.",
    },
    {
      quote:
        "They migrated 50+ applications from our data center to Azure — full complexity handled with precision, zero disruption.",
      name: "Jim Yanco",
      title: "President",
      company: "MyCustomerData",
    },
  ],
} as const;

/* -------------------------------- SEC 14 FAQ ------------------------------ */

export const FAQ = {
  eyebrow: "FAQ",
  heading: "Questions, answered.",
  items: [
    {
      question: "What does “AI-first” actually mean for my project?",
      answer:
        "Answer content to be confirmed by client. Lorem ipsum dolor sit amet, consectetur adipiscing elit — placeholder copy pending final approval from Kramora AI leadership.",
    },
    {
      question: "How quickly can you start?",
      answer:
        "Answer content to be confirmed by client. Lorem ipsum dolor sit amet, consectetur adipiscing elit — placeholder copy pending final approval from Kramora AI leadership.",
    },
    {
      question: "Do you work alongside our existing in-house team?",
      answer:
        "Answer content to be confirmed by client. Lorem ipsum dolor sit amet, consectetur adipiscing elit — placeholder copy pending final approval from Kramora AI leadership.",
    },
    {
      question: "How do you handle data security and compliance?",
      answer:
        "Answer content to be confirmed by client. Lorem ipsum dolor sit amet, consectetur adipiscing elit — placeholder copy pending final approval from Kramora AI leadership.",
    },
    {
      question:
        "What if I only need a couple of engineers, not a full project?",
      answer:
        "Answer content to be confirmed by client. Lorem ipsum dolor sit amet, consectetur adipiscing elit — placeholder copy pending final approval from Kramora AI leadership.",
    },
  ],
} as const;

/* ------------------------------ SEC 15 INSIGHTS --------------------------- */

export const INSIGHTS = {
  eyebrow: "Insights",
  heading: "Ideas from the frontier of applied AI.",
  subheading:
    "Field notes, engineering deep-dives and strategy from the team — written by the people doing the building.",
  ctaLabel: "Visit Insights Hub",
  articles: [
    {
      eyebrow: "Generative AI",
      title: "Beyond the chatbot: designing AI agents that actually do the work",
      excerpt:
        "Most enterprise AI projects still live at the demo stage. We unpack the architecture patterns that change that.",
      readTime: "9 min read",
      category: "Engineering",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      eyebrow: "Data Engineering",
      title: "The data foundation your AI strategy is missing",
      excerpt:
        "Great models fail on messy data. Here's how we design pipelines that keep AI honest.",
      readTime: "7 min read",
      category: "Data",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    },
    {
      eyebrow: "Industry",
      title: "RAG in regulated industries: a practical compliance playbook",
      excerpt:
        "Retrieval-augmented generation done right for healthcare and finance.",
      readTime: "11 min read",
      category: "Compliance",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    },
    {
      eyebrow: "Cloud & DevOps",
      title: "Shipping ML to production without 3 a.m. pages",
      excerpt:
        "The MLOps guardrails we put around every model we deploy.",
      readTime: "8 min read",
      category: "MLOps",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    },
    {
      eyebrow: "Strategy",
      title: "Build vs. augment: choosing the right engagement model",
      excerpt:
        "A founder-friendly framework for how to actually staff an AI build.",
      readTime: "6 min read",
      category: "Strategy",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    },
  ],
} as const;

/* --------------------------- SEC 16 CONSULTATION -------------------------- */

export const CONSULTATION = {
  particleText: "Let's Build",
  heading: "Let's build something intelligent.",
  body: "Free 30-minute strategy call. Bring a problem, a product idea, or a hiring gap. We'll map a path — no slide-deck sales pitch.",
  primaryCta: "Book a consultation",
  secondaryCta: "Download capability deck",
  secondaryCtaHref: "/capability-deck.pdf",
} as const;

/* ------------------------------- SEC 17 CONTACT --------------------------- */

export const CONTACT_INFO = {
  eyebrow: "Contact Us",
  heading: "US-headquartered, India-engineered.",
  body: "Tell us what you're building — whether it's a product idea, a platform to modernize, or a team to scale. Reach out and we'll respond within 24 hours.",
  email: "ashu@kramoraa.com",
  offices: [
    {
      country: "United States",
      label: "US HQ",
      name: "Kramora AI — Business Centre",
      lines: ["1420 NW Gilman Blvd, #2-2731", "Issaquah, WA 98027, United States"],
    },
    {
      country: "India",
      label: "Engineering Hub",
      name: "Bengaluru Development Centre",
      lines: ["FM Cariappa Road, Ashok Nagar", "Bengaluru, Karnataka, India"],
    },
  ],
  interests: [
    "AI / ML Build",
    "Generative AI & Agents",
    "Data Engineering",
    "Web & Mobile Apps",
    "DevOps & Cloud",
    "OCR & Document AI",
    "Enterprise Automation",
    "Staff Augmentation",
  ],
} as const;

/* ------------------------------- SEC 18 FOOTER ---------------------------- */

export const FOOTER = {
  brand: "Kramora AI Technology",
  tagline: "Innovate · Integrate · Inspire",
  cta: "Start a project",
  solutionLinks: [
    { label: "Artificial Intelligence", href: "#services" },
    { label: "Generative AI & Agents", href: "#services" },
    { label: "Data Engineering", href: "#services" },
    { label: "Blockchain & Web3", href: "#technology" },
    { label: "Cloud & DevOps", href: "#services" },
    { label: "OCR & IDP", href: "#services" },
  ],
  companyLinks: [
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Case Studies", href: "#work" },
    { label: "Insights Hub", href: "#insights" },
    { label: "Contact Us", href: "#contact" },
  ],
  contact: {
    email: "ashu@kramoraa.com",
    locations: "Los Angeles · Bengaluru",
    address: "1420 NW Gilman Blvd, #2-2731, Issaquah, WA 98027",
  },
  copyright: "© 2026 Kramora AI Technologies. All rights reserved.",
  blueprint: "Public Content Architecture Blueprint v1.0",
} as const;
