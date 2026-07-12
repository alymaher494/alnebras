# Task 4 - frontend

## Summary
Built the entire frontend for Alnebras Facilities Management corporate website as a single-page application with Zustand-based client-side routing.

## Files Created (16 files)

### Core
- `src/app/globals.css` - Complete CSS with brand colors, animations, RTL, scrollbar
- `src/lib/store.ts` - Zustand store for navigation state
- `src/app/layout.tsx` - Root layout with IBM Plex Sans Arabic, RTL, metadata
- `src/app/page.tsx` - Main page with AnimatePresence routing and lazy loading

### Shared Components
- `src/components/shared/AnimatedSection.tsx` - Scroll-triggered fade-up animation
- `src/components/shared/SectionTitle.tsx` - Reusable section header

### Layout Components
- `src/components/layout/Header.tsx` - PIF-inspired sticky nav with mobile Sheet
- `src/components/layout/Footer.tsx` - 4-column dark navy footer

### Page Components
- `src/components/pages/HomePage.tsx` - Hero, about, vision, values, services, partners, branches, CEO
- `src/components/pages/ServicesPage.tsx` - All 16 services grid
- `src/components/pages/ContractingPage.tsx` - Coming soon placeholder
- `src/components/pages/ContactPage.tsx` - Contact form with toast feedback
- `src/components/pages/SupplierPortalPage.tsx` - Supplier form with file upload
- `src/components/pages/CareersPage.tsx` - Job listings
- `src/components/pages/EventsPage.tsx` - Event cards
- `src/components/pages/MediaCenterPage.tsx` - Tabbed media (news/photos/events)

## Key Decisions
- `next/font/google` instead of CSS @import (avoids Tailwind v4 @import ordering)
- Lazy loading all page components for performance
- Framer Motion AnimatePresence for page transitions
- shadcn/ui Sheet, Tabs, Cards used throughout
- No emojis, no indigo/blue, pure RTL Arabic layout