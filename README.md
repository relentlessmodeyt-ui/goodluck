# Aaruni Multispeciality Hospital — Website

A modern, professional, fully responsive website for **Aaruni Multispeciality
Hospital**, Jhunjhunu (Rajasthan) — a NABH-accredited multispeciality hospital.

Rebuilt with a calm, trustworthy healthcare aesthetic inspired by leading
medical website designs on Dribbble & Pinterest: soft teal palette, generous
whitespace, clear typography, people-focused imagery and prominent
appointment/emergency calls-to-action.

## Highlights

- **Single-page, fast & dependency-free** — plain HTML, CSS and vanilla JS.
- **Responsive** — mobile-first layout from 320px up to large desktops.
- **Sections** — hero, quick actions, about, stats, specialities, facilities,
  why-choose-us, appointment form, contact + map, footer.
- **Interactive** — sticky header, mobile menu, animated stat counters,
  scroll-reveal animations, client-side appointment form validation and a
  floating emergency-call button.
- **Accessible & SEO-ready** — semantic markup, descriptive alt text, ARIA
  labels, meta/Open Graph tags, `prefers-reduced-motion` support.

## Project structure

```
.
├── index.html              # Page markup
├── assets/
│   ├── css/style.css       # Design system + responsive styles
│   └── js/script.js        # Interactions
└── README.md
```

## Run locally

It's a static site — open `index.html` directly, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Customising

- **Hospital info** (phone, email, address) lives in `index.html`.
- **Brand colours** are CSS variables at the top of `assets/css/style.css`
  (`--primary`, `--accent`, etc.).
- **Photos** use Unsplash placeholders — swap the `src` URLs in `index.html`
  for the hospital's own photography when available.
- The **appointment form** is currently client-side only. Connect it to an
  email service, form backend or WhatsApp link in `assets/js/script.js`.

## Contact

**Aaruni Multispeciality Hospital**
1-194, Housing Board Colony, Basant Vihar, Opp. Lamba Coaching, Churu Road,
Jhunjhunu, Rajasthan 333001 · Phone: +91 95878 75550 · Open 24×7
