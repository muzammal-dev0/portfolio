import {
  CANNED_REPLIES,
  CONNECT_INTENT_KEYWORDS,
  REFUSAL_MESSAGE,
} from '../constants/chatbot'

const RULES = [
  { match: ['background', 'about you', 'who are you', 'tell me about yourself'], key: 'background' },
  { match: ['skills', 'stack', 'technologies', 'tech stack', 'what do you use'], key: 'skills' },
  { match: ['futurenostics', 'aedi'], key: 'experience_futurenostics' },
  { match: ['argonteq'], key: 'experience_argonteq' },
  { match: ['willo box', 'willo'], key: 'project_willo' },
  { match: ['experience', 'work history', 'where do you work', 'current job'], key: 'experience' },
  { match: ['projects', 'portfolio', 'what have you built'], key: 'projects' },
  { match: ['location', 'where are you', 'based', 'where do you live'], key: 'location' },
  { match: ['freelance', 'available', 'hire', 'open to work', 'looking for work'], key: 'availability' },
  { match: ['contact', 'email', 'phone', 'linkedin', 'how can i reach'], key: 'contact' },
  { match: ['education', 'degree', 'university', 'studied'], key: 'education' },
]

const normalize = (text) => text.toLowerCase().trim()

export function isConnectIntent(text) {
  const input = normalize(text)
  return CONNECT_INTENT_KEYWORDS.some((phrase) => input.includes(phrase))
}

export function matchTopic(text) {
  const input = normalize(text)
  for (const rule of RULES) {
    if (rule.match.some((phrase) => input.includes(phrase))) {
      return rule.key
    }
  }
  return null
}

export function getHardcodedReply(text) {
  const key = matchTopic(text)
  if (key && CANNED_REPLIES[key]) {
    return { type: 'answer', reply: CANNED_REPLIES[key] }
  }
  return { type: 'refusal', reply: REFUSAL_MESSAGE }
}
