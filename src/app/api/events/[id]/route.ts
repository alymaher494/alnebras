import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { checkAuth } from '@/lib/auth'
import { eventWriteSchema } from '@/lib/validation'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'غير مصرح بالوصول' }, { status: 401 })
  }

  try {
    const { id } = await params
    const raw = await request.json().catch(() => null)
    const parsed = eventWriteSchema.partial().safeParse(raw)
    if (!parsed.success) {
      return NextResponse.json({ error: 'titleAr is required' }, { status: 400 })
    }
    const data = parsed.data

    const event = await db.event.update({
      where: { id },
      data: {
        titleAr: data.titleAr,
        titleEn: data.titleEn ?? undefined,
        descriptionAr: data.descriptionAr ?? undefined,
        descriptionEn: data.descriptionEn ?? undefined,
        image: data.image ?? undefined,
        eventDate: data.eventDate ? new Date(data.eventDate) : undefined,
        locationAr: data.locationAr ?? undefined,
        locationEn: data.locationEn ?? undefined,
        isActive: data.isActive,
      },
    })

    return NextResponse.json(event)
  } catch (error) {
    console.error('Error updating event:', error)
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'غير مصرح بالوصول' }, { status: 401 })
  }

  try {
    const { id } = await params
    await db.event.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting event:', error)
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
  }
}