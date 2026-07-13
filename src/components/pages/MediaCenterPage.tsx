'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Calendar,
  MapPin,
  Newspaper,
  ImageIcon,
  CalendarDays,
} from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { useNavigationStore, type MediaSubPage } from '@/lib/store'
import { useTranslation } from '@/lib/translations'

/* ──────────── Types ──────────── */
interface NewsArticle {
  id: string
  titleAr: string
  titleEn: string | null
  summaryAr: string | null
  summaryEn: string | null
  contentAr: string | null
  contentEn: string | null
  image: string | null
  publishDate: string
}

interface EventItem {
  id: string
  titleAr: string
  titleEn: string | null
  descriptionAr: string | null
  descriptionEn: string | null
  image: string | null
  eventDate: string | null
  locationAr: string | null
  locationEn: string | null
}

/* ──────────── Gallery Images ──────────── */
const GALLERY_IMAGES = [
  'page4_img10.jpg',
  'page5_img20.jpg',
  'page5_img4.jpg',
  'page6_img1.jpg',
  'page6_img2.jpg',
  'page10_img1.jpg',
  'page9_img1.jpg',
]

/* ──────────── Hero Banner ──────────── */
function HeroBanner({ language }: { language: 'ar' | 'en' }) {
  const { t } = useTranslation(language)
  return (
    <section className="relative w-full h-[45vh] min-h-[340px] md:min-h-[400px] overflow-hidden">
      <Image
        src="/images/media_hero.png"
        alt="المركز الإعلامي"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#012b67]/70" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5"
        >
          {t('media-center')}
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="h-[3px] bg-white/80 rounded-full mb-5"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="text-white/85 text-lg md:text-xl max-w-2xl leading-relaxed"
        >
          {language === 'ar'
            ? 'تابع آخر الأخبار والفعاليات والصور من عالم النبراس'
            : 'Follow the latest news, events, and photos from the Alnebras world.'}
        </motion.p>
      </div>
    </section>
  )
}

/* ──────────── Loading Skeleton ──────────── */
function MediaSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl overflow-hidden shadow-sm"
        >
          <div className="h-52 bg-[#f3f4f6] animate-pulse" />
          <div className="p-5 space-y-3">
            <div className="h-4 w-28 bg-[#f3f4f6] rounded animate-pulse" />
            <div className="h-5 w-3/4 bg-[#f3f4f6] rounded animate-pulse" />
            <div className="h-4 w-full bg-[#f3f4f6] rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-[#f3f4f6] rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ──────────── News Card ──────────── */
