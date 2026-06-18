import type { Project, Service, ProcessStep, Testimonial, Faq } from "@/types";

export const SITE = {
  name: "YashxDaksh",
  tagline: "We Build Digital Experiences That Perform.",
  description:
    "YashxDaksh creates immersive digital experiences that elevate brands, build trust, and drive measurable growth.",
  url: "https://yashxdaksh.com",
  email: "hello@yashxdaksh.com",
  social: {
    twitter: "https://twitter.com/yashxdaksh",
    instagram: "https://instagram.com/yashxdaksh",
    dribbble: "https://dribbble.com/yashxdaksh",
    linkedin: "https://linkedin.com/company/yashxdaksh",
  },
};

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
    slug: "lumen-finance",
    title: "Lumen",
    client: "Lumen Finance",
    category: "Fintech · Web App",
    year: "2025",
    problem:
      "A fast-scaling fintech was losing qualified signups to a cluttered, slow onboarding flow that felt anything but premium.",
    solution:
      "We rebuilt the marketing site and onboarding around a single calm narrative, with motion that guides instead of distracts.",
    results: [
      { label: "Signup conversion", value: "+142%" },
      { label: "Load time", value: "0.9s" },
      { label: "Lighthouse", value: "99" },
    ],
    accent: "#5B7CFF",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    tags: ["Web Design", "Development", "Motion"],
  },
  {
    slug: "atelier-noir",
    title: "Atelier Noir",
    client: "Atelier Noir",
    category: "Luxury Fashion · E-commerce",
    year: "2025",
    problem:
      "A heritage fashion house needed a digital flagship that matched the craft of its physical boutiques.",
    solution:
      "An editorial, motion-led storefront with cinematic product reveals and a checkout engineered for zero friction.",
    results: [
      { label: "AOV", value: "+38%" },
      { label: "Return rate", value: "-21%" },
      { label: "Time on site", value: "4m 12s" },
    ],
    accent: "#8B5CF6",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80",
    tags: ["Branding", "E-commerce", "Art Direction"],
  },
  {
    slug: "northwind-saas",
    title: "Northwind",
    client: "Northwind Cloud",
    category: "SaaS · Brand & Product",
    year: "2024",
    problem:
      "A B2B platform with serious technology had a brand that read like every other dashboard on the market.",
    solution:
      "A distinct visual system and an interactive product story that makes complex infrastructure feel effortless.",
    results: [
      { label: "Demo requests", value: "+96%" },
      { label: "Bounce rate", value: "-34%" },
      { label: "Pipeline", value: "$2.4M" },
    ],
    accent: "#5B7CFF",
    image:
      "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=1600&q=80",
    tags: ["UI/UX", "Development", "SEO"],
  },
  {
    slug: "meridian-studio",
    title: "Meridian",
    client: "Meridian Studio",
    category: "Creative Studio · Portfolio",
    year: "2024",
    problem:
      "An award-winning studio needed a portfolio that felt as ambitious as the work inside it.",
    solution:
      "A fully immersive, WebGL-driven showcase where every scroll is a directed, cinematic moment.",
    results: [
      { label: "Inbound leads", value: "+210%" },
      { label: "Avg. project size", value: "+3.1x" },
      { label: "Awards", value: "4" },
    ],
    accent: "#8B5CF6",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    tags: ["Web Design", "WebGL", "Motion"],
  },
];

export const SERVICES: Service[] = [
  {
    id: "web-design",
    index: "01",
    title: "Web Design",
    description:
      "Distinct, art-directed interfaces built around your brand — not a template. Every screen is composed with intent.",
    capabilities: ["Art direction", "Design systems", "Interaction design", "Prototyping"],
  },
  {
    id: "web-development",
    index: "02",
    title: "Web Development",
    description:
      "Performance-first engineering in Next.js and TypeScript. Fast, accessible, and built to scale with you.",
    capabilities: ["Next.js / React", "Headless CMS", "WebGL & 3D", "Core Web Vitals"],
  },
  {
    id: "branding",
    index: "03",
    title: "Branding",
    description:
      "Identity systems that earn trust on sight — logo, voice, palette and the rules that keep it coherent everywhere.",
    capabilities: ["Visual identity", "Brand strategy", "Guidelines", "Naming"],
  },
  {
    id: "ui-ux",
    index: "04",
    title: "UI/UX Design",
    description:
      "Research-led product design that removes friction and turns intent into action across every device.",
    capabilities: ["UX research", "Flows & wireframes", "Usability testing", "Accessibility"],
  },
  {
    id: "ecommerce",
    index: "05",
    title: "E-commerce",
    description:
      "Storefronts engineered to sell — cinematic product moments paired with a checkout tuned for conversion.",
    capabilities: ["Shopify / Headless", "Conversion design", "Payments", "Merchandising"],
  },
  {
    id: "seo",
    index: "06",
    title: "SEO Optimization",
    description:
      "Technical and content SEO baked in from day one, so the experiences we build are actually found.",
    capabilities: ["Technical SEO", "Schema markup", "Content strategy", "Analytics"],
  },
];

