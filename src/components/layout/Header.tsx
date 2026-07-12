'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'
import { useNavigationStore, type PageName } from '@/lib/store'

const navItems: { label: string; page: PageName }[] = [
  { label: 'الرئيسية', page: 'home' },
  { label: 'من نحن', page: 'about' },
  { label: 'إدارة المرافق', page: 'services' },
  { label: 'المركز الإعلامي', page: 'media-center' },
  { label: 'الوظائف', page: 'careers' },
  { label: 'الفعاليات', page: 'events' },
  { label: 'بوابة الموردين', page: 'supplier-portal' },
  { label: 'تواصل معنا', page: 'contact' },
]

export default function Header() {
  const {
    currentPage,
    setCurrentPage,
    isMobileMenuOpen,
    closeMobileMenu,
    toggleMobileMenu,
  } = useNavigationStore()
  const [scrolled, setScrolled] = useState(false)
  const isTransparent = currentPage === 'home' && !scrolled

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/97 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* Logo */}
          <button
            onClick={() => setCurrentPage('home')}
            className="flex-shrink-0 transition-opacity duration-300"
            aria-label="النبراس لإدارة المرافق"
          >
            {isTransparent ? (
              <Image
                src="/logo.svg"
                alt="النبراس"
                width={140}
                height={48}
                className="h-10 md:h-11 w-auto object-contain brightness-0 invert"
                priority
              />
            ) : (
              <Image
                src="/logo.png"
                alt="النبراس"
                width={140}
                height={48}
                className="h-10 md:h-11 w-auto object-contain"
                priority
              />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5" role="navigation">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className={`nav-link px-3 py-2 text-[13px] font-medium transition-colors ${
                  currentPage === item.page
                    ? isTransparent
                      ? 'text-white active'
                      : 'text-[#012b67] active'
                    : isTransparent
                      ? 'text-white/80 hover:text-white'
                      : 'text-[#374151] hover:text-[#012b67]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop: Language Switch */}
          <div className="hidden lg:flex items-center gap-1.5">
            <button
              className={`text-xs font-bold px-3 py-1.5 rounded-md transition-all duration-300 ${
                isTransparent
                  ? 'bg-white/15 text-white hover:bg-white/25'
                  : 'bg-[#012b67] text-white hover:bg-[#011d47]'
              }`}
            >
              AR
            </button>
            <button
              className={`text-xs font-medium px-3 py-1.5 rounded-md transition-all duration-300 ${
                isTransparent
                  ? 'text-white/60 hover:text-white hover:bg-white/10'
                  : 'text-[#6b7280] hover:bg-[#f3f4f6]'
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile Menu */}
          <Sheet
            open={isMobileMenuOpen}
            onOpenChange={(open) =>
              open ? toggleMobileMenu() : closeMobileMenu()
            }
          >
            <SheetTrigger asChild>
              <button
                className={`lg:hidden p-2 rounded-md transition-colors ${
                  isTransparent
                    ? 'text-white hover:bg-white/10'
                    : 'text-[#012b67] hover:bg-[#f3f4f6]'
                }`}
                aria-label="فتح القائمة"
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[340px] p-0">
              <SheetTitle className="sr-only">القائمة الرئيسية</SheetTitle>
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-5 border-b border-[#e5e7eb]">
                  <Image
                    src="/logo.png"
                    alt="النبراس"
                    width={120}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                  <SheetClose asChild>
                    <button
                      className="p-2 text-[#374151] hover:bg-[#f3f4f6] rounded-md"
                      aria-label="إغلاق القائمة"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </SheetClose>
                </div>

                {/* Mobile Nav Items */}
                <nav className="flex-1 overflow-y-auto py-3">
                  {navItems.map((item) => (
                    <button
                      key={item.page}
                      onClick={() => setCurrentPage(item.page)}
                      className={`w-full text-right px-6 py-3.5 text-[15px] font-medium transition-all duration-200 ${
                        currentPage === item.page
                          ? 'text-[#012b67] bg-[#e8eef5] border-l-4 border-l-[#012b67]'
                          : 'text-[#374151] hover:text-[#012b67] hover:bg-[#f9fafb]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>

                {/* Mobile Footer: Language */}
                <div className="p-5 border-t border-[#e5e7eb] flex items-center gap-2">
                  <button className="text-sm font-bold text-[#012b67] bg-[#e8eef5] px-5 py-2.5 rounded-lg">
                    AR
                  </button>
                  <button className="text-sm font-medium text-[#6b7280] px-5 py-2.5 rounded-lg hover:bg-[#f3f4f6]">
                    EN
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}