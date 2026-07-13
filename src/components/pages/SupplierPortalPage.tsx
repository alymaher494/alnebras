'use client'

import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react'
import { Upload, Send, Loader2, FileText, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import AnimatedSection from '@/components/shared/AnimatedSection'
import SectionTitle from '@/components/shared/SectionTitle'
import { toast } from 'sonner'
import { useNavigationStore } from '@/lib/store'
import { useTranslation } from '@/lib/translations'

export default function SupplierPortalPage() {
  const { language } = useNavigationStore()
  const { t } = useTranslation(language)
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [fileName, setFileName] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.url) {
        setFileUrl(data.url)
        setFileName(file.name)
        toast.success(language === 'ar' ? 'تم رفع الملف بنجاح' : 'File uploaded successfully')
      } else {
        toast.error(language === 'ar' ? 'فشل في رفع الملف' : 'Failed to upload file')
      }
    } catch {
      toast.error(language === 'ar' ? 'حدث خطأ أثناء رفع الملف' : 'Error uploading file')
    } finally {
      setUploading(false)
    }
  }

  const removeFile = () => {
    setFileUrl('')
    setFileName('')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.company || !form.phone || !form.email) {
      toast.error(t('error_fill_fields'))
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/supplier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, fileUrl }),
      })
      if (res.ok) {
        toast.success(language === 'ar' ? 'تم إرسال طلبكم بنجاح' : 'Request sent successfully')
        setForm({ name: '', company: '', phone: '', email: '', message: '' })
        removeFile()
      } else {
        toast.error(language === 'ar' ? 'حدث خطأ أثناء إرسال الطلب' : 'Error sending request')
      }
    } catch {
      toast.error(language === 'ar' ? 'حدث خطأ أثناء إرسال الطلب' : 'Error sending request')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="pt-20 md:pt-24" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={t('supplier-portal')}
            subtitle={language === 'ar' ? 'ندعوكم للتسجيل في قاعدة موردينا والانضمام لشراكتنا' : 'We invite you to register in our supplier database and join our partnership.'}
          />

          <AnimatedSection>
            <Card className="border-0 shadow-md max-w-3xl mx-auto">
              <CardContent className="p-6 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="s-name">
                        {t('name')} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="s-name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder={t('name')}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="s-company">
                        {language === 'ar' ? 'اسم الشركة' : 'Company Name'} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="s-company"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder={language === 'ar' ? 'اسم الشركة' : 'Company Name'}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="s-phone">
                        {t('phone')} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="s-phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="05xxxxxxxx"
                        dir="ltr"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="s-email">
                        {t('email')} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="s-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="example@company.com"
                        dir="ltr"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s-message">{t('message')}</Label>
                    <Textarea
                      id="s-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder={language === 'ar' ? 'أي تفاصيل إضافية...' : 'Any additional details...'}
                      rows={4}
                    />
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <Label>{language === 'ar' ? 'رفع ملف (اختياري)' : 'Upload File (Optional)'}</Label>
                    {fileName ? (
                      <div className="flex items-center justify-between bg-[#f9fafb] border border-[#e5e7eb] rounded-lg px-4 py-3">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-[#012b67]" />
                          <span className="text-sm text-[#374151] truncate max-w-[200px]">
                            {fileName}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="text-[#6b7280] hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex items-center justify-center gap-2 border-2 border-dashed border-[#d1d5db] rounded-lg px-4 py-6 cursor-pointer hover:border-[#012b67] hover:bg-[#f9fafb] transition-colors">
                        {uploading ? (
                          <Loader2 className="w-5 h-5 animate-spin text-[#012b67]" />
                        ) : (
                          <Upload className="w-5 h-5 text-[#6b7280]" />
                        )}
                        <span className="text-sm text-[#6b7280]">
                          {uploading 
                            ? (language === 'ar' ? 'جارٍ الرفع...' : 'Uploading...') 
                            : (language === 'ar' ? 'اختر ملفاً للرفع' : 'Choose file to upload')}
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleFileUpload}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />
                      </label>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto bg-[#012b67] hover:bg-[#011d47] text-white font-semibold px-10 py-3"
                  >
                    {submitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {language === 'ar' ? 'إرسال الطلب' : 'Submit Request'}
                        <Send className={`h-4 w-4 ${language === 'ar' ? 'mr-2' : 'ml-2'}`} />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}