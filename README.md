# Portfolio — React + Vite

Personal portfolio for Muzammal Hussain: single-page home with **React Router** case-study routes, **Tailwind CSS**, **Framer Motion**, and an **AI chatbot** grounded in `data/chatbot-knowledge.txt`.

Live site: [portfolio-sigma-bice-58.vercel.app](https://portfolio-sigma-bice-58.vercel.app/)

## Features

- React 18, Vite 7, Tailwind 3
- Sections: Hero, About, Projects, Work Experience, Contact
- Project detail pages at `/project/:slug` (see `src/constants/projects.js`)
- Contact section: email, phone, location, and social links
- Floating chat widget — OpenAI answers in first person, Pushover alerts for leads and unknown questions

## Setup

```bash
npm install
npm run dev          # UI only — chat API requires vercel dev (below)
npm run dev:full     # UI + /api/chat (recommended for chatbot)
```

Optional: copy `.env.example` to `.env` for local chatbot testing and set `VITE_SITE_URL` for canonical Open Graph URLs.

## Chatbot

The chatbot answers as Muzammal using only `data/chatbot-knowledge.txt`. Out-of-scope questions are refused. When someone wants to connect or asks something not in the knowledge file, you get a **Pushover** notification.

### Architecture

```text
Browser (ChatWidget → useChatbot)
    │  POST /api/chat { messages }
    ▼
Vercel serverless (api/chat.js)
    │  OpenAI gpt-4o-mini + tool calling
    ├── record_user_details  → Pushover (lead)
    └── record_unknown_question → Pushover (unknown question)
```

Key files:

| Path | Purpose |
|------|---------|
| `data/chatbot-knowledge.txt` | Single source of truth for AI answers |
| `api/chat.js` | Vercel handler, rate limiting, OpenAI loop |
| `api/chat/tools.js` | Tool schemas + lead / unknown-question handlers |
| `api/chat/notify.js` | Pushover notifications |
| `src/components/chat/` | Chat widget UI |
| `src/hooks/useChatbot.js` | Client message state + API calls |

### Environment variables

Server-only — **never** prefix with `VITE_` (keeps keys out of the browser bundle).

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | OpenAI API key |
| `OPENAI_MODEL` | No | Default `gpt-4o-mini` |
| `PUSHOVER_APP_TOKEN` | Yes | App token from [pushover.net/apps/build](https://pushover.net/apps/build) |
| `PUSHOVER_USER_KEY` | Yes | User key from your Pushover dashboard |
| `CHAT_RATE_LIMIT_PER_MIN` | No | Default `10` requests per IP per minute |

Copy `.env.example` to `.env` for local development.

### Local development

`npm run dev` serves the UI but **not** `/api/chat`. Use:

```bash
npm i -g vercel    # once
npm run dev:full   # vercel dev — UI + API
```

### Deploy to Vercel

1. Connect the repo to Vercel (framework: Vite, output: `dist`).
2. **Settings → Environment Variables** — add `OPENAI_API_KEY`, `PUSHOVER_APP_TOKEN`, `PUSHOVER_USER_KEY` (and optional `OPENAI_MODEL`, `CHAT_RATE_LIMIT_PER_MIN`) for Production, Preview, and Development.
3. **Redeploy** after adding or changing env vars.

Set a monthly usage cap in the [OpenAI dashboard](https://platform.openai.com/settings/organization/limits) to control cost.

### Updating chatbot knowledge

When your background changes, edit `data/chatbot-knowledge.txt` first, then redeploy. The bot only knows what is in that file — it does not read `public/assets/CV.pdf` or the React constants automatically.

Keep portfolio constants (`src/constants/`) in sync manually if you want the site and chatbot to match.

### Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| “Chat is not configured” | `OPENAI_API_KEY` missing on Vercel — add it and redeploy |
| Chat works locally but not in production | Env vars not set for Production, or deploy happened before vars were added |
| No Pushover alerts | Check `PUSHOVER_APP_TOKEN` and `PUSHOVER_USER_KEY`; confirm the Pushover app is registered |
| “Too many messages” | Rate limit (`CHAT_RATE_LIMIT_PER_MIN`) — wait a minute |
| API errors in dev with `npm run dev` | Use `npm run dev:full` instead — Vite alone does not run serverless functions |

### Rollback

To disable the chatbot quickly:

1. Remove `<ChatWidget />` from `src/main.jsx`
2. Redeploy

Optionally delete `api/` and remove chatbot env vars from Vercel.

## Project structure

```
portfolio/
├── api/
│   ├── chat.js                 # Vercel POST /api/chat
│   └── chat/                   # tools, notify, knowledge context, system prompt
├── data/
│   └── chatbot-knowledge.txt   # Chatbot knowledge base
├── public/
│   ├── _redirects              # Netlify SPA fallback
│   ├── assets/                 # CV, project screenshots
│   └── images/
├── src/
│   ├── App.jsx
│   ├── main.jsx                # Router + ChatWidget
│   ├── components/
│   │   ├── chat/               # ChatWidget, ChatMessage, ChatInput
│   │   ├── layout/
│   │   ├── sections/
│   │   └── ...
│   ├── constants/
│   ├── hooks/                  # useChatbot.js
│   └── pages/
├── vercel.json
├── vite.config.js
└── tailwind.config.js
```

## Customization

| What | Where |
|------|--------|
| Name, headline, bio, socials | `src/constants/personalInfo.js` |
| Projects, slugs, bullets, links | `src/constants/projects.js` |
| Work history | `src/constants/experience.js` |
| Skill blurbs (About Dev Stack) | `src/constants/skills.js` |
| Chatbot knowledge | `data/chatbot-knowledge.txt` |

## Build and preview

```bash
npm run build
npm run preview
```

## Deployment

- **Vercel** (recommended): connect the repo; `vercel.json` configures the Vite build. Serverless functions in `api/` deploy automatically.
- **Netlify**: SPA routes use `public/_redirects`. Chat API requires Netlify Functions or similar — this project targets Vercel for the chatbot backend.
- **GitHub Pages**: no serverless API support for the chatbot without an external backend.

## Author

Muzammal Hussain
