'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { useNavigationStore } from '@/lib/store'

function SaudiFlag({ className = 'w-5 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={`${className} rounded-[2px] flex-shrink-0`} aria-hidden="true">
      <rect width="20" height="14" fill="#006c35" />
      <path d="M4 4.6h12" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M6.5 7.2h7" stroke="#fff" strokeWidth="1.1" strokeLinecap="round" opacity="0.9" />
      <path d="M5 10.4h10l-1.2-1 1.2-1H5z" fill="#fff" />
    </svg>
  )
}

function UKFlag({ className = 'w-5 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={`${className} rounded-[2px] flex-shrink-0`} aria-hidden="true">
      <rect width="20" height="14" fill="#012169" />
      <path d="M0 0l20 14M20 0L0 14" stroke="#fff" strokeWidth="2.6" />
      <path d="M0 0l20 14M20 0L0 14" stroke="#C8102E" strokeWidth="1.1" />
      <path d="M10 0v14M0 7h20" stroke="#fff" strokeWidth="4.2" />
      <path d="M10 0v14M0 7h20" stroke="#C8102E" strokeWidth="2.4" />
    </svg>
  )
}

export default function LanguageSwitcher() {
  const { language, setLanguage } = useNavigationStore()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const options = [
    { value: 'ar' as const, label: 'العربية', flag: <SaudiFlag /> },
    { value: 'en' as const, label: 'English', flag: <UKFlag /> },
  ]
  const current = options.find((o) => o.value === language) ?? options[0]

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={language === 'ar' ? 'تغيير اللغة' : 'Change language'}
        className="flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-lg text-[#012b67] hover:bg-[#f3f4f6] border border-[#e5e7eb] transition-colors"
      >
        {current.flag}
        <span>{current.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#6b7280] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute top-full mt-2 min-w-[160px] end-0 bg-white rounded-xl shadow-[0_12px_40px_rgba(1,43,103,0.18)] border border-[#e5e7eb] p-1.5 z-50"
        >
          {options.map((o) => (
            <button
              key={o.value}
              role="option"
              aria-selected={o.value === language}
              onClick={() => {
                setLanguage(o.value)
                setOpen(false)
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                o.value === language
                  ? 'bg-[#e8eef5] text-[#012b67]'
                  : 'text-[#374151] hover:bg-[#f9fafb]'
              }`}
            >
              {o.flag}
              <span className="flex-1 text-start">{o.label}</span>
              {o.value === language && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
