# Portfolio Chatbot — Implementation Plan

> **Status:** Draft for review  
> **Author:** Muzammal Hussain  
> **Last updated:** 2026-06-30  
> **Purpose:** Spec for a portfolio chatbot grounded in a plain-text knowledge file. Review this document before implementation. Changes can be made here first, then built to match.

---

## 1. Summary

Add a floating chat widget to the portfolio that:

1. **Answers as Muzammal Hussain** (first person) using content from **`data/chatbot-knowledge.txt`**.
2. **Refuses out-of-scope questions** — if the answer is not in the knowledge file, the bot apologizes and does not invent facts.
3. **Captures leads & unknown questions** via **OpenAI tool calling** in Phase 4 — notifies you instantly via **Pushover**:
   - `record_user_details` → push when someone wants to connect (name, email, notes)
   - `record_unknown_question` → push when a question is irrelevant / not in the knowledge file

No separate backend application. A single **Vercel serverless function** holds the OpenAI API key, runs the tool loop, and sends **Pushover push notifications** when someone wants to connect or asks an irrelevant question — introduced in **Phase 4** only.

The existing **Send Message** contact form is removed in **Phase 1** so visitors use the chatbot instead of a duplicate UI.

### Phased rollout (build order)

| Phase | What ships | Backend / AI |
|-------|------------|--------------|
| **Phase 1** | **Remove contact send-message form** — keep contact info only | None |
| **Phase 2** | Chat icon + panel UI only | None |
| **Phase 3** | Send/receive messages with **hardcoded** replies | None (client-side only) |
| **Phase 4** | **AI** answers + Pushover tools | `api/chat.js` |
| **Phase 5** | Production hardening, docs, deploy verification | Same as Phase 4 |

Implement **one phase at a time**. Do not start the next phase until the current phase is reviewed and merged.

> **Primary implementation guide:** Section 14 (phases + tasks).

---

## 2. Goals & non-goals

### Goals

| # | Goal |
|---|------|
| G1 | **Remove duplicate contact form UI** — chatbot handles messaging and leads (Phase 1) |
| G2 | Simple, maintainable implementation aligned with the current React + Vite stack |
| G3 | Grounded answers only from `data/chatbot-knowledge.txt` |
| G4 | First-person voice (“I built…”, “My experience includes…”) |
| G5 | Graceful refusal for unknown / off-topic questions |
| G6 | Lead capture via `record_user_details` tool; unknown questions logged via `record_unknown_question` |
| G7 | **Pushover** push notifications for leads and unknown questions (Phase 4) |
| G8 | API key never exposed to the browser |
| G9 | UI consistent with existing design (stone palette, `#FF3D00` accent, Tailwind) |

### Non-goals (v1)

- Vector database / RAG pipeline (knowledge file fits in a single prompt context)
- Chat history persistence in a database
- User accounts or login
- Multi-language support
- Voice input / speech
- Streaming responses (nice-to-have for v2)
- Training or fine-tuning a custom model

---

## 3. User-facing behavior

### 3.1 Chat entry point

- Floating action button (FAB) fixed at **bottom-right** on all pages (`/` and `/project/:slug`).
- z-index above page content but below modals if any are added later.
- Opens a compact chat panel (~380px wide on desktop; full-width sheet on mobile).
- Optional welcome message on first open, e.g.:
  > Hi! I'm Muzammal's portfolio assistant. Ask me about my experience, skills, or projects — or say you'd like to get in touch.

### 3.2 In-scope questions (answer normally)

Examples the bot should handle well:

- “What's your background?”
- “Tell me about AEDI / Willo Box”
- “What technologies do you use?”
- “Where are you based?”
- “Are you open to freelance work?”

Answers must be derived from **`data/chatbot-knowledge.txt`** (Section 6). Tone: professional, concise, first person.

### 3.3 Out-of-scope questions (refuse politely)

If the question cannot be answered from the knowledge file:

- Do **not** guess or use general world knowledge to fabricate career details.
- Apologize briefly to the user.
- **Always call** the `record_unknown_question` tool with the user's question (Phase 4).
- Respond with a fixed-style refusal, e.g.:
  > Sorry, I don't have that information in my profile. I can help with my work experience, skills, projects, or how to get in touch.

Examples of out-of-scope:

- “What's the weather in Islamabad?”
- “Can you help me with React homework?”
- “Did you work at Google?” (if not in the knowledge file)
- “What's your salary expectation?” (unless explicitly in the knowledge file)

### 3.4 Connect / contact intent (lead capture)

**Phase 1:** Contact section no longer has a send-message form. Direct links (email, phone, socials) remain.

**Phase 3 (hardcoded chat):** Client-side state machine collects name → email in the chat widget (UI only — no Pushover until Phase 4).

**Phase 4 (AI + tools):** The model handles the conversation naturally — asking for name and email when the user wants to connect. When the user provides an email, the model **must call** `record_user_details` → **Pushover**.

**Trigger phrases** (non-exhaustive):

- “I want to hire you”
- “How can I contact you?”
- “Let's connect”
- “I'd like to discuss a project”
- “Can we talk?”

**Phase 4 flow:**

```
User expresses connect intent
        ↓
AI (conversational): asks for name and/or email as needed
        ↓
User provides email (name optional but encouraged)
        ↓
AI calls record_user_details({ email, name?, notes? })
        ↓
Server executes tool → push() → **Pushover** notification to your phone/desktop
        ↓
AI confirms: "Thanks! I've noted your details — I'll get back to you soon."
        ↓
(Optional) AI shares contact links from knowledge file
```

**Tool: `record_user_details`**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `email` | Yes | Visitor's email address |
| `name` | No | Default: `"Name not provided"` |
| `notes` | No | Conversation context (e.g. project interest). Default: `"not provided"` |

**Validation (server-side in tool handler):**

- Email: standard format check before calling `push()`
- If invalid, return error to model so it can ask the user to retry

**If user abandons mid-flow:**

