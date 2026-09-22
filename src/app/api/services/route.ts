import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { checkAuth } from '@/lib/auth'
import { serviceWriteSchema } from '@/lib/validation'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const showAll = searchParams.get('all') === 'true'

    const services = await db.service.findMany({
      where: showAll ? {} : { isActive: true },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(services)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'غير مصرح بالوصول' }, { status: 401 })
  }

  try {
    const raw = await request.json().catch(() => null)
    const parsed = serviceWriteSchema.safeParse(raw)
    if (!parsed.success) {
      return NextResponse.json({ error: 'الاسم العربي والوصف العربي مطلوبان' }, { status: 400 })
    }
    const { titleAr, titleEn, descriptionAr, descriptionEn, icon, image, order } = parsed.data

    const service = await db.service.create({
      data: {
        titleAr,
        titleEn: titleEn ?? undefined,
        descriptionAr,
        descriptionEn: descriptionEn ?? undefined,
        icon: icon || 'Sparkles',
        image: image ?? undefined,
        order: order ?? 0,
      },
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}