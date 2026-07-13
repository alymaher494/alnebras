import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { checkAuth } from '@/lib/auth'

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
    const body = await request.json()

    if (!body.titleAr) {
      return NextResponse.json({ error: 'titleAr is required' }, { status: 400 })
    }

    const job = await db.jobListing.create({
      data: {
        titleAr: body.titleAr,
        titleEn: body.titleEn,
        departmentAr: body.departmentAr,
        departmentEn: body.departmentEn,
        locationAr: body.locationAr,
        locationEn: body.locationEn,
        type: body.type,
        descriptionAr: body.descriptionAr,
        descriptionEn: body.descriptionEn,
        requirementsAr: body.requirementsAr,
        requirementsEn: body.requirementsEn,
      },
    })

    return NextResponse.json(job, { status: 201 })
  } catch (error) {
    console.error('Error creating job listing:', error)
    return NextResponse.json({ error: 'Failed to create job listing' }, { status: 500 })
  }
}