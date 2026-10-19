export const ROUTES = {
  home: "/",
  services: "/services",
  ai: "/services/ai",
  dataCloud: "/services/data-cloud",
  webMobile: "/services/web-mobile",
  ocrStaff: "/services/ocr-staff",
  about: "/about",
  process: "/process",
  techStack: "/tech-stack",
  industries: "/industries",
  caseStudies: "/case-studies",
  insights: "/insights",
  engagement: "/engagement",
  testimonials: "/testimonials",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export const SITE = {
  name: "Kramora AI",
  shortName: "Kramora",
  tagline: "AI-First. Innovation-Driven. Built for Growth.",
  heroHeadline: "We build intelligent products that scale.",
  morphWords: ["Intelligent Products", "Data Platforms", "Autonomous Systems"],
  email: "ashu@kramoraa.com",
  replyTime: "We reply within 24 hours",
  usOffice: {
    country: "United States",
    city: "Issaquah, Washington",
    detail: "Greater Seattle · US HQ",
  },
  indiaOffice: {
    country: "India",
    city: "Bengaluru, Karnataka",
    detail: "Delivery hub · IST hours",
  },
} as const;

export interface NavChild {
  label: string;
  href: string;
  description: string;
}

export interface NavGroup {
  label: string;
  children: NavChild[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Services",
    children: [
      {
        label: "Services Overview",
        href: ROUTES.services,
        description: "One partner across the modern stack",
      },
      {
        label: "AI & Generative AI",
        href: ROUTES.ai,
        description: "ML, NLP, LLM apps, RAG, agents",
      },
      {
        label: "Data Engineering & Cloud",
        href: ROUTES.dataCloud,
        description: "Pipelines, warehousing, Kubernetes",
      },
      {
        label: "Web, Mobile & Automation",
        href: ROUTES.webMobile,
        description: "Products, platforms, RPA, orchestration",
      },
      {
        label: "OCR & Document AI + Staff",
        href: ROUTES.ocrStaff,
        description: "IDP, extraction, dedicated teams",
      },
    ],
  },
  {
    label: "Company",
    children: [
      { label: "About Us", href: ROUTES.about, description: "Principles & the team behind Kramora" },
      { label: "Our Process", href: ROUTES.process, description: "Discover, Design, Build, Scale" },
      { label: "Technology Stack", href: ROUTES.techStack, description: "The 8-layer engineering matrix" },
      { label: "Industries", href: ROUTES.industries, description: "12 verticals we know deeply" },
    ],
  },
  {
    label: "Work",
    children: [
      { label: "Case Studies", href: ROUTES.caseStudies, description: "Outcomes we have shipped" },
      { label: "Insights Hub", href: ROUTES.insights, description: "Field notes from applied AI" },
      { label: "Engagement Models", href: ROUTES.engagement, description: "Fixed scope, pods, augmentation" },
      { label: "Testimonials & FAQ", href: ROUTES.testimonials, description: "What partners say, answered" },
    ],
  },
];
