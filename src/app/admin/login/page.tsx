'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Lock, ShieldAlert, CheckCircle2 } from 'lucide-react'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()

      if (res.ok) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/admin')
        }, 1000)
      } else {
        setError(data.error || 'كلمة المرور غير صحيحة')
      }
    } catch (err) {
      setError('حدث خطأ في الشبكة، يرجى المحاولة لاحقاً')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#011a45] flex items-center justify-center px-4 relative overflow-hidden font-sans select-none" dir="rtl">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-[#012b67]/30 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full bg-[#012b67]/30 blur-3xl" />

      <div className="max-w-md w-full z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl text-center">
          
          {/* Logo */}
          <div className="mb-8 select-none flex justify-center">
            <div className="relative w-48 h-16">
              <Image 
                src="/images/logo/logo.png" 
                alt="Alnebras Logo" 
                fill 
                className="object-contain"
                priority
              />
            </div>
          </div>

          <h2 className="text-xl font-bold text-white mb-2">لوحة الإدارة والمحتوى</h2>
          <p className="text-gray-400 text-sm mb-6">يرجى إدخال كلمة مرور المشرف للمتابعة</p>

          <form onSubmit={handleSubmit} className="space-y-5 text-right">
            <div className="relative">
              <label className="block text-gray-300 text-xs font-semibold mb-2 mr-1">كلمة المرور</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#012b67] focus:ring-1 focus:ring-[#012b67] text-left pr-12 transition-all duration-300"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2.5 p-3.5 bg-red-950/40 border border-red-500/20 text-red-400 text-xs rounded-xl animate-shake">
                <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2.5 p-3.5 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>تم التحقق بنجاح! جاري تحويلك...</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-4 bg-[#012b67] hover:bg-[#002150] active:scale-[0.98] text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-[#012b67]/20 disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? 'جاري التحقق...' : 'تسجيل الدخول'}
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}
