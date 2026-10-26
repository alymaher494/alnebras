'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { serviceIcons } from '@/lib/service-icons'

interface ServiceIconPickerProps {
  value: string
  onChange: (value: string) => void
}

export default function ServiceIconPicker({ value, onChange }: ServiceIconPickerProps) {
  const [query, setQuery] = useState('')
  const filteredIcons = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    if (!normalizedQuery) return serviceIcons
    return serviceIcons.filter((item) =>
      `${item.name} ${item.labelAr} ${item.labelEn}`.toLocaleLowerCase().includes(normalizedQuery),
    )
  }, [query])

  return (
    <div className="space-y-3">
      <label htmlFor="service-icon-search" className="text-xs font-bold text-gray-500">
        أيقونة الخدمة
      </label>
      <div className="relative">
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          id="service-icon-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="ابحث باسم الأيقونة أو معناها"
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pr-10 pl-4 text-sm focus:border-[#012b67] focus:outline-none"
        />
      </div>
      <div className="grid max-h-52 grid-cols-3 gap-2 overflow-y-auto rounded-xl border border-gray-100 bg-gray-50 p-2 sm:grid-cols-4">
        {filteredIcons.map(({ name, labelAr, icon: Icon }) => {
          const selected = value === name
          return (
            <button
              key={name}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(name)}
              className={`flex min-h-16 flex-col items-center justify-center gap-1 rounded-lg border p-2 text-center transition-colors ${
                selected
                  ? 'border-[#012b67] bg-white text-[#012b67] shadow-sm'
                  : 'border-transparent bg-white text-gray-600 hover:border-gray-200 hover:text-[#012b67]'
              }`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span className="text-[10px] leading-tight">{labelAr}</span>
            </button>
          )
        })}
        {filteredIcons.length === 0 && (
          <p className="col-span-full py-4 text-center text-xs text-gray-500">لا توجد أيقونات مطابقة</p>
        )}
      </div>
      <p className="text-[11px] text-gray-400">الأيقونة المختارة: {value || 'Sparkles'}</p>
    </div>
  )
}
