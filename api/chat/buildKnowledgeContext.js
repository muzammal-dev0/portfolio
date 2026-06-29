import fs from 'fs'
import path from 'path'

let cachedContext = null
let cachedMtime = null

export function buildKnowledgeContext() {
  const filePath = path.join(process.cwd(), 'data', 'chatbot-knowledge.txt')

  if (!fs.existsSync(filePath)) {
    throw new Error('Knowledge file not found: data/chatbot-knowledge.txt')
  }

  const stat = fs.statSync(filePath)
  if (cachedContext && cachedMtime === stat.mtimeMs) {
    return cachedContext
  }

  cachedContext = fs.readFileSync(filePath, 'utf8')
  cachedMtime = stat.mtimeMs
  return cachedContext
}
