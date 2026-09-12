# Al-Hind Education — Mohan Garden, Delhi

**Mohan Garden's most trusted coaching institute** — Fully mobile-responsive website for Al-Hind Education, based at **A-Block, Main Mohan Garden Road, Near Nawada Metro (Pillar 742), Uttam Nagar, New Delhi - 110059**.

Live site: open `index.html` directly — no build step required.

## 📱 Fully Mobile-Responsive

Built mobile-first and tested from 320px to 1440px:

- **Viewport & fluid type**: `meta viewport`, `clamp()` typography, `overflow-x: hidden`
- **Hamburger drawer**: slide-in menu (transform) with backdrop, body-scroll lock, `aria-expanded`, auto-close on link / resize
- **Layout**: Tailwind responsive grid — 1 col on mobile → 2 col on tablet → 3/4 col on desktop; no fixed widths
- **Touch targets**: all buttons/links ≥ 44px, large tap areas, `inputmode="numeric"` for phone, sticky bottom CTA bar on mobile
- **Images**: `object-cover`, `aspect-ratio`, responsive `max-width:100%`
- **Horizontal scroll**: testimonial snap-scroll on mobile (`snap-x`, `no-scrollbar`), clean grid on desktop
- **Sticky header**: `backdrop-blur-xl`, collapses gracefully, shadow on scroll
- **Forms**: stacked on mobile (1 col), 2-col on desktop; focus rings, `reportValidity()`
- **Performance**: CDN Tailwind + Font Awesome, system fonts, lazy map iframe, no heavy JS

## 📍 Mohan Garden, Delhi — Localised Everywhere

- **Address everywhere**: top bar, hero, about, contact card, footer, drawer, map strip
- **Geo**: `Nawada Metro (Blue Line, 700m)`, Uttam Nagar East, Dwarka Mor, Vikas Nagar, Pillar 742
- **Contact**: `+91 98765 43210` tel/whatsapp links, `info@alhindeducation.com`
- **Map**: embedded Google Maps for Mohan Garden 110059 + “Get Directions” → Google Maps
- **SEO**: `geo.region` / `geo.placename`, `EducationalOrganization` JSON-LD with PostalAddress + GeoCoordinates

## 🚀 Run

```bash
# just open
open index.html
# or serve
npx serve .
# or
python -m http.server 8000
```

## 🎨 Stack

- Tailwind CSS (CDN) + custom config (`primary #0f6d4a`, `accent #f59e0b`)
- Plus Jakarta Sans + Manrope, Font Awesome 6
- Vanilla JS (22 lines: menu, scroll, form→WhatsApp)
- No build, no npm

## 📂 Structure

```
Al-hind-education/
├── index.html   — entire site (single file, production-ready)
└── README.md
```

Form submits show inline success + auto-opens WhatsApp with pre-filled enquiry for the Mohan Garden centre.
