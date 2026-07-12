import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const events = await db.event.findMany({
      where: { isActive: true },
      orderBy: { eventDate: 'desc' },
    })

    return NextResponse.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.titleAr) {
      return NextResponse.json({ error: 'titleAr is required' }, { status: 400 })
    }

    const event = await db.event.create({
      data: {
        titleAr: body.titleAr,
        titleEn: body.titleEn,
        descriptionAr: body.descriptionAr,
        descriptionEn: body.descriptionEn,
        image: body.image,
        eventDate: body.eventDate ? new Date(body.eventDate) : undefined,
        locationAr: body.locationAr,
        locationEn: body.locationEn,
      },
    })

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}