import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { checkAuth } from '@/lib/auth'
import { newsWriteSchema } from '@/lib/validation'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const showAll = searchParams.get('all') === 'true'

    const articles = await db.newsArticle.findMany({
      where: showAll ? {} : { isActive: true },
      orderBy: { publishDate: 'desc' },
    })

    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching news articles:', error)
    return NextResponse.json({ error: 'Failed to fetch news articles' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'غير مصرح بالوصول' }, { status: 401 })
  }

  try {
    const raw = await request.json().catch(() => null)
    const parsed = newsWriteSchema.safeParse(raw)
    if (!parsed.success) {
      return NextResponse.json({ error: 'titleAr is required' }, { status: 400 })
    }
    const data = parsed.data

    const article = await db.newsArticle.create({
      data: {
        titleAr: data.titleAr,
        titleEn: data.titleEn ?? undefined,
        contentAr: data.contentAr ?? undefined,
        contentEn: data.contentEn ?? undefined,
        summaryAr: data.summaryAr ?? undefined,
        summaryEn: data.summaryEn ?? undefined,
        image: data.image ?? undefined,
        publishDate: data.publishDate ? new Date(data.publishDate) : undefined,
      },
    })

    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error('Error creating news article:', error)
    return NextResponse.json({ error: 'Failed to create news article' }, { status: 500 })
  }
}