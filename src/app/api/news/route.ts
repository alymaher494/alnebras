import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const articles = await db.newsArticle.findMany({
      where: { isActive: true },
      orderBy: { publishDate: 'desc' },
    })

    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching news articles:', error)
    return NextResponse.json({ error: 'Failed to fetch news articles' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.titleAr) {
      return NextResponse.json({ error: 'titleAr is required' }, { status: 400 })
    }

    const article = await db.newsArticle.create({
      data: {
        titleAr: body.titleAr,
        titleEn: body.titleEn,
        contentAr: body.contentAr,
        contentEn: body.contentEn,
        summaryAr: body.summaryAr,
        summaryEn: body.summaryEn,
        image: body.image,
        publishDate: body.publishDate ? new Date(body.publishDate) : undefined,
      },
    })

    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error('Error creating news article:', error)
    return NextResponse.json({ error: 'Failed to create news article' }, { status: 500 })
  }
}