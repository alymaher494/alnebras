'use client'

import { useEffect, useState } from 'react'
import {
  Sparkles,
  Users,
  TreePine,
  Bug,
  Building2,
  Zap,
  Wind,
  Droplets,
  Shield,
  Waves,
  Camera,
  Thermometer,
  Paintbrush,
  Hammer,
  SprayCan,
  type LucideIcon,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import AnimatedSection from '@/components/shared/AnimatedSection'
import SectionTitle from '@/components/shared/SectionTitle'

interface Service {
  id: string
  titleAr: string
  descriptionAr: string
  icon: string
  order: number
  image: string | null
}

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Users,
  TreePine,
  Bug,
  Building2,
  Zap,
  Wind,
  Droplets,
  Shield,
  Waves,
  Camera,
  Thermometer,
  Paintbrush,
  Hammer,
  SprayCan,
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        setServices(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="pt-20 md:pt-24">
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="إدارة المرافق"
            subtitle="نقدم مجموعة شاملة من خدمات إدارة المرافق المصممة لتلبية احتياجات عملائنا بأعلى معايير الجودة"
          />

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="h-52 bg-[#f3f4f6] rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service, i) => {
                const IconComponent = iconMap[service.icon]
                return (
                  <AnimatedSection key={service.id} delay={i * 0.04}>
                    <Card className="border-0 shadow-sm card-hover h-full">
                      <CardContent className="p-6">
                        <div className="w-14 h-14 bg-[#e8eef5] rounded-xl flex items-center justify-center mb-5">
                          {IconComponent ? (
                            <IconComponent className="w-7 h-7 text-[#012b67]" />
                          ) : (
                            <Sparkles className="w-7 h-7 text-[#012b67]" />
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-[#012b67] mb-3">
                          {service.titleAr}
                        </h3>
                        <p className="text-[#6b7280] text-sm leading-relaxed">
                          {service.descriptionAr}
                        </p>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                )
              })}
            </div>
          )}

          {/* Contracting teaser */}
          <AnimatedSection className="mt-16">
            <Card className="border-2 border-dashed border-[#012b67]/20 bg-[#f9fafb]">
              <CardContent className="p-8 md:p-12 text-center">
                <h3 className="text-2xl font-bold text-[#012b67] mb-3">
                  المقاولات العامة
                </h3>
                <p className="text-[#6b7280] text-base max-w-xl mx-auto">
                  سيتم إضافة خدمات المقاولات العامة قريباً. تابعونا لمعرفة
                  أحدث التطورات في خدماتنا المتنوعة.
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}