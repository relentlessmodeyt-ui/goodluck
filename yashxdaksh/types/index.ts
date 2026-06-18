export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  problem: string;
  solution: string;
  results: { label: string; value: string }[];
  accent: string;
  image: string;
  tags: string[];
};

export type Service = {
  id: string;
  index: string;
  title: string;
  description: string;
  capabilities: string[];
};

export type ProcessStep = {
  index: string;
  title: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  metric: { value: string; label: string };
  avatar: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type EstimatorState = {
  scope: string | null;
  budget: string | null;
  timeline: string | null;
  name: string;
  email: string;
  company: string;
  details: string;
};
