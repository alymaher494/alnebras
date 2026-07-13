'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Award,
  ShieldCheck,
  Users,
  Handshake,
  TrendingUp,
  Target,
  Lightbulb,
  Leaf,
  MapPin,
  Phone,
  Mail,
  Eye,
  ChevronDown,
  Calendar,
  Building2,
  Quote,
  type LucideIcon,
} from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import SectionTitle from '@/components/shared/SectionTitle'
import { useNavigationStore } from '@/lib/store'

import { useTranslation } from '@/lib/translations'

/* ──────────────────────── Types ──────────────────────── */
interface Settings {
  company_name_ar: string
  company_name_en: string
  vision_ar: string
  vision_en: string
  mission_ar: string
  mission_en: string
  values_ar: string
  values_en: string
  ceo_message_ar: string
  ceo_message_en: string
  hero_title_ar: string
  hero_title_en: string
  hero_subtitle_ar: string
  hero_subtitle_en: string
  about_text_ar: string
  about_text_en: string
}

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

interface Partner {
  id: string
  name: string
  logo: string | null
  order: number
}

interface Branch {
  id: string
  countryAr: string
  country: string
  cityAr: string
  city: string
  addressAr: string
  address: string
  phone: string | null
  email: string | null
  image: string | null
  descriptionAr: string | null
  description: string | null
}

/* ──────────────────────── Icon Maps ──────────────────────── */
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

const fallbackServiceImages = [
  '/images/services/page3_img3.jpg',
  '/images/services/page3_img4.jpg',
  '/images/services/page3_img5.jpg',
  '/images/services/page3_img7.jpg',
  '/images/services/page3_img9.jpg',
  '/images/services/page3_img10.jpg',
  '/images/services/page3_img12.jpg',
  '/images/services/page3_img14.jpg',
]

const stats = [
  { labelKey: 'years_experience', value: '15+', icon: Calendar },
  { labelKey: 'completed_projects', value: '200+', icon: Building2 },
  { labelKey: 'satisfied_clients', value: '150+', icon: Users },
  { labelKey: 'branches', value: '2', icon: MapPin },
]

