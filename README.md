# Aaruni Multi Speciality Hospital — Website

A premium, **dark-purple "cosmic" healthcare website** for **Aaruni Multi Speciality
Hospital, Jhunjhunu**. Two-color theme (deep violet-black + neon violet), a replicated
hero with a glowing planet, neon **heart** & **brain**, twinkling sparkles, and motion
throughout — 3D depth, parallax, glass, glow and cinematic scroll reveals.

## View it

Plain HTML/CSS/JS, no build step. Open `index.html`, or serve locally:

```bash
python3 -m http.server 8000   # → http://localhost:8000
```

## Structure

```
index.html             # all markup / sections
assets/css/clinic.css  # design system + all styling (two-color violet theme)
assets/js/clinic.js    # motion engine, parallax, reveals, tilt, counters, form
```

## Motion stack

Loaded from CDN, all **optional & guarded** (the site degrades gracefully and
respects `prefers-reduced-motion`):

- **GSAP + ScrollTrigger** — scroll-reveal animations
- **Lenis** — smooth scrolling
- Custom vanilla JS — hero scroll + mouse **parallax** (on wrapper layers so the
  CSS keyframe animations never conflict), 3D **tilt** cards, sparkle field,
  count-up stats.

## Sections

Sticky nav → cosmic **hero** (planet · neon heart & brain · sparkles) → highlights
strip → **Hospital Specialities** (cards hanging from a rail, gentle sway) →
**Special Cure** (50/50 hover-to-flip cards with animated icons — cardiology's
heartbeat, neurology's brain) → Why Aaruni (+ animated stats) → facilities (3D tilt)
→ how it works → doctors (no photos) → patient stories → appointment form + contact → footer.

## Content

Hospital details reflect Aaruni Multi Speciality Hospital, Jhunjhunu, Rajasthan.
The appointment form is front-end only (shows a confirmation; nothing is sent).
Doctor names and testimonials are representative placeholders — swap in real staff
before going live.

## Notes

- Fully responsive; touch devices get **tap-to-flip** on the Special Cure cards.
- Fonts: **Space Grotesk** (display) + **Plus Jakarta Sans** (body), via Google Fonts.
- Icons and the hero heart/brain are inline SVG (no image assets required).
- **Deploy:** the GitHub Pages workflow publishes on push to `main`. This branch is a
  safe preview — merge it into `main` to go live.
