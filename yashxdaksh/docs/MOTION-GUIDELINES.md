# YashxDaksh — Motion Guidelines

> Motion is a product feature. Every animation has a purpose; every interaction
> communicates craftsmanship. Target: a consistent 60 FPS.

## 1. Principles

1. **Purposeful** — motion guides attention, establishes hierarchy or confirms an
   action. Never decorative-only.
2. **Fast & fluid** — micro-interactions 150–300ms; reveals 600–900ms; nothing
   slower than ~1s except the deliberate intro.
3. **Elegant easing** — we lead and trail, never linear (except marquees).
4. **Performant** — animate `transform` and `opacity` only. No layout-thrashing
   width/height/top transitions.
5. **Respectful** — everything degrades for `prefers-reduced-motion`.

## 2. Signature Easing Curves

Defined in `tailwind.config.ts` and reused across Framer/GSAP:

| Name | Cubic-bezier | Use |
|------|--------------|-----|
| `smooth` | `0.22, 1, 0.36, 1` | Reveals, accordions, layout |
| `expo` | `0.16, 1, 0.3, 1` | Headline word reveals, hero copy |
| spring | stiffness 200 / damping 15 | Magnetic buttons |
| spring | stiffness 120 / damping 30 | Scroll progress |

## 3. Timing Reference

| Interaction | Duration | Easing |
|-------------|----------|--------|
| Button hover (bg sheen) | 500ms | smooth |
| Color/border hover | 200ms | default |
| Word reveal (per word) | 900ms, 55ms stagger | expo |
| Scroll fade-up | 800ms | smooth |
| Accordion expand | 400–450ms | smooth |
| Carousel transition | 550ms | smooth |
| Count-up | 1600ms | ease-out cubic |
| Intro counter | 2000ms + 350ms hold | ease-out cubic |
| Intro curtain exit | 600ms | smooth |

## 4. Interaction Patterns

- **Magnetic buttons** — element + label lean toward the pointer (spring), reset on
  leave. Strength ~0.4. Triggers the custom-cursor label.
- **Custom cursor** — precise dot + ring that lags at `lerp 0.18`; swells and shows
  a contextual label ("View" / "Go") over interactive targets. Pure rAF, zero React
  re-renders on move.
- **Kinetic typography** — headings split by word, each rising from a clipping mask
  with opacity, staggered.
- **Scroll storytelling** —
  - Hero copy parallaxes up and fades; the 3D orb recedes, sinks and spins down as
    `scrollY / vh` → 1, guiding the eye into the next section.
  - Process timeline draws its accent track via `scaleY` tied to scroll progress;
    each step fades + slides in.
- **Section reveals** — `AnimatedHeading` + `Reveal` fire once at `-10/-12%` margin.
- **Scroll progress** — spring-smoothed top gradient bar.
- **Page/region transitions** — `AnimatePresence` for carousel, accordions, form ↔
  success state, estimator value changes.

## 5. The 3D Motion Layer

Implemented with `useFrame` + `THREE.MathUtils.damp` for frame-rate-independent
smoothing:

- Orb tilt follows pointer (damped) plus slow idle rotation.
- Two accent point-lights chase the pointer → volumetric, reactive lighting.
- Distortion material breathes via animated `distort`/`speed`.
- Camera rig drifts opposite the pointer for parallax depth.
- Scroll drives scale-down + downward drift of the whole group.

## 6. Reduced Motion

When `prefers-reduced-motion: reduce`:
- Lenis smooth scroll is **not** initialized (native scroll).
- The intro is skipped instantly.
- The custom cursor is disabled (native cursor restored).
- R3F `frameloop` switches to `demand`; float, distortion, particles and
  pointer-reactivity are neutralized.
- A global CSS rule collapses all animation/transition durations to ~0.

## 7. Performance Budget

- 3D: DPR capped (2 desktop / 1.5 mobile), geometry subdivisions reduced on mobile,
  particles disabled on mobile, single-frame environment bake.
- Cursor and 3D pointer tracking use passive listeners + rAF, never state updates.
- GSAP ticker drives Lenis so ScrollTrigger stays in sync without double rAF loops.