- Normal Q&A resumes on next unrelated message.
- No client-side `leadCapture` state in Phase 4 — the model manages the dialogue.

---

## 4. Architecture

Architecture evolves per phase. Final target (Phase 3+):

```text
┌──────────────────────────────────────────────────────────────────┐
│  Browser (React)                                                 │
│  ┌─────────────────┐    ┌────────────────────────────────────┐  │
│  │ ChatWidget      │───▶│ POST /api/chat                     │  │
│  │ (messages UI)   │◀───│ OpenAI chat + tool loop (Phase 3+) │  │
│  └─────────────────┘    └────────────────────────────────────┘  │
│                                      │                           │
│                                      ▼                           │
│                         ┌────────────────────────────┐           │
│                         │ Tool handlers (server)    │           │
│                         │ • record_user_details     │──▶ Pushover
│                         │ • record_unknown_question │──▶ Pushover
│                         └────────────────────────────┘           │
│                                      │                           │
│                                      ▼                           │
│                              OPENAI_API_KEY (server only)        │
└──────────────────────────────────────────────────────────────────┘
```

### Architecture by phase

| Phase | Data flow |
|-------|-----------|
| **1** | User opens/closes panel. No messages sent anywhere. |
| **2** | User message → `useChatbot` → `getHardcodedReply()` in client → bot message. Optional client-side lead flow. |
| **3** | User message → `POST /api/chat` → OpenAI with **tools** → tool handlers → final reply. |
| **4** | Same as 3 + rate limits, env docs, production smoke tests. |

### Why this shape (Phase 3+)

- Portfolio is a **static SPA** on Vercel — no long-running server.
- **Vercel serverless function** is the smallest secure layer for the OpenAI key.
- **No RAG** — the `.txt` knowledge file is small enough for one system prompt (~4–8K tokens).
- **Pushover** delivers instant phone/desktop alerts for chatbot leads and unknown questions (Phase 4).
- **Web3Forms is removed** from the contact section (Phase 1). No client-side form submission for the portfolio.
- **Phases 1–2** ship value early without API keys, cost, or backend setup.

### Local development note (Phase 3+)

Vite dev server does not run Vercel functions by default. Options:

| Option | Pros | Cons |
|--------|------|------|
| **A. `vercel dev`** | Matches production | Extra CLI, slightly slower |
| **B. Vite proxy → deployed preview API** | Fast UI dev | Needs deployed API first |
| **C. Mock API in dev** | Offline UI work | Doesn't test real OpenAI |

**Recommendation:** Phases 1–3 use `npm run dev` only. Phase 4+ use **`vercel dev`** for integrated API testing.

---

## 5. Technical design

### 5.1 New files (by phase)

```text
portfolio/
├── api/
│   ├── chat.js                         # Phase 4 — Vercel handler + OpenAI tool loop
│   └── chat/
│       ├── tools.js                    # Phase 4 — tool schemas + handlers
│       └── handleToolCalls.js          # Phase 4 — dispatch tool calls
├── data/
│   └── chatbot-knowledge.txt           # Phase 3 — plain-text knowledge (source of truth for AI)
├── docs/
│   └── chatbot-implementation.md       # This file
├── src/
│   ├── components/
│   │   └── chat/
│   │       ├── ChatWidget.jsx          # Phase 2 — FAB + panel shell
│   │       ├── ChatMessage.jsx         # Phase 2 — message bubble (UI only)
│   │       └── ChatInput.jsx           # Phase 2 — input + send (disabled in P2 shell)
│   ├── constants/
│   │   └── chatbot.js                  # Phase 3 — welcome, hardcoded replies, keywords
│   ├── hooks/
│   │   └── useChatbot.js               # Phase 3 — message state; Phase 4 adds API
│   └── utils/
│       ├── getHardcodedReply.js        # Phase 3 — keyword → canned response
│       └── buildKnowledgeContext.js    # Phase 4 — reads chatbot-knowledge.txt for API prompt
└── .env.example                        # Phase 1: drop Web3Forms; Phase 4: add OpenAI + Pushover
```

**Integration points (existing files):**

| File | Phase | Change |
|------|-------|--------|
| `src/components/sections/Contact.jsx` | **1** | Remove send-message form; keep contact info + links |
| `README.md` | **1**, **5** | Phase 1: remove Web3Forms contact setup; Phase 5: chatbot docs |
| `.env.example` | **1** | Remove `VITE_WEB3FORMS_ACCESS_KEY` |
| `src/App.jsx` | 2 | Render `<ChatWidget />` |
| `src/pages/ProjectDetail.jsx` | 2 | Render `<ChatWidget />` (or lift to router layout) |
| `src/main.jsx` | 2 | Optional: lift `<ChatWidget />` here instead of per-page |
| `.env.example` | 4 | Add OpenAI + Pushover server vars |

### 5.2 API contract — `POST /api/chat` *(Phase 3+)*

**Request (simplified — tools run server-side):**

