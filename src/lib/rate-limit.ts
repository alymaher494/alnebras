import { NextRequest } from 'next/server'

interface Bucket {
  count: number
  resetAt: number
}

// In-memory buckets. Correct for a single instance (standalone server).
// If you scale to multiple instances, replace with Redis.
const buckets = new Map<string, Bucket>()

// Prevent unbounded growth
setInterval(() => {
  const now = Date.now()
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key)
  }
}, 60_000).unref?.()

/**
 * Fixed-window rate limit. Returns true when the request is allowed.
 */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const bucket = buckets.get(key)
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (bucket.count >= limit) return false
  bucket.count += 1
  return true
}

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim().slice(0, 64)
  return 'unknown'
}
