'use client'

import { useState, type FormEvent } from 'react'
import { MapPin, Phone, Mail, Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import AnimatedSection from '@/components/shared/AnimatedSection'
import SectionTitle from '@/components/shared/SectionTitle'
import { toast } from 'sonner'

export default function ContactPage() {
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

  return (
    <div className="pt-20 md:pt-24">
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="تواصل معنا"
            subtitle="نسعد بتلقي استفساراتكم واقتراحاتكم"
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Form */}
            <AnimatedSection className="lg:col-span-3">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 md:p-10">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          الاسم الكامل <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="الاسم الكامل"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">
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
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="phone">رقم الجوال</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="05xxxxxxxx"
                          dir="ltr"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">الموضوع</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          placeholder="موضوع الرسالة"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">
                        الرسالة <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="اكتب رسالتك هنا..."
                        rows={6}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto bg-[#012b67] hover:bg-[#011d47] text-white font-semibold px-10 py-3"
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
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection className="lg:col-span-2" delay={0.15}>
              <div className="space-y-6">
                {branches.map((branch) => (
                  <Card key={branch.city} className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-[#012b67] mb-4">
                        {branch.city} - {branch.country}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-[#012b67] mt-0.5 flex-shrink-0" />
                          <p className="text-[#374151] text-sm leading-relaxed">
                            {branch.address}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-[#012b67] flex-shrink-0" />
                          <p className="text-[#374151] text-sm" dir="ltr">
                            {branch.phone}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-[#012b67] flex-shrink-0" />
                          <p className="text-[#374151] text-sm">
                            {branch.email}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}