```json
{
  "messages": [
    { "role": "user", "content": "What did you do at Futurenostics?" },
    { "role": "assistant", "content": "At Futurenostics I work on..." },
    { "role": "user", "content": "I'd like to get in touch — alex@startup.io" }
  ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `messages` | `{ role, content }[]` | Conversation history (`user` and `assistant` only — tool messages stay server-side) |

**Response:**

```json
{
  "reply": "Thanks, Alex! I've noted your details and will get back to you soon."
}
```

**Error response:**

```json
{
  "error": "Chat is temporarily unavailable. Please email me directly or use the links in the contact section.",
  "code": "OPENAI_ERROR"
}
```

HTTP status: `500` for server/OpenAI failures, `429` for rate limit, `400` for malformed body.

> **Phase 3 note:** No API route yet — all logic is client-side. The simplified contract above applies from Phase 4 onward.

### 5.3 Session state (client-side)

**Phase 3** — includes optional lead-capture mode:

```javascript
{
  messages: [],           // { id, role, content, timestamp }[]
  mode: 'qa',             // 'qa' | 'lead_capture' (Phase 3 only)
  leadCapture: { step: 'idle', name: null, email: null },
  isOpen: false,
  isLoading: false,
  error: null
}
```

**Phase 4** — simplified (tools handle leads server-side):

```javascript
{
  messages: [],           // { id, role, content, timestamp }[]
  isOpen: false,
  isLoading: false,
  error: null
}
```

**Reset on:**

- Successful lead submission (keep transcript visible but reset capture state)
- User clicks “Clear chat” (optional button in panel header)

### 5.4 Lead capture state machine *(Phase 3 only)*

Phase 3 uses a **client-side** deterministic state machine for hardcoded lead capture. Phase 4 replaces this with **AI conversation + `record_user_details` tool** (Section 7).

```text
                    ┌──────────────┐
                    │     idle     │
                    └──────┬───────┘
                           │ connect intent detected (keyword)
                           ▼
                    ┌──────────────┐
                    │ awaiting_name│
                    └──────┬───────┘
                           │ valid name received
                           ▼
                    ┌──────────────┐
                    │awaiting_email│
                    └──────┬───────┘
                           │ valid email received
                           ▼
                    ┌──────────────┐
                    │   complete   │ → thank-you message (no Pushover until Phase 4)
                    └──────────────┘
```

---

## 6. Knowledge context (`.txt` file) *(Phase 3+)*

### 6.1 Source of truth

**Single source:** **`data/chatbot-knowledge.txt`**

This is a plain-text file you write and maintain directly. It contains everything the chatbot is allowed to say about your background — experience, skills, projects, education, availability, etc. Content may match your CV, but the bot **does not read the PDF**; it only reads this `.txt` file.

**Example structure inside the file:**

```text
# Muzammal Hussain — Portfolio knowledge

## About
Full-stack developer with 3+ years...

## Experience
### Futurenostics (Oct 2024 – present)
- AEDI platform — React, NestJS, FastAPI...

## Skills
Node.js, NestJS, React, PostgreSQL...

## Projects
- Willo Box — AI PDF assistant...

## Contact & availability
Freelance/full-time. Based in Islamabad, Pakistan.
```

**Maintenance rule:** When your background changes, update `data/chatbot-knowledge.txt` first. The chatbot only knows what is in this file.

> **Phase 3 note:** Hardcoded replies can pull copy from `src/constants/` for convenience, but **Phase 4 AI answers use only `chatbot-knowledge.txt`**.

### 6.2 Building the context string

`buildKnowledgeContext.js` (server-side, Phase 3):

1. Read `data/chatbot-knowledge.txt` from disk at request time (or bundle at build — see implementation choice below).
2. Pass the full text into the system prompt as `{{KNOWLEDGE_CONTEXT}}`.

No PDF parsing. No merge with constants required for v1 — the `.txt` file is the complete knowledge base.

Target size: **under ~6,000 tokens** (well within GPT-4o-mini / GPT-4o limits).

### 6.3 No RAG in v1

The full file contents are injected into the **system prompt** on every request. RAG is unnecessary until the knowledge base grows beyond one file (e.g. multiple documents or a blog).

### 6.4 Creating & maintaining the knowledge file

**Before Phase 3:**

1. Create `data/chatbot-knowledge.txt` in the repo.
2. Paste or write your background in clear sections (about, experience, skills, projects, contact).
3. Use plain text or light markdown headings — avoid tables/images (not useful in a prompt).
4. Review: every fact the bot should know must appear in this file.

**When to update:**

- New job or project → edit the `.txt` file and redeploy.
- Portfolio constants change → optionally sync the same facts into the `.txt` file so AI and site stay consistent.

> **Review note:** You own this file. If something is missing from the `.txt`, the bot will correctly refuse — it cannot infer from `public/assets/CV.pdf` or other files.

---

## 7. OpenAI tool calling *(Phase 3+)*

Phase 4 uses **OpenAI function / tool calling** so the model can record leads and unknown questions server-side. This replaces the `[[CONNECT_INTENT]]` token approach and Phase 3 client-side lead state.

### 7.1 Tools overview

| Tool | When the model must call it |
|------|----------------------------|
| `record_user_details` | User wants to connect and has provided an **email** |
| `record_unknown_question` | Question cannot be answered from `chatbot-knowledge.txt` — **always** call before refusing |

Both tools call an internal `push(message, options?)` helper that sends a **Pushover** notification to your devices (server-side).

### 7.2 Tool schemas (OpenAI `tools` array)

```javascript
export const recordUserDetailsSchema = {
  type: 'function',
  function: {
    name: 'record_user_details',
    description:
      'Use this tool to record that a user is interested in being in touch and provided an email address',
    parameters: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: 'The email address of this user',
        },
        name: {
          type: 'string',
          description: "The user's name, if they provided it",
        },
        notes: {
          type: 'string',
          description:
            "Any additional information about the conversation that's worth recording to give context",
        },
      },
      required: ['email'],
      additionalProperties: false,
    },
  },
}

export const recordUnknownQuestionSchema = {
  type: 'function',
  function: {
    name: 'record_unknown_question',
    description:
      "Always use this tool to record any question that couldn't be answered as you didn't know the answer",
    parameters: {
      type: 'object',
      properties: {
        question: {
          type: 'string',
          description: "The question that couldn't be answered",
        },
      },
      required: ['question'],
      additionalProperties: false,
    },
  },
}

export const chatTools = [recordUserDetailsSchema, recordUnknownQuestionSchema]
```

### 7.3 Tool handler implementations (`api/chat/tools.js`)

Node.js equivalents of the reference Python functions:

```javascript
import { pushLeadNotification, pushUnknownQuestionNotification } from './notify.js'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** @returns {{ recorded: 'ok' } | { recorded: 'error', message: string }} */
export async function record_user_details(
  email,
  name = 'Name not provided',
  notes = 'not provided'
) {
  if (!email?.trim() || !EMAIL_REGEX.test(email.trim())) {
    return { recorded: 'error', message: 'Invalid email address' }
  }

  await pushLeadNotification({ email, name, notes })

  return { recorded: 'ok' }
}

