import type {
  Faq,
  ProcessStep,
  Project,
  Service,
  Testimonial,
} from "@/types";

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Studio", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export const TRUST_INDICATORS = [
  "Fast Delivery",
  "Conversion-Focused",
  "Premium Design",
  "Performance Optimized",
];

export const PROJECTS: Project[] = [
  {
    id: "lumen",
    title: "Lumen",
    client: "Lumen Capital",
    category: "Fintech · Web Platform",
    year: "2025",
    problem:
      "A fast-scaling investment platform whose dated interface undercut the trust their product had already earned.",
    solution:
      "A cinematic marketing site and product dashboard sharing one design language — motion-led storytelling backed by a hardened component system.",
    results:
      "Repositioned Lumen as a category leader and unlocked their enterprise sales motion.",
    metrics: [
      { label: "Conversion", value: "+182%" },
      { label: "Load time", value: "0.9s" },
      { label: "Lighthouse", value: "99" },
    ],
    accent: "#5B7CFF",
    tags: ["Web Design", "Development", "Design System"],
  },
  {
    id: "atelier",
    title: "Atelier Noir",
    client: "Atelier Noir",
    category: "Luxury Retail · E-commerce",
    year: "2025",
    problem:
      "A heritage fashion house needed an online flagship that felt as considered as their boutiques.",
    solution:
      "An immersive shopping experience with WebGL lookbooks, buttery transitions and a checkout engineered for zero friction.",
    results:
      "Turned browsing into an event and lifted average order value across every market.",
    metrics: [
      { label: "AOV", value: "+47%" },
      { label: "Bounce", value: "-38%" },
      { label: "Revenue", value: "+2.4×" },
    ],
    accent: "#8B5CF6",
    tags: ["Branding", "E-commerce", "Motion"],
  },
  {
    id: "northwind",
    title: "Northwind",
    client: "Northwind AI",
    category: "SaaS · Product Marketing",
    year: "2024",
    problem:
      "An AI infrastructure startup with a brilliant product and a website that buried it.",
    solution:
      "A narrative-driven launch site that made complex infrastructure feel inevitable — interactive diagrams, live metrics, sharp copy.",
    results:
      "Powered a launch that landed their Series A round and a wave of inbound.",
    metrics: [
      { label: "Demo requests", value: "+312%" },
      { label: "Time on site", value: "4m 12s" },
      { label: "Sign-ups", value: "+128%" },
    ],
    accent: "#5B7CFF",
    tags: ["UI/UX", "Development", "SEO"],
  },
  {
    id: "meridian",
    title: "Meridian",
    client: "Meridian Studio",
    category: "Creative · Portfolio",
    year: "2024",
    problem:
      "An architecture studio whose digital presence didn't match the ambition of their buildings.",
    solution:
      "A spatial, scroll-driven portfolio where projects unfold like a guided walkthrough of the space itself.",
    results:
      "Became the studio's strongest pitch asset and a magnet for flagship commissions.",
    metrics: [
      { label: "Inbound leads", value: "+96%" },
      { label: "Avg. session", value: "5m 38s" },
      { label: "Awards", value: "3" },
    ],
    accent: "#8B5CF6",
    tags: ["Web Design", "Motion", "Development"],
  },
];

export const SERVICES: Service[] = [
  {
    id: "web-design",
    index: "01",
    title: "Web Design",
    summary:
      "Cinematic, brand-defining interfaces designed to be felt — not just seen.",
    capabilities: ["Art direction", "Design systems", "Prototyping", "Motion design"],
  },
  {
    id: "web-development",
    index: "02",
    title: "Web Development",
    summary:
      "Performance-obsessed engineering on a modern stack. Fast, accessible, bulletproof.",
    capabilities: ["Next.js & React", "WebGL / Three.js", "Headless CMS", "Edge delivery"],
  },
  {
    id: "branding",
    index: "03",
    title: "Branding",
    summary:
      "Identity systems with a point of view — logo, voice, and the rules that hold it together.",
    capabilities: ["Brand strategy", "Visual identity", "Guidelines", "Naming"],
  },
  {
    id: "ui-ux",
    index: "04",
    title: "UI/UX Design",
    summary:
      "Research-led product design that turns complexity into clarity and clarity into conversion.",
    capabilities: ["UX research", "Flows & IA", "Interaction design", "Usability testing"],
  },
  {
    id: "ecommerce",
    index: "05",
    title: "E-commerce",
    summary:
      "Storefronts engineered to sell — immersive merchandising, frictionless checkout.",
    capabilities: ["Shopify Hydrogen", "Headless commerce", "CRO", "Subscriptions"],
  },
  {
    id: "seo",
    index: "06",
    title: "SEO Optimization",
    summary:
      "Technical and content SEO baked in from day one, so growth compounds after launch.",
    capabilities: ["Technical SEO", "Core Web Vitals", "Schema markup", "Content strategy"],
  },
];

