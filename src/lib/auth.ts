import { NextRequest } from 'next/server'
import { createHmac, randomBytes, timingSafeEqual } from 'crypto'

const COOKIE_NAME = 'admin_session'
const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 // 1 day

function getSecret(): string | null {
  const secret = process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD
  return secret && secret.length >= 16 ? secret : null
}

/** Create a signed session token: v1.<expiresAt>.<nonce>.<sig> */
export function createSessionToken(): string | null {
  const secret = getSecret()
  if (!secret) return null
  const expiresAt = String(Date.now() + TOKEN_TTL_MS)
  const nonce = randomBytes(16).toString('hex')
  const sig = createHmac('sha256', secret).update(`${expiresAt}.${nonce}`).digest('hex')
  return `v1.${expiresAt}.${nonce}.${sig}`
}

/**
 * Verify the admin session cookie.
 * FAIL-CLOSED: any missing/invalid/expired/forged token returns false.
 */
export function checkAuth(request: NextRequest): boolean {
  try {
    const secret = getSecret()
    if (!secret) return false
    const raw = request.cookies.get(COOKIE_NAME)?.value
    if (!raw) return false
    const parts = raw.split('.')
    if (parts.length !== 4 || parts[0] !== 'v1') return false
    const [, expiresAt, nonce, sig] = parts
    if (!/^\d+$/.test(expiresAt) || Date.now() > Number(expiresAt)) return false
    if (!/^[0-9a-f]{32}$/.test(nonce)) return false
    if (!/^[0-9a-f]{64}$/.test(sig)) return false
    const expected = createHmac('sha256', secret).update(`${expiresAt}.${nonce}`).digest()
    const actual = Buffer.from(sig, 'hex')
    return expected.length === actual.length && timingSafeEqual(expected, actual)
  } catch {
    return false
  }
}

/** True when auth is configured (a usable secret exists). */
export function isAuthConfigured(): boolean {
  return getSecret() !== null
}

export { COOKIE_NAME, TOKEN_TTL_MS }
