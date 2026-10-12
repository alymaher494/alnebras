import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import './globals.css'
import WhatsAppButton from '@/components/shared/WhatsAppButton'

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://alnebras.com'),
  title: {
    default: 'شركة النبراس لإدارة المرافق',
    template: '%s | شركة النبراس لإدارة المرافق',
  },
  description:
    'شركة النبراس لإدارة المرافق - حلول ذكية ومتخصصة في إدارة المرافق وعملياتها وصيانتها عبر مجموعة واسعة من القطاعات في المملكة العربية السعودية ومصر.',
  keywords: [
    'شركة النبراس',
    'إدارة المرافق',
    'صيانة المنشآت',
    'خدمات التنظيف',
    'السعودية',
    'جدة',
    'مصر',
  ],
  openGraph: {
    title: 'شركة النبراس لإدارة المرافق',
    description:
      'حلول ذكية ومتخصصة في إدارة المرافق وعملياتها وصيانتها',
    type: 'website',
    locale: 'ar_SA',
    siteName: 'شركة النبراس لإدارة المرافق',
    images: ['/logo.webp'],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.variable} antialiased`}>
        <main className="min-h-screen flex flex-col">{children}</main>
        <WhatsAppButton />
      </body>
    </html>
  )
}