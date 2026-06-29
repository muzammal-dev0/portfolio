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

export async function pushUnknownQuestionNotification({ question }) {
  await push(`Could not answer:\n\n"${question}"`, {
    title: 'Portfolio — unknown question',
    priority: 0,
  })
}