function NewsCard({
  article,
  index,
  language,
}: {
  article: NewsArticle
  index: number
  language: 'ar' | 'en'
}) {
  const { t } = useTranslation(language)
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const aTitle = language === 'ar' ? article.titleAr : (article.titleEn || article.titleAr)
  const aSummary = language === 'ar' ? article.summaryAr : (article.summaryEn || article.summaryAr)

  return (
    <AnimatedSection delay={index * 0.08}>
      <div className="group card-modern bg-white shadow-[0_4px_24px_rgba(1,43,103,0.08)] h-full">
        <div className="relative h-52 overflow-hidden">
          <Image
            src={article.image || '/images/office.jpg'}
            alt={aTitle}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#012b67]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className={`absolute bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 ${language === 'ar' ? 'right-4' : 'left-4'}`}>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1.5">
              <Newspaper className="w-3.5 h-3.5 text-[#012b67]" />
              <span className="text-xs font-semibold text-[#012b67]">{t('read_more')}</span>
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 text-[#6b7280] text-xs mb-3">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(article.publishDate)}
          </div>
          <h4 className="text-base font-bold text-[#012b67] mb-2 leading-relaxed line-clamp-2">
            {aTitle}
          </h4>
          {aSummary && (
            <p className="text-[#6b7280] text-sm leading-relaxed line-clamp-3">
              {aSummary}
            </p>
          )}
        </div>
      </div>
    </AnimatedSection>
  )
}

/* ──────────── Event Card ──────────── */
function EventCard({
  event,
  index,
  language,
}: {
  event: EventItem
  index: number
  language: 'ar' | 'en'
}) {
  const formatEventDate = (dateStr: string | null) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const eTitle = language === 'ar' ? event.titleAr : (event.titleEn || event.titleAr)
  const eLoc = language === 'ar' ? event.locationAr : (event.locationEn || event.locationAr)
  const eDesc = language === 'ar' ? event.descriptionAr : (event.descriptionEn || event.descriptionAr)

  return (
    <AnimatedSection delay={index * 0.08}>
      <div className="group card-modern bg-white shadow-[0_4px_24px_rgba(1,43,103,0.08)] h-full">
        <div className="relative h-52 overflow-hidden">
          <Image
            src={event.image || '/images/facility.jpg'}
            alt={eTitle}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {event.eventDate && (
            <div className={`absolute top-4 bg-[#012b67] text-white rounded-xl px-3 py-2 text-center min-w-[60px] ${language === 'ar' ? 'right-4' : 'left-4'}`}>
              <div className="text-xl font-bold leading-none">
                {new Date(event.eventDate).getDate()}
              </div>
              <div className="text-[10px] mt-1 opacity-80">
                {new Date(event.eventDate).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
                  month: 'short',
                })}
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#012b67]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="p-5">
          <h4 className="text-base font-bold text-[#012b67] mb-3 leading-relaxed line-clamp-2">
            {eTitle}
          </h4>
          <div className="flex flex-wrap items-center gap-4 text-[#6b7280] text-xs">
            {event.eventDate && (
              <div className="flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5" />
                {formatEventDate(event.eventDate)}
              </div>
            )}
            {eLoc && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {eLoc}
              </div>
            )}
          </div>
          {eDesc && (
            <p className="text-[#6b7280] text-sm leading-relaxed line-clamp-2 mt-3">
              {eDesc}
            </p>
          )}
        </div>
      </div>
    </AnimatedSection>
  )
}

