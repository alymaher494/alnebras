'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Calendar, MapPin, CalendarX } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import AnimatedSection from '@/components/shared/AnimatedSection'
import SectionTitle from '@/components/shared/SectionTitle'

interface EventItem {
  id: string
  titleAr: string
  descriptionAr: string | null
  image: string | null
  eventDate: string | null
  locationAr: string | null
}

export default function EventsPage() {
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
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="pt-20 md:pt-24">
      <section className="py-16 md:py-24 bg-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="الفعاليات"
            subtitle="تابع أحدث فعالياتنا ومعارضنا"
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
                  لا توجد فعاليات قادمة
                </p>
                <p className="text-[#6b7280] text-sm mt-2">
                  يرجى متابعة هذه الصفحة لمعرفة آخر الفعاليات
                </p>
              </div>
            </AnimatedSection>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, i) => (
                <AnimatedSection key={event.id} delay={i * 0.1}>
                  <Card className="border-0 shadow-sm card-hover h-full overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={event.image || '/images/facility.jpg'}
                        alt={event.titleAr}
                        fill
                        className="object-cover"
                      />
                      {event.eventDate && (
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
                          <p className="text-xs text-[#6b7280]">التاريخ</p>
                          <p className="text-sm font-bold text-[#012b67]">
                            {new Date(event.eventDate).getDate()}
                          </p>
                          <p className="text-xs text-[#6b7280]">
                            {new Date(event.eventDate).toLocaleDateString('ar-SA', {
                              month: 'short',
                            })}
                          </p>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-[#012b67] mb-3">
                        {event.titleAr}
                      </h3>
                      {event.descriptionAr && (
                        <p className="text-[#6b7280] text-sm leading-relaxed mb-4 line-clamp-3">
                          {event.descriptionAr}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-4 text-[#6b7280] text-sm">
                        {event.eventDate && (
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {formatDate(event.eventDate)}
                          </div>
                        )}
                        {event.locationAr && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {event.locationAr}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}