/** @returns {{ recorded: 'ok' }} */
export async function record_unknown_question(question) {
  await pushUnknownQuestionNotification({ question })
  return { recorded: 'ok' }
}

export const toolHandlers = {
  record_user_details: (args) =>
    record_user_details(args.email, args.name, args.notes),
  record_unknown_question: (args) =>
    record_unknown_question(args.question),
}
```

Then `handleToolCalls` simply does: `await handler(args)`.

### 7.4 `push()` — Pushover notifications (`api/chat/notify.js`)

`push()` sends a message to the [Pushover API](https://pushover.net/api/). Requires **`PUSHOVER_APP_TOKEN`** and **`PUSHOVER_USER_KEY`** (server-only env vars).

```javascript
const PUSHOVER_URL = 'https://api.pushover.net/1/messages.json'

export async function push(message, { title, priority = 0, sound } = {}) {
  const token = process.env.PUSHOVER_APP_TOKEN
  const user = process.env.PUSHOVER_USER_KEY

  if (!token || !user) {
    console.error('[chatbot] PUSHOVER_APP_TOKEN or PUSHOVER_USER_KEY not set')
    return
  }

  const body = new URLSearchParams({
    token,
    user,
    message,
    ...(title && { title }),
    ...(priority !== 0 && { priority: String(priority) }),
    ...(sound && { sound }),
  })

  const res = await fetch(PUSHOVER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })

  if (!res.ok) {
    console.error('[chatbot] Pushover failed', await res.text())
  }
}

/** Lead / connect — record_user_details */
export async function pushLeadNotification({ email, name, notes }) {
  await push(
    `New portfolio lead\n\nName: ${name}\nEmail: ${email}\nNotes: ${notes}`,
    {
      title: 'Portfolio — someone wants to connect',
      priority: 1,
      sound: 'pushover',
    }
  )
}

/** Unknown / irrelevant question — record_unknown_question */
export async function pushUnknownQuestionNotification({ question }) {
  await push(`Could not answer:\n\n"${question}"`, {
    title: 'Portfolio — unknown question',
    priority: 0,
  })
}
```

> **Priority:** Leads use `priority: 1` (high) so they bypass quiet hours on Pushover. Unknown questions use default priority `0`. Adjust to taste.

### 7.5 `handleToolCalls` (`api/chat/handleToolCalls.js`)

Dispatches OpenAI `tool_calls` to the handler registry — no `if/else` chain:

```javascript
import { toolHandlers } from './tools.js'

export async function handleToolCalls(toolCalls) {
  const results = []

  for (const toolCall of toolCalls) {
    const toolName = toolCall.function.name
    const args = JSON.parse(toolCall.function.arguments)

    console.log(`Tool called: ${toolName}`)

    const handler = toolHandlers[toolName]
    const result = handler ? await handler(args) : {}

    results.push({
      role: 'tool',
      content: JSON.stringify(result),
      tool_call_id: toolCall.id,
    })
  }

  return results
}
```

### 7.6 OpenAI tool loop (`api/chat.js`)

```text
1. Receive messages[] from client
2. Build system prompt (Section 8) + inject knowledge file
3. Call OpenAI with tools: chatTools
4. If response has tool_calls:
     a. await handleToolCalls(tool_calls)
     b. Append assistant message (with tool_calls) + tool results to messages
     c. Call OpenAI again (repeat until no tool_calls, max 3 rounds)
5. Return final assistant text content as { reply }
```

```javascript
// Illustrative loop in api/chat.js
let conversation = [{ role: 'system', content: systemPrompt }, ...userMessages]

for (let i = 0; i < 3; i++) {
  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
    messages: conversation,
    tools: chatTools,
    temperature: 0.3,
  })

  const message = completion.choices[0].message
  conversation.push(message)

  if (!message.tool_calls?.length) {
    return { reply: message.content }
  }

  const toolResults = await handleToolCalls(message.tool_calls)
  conversation.push(...toolResults)
}

return { error: 'Tool loop exceeded', code: 'TOOL_LOOP' }
```

### 7.7 Tool result handling

| Tool result | Model behavior |
|-------------|----------------|
| `{ recorded: 'ok' }` | Confirm to user (thank you / noted) |
| `{ recorded: 'error', message: 'Invalid email...' }` | Ask user to provide a valid email |
| Unknown question recorded | Apologize + suggest in-scope topics |

---

## 8. System prompt (draft) *(Phase 3+)*

Use as the server-side system message. Tune after testing.

```text
You are the portfolio assistant for Muzammal Hussain, a Full-Stack Developer.
You speak in the first person as Muzammal (use "I", "my", "me").

RULES — follow strictly:
1. ONLY answer using the KNOWLEDGE section below. Do not use outside knowledge for career facts.
2. If the answer is not in KNOWLEDGE:
   a. ALWAYS call the record_unknown_question tool with the user's question.
   b. Then respond with a brief apology — say you can only discuss what's in your profile.
   c. Do NOT guess or invent companies, dates, skills, or projects.
3. Keep answers concise (2–4 sentences unless the user asks for detail).
4. Be professional and friendly.
5. Do NOT discuss salary, politics, religion, or personal matters not in KNOWLEDGE.
6. Do NOT pretend to be a general-purpose AI assistant.

LEAD CAPTURE:
- When a user wants to connect, hire, collaborate, or leave their details, conversationally ask for their name and email if not yet provided.
- Once you have their email, call record_user_details with email (required), name and notes (optional).
- Include useful context in notes (e.g. "Interested in SaaS project", "Asked about React role").

