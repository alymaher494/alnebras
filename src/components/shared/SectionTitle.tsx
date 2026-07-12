'use client'

import AnimatedSection from './AnimatedSection'

interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'center' | 'start'
}

export default function SectionTitle({
  title,
  subtitle,
  align = 'center',
}: SectionTitleProps) {
  const isCenter = align === 'center'

  return (
    <AnimatedSection className={`mb-12 ${isCenter ? 'text-center' : 'text-right'}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-[#012b67] mb-4">
        {title}
      </h2>
      <div
        className={`accent-line ${isCenter ? 'accent-line-center' : ''}`}
      />
      {subtitle && (
        <p className="text-[#6b7280] text-lg mt-4 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  )
}