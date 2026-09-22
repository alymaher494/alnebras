import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { createSessionToken, isAuthConfigured } from '@/lib/auth'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { loginSchema } from '@/lib/validation'

export async function POST(request: NextRequest) {
  try {
    // Basic brute-force protection: 5 attempts / minute / IP
    const ip = getClientIp(request)
    if (!checkRateLimit(`login:${ip}`, 5, 60_000)) {
      return NextResponse.json({ error: 'محاولات كثيرة، حاول بعد دقيقة' }, { status: 429 })
    }

    if (!isAuthConfigured()) {
      console.error('Auth misconfigured: set SESSION_SECRET (min 16 chars) or ADMIN_PASSWORD')
      return NextResponse.json({ error: 'الدخول غير مُعد على الخادم' }, { status: 500 })
    }

    const body = await request.json().catch(() => null)
    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'بيانات الدخول غير صالحة' }, { status: 400 })
    }

    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) {
      console.error('Auth misconfigured: ADMIN_PASSWORD is not set')
      return NextResponse.json({ error: 'الدخول غير مُعد على الخادم' }, { status: 500 })
    }

    // Timing-safe comparison to avoid leaking password length / prefix
    const a = Buffer.from(parsed.data.password)
    const b = Buffer.from(adminPassword)
    const ok = a.length === b.length && timingSafeEqual(a, b)
    if (!ok) {
      return NextResponse.json({ error: 'كلمة المرور غير صحيحة' }, { status: 401 })
    }

    const token = createSessionToken()
    if (!token) {
      return NextResponse.json({ error: 'تعذر إنشاء الجلسة' }, { status: 500 })
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS-only in production; localhost dev stays http
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    })
    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'حدث خطأ أثناء تسجيل الدخول' }, { status: 500 })
  }
}
