import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const showAll = searchParams.get('all') === 'true'

    const partners = await db.partner.findMany({
      where: showAll ? {} : { isActive: true },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(partners)
  } catch (error) {
    console.error('Error fetching partners:', error)
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.name) {
      return NextResponse.json({ error: 'name is required' }, { status: 400 })
    }

    const partner = await db.partner.create({
      data: {
        name: body.name,
        logo: body.logo,
        order: body.order ?? 0,
      },
    })

    return NextResponse.json(partner, { status: 201 })
  } catch (error) {
    console.error('Error creating partner:', error)
    return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 })
  }
}