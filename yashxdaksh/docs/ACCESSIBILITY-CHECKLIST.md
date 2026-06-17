# YashxDaksh — Accessibility Checklist (WCAG 2.2 AA)

An immersive site is only premium if it's usable by everyone. This is our standing
checklist; items marked ✅ are implemented in the codebase.

## Perceivable

- ✅ **Color contrast** — `ink` on `base` ≈ 17:1; `ink-muted` on `base` ≈ 6:1 (AA).
  Accent is never used for body text.
- ✅ **Color not the only signal** — active states pair color with motion, size,
  borders and labels (nav, selectors, carousel dots).
- ✅ **Text alternatives** — icons are decorative inline SVG marked `aria-hidden`;
  meaningful controls have text or `aria-label`.
- ✅ **Reduced motion** — `prefers-reduced-motion` disables Lenis, intro, cursor,
  3D animation, and collapses all CSS transitions.
- ◻️ **OG / share image** alt — add when `og.jpg` ships.

## Operable

- ✅ **Keyboard** — all interactive elements are real `<button>` / `<a>`; accordions,
  carousel, estimator and form are fully keyboard operable.
- ✅ **Skip link** — "Skip to content" jumps to `#main` (visible on focus).
- ✅ **Focus visible** — inputs show an accent focus ring; native focus retained on
  controls (custom cursor never removes focus outlines).
- ✅ **Tab order** — DOM order matches visual order; no positive `tabindex`.
- ✅ **Target size** — buttons/pills meet ≥44px touch targets on mobile.
- ✅ **No keyboard traps**; menus/accordions toggle with Enter/Space natively.
- ✅ **Pause** — testimonial autoplay pauses on hover/focus and is reduced-motion
  aware.

## Understandable

- ✅ **Labels** — every form field uses a `<label>` wrapping its input; errors are
  announced inline next to the field.
- ✅ **Consistent navigation** — persistent nav + anchors; predictable patterns.
- ✅ **Error identification** — Zod validation messages are specific and adjacent to
  the problem field.
- ✅ **Language** — `<html lang="en">`.

## Robust

- ✅ **Semantic landmarks** — `header`, `nav`, `main`, `section`, `footer`, `figure`,
  `blockquote`, `dl`.
- ✅ **ARIA where needed** — `aria-expanded` on accordions & menu toggle,
  `aria-pressed` on estimator toggles, `aria-label` on icon-only controls,
  `aria-hidden` on decorative layers.
- ✅ **Valid structure** — one `h1`, logical heading hierarchy.

## Manual QA before launch

- [ ] Full keyboard pass (Tab/Shift-Tab/Enter/Space/Esc) across every section.
- [ ] Screen reader smoke test (VoiceOver + NVDA): landmarks, headings, form, FAQ.
- [ ] Zoom to 200% — no loss of content or horizontal scroll.
- [ ] `prefers-reduced-motion` on — confirm static, usable experience.
- [ ] Forced-colors / high-contrast mode sanity check.
- [ ] Lighthouse / axe DevTools — target Accessibility 100, zero violations.
- [ ] Verify WebGL fallback: page remains fully readable if 3D fails to load.
