'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Calendar, MapPin, Newspaper, ImageIcon, CalendarDays } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import AnimatedSection from '@/components/shared/AnimatedSection'
import SectionTitle from '@/components/shared/SectionTitle'
import { useNavigationStore, type MediaSubPage } from '@/lib/store'

interface NewsArticle {
  id: string
  titleAr: string
  summaryAr: string | null
  contentAr: string | null
  image: string | null
  publishDate: string
}

interface EventItem {
  id: string
  titleAr: string
  descriptionAr: string | null
  image: string | null
  eventDate: string | null
  locationAr: string | null
}

export default function MediaCenterPage() {
  const { isMediaSubPage, setMediaSubPage } = useNavigationStore()
  const [news, setNews] = useState<NewsArticle[]>([])
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [newsRes, eventsRes] = await Promise.all([
          fetch('/api/news'),
          fetch('/api/events'),
        ])
        const [newsData, eventsData] = await Promise.all([
          newsRes.json(),
          eventsRes.json(),
        ])
        setNews(newsData)
        setEvents(eventsData)
      } catch (err) {
        console.error('Failed to fetch media data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const tabs: { value: MediaSubPage; label: string }[] = [
    { value: 'all', label: 'الكل' },
    { value: 'news', label: 'الأخبار' },
    { value: 'photos', label: 'الصور' },
    { value: 'events', label: 'الفعاليات' },
  ]

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatEventDate = (dateStr: string | null) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Determine what to show
  const showNews = isMediaSubPage === 'all' || isMediaSubPage === 'news'
  const showEvents = isMediaSubPage === 'all' || isMediaSubPage === 'events'
  const showPhotos = isMediaSubPage === 'photos'

  return (
    <div className="pt-20 md:pt-24">
      <section className="py-16 md:py-24 bg-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="المركز الإعلامي" />

          {/* Sub-tabs */}
          <div className="flex justify-center mb-12">
            <Tabs
              value={isMediaSubPage}
              onValueChange={(v) => setMediaSubPage(v as MediaSubPage)}
            >
              <TabsList className="bg-[#f3f4f6]">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="data-[state=active]:bg-[#012b67] data-[state=active]:text-white px-6 text-sm"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-72 bg-[#f3f4f6] rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : (
            <>
              {/* News */}
              {showNews && news.length > 0 && (
                <div className="mb-12">
                  {isMediaSubPage === 'all' && (
                    <h3 className="text-xl font-bold text-[#012b67] mb-6 flex items-center gap-2">
                      <Newspaper className="w-5 h-5" />
                      الأخبار
                    </h3>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.map((article, i) => (
                      <AnimatedSection key={article.id} delay={i * 0.08}>
                        <Card className="border-0 shadow-sm card-hover h-full overflow-hidden">
                          <div className="relative h-48">
                            <Image
                              src={article.image || '/images/office.jpg'}
                              alt={article.titleAr}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 text-[#6b7280] text-xs mb-3">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatDate(article.publishDate)}
                            </div>
                            <h4 className="text-base font-bold text-[#012b67] mb-2 leading-relaxed">
                              {article.titleAr}
                            </h4>
                            {article.summaryAr && (
                              <p className="text-[#6b7280] text-sm leading-relaxed line-clamp-3">
                                {article.summaryAr}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
              )}

              {/* Events in media center */}
              {showEvents && events.length > 0 && (
                <div className="mb-12">
                  {isMediaSubPage === 'all' && (
                    <h3 className="text-xl font-bold text-[#012b67] mb-6 flex items-center gap-2">
                      <CalendarDays className="w-5 h-5" />
                      الفعاليات
                    </h3>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event, i) => (
                      <AnimatedSection key={event.id} delay={i * 0.08}>
                        <Card className="border-0 shadow-sm card-hover h-full overflow-hidden">
                          <div className="relative h-48">
                            <Image
                              src={event.image || '/images/facility.jpg'}
                              alt={event.titleAr}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <CardContent className="p-6">
                            <h4 className="text-base font-bold text-[#012b67] mb-2">
                              {event.titleAr}
                            </h4>
                            <div className="flex flex-wrap items-center gap-4 text-[#6b7280] text-xs">
                              {event.eventDate && (
                                <div className="flex items-center gap-1.5">
                                  <Calendar className="w-3.5 h-3.5" />
                                  {formatEventDate(event.eventDate)}
                                </div>
                              )}
                              {event.locationAr && (
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5" />
                                  {event.locationAr}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
              )}

              {/* Photos tab */}
              {showPhotos && (
                <div>
                  <AnimatedSection>
                    <div className="text-center py-16">
                      <div className="w-20 h-20 bg-[#e8eef5] rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <ImageIcon className="w-10 h-10 text-[#012b67]" />
                      </div>
                      <p className="text-[#6b7280] text-lg">
                        لا توجد صور متاحة حالياً
                      </p>
                      <p className="text-[#6b7280] text-sm mt-2">
                        يرجى متابعة هذه الصفحة لمعرفة آخر الصور
                      </p>
                    </div>
                  </AnimatedSection>
                </div>
              )}

              {/* Empty state for all/news/events tabs */}
              {!showPhotos &&
                !loading &&
                ((showNews && news.length === 0 && !showEvents) ||
                  (showEvents && events.length === 0 && !showNews) ||
                  (showNews &&
                    showEvents &&
                    news.length === 0 &&
                    events.length === 0)) && (
                  <AnimatedSection>
                    <div className="text-center py-16">
                      <p className="text-[#6b7280] text-lg">
                        لا يوجد محتوى متاح حالياً
                      </p>
                    </div>
                  </AnimatedSection>
                )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}