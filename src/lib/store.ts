import { create } from 'zustand'

export type PageName =
  | 'home'
  | 'services'
  | 'contracting'
  | 'media-center'
  | 'careers'
  | 'events'
  | 'supplier-portal'
  | 'contact'

export type MediaSubPage = 'all' | 'news' | 'photos' | 'events'

interface NavigationState {
  currentPage: PageName
  isMobileMenuOpen: boolean
  isMediaSubPage: MediaSubPage
  setCurrentPage: (page: PageName) => void
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  setMediaSubPage: (sub: MediaSubPage) => void
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentPage: 'home',
  isMobileMenuOpen: false,
  isMediaSubPage: 'all',
  setCurrentPage: (page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    set({ currentPage: page, isMobileMenuOpen: false })
  },
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  setMediaSubPage: (sub) => set({ isMediaSubPage: sub }),
}))