export const PROCESS: ProcessStep[] = [
  {
    id: "discover",
    phase: "01",
    title: "Discover",
    description:
      "We immerse ourselves in your business, market and audience to find the real problem worth solving.",
    deliverables: ["Stakeholder workshops", "Market audit", "Goals & KPIs"],
  },
  {
    id: "strategy",
    phase: "02",
    title: "Strategy",
    description:
      "We turn insight into direction — positioning, narrative and a sharp plan for the build.",
    deliverables: ["Positioning", "Sitemap & flows", "Success metrics"],
  },
  {
    id: "design",
    phase: "03",
    title: "Design",
    description:
      "We craft the experience pixel by pixel, prototyping motion and interaction until it feels inevitable.",
    deliverables: ["Art direction", "UI design", "Interactive prototype"],
  },
  {
    id: "develop",
    phase: "04",
    title: "Develop",
    description:
      "We engineer it for real — fast, accessible and resilient, with code we're proud to hand over.",
    deliverables: ["Frontend build", "CMS integration", "QA & testing"],
  },
  {
    id: "launch",
    phase: "05",
    title: "Launch",
    description:
      "We ship with confidence — staged rollout, analytics wired in, zero loose ends.",
    deliverables: ["Deployment", "Analytics setup", "Launch support"],
  },
  {
    id: "optimize",
    phase: "06",
    title: "Optimize",
    description:
      "We stay partners — measuring, iterating and compounding results long after go-live.",
    deliverables: ["A/B testing", "Performance tuning", "Growth roadmap"],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "YashxDaksh didn't just redesign our website — they redefined how the market sees us. The craft is on another level.",
    author: "Elena Volkov",
    role: "CEO",
    company: "Lumen Capital",
    initials: "EV",
    metric: { label: "Conversion lift", value: "+182%" },
  },
  {
    id: "t2",
    quote:
      "Every interaction feels intentional. Our customers tell us the site feels like our boutiques — that's exactly what we wanted.",
    author: "Marco Bellini",
    role: "Creative Director",
    company: "Atelier Noir",
    initials: "MB",
    metric: { label: "Revenue", value: "+2.4×" },
  },
  {
    id: "t3",
    quote:
      "They made our infrastructure product feel inevitable. The launch site carried our entire Series A narrative.",
    author: "Priya Nair",
    role: "Co-founder",
    company: "Northwind AI",
    initials: "PN",
    metric: { label: "Demo requests", value: "+312%" },
  },
  {
    id: "t4",
    quote:
      "Working with them felt like having an in-house team that simply operates at a higher altitude. Rare partnership.",
    author: "James Okafor",
    role: "Principal",
    company: "Meridian Studio",
    initials: "JO",
    metric: { label: "Inbound leads", value: "+96%" },
  },
];

export const WHY_US = [
  {
    title: "Custom solutions",
    description:
      "No templates, no shortcuts. Every project is designed and built from the ground up around your goals.",
  },
  {
    title: "Performance-first development",
    description:
      "We treat speed and accessibility as features. 95+ Lighthouse scores are the baseline, not the goal.",
  },
  {
    title: "Modern technology stack",
    description:
      "Next.js, TypeScript, WebGL and an edge-first architecture — future-proof from the first commit.",
  },
  {
    title: "Transparent communication",
    description:
      "Clear timelines, honest updates, no jargon. You always know exactly where your project stands.",
  },
  {
    title: "Long-term partnerships",
    description:
      "We don't disappear at launch. We measure, iterate and grow with you for the long run.",
  },
];

export const FAQS: Faq[] = [
  {
    id: "f1",
    question: "How long does a typical project take?",
    answer:
      "Most engagements run 6–12 weeks depending on scope. A focused landing experience can ship in 3–4 weeks; a full brand and platform build runs longer. We agree on a clear timeline before we start.",
  },
  {
    id: "f2",
    question: "What does a project cost?",
    answer:
      "Projects typically start at $12k for a high-craft landing experience and scale with scope. Use the estimator below for a tailored range — we'll give you a precise quote after a short discovery call.",
  },
  {
    id: "f3",
    question: "Do you work with clients outside your timezone?",
    answer:
      "Yes. We work with founders and brands worldwide and structure communication around overlapping hours, async updates and a shared source of truth so nothing slips.",
  },
  {
    id: "f4",
    question: "Will I be able to update the site myself?",
    answer:
      "Absolutely. We build on headless CMS platforms so your team can edit content freely, and we hand over documentation plus a walkthrough so you're never dependent on us.",
  },
  {
    id: "f5",
    question: "Do you handle ongoing maintenance?",
    answer:
      "We offer optional growth partnerships covering performance monitoring, iterative design, A/B testing and new features — so your site keeps compounding value after launch.",
  },
];

export const STATS = [
  { value: "98", suffix: "+", label: "Avg. Lighthouse score" },
  { value: "60", suffix: "fps", label: "Buttery-smooth motion" },
  { value: "2.4", suffix: "×", label: "Avg. revenue impact" },
  { value: "100", suffix: "%", label: "Custom-built, no templates" },
];
