'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Calendar, MapPin, CalendarX } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import AnimatedSection from '@/components/shared/AnimatedSection'
import SectionTitle from '@/components/shared/SectionTitle'
import { useNavigationStore } from '@/lib/store'
import { useTranslation } from '@/lib/translations'

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

export default function EventsPage() {
  const { language } = useNavigationStore()
  const { t } = useTranslation(language)
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => {
        setEvents(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="pt-20 md:pt-24" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <section className="py-16 md:py-24 bg-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={t('events')}
            subtitle={language === 'ar' ? 'تابع أحدث فعالياتنا ومعارضنا' : 'Follow our latest events and exhibitions.'}
          />

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-80 bg-[#f3f4f6] rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : events.length === 0 ? (
            <AnimatedSection>
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-[#e8eef5] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CalendarX className="w-10 h-10 text-[#012b67]" />
                </div>
                <p className="text-[#6b7280] text-lg">
                  {language === 'ar' ? 'لا توجد فعاليات قادمة' : 'No upcoming events'}
                </p>
                <p className="text-[#6b7280] text-sm mt-2">
                  {language === 'ar' ? 'يرجى متابعة هذه الصفحة لمعرفة آخر الفعاليات' : 'Please watch this page for future Alnebras events.'}
                </p>
              </div>
            </AnimatedSection>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, i) => {
                const eTitle = language === 'ar' ? event.titleAr : (event.titleEn || event.titleAr)
                const eDesc = language === 'ar' ? event.descriptionAr : (event.descriptionEn || event.descriptionAr)
                const eLoc = language === 'ar' ? event.locationAr : (event.locationEn || event.locationAr)
                return (
                  <AnimatedSection key={event.id} delay={i * 0.1}>
                    <Card className="border-0 shadow-sm card-hover h-full overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={event.image || '/images/facility.jpg'}
                          alt={eTitle}
                          fill
                          className="object-cover"
                        />
                        {event.eventDate && (
                          <div className={`absolute top-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-center ${language === 'ar' ? 'right-4' : 'left-4'}`}>
                            <p className="text-xs text-[#6b7280]">{language === 'ar' ? 'التاريخ' : 'Date'}</p>
                            <p className="text-sm font-bold text-[#012b67]">
                              {new Date(event.eventDate).getDate()}
                            </p>
                            <p className="text-xs text-[#6b7280]">
                              {new Date(event.eventDate).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
                                month: 'short',
                              })}
                            </p>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-[#012b67] mb-3">
                          {eTitle}
                        </h3>
                        {eDesc && (
                          <p className="text-[#6b7280] text-sm leading-relaxed mb-4 line-clamp-3">
                            {eDesc}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-4 text-[#6b7280] text-sm">
                          {event.eventDate && (
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              {formatDate(event.eventDate)}
                            </div>
                          )}
                          {eLoc && (
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4" />
                              {eLoc}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}