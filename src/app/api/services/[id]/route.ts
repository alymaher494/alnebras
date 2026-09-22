import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { checkAuth } from '@/lib/auth'
import { serviceWriteSchema } from '@/lib/validation'

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
    const parsed = serviceWriteSchema.partial().safeParse(raw)
    if (!parsed.success) {
      return NextResponse.json({ error: 'الاسم العربي والوصف العربي مطلوبان' }, { status: 400 })
    }
    const data = parsed.data

    const service = await db.service.update({
      where: { id },
      data: {
        titleAr: data.titleAr,
        titleEn: data.titleEn ?? undefined,
        descriptionAr: data.descriptionAr,
        descriptionEn: data.descriptionEn ?? undefined,
        icon: data.icon ?? undefined,
        image: data.image ?? undefined,
        order: data.order,
        isActive: data.isActive,
      },
    })

    return NextResponse.json(service)
  } catch (error) {
    console.error('Error updating service:', error)
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 })
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
    await db.service.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting service:', error)
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 })
  }
}