# YashxDaksh — SEO Strategy

## 1. Goals

Rank for high-intent, premium-buyer queries and convert within 10 seconds.
Primary targets: *premium web design agency*, *creative web development studio*,
*Next.js / Three.js agency*, *immersive website design*, *branding + web studio*.

## 2. Technical SEO (implemented)

| Item | Implementation |
|------|----------------|
| Metadata | `lib/seo.ts` → typed `Metadata` with title template, description, keywords, canonical. |
| Open Graph + Twitter | Full OG + `summary_large_image` cards. |
| Structured data | JSON-LD `ProfessionalService` (org) + `FAQPage` (FAQ) via `next/script`. |
| Sitemap | `app/sitemap.ts` → `/sitemap.xml`. |
| Robots | `app/robots.ts` → `/robots.txt`, allows all, references sitemap. |
| Manifest | `app/manifest.ts` (PWA, theme color). |
| Canonical | Set via `alternates.canonical` + `metadataBase`. |
| Semantic HTML | `header` / `main` / `section` / `footer` / `nav` landmarks, single `h1`. |
| Mobile | Responsive, `viewport` meta, 16px+ body. |
| Performance | Core Web Vitals first — see Performance below. |

## 3. Content & On-page

- **One `h1`** (hero headline) with the primary value proposition + keyword intent.
- Descriptive section `h2`s ("Selected Work", "Services", "Process"…).
- Keyword-rich but natural service descriptions (Web Design, Development, Branding,
  UI/UX, E-commerce, SEO).
- Case studies framed as Problem → Solution → Result with concrete metrics — strong
  for featured snippets and dwell time.
- FAQ section doubles as `FAQPage` schema → eligible for rich results.
- Internal anchor navigation reinforces topical structure.

## 4. Core Web Vitals plan

| Metric | Target | Levers |
|--------|--------|--------|
| LCP | < 2.0s | Static render; self-hosted fonts via `next/font` (no FOIT/CLS); hero text is HTML, not an image. |
| INP | < 200ms | Passive listeners; rAF-driven cursor/3D; no heavy work on main thread during input. |
| CLS | < 0.05 | `next/font` with size-adjust; reserved space for async content; no late-injected layout. |
| TTFB | low | Edge/static delivery on Vercel. |

3D is dynamically imported (`ssr:false`) so it never blocks LCP, and is lightened
on mobile.

## 5. Off-page (recommendations)

- Submit `sitemap.xml` to Google Search Console + Bing Webmaster.
- Build an Awwwards / CSSDA / FWA submission cadence — awards drive authoritative
  backlinks and referral traffic for agencies.
- Publish a few flagship case-study pages (expand each `Project` into its own route
  with deep storytelling + schema `CreativeWork`).
- Earn links via guest essays on design/engineering publications.

## 6. Launch checklist

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain.
- [ ] Add real `og.jpg` (1200×630) and reference it in `lib/seo.ts`.
- [ ] Verify GSC + Bing; submit sitemap.
- [ ] Configure GA4 + Clarity IDs (`.env`).
- [ ] Confirm structured data with Google Rich Results Test.
- [ ] Run Lighthouse (target: Perf 95+, A11y 100, Best Practices 100, SEO 100).