KNOWLEDGE:
{{KNOWLEDGE_CONTEXT}}
```

The API replaces `{{KNOWLEDGE_CONTEXT}}` at runtime with the contents of `data/chatbot-knowledge.txt`.

---

## 9. Notifications — Pushover *(Phase 4)*

### 9.1 Overview

| Event | Phase | Channel | Trigger |
|-------|-------|---------|---------|
| User wants to connect (lead) | **4** | **Pushover** | `record_user_details` tool |
| Irrelevant / unknown question | **4** | **Pushover** | `record_unknown_question` tool |
| Hardcoded lead capture (chat UI) | **3** | None (thank-you message only) | Phase 3 state machine |
| ~~Contact form on site~~ | — | **Removed Phase 1** | Was `Contact.jsx` + Web3Forms |

All visitor messaging and lead capture goes through the **chatbot**. The contact section shows **info + direct links** only (email, phone, LinkedIn, WhatsApp).

### 9.2 Pushover setup (one-time)

1. Create an account at [pushover.net](https://pushover.net/) and install the app on your phone/desktop.
2. Copy your **User Key** from the Pushover dashboard (top-right after login).
3. Register an application at [pushover.net/apps/build](https://pushover.net/apps/build):
   - Name: e.g. `Portfolio Chatbot`
   - Type: Application
   - Copy the **API Token / App Token**.
4. Add to Vercel (and local `.env`):
   ```bash
   PUSHOVER_APP_TOKEN=your_app_token_here
   PUSHOVER_USER_KEY=your_user_key_here
   ```
5. Deploy and send a test notification from `vercel dev` or a one-off script calling `push('Test from portfolio chatbot')`.

> Pushover is a paid app on iOS (~$5 one-time) but free to use the API after that. See [pushover.net/pricing](https://pushover.net/pricing).

### 9.3 Notification copy

**Lead (`record_user_details`):**

```text
Title: Portfolio — someone wants to connect
Message:
New portfolio lead

Name: Sarah Chen
Email: sarah@company.com
Notes: Interested in SaaS project
```

**Unknown question (`record_unknown_question`):**

```text
Title: Portfolio — unknown question
Message:
Could not answer:

"Did you work at Google?"
```

### 9.4 Phase 3 — hardcoded chat lead flow (no notification yet)

Hardcoded lead capture in the chat widget collects name + email and shows a thank-you message. **No Pushover or email** until Phase 4 — this validates the UX only.

### 9.5 Optional: email backup (post-v1)

If you also want email copies of leads, add Web3Forms inside `pushLeadNotification()`. Not required for v1 — Pushover is the primary channel.

---

## 10. Environment variables *(Phase 3+)*

| Variable | Where | Exposed to browser? | Required |
|----------|-------|---------------------|----------|
| `OPENAI_API_KEY` | Vercel + local `.env` | **No** (server only) | Yes (Phase 4) |
| `OPENAI_MODEL` | Vercel + local `.env` | No | No (default: `gpt-4o-mini`) |
| `PUSHOVER_APP_TOKEN` | Vercel + local `.env` | **No** (server only) | Yes (Phase 4) |
| `PUSHOVER_USER_KEY` | Vercel + local `.env` | **No** (server only) | Yes (Phase 4) |
| ~~`VITE_WEB3FORMS_ACCESS_KEY`~~ | — | — | **Removed Phase 1** (contact form deleted) |
| `CHAT_RATE_LIMIT_PER_MIN` | Server only | No | No (default: `10`) |

**`.env.example` additions:**

```bash
# Server-only (do NOT prefix with VITE_)
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini

# Pushover — https://pushover.net/
PUSHOVER_APP_TOKEN=
PUSHOVER_USER_KEY=

# Optional rate limit for /api/chat
CHAT_RATE_LIMIT_PER_MIN=10
```

**Vercel dashboard:** Add `OPENAI_API_KEY`, `PUSHOVER_APP_TOKEN`, and `PUSHOVER_USER_KEY` under Project → Settings → Environment Variables.

---

## 11. Security & abuse prevention

| Measure | Implementation |
|---------|------------------|
| API key protection | OpenAI + Pushover keys only in server env vars — never `VITE_` prefixed |
| Rate limiting | Simple in-memory or IP-based limit in serverless (e.g. 10 req/min/IP). Note: resets on cold starts — acceptable for portfolio traffic. |
| Input length cap | Reject messages > 500 characters |
| History cap | Send last 10 turns max to OpenAI (cost + injection control) |
| CORS | Restrict to production domain in API handler |
| No PII in logs | Do not log full chat or emails to console in production |
| OpenAI usage limits | Set monthly cap in OpenAI dashboard |

---

## 12. UI / UX spec

### 12.1 Visual design

Align with existing portfolio:

- Background: `bg-stone-50` / `bg-white`
- Text: `text-stone-900`, muted `text-stone-600`
- Accent: `#FF3D00` (send button, FAB, user message accent)
- Border: `border-stone-200`
- Font: inherit `font-sans` (Epilogue / system from site)
- Subtle shadow on panel: `shadow-xl`
- Framer Motion: optional fade/slide on panel open (match other components)

### 12.2 Message bubbles

| Role | Style |
|------|-------|
| User | Right-aligned, accent background or border |
| Assistant | Left-aligned, white/stone background |
| System / error | Centered, muted, small text |

### 12.3 Accessibility

- FAB: `aria-label="Open chat"`
- Panel: `role="dialog"`, `aria-labelledby="chat-title"`
- Focus trap while open
- Escape key closes panel
- Send on Enter; Shift+Enter for newline (if textarea)

### 12.4 Loading state

- Typing indicator (three dots) while waiting for API
- Disable input during request

### 12.5 Empty / error states

| State | UI |
|-------|-----|
| API key missing (dev) | “Chat is not configured” + link to contact section (email / socials) |
| OpenAI error | Friendly fallback + suggest email or LinkedIn from contact section |
| Rate limited | “Too many messages — please wait a moment.” |

---

## 13. OpenAI configuration

| Setting | Value | Rationale |
|---------|-------|-----------|
| Model | `gpt-4o-mini` | Cost-effective, sufficient for Q&A |
| Temperature | `0.3` | Lower hallucination risk |
| Max tokens | `300` | Keeps replies concise |
| Response format | Text + tool calls | `record_user_details`, `record_unknown_question` |

