'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Eye,
  Target,
  Award,
  ShieldCheck,
  Users,
  Handshake,
  TrendingUp,
  Lightbulb,
  Leaf,
  CheckCircle2,
  Building2,
  type LucideIcon,
} from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import SectionTitle from '@/components/shared/SectionTitle'
import { useNavigationStore } from '@/lib/store'
import { useTranslation } from '@/lib/translations'

/* ──────────── Types ──────────── */
interface Settings {
  company_name_ar: string
  company_name_en: string
  vision_ar: string
  vision_en: string
  mission_ar: string
  mission_en: string
  goals_ar: string
  goals_en: string
  values_ar: string
  values_en: string
  ceo_message_ar: string
  ceo_message_en: string
  about_text_ar: string
  about_text_en: string
}

/* ──────────── Icon Maps ──────────── */
const valueIconMap: Record<string, LucideIcon> = {
  'الجودة': Award,
  'Quality': Award,
  'السلامة والأمان': ShieldCheck,
  'Safety & Security': ShieldCheck,
  'روح الفريق والتواصل': Users,
  'Teamwork & Communication': Users,
  'النزاهة والالتزام': Handshake,
  'Integrity & Commitment': Handshake,
  'التطوير والتحسين': TrendingUp,
  'Development & Improvement': TrendingUp,
  'التخطيط الاستراتيجي': Target,
  'Strategic Planning': Target,
  'الإبداع والابتكار': Lightbulb,
  'Creativity & Innovation': Lightbulb,
  'الاستدامة': Leaf,
  'Sustainability': Leaf,
}

const valueDescriptionsAr: Record<string, string> = {
  'الجودة': 'نلتزم بأعلى معايير الجودة في جميع خدماتنا وعملياتنا',
  'السلامة والأمان': 'نوفر بيئة عمل آمنة لجميع العاملين والعملاء',
  'روح الفريق والتواصل': 'نؤمن بقوة العمل الجماعي والتواصل الفعال',
  'النزاهة والالتزام': 'نتمسك بأعلى درجات الشفافية والمصداقية',
  'التطوير والتحسين': 'نسعى دائماً للتحسين المستمر في أدائنا',
  'التخطيط الاستراتيجي': 'نعتمد على التخطيط المدروس لتحقيق أهدافنا',
  'الإبداع والابتكار': 'نشجع التفكير الإبداعي في حل المشكلات',
  'الاستدامة': 'نعمل على تحقيق التوازن بين الجودة والبيئة',
}

const valueDescriptionsEn: Record<string, string> = {
  'Quality': 'We commit to the highest quality standards in all our services and operations.',
  'Safety & Security': 'We provide a safe working environment for all employees and clients.',
  'Teamwork & Communication': 'We believe in the power of teamwork and effective communication.',
  'Integrity & Commitment': 'We adhere to the highest degrees of transparency and credibility.',
  'Development & Improvement': 'We always strive for continuous improvement in our performance.',
  'Strategic Planning': 'We rely on thoughtful planning to achieve our goals.',
  'Creativity & Innovation': 'We encourage creative thinking in solving problems.',
  'Sustainability': 'We work to achieve a balance between quality and environment.',
}

/* ──────────── Certifications ──────────── */
const certifications = [
  { name: 'BICSc', labelAr: 'معهد التنظيف البريطاني', labelEn: 'British Institute of Cleaning Science', logo: '/images/certificate/WhatsApp Image 2026-05-13 at 12.19.30 PM.jpeg' },
  { name: 'ISO 9001', labelAr: 'إدارة الجودة', labelEn: 'Quality Management', logo: '/images/certificate/WhatsApp Image 2026-05-13 at 12.20.22 PM (1).jpeg' },
  { name: 'ISO 14001', labelAr: 'إدارة البيئة', labelEn: 'Environmental Management', logo: '/images/certificate/WhatsApp Image 2026-05-13 at 12.20.22 PM (2).jpeg' },
  { name: 'ISO 45001', labelAr: 'الصحة والسلامة المهنية', labelEn: 'Occupational Health & Safety', logo: '/images/certificate/WhatsApp Image 2026-05-13 at 12.27.33 PM.jpeg' },
]

/* ──────────── Gallery Images ──────────── */
const galleryImages = [
  '/images/gallery/page4_img10.jpg',
  '/images/gallery/page5_img20.jpg',
  '/images/gallery/page5_img4.jpg',
  '/images/gallery/page6_img1.jpg',
  '/images/gallery/page6_img2.jpg',
]

