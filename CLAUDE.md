# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server (localhost:5173)
npm run build     # production build → dist/
npm run preview   # serve dist/ locally to verify build
```

No test suite is configured.

## Environment

Optional: copy `.env.example` to `.env` and set `VITE_SITE_URL` for Open Graph. Chatbot server env vars (`OPENAI_API_KEY`, `PUSHOVER_*`) are documented in `README.md`.

## Architecture

Single-page application with one extra route:

- `/` → `App.jsx` — renders all sections in order (Hero → About → TechnicalSkills → Projects → WorkExperience → Contact), wrapped in Header/Footer. Navigation is scroll-based; `useScrollAnimation` adds CSS classes as sections enter the viewport, and `scrollToSection` / `handleNavClick` handle smooth-scroll targeting.
- `/project/:slug` → `pages/ProjectDetail.jsx` — standalone detail page for a project. Redirects to `/` if the slug is not found.

**Path alias:** `@` maps to `src/` (configured in `vite.config.js`).

## Data layer (`src/constants/`)

All content lives in flat JS constant files — there is no CMS or API:

| File | What it holds |
|---|---|
| `personalInfo.js` | Name, headline, bio, email, social links |
| `projects.js` | Project list + `getProjectBySlug()` lookup used by the detail route |
| `experience.js` | Work history timeline |
| `skills.js` | Skill blurbs for the About dev-stack section |
| `iconCloudSkills.js` / `skillIcons.js` | Icon identifiers for the TechnicalSkills cloud |
| `profileImage.js` | Profile image source |

To add or edit content, update the relevant constants file; no component changes are needed.

## Styling

Tailwind CSS 3 with a custom `font-sans` (Inter) and `font-sansation` (Sansation) added in `tailwind.config.js`. Global base styles are split across `src/index.css` (Tailwind directives) and `src/styles/styles.css` (custom animations: `animate-fadeIn`, `animate-slideUp`). The `cn` utility (`src/utils/cn.js`) combines `clsx` + `tailwind-merge` for conditional class merging.

## Routing and navigation

The Header links use `location.state.scrollTo` to trigger cross-route scrolling: navigate to `/` with state, then `App.jsx` picks up the state in a `useEffect` and calls `scrollToSection`. Hash links (`/#projects`) are also handled as a fallback.

## Deployment

`public/_redirects` contains a Netlify SPA catch-all (`/* /index.html 200`). For other hosts, ensure all routes fall back to `index.html`.
