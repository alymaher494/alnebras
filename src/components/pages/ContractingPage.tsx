'use client'

import AnimatedSection from '@/components/shared/AnimatedSection'
import { Card, CardContent } from '@/components/ui/card'
import { Construction } from 'lucide-react'

export default function ContractingPage() {
  return (
    <div className="pt-20 md:pt-24">
      <section className="py-16 md:py-24 bg-white min-h-[60vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimatedSection>
            <Card className="border-0 shadow-md max-w-2xl mx-auto">
              <CardContent className="p-10 md:p-16 text-center">
                <div className="w-20 h-20 bg-[#e8eef5] rounded-2xl flex items-center justify-center mx-auto mb-8">
                  <Construction className="w-10 h-10 text-[#012b67]" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#012b67] mb-4">
                  المقاولات العامة
                </h1>
                <div className="accent-line accent-line-center mb-6" />
                <p className="text-[#6b7280] text-lg leading-relaxed mb-2">
                  قريباً
                </p>
                <p className="text-[#374151] text-base leading-relaxed max-w-md mx-auto">
                  نعمل على تطوير قسم المقاولات العامة لتقديم خدمات متكاملة تشمل
                  الأعمال الإنشائية والتشطيبات والمشاريع الكبرى. تابعونا لمعرفة
                  آخر التحديثات.
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}