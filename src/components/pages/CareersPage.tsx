'use client'

import { useEffect, useState } from 'react'
import { Briefcase, MapPin, Building, Clock, X, Upload } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import AnimatedSection from '@/components/shared/AnimatedSection'
import SectionTitle from '@/components/shared/SectionTitle'
import { useNavigationStore } from '@/lib/store'
import { useTranslation } from '@/lib/translations'
import { toast } from 'sonner'

interface Job {
  id: string
  titleAr: string
  titleEn: string | null
  departmentAr: string | null
  departmentEn: string | null
  locationAr: string | null
  locationEn: string | null
  type: string | null
  descriptionAr: string | null
  descriptionEn: string | null
  requirementsAr: string | null
  requirementsEn: string | null
}

export default function CareersPage() {
  const { language } = useNavigationStore()
  const { t } = useTranslation(language)
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  
  // Application Form Modal State
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
  })
  const [cvFile, setCvFile] = useState<File | null>(null)

  useEffect(() => {
    fetch('/api/jobs')
      .then((res) => res.json())
      .then((data) => {
        setJobs(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.phone || !formData.specialization || !cvFile) {
      toast.error(language === 'ar' ? 'يرجى ملء جميع الحقول وإرفاق السيرة الذاتية' : 'Please fill all fields and attach your CV.')
      return
    }
    
    setSubmitting(true)
    // Simulate API upload
    setTimeout(() => {
      setSubmitting(false)
      toast.success(language === 'ar' ? 'تم تقديم طلبك بنجاح وسنتواصل معك قريباً!' : 'Your application was submitted successfully! We will contact you soon.')
      setSelectedJob(null)
      setFormData({ name: '', email: '', phone: '', specialization: '' })
      setCvFile(null)
    }, 1500)
  }

  return (
    <div className="pt-20 md:pt-24" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <section className="py-16 md:py-24 bg-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={t('careers')}
            subtitle={language === 'ar' ? 'انضم لفريقنا وكن جزءاً من مسيرة النجاح' : 'Join our team and be part of our success story.'}
          />

          {loading ? (
            <div className="space-y-4 max-w-3xl mx-auto">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-36 bg-[#f3f4f6] rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <AnimatedSection>
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-[#e8eef5] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="w-10 h-10 text-[#012b67]" />
                </div>
                <p className="text-[#6b7280] text-lg">
                  {language === 'ar' ? 'لا توجد وظائف متاحة حالياً' : 'No jobs available currently'}
                </p>
                <p className="text-[#6b7280] text-sm mt-2">
                  {language === 'ar' ? 'يرجى متابعة هذه الصفحة لمعرفة آخر الوظائف المتاحة' : 'Please watch this page for future job openings.'}
                </p>
              </div>
            </AnimatedSection>
          ) : (
            <div className="space-y-4 max-w-3xl mx-auto">
              {jobs.map((job, i) => {
                const jTitle = language === 'ar' ? job.titleAr : (job.titleEn || job.titleAr)
                const jDept = language === 'ar' ? job.departmentAr : (job.departmentEn || job.departmentAr)
                const jLoc = language === 'ar' ? job.locationAr : (job.locationEn || job.locationAr)
                const jDesc = language === 'ar' ? job.descriptionAr : (job.descriptionEn || job.descriptionAr)
                return (
                  <AnimatedSection key={job.id} delay={i * 0.08}>
                    <Card className="border border-[#e5e7eb] shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
                      <CardContent className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div>
                            <h3 className="text-lg font-bold text-[#012b67] mb-2">
                              {jTitle}
                            </h3>
                            <div className="flex flex-wrap items-center gap-4">
                              {jDept && (
                                <div className="flex items-center gap-1.5 text-[#6b7280] text-sm">
                                  <Building className="w-4 h-4" />
                                  {jDept}
                                </div>
                              )}
                              {jLoc && (
                                <div className="flex items-center gap-1.5 text-[#6b7280] text-sm">
                                  <MapPin className="w-4 h-4" />
                                  {jLoc}
                                </div>
                              )}
                              {job.type && (
                                <div className="flex items-center gap-1.5 text-[#6b7280] text-sm">
                                  <Clock className="w-4 h-4" />
                                  {job.type}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 flex-shrink-0">
                            {job.type && (
                              <Badge
                                variant="secondary"
                                className="bg-[#e8eef5] text-[#012b67] font-semibold text-xs px-3 py-1 rounded-lg"
                              >
                                {job.type}
                              </Badge>
                            )}
                            <button
                              onClick={() => setSelectedJob(job)}
                              className="bg-[#012b67] hover:bg-[#011d47] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-sm"
                            >
                              {language === 'ar' ? 'تقدم الآن' : 'Apply Now'}
                            </button>
                          </div>
                        </div>
                        {jDesc && (
                          <p className="text-[#374151] text-sm mt-4 leading-relaxed">
                            {jDesc}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Application Modal Overlay */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5e7eb]">
              <div>
                <h3 className="font-bold text-lg text-[#012b67]">
                  {language === 'ar' ? 'نموذج التقديم للوظيفة' : 'Apply for Job'}
                </h3>
                <p className="text-gray-500 text-xs mt-0.5">
                  {language === 'ar' ? selectedJob.titleAr : (selectedJob.titleEn || selectedJob.titleAr)}
                </p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#012b67]/20 focus:border-[#012b67] text-sm"
                  placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#012b67]/20 focus:border-[#012b67] text-sm"
                    placeholder="name@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    {language === 'ar' ? 'رقم الجوال' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#012b67]/20 focus:border-[#012b67] text-sm"
                    placeholder="+966 50 000 0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {language === 'ar' ? 'التخصص / المجال' : 'Specialization / Field'}
                </label>
                <input
                  type="text"
                  name="specialization"
                  required
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#012b67]/20 focus:border-[#012b67] text-sm"
                  placeholder={language === 'ar' ? 'مثال: مهندس ميكانيكا، مشرف سلامة' : 'e.g. Mechanical Engineer, Safety Supervisor'}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {language === 'ar' ? 'السيرة الذاتية (CV)' : 'Resume / CV'}
                </label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <input
                    type="file"
                    required
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-[#012b67]">
                    {cvFile ? cvFile.name : (language === 'ar' ? 'اضغط هنا لرفع السيرة الذاتية' : 'Click here to upload CV')}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">PDF, DOC, DOCX up to 5MB</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#012b67] hover:bg-[#011d47] text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    language === 'ar' ? 'جاري التقديم...' : 'Submitting...'
                  ) : (
                    language === 'ar' ? 'إرسال الطلب' : 'Submit Application'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
