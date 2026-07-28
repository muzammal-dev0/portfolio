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

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildEmailLayout({ eyebrow, title, bodyHtml, footerNote }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f4;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f4;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border:1px solid #e7e5e4;">
          <tr>
            <td style="height:4px;background:#FF3D00;font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px;">
              <p style="margin:0 0 8px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#a8a29e;">
                ${escapeHtml(eyebrow)}
              </p>
              <h1 style="margin:0;font-size:22px;line-height:1.3;color:#1c1917;font-weight:700;">
                ${escapeHtml(title)}
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 28px;">
              ${bodyHtml}
              <p style="margin:24px 0 0;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12px;line-height:1.5;color:#a8a29e;">
                ${escapeHtml(footerNote)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function detailRow(label, value) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f5f5f4;vertical-align:top;width:110px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#a8a29e;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #f5f5f4;vertical-align:top;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:14px;line-height:1.5;color:#1c1917;">
        ${value}
      </td>
    </tr>`
}

export async function push(message, { title, html } = {}) {
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
      ...(html && { html }),
    })
  } catch (err) {
    console.error('[chatbot] Email send failed:', err.message)
  }
}

export async function pushLeadNotification({ email, name, notes }) {
  const safeName = name || 'Name not provided'
  const safeEmail = email || 'not provided'
  const safeNotes = notes || 'not provided'

  const text = [
    'New portfolio lead',
    '',
    `Name: ${safeName}`,
    `Email: ${safeEmail}`,
    `Notes: ${safeNotes}`,
    '',
    'Sent by AI Agent Twin on your portfolio.',
  ].join('\n')

  const emailCell = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail)
    ? `<a href="mailto:${escapeHtml(safeEmail)}" style="color:#FF3D00;text-decoration:none;">${escapeHtml(safeEmail)}</a>`
    : escapeHtml(safeEmail)

  const html = buildEmailLayout({
    eyebrow: 'AI Agent Twin',
    title: 'Someone wants to connect',
    footerNote: 'Sent by AI Agent Twin on your portfolio site.',
    bodyHtml: `
      <p style="margin:0 0 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:14px;line-height:1.6;color:#57534e;">
        A visitor shared their details through the portfolio chat.
      </p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #e7e5e4;">
        ${detailRow('Name', escapeHtml(safeName))}
        ${detailRow('Email', emailCell)}
        ${detailRow('Notes', escapeHtml(safeNotes))}
      </table>
    `,
  })

  await push(text, {
    title: 'Portfolio — someone wants to connect',
    html,
  })
}

export async function pushUnknownQuestionNotification({ question }) {
  const safeQuestion = question || 'Unknown question'

  const text = [
    'Out-of-scope / unknown question',
    '',
    `"${safeQuestion}"`,
    '',
    'Sent by AI Agent Twin on your portfolio.',
  ].join('\n')

  const html = buildEmailLayout({
    eyebrow: 'AI Agent Twin',
    title: 'Out-of-scope question',
    footerNote: 'Sent by AI Agent Twin on your portfolio site.',
    bodyHtml: `
      <p style="margin:0 0 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:14px;line-height:1.6;color:#57534e;">
        A visitor asked something the chatbot could not answer from your profile.
      </p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #e7e5e4;">
        ${detailRow(
          'Question',
          `<span style="display:block;padding:12px 14px;background:#fafaf9;border:1px solid #e7e5e4;color:#1c1917;">${escapeHtml(safeQuestion)}</span>`
        )}
      </table>
    `,
  })

  await push(text, {
    title: 'Portfolio — unknown question',
    html,
  })
}
