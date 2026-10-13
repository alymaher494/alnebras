'use client'

import { useEffect, useState } from 'react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import SectionTitle from '@/components/shared/SectionTitle'
import { useNavigationStore } from '@/lib/store'
import { useTranslation } from '@/lib/translations'
import { toast } from 'sonner'
import { Briefcase, Upload } from 'lucide-react'

interface Department {
  id: string
  nameEn: string
}

/* ──────────── Job Application Form (department-routed) ──────────── */
export default function CareersPage() {
  const { language } = useNavigationStore()
  const { t } = useTranslation(language)
  const [departments, setDepartments] = useState<Department[]>([])
  const [form, setForm] = useState({ name: '', email: '', phone: '', specialization: '', department: '' })
  const [cv, setCv] = useState<File | null>(null)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    fetch('/api/departments')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setDepartments(Array.isArray(data) ? data : []))
      .catch(() => setDepartments([]))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.specialization || !form.department || !cv) {
      toast.error(language === 'ar' ? 'يرجى ملء جميع الحقول واختيار القسم وإرفاق السيرة الذاتية' : 'Please fill all fields, choose a department and attach your CV.')
      return
    }
    setSending(true)
    try {
      const payload = new FormData()
      payload.append('name', form.name)
      payload.append('email', form.email)
      payload.append('phone', form.phone)
      payload.append('specialization', form.specialization)
      payload.append('department', form.department)
      payload.append('cv', cv)
      const res = await fetch('/api/applications', { method: 'POST', body: payload })
      if (!res.ok) throw new Error('submit failed')
      toast.success(language === 'ar' ? 'تم تقديم طلبك بنجاح وسنتواصل معك قريباً!' : 'Your application was submitted successfully! We will contact you soon.')
      setForm({ name: '', email: '', phone: '', specialization: '', department: '' })
      setCv(null)
    } catch {
      toast.error(language === 'ar' ? 'تعذر إرسال الطلب، حاول لاحقاً' : 'Failed to submit, please try later.')
    } finally {
      setSending(false)
    }
  }

  const inputCls =
    'w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#012b67]/20 focus:border-[#012b67] text-sm bg-white'
  const labelCls = 'block text-sm font-semibold text-gray-700 mb-1'

  return (
    <div className="pt-20 md:pt-24" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <section className="py-16 md:py-24 bg-white min-h-[60vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={t('careers')}
            subtitle={language === 'ar' ? 'اختر القسم المناسب وأرسل سيرتك الذاتية وسيتواصل معك الفريق المختص' : 'Choose the right department, send your CV and the dedicated team will contact you.'}
          />
          <AnimatedSection>
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-[0_4px_24px_rgba(1,43,103,0.08)] border border-[#e5e7eb]/60 p-6 md:p-10 space-y-4">
              <div>
                <label className={labelCls}>{language === 'ar' ? 'الاسم الكامل' : 'Full Name'}</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>{language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} placeholder="name@example.com" />
                </div>
                <div>
                  <label className={labelCls}>{language === 'ar' ? 'رقم الجوال' : 'Phone Number'}</label>
                  <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} placeholder="+966 50 000 0000" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>{language === 'ar' ? 'التخصص / المجال' : 'Specialization / Field'}</label>
                  <input type="text" required value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} className={inputCls} placeholder={language === 'ar' ? 'مثال: مهندس ميكانيكا' : 'e.g. Mechanical Engineer'} />
                </div>
                <div>
                  <label className={labelCls}>{language === 'ar' ? 'القسم' : 'Department'}</label>
                  <div className="relative">
                    <select
                      required
                      value={form.department}
                      onChange={(e) => setForm({ ...form, department: e.target.value })}
                      className={`${inputCls} appearance-none pe-10`}
                    >
                      <option value="">{language === 'ar' ? '— اختر القسم —' : '— Select department —'}</option>
                      {departments.map((d) => (
                        <option key={d.id} value={d.nameEn}>{d.nameEn}</option>
                      ))}
                    </select>
                    <Briefcase className="w-4 h-4 text-gray-400 absolute end-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div>
                <label className={labelCls}>{language === 'ar' ? 'السيرة الذاتية (CV)' : 'Resume / CV'}</label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <input type="file" required accept=".pdf,.doc,.docx" onChange={(e) => setCv(e.target.files?.[0] ?? null)} className="absolute inset-0 opacity-0 cursor-pointer" />
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-[#012b67]">
                    {cv ? cv.name : (language === 'ar' ? 'اضغط هنا لرفع السيرة الذاتية' : 'Click here to upload CV')}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">PDF, DOC, DOCX up to 5MB</p>
                </div>
              </div>
              <div className="pt-2">
                <button type="submit" disabled={sending} className="w-full bg-[#012b67] hover:bg-[#011d47] text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50">
                  {sending ? (language === 'ar' ? 'جاري التقديم...' : 'Submitting...') : (language === 'ar' ? 'إرسال الطلب' : 'Submit Application')}
                </button>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
