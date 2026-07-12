'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
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

/* Available service image numbers (from /images/services/) */
const SERVICE_IMG_NUMBERS = [3, 4, 5, 7, 9, 10, 12, 14, 16, 17, 18, 19, 21, 23, 24]

function getServiceImage(index: number): string {
  const num = SERVICE_IMG_NUMBERS[index % SERVICE_IMG_NUMBERS.length]
  return `/images/services/page3_img${num}.jpg`
}

/* ─── Loading Skeleton ─── */
function ServiceSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="h-52 bg-[#f3f4f6] animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-3/4 bg-[#f3f4f6] rounded animate-pulse" />
        <div className="h-4 w-full bg-[#f3f4f6] rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-[#f3f4f6] rounded animate-pulse" />
      </div>
    </div>
  )
}

/* ─── Hero Banner ─── */
function HeroBanner() {
  return (
    <section className="relative w-full h-[46vh] min-h-[360px] md:min-h-[420px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/gallery/page6_img6.jpg"
        alt="إدارة المرافق"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#012b67]/70" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5"
        >
          إدارة المرافق
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
          حلول متكاملة ومتخصصة لإدارة المرافق بأعلى معايير الجودة
        </motion.p>
      </div>
    </section>
  )
}

/* ─── Service Card ─── */
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const imgSrc = getServiceImage(index)

  return (
    <AnimatedSection delay={index * 0.05}>
      <div className="group card-modern bg-white shadow-sm h-full flex flex-col">
        {/* Image */}
        <div className="relative h-52 overflow-hidden rounded-t-2xl">
          <Image
            src={imgSrc}
            alt={service.titleAr}
            fill
            className="service-img-zoom object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="img-overlay" />
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-[#012b67] mb-2 leading-snug">
            {service.titleAr}
          </h3>
          <p className="text-[#6b7280] text-sm leading-relaxed flex-1">
            {service.descriptionAr}
          </p>
        </div>
      </div>
    </AnimatedSection>
  )
}

/* ─── Visual Break ─── */
function VisualBreak() {
  return (
    <section className="relative w-full h-[40vh] min-h-[300px] overflow-hidden">
      {/* Background */}
      <Image
        src="/images/gallery/page7_img1.jpg"
        alt="حلول متكاملة لإدارة المرافق"
        fill
        className="object-cover"
        sizes="100vw"
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#012b67]/75" />

      {/* Text */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <AnimatedSection className="max-w-3xl text-center">
          <p className="text-white text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed">
            نقدم حلولاً متكاملة تشمل جميع جوانب إدارة المرافق لضمان أعلى مستويات الأداء
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ─── Contracting Teaser ─── */
function ContractingTeaser() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/gallery/page5_img21.jpg"
          alt="المقاولات العامة"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#012b67]/85" />
      </div>

      {/* Content */}
      <div className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-end">
          <AnimatedSection className="max-w-lg">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                المقاولات العامة
              </h2>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-white/15 text-white border border-white/25 backdrop-blur-sm">
                قريباً
              </span>
            </div>
            <div className="h-[3px] w-20 bg-white/60 rounded-full mb-5" />
            <p className="text-white/80 text-base md:text-lg leading-relaxed">
              نعمل على تطوير قسم المقاولات العامة لتقديم خدمات متكاملة تشمل
              الأعمال الإنشائية والتشطيبات والمشاريع الكبرى. تابعونا لمعرفة
              آخر التحديثات.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════ */
export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        setServices(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <main className="pt-20">
      {/* 1 ── Hero Banner */}
      <HeroBanner />

      {/* 2 ── Services Grid */}
      <section className="py-16 md:py-24 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="خدماتنا المتخصصة"
            subtitle="نقدم مجموعة شاملة من خدمات إدارة المرافق المصممة لتلبية احتياجات عملائنا بأعلى معايير الجودة"
          />

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <ServiceSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3 ── Visual Break */}
      <VisualBreak />

      {/* 4 ── Contracting Teaser */}
      <ContractingTeaser />
    </main>
  )
}