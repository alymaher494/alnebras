import nodemailer from 'nodemailer'

export interface OutgoingMail {
  to: string
  subject: string
  text: string
  attachments?: { filename: string; path: string }[]
}

function isMailConfigured(): boolean {
  return !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
}

/**
 * Send an email via SMTP when configured.
 * Returns 'sent' | 'skipped' (no SMTP configured — caller must still persist data).
 * Never throws: failures are logged and reported as 'failed'.
 */
export async function sendMail(mail: OutgoingMail): Promise<'sent' | 'skipped' | 'failed'> {
  if (!isMailConfigured()) {
    console.log(`Mail skipped (SMTP not configured). Would send to ${mail.to}: ${mail.subject}`)
    return 'skipped'
  }
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
      attachments: mail.attachments,
    })
    return 'sent'
  } catch (error) {
    console.error('Mail send failed:', error)
    return 'failed'
  }
}
