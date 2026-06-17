# YashxDaksh — Wireframes & Information Architecture

Single-page cinematic journey. Each section is anchored for in-page navigation.
Low-fidelity structure below; visual treatment lives in the implemented components.

## Navigation Map

```
#top (Hero) → #work → #services → #process → #why → testimonials → #faq → #contact → footer
```

Floating glass nav (Work · Services · Process · Studio · Contact) + persistent
"Start Your Project" CTA. Mobile → hamburger → fullscreen menu.

---

## 0 · Intro (overlay)
```
┌──────────────────────────────────────────┐
│                                          │
│              Yash x Daksh                 │
│        ▓▓▓▓▓▓▓▓░░░░░░░░  (loading bar)     │
│        072 — LOADING EXPERIENCE           │
│                                          │
└──────────────────────────────────────────┘
```

## 1 · Hero  (#top)  — full-screen
```
┌──────────────────────────────────────────┐
│   ● Premium Web Design & Development       │
│                                          │
│        WE BUILD WEBSITES THAT MAKE        │
│        BRANDS [IMPOSSIBLE TO IGNORE]       │   ← kinetic headline
│                                          │
│        immersive experiences… subcopy      │
│                                          │
│     [ Start Your Project ] [ Explore Work ]│
│                                          │
│  ✓ Fast Delivery  ✓ Conversion-Focused …  │
│                                          │
│            ◉ (3D morphing orb)            │   ← behind/around copy
│                  ⌄ Scroll                 │
└──────────────────────────────────────────┘
```

## 2 · Trust Marquee
```
←  Lumen Capital · Atelier Noir · Northwind AI · Meridian · …  (infinite) →
```

## 3 · Selected Work  (#work)
```
01 Selected Work            Work that earns attention.
┌────────────────────┬─────────────────────────────┐
│ Lumen        2025  │  ┌───────────────────────┐   │
│ Atelier Noir 2025  │  │   CLIENT visual / glow │   │
│ Northwind    2024  │  └───────────────────────┘   │
│ Meridian     2024  │  [tags]                      │
│  (hover/focus →    │  Problem · Solution · Result │
│   swaps preview)   │  +182%   0.9s   99           │
└────────────────────┴─────────────────────────────┘
```
Left list drives the sticky right preview (problem → solution → results + metrics).

## 4 · Services  (#services)
```
02 Services        A full studio, end to end.
─────────────────────────────────────────────
01  Web Design                              (+)
      summary…                    [chips]
02  Web Development                          (+)
03  Branding                                 (+)
04  UI/UX Design                             (+)
05  E-commerce                               (+)
06  SEO Optimization                         (+)
```
Interactive accordion modules; active row sweeps an accent gradient.

## 5 · Process  (#process)
```
03 Process     A proven path from idea to impact.
│
●01  Discover    description + deliverables
│
●02  Strategy    …            ← vertical accent track
│                                draws with scroll
●03  Design
●04  Develop
●05  Launch
●06  Optimize
```

## 6 · Why YashxDaksh  (#why)
```
04 Why YashxDaksh                 ┌ 01 Custom solutions ───┐
The obvious choice…               ├ 02 Performance-first ──┤
[ 98+ ][ 60fps ]                  ├ 03 Modern stack ───────┤
[ 2.4× ][ 100% ]  (count-up)      ├ 04 Transparent comms ──┤
                                  └ 05 Long-term partner ──┘
```

## 7 · Testimonials
```
05 Testimonials
“ Quote that spans large display type … ”      ┌ EV ┐ Elena Volkov
                                               └────┘ CEO, Lumen
   ●▬▬ ● ● ●            ‹  ›                    [ +182% conversion lift ]
```
Auto-advancing carousel, dots + prev/next, pauses on hover.

## 8 · FAQ  (#faq)
```
06 FAQ            Questions, answered.
  How long does a project take?            (−)
    answer…
  What does a project cost?                (+)
  Do you work across timezones?            (+)
  Can I update it myself?                  (+)
  Do you handle maintenance?               (+)
```

## 9 · Contact  (#contact)
```
07 Contact      Let's build something extraordinary.
┌ Project estimator ──────────┐  ┌ Get in touch ─────────┐
│ Scope: [Web][Dev][Brand]… │  │ Name  [__________]     │
│ Budget: [ $25–50k ]        │  │ Email [__________]     │
│ Timeline: [ 1–2 months ]   │  │ Company [________]     │
│ ── Estimated investment ── │  │ About  [__________]    │
│      $48k – $96k           │  │ [ Start Your Project → ]│
└────────────────────────────┘  └────────────────────────┘
```
Live estimate updates as selectors change; form validates (Zod) → success state.

## 10 · Footer
```
              Ready when you are.
          [ Start Your Project ]
─────────────────────────────────────────────
Yash x Daksh   |  Explore  |  Connect  |
© 2026 YashxDaksh        Crafted with precision
```
