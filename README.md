# YashxDaksh — Premium Digital Agency

> We Build Digital Experiences That Perform.

An immersive, award-tier marketing site for the fictional premium agency
**YashxDaksh**. Built as a cinematic, interactive experience rather than a
template — a living 3D centerpiece, kinetic typography, smooth scrolling, a
custom cursor, and an interactive project estimator.

The single visual metaphor running through the site: **ideas transforming into
digital experiences** — embodied by a morphing glass-and-metal orb in the hero
that reacts to the pointer and transforms as you scroll.

---

## Tech stack

| Concern | Choice |
|---|---|
| Framework | **Next.js 15** (App Router, React 19, Server Components) |
| Language | **TypeScript** (strict) |
| Styling | **Tailwind CSS** 3.4 + custom design tokens |
| 3D | **Three.js · React Three Fiber · drei** |
| Animation | **GSAP-ready** + **Framer Motion** |
| Smooth scroll | **Lenis** |
| State | **Zustand** |
| Forms | **React Hook Form** + **Zod** |
| Analytics | **Google Analytics 4** + **Microsoft Clarity** (env-gated) |
| Deploy | **Vercel** |

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm start        # serve the production build
npm run typecheck
```

### Environment variables

Create `.env.local` (all optional — the site works without them):

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX       # Google Analytics 4
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx    # Microsoft Clarity
```

Analytics only load in `production`.

## Folder structure

```
yashxdaksh/
├── app/                     # App Router
│   ├── layout.tsx           # fonts, metadata, JSON-LD, providers
│   ├── page.tsx             # the single-page experience
│   ├── globals.css          # design system + utilities
│   ├── opengraph-image.tsx  # dynamic OG image (next/og)
│   ├── sitemap.ts           # sitemap.xml
│   └── robots.ts            # robots.txt
├── components/
│   ├── hero/                # HeroScene, MorphingObject, Hero
│   ├── layout/              # Preloader, Navbar, Footer
│   ├── sections/            # Work, Services, Process, Why, Testimonials, FAQ, Estimator, Marquee
│   ├── providers/           # SmoothScroll, Analytics
│   └── ui/                  # AnimatedHeading, MagneticButton, CustomCursor,
│                            #   ScrollProgress, Reveal, SectionHeader, icons
├── hooks/                   # useSmoothScroll, useMousePosition, useMediaQuery,
│                            #   usePrefersReducedMotion
├── lib/                     # data, schema, jsonld, utils
├── store/                   # Zustand UI store
├── types/                   # shared TypeScript types
├── public/                  # favicon, static assets
└── docs/                    # brand, motion, accessibility, SEO deliverables
```

## Key components

| Component | Role |
|---|---|
| `MorphingObject` | The living 3D orb — distortion, reflections, pointer + scroll reactive |
| `HeroScene` | R3F `<Canvas>`, loaded `ssr:false` and only after the preloader |
| `Preloader` | Cinematic 0→100 loading sequence |
| `AnimatedHeading` | Word-by-word masked reveal (kinetic type) |
| `MagneticButton` | Cursor-following button + custom-cursor growth |
| `CustomCursor` | rAF-driven dot + trailing ring, mix-blend |
| `ScrollProgress` | Top gradient progress bar |
| `ProjectEstimator` | Multi-step interactive estimator → smart form |

## Performance notes

- The entire **three.js bundle is lazy-loaded** (`dynamic(..., { ssr: false })`)
  and mounts only after the preloader, keeping the initial route lean.
- 3D quality and DPR scale down on mobile; the canvas uses
  `frameloop="demand"` under reduced-motion.
- Images use `next/image` (AVIF/WebP, responsive `sizes`, lazy by default).
- Every animation is **disabled or simplified under `prefers-reduced-motion`**.

## Accessibility & SEO

See [`docs/ACCESSIBILITY.md`](./docs/ACCESSIBILITY.md) and
[`docs/SEO.md`](./docs/SEO.md). Highlights: semantic landmarks, skip link,
visible focus states, keyboard-operable controls, JSON-LD
(`Organization` + `ProfessionalService` + `FAQPage`), dynamic OG image,
sitemap and robots.

## Deliverables

| # | Deliverable | Where |
|---|---|---|
| 1 | Brand guidelines | [`docs/BRAND_GUIDELINES.md`](./docs/BRAND_GUIDELINES.md) |
| 2 | Wireframes / structure | [`docs/BRAND_GUIDELINES.md`](./docs/BRAND_GUIDELINES.md) |
| 3 | Visual system | `tailwind.config.ts` + `app/globals.css` |
| 4 | Motion guidelines | [`docs/MOTION.md`](./docs/MOTION.md) |
| 5 | Complete UI | `app/` + `components/` |
| 6 | Responsive layouts | Tailwind breakpoints throughout |
| 7 | Production code | this repo (`npm run build` passes) |
| 8 | Animation implementation | Framer Motion + Lenis + R3F |
| 9 | SEO strategy | [`docs/SEO.md`](./docs/SEO.md) |
| 10 | Accessibility checklist | [`docs/ACCESSIBILITY.md`](./docs/ACCESSIBILITY.md) |

---

© YashxDaksh. Crafting websites worth remembering.
