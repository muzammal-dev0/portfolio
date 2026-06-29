import { pushLeadNotification, pushUnknownQuestionNotification } from './notify.js'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const recordUserDetailsSchema = {
  type: 'function',
  function: {
    name: 'record_user_details',
    description:
      'Call only when the user wants to connect AND you have both their name and a valid email address. Do not call if only name or only email was provided.',
    parameters: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: 'The email address of this user',
        },
        name: {
          type: 'string',
          description: "The user's name",
        },
        notes: {
          type: 'string',
          description:
            "Any additional information about the conversation that's worth recording to give context",
        },
      },
      required: ['email', 'name'],
      additionalProperties: false,
    },
  },
}

export const recordUnknownQuestionSchema = {
  type: 'function',
  function: {
    name: 'record_unknown_question',
    description:
      "Always use this when you cannot answer a question from Context. Record the question first, then tell the visitor you don't know — never guess.",
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

export async function record_user_details(
  email,
  name = 'Name not provided',
  notes = 'not provided'
) {
  if (!email?.trim() || !EMAIL_REGEX.test(email.trim())) {
    return { recorded: 'error', message: 'Invalid email address' }
  }

  if (!name?.trim() || name.trim().length < 2) {
    return { recorded: 'error', message: 'Name is required — ask the user for their name before recording' }
  }

  await pushLeadNotification({
    email: email.trim(),
    name: name.trim(),
    notes: notes?.trim() || 'not provided',
  })

  return { recorded: 'ok' }
}

export async function record_unknown_question(question) {
  await pushUnknownQuestionNotification({
    question: question?.trim() || 'Unknown question',
  })
  return { recorded: 'ok' }
}

export const toolHandlers = {
  record_user_details: (args) =>
    record_user_details(args.email, args.name, args.notes),
  record_unknown_question: (args) =>
    record_unknown_question(args.question),
}
