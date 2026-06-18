# YashxDaksh — Motion Guidelines

Motion is treated as a product feature, not decoration. Every animation has a
purpose: to guide attention, communicate craft, or create a moment of delight.

## Principles

1. **Elegant** — restrained, never busy. One thing moves at a time.
2. **Fast** — micro-interactions 150–300ms; reveals 600–900ms.
3. **Fluid** — a single signature easing for continuity.
4. **Precise** — animate `transform` / `opacity` only (GPU-friendly, 60 FPS).

## Signature easing

```ts
const EASE = [0.16, 1, 0.3, 1]; // expo-out — used across reveals & transitions
```

Secondary: `cubic-bezier(0.87, 0, 0.13, 1)` (in-out-expo) for symmetrical moves.

## Timing reference

| Interaction | Duration | Easing |
|---|---|---|
| Hover / color / cursor | 150–300ms | ease / smooth |
| Word reveal (heading) | 900ms, 45ms stagger | expo-out |
| Section reveal (fade-up) | 800ms | expo-out |
| Carousel / accordion | 400–500ms | expo-out |
| Preloader | ~1.7s + 0.65s lift | cubic |

## The motion system

| Feature | Implementation |
|---|---|
| Smooth scroll | **Lenis** (`useSmoothScroll`), rAF loop, progress → store |
| Scroll progress bar | Framer `useScroll` + `useSpring` |
| Scroll storytelling | Process timeline fills via `useScroll` offsets |
| 3D centerpiece | R3F `useFrame` — pointer parallax, scroll scale, breathing distortion, moving accent light |
| Kinetic type | `AnimatedHeading` — masked word stagger |
| Magnetic buttons | pointer-tracked `useMotionValue` + `useSpring` |
| Custom cursor + trail | rAF + `lerp`, `mix-blend-difference`, grows on interactive hover |
| Section reveals | `Reveal` (whileInView, once) |
| Page entrance | Preloader → staggered hero fade-in |
| Marquee | CSS keyframe transform, dual track |

## Reduced motion (required)

`prefers-reduced-motion: reduce` is honored everywhere:

- Global CSS kills animation/transition durations as a safety net.
- Lenis smooth scroll is **not initialised**.
- The 3D canvas switches to `frameloop="demand"` and the orb stops morphing,
  floating, and light-sweeping.
- `AnimatedHeading` renders plain text; `Reveal` skips its initial offset.
- The marquee uses `motion-reduce:animate-none`.

## Performance budget

- three.js ships only via lazy dynamic import (`ssr:false`), after the preloader.
- DPR capped (`[1, 2]` desktop, `[1, 1.5]` mobile); lower geometry detail + no
  sparkles on mobile.
- No layout-triggering animations; hover states never shift layout.
