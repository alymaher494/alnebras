import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const jobs = await db.jobListing.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Error fetching job listings:', error)
    return NextResponse.json({ error: 'Failed to fetch job listings' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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