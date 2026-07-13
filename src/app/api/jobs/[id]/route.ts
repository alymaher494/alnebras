import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { checkAuth } from '@/lib/auth'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'غير مصرح بالوصول' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()
    const {
      titleAr,
      titleEn,
      departmentAr,
      departmentEn,
      locationAr,
      locationEn,
      type,
      descriptionAr,
      descriptionEn,
      requirementsAr,
      requirementsEn,
      isActive,
    } = body

    const job = await db.jobListing.update({
      where: { id },
      data: {
        titleAr,
        titleEn,
        departmentAr,
        departmentEn,
        locationAr,
        locationEn,
        type,
        descriptionAr,
        descriptionEn,
        requirementsAr,
        requirementsEn,
        isActive: isActive !== undefined ? Boolean(isActive) : undefined,
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