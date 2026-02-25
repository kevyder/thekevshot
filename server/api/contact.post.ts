import { Resend } from 'resend'
import { z } from 'zod'

const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour

const ipTimestamps = new Map<string, number[]>()

const contactSchema = z.object({
  firstName: z.string()
    .trim()
    .min(1, 'First name is required')
    .max(50, 'First name must be 50 characters or fewer'),
  lastName: z.string()
    .trim()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be 50 characters or fewer'),
  email: z.string()
    .trim()
    .min(1, 'Email is required')
    .max(254, 'Email must be 254 characters or fewer')
    .email('Enter a valid email address'),
  subject: z.string()
    .trim()
    .min(1, 'Subject is required')
    .max(150, 'Subject must be 150 characters or fewer'),
  message: z.string()
    .trim()
    .min(1, 'Message is required')
    .max(5000, 'Message must be 5000 characters or fewer'),
  token: z.string()
    .min(1, 'Verification token is required'),
})

function getClientIp(event: Parameters<typeof defineEventHandler>[0] extends (e: infer E) => unknown ? E : never): string {
  const forwarded = getHeader(event, 'x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() ?? 'unknown'
  }
  return event.node.req.socket?.remoteAddress ?? 'unknown'
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = ipTimestamps.get(ip) ?? []
  const windowStart = now - RATE_LIMIT_WINDOW_MS
  const recent = timestamps.filter(ts => ts > windowStart)

  if (recent.length >= RATE_LIMIT_MAX) {
    ipTimestamps.set(ip, recent)
    return true
  }

  recent.push(now)
  ipTimestamps.set(ip, recent)
  return false
}

function escapeHtml(str: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  return str.replace(/[&<>"']/g, (ch) => map[ch] ?? ch)
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody<unknown>(event)

  // Validate input with Zod
  const result = contactSchema.safeParse(body)
  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      field: String(issue.path[0] ?? ''),
      message: issue.message,
    }))

    throw createError({
      statusCode: 422,
      statusMessage: 'Validation failed',
      data: { error: 'Validation failed', details },
    })
  }

  const { firstName, lastName, email, subject, message, token } = result.data

  // Verify Turnstile token with Cloudflare
  const turnstileResult = await verifyTurnstileToken(token)
  if (!turnstileResult.success) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Verification failed',
      data: {
        error: 'Verification failed',
        details: [{ field: 'token', message: 'Bot verification failed. Please try again.' }],
      },
    })
  }

  // Rate limit by IP
  const ip = getClientIp(event)
  if (isRateLimited(ip)) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many requests. Please try again later.',
    })
  }

  // Check that Resend is configured
  if (!config.resendApiKey) {
    console.error('[contact] NUXT_RESEND_API_KEY is not configured')
    throw createError({
      statusCode: 500,
      statusMessage: 'Email service is not configured',
    })
  }

  if (!config.contactToAddress) {
    console.error('[contact] NUXT_CONTACT_TO_ADDRESS is not configured')
    throw createError({
      statusCode: 500,
      statusMessage: 'Recipient email is not configured',
    })
  }

  const safeFirstName = escapeHtml(firstName)
  const safeLastName = escapeHtml(lastName)
  const safeEmail = escapeHtml(email)
  const safeSubject = escapeHtml(subject)
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />')
  const fullName = `${safeFirstName} ${safeLastName}`

  const fromAddress = config.contactFromAddress || `noreply@thekevshot.com`

  const html = `
    <h2>THEKEVSHOT - New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${fullName}</p>
    <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
    <p><strong>Subject:</strong> ${safeSubject}</p>
    <hr />
    <div>${safeMessage}</div>
    <hr />
    <p style="color: #999; font-size: 0.85em;">Sent from thekevshot.com contact form &middot; IP: ${escapeHtml(ip)}</p>
  `.trim()

  const resend = new Resend(config.resendApiKey)

  const { error: sendError } = await resend.emails.send({
    from: fromAddress,
    to: config.contactToAddress,
    replyTo: email,
    subject: subject,
    html,
  })

  if (sendError) {
    console.error('[contact] Failed to send email via Resend:', sendError.message)
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to send email. Please try again later.',
    })
  }

  console.log(`[contact] Email sent from="${safeEmail}" name="${fullName}" subject="${safeSubject}" ip=${ip}`)
  return { ok: true }
})
