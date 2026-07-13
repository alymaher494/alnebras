'use client'

import { useState, useEffect, type FormEvent } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Send, Loader2, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { toast } from 'sonner'
import { useNavigationStore } from '@/lib/store'
import { useTranslation } from '@/lib/translations'

/* ──────────── Hero Banner ──────────── */
function HeroBanner({ language }: { language: 'ar' | 'en' }) {
  const { t } = useTranslation(language)
  return (
    <section className="relative w-full h-[45vh] min-h-[340px] md:min-h-[400px] overflow-hidden">
      <Image
        src="/images/gallery/page10_img1.jpg"
        alt="تواصل معنا"
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
          {t('contact')}
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
            ? 'نسعد بتلقي استفساراتكم واقتراحكم، فلا تتردد في التواصل معنا'
            : 'We are pleased to receive your inquiries and suggestions, so please do not hesitate to contact us.'}
        </motion.p>
      </div>
    </section>
  )
}

/* ──────────── Branch Data ──────────── */
const getBranchesList = (language: 'ar' | 'en') => [
  {
    city: language === 'ar' ? 'جدة' : 'Jeddah',
    country: language === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia',
    address: language === 'ar' 
      ? 'حي الرويس، طريق المدينة، مبني المحمدية بلازا 31، الطابق الثالث'
      : 'Al-Ruwais, Al-Madina Road, Al-Mohammadiya Plaza Building 31, 3rd Floor',
    phone: '920028911',
    email: 'info@alnebras.com.sa',
    latitude: 21.5433,
    longitude: 39.1728,
  },
  {
    city: language === 'ar' ? 'القاهرة' : 'Cairo',
    country: language === 'ar' ? 'مصر' : 'Egypt',
    address: language === 'ar' 
      ? '8 شارع الهداية - حي السفارات - مدينة نصر'
      : '8 Al-Hidaya Street - Embassies District - Nasr City',
    phone: '2011731149',
    email: 'info@alnebras.com.sa',
    latitude: 30.0444,
    longitude: 31.2357,
  },
]

/* ──────────── Contact Form ──────────── */
function ContactForm({ language }: { language: 'ar' | 'en' }) {
  const { t } = useTranslation(language)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        toast.success(t('message_success'))
        setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        toast.error(language === 'ar' ? 'فشل في إرسال الرسالة' : 'Failed to send message')
      }
    } catch {
      toast.error(language === 'ar' ? 'حدث خطأ في الاتصال' : 'Connection error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(1,43,103,0.08)] p-6 md:p-10">
      <h3 className="text-2xl font-bold text-[#012b67] mb-6">
        {language === 'ar' ? 'أرسل لنا رسالة' : 'Send us a message'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-5 text-right">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="name">
              {t('name')} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t('name')}
              className="rounded-xl border-[#e5e7eb] h-12 focus-visible:ring-[#012b67]/20 focus-visible:border-[#012b67]"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">
              {t('email')} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder={t('email')}
              className="rounded-xl border-[#e5e7eb] h-12 focus-visible:ring-[#012b67]/20 focus-visible:border-[#012b67]"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="phone">{t('phone')}</Label>
            <Input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder={t('phone')}
              className="rounded-xl border-[#e5e7eb] h-12 focus-visible:ring-[#012b67]/20 focus-visible:border-[#012b67]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">{t('subject')}</Label>
            <Input
              id="subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder={t('subject')}
              className="rounded-xl border-[#e5e7eb] h-12 focus-visible:ring-[#012b67]/20 focus-visible:border-[#012b67]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">
            {t('message')} <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder={t('message')}
            rows={6}
            className="rounded-xl border-[#e5e7eb] focus-visible:ring-[#012b67]/20 focus-visible:border-[#012b67] resize-none"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto bg-[#012b67] hover:bg-[#011d47] text-white font-semibold px-10 py-3 rounded-xl h-12 transition-all duration-300"
        >
          {submitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              {t('send_message')}
              <Send className={`h-4 w-4 ${language === 'ar' ? 'mr-2' : 'ml-2'}`} />
            </>
          )}
        </Button>
      </form>
    </div>
  )
}

/* ──────────── Branch Card ──────────── */
function BranchCard({
  branch,
  delay,
  language,
}: {
  branch: ReturnType<typeof getBranchesList>[0]
  delay: number
  language: 'ar' | 'en'
}) {
  return (
    <AnimatedSection delay={delay}>
      <div className={`group bg-white rounded-2xl shadow-[0_4px_24px_rgba(1,43,103,0.08)] p-6 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(1,43,103,0.14)] hover:-translate-y-1 ${language === 'ar' ? 'border-r-4 border-r-[#012b67]' : 'border-l-4 border-l-[#012b67]'}`}>
        <h3 className="text-xl font-bold text-[#012b67] mb-1">{branch.city}</h3>
        <p className="text-[#6b7280] text-sm mb-5">{branch.country}</p>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#e8eef5] flex items-center justify-center flex-shrink-0 mt-0.5">
              <MapPin className="w-4.5 h-4.5 text-[#012b67]" />
            </div>
            <p className="text-[#374151] text-sm leading-relaxed">
              {branch.address}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#e8eef5] flex items-center justify-center flex-shrink-0">
              <Phone className="w-4.5 h-4.5 text-[#012b67]" />
            </div>
            <p className="text-[#374151] text-sm" dir="ltr">
              {branch.phone}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#e8eef5] flex items-center justify-center flex-shrink-0">
              <Mail className="w-4.5 h-4.5 text-[#012b67]" />
            </div>
            <p className="text-[#374151] text-sm">{branch.email}</p>
          </div>
          {/* Google Maps link */}
          <div className="pt-2">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${branch.latitude},${branch.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-bold text-[#012b67] hover:underline"
            >
              {language === 'ar' ? 'عرض على خريطة جوجل ←' : 'View on Google Maps ←'}
            </a>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

/* ──────────── Map Section ──────────── */
function MapSection({ language }: { language: 'ar' | 'en' }) {
  const branches = getBranchesList(language)
  return (
    <AnimatedSection>
      <section className="relative w-full py-24 md:py-32 overflow-hidden">
        <Image
          src="/images/gallery/page4_img1.jpg"
          alt="موقعنا"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#012b67]/75" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {language === 'ar' ? 'نحن هنا لخدمتك' : 'We are here to serve you'}
            </h2>
            <div className="h-[3px] w-20 bg-white/70 rounded-full mx-auto mb-8" />
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              {language === 'ar' ? 'تواصل معنا في أي من فروعنا ونحن سعداء بخدمتك' : 'Contact us at any of our branches and we are happy to serve you.'}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {branches.map((branch, i) => (
              <motion.div
                key={branch.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.15, ease: 'easeOut' }}
                className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-bold text-lg mb-1">
                  {branch.city} - {branch.country}
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  {branch.address}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}

/* ──────────── Main Contact Page ──────────── */
export default function ContactPage() {
  const { language } = useNavigationStore()
  const branches = getBranchesList(language)

  return (
    <div className="pt-20" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <HeroBanner language={language} />

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-[#f8f9fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Form - 3/5 */}
            <AnimatedSection className="lg:col-span-3">
              <ContactForm language={language} />
            </AnimatedSection>

            {/* Branches - 2/5 */}
            <div className="lg:col-span-2 space-y-6">
              <BranchCard branch={branches[0]} delay={0.1} language={language} />
              <BranchCard branch={branches[1]} delay={0.2} language={language} />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <MapSection language={language} />
    </div>
  )
}