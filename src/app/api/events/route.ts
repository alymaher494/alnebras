import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { checkAuth } from '@/lib/auth'
import { eventWriteSchema } from '@/lib/validation'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const showAll = searchParams.get('all') === 'true'

    const events = await db.event.findMany({
      where: showAll ? {} : { isActive: true },
      orderBy: { eventDate: 'desc' },
    })

    return NextResponse.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'غير مصرح بالوصول' }, { status: 401 })
  }

  try {
    const raw = await request.json().catch(() => null)
    const parsed = eventWriteSchema.safeParse(raw)
    if (!parsed.success) {
      return NextResponse.json({ error: 'titleAr is required' }, { status: 400 })
    }
    const data = parsed.data

    const event = await db.event.create({
      data: {
        titleAr: data.titleAr,
        titleEn: data.titleEn ?? undefined,
        descriptionAr: data.descriptionAr ?? undefined,
        descriptionEn: data.descriptionEn ?? undefined,
        image: data.image ?? undefined,
        eventDate: data.eventDate ? new Date(data.eventDate) : undefined,
        locationAr: data.locationAr ?? undefined,
        locationEn: data.locationEn ?? undefined,
      },
    })

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}