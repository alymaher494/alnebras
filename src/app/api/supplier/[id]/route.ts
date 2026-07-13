import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { checkAuth } from '@/lib/auth'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'غير مصرح بالوصول' }, { status: 401 })
  }

  try {
    const { id } = await params
    await db.supplierRequest.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting supplier request:', error)
    return NextResponse.json({ error: 'Failed to delete request' }, { status: 500 })
  }
}
