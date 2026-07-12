import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const job = await db.jobListing.update({
      where: { id },
      data: body,
    })

    return NextResponse.json(job)
  } catch (error) {
    console.error('Error updating job listing:', error)
    return NextResponse.json({ error: 'Failed to update job listing' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const job = await db.jobListing.update({
      where: { id },
      data: { isActive: false },
    })

    return NextResponse.json(job)
  } catch (error) {
    console.error('Error deleting job listing:', error)
    return NextResponse.json({ error: 'Failed to delete job listing' }, { status: 500 })
  }
}