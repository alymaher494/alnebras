import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const article = await db.newsArticle.findUnique({ where: { id } })

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error('Error fetching news article:', error)
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const article = await db.newsArticle.update({
      where: { id },
      data: {
        ...body,
        publishDate: body.publishDate ? new Date(body.publishDate) : undefined,
      },
    })

    return NextResponse.json(article)
  } catch (error) {
    console.error('Error updating news article:', error)
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const article = await db.newsArticle.update({
      where: { id },
      data: { isActive: false },
    })

    return NextResponse.json(article)
  } catch (error) {
    console.error('Error deleting news article:', error)
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
  }
}