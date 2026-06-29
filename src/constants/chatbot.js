export const CHATBOT_NAME = 'AI Agent Twin'

export const CHATBOT_SUBTITLE = 'Ask me about my work'

export const WELCOME_MESSAGE = `Hi! I'm Muzammal's ${CHATBOT_NAME}. Ask me about my experience, skills, or projects — or say you'd like to get in touch.`

/** Quick-reply cards — label shown in UI, message sent to the chatbot on click */
export const SUGGESTED_QUESTIONS = [
  { label: 'Introduction', message: 'Tell me about yourself and your background.' },
  { label: 'About my work', message: 'What kind of work do you do?' },
  { label: 'Tech stack', message: 'What technologies do you use?' },
  { label: 'Projects', message: 'What projects have you worked on?' },
  { label: 'Contact me', message: "I'd like to get in touch." },
]

export const API_ERROR_MESSAGE =
  'Chat is temporarily unavailable. Please email me directly or use the links in the contact section.'

export const RATE_LIMIT_MESSAGE = 'Too many messages — please wait a moment.'

export const MAX_MESSAGE_LENGTH = 500
export const MAX_HISTORY_TURNS = 10
