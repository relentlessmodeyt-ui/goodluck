# YashxDaksh — SEO Strategy

## Positioning & keywords

Primary: *premium web design agency*, *immersive website design*,
*Next.js development agency*. Secondary, mapped to services: *web design*,
*web development*, *branding*, *UI/UX design*, *e-commerce development*,
*SEO optimization*. Long-tail: *award-winning agency for SaaS / luxury brands /
startups*.

## On-page (implemented)

- **Metadata API** in `app/layout.tsx`: title template, description, keywords,
  canonical, author/creator, robots directives, theme color.
- **Open Graph + Twitter** cards with a **dynamic OG image** (`app/opengraph-image.tsx`,
  `next/og`) — branded, 1200×630.
- **Structured data (JSON-LD)** in `lib/jsonld.ts`, injected once:
  - `Organization` (name, url, email, sameAs socials, slogan)
  - `WebSite`
  - `ProfessionalService` with an `OfferCatalog` of the six services
  - `FAQPage` generated from the FAQ content (rich-result eligible)
- **`sitemap.xml`** (`app/sitemap.ts`) and **`robots.txt`** (`app/robots.ts`)
  with sitemap + host references.
- Semantic headings, descriptive link text, and meaningful image `alt`.

## Technical SEO

- Server Components by default; the 3D bundle is lazy and client-only so it
  never blocks first paint or the crawled HTML.
- Fast Core Web Vitals: capped DPR, `next/image` (AVIF/WebP, responsive sizes),
  font `display: swap` via `next/font` (self-hosted, no layout shift).
- Mobile-first responsive; single canonical URL; clean semantic markup.
- `metadataBase` set so OG/canonical URLs resolve absolutely.

## Performance targets (Lighthouse)

| Metric | Target |
|---|---|
| Performance | 95+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

## Pre-launch / ongoing

- [ ] Set the production domain in `lib/data.ts` (`SITE.url`) and verify OG.
- [ ] Submit `sitemap.xml` in Google Search Console + Bing Webmaster.
- [ ] Wire `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_CLARITY_ID`.
- [ ] Validate structured data (Rich Results Test) for Organization + FAQ.
- [ ] Add per-case-study pages (`/work/[slug]`) for content depth and internal
      links as the portfolio grows.
- [ ] Monitor CWV in Search Console; iterate on LCP/INP.
