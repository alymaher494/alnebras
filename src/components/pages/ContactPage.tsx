'use client'

import { useState, type FormEvent } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Send, Loader2, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { toast } from 'sonner'

/* ──────────── Hero Banner ──────────── */
function HeroBanner() {
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
          تواصل معنا
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
          نسعد بتلقي استفساراتكم واقتراحكم، فلا تتردد في التواصل معنا
        </motion.p>
      </div>
    </section>
  )
}

/* ──────────── Branch Data ──────────── */
const branches = [
  {
    city: 'جدة',
    country: 'المملكة العربية السعودية',
    address: 'حي الرويس، طريق المدينة، مبني المحمدية بلازا 31، الطابق الثالث',
    phone: '920028911',
    email: 'info@alnebras.com.sa',
  },
  {
    city: 'القاهرة',
    country: 'مصر',
    address: '8 شارع الهداية - حي السفارات - مدينة نصر',
    phone: '2011731149',
    email: 'info@alnebras.com.sa',
  },
]

/* ──────────── Contact Form ──────────── */
function ContactForm() {
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
    if (!form.name || !form.email || !form.message) {
      toast.error('يرجى ملء الحقول المطلوبة')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        toast.success('تم إرسال رسالتك بنجاح')
        setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        toast.error('حدث خطأ أثناء إرسال الرسالة')
      }
    } catch {
      toast.error('حدث خطأ أثناء إرسال الرسالة')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(1,43,103,0.08)] p-6 md:p-10">
      <h3 className="text-2xl font-bold text-[#012b67] mb-2">أرسل لنا رسالة</h3>
      <p className="text-[#6b7280] text-sm mb-8">
        يرجى ملء النموذج أدناه وسنقوم بالرد عليك في أقرب وقت
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#374151] font-medium">
              الاسم الكامل <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="الاسم الكامل"
              className="rounded-xl border-[#e5e7eb] focus-visible:ring-[#012b67]/20 focus-visible:border-[#012b67] h-12"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#374151] font-medium">
              البريد الإلكتروني <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@email.com"
              dir="ltr"
              className="rounded-xl border-[#e5e7eb] focus-visible:ring-[#012b67]/20 focus-visible:border-[#012b67] h-12 text-left"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-[#374151] font-medium">
              رقم الجوال
            </Label>
            <Input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="05xxxxxxxx"
              dir="ltr"
              className="rounded-xl border-[#e5e7eb] focus-visible:ring-[#012b67]/20 focus-visible:border-[#012b67] h-12 text-left"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-[#374151] font-medium">
              الموضوع
            </Label>
            <Input
              id="subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="موضوع الرسالة"
              className="rounded-xl border-[#e5e7eb] focus-visible:ring-[#012b67]/20 focus-visible:border-[#012b67] h-12"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="message" className="text-[#374151] font-medium">
            الرسالة <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="اكتب رسالتك هنا..."
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
              إرسال الرسالة
              <Send className="mr-2 h-4 w-4" />
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
}: {
  branch: (typeof branches)[0]
  delay: number
}) {
  return (
    <AnimatedSection delay={delay}>
      <div className="group bg-white rounded-2xl shadow-[0_4px_24px_rgba(1,43,103,0.08)] p-6 border-r-4 border-[#012b67] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(1,43,103,0.14)] hover:-translate-y-1">
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
        </div>
      </div>
    </AnimatedSection>
  )
}

/* ──────────── Map Section ──────────── */
function MapSection() {
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
              نحن هنا لخدمتك
            </h2>
            <div className="h-[3px] w-20 bg-white/70 rounded-full mx-auto mb-8" />
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              تواصل معنا في أي من فروعنا ونحن سعداء بخدمتك
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
  return (
    <div className="pt-20">
      <HeroBanner />

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-[#f8f9fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Form - 3/5 */}
            <AnimatedSection className="lg:col-span-3">
              <ContactForm />
            </AnimatedSection>

            {/* Branches - 2/5 */}
            <div className="lg:col-span-2 space-y-6">
              <BranchCard branch={branches[0]} delay={0.1} />
              <BranchCard branch={branches[1]} delay={0.2} />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <MapSection />
    </div>
  )
}