import OpenAI from 'openai'
import { buildKnowledgeContext } from './chat/buildKnowledgeContext.js'
import { buildSystemPrompt } from './chat/systemPrompt.js'
import { chatTools } from './chat/tools.js'
import { handleToolCalls } from './chat/handleToolCalls.js'

const MAX_MESSAGE_LENGTH = 500
const MAX_HISTORY_TURNS = 10
const MAX_TOOL_ROUNDS = 3

const rateLimitMap = new Map()

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim()
  return req.socket?.remoteAddress ?? 'unknown'
}

function isRateLimited(ip) {
  const limit = Number(process.env.CHAT_RATE_LIMIT_PER_MIN) || 10
  const now = Date.now()
  const windowMs = 60_000
  const entry = rateLimitMap.get(ip) ?? { count: 0, resetAt: now + windowMs }

  if (now > entry.resetAt) {
    entry.count = 0
    entry.resetAt = now + windowMs
  }

  entry.count += 1
  rateLimitMap.set(ip, entry)
  return entry.count > limit
}

function validateMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    return { ok: false, error: 'messages must be a non-empty array' }
  }

  for (const msg of messages) {
    if (!msg || (msg.role !== 'user' && msg.role !== 'assistant')) {
      return { ok: false, error: 'each message must have role user or assistant' }
    }
    if (typeof msg.content !== 'string' || !msg.content.trim()) {
      return { ok: false, error: 'each message must have non-empty content' }
    }
    if (msg.content.length > MAX_MESSAGE_LENGTH) {
      return { ok: false, error: `message exceeds ${MAX_MESSAGE_LENGTH} characters` }
    }
  }

  return { ok: true }
}

function trimHistory(messages) {
  const maxMessages = MAX_HISTORY_TURNS * 2
  return messages.slice(-maxMessages).map(({ role, content }) => ({
    role,
    content: content.trim(),
  }))
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed', code: 'METHOD_NOT_ALLOWED' })
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({
      error:
        'Chat is not configured. Please email me directly or use the links in the contact section.',
      code: 'NOT_CONFIGURED',
    })
  }

  const ip = getClientIp(req)
  if (isRateLimited(ip)) {
    return res.status(429).json({
      error: 'Too many messages — please wait a moment.',
      code: 'RATE_LIMITED',
    })
  }

  const { messages } = req.body ?? {}
  const validation = validateMessages(messages)
  if (!validation.ok) {
    return res.status(400).json({ error: validation.error, code: 'BAD_REQUEST' })
  }

  try {
    const knowledgeContext = buildKnowledgeContext()
    const systemPrompt = buildSystemPrompt(knowledgeContext)
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const model = process.env.OPENAI_MODEL ?? 'gpt-4o-mini'

    let conversation = [
      { role: 'system', content: systemPrompt },
      ...trimHistory(messages),
    ]

    for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
      const completion = await openai.chat.completions.create({
        model,
        messages: conversation,
        tools: chatTools,
        temperature: 0.4,
        max_tokens: 450,
      })

      const message = completion.choices[0]?.message
      if (!message) {
        throw new Error('Empty response from OpenAI')
      }

      conversation.push(message)

      if (!message.tool_calls?.length) {
        const reply = message.content?.trim()
        if (!reply) {
          throw new Error('Empty assistant content')
        }
        return res.status(200).json({ reply })
      }

      const toolResults = await handleToolCalls(message.tool_calls)
      conversation.push(...toolResults)
    }

    return res.status(500).json({
      error:
        'Chat is temporarily unavailable. Please email me directly or use the links in the contact section.',
      code: 'TOOL_LOOP',
    })
  } catch (err) {
    console.error('[chatbot] OpenAI error:', err.message)
    return res.status(500).json({
      error:
        'Chat is temporarily unavailable. Please email me directly or use the links in the contact section.',
      code: 'OPENAI_ERROR',
    })
  }
}