/* ──────────── Component ──────────── */
export default function AboutPage() {
  const { language } = useNavigationStore()
  const { t } = useTranslation(language)
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        setSettings(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const values = language === 'ar'
    ? (settings?.values_ar?.split('|').map((v) => v.trim()).filter(Boolean) || [])
    : (settings?.values_en?.split('|').map((v) => v.trim()).filter(Boolean) || [])
    
  const goals = language === 'ar'
    ? (settings?.goals_ar?.split('|').map((g) => g.trim()).filter(Boolean) || [])
    : (settings?.goals_en?.split('|').map((g) => g.trim()).filter(Boolean) || [])

  const fallbackGoals = language === 'ar'
    ? [
        'تطوير خدمات إدارة المرافق وفق أعلى المعايير الدولية',
        'بناء فريق عمل مؤهل ومدرب على أحدث التقنيات',
        'توسيع نطاق أعمالنا لتغطية مختلف مناطق المملكة',
        'تعزيز الشراكات الاستراتيجية مع العملاء والموردين',
        'تحقيق الاستدامة المالية والبيئية في عملياتنا',
      ]
    : [
        'Develop facilities management services in accordance with the highest international standards.',
        'Build a qualified team trained in the latest technologies.',
        'Expand our business scope to cover various regions of the Kingdom.',
        'Enhance strategic partnerships with clients and suppliers.',
        'Achieve financial and environmental sustainability in our operations.',
      ]

  return (
    <div className="pt-20" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* ══════════════════════════════════════════
          1. PAGE HERO BANNER
      ══════════════════════════════════════════ */}
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/about_hero.png"
          alt="من نحن - النبراس لإدارة المرافق"
          fill
          className="object-cover scale-105"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[rgba(1,43,103,0.7)]" />
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.4) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.4) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
          >
            {t('about')}
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-[3px] bg-gradient-to-l from-white/90 to-white/40 mx-auto rounded-full"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-[#d1ddeb] mt-6 max-w-xl mx-auto leading-relaxed"
          >
            {language === 'ar' ? 'تعرف على النبراس لإدارة المرافق' : 'Get to know Alnebras Facilities Management'}
          </motion.p>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ══════════════════════════════════════════
          2. COMPANY OVERVIEW
      ══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Image Grid with Offset */}
            <AnimatedSection>
              <div className="relative">
                {/* Top Image */}
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/about/page1_img1.jpg"
                    alt="النبراس - إدارة المرافق"
                    width={600}
                    height={400}
                    className="w-full h-[280px] md:h-[360px] object-cover"
                  />
                </div>
                {/* Bottom Image - Offset */}
                <div className={`relative z-20 -mt-16 rounded-2xl overflow-hidden shadow-xl border-4 border-white ${language === 'ar' ? 'mr-8 md:mr-16' : 'ml-8 md:ml-16'}`}>
                  <Image
                    src="/images/about/page1_img2.jpg"
                    alt="فريق النبراس"
                    width={400}
                    height={260}
                    className="w-full h-[180px] md:h-[240px] object-cover"
                  />
                </div>
                {/* Decorative background */}
                <div className="absolute top-8 right-8 w-full h-full bg-[#e8eef5] rounded-2xl -z-10 hidden lg:block" />
              </div>
            </AnimatedSection>

            {/* Right: Company Description */}
            <AnimatedSection delay={0.2}>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#012b67] mb-4">
                  {loading ? '' : (language === 'ar' ? settings?.company_name_ar : settings?.company_name_en) || 'النبراس لإدارة المرافق'}
                </h2>
                <div className="accent-line mb-6" />
                <p className="text-[#374151] text-base md:text-lg leading-[2] mb-6">
                  {loading
                    ? ''
                    : (language === 'ar' ? settings?.about_text_ar : settings?.about_text_en) ||
                      'شركة وطنية رائدة متخصصة في إدارة المرافق وعملياتها وصيانتها. نقدم حلولاً متكاملة تمزج بين الخبرة المحلية والمعايير الدولية لضمان تحقيق أعلى مستويات الكفاءة والجودة في إدارة المنشآت.'}
                </p>
                <p className="text-[#374151] text-base md:text-lg leading-[2]">
                  {language === 'ar'
                    ? 'نعمل على تقديم خدمات شاملة تغطي كافة جوانب إدارة المرافق بدءاً من الصيانة والتنظيف وصولاً إلى إدارة الطاقة والأمن والسلامة، مع الالتزام بأعلى معايير الجودة والاستدامة البيئية.'
                    : 'We work to provide comprehensive services covering all aspects of facilities management, from maintenance and cleaning to energy management, security, and safety, with commitment to the highest quality and environmental sustainability standards.'}
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Certification Badges */}
          <AnimatedSection delay={0.3}>
            <div className="mt-16 md:mt-20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="card-modern bg-white border border-[#e5e7eb] rounded-xl p-5 text-center"
                  >
                    <div className="relative w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                      <Image
                        src={cert.logo}
                        alt={cert.name}
                        fill
                        className="object-contain"
                        sizes="96px"
                      />
                    </div>
                    <p className="text-[#012b67] font-bold text-sm mb-1">{cert.name}</p>
                    <p className="text-[#6b7280] text-xs leading-relaxed">{language === 'ar' ? cert.labelAr : cert.labelEn}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. VISION & MISSION
      ══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={language === 'ar' ? 'رؤيتنا ورسالتنا' : 'Our Vision & Mission'}
            subtitle={language === 'ar' ? 'نحو مستقبل أفضل لإدارة المرافق في المملكة' : 'Towards a better future for facility management in the Kingdom'}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Vision Card */}
            <AnimatedSection>
              <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 h-full card-modern border border-[#e5e7eb]/50">
                <div className="w-16 h-16 bg-[#e8eef5] rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-[#012b67]" />
                </div>
                <h3 className="text-2xl font-bold text-[#012b67] mb-4">{t('vision')}</h3>
                <div className="accent-line mb-5" />
                <p className="text-[#374151] text-base md:text-lg leading-[2]">
                  {loading
                    ? ''
                    : (language === 'ar' ? settings?.vision_ar : settings?.vision_en) ||
                      'أن نكون الخيار الأول والموثوق لإدارة المرافق على مستوى المملكة العربية السعودية، ونساهم في رفع معايير الجودة والكفاءة في هذا القطاع الحيوي.'}
                </p>
              </div>
            </AnimatedSection>

            {/* Mission Card */}
            <AnimatedSection delay={0.15}>
              <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 h-full card-modern border border-[#e5e7eb]/50">
                <div className="w-16 h-16 bg-[#e8eef5] rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-[#012b67]" />
                </div>
                <h3 className="text-2xl font-bold text-[#012b67] mb-4">{t('mission')}</h3>
                <div className="accent-line mb-5" />
                <p className="text-[#374151] text-base md:text-lg leading-[2]">
                  {loading
                    ? ''
                    : (language === 'ar' ? settings?.mission_ar : settings?.mission_en) ||
                      'تقديم خدمات إدارة مرافق متكاملة ومبتكرة تتجاوز توقعات عملائنا، من خلال فريق عمل محترف وشراكات استراتيجية فعالة، مع الالتزام بأعلى معايير الجودة والسلامة والاستدامة.'}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. GOALS / OBJECTIVES
      ══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Goals Content */}
            <div className="lg:col-span-3">
              <SectionTitle
                title={t('goals')}
                subtitle={language === 'ar' ? 'نسعى لتحقيق أهداف استراتيجية تدفع عجلة التميز والابتكار' : 'We seek to achieve strategic goals that drive excellence and innovation.'}
                align="start"
              />
              <div className="space-y-5">
                {(goals.length > 0 ? goals : fallbackGoals).map((goal, i) => (
                  <AnimatedSection key={i} delay={i * 0.08}>
                    <div className="flex items-start gap-4 p-4 bg-[#f9fafb] rounded-xl border border-[#e5e7eb]/60 hover:border-[#012b67]/20 transition-colors duration-300">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#012b67] rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {i + 1}
                      </div>
                      <p className="text-[#374151] leading-[1.9] pt-1.5">{goal}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            {/* Side Image */}
            <div className="lg:col-span-2">
              <AnimatedSection delay={0.3}>
                <div className="relative rounded-2xl overflow-hidden shadow-xl sticky top-28">
                  <Image
                    src="/images/gallery/page5_img4.jpg"
                    alt="أهداف النبراس"
                    width={500}
                    height={650}
                    className="w-full h-[400px] md:h-[550px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#012b67]/50 to-transparent" />
                  <div className="absolute bottom-6 right-6 left-6">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <Building2 className="w-6 h-6 text-[#012b67]" />
                        <h4 className="text-[#012b67] font-bold text-lg">
                          {loading ? '' : (language === 'ar' ? settings?.company_name_ar : settings?.company_name_en) || 'النبراس'}
                        </h4>
                      </div>
                      <p className="text-[#6b7280] text-sm leading-relaxed">
                        {language === 'ar' ? 'نلتزم بالتميز في كل خطوة نخطوها نحو تحقيق رؤيتنا' : 'We commit to excellence in every step we take towards achieving our vision'}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. VALUES
      ══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={t('values')}
            subtitle={language === 'ar' ? 'المبادئ التي نلتزم بها وتوجه كل ما نقوم به' : 'The principles we adhere to that guide everything we do'}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {(values.length > 0 ? values : [
              'الجودة',
              'السلامة والأمان',
              'روح الفريق والتواصل',
              'النزاهة والالتزام',
              'التطوير والتحسين',
              'التخطيط الاستراتيجي',
              'الإبداع والابتكار',
              'الاستدامة',
            ]).map((value, i) => {
              const IconComponent = valueIconMap[value] || Award
              const desc = language === 'ar' 
                ? (valueDescriptionsAr[value] || 'قيمة أساسية نلتزم بها في جميع عملياتنا')
                : (valueDescriptionsEn[value] || 'A core value we commit to in all our operations')
              return (
                <AnimatedSection key={i} delay={i * 0.06}>
                  <div className="card-modern bg-white rounded-2xl p-6 md:p-7 text-center border border-[#e5e7eb]/50 h-full group">
                    <div className="w-14 h-14 bg-[#e8eef5] group-hover:bg-[#012b67] rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors duration-300">
                      <IconComponent className="w-7 h-7 text-[#012b67] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h4 className="text-base md:text-lg font-bold text-[#012b67] mb-2">
                      {value}
                    </h4>
                    <p className="text-[#6b7280] text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. PHOTO GALLERY STRIP
      ══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={language === 'ar' ? 'معرض صور الشركة' : 'Company Photo Gallery'}
            subtitle={language === 'ar' ? 'لمحة من أعمالنا ومنشآتنا التي نديرها' : 'A glimpse of our work and the facilities we manage'}
          />
        </div>
        {/* Horizontal Scrollable Row */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 md:gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-w-max">
            {galleryImages.map((img, i) => (
              <AnimatedSection key={i} delay={i * 0.06}>
                <div className="relative group w-[280px] md:w-[320px] h-[200px] md:h-[240px] flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer">
                  <Image
                    src={img}
                    alt={`صورة من أعمال النبراس ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#012b67]/0 group-hover:bg-[#012b67]/20 transition-colors duration-500 rounded-2xl" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 flex items-center justify-center gap-2 text-[#6b7280] text-sm">
          <svg className={`w-4 h-4 ${language === 'en' ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          <span>{language === 'ar' ? 'اسحب لعرض المزيد' : 'Swipe to view more'}</span>
          <svg className={`w-4 h-4 ${language === 'en' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. CEO MESSAGE
      ══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-[#012b67]">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.5) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* CEO Image Column */}
            <div className="lg:col-span-4 flex justify-center order-first lg:order-last">
              <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-white/20 group">
                <Image
                  src="/images/ceo.jpg"
                  alt={t('ceo_title')}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 320px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#012b67]/40 via-transparent to-transparent" />
              </div>
            </div>

            {/* CEO Message Column */}
            <div className={`lg:col-span-8 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <AnimatedSection>
                {/* Decorative Quote Mark */}
                <div className="mb-4">
                  <span className="text-[80px] md:text-[100px] leading-none font-serif text-white/20 select-none block -mb-10">
                    &ldquo;
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  {t('ceo_message')}
                </h2>
                <div className={`accent-line accent-line-white mb-6 ${language === 'ar' ? 'mr-0' : 'ml-0'}`} />

                <p className="text-white/90 text-base md:text-lg leading-[2.1] mb-8">
                  {loading
                    ? ''
                    : (language === 'ar' ? settings?.ceo_message_ar : settings?.ceo_message_en) ||
                      'في النبراس لإدارة المرافق، نؤمن بأن رضا عملائنا هو مقياس نجاحنا الحقيقي. نلتزم بتقديم خدمات عالية الجودة تجمع بين الكفاءة المهنية والابتكار المستمر، ونسعى لأن نكون الشريك الأمثل في إدارة منشآتكم وضمان استمرارية أعمالكم بأعلى المعايير.'}
                </p>

                {/* Divider */}
                <div className="w-16 h-[2px] bg-white/30 mb-6" />

                <div>
                  <p className="text-white font-bold text-xl">
                    {language === 'ar' ? 'م. محمد المقبلي' : 'Eng. Mohammed Almogbly'}
                  </p>
                  <p className="text-white/60 text-sm mt-1">
                    {t('ceo_title')} | {loading ? '' : (language === 'ar' ? settings?.company_name_ar : settings?.company_name_en) || 'النبراس لإدارة المرافق'}
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}