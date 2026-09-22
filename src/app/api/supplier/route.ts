import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { checkAuth } from '@/lib/auth'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { supplierSchema } from '@/lib/validation'

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'غير مصرح بالوصول' }, { status: 401 })
  }

  try {
    const requests = await db.supplierRequest.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(requests)
  } catch (error) {
    console.error('Error fetching supplier requests:', error)
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request)
    if (!checkRateLimit(`supplier:${ip}`, 20, 10 * 60_000)) {
      return NextResponse.json({ error: 'طلبات كثيرة، حاول لاحقاً' }, { status: 429 })
    }

    const body = await request.json().catch(() => null)
    const parsed = supplierSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'بيانات الطلب غير صالحة' },
        { status: 400 }
      )
    }

    const supplierRequest = await db.supplierRequest.create({
      data: {
        name: parsed.data.name,
        company: parsed.data.company,
        phone: parsed.data.phone,
        email: parsed.data.email,
        message: parsed.data.message ?? undefined,
        fileUrl: parsed.data.fileUrl ?? undefined,
      },
    })

    return NextResponse.json(supplierRequest, { status: 201 })
  } catch (error) {
    console.error('Error creating supplier request:', error)
    return NextResponse.json({ error: 'Failed to submit supplier request' }, { status: 500 })
  }
}