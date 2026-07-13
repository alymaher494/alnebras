'use client'

import Image from 'next/image'
import { Instagram, Facebook, MapPin, Phone, Mail, ArrowUp } from 'lucide-react'
import { useNavigationStore, type PageName } from '@/lib/store'
import { useTranslation, type TranslationKey } from '@/lib/translations'

const quickLinks: { label: TranslationKey; page: PageName }[] = [
  { label: 'home', page: 'home' },
  { label: 'about', page: 'about' },
  { label: 'services', page: 'services' },
  { label: 'partners_page', page: 'partners' },
  { label: 'media-center', page: 'media-center' },
  { label: 'careers', page: 'careers' },
  { label: 'contact', page: 'contact' },
]

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78c.3 0 .59.05.86.13v-3.5a6.37 6.37 0 0 0-.86-.06A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 10.86 4.46V13.2a8.25 8.25 0 0 0 5.58 2.17V11.9a4.84 4.84 0 0 1-3.77-1.78V6.69h3.77z" />
    </svg>
  )
}

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/alnebras_fm', label: 'Instagram' },
  { icon: TiktokIcon, href: 'https://tiktok.com/@alnebras_fm', label: 'TikTok' },
  { icon: Facebook, href: 'https://facebook.com/alnebras_fm', label: 'Facebook' },
]

export default function Footer() {
  const { setCurrentPage, language } = useNavigationStore()
  const { t } = useTranslation(language)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#011a45] text-white mt-auto relative" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Top CTA Strip */}
      <div className="bg-[#012b67]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white text-lg font-semibold">
              {language === 'ar' ? 'هل تبحث عن شراكة في إدارة المرافق؟' : 'Looking for a partnership in facility management?'}
            </h3>
            <p className="text-[#d1ddeb] text-sm mt-1">
              {language === 'ar' ? 'تواصل معنا اليوم واكتشف حلولنا المتكاملة' : 'Contact us today and discover our comprehensive solutions'}
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('contact')}
            className="bg-white text-[#012b67] px-8 py-3 rounded-lg font-semibold text-sm hover:bg-[#e8eef5] transition-colors flex-shrink-0"
          >
            {t('contact')}
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Company Info */}
          <div>
            <Image
              src="/logo-white.png"
              alt="النبراس"
              width={140}
              height={48}
              className="h-11 w-auto object-contain mb-5 filter brightness-0 invert"
            />
            <p className="text-[#a8b8d1] text-sm leading-relaxed mb-6">
              {language === 'ar' 
                ? 'شركة وطنية رائدة متخصصة في إدارة المرافق وعملياتها وصيانتها عبر مجموعة واسعة من القطاعات في المملكة العربية السعودية ومصر.'
                : 'A leading national company specializing in facility management, operations, and maintenance across a wide range of sectors in Saudi Arabia and Egypt.'}
            </p>
            <div className="flex items-center gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center hover:bg-white/15 hover:border-white/20 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-[15px] font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-white/30 rounded-full" />
              {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => setCurrentPage(link.page)}
                    className="text-[#a8b8d1] text-sm hover:text-white transition-colors duration-200 hover:translate-x-[-4px] inline-block"
                  >
                    {t(link.label)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Branches */}
          <div>
            <h3 className="text-white text-[15px] font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-white/30 rounded-full" />
              {t('branches_title')}
            </h3>
            <div className="space-y-6">
              <div className="group">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-[#d1ddeb]" />
                  <p className="text-white text-sm font-medium">
                    {language === 'ar' ? 'جدة - المملكة العربية السعودية' : 'Jeddah - Saudi Arabia'}
                  </p>
                </div>
                <p className={`text-[#a8b8d1] text-xs leading-relaxed ${language === 'ar' ? 'mr-6' : 'ml-6'}`}>
                  {language === 'ar' 
                    ? 'حي الرويس، طريق المدينة، مبني المحمدية بلازا 31، الطابق الثالث'
                    : 'Al-Ruwais, Al-Madina Road, Al-Mohammadiya Plaza Building 31, 3rd Floor'}
                </p>
                <a href="tel:920028911" className={`text-[#d1ddeb] text-xs mt-1.5 inline-flex items-center gap-1.5 hover:text-white transition-colors ${language === 'ar' ? 'mr-6' : 'ml-6'}`} dir="ltr">
                  <Phone className="w-3 h-3" />
                  920028911
                </a>
              </div>
              <div className="group">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-[#d1ddeb]" />
                  <p className="text-white text-sm font-medium">
                    {language === 'ar' ? 'القاهرة - مصر' : 'Cairo - Egypt'}
                  </p>
                </div>
                <p className={`text-[#a8b8d1] text-xs leading-relaxed ${language === 'ar' ? 'mr-6' : 'ml-6'}`}>
                  {language === 'ar' 
                    ? '8 شارع الهداية - حي السفارات - مدينة نصر'
                    : '8 Al-Hidaya Street - Embassies District - Nasr City'}
                </p>
                <a href="tel:2011731149" className={`text-[#d1ddeb] text-xs mt-1.5 inline-flex items-center gap-1.5 hover:text-white transition-colors ${language === 'ar' ? 'mr-6' : 'ml-6'}`} dir="ltr">
                  <Phone className="w-3 h-3" />
                  2011731149
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white text-[15px] font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-white/30 rounded-full" />
              {t('contact')}
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:info@alnebras.com.sa"
                className="flex items-center gap-3 text-[#a8b8d1] hover:text-white transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-[#7a8da8] mb-0.5">
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                  </p>
                  <p className="text-sm">info@alnebras.com.sa</p>
                </div>
              </a>
              <div className="flex items-center gap-3 text-[#a8b8d1]">
                <div className="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-[#7a8da8] mb-0.5">
                    {language === 'ar' ? 'هاتف جدة' : 'Jeddah Phone'}
                  </p>
                  <a href="tel:920028911" className="text-sm hover:text-white transition-colors" dir="ltr">920028911</a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[#a8b8d1]">
                <div className="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-[#7a8da8] mb-0.5">
                    {language === 'ar' ? 'هاتف القاهرة' : 'Cairo Phone'}
                  </p>
                  <a href="tel:2011731149" className="text-sm hover:text-white transition-colors" dir="ltr">2011731149</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#7a8da8] text-xs">
            {language === 'ar' 
              ? `© ${new Date().getFullYear()} النبراس لإدارة المرافق. جميع الحقوق محفوظة.`
              : `© ${new Date().getFullYear()} Alnebras Facilities Management. All rights reserved.`}
          </p>
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo/vision-2030.png"
              alt="رؤية السعودية 2030"
              width={70}
              height={30}
              className="h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity filter brightness-0 invert"
            />
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center hover:bg-white/15 transition-colors"
              aria-label="العودة للأعلى"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}