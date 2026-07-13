import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { checkAuth } from '@/lib/auth'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'غير مصرح بالوصول' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()
    const {
      titleAr,
      titleEn,
      contentAr,
      contentEn,
      summaryAr,
      summaryEn,
      image,
      publishDate,
      isActive,
    } = body

    const article = await db.newsArticle.update({
      where: { id },
      data: {
        titleAr,
        titleEn,
        contentAr,
        contentEn,
        summaryAr,
        summaryEn,
        image,
        publishDate: publishDate ? new Date(publishDate) : undefined,
        isActive: isActive !== undefined ? Boolean(isActive) : undefined,
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