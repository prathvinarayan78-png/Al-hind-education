# Al-Hind Education Society (Regd. 2014) — Mohan Garden, Delhi

**Chief Executive: Naim Bilal Nadvi**

Interactive, scroll-driven, fully mobile-responsive website for **Al-Hind Education Society**, registered in **2014** under Societies Registration Act XXI, 1860. Based at **Mohan Garden, Uttam Nagar, New Delhi - 110059** (Near Nawada Metro Pillar 742).

### ✨ Interactive & Scroll-Driven
- **Scroll progress bar** + mini progress in hero, **parallax hero** (image + floating cards move at different speeds)
- **Reveal on scroll** via `IntersectionObserver` + **GSAP ScrollTrigger** for stacked course cards
- **Timeline fill**: vertical line in “Journey Since 2014” fills as you scroll through milestones (2014 → 2025)
- **Sticky storytelling**: Chief Executive profile stays pinned while his story scrolls
- **Stacked peel cards**: Courses stick at `top:96px` then peel away (desktop) — normal flow on mobile
- **Horizontal campus**: vertical scroll drives horizontal `translateX` of campus track (desktop); swipe on mobile
- **Counters animate** when in view (`data-count`), **magnetic CTA**, **scroll-spy dots** (right side), nav blur on scroll
- **Mobile:** hamburger drawer, sticky bottom CTA, snap-scroll testimonials, no horizontal overflow, all touch ≥44px

### 📍 Mohan Garden + 2014 + Chief Executive
- Every section references **Regd. 2014**, **Mohan Garden 110059**, and **Naim Bilal Nadvi**
- SEO + `Society` + `EducationalOrganization` context, map embed, directions links

### 🚀 Run
```bash
open index.html
# or
python -m http.server 8000
```

Single file — no build. Tailwind CDN + GSAP CDN + Font Awesome.
