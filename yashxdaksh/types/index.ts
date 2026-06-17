export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  problem: string;
  solution: string;
  results: string;
  metrics: { label: string; value: string }[];
  accent: string; // hex used for the case-study glow
  tags: string[];
}

export interface Service {
  id: string;
  title: string;
  index: string;
  summary: string;
  capabilities: string[];
}

export interface ProcessStep {
  id: string;
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  metric: { label: string; value: string };
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export type CursorVariant = "default" | "hover" | "view" | "drag";
