# Al Hind Educations & Developments Society — website

A hand-set static website (no framework, no build step, no trackers) for
**Al Hind Educations & Developments Society**, a Mohan Garden, Delhi-based welfare
society working in education and on-the-ground public welfare across
Delhi's urban villages and bastis.

## Pages

| File | Contents |
| --- | --- |
| `index.html` | Home — mission, the six programmes, counted impact, field diary, centres table, voices, accounts & board, giving, notices, gallery teaser, FAQ, letter |
| `about.html` | History 2014–2026, five working principles, the board, what the society will not do, partners |
| `programs.html` | Operating detail for Roshni, Kitab, Hunar, Sehat, Paani and Raahat, with unit costs and live volunteer needs |
| `gallery.html` | Field photographs with captions and the consent / no-photographing-beneficiaries policy |
| `donate.html` | Gift calculator, UPI / bank / cheque / counter methods, 80G notes, foreign-contribution policy |
| `contact.html` | Address, hours, enquiry form, volunteer roles table, OpenStreetMap embed, visit etiquette |

## Run it

```bash
python3 -m http.server 8000   # from this directory
```

Then open `http://localhost:8000`. That is the whole deployment story —
any static host (GitHub Pages, Netlify, a shared cPanel) serves it as-is.

## Before publishing — replace the placeholders

The site is written with complete, plausible copy so it can be reviewed as
a finished object. The items below are **placeholders** and are marked in
the HTML with `<!-- REPLACE -->` comments:

- [ ] Registration number (`S-21412/2014`, NCT of Delhi) — topbar, footer, transparency section
- [ ] UPI ID and bank account number / IFSC on `donate.html`
- [ ] Nudge the map marker in `contact.html` to House No. 14A, Sethi Enclave Phase 1
- [ ] Bank account number / IFSC and the UPI ID on `donate.html`
- [ ] 12A / 80G and Darpan IDs in the transparency section
- [ ] Annual-report PDFs: drop real files under `assets/docs/` (names are already linked)
- [ ] Names of board members, coordinators and the quoted voices, if they differ from the draft
- [ ] Figures: every number on the site should be checked against the audited annual report before launch — the site says the report wins, so make it true

## Structure

```
assets/css/style.css   hand-set stylesheet (Fraunces + Karla)
assets/js/main.js      nav, accordions, reveal, gift calculator, forms
assets/img/            field photographs
assets/favicon.svg     the mark: an open book, a rising sun, a ground line
```

No cookies, no analytics, no external scripts beyond the two font families.
