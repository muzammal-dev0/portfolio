# Portfolio — React + Vite

Personal portfolio for Muzammal Hussain: single-page home with **React Router** case-study routes, **Tailwind CSS**, **Framer Motion**, and an **AI chatbot** grounded in `data/chatbot-knowledge.txt`.

## Features

- React 18, Vite 7, Tailwind 3
- Sections: Hero, About, Projects, Contact (layout: Header, Sidebar, Footer)
- Project detail pages at `/project/:slug` (see `src/constants/projects.js`)
- Contact section: email, phone, location, and social links
- Portfolio chatbot with OpenAI + Pushover (see `docs/chatbot-implementation.md`)

## Setup

```bash
npm install
npm run dev          # UI only — chat API requires vercel dev (below)
npm run dev:full     # UI + /api/chat (recommended for chatbot)
```

### Chatbot environment (Phase 4+)

Copy `.env.example` to `.env` and set server-only variables (never prefix with `VITE_`):

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | OpenAI API key |
| `OPENAI_MODEL` | Optional, default `gpt-4o-mini` |
| `PUSHOVER_APP_TOKEN` | App token from [pushover.net/apps/build](https://pushover.net/apps/build) |
| `PUSHOVER_USER_KEY` | User key from your Pushover dashboard |

Run locally with API routes:

```bash
npm run dev:full   # uses vercel dev — requires Vercel CLI (`npm i -g vercel`)
```

On Vercel, add the same env vars under Project → Settings → Environment Variables.

Optional: set `VITE_SITE_URL` for canonical Open Graph URLs.

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
