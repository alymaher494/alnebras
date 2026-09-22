import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { checkAuth } from '@/lib/auth'
import { jobWriteSchema } from '@/lib/validation'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const showAll = searchParams.get('all') === 'true'

    const jobs = await db.jobListing.findMany({
      where: showAll ? {} : { isActive: true },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Error fetching job listings:', error)
    return NextResponse.json({ error: 'Failed to fetch job listings' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'غير مصرح بالوصول' }, { status: 401 })
  }

  try {
    const raw = await request.json().catch(() => null)
    const parsed = jobWriteSchema.safeParse(raw)
    if (!parsed.success) {
      return NextResponse.json({ error: 'titleAr is required' }, { status: 400 })
    }
    const data = parsed.data

    const job = await db.jobListing.create({
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
      },
    })

    return NextResponse.json(job, { status: 201 })
  } catch (error) {
    console.error('Error creating job listing:', error)
    return NextResponse.json({ error: 'Failed to create job listing' }, { status: 500 })
  }
}