/* ──────────────────────── Component ──────────────────────── */
export default function HomePage() {
  const { setCurrentPage, language } = useNavigationStore()
  const { t } = useTranslation(language)
  const [settings, setSettings] = useState<Settings | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [partners, setPartners] = useState<Partner[]>([])
  const [branches, setBranches] = useState<Branch[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [settingsRes, servicesRes, partnersRes, branchesRes] =
          await Promise.all([
            fetch('/api/settings'),
            fetch('/api/services'),
            fetch('/api/partners'),
            fetch('/api/branches'),
          ])
        const [settingsData, servicesData, partnersData, branchesData] =
          await Promise.all([
            settingsRes.json(),
            servicesRes.json(),
            partnersRes.json(),
            branchesRes.json(),
          ])
        setSettings(settingsData && !settingsData.error ? settingsData : null)
        setServices(Array.isArray(servicesData) ? servicesData : [])
        setPartners(Array.isArray(partnersData) ? partnersData : [])
        setBranches(Array.isArray(branchesData) ? branchesData : [])
      } catch (err) {
        console.error('Failed to fetch data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const values = language === 'ar'
    ? (settings?.values_ar?.split('|') || [])
    : (settings?.values_en?.split('|') || [])

  const heroTitle = !loading
    ? (language === 'ar' ? (settings?.hero_title_ar || 'حلول ذكية لإدارة المرافق') : (settings?.hero_title_en || 'Smart Facilities Management Solutions'))
    : ''

  const heroSubtitle = !loading
    ? (language === 'ar' 
        ? (settings?.hero_subtitle_ar || 'نرفع كفاءة منشأتك ونضمن استمرارية أعمالك بأعلى معايير الجودة والاحترافية')
        : (settings?.hero_subtitle_en || 'We elevate the efficiency of your facility and ensure your business continuity with the highest standards of quality and professionalism.'))
    : ''

  return (
    <>
      {/* ════════════════════════════════════════════════════
          1. VIDEO HERO SECTION
          ════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/video/poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 hero-overlay" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            {heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: 'easeOut' }}
            className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: 'easeOut' }}
          >
            <button
              onClick={() => setCurrentPage('services')}
              className="inline-flex items-center gap-3 bg-white text-[#012b67] font-semibold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:bg-[#f0f4f8] hover:scale-[1.03] active:scale-[0.98]"
            >
              {t('discover_services')}
              <ArrowLeft className={`h-5 w-5 ${language === 'en' ? 'rotate-180' : ''}`} />
            </button>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-white/60 text-sm tracking-wide">{t('discover_more')}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-6 h-6 text-white/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════
          2. STATS BAR
          ════════════════════════════════════════════════════ */}
      <section className="bg-[#012b67] py-6 sm:py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/15">
            {stats.map((stat, i) => {
              const IconComp = stat.icon
              return (
                <AnimatedSection
                  key={i}
                  delay={i * 0.1}
                  className="flex items-center justify-center gap-3 md:gap-4 py-2 md:px-6"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <IconComp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="text-white/60 text-xs sm:text-sm">{t(stat.labelKey as any)}</p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          3. ABOUT PREVIEW
          ════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Side */}
            <AnimatedSection>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/about/page1_img1.jpg"
                    alt={language === 'ar' ? (settings?.company_name_ar || 'النبراس لإدارة المرافق') : (settings?.company_name_en || 'Alnebras Facilities Management')}
                    width={700}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                </div>
                {/* Decorative accent */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b-4 border-r-4 border-[#012b67]/20 rounded-br-3xl hidden lg:block" />
                <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-[#012b67]/20 rounded-tl-3xl hidden lg:block" />
              </div>
            </AnimatedSection>

            {/* Text Side */}
            <AnimatedSection delay={0.2}>
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#012b67] mb-3 leading-tight">
                  {language === 'ar' ? (settings?.company_name_ar || 'النبراس لإدارة المرافق') : (settings?.company_name_en || 'Alnebras Facilities Management')}
                </h2>
                <div className="accent-line mb-6" />
                <p className="text-[#374151] text-base md:text-lg leading-[2] mb-8">
                  {loading
                    ? ''
                    : (language === 'ar' ? settings?.about_text_ar : settings?.about_text_en) ||
                      'شركة وطنية رائدة متخصصة في إدارة المرافق وعملياتها وصيانتها بأعلى معايير الجودة والاحترافية في المملكة العربية السعودية وجمهورية مصر العربية.'}
                </p>
                <button
                  onClick={() => setCurrentPage('about')}
                  className="inline-flex items-center gap-2 bg-[#012b67] text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 hover:bg-[#011d47] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                >
                  {t('read_more')}
                  <ArrowLeft className={`h-4 w-4 ${language === 'en' ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          4. SERVICES SHOWCASE
          ════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={t('our_services')}
            subtitle={t('our_services_subtitle')}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {services.slice(0, 8).map((service, i) => {
              const imgSrc =
                service.image ||
                fallbackServiceImages[i % fallbackServiceImages.length]
              const sTitle = language === 'ar' ? service.titleAr : (service.titleEn || service.titleAr)
              const sDesc = language === 'ar' ? service.descriptionAr : (service.descriptionEn || service.descriptionAr)
              return (
                <AnimatedSection key={service.id} delay={i * 0.06}>
                  <div className="group card-modern bg-white h-full flex flex-col cursor-pointer">
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <Image
                        src={imgSrc}
                        alt={sTitle}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover service-img-zoom"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#012b67]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    {/* Text */}
                    <div className="p-4 md:p-5 flex-1 flex flex-col">
                      <h3 className="text-sm md:text-base font-bold text-[#012b67] mb-2 line-clamp-1">
                        {sTitle}
                      </h3>
                      <p className="text-[#6b7280] text-xs md:text-sm leading-relaxed line-clamp-3 flex-1">
                        {sDesc}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>

          <AnimatedSection className="text-center mt-12">
            <button
              onClick={() => setCurrentPage('services')}
              className="inline-flex items-center gap-2 border-2 border-[#012b67] text-[#012b67] font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 hover:bg-[#012b67] hover:text-white hover:shadow-lg"
            >
              {t('view_all_services')}
              <ArrowLeft className={`h-4 w-4 ${language === 'en' ? 'rotate-180' : ''}`} />
            </button>
          </AnimatedSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          5. FULL-WIDTH VISUAL BREAK
          ════════════════════════════════════════════════════ */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden parallax-section"
        style={{ backgroundImage: "url('/images/gallery/page5_img1.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#012b67]/75" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <Quote className="w-12 h-12 text-white/30 mx-auto mb-6" />
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-[1.7]">
              {language === 'ar'
                ? 'نؤمن بأن إدارة المرافق ليست مجرد خدمة، بل شراكة حقيقية نحو التميز'
                : 'We believe that facilities management is not just a service, but a true partnership towards excellence.'}
            </p>
            <div className="accent-line accent-line-white mt-8 mx-auto" />
          </AnimatedSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          6. VISION & MISSION
          ════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title={language === 'ar' ? 'رؤيتنا ورسالتنا' : 'Our Vision & Mission'} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {/* Vision */}
            <AnimatedSection>
              <div className="card-modern bg-[#f9fafb] p-8 md:p-10 h-full">
                <div className="w-16 h-16 bg-[#012b67] rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#012b67] mb-4">
                  {t('vision')}
                </h3>
                <p className="text-[#374151] text-base md:text-lg leading-[2]">
                  {loading
                    ? ''
                    : (language === 'ar' ? settings?.vision_ar : settings?.vision_en) ||
                      'أن نكون الخيار الأول والأكثر ثقة في مجال إدارة المرافق على مستوى المملكة والمنطقة'}
                </p>
              </div>
            </AnimatedSection>

            {/* Mission */}
            <AnimatedSection delay={0.15}>
              <div className="card-modern bg-[#012b67] p-8 md:p-10 h-full">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                  {t('mission')}
                </h3>
                <p className="text-white/80 text-base md:text-lg leading-[2]">
                  {loading
                    ? ''
                    : (language === 'ar' ? settings?.mission_ar : settings?.mission_en) ||
                      'تقديم حلول إدارة مرافق متكاملة ومبتكرة تتجاوز توقعات عملائنا وتساهم في بناء بيئة عمل مستدامة'}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          7. VALUES
          ════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={t('values')}
            subtitle={language === 'ar' ? 'القيم الأساسية التي توجه أعمالنا وتعكس التزامنا بالتميز' : 'Core values that guide our actions and reflect our commitment to excellence'}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {values.map((value, i) => {
              const trimmed = value.trim()
              const IconComponent = valueIconMap[trimmed]
              return (
                <AnimatedSection key={i} delay={i * 0.06}>
                  <div className="group card-modern bg-white p-6 md:p-8 text-center h-full">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-[#e8eef5] group-hover:bg-[#012b67] rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors duration-300">
                      {IconComponent ? (
                        <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-[#012b67] group-hover:text-white transition-colors duration-300" />
                      ) : (
                        <Award className="w-7 h-7 md:w-8 md:h-8 text-[#012b67] group-hover:text-white transition-colors duration-300" />
                      )}
                    </div>
                    <h4 className="text-sm md:text-base font-semibold text-[#012b67] leading-relaxed">
                      {trimmed}
                    </h4>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          8. BRANCHES
          ════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t('branches_title')} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {branches.map((branch, i) => {
              const branchImg =
                branch.image ||
                (i === 0
                  ? '/images/gallery/page4_img1.jpg'
                  : '/images/gallery/page6_img1.jpg')
              const bCity = language === 'ar' ? branch.cityAr : branch.city
              const bAddress = language === 'ar' ? branch.addressAr : branch.address
              return (
                <AnimatedSection key={branch.id} delay={i * 0.15}>
                  <div className="group relative min-h-[380px] md:min-h-[440px] rounded-2xl overflow-hidden cursor-pointer">
                    {/* Background Image */}
                    <Image
                      src={branchImg}
                      alt={bCity}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#012b67]/90 via-[#012b67]/40 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        {bCity}
                      </h3>
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-white/70 flex-shrink-0" />
                          <p className="text-white/85 text-sm leading-relaxed">
                            {bAddress}
                          </p>
                        </div>
                        {branch.phone && (
                          <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-white/70 flex-shrink-0" />
                            <p className="text-white/85 text-sm" dir="ltr">
                              {branch.phone}
                            </p>
                          </div>
                        )}
                        {branch.email && (
                          <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-white/70 flex-shrink-0" />
                            <p className="text-white/85 text-sm">
                              {branch.email}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          9. PARTNERS MARQUEE
          ════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#f9fafb] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t('partners')} />
        </div>

        {partners.length > 0 && (
          <div className="relative mt-4">
            {/* Fade edges */}
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#f9fafb] to-transparent z-10 pointer-events-none" />
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#f9fafb] to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee" style={{ width: 'max-content' }}>
              {/* Original set */}
              {partners.map((partner) => (
                <div
                  key={`a-${partner.id}`}
                  className="flex-shrink-0 mx-4 md:mx-6"
                >
                  <div className="w-36 h-24 md:w-44 md:h-28 bg-white rounded-xl border border-[#e5e7eb] flex items-center justify-center p-4 transition-all duration-300 hover:shadow-md hover:border-[#012b67]/20">
                    <Image
                      src={partner.logo || '/logo.png'}
                      alt={partner.name}
                      width={120}
                      height={50}
                      className="max-h-12 w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
              {/* Duplicate for infinite scroll */}
              {partners.map((partner) => (
                <div
                  key={`b-${partner.id}`}
                  className="flex-shrink-0 mx-4 md:mx-6"
                >
                  <div className="w-36 h-24 md:w-44 md:h-28 bg-white rounded-xl border border-[#e5e7eb] flex items-center justify-center p-4 transition-all duration-300 hover:shadow-md hover:border-[#012b67]/20">
                    <Image
                      src={partner.logo || '/logo.png'}
                      alt={partner.name}
                      width={120}
                      height={50}
                      className="max-h-12 w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════════════════
          10. CEO MESSAGE
          ════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#012b67] relative overflow-hidden">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
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
                {/* Quote mark */}
                <div className="mb-4">
                  <span className="text-white/20 text-[80px] md:text-[100px] font-serif leading-none block -mb-10">
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
                      'في النبراس، نؤمن بأن إدارة المرافق ليست مجرد خدمة تُقدَّم، بل هي شراكة حقيقية نبنيها مع عملائنا نحو التميز والاستدامة. نسعى دائماً لتقديم أعلى معايير الجودة والابتكار في كل مشروع نتولاه.'}
                </p>

                {/* Divider */}
                <div className="w-16 h-[2px] bg-white/30 mb-6" />

                <div>
                  <p className="text-white font-bold text-xl">
                    {language === 'ar' ? 'م. محمد المقبلي' : 'Eng. Mohammed Almogbly'}
                  </p>
                  <p className="text-white/60 text-sm mt-1">
                    {t('ceo_title')} | {language === 'ar' ? (settings?.company_name_ar || 'النبراس لإدارة المرافق') : (settings?.company_name_en || 'Alnebras Facilities Management')}
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}