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
  { label: 'إدارة المرافق', page: 'services' },
  { label: 'المقاولات العامة', page: 'contracting' },
  { label: 'المركز الإعلامي', page: 'media-center' },
  { label: 'الوظائف', page: 'careers' },
  { label: 'الفعاليات', page: 'events' },
  { label: 'بوابة الموردين', page: 'supplier-portal' },
  { label: 'تواصل معنا', page: 'contact' },
]

export default function Header() {
  const { currentPage, setCurrentPage, isMobileMenuOpen, closeMobileMenu, toggleMobileMenu } =
    useNavigationStore()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'border-b border-[#e5e7eb]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => setCurrentPage('home')}
            className="flex-shrink-0"
            aria-label="النبراس لإدارة المرافق"
          >
            <Image
              src="/logo.png"
              alt="النبراس"
              width={140}
              height={48}
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className={`nav-link px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === item.page
                    ? 'text-[#012b67] active'
                    : 'text-[#374151] hover:text-[#012b67]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop: Language Switch */}
          <div className="hidden lg:flex items-center gap-2">
            <button className="text-sm font-semibold text-[#012b67] bg-[#e8eef5] px-3 py-1.5 rounded-md">
              AR
            </button>
            <button className="text-sm font-medium text-[#6b7280] px-3 py-1.5 rounded-md hover:bg-[#f3f4f6] transition-colors">
              EN
            </button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={(open) => open ? toggleMobileMenu() : closeMobileMenu()}>
            <SheetTrigger asChild>
              <button
                className="lg:hidden p-2 text-[#012b67] hover:bg-[#f3f4f6] rounded-md transition-colors"
                aria-label="فتح القائمة"
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0">
              <SheetTitle className="sr-only">القائمة الرئيسية</SheetTitle>
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-[#e5e7eb]">
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
                <nav className="flex-1 overflow-y-auto py-4">
                  {navItems.map((item) => (
                    <button
                      key={item.page}
                      onClick={() => setCurrentPage(item.page)}
                      className={`w-full text-right px-6 py-3.5 text-base font-medium transition-colors ${
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
                <div className="p-4 border-t border-[#e5e7eb] flex items-center gap-2">
                  <button className="text-sm font-semibold text-[#012b67] bg-[#e8eef5] px-4 py-2 rounded-md">
                    AR
                  </button>
                  <button className="text-sm font-medium text-[#6b7280] px-4 py-2 rounded-md hover:bg-[#f3f4f6]">
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