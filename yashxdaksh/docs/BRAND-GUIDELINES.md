# YashxDaksh — Brand Guidelines

## 1. Brand Essence

**YashxDaksh** builds premium websites for ambitious brands. We sit at the
intersection of a creative studio's taste and a senior engineering team's rigor.

**Positioning statement**
> Premium websites for ambitious brands — where design meets performance.

**Primary tagline:** *We Build Digital Experiences That Perform.*

Alternates (use sparingly, by context):
- Crafting Websites Worth Remembering.
- Premium Websites for Ambitious Brands.
- Where Design Meets Performance.

### Brand personality
Confident · Visionary · Sophisticated · Innovative · Precise · Premium · Human.

### Tone of voice
Clear. Bold. Minimal. Results-driven. We avoid buzzwords, hype and exaggerated
marketing claims. We make confident statements and back them with outcomes.

| Do | Don't |
|----|-------|
| "We Build Websites That Make Brands Impossible to Ignore." | "We are a synergistic, world-class, cutting-edge solution provider." |
| "+182% conversion." | "Skyrocket your revenue to the moon!" |
| Short, declarative sentences. | Run-on paragraphs of jargon. |

---

## 2. Logotype

The wordmark is **Yash × Daksh**, set in Space Grotesk (display), with the
connecting **`x`** rendered in the accent gradient (`#5B7CFF → #8B5CF6`).

```
Yash x Daksh
     ▲ accent-gradient
```

Rules:
- Keep the `x` lowercase and gradient-filled; the surrounding words stay in
  `text-primary` (#F8FAFC).
- Minimum clear space around the wordmark = the cap-height of "Y".
- Never stretch, recolor the full wordmark, or add drop shadows.
- The app icon (`app/icon.svg`) abstracts the mark into two opposing chevrons
  (`>< `) meeting at a gradient node — symbolizing two forces converging.

---

## 3. Color System

The palette is a luxury dark system: deep near-black grounds, restrained accent
usage, light reserved for emphasis.

| Role | Token | Hex | Usage |
|------|-------|-----|-------|
| Primary background | `base` | `#08090D` | Page ground |
| Secondary background | `surface-muted` | `#111318` | Alternating sections |
| Surface | `surface` | `#171A21` | Raised panels |
| Primary accent | `accent` | `#5B7CFF` | CTAs, links, highlights |
| Secondary accent | `accent-violet` | `#8B5CF6` | Gradient partner, depth |
| Text primary | `ink` | `#F8FAFC` | Headlines, key copy |
| Text secondary | `ink-muted` | `#94A3B8` | Body, supporting copy |
| Hairline | `line` | `rgba(248,250,252,0.08)` | Borders, dividers |

**Accent gradient:** `linear-gradient(110deg, #5B7CFF, #8B5CF6)` — used for the
logo `x`, key words, metrics and primary buttons. Use accent **sparingly** — its
scarcity is what makes the brand feel expensive.

Contrast: `ink` on `base` = ~17:1, `ink-muted` on `base` = ~6:1 — both pass
WCAG AA for their sizes. Never use accent-on-base for body text (decorative only).

---

## 4. Typography

| Role | Typeface | Notes |
|------|----------|-------|
| Display / Headings | **Space Grotesk** | Confident, geometric, modern. Weights 400–700. |
| Body / UI | **Inter** | Maximum readability. Weights 300–600. |

> The brief also lists Satoshi / Neue Montreal / General Sans as alternates. The
> production build uses Space Grotesk + Inter (self-hosted via `next/font` for
> zero layout shift and no third-party requests). Swap in Satoshi via Fontshare
> if a license is in place — wire it through the `--font-display` CSS variable.

### Type scale (fluid, `clamp`-based)
- `display-xl` — clamp(2.75rem → 8.5rem), line-height 0.95, tracking −0.03em
- `display-lg` — clamp(2.25rem → 5.5rem) — hero & footer headlines
- `display-md` — clamp(1.75rem → 3.25rem) — section headlines
- Body — 16–18px, line-height 1.6–1.75, max line length 65–75ch

### Rules
- Large, confident headlines with tight tracking and balanced wrapping.
- Strong hierarchy: one dominant headline per section.
- Generous whitespace; minimal text; maximum readability.

---

## 5. Imagery & 3D

- The hero centerpiece is a **morphing glass-and-metal orb** — the brand's living
  metaphor for *ideas transforming into digital experiences*.
- Reflections come from in-scene lightformers tinted in brand accents.
- Prefer depth, layering, soft shadows and ambient light over flat illustration.
- Avoid: neon overload, harsh glows, heavy blur, cartoonish or stocky visuals.

---

## 6. Logo & Color Misuse

❌ Don't recolor the wordmark to a single flat accent.
❌ Don't place the brand on bright/light grounds (it's a dark-first identity).
❌ Don't introduce additional accent hues (greens, oranges) — stay disciplined.
❌ Don't use accent as a large background fill — it reads cheap at scale.