**Estimated cost:** Portfolio traffic is low; expect cents to low dollars per month with `gpt-4o-mini`.

---

## 14. Implementation phases & tasks

This is the **primary build guide**. Complete each phase fully before starting the next.

### Phase overview

| Phase | Name | Delivers | Depends on |
|-------|------|----------|------------|
| **1** | Remove contact form | Contact info only; no send-message UI | — |
| **2** | UI shell | FAB + empty chat panel | Phase 1 |
| **3** | Hardcoded chat | Working send/receive with canned replies + lead flow (UI) | Phase 2 |
| **4** | AI + tools | OpenAI Q&A + Pushover via tools | Phase 3 |
| **5** | Ship & harden | Docs, env, rate limits, production test | Phase 4 |

---

### Phase 1 — Remove contact send-message form

**Goal:** Remove the duplicate “Send Message” form from the Contact section. Visitors reach you via **direct links** (email, phone, socials) until the chatbot ships; once the chat widget is live, it becomes the primary way to message you.

**Exit criteria:** Contact section renders without the form; no Web3Forms code or env var; layout looks intentional; site builds and deploys cleanly.

#### Tasks

| # | Task | Details |
|---|------|---------|
| 1.1 | Strip form from `Contact.jsx` | Remove the entire right-column `<form>` (name, email, message, submit button, botcheck, status alerts). |
| 1.2 | Remove form logic | Delete `useState`, `handleChange`, `validateForm`, `handleSubmit`, Web3Forms `fetch`, and related imports. |
| 1.3 | Keep contact info | Preserve left column: `personalInfo.contactMessage`, email, phone, location with mailto/tel links. |
| 1.4 | Adjust layout | Single-column or centered info block — no empty 3-column gap where the form was. Example: `max-w-2xl` info panel instead of `lg:grid-cols-5` split. |
| 1.5 | Update copy (optional) | Tweak `personalInfo.contactMessage` to mention chat coming soon, e.g. “Use the chat icon to ask about my work or get in touch.” (Chat widget added Phase 2.) |
| 1.6 | Remove Web3Forms env | Delete `VITE_WEB3FORMS_ACCESS_KEY` from `.env.example` and any `.env` notes. |
| 1.7 | Update `README.md` | Remove Web3Forms setup instructions for the contact form. |
| 1.8 | Update `CLAUDE.md` | Remove Web3Forms requirement for contact form. |
| 1.9 | Phase 1 smoke test | Contact section loads; email/phone links work; no form fields; no console errors; `npm run build` passes. |

#### Phase 1 — out of scope

- Chat widget (Phase 2)
- Any new contact submission mechanism
- Pushover / OpenAI

#### Phase 1 — before / after

**Before (`Contact.jsx`):** Two columns — info left, send-message form right.

**After:** Contact info only — email, phone, location, social links (if shown elsewhere or added here), intro text.

---

### Phase 2 — UI shell (no chat logic)

**Goal:** Visitor sees a chat icon bottom-right and can open/close an empty panel. No messages, no send behavior.

**Exit criteria:** Panel looks correct on desktop + mobile; open/close works; no API calls; safe to deploy.

#### Tasks

| # | Task | Details |
|---|------|---------|
| 2.1 | Create `ChatWidget.jsx` | FAB fixed `bottom-6 right-6`, z-index above content. Toggle `isOpen` state. |
| 2.2 | Create chat panel layout | Header (title + close button), empty message area, footer with input area. ~380px wide desktop; near full-width on mobile. |
| 2.3 | Create `ChatMessage.jsx` | Bubble component (user vs assistant styles). Not used with real data yet — optional single static preview message or truly empty. |
| 2.4 | Create `ChatInput.jsx` | Text input + send button **visually present** but **disabled** or send does nothing. Placeholder: e.g. “Chat coming soon…” |
| 2.5 | Apply design tokens | Stone palette, `#FF3D00` accent, `border-stone-200`, `shadow-xl` — match Section 12. |
| 2.6 | Open/close interactions | Click FAB → open; click close / FAB again → close. `Escape` closes panel. |
| 2.7 | Accessibility | `aria-label="Open chat"` on FAB; `role="dialog"` on panel; focus moves into panel when opened. |
| 2.8 | Mount widget globally | Add `<ChatWidget />` to `App.jsx` and `ProjectDetail.jsx` (or once in `main.jsx` / layout wrapper). |
| 2.9 | Optional animation | Framer Motion fade/slide on panel open (match existing components). |
| 2.10 | Update Contact CTA | If Phase 1 copy says “chat coming soon”, update to “Use the chat icon below”. |
| 2.11 | Phase 2 smoke test | Verify on `/` and `/project/:slug`; mobile + desktop; no console errors. |

#### Phase 2 — out of scope

- Message history state
- Send on Enter
- `useChatbot` hook
- Any `fetch` calls
- `api/` folder
- Environment variables for OpenAI

---

### Phase 3 — Hardcoded responses (client-side only)

**Goal:** Full chat UX with deterministic replies from a local lookup table. Proves conversation flow, lead capture, and UI states before adding AI cost/complexity.

**Exit criteria:** User can chat and get sensible canned answers; connect flow collects name + email in chat; out-of-scope gets refusal text; thank-you shown (no Pushover until Phase 4).

#### Tasks

