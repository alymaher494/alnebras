import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    const adminPassword = process.env.ADMIN_PASSWORD || 'alnebras@2026'

    if (password === adminPassword) {
      const response = NextResponse.json({ success: true })
      
      // Set session cookie
      response.cookies.set('admin_session', 'nebras_admin_authorized', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      })

      return response
    }

    return NextResponse.json({ error: 'كلمة المرور غير صحيحة' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ أثناء تسجيل الدخول' }, { status: 500 })
  }
}
