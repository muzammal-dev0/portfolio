import { toolHandlers } from './tools.js'

export async function handleToolCalls(toolCalls) {
  const results = []

  for (const toolCall of toolCalls) {
    const toolName = toolCall.function.name
    let args = {}

    try {
      args = JSON.parse(toolCall.function.arguments || '{}')
    } catch {
      args = {}
    }

    const handler = toolHandlers[toolName]
    const result = handler ? await handler(args) : { recorded: 'error', message: 'Unknown tool' }

    results.push({
      role: 'tool',
      content: JSON.stringify(result),
      tool_call_id: toolCall.id,
    })
  }

  return results
}