| # | Task | Details |
|---|------|---------|
| 3.1 | Enable `ChatInput.jsx` | Send on Enter (Shift+Enter for newline if textarea). Disable send when input empty. |
| 3.2 | Create `useChatbot.js` | State: `messages[]`, `isLoading`, `mode`, `leadCapture`, `error`. Actions: `sendMessage`, `clearChat`, `open`, `close`. |
| 3.3 | Create `src/constants/chatbot.js` | Welcome message, refusal template, connect-intent keywords, thank-you copy. |
| 3.4 | Create `getHardcodedReply.js` | Map user input → reply via keyword/phrase matching (case-insensitive). |
| 3.5 | Define canned reply topics | At minimum: `background`, `skills`, `experience`, `projects`, `location`, `availability`, `contact`, `default/refusal`. |
| 3.6 | Wire send flow | User sends → append user bubble → fake typing delay (300–600ms) → append assistant bubble. |
| 3.7 | Default / refusal path | If no keyword matches → hardcoded refusal (Section 3.3 wording). |
| 3.8 | Connect intent detection | Keyword match → `lead_capture` mode, step `awaiting_name`. |
| 3.9 | Lead capture state machine | Client-only: `idle` → `awaiting_name` → `awaiting_email` → `complete`. |
| 3.10 | Validate name & email | Email regex (same pattern previously used in contact form). |
| 3.11 | Mid-capture cancel | Unrelated question → reset to `qa` mode. |
| 3.12 | Thank-you on complete | Show success message + contact links from `personalInfo.socialLinks`. **No Web3Forms / Pushover yet.** |
| 3.13 | “Clear chat” button | Optional in panel header. |
| 3.14 | Loading UI | Typing indicator during delay. |
| 3.15 | Phase 3 smoke test | Section 17 acceptance scenarios (hardcoded paths). |

#### Phase 3 — example hardcoded mapping

```javascript
// Illustrative — implement in getHardcodedReply.js
const RULES = [
  { match: ['background', 'about you', 'who are you'], key: 'background' },
  { match: ['skills', 'stack', 'technologies'], key: 'skills' },
  { match: ['futurenostics', 'aedi'], key: 'experience_futurenostics' },
  { match: ['willo box', 'willo'], key: 'project_willo' },
  { match: ['location', 'where are you', 'based'], key: 'location' },
  { match: ['freelance', 'available', 'hire'], key: 'availability' },
]
// No match → REFUSAL_MESSAGE from chatbot.js
```

#### Phase 3 — out of scope

- OpenAI / `api/chat.js`
- Pushover
- Real notifications on lead capture

---

### Phase 4 — AI integration + tool calling

**Goal:** Replace hardcoded Q&A with OpenAI + tools. **`record_user_details`** and **`record_unknown_question`** send **Pushover** alerts. Remove Phase 3 client-side lead state.

**Exit criteria:** In-scope questions answered from knowledge file; out-of-scope refused + `record_unknown_question` → Pushover; connect via `record_user_details` → Pushover; API keys not in browser bundle.

#### Tasks

| # | Task | Details |
|---|------|---------|
| 4.1 | Knowledge file | Ensure `data/chatbot-knowledge.txt` is complete (Section 6.4). ✅ Created |
| 4.2 | `buildKnowledgeContext.js` | Read knowledge file; return string for system prompt. |
| 4.3 | `api/chat/tools.js` | Tool schemas + handlers (Section 7.2–7.3). |
| 4.4 | `api/chat/notify.js` | Pushover helpers (Section 7.4, 9.2). |
| 4.5 | `api/chat/handleToolCalls.js` | Tool dispatch registry (Section 7.5). |
| 4.6 | `api/chat.js` | Vercel handler + OpenAI tool loop (Section 7.6). |
| 4.7 | System prompt | Section 8. |
| 4.8 | Simplify `useChatbot.js` | Remove Phase 3 `mode` / `leadCapture`; all messages → `fetch('/api/chat')`. |
| 4.9 | Env vars | `OPENAI_API_KEY`, `PUSHOVER_*`, `OPENAI_MODEL` (Section 10). |
| 4.10 | Local dev | Document `vercel dev` for API + tool testing. |
| 4.11 | Input guards | Max 500 chars; last 10 turns. |
| 4.12 | Fallback on error | Friendly UI; suggest email / LinkedIn (Section 12.5). |
| 4.13 | Phase 4 smoke test | Section 17 + Pushover for both tools. |
| 4.14 | Pushover smoke test | Manual trigger; confirm phone/desktop alerts. |

#### Phase 4 — responsibility split

| Feature | Handler |
|---------|---------|
| Q&A answers | `api/chat.js` + OpenAI + knowledge file |
| Lead capture conversation | OpenAI (asks for name/email naturally) |
| Lead recording | `record_user_details` → **Pushover** |
| Unknown question logging | `record_unknown_question` → **Pushover** |
| Email validation | `record_user_details` handler (server) |
| Welcome message | `chatbot.js` constant (client) |

#### Phase 4 — out of scope

- Rate limiting (Phase 5)
- Streaming / RAG

---

### Phase 5 — Ship & harden

**Goal:** Production-ready deployment, documentation, and guardrails.

#### Tasks

| # | Task | Details |
|---|------|---------|
| 5.1 | Rate limiting | IP-based limit in `api/chat.js`. Return `429` when exceeded. |
| 5.2 | CORS | Restrict API to production domain. |
| 5.3 | Update `README.md` | Full chatbot docs, Pushover setup, `vercel dev`. |
| 5.4 | Deploy to Vercel | Set `OPENAI_API_KEY`, `PUSHOVER_APP_TOKEN`, `PUSHOVER_USER_KEY`. |
| 5.5 | Production smoke test | Full Section 15 checklist on live URL. |
| 5.6 | OpenAI usage cap | Monthly limit in OpenAI dashboard. |
| 5.7 | Rollback verified | Section 18 steps work if feature disabled. |

---

### Phase dependency diagram

```text
Phase 1 (remove contact form)
    │
    ▼
Phase 2 (chat UI shell)
    │
    ▼
Phase 3 (hardcoded chat + lead UX)
    │
    ▼
Phase 4 (AI + Pushover tools)
    │
    ▼
Phase 5 (harden + deploy)
```

---

## 15. Testing checklist (by phase)

### Phase 1

- [ ] Contact section has **no** name/email/message fields or submit button
- [ ] Email, phone, location links still work
- [ ] Layout looks good without form column
- [ ] `VITE_WEB3FORMS_ACCESS_KEY` removed from `.env.example`
- [ ] README no longer documents Web3Forms for contact
- [ ] `npm run build` passes

