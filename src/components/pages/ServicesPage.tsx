'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/shared/AnimatedSection'
import SectionTitle from '@/components/shared/SectionTitle'
import { useNavigationStore } from '@/lib/store'
import { useTranslation } from '@/lib/translations'

interface Service {
  id: string
  titleAr: string
  titleEn: string | null
  descriptionAr: string
  descriptionEn: string | null
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
function HeroBanner({ language }: { language: 'ar' | 'en' }) {
  const { t } = useTranslation(language)
  return (
    <section className="relative w-full h-[46vh] min-h-[360px] md:min-h-[420px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/services_hero.png"
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
          {t('services')}
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
            ? 'حلول متكاملة ومتخصصة لإدارة المرافق بأعلى معايير الجودة'
            : 'Integrated and specialized facility management solutions with the highest quality standards'}
        </motion.p>
      </div>
    </section>
  )
}

/* ─── Service Card ─── */
function ServiceCard({ service, index, language }: { service: Service; index: number; language: 'ar' | 'en' }) {
  const imgSrc = service.image || getServiceImage(index)
  const sTitle = language === 'ar' ? service.titleAr : (service.titleEn || service.titleAr)
  const sDesc = language === 'ar' ? service.descriptionAr : (service.descriptionEn || service.descriptionAr)

  return (
    <AnimatedSection delay={index * 0.05}>
      <div className="group card-modern bg-white shadow-sm h-full flex flex-col">
        {/* Image */}
        <div className="relative h-52 overflow-hidden rounded-t-2xl">
          <Image
            src={imgSrc}
            alt={sTitle}
            fill
            className="service-img-zoom object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="img-overlay" />
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-[#012b67] mb-2 leading-snug">
            {sTitle}
          </h3>
          <p className="text-[#6b7280] text-sm leading-relaxed flex-1">
            {sDesc}
          </p>
        </div>
      </div>
    </AnimatedSection>
  )
}

/* ─── Visual Break ─── */
function VisualBreak({ language }: { language: 'ar' | 'en' }) {
  return (
    <section className="relative w-full h-[40vh] min-h-[300px] overflow-hidden">
      {/* Background */}
      <Image
        src="/images/services_hero.png"
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
            {language === 'ar'
              ? 'نقدم حلولاً متكاملة تشمل جميع جوانب إدارة المرافق لضمان أعلى مستويات الأداء'
              : 'We provide integrated solutions covering all aspects of facilities management to ensure the highest levels of performance.'}
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ─── Contracting Teaser ─── */
function ContractingTeaser({ language }: { language: 'ar' | 'en' }) {
  const { t } = useTranslation(language)
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/services/page3_img21.jpg"
          alt="المقاولات العامة"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#012b67]/85" />
      </div>

      {/* Content */}
      <div className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className={`max-w-7xl mx-auto flex ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
          <AnimatedSection className="max-w-lg">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {t('contracting')}
              </h2>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-white/15 text-white border border-white/25 backdrop-blur-sm">
                {language === 'ar' ? 'قريباً' : 'Soon'}
              </span>
            </div>
            <div className="h-[3px] w-20 bg-white/60 rounded-full mb-5" />
            <p className="text-white/80 text-base md:text-lg leading-relaxed">
              {t('contracting_desc')}
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

const contractingServices = [
  {
    id: 'gc-1',
    titleAr: 'الترميم وإعادة التأهيل',
    titleEn: 'Restoration & Rehabilitation',
    descriptionAr: 'نقدم خدمات ترميم متكاملة للمباني والمنشآت القائمة لرفع كفاءتها وإطالة عمرها الافتراضي.',
    descriptionEn: 'We provide integrated restoration services for existing buildings and facilities to increase their efficiency and lifespan.',
    image: '/images/services/page3_img14.jpg'
  },
  {
    id: 'gc-2',
    titleAr: 'التشطيبات والديكور',
    titleEn: 'Finishing & Decoration',
    descriptionAr: 'تنفيذ أعمال التشطيبات الداخلية والخارجية الفاخرة بأعلى معايير الدقة والجمالية.',
    descriptionEn: 'Execution of luxurious interior and exterior finishing works with the highest standards of accuracy and aesthetics.',
    image: '/images/services/page3_img16.jpg'
  },
  {
    id: 'gc-3',
    titleAr: 'الأعمال الإنشائية',
    titleEn: 'Construction Works',
    descriptionAr: 'تنفيذ كافة المشاريع الإنشائية وتشييد المباني السكنية والتجارية تحت إشراف هندسي متكامل.',
    descriptionEn: 'Execution of all construction projects and residential and commercial buildings under integrated engineering supervision.',
    image: '/images/services/page3_img17.jpg'
  },
  {
    id: 'gc-4',
    titleAr: 'العزل المائي والحراري',
    titleEn: 'Water & Thermal Insulation',
    descriptionAr: 'حلول عزل متكاملة لحماية المنشآت من تسربات المياه وتقلبات درجات الحرارة.',
    descriptionEn: 'Integrated insulation solutions to protect facilities from water leaks and temperature fluctuations.',
    image: '/images/services/page3_img9.jpg'
  },
  {
    id: 'gc-5',
    titleAr: 'أعمال الطرق والأسفلت',
    titleEn: 'Roads & Asphalt Works',
    descriptionAr: 'تمهيد وسفلتة الطرق والساحات للمشاريع السكنية والصناعية والتجارية بدقة متناهية.',
    descriptionEn: 'Paving and asphalting roads and yards for residential, industrial, and commercial projects with extreme accuracy.',
    image: '/images/services/page3_img12.jpg'
  },
  {
    id: 'gc-6',
    titleAr: 'الأنظمة الكهروميكانيكية',
    titleEn: 'Electromechanical Systems',
    descriptionAr: 'تصميم وتركيب وصيانة شبكات التكييف والتبريد، والأنظمة الكهربائية والصحية.',
    descriptionEn: 'Design, installation, and maintenance of HVAC networks, electrical, and plumbing systems.',
    image: '/images/services/page3_img21.jpg'
  }
]

/* ═══════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════ */
export default function ServicesPage() {
  const { language } = useNavigationStore()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'fm' | 'gc'>('fm')

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
    <main className="pt-20" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* 1 ── Hero Banner */}
      <HeroBanner language={language} />

      {/* 2 ── Services Tab & Grid */}
      <section className="py-16 md:py-24 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={language === 'ar' ? 'خدماتنا المتنوعة' : 'Our Diverse Services'}
            subtitle={language === 'ar' 
              ? 'حلول متكاملة تضمن تشغيل وصيانة منشآتكم بالإضافة إلى تنفيذ أعمال المقاولات العامة بأعلى معايير الجودة الكفاءة'
              : 'Integrated solutions that ensure the operation and maintenance of your facilities, in addition to general contracting works with the highest standards.'}
          />

          {/* Dynamic Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white border border-[#e5e7eb] p-1.5 rounded-2xl shadow-sm">
              <button
                onClick={() => setActiveTab('fm')}
                className={`px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === 'fm'
                    ? 'bg-[#012b67] text-white shadow-md'
                    : 'text-[#6b7280] hover:text-[#012b67]'
                }`}
              >
                {language === 'ar' ? 'إدارة المرافق والتشغيل' : 'Facilities Management'}
              </button>
              <button
                onClick={() => setActiveTab('gc')}
                className={`px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === 'gc'
                    ? 'bg-[#012b67] text-white shadow-md'
                    : 'text-[#6b7280] hover:text-[#012b67]'
                }`}
              >
                {language === 'ar' ? 'المقاولات العامة والإنشاءات' : 'General Contracting'}
              </button>
            </div>
          </div>

          {activeTab === 'fm' ? (
            loading ? (
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
                    language={language}
                  />
                ))}
              </div>
            )
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {contractingServices.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  service={{
                    id: service.id,
                    titleAr: service.titleAr,
                    titleEn: service.titleEn,
                    descriptionAr: service.descriptionAr,
                    descriptionEn: service.descriptionEn,
                    image: service.image,
                    icon: 'Building2',
                    order: i
                  }}
                  index={i}
                  language={language}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3 ── Visual Break */}
      <VisualBreak language={language} />
    </main>
  )
}