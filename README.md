# Aaruni Multispeciality Hospital — Website

A modern, clean healthcare website for **Aaruni Multispeciality Hospital, Jhunjhunu**
— Dribbble-inspired UI with a fresh medical **teal/green** theme: soft cards,
rounded corners, friendly typography and subtle scroll motion.

## View it

Plain HTML/CSS/JS, no build step. Open `index.html`, or serve locally:

```bash
python3 -m http.server 8000   # → http://localhost:8000
```

## Structure

```
index.html             # all markup / sections
assets/css/clinic.css  # design system + all styling
assets/js/clinic.js    # nav, scroll reveals, counters, form, back-to-top
```

## Sections

Top bar → sticky header → hero (with floating cards) → highlights strip →
specialties (10 departments) → why Aaruni (+ animated stats) → facilities →
how it works (3 steps) → doctors → patient stories → appointment form + contact → footer.

## Content

Hospital details (specialties, facilities, NABH accreditation, address, phone,
email) reflect Aaruni Multispeciality Hospital, Jhunjhunu, Rajasthan. The
appointment form is front-end only (shows a confirmation; nothing is sent).
Doctor names and testimonials are representative placeholders — swap in real
staff (with consent/photos) before going live.

## Notes

- Fully responsive, with a `prefers-reduced-motion` fallback.
- Font: **Plus Jakarta Sans** (Google Fonts). Icons are inline SVG.