### Phase 2

- [ ] FAB visible bottom-right on `/` and `/project/:slug`
- [ ] Panel opens and closes (button + Escape)
- [ ] Mobile layout acceptable
- [ ] Input disabled or send does nothing
- [ ] No network requests when interacting

### Phase 3

- [ ] User message appears in chat
- [ ] Keyword “skills” → hardcoded skills reply
- [ ] Unknown question → hardcoded refusal
- [ ] “I want to hire you” → name → email → thank-you (no Pushover yet)
- [ ] Invalid email rejected
- [ ] Clear chat resets conversation

### Phase 4

- [ ] In-scope question → AI answer from knowledge file
- [ ] Out-of-scope → refusal + `record_unknown_question` → Pushover
- [ ] Connect → `record_user_details` → Pushover lead alert
- [ ] API keys not in `dist/` bundle
- [ ] Phase 3 client lead-capture state removed

### Phase 5

- [ ] Rate limit triggers after threshold
- [ ] Production deploy end-to-end
- [ ] README env instructions accurate

---

## 16. Open decisions (please review)

Mark your preference before implementation:

| # | Decision | Options | Recommendation |
|---|----------|---------|----------------|
| D1 | OpenAI model | `gpt-4o-mini` / `gpt-4o` | `gpt-4o-mini` |
| D2 | Notify channel (Phase 4) | Pushover / email / both | **Pushover** |
| D3 | Local dev | `vercel dev` / mock API | `vercel dev` |
| D4 | Chat history on lead | Include last message / full transcript / none | Last user message |
| D5 | Mid-capture cancel | Reset on unrelated question / stay in capture | Reset on unrelated question |
| D6 | “Clear chat” button | Yes / No | Yes |
| D7 | Show contact links after lead | Yes (email, LinkedIn, WhatsApp) / No | Yes |
| D8 | Knowledge file upkeep | Manual edits to `chatbot-knowledge.txt` / optional sync from constants | Manual edits |

---

## 17. Example conversations (acceptance criteria)

### AC-1 — In scope

```
User: What stack do you work with?
Bot: I work with Node.js, NestJS, React.js, PostgreSQL, TypeScript, FastAPI,
     and cloud platforms like AWS ECS and GCP. I've also built LLM/RAG pipelines
     with OpenAI and LangChain.
```

### AC-2 — Out of scope (+ tool)

```
User: Can you fix my laptop?
Bot: [calls record_unknown_question("Can you fix my laptop?")]
     Sorry, I don't have that information in my profile. I can help with my work
     experience, skills, projects, or how to get in touch.
→ Pushover: "Portfolio — unknown question"
```

### AC-3 — Connect flow (+ tool)

```
User: I'd like to discuss a SaaS project with you.
Bot: Great — I'd love to connect. What's your name and email?
User: Alex, alex@startup.io
Bot: [calls record_user_details({ email: "alex@startup.io", name: "Alex", notes: "SaaS project interest" })]
     Thanks, Alex! I've noted your details and will get back to you soon.
→ Pushover: "Portfolio — someone wants to connect"
```

---

## 18. Rollback plan

If the feature causes issues in production:

1. Remove `<ChatWidget />` from `App.jsx` / `ProjectDetail.jsx` (one-line revert).
2. Delete or disable `api/chat/` folder and `api/chat.js`.
3. Remove `OPENAI_API_KEY`, `PUSHOVER_APP_TOKEN`, and `PUSHOVER_USER_KEY` from Vercel env (optional).

No database migrations or irreversible changes.

---

## 19. Future enhancements (post-v1)

- Streaming responses (SSE)
- “Ask about this project” contextual button on project detail pages
- Analytics (chat opens, lead conversions)
- Admin dashboard for chat logs
- RAG if knowledge base grows beyond one `.txt` file
- Build-step script to validate or lint `chatbot-knowledge.txt`

---

## 20. References

| Resource | Path / URL |
|----------|------------|
| **Chatbot knowledge (source of truth)** | `data/chatbot-knowledge.txt` |
| CV PDF (download only — not read by bot) | `public/assets/CV.pdf` |
| Contact section (info only) | `src/components/sections/Contact.jsx` |
| Personal info | `src/constants/personalInfo.js` |
| Work experience | `src/constants/experience.js` |
| Projects | `src/constants/projects.js` |
| Deployment | Vercel (see `personalInfo.website`) |
| Pushover API | https://pushover.net/api/ |
| Pushover app registration | https://pushover.net/apps/build |
| Tool calling reference | Section 7 (`record_user_details`, `record_unknown_question`) |
| Vercel serverless functions | https://vercel.com/docs/functions |

---

## 21. Review checklist for Muzammal

### Before Phase 1

- [ ] OK to remove send-message form entirely from Contact section
- [ ] Contact info-only layout is acceptable until chat widget ships (Phase 2)
- [ ] Direct email / phone / LinkedIn links are sufficient fallback

### Before Phase 2

- [ ] UI placement (bottom-right FAB) is acceptable
- [ ] Panel size / mobile behavior (Section 12) is acceptable
- [ ] Phase 2 ships with **empty/disabled** chat — OK?

### Before Phase 3

- [ ] Hardcoded topics in Section 14 Phase 3 are sufficient
- [ ] Refusal wording (Section 3.3) is acceptable
- [ ] Lead flow (name → email, thank-you only until Phase 4) is OK
- [ ] Open decisions in Section 16 (especially D5, D6, D7)

### Before Phase 4

- [ ] `data/chatbot-knowledge.txt` is complete (Section 6.4)
- [ ] Tool schemas match Section 7
- [ ] System prompt (Section 8) is acceptable
- [ ] Pushover setup (Section 9.2) done
- [ ] Phase 3 client lead state will be removed — confirmed?

### Before Phase 5

- [ ] Rate limit default (10/min) is acceptable

**After review:** Note changes in this file, then implement **one phase at a time** following Section 14.