export const PROCESS: ProcessStep[] = [
  { index: "01", title: "Discover", description: "We learn your business, audience and goals — and define what winning looks like." },
  { index: "02", title: "Strategy", description: "We shape positioning, scope and an architecture that maps directly to results." },
  { index: "03", title: "Design", description: "We art-direct every screen, prototype the motion, and refine until it feels inevitable." },
  { index: "04", title: "Develop", description: "We engineer it in Next.js — fast, accessible, and ready for real-world scale." },
  { index: "05", title: "Launch", description: "We ship with confidence: QA, performance budgets and a flawless go-live." },
  { index: "06", title: "Optimize", description: "We measure, iterate and compound the results long after launch." },
];

export const WHY_CHOOSE = [
  {
    title: "Custom solutions",
    description: "No themes, no shortcuts. Every project is designed and built from a blank canvas around your brand.",
  },
  {
    title: "Performance-first development",
    description: "We treat speed as a feature. 95+ Lighthouse scores and Core Web Vitals are the baseline, not the goal.",
  },
  {
    title: "Modern technology stack",
    description: "Next.js, TypeScript, WebGL and a motion system that keeps you years ahead of your competitors.",
  },
  {
    title: "Transparent communication",
    description: "Clear scope, honest timelines, and a single point of contact who actually replies.",
  },
  {
    title: "Long-term partnerships",
    description: "We build relationships, not one-off projects — and we stay to help you grow.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "YashxDaksh delivered a site that genuinely feels like the future. Our investors noticed before our customers did.",
    author: "Sofia Marchetti",
    role: "CEO",
    company: "Lumen Finance",
    metric: { value: "+142%", label: "signup conversion" },
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "The craft is on another level. Every interaction feels considered. It completely changed how people perceive our brand.",
    author: "James Okafor",
    role: "Founder",
    company: "Atelier Noir",
    metric: { value: "+38%", label: "average order value" },
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "Fast, communicative, and obsessive about detail. They turned a complex platform into something that sells itself.",
    author: "Priya Sharma",
    role: "VP Marketing",
    company: "Northwind Cloud",
    metric: { value: "$2.4M", label: "pipeline generated" },
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  },
];

export const FAQS: Faq[] = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most marketing sites ship in 4–8 weeks; larger platforms and e-commerce builds run 8–14 weeks. After our discovery call we give you a precise, milestone-based timeline — and we hit it.",
  },
  {
    question: "How much does a website cost?",
    answer:
      "Projects typically start at $8k for a focused landing experience and scale from there based on scope. The estimator below gives you an instant range; the proposal makes it exact.",
  },
  {
    question: "Do you work with our existing brand?",
    answer:
      "Absolutely. We can design within your established identity, evolve it, or build a brand from scratch — whatever moves the work forward.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We don't disappear. We offer care plans for ongoing optimization, content updates and performance monitoring, and we're available for new initiatives whenever you need us.",
  },
  {
    question: "Will the site be fast and accessible?",
    answer:
      "Yes — it's non-negotiable. We build to 95+ Lighthouse performance, WCAG AA accessibility, and full SEO best practices, including schema markup, on every project.",
  },
  {
    question: "Who actually does the work?",
    answer:
      "A small, senior team. You work directly with the designers and engineers building your project — never a layer of account managers in between.",
  },
];

export const ESTIMATOR = {
  scope: [
    { id: "landing", label: "Landing / Microsite", note: "1–3 sections, one clear goal" },
    { id: "marketing", label: "Marketing Website", note: "Full multi-page brand site" },
    { id: "ecommerce", label: "E-commerce Store", note: "Storefront + checkout" },
    { id: "product", label: "Web App / Platform", note: "Custom product UI" },
  ],
  budget: [
    { id: "8-15", label: "$8k – $15k", note: "Focused scope" },
    { id: "15-35", label: "$15k – $35k", note: "Full website" },
    { id: "35-75", label: "$35k – $75k", note: "Ambitious build" },
    { id: "75+", label: "$75k+", note: "Flagship program" },
  ],
  timeline: [
    { id: "asap", label: "ASAP", note: "Within 4 weeks" },
    { id: "1-2m", label: "1–2 months", note: "Standard pace" },
    { id: "3m+", label: "3+ months", note: "Phased rollout" },
    { id: "flexible", label: "Flexible", note: "No hard deadline" },
  ],
};

export const STATS = [
  { value: "120+", label: "Projects shipped" },
  { value: "11", label: "Industry awards" },
  { value: "98", label: "Avg. Lighthouse score" },
  { value: "4.9", label: "Client rating" },
];
