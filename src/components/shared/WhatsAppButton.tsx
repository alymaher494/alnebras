'use client'

import { useNavigationStore } from '@/lib/store'

export default function WhatsAppButton() {
  const { language } = useNavigationStore()
  
  // WhatsApp Link using the official branch phone number
  const whatsappNumber = '966920028911'
  const whatsappUrl = `https://wa.me/${whatsappNumber}`

  return (
    <div className="fixed bottom-6 left-6 z-50 select-none">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="WhatsApp"
      >
        {/* Pulse Animations */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping opacity-75" />
        <span className="absolute inset-0 rounded-full bg-[#25D366]/20 animate-pulse" />

        {/* WhatsApp Icon SVG */}
        <svg
          className="w-7 h-7 relative z-10"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437 0 9.862-4.386 9.866-9.78.002-2.613-1.006-5.07-2.842-6.91-1.837-1.84-4.285-2.855-6.902-2.856-5.443 0-9.87 4.386-9.873 9.782 0 1.638.483 3.24 1.398 4.636l-.993 3.626 3.721-.953zm10.745-6.208c-.28-.14-1.65-.81-1.902-.9-.253-.09-.438-.14-.623.14-.184.28-.713.9-.874 1.09-.16.19-.32.21-.6.07-1.077-.54-1.879-.99-2.62-2.27-.19-.33.19-.31.54-1.01.06-.12.03-.23-.01-.33-.05-.1-.438-1.06-.6-1.45-.16-.385-.333-.332-.457-.332-.12 0-.256-.01-.392-.01-.136 0-.356.05-.543.25-.187.2-.713.7-7.13.7s-.527.4-.527.7.356 1.09.438 1.2c.08.11 1.6 2.44 3.88 3.42.54.23 1.06.4 1.42.52.54.17 1.03.15 1.42.09.43-.06 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.32-.07-.12-.25-.19-.53-.33z" />
        </svg>

        {/* Hover Tooltip tooltip */}
        <span className="absolute right-16 bg-[#011a45]/95 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          {language === 'ar' ? 'تواصل معنا عبر واتساب' : 'Chat with us on WhatsApp'}
        </span>
      </a>
    </div>
  )
}
