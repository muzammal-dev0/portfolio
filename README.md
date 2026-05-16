# Portfolio — React + Vite

Personal portfolio for Muzammal Hussain: single-page home with **React Router** case-study routes, **Tailwind CSS**, **Framer Motion**, and a **Web3Forms** contact integration.

## Features

- React 18, Vite 5, Tailwind 3
- Sections: Hero, About, Projects, Contact (layout: Header, Sidebar, Footer)
- Project detail pages at `/project/:slug` (see `src/constants/projects.js`)
- Contact form posts to [Web3Forms](https://web3forms.com/) when configured

## Setup

```bash
npm install
npm run dev
```

Copy environment variables:

```bash
cp .env.example .env
```

Edit `.env` and set `VITE_WEB3FORMS_ACCESS_KEY` (create a free access key on Web3Forms). Without it, the form shows a configuration notice instead of sending mail.

Optional: set `VITE_SITE_URL` to your production origin and use it for absolute Open Graph image URLs in `index.html` if needed.

## Project structure

```
portfolio/
├── public/
│   ├── _redirects       # Netlify SPA fallback (/* → /index.html)
│   ├── favicon.svg
│   ├── assets/          # CV, project screenshots
│   └── images/
├── src/
│   ├── App.jsx              # Home scroll page + hash / scroll state handling
│   ├── main.jsx             # Router entry
│   ├── constants/           # personalInfo, projects, skills, experience
│   ├── components/
│   │   ├── layout/          # Header, Footer, Sidebar
│   │   ├── sections/        # Hero, About, Projects, Contact
│   │   ├── magicui/         # Decorative UI
│   │   └── ui/
│   ├── hooks/
│   ├── pages/
│   │   └── ProjectDetail.jsx
│   ├── styles/
│   └── utils/
├── index.html
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Customization

| What | Where |
|------|--------|
| Name, headline, bio, socials | `src/constants/personalInfo.js` |
| Projects, slugs, bullets, links | `src/constants/projects.js` |
| Work history | `src/constants/experience.js` |
| Skill blurbs (About Dev Stack) | `src/constants/skills.js` |

## Build and preview

```bash
npm run build
npm run preview
```

## Performance checklist

After deploying to a real URL, run **Lighthouse** (Chrome DevTools → Lighthouse) on mobile and desktop. This repo uses `loading="lazy"` on non-critical images, `preconnect` for CDN fonts/icons in `index.html`, and `fetchPriority="high"` on the hero profile image.

## Deployment

- **Vercel / Netlify**: connect the repo; SPA routes are handled automatically. For Netlify, `public/_redirects` is included for client-side routes such as `/project/:slug`.
- **GitHub Pages**: you need a `404.html` copy of `index.html` or hash-based routing; simplest is Vercel/Netlify.

## Author

Muzammal Hussain
