import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { checkAuth } from '@/lib/auth'
import { jobWriteSchema } from '@/lib/validation'

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
    const parsed = jobWriteSchema.partial().safeParse(raw)
    if (!parsed.success) {
      return NextResponse.json({ error: 'titleAr is required' }, { status: 400 })
    }
    const data = parsed.data

    const job = await db.jobListing.update({
      where: { id },
      data: {
        titleAr: data.titleAr,
        titleEn: data.titleEn ?? undefined,
        departmentAr: data.departmentAr ?? undefined,
        departmentEn: data.departmentEn ?? undefined,
        locationAr: data.locationAr ?? undefined,
        locationEn: data.locationEn ?? undefined,
        type: data.type ?? undefined,
        descriptionAr: data.descriptionAr ?? undefined,
        descriptionEn: data.descriptionEn ?? undefined,
        requirementsAr: data.requirementsAr ?? undefined,
        requirementsEn: data.requirementsEn ?? undefined,
        isActive: data.isActive,
      },
    })

    return NextResponse.json(job)
  } catch (error) {
    console.error('Error updating job listing:', error)
    return NextResponse.json({ error: 'Failed to update job listing' }, { status: 500 })
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
    await db.jobListing.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting job listing:', error)
    return NextResponse.json({ error: 'Failed to delete job listing' }, { status: 500 })
  }
}