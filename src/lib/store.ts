import { create } from 'zustand'

export type PageName =
  | 'home'
  | 'about'
  | 'services'
  | 'contracting'
  | 'media-center'
  | 'careers'
  | 'events'
  | 'supplier-portal'
  | 'contact'
  | 'partners'

export type MediaSubPage = 'all' | 'news' | 'photos' | 'events'

interface NavigationState {
  currentPage: PageName
  isMobileMenuOpen: boolean
  isMediaSubPage: MediaSubPage
  isHeroTransparent: boolean
  language: 'ar' | 'en'
  setCurrentPage: (page: PageName) => void
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  setMediaSubPage: (sub: MediaSubPage) => void
  setHeroTransparent: (v: boolean) => void
  setLanguage: (lang: 'ar' | 'en') => void
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentPage: 'home',
  isMobileMenuOpen: false,
  isMediaSubPage: 'all',
  isHeroTransparent: true,
  language: 'ar',
  setCurrentPage: (page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    set({ currentPage: page, isMobileMenuOpen: false })
  },
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  setMediaSubPage: (sub) => set({ isMediaSubPage: sub }),
  setHeroTransparent: (v: boolean) => set({ isHeroTransparent: v }),
  setLanguage: (lang) => {
    // Dynamically adjust html dir and lang attribute
    if (typeof document !== 'undefined') {
      const html = document.documentElement
      html.setAttribute('lang', lang)
      html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
    }
    set({ language: lang })
  },
}))