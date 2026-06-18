# YashxDaksh — Accessibility Checklist (WCAG 2.2 AA target)

A premium experience must be usable by everyone. This site is built dark-first
with motion as an enhancement, not a requirement.

## Structure & semantics
- [x] Single `<h1>` (hero); logical `<h2>`/`<h3>` hierarchy per section.
- [x] Landmarks: `<header>`, `<main>`, `<footer>`, `<nav aria-label>`, `<section aria-label>`.
- [x] **Skip link** ("Skip to content") as the first focusable element.
- [x] Lists use `<ul>/<li>`; quotes use `<blockquote>/<figure>/<figcaption>`.
- [x] FAQ as semantic disclosure buttons with `aria-expanded`.

## Keyboard
- [x] All interactive elements reachable and operable by keyboard.
- [x] Magnetic "buttons" expose `role="button"`, `tabIndex=0`, and Enter/Space handlers.
- [x] Tab order matches visual order; no positive tabindex.
- [x] Visible focus ring (`:focus-visible`, 2px accent, 3px offset) — never removed.

## Forms (Project Estimator)
- [x] Every input has an associated `<label>`.
- [x] Inline, descriptive validation messages (Zod) near each field.
- [x] Appropriate `type` and `autoComplete` (name, email, organization).
- [x] Errors are text, not color-only; success state is announced via content.

## Color & contrast
- [x] `ink (#F8FAFC)` on `base (#08090D)` ≫ 4.5:1.
- [x] `ink.muted (#94A3B8)` reserved for ≥14px secondary text (passes AA).
- [x] Accent is never the *only* signal — paired with icon/position/text.
- [x] Selection and focus colors are distinct and visible.

## Motion & media
- [x] `prefers-reduced-motion` fully respected (see `MOTION.md`).
- [x] No auto-playing audio; no flashing/strobe content.
- [x] Decorative layers marked `aria-hidden`; custom cursor is `aria-hidden`.
- [x] Carousel auto-advances slowly (6.5s) and has manual, labeled controls.

## Images & icons
- [x] Meaningful `next/image` assets have descriptive `alt`.
- [x] Decorative imagery is empty-alt / `aria-hidden`.
- [x] Icons are inline SVG (no emoji); icon-only controls have `aria-label`.

## Responsive & zoom
- [x] `viewport` meta with `width=device-width, initial-scale=1`.
- [x] Layouts verified at 375 / 768 / 1024 / 1440; no horizontal scroll.
- [x] Body text ≥16px on mobile; content reflows to 200% zoom.
- [x] Touch targets ≥44×44px.

## To verify before launch
- [ ] Full axe-core / Lighthouse a11y pass (target 100).
- [ ] Screen-reader sweep (VoiceOver + NVDA) of nav, estimator, FAQ.
- [ ] Real-device check on iOS Safari + Android Chrome.
