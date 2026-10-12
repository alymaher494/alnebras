import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { checkAuth } from '@/lib/auth'
import { z } from 'zod'

const departmentEmailSchema = z.object({
  id: z.string().min(1).max(60),
  email: z.string().trim().email().max(200),
})

// Public: active departments (id + name) for job forms
export async function GET() {
  try {
    const departments = await db.department.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      select: { id: true, nameEn: true },
    })
    return NextResponse.json(departments)
  } catch (error) {
    console.error('Error fetching departments:', error)
    return NextResponse.json({ error: 'Failed to fetch departments' }, { status: 500 })
  }
}

// Admin: bulk update department emails (managed from control panel)
export async function PUT(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'غير مصرح بالوصول' }, { status: 401 })
  }
  try {
    const raw = await request.json().catch(() => null)
    const parsed = z.array(departmentEmailSchema).max(100).safeParse(raw)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }
    await db.$transaction(
      parsed.data.map((d) => db.department.update({ where: { id: d.id }, data: { email: d.email } }))
    )
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating departments:', error)
    return NextResponse.json({ error: 'Failed to update departments' }, { status: 500 })
  }
}
