import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { checkAuth } from '@/lib/auth'
import { newsWriteSchema } from '@/lib/validation'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'غير مصرح بالوصول' }, { status: 401 })
  }

  try {
    const { id } = await params
    const raw = await request.json().catch(() => null)
    const parsed = newsWriteSchema.partial().safeParse(raw)
    if (!parsed.success) {
      return NextResponse.json({ error: 'titleAr is required' }, { status: 400 })
    }
    const data = parsed.data

    const article = await db.newsArticle.update({
      where: { id },
      data: {
        titleAr: data.titleAr,
        titleEn: data.titleEn ?? undefined,
        contentAr: data.contentAr ?? undefined,
        contentEn: data.contentEn ?? undefined,
        summaryAr: data.summaryAr ?? undefined,
        summaryEn: data.summaryEn ?? undefined,
        image: data.image ?? undefined,
        publishDate: data.publishDate ? new Date(data.publishDate) : undefined,
        isActive: data.isActive,
      },
    })

    return NextResponse.json(article)
  } catch (error) {
    console.error('Error updating news article:', error)
    return NextResponse.json({ error: 'Failed to update news article' }, { status: 500 })
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
    await db.newsArticle.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting news article:', error)
    return NextResponse.json({ error: 'Failed to delete news article' }, { status: 500 })
  }
}