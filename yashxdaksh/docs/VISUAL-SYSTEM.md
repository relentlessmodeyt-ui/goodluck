# YashxDaksh — Visual System

The visual system is implemented as Tailwind tokens in `tailwind.config.ts` and
component classes in `app/globals.css`. This document is the human-readable map.

## 1. Design Tokens

### Color
See [BRAND-GUIDELINES](./BRAND-GUIDELINES.md#3-color-system). Exposed as Tailwind
colors: `bg-base`, `bg-surface`, `bg-surface-muted`, `text-ink`, `text-ink-muted`,
`text-accent`, `bg-accent-sheen`, `border-line`.

### Spacing & Layout
- **Shell:** `max-w-shell` (84rem) centered, horizontal padding `px-gutter`
  (`clamp(1.25rem, 5vw, 5rem)`).
- **Section rhythm:** `py-28 sm:py-36`; sections alternate `base` / `surface-muted`
  grounds for cadence.
- **Radius scale:** `rounded-2xl` (cards), `rounded-3xl`, `rounded-4xl` (2rem,
  feature panels), `rounded-full` (pills, buttons, cursor).

### Z-index scale
| Layer | z |
|-------|---|
| Section content | 0–10 |
| Navbar / mobile menu | 79–80 |
| Scroll progress | 90 |
| Custom cursor | 100 |
| Intro curtain | 120 |
| Skip link (focus) | 200 |

### Elevation
- **Glass** (`.glass`): subtle white gradient + 14px backdrop blur + hairline
  border. Used for nav, cards, panels. Intentionally restrained — not frosted.
- **Accent glow:** radial `accent/5–22%` blur halos behind focal elements.
- **Grain:** `.grain` overlay at 3.5% opacity, `overlay` blend — adds a film-like
  micro-texture without muddying contrast.

## 2. Core Components

| Component | Role |
|-----------|------|
| `MagneticButton` | Spring-driven magnetic CTA (primary / secondary / ghost). |
| `AnimatedHeading` | Per-word masked reveal with optional accent highlights. |
| `Reveal` | Generic scroll fade-up wrapper. |
| `CountUp` | In-view numeric count animation (reduced-motion aware). |
| `SectionLabel` | Eyebrow with index, pulsing accent dot, divider. |
| `CustomCursor` | Dot + lagging ring + contextual label. |
| `ScrollProgress` | Top gradient progress bar (spring-smoothed). |
| `Intro` | Cinematic loading curtain. |
| `Navbar` | Floating glass nav → mobile fullscreen menu. |

## 3. Surface Patterns

- **Hairline dividers** (`.hairline`) — center-weighted gradient rule between
  sections.
- **Pills** — `rounded-full border border-line px-3 py-1` for tags & capabilities.
- **Stat blocks** — gradient-numeral + muted label, separated by hairline grid.
- **Glass panels** — feature cards, estimator, form, testimonial metric chip.

## 4. Iconography

- Inline SVG only — **no emoji** as UI icons.
- 24×24 viewBox, `1.8–2.2` stroke weight, `round` caps/joins, `currentColor`.
- Examples in repo: checkmarks (trust indicators, success), arrows (CTAs,
  carousel), plus/minus (accordions), hamburger (mobile nav).

## 5. Responsive Strategy

Breakpoints: 375 · 640 (`sm`) · 768 (`md`) · 1024 (`lg`) · 1440+.

- Multi-column grids (`Work`, `WhyUs`, `Faq`, `Contact`) collapse to single column
  below `lg`.
- The 3D scene lightens on mobile/coarse pointers (`useIsMobile`): lower DPR cap,
  fewer subdivisions, particles disabled.
- Custom cursor is desktop + fine-pointer only; touch keeps native behavior.
- Type scales fluidly via `clamp` — no fixed desktop-only headline sizes.

## 6. Anti-patterns (explicitly avoided)

- Flat cards with hard drop shadows.
- Generic SaaS hero (split text-left / screenshot-right).
- Overused purple→pink gradients at full saturation.
- Predictable equal-weight feature card grids.
- Neon glow, heavy blur, cartoonish 3D.
