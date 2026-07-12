import type { Metadata } from 'next'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import './globals.css'

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: '--font-ibm-plex-arabic',
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'النبراس لإدارة المرافق',
  description:
    'النبراس لإدارة المرافق - حلول ذكية ومتخصصة في إدارة المرافق وعملياتها وصيانتها عبر مجموعة واسعة من القطاعات في المملكة العربية السعودية ومصر.',
  keywords: [
    'النبراس',
    'إدارة المرافق',
    'صيانة المنشآت',
    'خدمات التنظيف',
    'السعودية',
    'جدة',
    'مصر',
  ],
  openGraph: {
    title: 'النبراس لإدارة المرافق',
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
      <body className={`${ibmPlexArabic.variable} antialiased`}>
        <main className="min-h-screen flex flex-col">{children}</main>
      </body>
    </html>
  )
}