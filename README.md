# Aaruni Multispeciality Hospital — Website

A single-page hospital website for **Aaruni Multispeciality Hospital, Jhunjhunu**,
built in a modern *kinetic studio* visual style (animated oversized typography,
full-screen marquee hero, scroll reveals, custom cursor) and recoloured into a
clean **medical teal + mint** theme.

## View it

It's plain HTML/CSS/JS — no build step. Just open `index.html`, or serve locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Structure

```
index.html            # all markup / sections
assets/css/styles.css # theme tokens + all styling
assets/js/main.js     # preloader, cursor, reveals, counters, menu, form
```

## Sections

Hero → marquee → About (+ animated stats) → Specialties (10 departments) →
Facilities (bento grid) → How we care (process) → Doctors → Patient stories →
Book Appointment (form + contact) → Footer.

## Content & contact

Hospital details (specialties, facilities, NABH accreditation, address, phone,
email) are drawn from Aaruni Multispeciality Hospital, Jhunjhunu, Rajasthan.
The appointment form is front-end only (no backend); submissions show a
confirmation message and are not sent anywhere.

## Notes

- Fully responsive, with a `prefers-reduced-motion` fallback that disables animation.
- Fonts: **Anton** (display) + **Space Grotesk** (body) via Google Fonts.
- Doctor names/photos and testimonials are representative placeholders — swap in
  real staff and patient consent before going live.
