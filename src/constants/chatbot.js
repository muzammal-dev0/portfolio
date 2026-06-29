import { personalInfo } from './personalInfo'

export const WELCOME_MESSAGE =
  "Hi! I'm Muzammal's portfolio assistant. Ask me about my experience, skills, or projects — or say you'd like to get in touch."

export const REFUSAL_MESSAGE =
  "Sorry, I don't have that information in my profile. I can help with my work experience, skills, projects, or how to get in touch."

export const CONNECT_INTENT_KEYWORDS = [
  'hire you',
  'hire me',
  'get in touch',
  'reach out',
  'contact you',
  'contact me',
  "let's connect",
  'lets connect',
  'discuss a project',
  'discuss project',
  'can we talk',
  'want to connect',
  'work together',
  'collaborate',
  'talk about a project',
  'send you my email',
]

export const LEAD_PROMPTS = {
  askName: "Great — I'd love to connect. What's your name?",
  askEmail: (name) => `Thanks, ${name}! What's the best email to reach you?`,
  invalidEmail: "That doesn't look like a valid email. Could you try again?",
  invalidName: 'Please enter your name so I know who to get back to.',
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const TYPING_DELAY_MS = { min: 300, max: 600 }

export function buildThankYouMessage(name) {
  const { linkedin, github, whatsapp } = personalInfo.socialLinks
  const greeting = name ? `Thanks, ${name}!` : 'Thanks!'
  return `${greeting} I've noted your details and will get back to you soon.\n\nYou can also reach me directly:\n• LinkedIn: ${linkedin}\n• GitHub: ${github}\n• WhatsApp: ${whatsapp}\n• Email: ${personalInfo.email}`
}

export const CANNED_REPLIES = {
  background: `I'm ${personalInfo.name}, a ${personalInfo.title} with 3+ years of experience. ${personalInfo.bio.short}`,
  skills: `I work with Node.js, NestJS, React.js, PostgreSQL, TypeScript, and FastAPI on the stack side. I've also built LLM/RAG pipelines with OpenAI and LangChain, and geospatial workflows with ArcGIS and PostGIS. Cloud-wise I use AWS ECS, GCP, Docker, and Redis.`,
  experience: `I'm currently a Software Engineer at Futurenostics (Oct 2024–present), working on the AEDI municipal planning SaaS — React, NestJS, FastAPI, GIS, and AI workflows. Before that I was a Backend Developer at Argonteq (May 2023–Nov 2024), building CRM, document-AI, and marketplace backends.`,
  experience_futurenostics: `At Futurenostics I work on the AEDI platform — a multi-tenant municipal planning SaaS for Canadian municipalities. I build React frontends, NestJS APIs, FastAPI AI services, ArcGIS/PostGIS workflows, Stripe billing, and deployments on AWS ECS and GCP.`,
  experience_argonteq: `At Argonteq I developed backend services for an educational CRM, built Willo Box (AI document Q&A with OpenAI and LangChain), and contributed to crypto exchange, gaming, and pharmacy marketplace platforms using Node.js and MongoDB.`,
  projects: `Some highlights: AEDI (municipal planning & zoning SaaS), Case Management Hub (HIPAA-compliant healthcare workflows), Sales Management System, Willo Box (AI PDF Q&A), and Medicaid compliance tooling on GCP. Ask about any specific project for more detail.`,
  project_willo: `Willo Box is an AI-powered document query platform I built at Argonteq. Users upload PDFs and get context-aware answers through semantic search — powered by OpenAI APIs and LangChain.`,
  project_aedi: `AEDI is a multi-tenant SaaS platform for Canadian land development and municipal planning. It includes automated zoning assessments, ArcGIS/PostGIS integrations, and AI planning workflows with FastAPI, OpenAI, and RAG pipelines.`,
  location: `I'm based in ${personalInfo.location}.`,
  availability: `I'm open to ${personalInfo.availability.toLowerCase()} opportunities — especially SaaS, AI/LLM, healthcare-adjacent, GIS, or cloud-native products.`,
  contact: `You can reach me at ${personalInfo.email} or ${personalInfo.phone}. LinkedIn: ${personalInfo.socialLinks.linkedin} — or say you'd like to connect and I'll ask for your details.`,
  education: `I have a BS in Software Engineering from Virtual University of Pakistan (2021–2025, 3.69/4.0 GPA) and F.Sc Pre-Engineering from Govt. Degree College.`,
}
