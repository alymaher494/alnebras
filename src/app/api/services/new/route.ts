import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.titleAr || !body.descriptionAr) {
      return NextResponse.json(
        { error: 'titleAr and descriptionAr are required' },
        { status: 400 }
      )
    }

    const service = await db.service.create({
      data: {
        titleAr: body.titleAr,
        titleEn: body.titleEn,
        descriptionAr: body.descriptionAr,
        descriptionEn: body.descriptionEn,
        icon: body.icon,
        order: body.order ?? 0,
        image: body.image,
      },
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}