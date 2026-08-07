'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { useNavigationStore } from '@/lib/store'
import { useTranslation } from '@/lib/translations'
import { Building2, Globe } from 'lucide-react'

interface Partner {
  id: string
  name: string
  logo: string
  country: string
  isActive: boolean
}

export default function PartnersPage() {
  const { language } = useNavigationStore()
  const { t } = useTranslation(language)
  
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'KSA' | 'Egypt'>('all')

  useEffect(() => {
    async function fetchPartners() {
      try {
        const res = await fetch('/api/partners')
        if (res.ok) {
          const data = await res.json()
          setPartners(data)
        }
      } catch (err) {
        console.error('Error fetching partners:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPartners()
  }, [])

  const filteredPartners = partners.filter(p => {
    if (filter === 'all') return true
    return p.country === filter
  })

  return (
    <div className="pt-20 md:pt-24" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Banner */}
      <section className="relative w-full h-[40vh] min-h-[300px] overflow-hidden">
        <Image
          src="/images/services_hero.png"
          alt="شركاؤنا"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#012b67]/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {t('partners')}
          </motion.h1>
          <div className="h-[3px] w-20 bg-white/70 rounded-full mb-4" />
          <p className="text-white/80 text-base md:text-lg max-w-xl">
            {language === 'ar'
              ? 'نفخر بشراكتنا الاستراتيجية مع كبرى المؤسسات والشركات في المملكة العربية السعودية ومصر'
              : 'We are proud of our strategic partnership with major institutions and companies in Saudi Arabia and Egypt.'}
          </p>
        </div>
      </section>

      {/* Partners List Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {loading ? (
            <div className="text-center py-20 text-gray-400">
              {language === 'ar' ? 'جاري تحميل الشركاء...' : 'Loading partners...'}
            </div>
          ) : (
            <div className="space-y-20">
              {/* KSA Partners */}
              <div>
                <h3 className="text-2xl font-bold text-[#012b67] mb-8 border-r-4 border-[#012b67] pr-3 flex items-center gap-3">
                  <Globe className="w-6 h-6 text-[#012b67]" />
                  {language === 'ar' ? 'عملاؤنا وشركاؤنا في المملكة العربية السعودية' : 'Our Clients & Partners in Saudi Arabia'}
                </h3>
                {partners.filter(p => p.country === 'KSA').length === 0 ? (
                  <p className="text-gray-400 text-sm">{language === 'ar' ? 'لا يوجد شركاء حالياً' : 'No partners currently.'}</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                    {partners.filter(p => p.country === 'KSA').map((partner) => (
                      <div
                        key={partner.id}
                        className="bg-white border border-[#e5e7eb]/80 rounded-2xl p-6 flex flex-col items-center justify-center h-40 shadow-sm hover:shadow-md hover:border-[#012b67]/20 transition-all duration-300 group"
                      >
                        {partner.logo ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={partner.logo}
                              alt={partner.name}
                              fill
                              className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center text-gray-400 gap-2">
                            <Building2 className="w-8 h-8" />
                            <span className="text-xs font-semibold text-center">{partner.name}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Egypt Partners */}
              <div>
                <h3 className="text-2xl font-bold text-[#012b67] mb-8 border-r-4 border-[#012b67] pr-3 flex items-center gap-3">
                  <Globe className="w-6 h-6 text-[#012b67]" />
                  {language === 'ar' ? 'عملاؤنا وشركاؤنا في جمهورية مصر العربية' : 'Our Clients & Partners in Egypt'}
                </h3>
                {partners.filter(p => p.country?.toLowerCase() === 'egypt').length === 0 ? (
                  <p className="text-gray-400 text-sm">{language === 'ar' ? 'لا يوجد شركاء حالياً' : 'No partners currently.'}</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                    {partners.filter(p => p.country?.toLowerCase() === 'egypt').map((partner) => (
                      <div
                        key={partner.id}
                        className="bg-white border border-[#e5e7eb]/80 rounded-2xl p-6 flex flex-col items-center justify-center h-40 shadow-sm hover:shadow-md hover:border-[#012b67]/20 transition-all duration-300 group"
                      >
                        {partner.logo ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={partner.logo}
                              alt={partner.name}
                              fill
                              className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center text-gray-400 gap-2">
                            <Building2 className="w-8 h-8" />
                            <span className="text-xs font-semibold text-center">{partner.name}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  )
}
