import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import './globals.css'
import WhatsAppButton from '@/components/shared/WhatsAppButton'

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'شركة النبراس لإدارة المرافق',
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