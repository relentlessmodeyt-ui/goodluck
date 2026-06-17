import type { Metadata } from "next";

export const SITE = {
  name: "YashxDaksh",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yashxdaksh.com",
  title: "YashxDaksh — Premium Websites for Ambitious Brands",
  description:
    "YashxDaksh creates immersive digital experiences that elevate brands, build trust, and drive measurable growth. Premium web design, development and branding.",
  twitter: "@yashxdaksh",
  locale: "en_US",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: "%s · YashxDaksh",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "premium web design",
    "creative agency",
    "web development",
    "Next.js agency",
    "Three.js website",
    "branding studio",
    "UI UX design",
    "e-commerce development",
    "digital experience",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    creator: SITE.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: SITE.url },
};

/** JSON-LD structured data — Organization + ProfessionalService schema. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  image: `${SITE.url}/og.jpg`,
  priceRange: "$$$",
  areaServed: "Worldwide",
  serviceType: [
    "Web Design",
    "Web Development",
    "Branding",
    "UI/UX Design",
    "E-commerce",
    "SEO Optimization",
  ],
  sameAs: [
    "https://twitter.com/yashxdaksh",
    "https://www.linkedin.com/company/yashxdaksh",
    "https://dribbble.com/yashxdaksh",
  ],
};

export const faqSchema = (
  faqs: { question: string; answer: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});
