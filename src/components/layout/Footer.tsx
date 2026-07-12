'use client'

import Image from 'next/image'
import { Instagram, Facebook } from 'lucide-react'
import { useNavigationStore, type PageName } from '@/lib/store'

const quickLinks: { label: string; page: PageName }[] = [
  { label: 'الرئيسية', page: 'home' },
  { label: 'إدارة المرافق', page: 'services' },
  { label: 'المركز الإعلامي', page: 'media-center' },
  { label: 'الوظائف', page: 'careers' },
  { label: 'الفعاليات', page: 'events' },
  { label: 'تواصل معنا', page: 'contact' },
]

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78c.3 0 .59.05.86.13v-3.5a6.37 6.37 0 0 0-.86-.06A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 10.86 4.46V13.2a8.25 8.25 0 0 0 5.58 2.17V11.9a4.84 4.84 0 0 1-3.77-1.78V6.69h3.77z" />
    </svg>
  )
}

export default function Footer() {
  const { setCurrentPage } = useNavigationStore()

  return (
    <footer className="bg-[#012b67] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Company Info */}
          <div>
            <Image
              src="/logo.png"
              alt="النبراس"
              width={140}
              height={48}
              className="h-12 w-auto object-contain brightness-0 invert mb-5"
            />
            <p className="text-[#d1ddeb] text-sm leading-relaxed mb-6">
              شركة وطنية رائدة متخصصة في إدارة المرافق وعملياتها وصيانتها
              عبر مجموعة واسعة من القطاعات.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/alnebras_fm"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="انستغرام"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com/@alnebras_fm"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="تيك توك"
              >
                <TiktokIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/alnebras_fm"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="فيسبوك"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-5">روابط سريعة</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => setCurrentPage(link.page)}
                    className="text-[#d1ddeb] text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Branches */}
          <div>
            <h3 className="text-base font-semibold mb-5">فروعنا</h3>
            <div className="space-y-5">
              <div>
                <p className="text-white text-sm font-medium mb-1">
                  جدة - المملكة العربية السعودية
                </p>
                <p className="text-[#d1ddeb] text-xs leading-relaxed">
                  حي الرويس، طريق المدينة، مبني المحمدية بلازا 31، الطابق الثالث
                </p>
                <p className="text-[#d1ddeb] text-xs mt-1" dir="ltr">
                  920028911
                </p>
              </div>
              <div>
                <p className="text-white text-sm font-medium mb-1">
                  القاهرة - مصر
                </p>
                <p className="text-[#d1ddeb] text-xs leading-relaxed">
                  8 شارع الهداية - حي السفارات - مدينة نصر
                </p>
                <p className="text-[#d1ddeb] text-xs mt-1" dir="ltr">
                  2011731149
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-base font-semibold mb-5">تواصل معنا</h3>
            <div className="space-y-3">
              <div>
                <p className="text-[#d1ddeb] text-xs mb-0.5">البريد الإلكتروني</p>
                <a
                  href="mailto:info@alnebras.com.sa"
                  className="text-white text-sm hover:underline"
                >
                  info@alnebras.com.sa
                </a>
              </div>
              <div>
                <p className="text-[#d1ddeb] text-xs mb-0.5">هاتف جدة</p>
                <a href="tel:920028911" className="text-white text-sm" dir="ltr">
                  920028911
                </a>
              </div>
              <div>
                <p className="text-[#d1ddeb] text-xs mb-0.5">هاتف القاهرة</p>
                <a href="tel:2011731149" className="text-white text-sm" dir="ltr">
                  2011731149
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-[#d1ddeb] text-xs">
            © 2025 النبراس لإدارة المرافق. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  )
}