/* ──────────── Photo Card ──────────── */
function PhotoCard({
  src,
  index,
}: {
  src: string
  index: number
}) {
  const isTall = index % 3 === 1

  return (
    <AnimatedSection delay={index * 0.06}>
      <div
        className={`group card-modern overflow-hidden bg-white shadow-[0_4px_24px_rgba(1,43,103,0.08)] ${
          isTall ? 'row-span-2' : ''
        }`}
      >
        <div className={`relative ${isTall ? 'h-full min-h-[320px] md:min-h-[420px]' : 'h-56 md:h-64'} overflow-hidden`}>
          <Image
            src={`/images/gallery/${src}`}
            alt={`صورة ${index + 1}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-[#012b67]/0 group-hover:bg-[#012b67]/25 transition-colors duration-500" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
              <ImageIcon className="w-5 h-5 text-[#012b67]" />
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

/* ──────────── Empty State ──────────── */
function EmptyState({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle?: string }) {
  return (
    <AnimatedSection>
      <div className="text-center py-20">
        <div className="w-20 h-20 bg-[#e8eef5] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Icon className="w-10 h-10 text-[#012b67]" />
        </div>
        <h3 className="text-xl font-bold text-[#012b67] mb-2">{title}</h3>
        {subtitle && (
          <p className="text-[#6b7280] text-sm max-w-md mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </AnimatedSection>
  )
}

/* ──────────── Section Heading for Tabs ──────────── */
function TabSectionHeading({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-10 h-10 rounded-xl bg-[#e8eef5] flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-[#012b67]" />
      </div>
      <h3 className="text-xl font-bold text-[#012b67]">{title}</h3>
      <div className="flex-1 h-px bg-[#e5e7eb]" />
    </div>
  )
}

/* ──────────── Main Media Center Page ──────────── */
export default function MediaCenterPage() {
  const { isMediaSubPage, setMediaSubPage, language } = useNavigationStore()
  const { t } = useTranslation(language)
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
    { value: 'all', label: language === 'ar' ? 'الكل' : 'All' },
    { value: 'news', label: language === 'ar' ? 'الأخبار' : 'News' },
    { value: 'photos', label: language === 'ar' ? 'الصور' : 'Photos' },
    { value: 'events', label: language === 'ar' ? 'الفعاليات' : 'Events' },
  ]

  const showNews = isMediaSubPage === 'all' || isMediaSubPage === 'news'
  const showEvents = isMediaSubPage === 'all' || isMediaSubPage === 'events'
  const showPhotos = isMediaSubPage === 'photos'

  const hasContent =
    news.length > 0 || events.length > 0

  return (
    <div className="pt-20" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <HeroBanner language={language} />

      {/* Tabs + Content */}
      <section className="py-16 md:py-24 bg-[#f8f9fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Bar */}
          <div className="flex justify-center mb-12">
            <Tabs
              value={isMediaSubPage}
              onValueChange={(v) => setMediaSubPage(v as MediaSubPage)}
            >
              <TabsList className="bg-white shadow-[0_2px_12px_rgba(1,43,103,0.08)] rounded-full p-1.5 h-auto">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="data-[state=active]:bg-[#012b67] data-[state=active]:text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 data-[state=active]:shadow-md"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {loading ? (
            <MediaSkeleton />
          ) : (
            <>
              {/* News */}
              {showNews && news.length > 0 && (
                <div className="mb-14">
                  {isMediaSubPage === 'all' && (
                    <TabSectionHeading icon={Newspaper} title={language === 'ar' ? 'الأخبار' : 'News'} />
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.map((article, i) => (
                      <NewsCard key={article.id} article={article} index={i} language={language} />
                    ))}
                  </div>
                </div>
              )}

              {/* Events */}
              {showEvents && events.length > 0 && (
                <div className="mb-14">
                  {isMediaSubPage === 'all' && (
                    <TabSectionHeading
                      icon={CalendarDays}
                      title={language === 'ar' ? 'الفعاليات' : 'Events'}
                    />
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event, i) => (
                      <EventCard key={event.id} event={event} index={i} language={language} />
                    ))}
                  </div>
                </div>
              )}

              {/* Photos Grid */}
              {showPhotos && (
                <div>
                  <TabSectionHeading icon={ImageIcon} title={language === 'ar' ? 'معرض الصور' : 'Photo Gallery'} />
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[240px] md:auto-rows-[260px]">
                    {GALLERY_IMAGES.map((img, i) => (
                      <PhotoCard key={img} src={img} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {/* Empty States */}
              {!showPhotos && !loading && !hasContent && (
                <EmptyState
                  icon={Newspaper}
                  title={language === 'ar' ? 'لا يوجد محتوى متاح حالياً' : 'No content available currently'}
                  subtitle={language === 'ar' ? 'يرجى متابعة هذه الصفحة لمعرفة آخر الأخبار والفعاليات' : 'Please watch this page for future updates, news and events.'}
                />
              )}

              {showNews &&
                !loading &&
                news.length === 0 &&
                !showEvents && (
                  <EmptyState
                    icon={Newspaper}
                    title={language === 'ar' ? 'لا توجد أخبار متاحة حالياً' : 'No news articles available currently'}
                    subtitle={language === 'ar' ? 'يرجى متابعة هذه الصفحة لمعرفة آخر الأخبار' : 'Please check back later for Alnebras news updates.'}
                  />
                )}

              {showEvents &&
                !loading &&
                events.length === 0 &&
                !showNews && (
                  <EmptyState
                    icon={CalendarDays}
                    title={language === 'ar' ? 'لا توجد فعاليات متاحة حالياً' : 'No events scheduled currently'}
                    subtitle={language === 'ar' ? 'يرجى متابعة هذه الصفحة لمعرفة آخر الفعاليات' : 'Please check back later for upcoming company events.'}
                  />
                )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}