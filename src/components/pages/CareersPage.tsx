'use client'

import { useEffect, useState } from 'react'
import { Briefcase, MapPin, Building, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import AnimatedSection from '@/components/shared/AnimatedSection'
import SectionTitle from '@/components/shared/SectionTitle'
import { useNavigationStore } from '@/lib/store'
import { useTranslation } from '@/lib/translations'

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

  useEffect(() => {
    fetch('/api/jobs')
      .then((res) => res.json())
      .then((data) => {
        setJobs(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

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
                    <Card className="border-0 shadow-sm card-hover">
                      <CardContent className="p-6 md:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                          {job.type && (
                            <Badge
                              variant="secondary"
                              className="bg-[#e8eef5] text-[#012b67] font-medium flex-shrink-0"
                            >
                              {job.type}
                            </Badge>
                          )}
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
    </div>
  )
}