# YashxDaksh — Premium Digital Agency

> We Build Websites That Make Brands Impossible to Ignore.

An immersive, award-grade marketing experience for **YashxDaksh**, a premium web
design & development studio. Built as a single-page cinematic journey with a live
3D centerpiece, scroll-driven storytelling, a custom cursor, magnetic interactions
and an interactive project estimator.

This is not a templated agency site — every section, interaction and animation is
custom-built to demonstrate the studio's craft.

---

## ✦ Highlights

- **Interactive 3D hero** — a morphing glass-and-metal orb (Three.js / React Three
  Fiber) with mouse-reactive lighting, a cinematic camera rig, an orbiting wireframe
  shell and a particle field. Recedes and spins down as you scroll.
- **Cinematic intro** — a loading counter + wordmark reveal that sets the tone.
- **Motion as a product feature** — Lenis smooth scroll, GSAP + ScrollTrigger,
  Framer Motion reveals, kinetic typography, magnetic buttons, scroll progress.
- **Custom cursor** with contextual labels (View / Go) and a lagging ring.
- **Interactive project estimator** — pick scope, budget and timeline for a live
  ballpark, plus a validated contact form (React Hook Form + Zod).
- **Performance-first** — lazy-loaded 3D, dynamic imports, static rendering,
  `prefers-reduced-motion` support throughout.
- **SEO + a11y baked in** — JSON-LD (Organization + FAQ), sitemap, robots,
  manifest, semantic landmarks, skip link, focus states.

---

## ✦ Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| 3D | Three.js · React Three Fiber · Drei |
| Animation | GSAP + ScrollTrigger · Framer Motion |
| Smooth scroll | Lenis |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Analytics | Google Analytics 4 + Microsoft Clarity |
| Deploy | Vercel |

---

## ✦ Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

Copy `.env.example` to `.env.local` and fill in your site URL + analytics IDs.

---

## ✦ Folder Structure

```
yashxdaksh/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout, fonts, metadata, JSON-LD, analytics
│   ├── page.tsx              # Single-page composition + skip link + FAQ schema
│   ├── globals.css           # Design tokens, glass, fields, reduced-motion
│   ├── icon.svg              # Brand favicon
│   ├── manifest.ts           # PWA manifest
│   ├── robots.ts / sitemap.ts
├── components/
│   ├── Shell.tsx             # Providers + global chrome wrapper
│   ├── Analytics.tsx         # GA4 + Clarity (prod-only)
│   ├── providers/
│   │   └── SmoothScroll.tsx  # Lenis ↔ GSAP ticker sync
│   ├── three/
│   │   ├── HeroScene.tsx     # Canvas, camera rig, studio environment
│   │   └── MorphingObject.tsx# The reactive orb + shell + particles
│   ├── ui/                   # Cursor, ScrollProgress, MagneticButton,
│   │                         # AnimatedHeading, Reveal, CountUp, Intro,
│   │                         # Navbar, SectionLabel
│   └── sections/             # Hero, Marquee, Work, Services, Process,
│                             # WhyUs, Testimonials, Faq, Contact, Footer
├── hooks/                    # useMousePosition, useIsMobile
├── lib/                      # data.ts (content), seo.ts, utils.ts
├── store/                    # useStore.ts (Zustand)
├── types/                    # Shared TypeScript types
└── docs/                     # Brand, visual, motion, SEO, a11y, wireframes
```

---

## ✦ Documentation

The complete brand and design system lives in [`docs/`](./docs):

- [`BRAND-GUIDELINES.md`](./docs/BRAND-GUIDELINES.md) — identity, voice, logo, colors, type
- [`VISUAL-SYSTEM.md`](./docs/VISUAL-SYSTEM.md) — tokens, spacing, components, effects
- [`MOTION-GUIDELINES.md`](./docs/MOTION-GUIDELINES.md) — easing, timing, interaction patterns
- [`WIREFRAMES.md`](./docs/WIREFRAMES.md) — section-by-section structure
- [`SEO-STRATEGY.md`](./docs/SEO-STRATEGY.md) — technical + content SEO plan
- [`ACCESSIBILITY-CHECKLIST.md`](./docs/ACCESSIBILITY-CHECKLIST.md) — WCAG 2.2 AA checklist

---

## ✦ Performance Notes

- 3D is dynamically imported (`ssr: false`) and lightened on mobile (lower DPR,
  fewer geometry subdivisions, no particles).
- The studio environment uses in-scene lightformers — **no external HDR fetch**.
- All animation respects `prefers-reduced-motion`; Lenis, the cursor, the intro
  and the 3D float/distortion all degrade gracefully.
- Static rendering for the whole route; analytics load `afterInteractive`.

Replace placeholder content (projects, testimonials, contact endpoint) before
launch. The contact form is currently front-end only.
