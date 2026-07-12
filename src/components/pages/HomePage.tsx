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
  Sparkles,
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
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import AnimatedSection from '@/components/shared/AnimatedSection'
import SectionTitle from '@/components/shared/SectionTitle'
import { useNavigationStore } from '@/lib/store'

/* ---------- type helpers ---------- */
interface Settings {
  company_name_ar: string
  vision_ar: string
  mission_ar: string
  goals_ar: string
  values_ar: string
  ceo_message_ar: string
  hero_title_ar: string
  hero_subtitle_ar: string
  about_text_ar: string
  social_instagram: string
  social_tiktok: string
  social_facebook: string
}

interface Service {
  id: string
  titleAr: string
  descriptionAr: string
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
  cityAr: string
  addressAr: string
  phone: string | null
  email: string | null
  image: string | null
  descriptionAr: string | null
}

/* ---------- icon map ---------- */
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
  Award,
  ShieldCheck,
  Handshake,
  TrendingUp,
  Target,
  Lightbulb,
  Leaf,
}

const valueIconMap: Record<string, LucideIcon> = {
  'الجودة': Award,
  'السلامة والأمان': ShieldCheck,
  'روح الفريق والتواصل': Users,
  'النزاهة والالتزام': Handshake,
  'التطوير والتحسين': TrendingUp,
  'التخطيط الاستراتيجي': Target,
  'الإبداع والابتكار': Lightbulb,
  'الاستدامة': Leaf,
}

const stats = [
  { label: 'سنوات خبرة', value: '15+' },
  { label: 'مشروع منجز', value: '200+' },
  { label: 'عميل راضٍ', value: '150+' },
  { label: 'فرع', value: '2' },
]

