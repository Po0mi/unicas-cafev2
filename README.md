# Unica's Café ☕

> A commissioned café website for **Unica's Café**, Cabatuan, Iloilo — built with an old-money editorial aesthetic, smooth scroll interactions, and a full menu system.

---

## Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)
![EmailJS](https://img.shields.io/badge/EmailJS-F7D000?style=for-the-badge&logo=gmail&logoColor=black)
![Lenis](https://img.shields.io/badge/Lenis_Scroll-0A0908?style=for-the-badge&logoColor=white)

---

## Features

- **Hero** — Full-bleed video background with organic GSAP entrance animations and a real-time open/closed badge (PH timezone)
- **Marquee** — Pure CSS infinite scroll ticker
- **About** — Editorial grid with concentric decorative rings
- **Menu** — Accordion layout with 9 categories, ScrollTrigger-triggered open on scroll
- **Gallery** — Masonry grid with cursor-following image preview (`gsap.quickTo`)
- **Location** — Three-column layout with live Leaflet map, custom pulsing marker, CartoDB tiles
- **Contact** — Conversational inline form powered by EmailJS, coffee beans video background

---

## Design System

| Token | Value |
|---|---|
| `$cream` | `#e6dfd4` |
| `$cream-lt` | `#f0ebe3` |
| `$brown` | `#9d6b53` |
| `$wine` | `#6b1d1d` |
| `$ink` | `#0a0908` |
| `--font-display` | Playfair Display |
| `--font-body` | Jost |
| `--font-script` | Great Vibes |
| `$ease-main` | `cubic-bezier(0.65, 0.01, 0.05, 0.99)` |

---

## Project Structure

```
src/
├── assets/          # Images (WebP), videos (WebM), logo
├── components/
│   ├── Hero.jsx / Hero.scss
│   ├── About.jsx / About.scss
│   ├── Menu.jsx / Menu.scss
│   ├── Gallery.jsx / Gallery.scss
│   ├── Location.jsx / Location.scss
│   ├── Contact.jsx / Contact.scss
│   └── Marquee.jsx / Marquee.scss
├── hooks/
│   ├── useHeroAnimation.js
│   ├── useMenuAnimation.js
│   ├── useGalleryAnimation.js
│   ├── useLocationAnimation.js
│   ├── useContactAnimation.js
│   ├── useSmoothScroll.js
│   ├── useScrollPosition.js
│   ├── useNavbarAnimation.js
│   ├── useActiveSection.js
│   ├── useToggle.js
│   └── useClickOutside.js
├── layouts/
│   ├── navbar.jsx
│   └── navbar.scss
├── App.jsx
├── App.css
└── main.jsx
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Performance Optimizations

- Images converted to **WebP**, videos to **WebM**
- Google Fonts loaded non-blocking via `media="print"` swap trick
- Lenis synced with GSAP ticker — single RAF loop, no duplicate reflows
- `useScrollPosition` throttled with `requestAnimationFrame`
- Below-fold components lazy loaded with `React.lazy` + `Suspense`
- Vite manual chunks for GSAP, Leaflet, EmailJS
- Navbar height cached in ref — no forced reflow on scroll

---

## Deployment

Deployed on **Vercel**.

---

## Credits

Built by **Dan Gabrielle De Castro**  
BS Information Technology · Central Philippine University  
Commissioned for Unica's Café, Cabatuan, Iloilo · 2026
