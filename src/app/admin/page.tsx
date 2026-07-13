'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  LayoutDashboard,
  ConciergeBell,
  Settings,
  Mail,
  UserCheck,
  Briefcase,
  Calendar,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle,
  AlertCircle,
  FileText,
  Eye,
  X
} from 'lucide-react'

// Types matching database schema
interface Service {
  id: string
  titleAr: string
  titleEn: string
  descriptionAr: string
  descriptionEn: string
  icon: string
  image: string
  order: number
  isActive: boolean
}

interface Partner {
  id: string
  name: string
  logo: string
  order: number
  isActive: boolean
}

interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  createdAt: string
}

interface SupplierRequest {
  id: string
  name: string
  company: string
  phone: string
  email: string
  message: string
  fileUrl: string
  createdAt: string
}

interface JobListing {
  id: string
  titleAr: string
  titleEn: string
  departmentAr: string
  departmentEn: string
  locationAr: string
  locationEn: string
  type: string
  descriptionAr: string
  descriptionEn: string
  isActive: boolean
}

interface EventItem {
  id: string
  titleAr: string
  titleEn: string
  descriptionAr: string
  descriptionEn: string
  image: string
  eventDate: string
  locationAr: string
  locationEn: string
  isActive: boolean
}

export default function AdminDashboard() {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)
  const [authChecking, setAuthChecking] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'settings' | 'contacts' | 'suppliers' | 'jobs' | 'events'>('overview')

  // Data states
  const [services, setServices] = useState<Service[]>([])
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [contacts, setContacts] = useState<ContactMessage[]>([])
  const [suppliers, setSuppliers] = useState<SupplierRequest[]>([])
  const [jobs, setJobs] = useState<JobListing[]>([])
  const [events, setEvents] = useState<EventItem[]>([])
  const [partners, setPartners] = useState<Partner[]>([])

  // Modal / Form States
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null)
  const [showJobModal, setShowJobModal] = useState(false)
  const [editingJob, setEditingJob] = useState<Partial<JobListing> | null>(null)
  const [showEventModal, setShowEventModal] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Partial<EventItem> | null>(null)

  // Status Alerts
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch('/api/auth/session')
        if (res.ok) {
          setAuthenticated(true)
          fetchDashboardData()
        } else {
          router.push('/admin/login')
        }
      } catch {
        router.push('/admin/login')
      } finally {
        setAuthChecking(false)
      }
    }
    checkSession()
  }, [])

  const triggerAlert = (message: string, type: 'success' | 'error') => {
    setAlert({ message, type })
    setTimeout(() => setAlert(null), 4000)
  }

  const fetchDashboardData = async () => {
    try {
      const [srvRes, setRes, conRes, supRes, jobRes, evtRes, partRes] = await Promise.all([
        fetch('/api/services?all=true'),
        fetch('/api/settings'),
        fetch('/api/contact'),
        fetch('/api/supplier'),
        fetch('/api/jobs?all=true'),
        fetch('/api/events?all=true'),
        fetch('/api/partners?all=true')
      ])

      if (srvRes.ok) setServices(await srvRes.json())
      if (setRes.ok) setSettings(await setRes.json())
      if (conRes.ok) setContacts(await conRes.json())
      if (supRes.ok) setSuppliers(await supRes.json())
      if (jobRes.ok) setJobs(await jobRes.json())
      if (evtRes.ok) setEvents(await evtRes.json())
      if (partRes.ok) setPartners(await partRes.json())
    } catch (err) {
      triggerAlert('حدث خطأ أثناء تحميل البيانات', 'error')
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  // ──────────── Services Handlers ────────────
  const saveService = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingService) return

    const method = editingService.id ? 'PUT' : 'POST'
    const url = editingService.id ? `/api/services/${editingService.id}` : '/api/services'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingService)
      })

      if (res.ok) {
        triggerAlert('تم حفظ الخدمة بنجاح', 'success')
        setShowServiceModal(false)
        setEditingService(null)
        fetchDashboardData()
      } else {
        const d = await res.json()
        triggerAlert(d.error || 'فشل في حفظ الخدمة', 'error')
      }
    } catch {
      triggerAlert('حدث خطأ في الاتصال بالخادم', 'error')
    }
  }

  const deleteService = async (id: string) => {
    if (!confirm('هل أنت متأكد من رغبتك في حذف هذه الخدمة؟')) return
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' })
      if (res.ok) {
        triggerAlert('تم حذف الخدمة بنجاح', 'success')
        fetchDashboardData()
      } else {
        triggerAlert('فشل في حذف الخدمة', 'error')
      }
    } catch {
      triggerAlert('حدث خطأ في الاتصال بالخادم', 'error')
    }
  }

  // ──────────── Settings Handlers ────────────
  const handleSettingChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const saveSettings = async () => {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })

      if (res.ok) {
        triggerAlert('تم حفظ إعدادات الموقع بنجاح', 'success')
      } else {
        triggerAlert('فشل في حفظ الإعدادات', 'error')
      }
    } catch {
      triggerAlert('حدث خطأ في الاتصال بالخادم', 'error')
    }
  }

  // ──────────── Jobs Handlers ────────────
  const saveJob = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingJob) return

    const method = editingJob.id ? 'PUT' : 'POST'
    const url = editingJob.id ? `/api/jobs/${editingJob.id}` : '/api/jobs'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingJob)
      })

      if (res.ok) {
        triggerAlert('تم حفظ الوظيفة بنجاح', 'success')
        setShowJobModal(false)
        setEditingJob(null)
        fetchDashboardData()
      } else {
        triggerAlert('فشل في حفظ الوظيفة', 'error')
      }
    } catch {
      triggerAlert('حدث خطأ في الاتصال بالخادم', 'error')
    }
  }

  const deleteJob = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الوظيفة؟')) return
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: 'DELETE' })
      if (res.ok) {
        triggerAlert('تم حذف الوظيفة بنجاح', 'success')
        fetchDashboardData()
      }
    } catch {
      triggerAlert('خطأ في الاتصال', 'error')
    }
  }

  // ──────────── Events Handlers ────────────
  const saveEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingEvent) return

    const method = editingEvent.id ? 'PUT' : 'POST'
    const url = editingEvent.id ? `/api/events/${editingEvent.id}` : '/api/events'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingEvent)
      })

      if (res.ok) {
        triggerAlert('تم حفظ الفعالية بنجاح', 'success')
        setShowEventModal(false)
        setEditingEvent(null)
        fetchDashboardData()
      }
    } catch {
      triggerAlert('خطأ في الاتصال بالخادم', 'error')
    }
  }

  const deleteEvent = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الفعالية؟')) return
    try {
      const res = await fetch(`/api/events/${id}`, { method: 'DELETE' })
      if (res.ok) {
        triggerAlert('تم حذف الفعالية', 'success')
        fetchDashboardData()
      }
    } catch {
      triggerAlert('خطأ في الاتصال', 'error')
    }
  }

  // ──────────── Inbox Handlers ────────────
  const deleteContact = async (id: string) => {
    if (!confirm('هل أنت متأكد من رغبتك في حذف الرسالة؟')) return
    try {
      const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' })
      if (res.ok) {
        triggerAlert('تم حذف الرسالة', 'success')
        fetchDashboardData()
      }
    } catch {
      triggerAlert('خطأ في الاتصال', 'error')
    }
  }

  const deleteSupplier = async (id: string) => {
    if (!confirm('هل أنت متأكد من رغبتك في حذف هذا الطلب؟')) return
    try {
      const res = await fetch(`/api/supplier/${id}`, { method: 'DELETE' })
      if (res.ok) {
        triggerAlert('تم حذف طلب المورد', 'success')
        fetchDashboardData()
      }
    } catch {
      triggerAlert('خطأ في الاتصال', 'error')
    }
  }

  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#011a45] flex items-center justify-center text-white text-lg">
        جاري التحقق من صلاحيات الدخول...
      </div>
    )
  }

  if (!authenticated) return null

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col md:flex-row text-right" dir="rtl">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#011a45] text-white flex flex-col p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-8 pb-5 border-b border-white/10 select-none">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#011a45] font-bold text-lg">ن</div>
          <div>
            <h1 className="font-bold text-sm tracking-wide">النبراس لإدارة المرافق</h1>
            <span className="text-[10px] text-gray-400">لوحة الإدارة والمحتوى</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'overview' ? 'bg-[#012b67] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>نظرة عامة</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'services' ? 'bg-[#012b67] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <ConciergeBell className="w-5 h-5" />
            <span>الخدمات</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'settings' ? 'bg-[#012b67] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>إعدادات الموقع</span>
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'contacts' ? 'bg-[#012b67] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <Mail className="w-5 h-5" />
            <span>الرسائل الواردة</span>
            {contacts.length > 0 && (
              <span className="mr-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {contacts.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('suppliers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'suppliers' ? 'bg-[#012b67] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <UserCheck className="w-5 h-5" />
            <span>طلبات الموردين</span>
            {suppliers.length > 0 && (
              <span className="mr-auto bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {suppliers.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'jobs' ? 'bg-[#012b67] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span>الوظائف الشاغرة</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'events' ? 'bg-[#012b67] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>الفعاليات والأخبار</span>
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-300 hover:bg-red-950/20 mt-auto pt-5 border-t border-white/10"
        >
          <LogOut className="w-5 h-5" />
          <span>تسجيل الخروج</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-h-screen overflow-y-auto">
        
        {/* Floating Notifications */}
        {alert && (
          <div className={`fixed top-5 left-5 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl border animate-slide-in ${
            alert.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            {alert.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="text-sm font-semibold">{alert.message}</span>
          </div>
        )}

        {/* ──────────── TAB 1: OVERVIEW ──────────── */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[#012b67]">مرحباً بك في لوحة التحكم</h2>
              <p className="text-gray-500 text-sm mt-1">نظرة عامة على البيانات وحالة الاستجابة في الموقع</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-gray-400 text-xs font-semibold block">إجمالي الخدمات</span>
                  <span className="text-3xl font-bold text-[#012b67] mt-1 block">{services.length}</span>
                </div>
                <div className="w-12 h-12 bg-blue-50 text-[#012b67] rounded-xl flex items-center justify-center">
                  <ConciergeBell className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-gray-400 text-xs font-semibold block">رسائل التواصل</span>
                  <span className="text-3xl font-bold text-[#012b67] mt-1 block">{contacts.length}</span>
                </div>
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-gray-400 text-xs font-semibold block">طلبات الموردين</span>
                  <span className="text-3xl font-bold text-[#012b67] mt-1 block">{suppliers.length}</span>
                </div>
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                  <UserCheck className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-gray-400 text-xs font-semibold block">الوظائف النشطة</span>
                  <span className="text-3xl font-bold text-[#012b67] mt-1 block">{jobs.filter(j => j.isActive).length}</span>
                </div>
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Quick Inbox Preview */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-[#012b67] mb-4">آخر رسائل التواصل الواردة</h3>
              {contacts.length === 0 ? (
                <p className="text-gray-400 text-sm py-4">لا توجد رسائل واردة حالياً.</p>
              ) : (
                <div className="divide-y divide-gray-100">
                  {contacts.slice(0, 3).map(c => (
                    <div key={c.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-[#012b67] text-sm">{c.name}</h4>
                        <span className="text-xs text-gray-400 block mt-0.5">{c.email}</span>
                        <p className="text-gray-600 text-xs mt-2 leading-relaxed">{c.message}</p>
                      </div>
                      <span className="text-[10px] text-gray-400 whitespace-nowrap">
                        {new Date(c.createdAt).toLocaleDateString('ar-SA')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ──────────── TAB 2: SERVICES ──────────── */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#012b67]">إدارة الخدمات</h2>
                <p className="text-gray-500 text-sm mt-1">إضافة وتعديل الخدمات المعروضة على الموقع الرئيسي</p>
              </div>
              <button
                onClick={() => {
                  setEditingService({
                    titleAr: '',
                    titleEn: '',
                    descriptionAr: '',
                    descriptionEn: '',
                    icon: 'Sparkles',
                    image: '',
                    order: services.length + 1,
                    isActive: true
                  })
                  setShowServiceModal(true)
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#012b67] hover:bg-[#002150] text-white text-sm font-semibold rounded-xl transition-all shadow-md"
              >
                <Plus className="w-5 h-5" />
                <span>إضافة خدمة جديدة</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-400 text-xs font-semibold border-b border-gray-100">
                    <th className="p-4 w-16">الترتيب</th>
                    <th className="p-4">الخدمة (عربي)</th>
                    <th className="p-4">الخدمة (إنجليزي)</th>
                    <th className="p-4">الحالة</th>
                    <th className="p-4 text-left">التحكم</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {services.map(s => (
                    <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-semibold text-gray-500">{s.order}</td>
                      <td className="p-4 font-bold text-[#012b67]">{s.titleAr}</td>
                      <td className="p-4 text-gray-600">{s.titleEn || '-'}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          s.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {s.isActive ? 'نشطة' : 'معطلة'}
                        </span>
                      </td>
                      <td className="p-4 text-left flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingService(s)
                            setShowServiceModal(true)
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="تعديل"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteService(s.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ──────────── TAB 3: SETTINGS ──────────── */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="text-2xl font-bold text-[#012b67]">إعدادات الموقع</h2>
              <p className="text-gray-500 text-sm mt-1">تحديث محتوى الهوية، الرؤية، الرسالة، وبيانات التواصل الرئيسية</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
              
              {/* Hero Banner Texts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-[#012b67] text-xs font-bold">العنوان الرئيسي للهيرو (عربي)</label>
                  <input
                    type="text"
                    value={settings.hero_title_ar || ''}
                    onChange={(e) => handleSettingChange('hero_title_ar', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#012b67] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[#012b67] text-xs font-bold">العنوان الرئيسي للهيرو (إنجليزي)</label>
                  <input
                    type="text"
                    value={settings.hero_title_en || ''}
                    onChange={(e) => handleSettingChange('hero_title_en', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#012b67] transition-all"
                  />
                </div>
              </div>

              {/* Subtitles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-[#012b67] text-xs font-bold">الوصف الفرعي للهيرو (عربي)</label>
                  <textarea
                    rows={2}
                    value={settings.hero_subtitle_ar || ''}
                    onChange={(e) => handleSettingChange('hero_subtitle_ar', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#012b67] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[#012b67] text-xs font-bold">الوصف الفرعي للهيرو (إنجليزي)</label>
                  <textarea
                    rows={2}
                    value={settings.hero_subtitle_en || ''}
                    onChange={(e) => handleSettingChange('hero_subtitle_en', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#012b67] transition-all"
                  />
                </div>
              </div>

              {/* Vision & Mission */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-gray-100">
                <div className="space-y-2">
                  <label className="block text-[#012b67] text-xs font-bold">رؤية الشركة (عربي)</label>
                  <textarea
                    rows={3}
                    value={settings.vision_ar || ''}
                    onChange={(e) => handleSettingChange('vision_ar', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#012b67] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[#012b67] text-xs font-bold">رؤية الشركة (إنجليزي)</label>
                  <textarea
                    rows={3}
                    value={settings.vision_en || ''}
                    onChange={(e) => handleSettingChange('vision_en', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#012b67] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-[#012b67] text-xs font-bold">رسالة الشركة (عربي)</label>
                  <textarea
                    rows={3}
                    value={settings.mission_ar || ''}
                    onChange={(e) => handleSettingChange('mission_ar', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#012b67] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[#012b67] text-xs font-bold">رسالة الشركة (إنجليزي)</label>
                  <textarea
                    rows={3}
                    value={settings.mission_en || ''}
                    onChange={(e) => handleSettingChange('mission_en', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#012b67] transition-all"
                  />
                </div>
              </div>

              {/* CEO Message */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-gray-100">
                <div className="space-y-2">
                  <label className="block text-[#012b67] text-xs font-bold">كلمة الرئيس التنفيذي (عربي)</label>
                  <textarea
                    rows={4}
                    value={settings.ceo_message_ar || ''}
                    onChange={(e) => handleSettingChange('ceo_message_ar', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#012b67] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[#012b67] text-xs font-bold">كلمة الرئيس التنفيذي (إنجليزي)</label>
                  <textarea
                    rows={4}
                    value={settings.ceo_message_en || ''}
                    onChange={(e) => handleSettingChange('ceo_message_en', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#012b67] transition-all"
                  />
                </div>
              </div>

              {/* Save Trigger */}
              <div className="pt-5 border-t border-gray-100 flex justify-end">
                <button
                  onClick={saveSettings}
                  className="flex items-center gap-2 px-6 py-3 bg-[#012b67] hover:bg-[#002150] text-white text-sm font-semibold rounded-xl transition-all shadow-md"
                >
                  <Save className="w-5 h-5" />
                  <span>حفظ التعديلات</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ──────────── TAB 4: CONTACT MESSAGES ──────────── */}
        {activeTab === 'contacts' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#012b67]">الرسائل الواردة</h2>
              <p className="text-gray-500 text-sm mt-1">الرسائل المرسلة من زوار الموقع عبر استمارة اتصل بنا</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {contacts.length === 0 ? (
                <p className="text-gray-400 text-center py-12 text-sm">لا توجد رسائل واردة حالياً.</p>
              ) : (
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-400 text-xs font-semibold border-b border-gray-100">
                      <th className="p-4">المرسل</th>
                      <th className="p-4">بيانات الاتصال</th>
                      <th className="p-4">الموضوع</th>
                      <th className="p-4">الرسالة</th>
                      <th className="p-4">التاريخ</th>
                      <th className="p-4 text-left">التحكم</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs">
                    {contacts.map(c => (
                      <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4 font-bold text-[#012b67]">{c.name}</td>
                        <td className="p-4 space-y-0.5">
                          <span className="block">{c.email}</span>
                          {c.phone && <span className="block text-gray-400">{c.phone}</span>}
                        </td>
                        <td className="p-4 font-semibold">{c.subject || '-'}</td>
                        <td className="p-4 text-gray-600 max-w-xs truncate" title={c.message}>{c.message}</td>
                        <td className="p-4 text-gray-400">
                          {new Date(c.createdAt).toLocaleDateString('ar-SA')}
                        </td>
                        <td className="p-4 text-left">
                          <button
                            onClick={() => deleteContact(c.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ──────────── TAB 5: SUPPLIER REQUESTS ──────────── */}
        {activeTab === 'suppliers' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#012b67]">طلبات تسجيل الموردين</h2>
              <p className="text-gray-500 text-sm mt-1">طلبات الشركات المتقدمة للانضمام كشركاء وموردين معتمدين</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {suppliers.length === 0 ? (
                <p className="text-gray-400 text-center py-12 text-sm">لا توجد طلبات موردين حالياً.</p>
              ) : (
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-400 text-xs font-semibold border-b border-gray-100">
                      <th className="p-4">الاسم / الشركة</th>
                      <th className="p-4">الاتصال</th>
                      <th className="p-4">الملف التعريفي</th>
                      <th className="p-4">الرسالة</th>
                      <th className="p-4">التاريخ</th>
                      <th className="p-4 text-left">التحكم</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs">
                    {suppliers.map(s => (
                      <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4">
                          <span className="block font-bold text-[#012b67]">{s.name}</span>
                          <span className="block text-gray-400 mt-0.5">{s.company}</span>
                        </td>
                        <td className="p-4 space-y-0.5">
                          <span className="block">{s.email}</span>
                          <span className="block text-gray-400">{s.phone}</span>
                        </td>
                        <td className="p-4">
                          {s.fileUrl ? (
                            <a
                              href={s.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#e8eef5] hover:bg-[#d5e1f0] text-[#012b67] font-semibold rounded-lg transition-all"
                            >
                              <FileText className="w-4 h-4" />
                              <span>تحميل الملف</span>
                            </a>
                          ) : (
                            <span className="text-gray-400">لا يوجد ملف</span>
                          )}
                        </td>
                        <td className="p-4 text-gray-600 max-w-xs truncate" title={s.message}>{s.message || '-'}</td>
                        <td className="p-4 text-gray-400">
                          {new Date(s.createdAt).toLocaleDateString('ar-SA')}
                        </td>
                        <td className="p-4 text-left">
                          <button
                            onClick={() => deleteSupplier(s.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ──────────── TAB 6: CAREERS ──────────── */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#012b67]">إدارة الوظائف الشاغرة</h2>
                <p className="text-gray-500 text-sm mt-1">إضافة وإدارة طلبات التوظيف والوظائف المتاحة</p>
              </div>
              <button
                onClick={() => {
                  setEditingJob({
                    titleAr: '',
                    titleEn: '',
                    departmentAr: '',
                    departmentEn: '',
                    locationAr: '',
                    locationEn: '',
                    type: 'Full-time',
                    descriptionAr: '',
                    descriptionEn: '',
                    isActive: true
                  })
                  setShowJobModal(true)
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#012b67] hover:bg-[#002150] text-white text-sm font-semibold rounded-xl transition-all shadow-md"
              >
                <Plus className="w-5 h-5" />
                <span>إضافة وظيفة جديدة</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-400 text-xs font-semibold border-b border-gray-100">
                    <th className="p-4">المسمى الوظيفي</th>
                    <th className="p-4">القسم</th>
                    <th className="p-4">نوع العمل / الموقع</th>
                    <th className="p-4">الحالة</th>
                    <th className="p-4 text-left">التحكم</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {jobs.map(j => (
                    <tr key={j.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-bold text-[#012b67]">{j.titleAr}</td>
                      <td className="p-4 text-gray-600">{j.departmentAr}</td>
                      <td className="p-4 space-y-0.5 text-xs text-gray-500">
                        <span className="block">{j.type}</span>
                        <span className="block">{j.locationAr}</span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          j.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {j.isActive ? 'نشطة' : 'معطلة'}
                        </span>
                      </td>
                      <td className="p-4 text-left flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingJob(j)
                            setShowJobModal(true)
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteJob(j.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ──────────── TAB 7: EVENTS ──────────── */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#012b67]">إدارة الفعاليات والأخبار</h2>
                <p className="text-gray-500 text-sm mt-1">تحديث الفعاليات الرسمية والأخبار المنشورة في المركز الإعلامي</p>
              </div>
              <button
                onClick={() => {
                  setEditingEvent({
                    titleAr: '',
                    titleEn: '',
                    descriptionAr: '',
                    descriptionEn: '',
                    image: '',
                    eventDate: new Date().toISOString().split('T')[0],
                    locationAr: '',
                    locationEn: '',
                    isActive: true
                  })
                  setShowEventModal(true)
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#012b67] hover:bg-[#002150] text-white text-sm font-semibold rounded-xl transition-all shadow-md"
              >
                <Plus className="w-5 h-5" />
                <span>إضافة فعالية جديدة</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-400 text-xs font-semibold border-b border-gray-100">
                    <th className="p-4">العنوان</th>
                    <th className="p-4">التاريخ</th>
                    <th className="p-4">الموقع</th>
                    <th className="p-4">الحالة</th>
                    <th className="p-4 text-left">التحكم</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {events.map(e => (
                    <tr key={e.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-bold text-[#012b67]">{e.titleAr}</td>
                      <td className="p-4 text-gray-600">
                        {e.eventDate ? new Date(e.eventDate).toLocaleDateString('ar-SA') : '-'}
                      </td>
                      <td className="p-4 text-gray-500">{e.locationAr || '-'}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          e.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {e.isActive ? 'نشطة' : 'معطلة'}
                        </span>
                      </td>
                      <td className="p-4 text-left flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingEvent(e)
                            setShowEventModal(true)
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteEvent(e.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* ──────────────── MODALS ──────────────── */}
      
      {/* 1. Service Modal */}
      {showServiceModal && editingService && (
        <div className="fixed inset-0 z-50 bg-[#011a45]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#012b67]">
                {editingService.id ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
              </h3>
              <button onClick={() => setShowServiceModal(false)} className="p-2 hover:bg-gray-50 rounded-lg transition-all">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={saveService} className="p-6 space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">اسم الخدمة (عربي) *</label>
                  <input
                    type="text"
                    required
                    value={editingService.titleAr || ''}
                    onChange={(e) => setEditingService({ ...editingService, titleAr: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#012b67]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">اسم الخدمة (إنجليزي)</label>
                  <input
                    type="text"
                    value={editingService.titleEn || ''}
                    onChange={(e) => setEditingService({ ...editingService, titleEn: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#012b67]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">الوصف (عربي) *</label>
                <textarea
                  rows={3}
                  required
                  value={editingService.descriptionAr || ''}
                  onChange={(e) => setEditingService({ ...editingService, descriptionAr: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#012b67]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">الوصف (إنجليزي)</label>
                <textarea
                  rows={3}
                  value={editingService.descriptionEn || ''}
                  onChange={(e) => setEditingService({ ...editingService, descriptionEn: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#012b67]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">أيقونة الخدمة</label>
                  <input
                    type="text"
                    value={editingService.icon || 'Sparkles'}
                    onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">رابط صورة الخدمة</label>
                  <input
                    type="text"
                    value={editingService.image || ''}
                    onChange={(e) => setEditingService({ ...editingService, image: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">الترتيب</label>
                  <input
                    type="number"
                    value={editingService.order || 0}
                    onChange={(e) => setEditingService({ ...editingService, order: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="srv-active"
                  checked={editingService.isActive ?? true}
                  onChange={(e) => setEditingService({ ...editingService, isActive: e.target.checked })}
                  className="w-4 h-4 text-[#012b67] border-gray-300 rounded focus:ring-[#012b67]"
                />
                <label htmlFor="srv-active" className="text-xs font-bold text-[#012b67]">الخدمة نشطة وتظهر في الموقع الرئيسي</label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowServiceModal(false)}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-all"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#012b67] hover:bg-[#002150] text-white text-sm font-semibold rounded-xl transition-all shadow-md"
                >
                  حفظ الخدمة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Job Modal */}
      {showJobModal && editingJob && (
        <div className="fixed inset-0 z-50 bg-[#011a45]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#012b67]">إضافة / تعديل وظيفة</h3>
              <button onClick={() => setShowJobModal(false)} className="p-2 hover:bg-gray-50 rounded-lg">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={saveJob} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">المسمى الوظيفي (عربي) *</label>
                  <input
                    type="text"
                    required
                    value={editingJob.titleAr || ''}
                    onChange={(e) => setEditingJob({ ...editingJob, titleAr: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">المسمى الوظيفي (إنجليزي)</label>
                  <input
                    type="text"
                    value={editingJob.titleEn || ''}
                    onChange={(e) => setEditingJob({ ...editingJob, titleEn: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">القسم (عربي)</label>
                  <input
                    type="text"
                    value={editingJob.departmentAr || ''}
                    onChange={(e) => setEditingJob({ ...editingJob, departmentAr: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">القسم (إنجليزي)</label>
                  <input
                    type="text"
                    value={editingJob.departmentEn || ''}
                    onChange={(e) => setEditingJob({ ...editingJob, departmentEn: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">الموقع (عربي)</label>
                  <input
                    type="text"
                    value={editingJob.locationAr || ''}
                    onChange={(e) => setEditingJob({ ...editingJob, locationAr: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">نوع العمل (دوام كامل / جزئي)</label>
                  <input
                    type="text"
                    value={editingJob.type || 'Full-time'}
                    onChange={(e) => setEditingJob({ ...editingJob, type: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="job-active"
                    checked={editingJob.isActive ?? true}
                    onChange={(e) => setEditingJob({ ...editingJob, isActive: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="job-active" className="text-xs font-bold text-[#012b67]">الوظيفة نشطة</label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">الوصف والمتطلبات (عربي)</label>
                <textarea
                  rows={4}
                  value={editingJob.descriptionAr || ''}
                  onChange={(e) => setEditingJob({ ...editingJob, descriptionAr: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowJobModal(false)}
                  className="px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#012b67] text-white text-sm font-semibold rounded-xl"
                >
                  حفظ الوظيفة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Event Modal */}
      {showEventModal && editingEvent && (
        <div className="fixed inset-0 z-50 bg-[#011a45]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#012b67]">إضافة / تعديل فعالية</h3>
              <button onClick={() => setShowEventModal(false)} className="p-2 hover:bg-gray-50 rounded-lg">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={saveEvent} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">عنوان الفعالية (عربي) *</label>
                  <input
                    type="text"
                    required
                    value={editingEvent.titleAr || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, titleAr: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">عنوان الفعالية (إنجليزي)</label>
                  <input
                    type="text"
                    value={editingEvent.titleEn || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, titleEn: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">تاريخ الفعالية</label>
                  <input
                    type="date"
                    value={editingEvent.eventDate ? new Date(editingEvent.eventDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, eventDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">الموقع (عربي)</label>
                  <input
                    type="text"
                    value={editingEvent.locationAr || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, locationAr: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="evt-active"
                    checked={editingEvent.isActive ?? true}
                    onChange={(e) => setEditingEvent({ ...editingEvent, isActive: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="evt-active" className="text-xs font-bold text-[#012b67]">الفعالية نشطة</label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">الوصف (عربي)</label>
                <textarea
                  rows={3}
                  value={editingEvent.descriptionAr || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, descriptionAr: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#012b67] text-white text-sm font-semibold rounded-xl"
                >
                  حفظ الفعالية
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
