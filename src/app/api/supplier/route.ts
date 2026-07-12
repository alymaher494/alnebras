import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.name || !body.company || !body.phone || !body.email) {
      return NextResponse.json(
        { error: 'name, company, phone, and email are required' },
        { status: 400 }
      )
    }

    const supplierRequest = await db.supplierRequest.create({
      data: {
        name: body.name,
        company: body.company,
        phone: body.phone,
        email: body.email,
        message: body.message,
        fileUrl: body.fileUrl,
      },
    })

    return NextResponse.json(supplierRequest, { status: 201 })
  } catch (error) {
    console.error('Error creating supplier request:', error)
    return NextResponse.json({ error: 'Failed to submit supplier request' }, { status: 500 })
  }
}