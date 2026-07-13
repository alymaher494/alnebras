'use client'

import { lazy, Suspense, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'sonner'
import { useNavigationStore } from '@/lib/store'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Skeleton } from '@/components/ui/skeleton'

const HomePage = lazy(() => import('@/components/pages/HomePage'))
const ServicesPage = lazy(() => import('@/components/pages/ServicesPage'))
const ContractingPage = lazy(() => import('@/components/pages/ContractingPage'))
const MediaCenterPage = lazy(() => import('@/components/pages/MediaCenterPage'))
const CareersPage = lazy(() => import('@/components/pages/CareersPage'))
const EventsPage = lazy(() => import('@/components/pages/EventsPage'))
const SupplierPortalPage = lazy(() => import('@/components/pages/SupplierPortalPage'))
const ContactPage = lazy(() => import('@/components/pages/ContactPage'))
const AboutPage = lazy(() => import('@/components/pages/AboutPage'))
const PartnersPage = lazy(() => import('@/components/pages/PartnersPage'))

function PageSkeleton() {
  return (
    <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <Skeleton className="h-10 w-64 mx-auto" />
      <Skeleton className="h-1 w-16 mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Skeleton className="h-48 rounded-lg" />
        <Skeleton className="h-48 rounded-lg" />
        <Skeleton className="h-48 rounded-lg" />
      </div>
    </div>
  )
}

const pageComponents: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  home: HomePage,
  services: ServicesPage,
  contracting: ContractingPage,
  'media-center': MediaCenterPage,
  careers: CareersPage,
  events: EventsPage,
  'supplier-portal': SupplierPortalPage,
  contact: ContactPage,
  about: AboutPage,
  partners: PartnersPage,
}

export default function Home() {
  const { currentPage, language } = useNavigationStore()
  const PageComponent = pageComponents[currentPage] || HomePage

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const html = document.documentElement
      html.setAttribute('lang', language)
      html.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr')
    }
  }, [language])

  return (
    <>
      <Header />
      <Toaster position="top-center" richColors dir="rtl" />
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Suspense fallback={<PageSkeleton />}>
              <PageComponent />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer />
    </>
  )
}