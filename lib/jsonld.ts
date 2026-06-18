import { SITE, SERVICES, FAQS } from "@/lib/data";

/** Structured data for rich results (Organization, Website, Services, FAQ). */
export function buildJsonLd() {
  const organization = {
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    description: SITE.description,
    slogan: SITE.tagline,
    sameAs: Object.values(SITE.social),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { "@id": `${SITE.url}/#organization` },
  };

  const professionalService = {
    "@type": "ProfessionalService",
    name: SITE.name,
    url: SITE.url,
    image: `${SITE.url}/og.png`,
    description: SITE.description,
    priceRange: "$$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital agency services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.description },
      })),
    },
  };

  const faq = {
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, professionalService, faq],
  };
}