export default function HomePage() {
  const { setCurrentPage } = useNavigationStore()
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
        setSettings(settingsData)
        setServices(servicesData)
        setPartners(partnersData)
        setBranches(branchesData)
      } catch (err) {
        console.error('Failed to fetch data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const values = settings?.values_ar?.split('|') || []

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="min-h-screen hero-gradient relative flex items-center justify-center overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            {loading ? '...' : settings?.hero_title_ar || 'حلول ذكية لإدارة المرافق'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl text-[#d1ddeb] max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            {loading
              ? ''
              : settings?.hero_subtitle_ar ||
                'نرفع كفاءة منشأتك ونضمن استمرارية أعمالك بأعلى معايير الجودة والاحترافية'}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              onClick={() => setCurrentPage('services')}
              size="lg"
              className="bg-white text-[#012b67] hover:bg-[#e8eef5] font-semibold text-base px-8 py-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              اكتشف خدماتنا
              <ArrowLeft className="mr-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 80L48 74.7C96 69.3 192 58.7 288 48C384 37.3 480 26.7 576 26.7C672 26.7 768 37.3 864 42.7C960 48 1056 48 1152 42.7C1248 37.3 1344 26.7 1392 21.3L1440 16V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ── About Section ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-[#012b67] mb-4">
                {settings?.company_name_ar || 'النبراس لإدارة المرافق'}
              </h2>
              <div className="accent-line mb-6" />
              <p className="text-[#374151] text-base md:text-lg leading-[1.9]">
                {loading
                  ? ''
                  : settings?.about_text_ar ||
                    'شركة وطنية رائدة متخصصة في إدارة المرافق وعملياتها وصيانتها.'}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/about-bg.jpg"
                    alt="النبراس لإدارة المرافق"
                    width={640}
                    height={440}
                    className="w-full h-auto object-cover"
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#e8eef5] rounded-2xl -z-10 hidden lg:block" />
              </div>
            </AnimatedSection>
          </div>

          {/* Stats */}
          <AnimatedSection delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 md:mt-20">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="text-center p-6 bg-[#f9fafb] rounded-xl"
                >
                  <p className="text-3xl md:text-4xl font-bold text-[#012b67] mb-1">
                    {stat.value}
                  </p>
                  <p className="text-[#6b7280] text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Vision & Mission Section ── */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="رؤيتنا ورسالتنا" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <AnimatedSection>
              <Card className="border-0 shadow-md h-full">
                <CardContent className="p-8 md:p-10">
                  <div className="w-14 h-14 bg-[#e8eef5] rounded-xl flex items-center justify-center mb-6">
                    <EyeIcon className="w-7 h-7 text-[#012b67]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#012b67] mb-4">
                    الرؤية
                  </h3>
                  <p className="text-[#374151] leading-[1.9]">
                    {loading
                      ? ''
                      : settings?.vision_ar ||
                        'أن نكون الخيار الأول للمؤسسات الكبرى.'}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <Card className="border-0 shadow-md h-full">
                <CardContent className="p-8 md:p-10">
                  <div className="w-14 h-14 bg-[#e8eef5] rounded-xl flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-[#012b67]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#012b67] mb-4">
                    الرسالة
                  </h3>
                  <p className="text-[#374151] leading-[1.9]">
                    {loading
                      ? ''
                      : settings?.mission_ar ||
                        'الوصول إلى عملائنا وفهم احتياجاتهم.'}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Values Section ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="قيمنا"
            subtitle="القيم الأساسية التي توجه أعمالنا وتعكس التزامنا بالتميز"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {values.map((value, i) => {
              const IconComponent = valueIconMap[value.trim()]
              return (
                <AnimatedSection key={i} delay={i * 0.06}>
                  <Card className="border-0 shadow-sm card-hover h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-[#e8eef5] rounded-xl flex items-center justify-center mx-auto mb-4">
                        {IconComponent ? (
                          <IconComponent className="w-6 h-6 text-[#012b67]" />
                        ) : (
                          <Award className="w-6 h-6 text-[#012b67]" />
                        )}
                      </div>
                      <h4 className="text-sm md:text-base font-semibold text-[#012b67]">
                        {value.trim()}
                      </h4>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Services Preview Section ── */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="خدماتنا"
            subtitle="حلول متكاملة لإدارة المرافق"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 8).map((service, i) => {
              const IconComponent = iconMap[service.icon]
              return (
                <AnimatedSection key={service.id} delay={i * 0.05}>
                  <Card className="border-0 shadow-sm card-hover h-full">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-[#e8eef5] rounded-xl flex items-center justify-center mb-4">
                        {IconComponent ? (
                          <IconComponent className="w-6 h-6 text-[#012b67]" />
                        ) : (
                          <Sparkles className="w-6 h-6 text-[#012b67]" />
                        )}
                      </div>
                      <h4 className="text-base font-semibold text-[#012b67] mb-2">
                        {service.titleAr}
                      </h4>
                      <p className="text-[#6b7280] text-sm leading-relaxed line-clamp-3">
                        {service.descriptionAr}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              )
            })}
          </div>
          <AnimatedSection className="text-center mt-10">
            <Button
              variant="outline"
              onClick={() => setCurrentPage('services')}
              className="border-[#012b67] text-[#012b67] hover:bg-[#012b67] hover:text-white font-semibold px-8"
            >
              عرض الكل
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Partners Section ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="شركاؤنا" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {partners.map((partner, i) => (
              <AnimatedSection key={partner.id} delay={i * 0.06}>
                <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-xl p-6 flex items-center justify-center h-24 card-hover">
                  <Image
                    src={partner.logo || '/logo.png'}
                    alt={partner.name}
                    width={100}
                    height={40}
                    className="max-h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Branches Section ── */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="فروعنا" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {branches.map((branch, i) => (
              <AnimatedSection key={branch.id} delay={i * 0.15}>
                <Card className="border-0 shadow-md overflow-hidden h-full">
                  <div className="relative h-48">
                    <Image
                      src={branch.image || '/images/facility.jpg'}
                      alt={branch.cityAr}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 right-4">
                      <h3 className="text-white text-xl font-bold">
                        {branch.cityAr}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {branch.countryAr}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-[#012b67] mt-0.5 flex-shrink-0" />
                        <p className="text-[#374151] text-sm leading-relaxed">
                          {branch.addressAr}
                        </p>
                      </div>
                      {branch.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-[#012b67] flex-shrink-0" />
                          <p className="text-[#374151] text-sm" dir="ltr">
                            {branch.phone}
                          </p>
                        </div>
                      )}
                      {branch.email && (
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-[#012b67] flex-shrink-0" />
                          <p className="text-[#374151] text-sm">
                            {branch.email}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CEO Message Section ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="رسالة الرئيس التنفيذي" />
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-start gap-8">
                    {/* CEO Avatar Placeholder */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#e8eef5] flex items-center justify-center">
                        <span className="text-3xl md:text-4xl font-bold text-[#012b67]">
                          م
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      {/* Quote mark */}
                      <div className="text-[#012b67] text-5xl font-serif leading-none mb-2">
                        &ldquo;
                      </div>
                      <p className="text-[#374151] text-base md:text-lg leading-[2] mb-6">
                        {loading
                          ? ''
                          : settings?.ceo_message_ar ||
                            'في النبراس، نؤمن بأن إدارة المرافق ليست مجرد خدمة.'}
                      </p>
                      <p className="text-[#012b67] font-semibold">
                        الرئيس التنفيذي
                      </p>
                      <p className="text-[#6b7280] text-sm">
                        {settings?.company_name_ar ||
                          'النبراس لإدارة المرافق'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

/* A simple eye icon for vision card */
function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}