# YashxDaksh — Brand Guidelines & Visual System

## 1. Brand identity

**Name:** YashxDaksh
**Tagline (primary):** We Build Digital Experiences That Perform.
**Supporting lines:** Crafting Websites Worth Remembering · Premium Websites for
Ambitious Brands · Where Design Meets Performance.

**Personality:** Confident · Visionary · Sophisticated · Innovative · Precise ·
Premium · Human.

**Voice:** Clear, bold, minimal, results-driven. We state outcomes, not
adjectives. No buzzwords, no inflated claims.

**Promise to the visitor (first 10 seconds):** "If their own website looks this
incredible, imagine what they can build for us."

## 2. Logotype

`Yash` + accent `x` + `Daksh`, set in **Space Grotesk** SemiBold. The `x` is the
brand pivot — always rendered in the accent gradient (#5B7CFF → #8B5CF6). The
favicon abstracts this into two opposed chevrons meeting at a gradient node.

Clear space ≥ the cap height of the wordmark on all sides. Never stretch,
recolour the full wordmark, or add effects beyond the accent `x`.

## 3. Color system

| Token | Hex | Use |
|---|---|---|
| `base` | `#08090D` | Primary background |
| `surface` | `#111318` | Secondary background / section bands |
| `surface.raised` | `#171A21` | Cards & panels |
| `accent` | `#5B7CFF` | Primary accent (electric indigo) |
| `accent.violet` | `#8B5CF6` | Secondary accent |
| `ink` | `#F8FAFC` | Primary text |
| `ink.muted` | `#94A3B8` | Secondary text |
| `line` | `rgba(248,250,252,0.08)` | Hairline borders |

**Rules**
- Accents are used **sparingly** — for emphasis, a single gradient word, CTAs,
  active states, and lighting. The canvas is overwhelmingly dark and neutral.
- The signature gradient is `linear-gradient(135deg, #5B7CFF → #8B5CF6)`.
- Avoid neon, high-saturation fills, cheap glows, and heavy blur. Lighting is
  ambient and cinematic, never garish.
- Body text on `base`/`surface` clears WCAG AA; muted text is reserved for
  secondary copy at ≥14px.

## 4. Typography

| Role | Family | Notes |
|---|---|---|
| Display / headings | **Space Grotesk** | tight tracking (−0.03 to −0.04em), large and confident |
| Body | **Inter** | line-height 1.5–1.75, 16px+ on mobile |

Optional upgrade path: swap display to **Satoshi / Neue Montreal** and body to
**General Sans** (Fontshare) via `next/font/local` — the CSS variables
(`--font-display`, `--font-sans`) are the only touch points.

**Fluid scale** (defined in `tailwind.config.ts`):
`display-lg` clamp(3.5rem, 11vw, 9rem) · `display-md` · `display-sm`. Headlines
are short (≤16ch where possible), hierarchy is strong, whitespace is generous.

## 5. Surfaces & effects

- **Glassmorphism (subtle):** `.glass` / `.glass-strong` — blur + saturation +
  1px white-alpha border. Used for the nav, chips, and overlays.
- **Gradient hairline border:** `.border-glow` — a 1px masked gradient frame on
  premium cards.
- **Grain & radial fade:** faint film grain + a top radial accent wash add depth
  without color.
- **Soft shadows** and **layering** create the three-dimensional, architectural
  feel. Reflections come from an in-scene environment map (no external HDR).

## 6. Page structure (wireframe)

```
┌───────────────────────────────────────────────┐
│ Preloader  (0 → 100 cinematic, ~1.7s)          │
├───────────────────────────────────────────────┤
│ Floating glass nav · logo · links · CTA        │
├───────────────────────────────────────────────┤
│ HERO  — 100svh                                 │
│   ambient wash · 3D morphing orb (centered)    │
│   eyebrow → H1 (kinetic) → sub → 2 CTAs        │
│   trust row (Fast · Conversion · Premium · Perf)│
│   scroll cue                                    │
├───────────────────────────────────────────────┤
│ Marquee — disciplines, infinite scroll         │
├───────────────────────────────────────────────┤
│ SELECTED WORK — asymmetric case-study grid     │
│   media · Problem → Solution → Results metrics  │
├───────────────────────────────────────────────┤
│ SERVICES — interactive list + live preview     │
├───────────────────────────────────────────────┤
│ PROCESS — scroll-filled vertical timeline (6)  │
├───────────────────────────────────────────────┤
│ WHY — sticky intro + animated stats + reasons  │
├───────────────────────────────────────────────┤
│ TESTIMONIALS — animated carousel + metrics     │
├───────────────────────────────────────────────┤
│ FAQ — accordion                                │
├───────────────────────────────────────────────┤
│ CONTACT — multi-step project estimator         │
│   scope → budget → timeline → details → done   │
├───────────────────────────────────────────────┤
│ Footer — CTA · nav · social · legal            │
└───────────────────────────────────────────────┘
```

## 7. Layout system

- Container: `max-w-shell` (1320px), fluid gutters (24 → 48px).
- Vertical rhythm: `py-section` = clamp(6rem, 14vh, 11rem).
- Breakpoints: 375 · 768 · 1024 · 1440. Mobile-first; no horizontal scroll.
- Z-index scale: content `10` · nav `70` · scroll bar `80` · cursor `90` ·
  preloader `100` · skip link `200`.

## 8. Do / Don't

**Do** — lead with emotion then information · keep accents rare · let type
breathe · make every interaction feel custom · keep motion purposeful.

**Don't** — flat SaaS cards · predictable hero-left/image-right · neon ·
overused gradients · cartoonish visuals · templated layouts.
