import nodemailer from 'nodemailer'

function getTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com'
  const port = Number(process.env.SMTP_PORT) || 587
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!user || !pass) {
    console.error('[chatbot] SMTP_USER or SMTP_PASS not set')
    return null
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

export async function push(message, { title } = {}) {
  const to = process.env.NOTIFY_EMAIL_TO
  const from = process.env.NOTIFY_EMAIL_FROM || process.env.SMTP_USER

  if (!to) {
    console.error('[chatbot] NOTIFY_EMAIL_TO not set')
    return
  }

  const transporter = getTransporter()
  if (!transporter) return

  try {
    await transporter.sendMail({
      from,
      to,
      subject: title || 'Portfolio chatbot',
      text: message,
    })
  } catch (err) {
    console.error('[chatbot] Email send failed:', err.message)
  }
}

export async function pushLeadNotification({ email, name, notes }) {
  await push(
    `New portfolio lead\n\nName: ${name}\nEmail: ${email}\nNotes: ${notes}`,
    { title: 'Portfolio — someone wants to connect' }
  )
}

export async function pushUnknownQuestionNotification({ question }) {
  await push(`Could not answer:\n\n"${question}"`, {
    title: 'Portfolio — unknown question',
  })
}
