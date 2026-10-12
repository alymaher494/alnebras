import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { randomBytes } from 'crypto'
import { db } from '@/lib/db'
import { checkAuth } from '@/lib/auth'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { sendMail } from '@/lib/mail'

const MAX_CV_BYTES = 5 * 1024 * 1024 // 5 MB
const ALLOWED_CV: Record<string, 'pdf' | 'zip'> = {
  pdf: 'pdf',
  doc: 'zip',
  docx: 'zip',
}

function isValidCv(buffer: Buffer, ext: string): boolean {
  if (buffer.length < 8) return false
  if (ext === 'pdf') {
    return buffer[0] === 0x25 && buffer[1] === 0x50 && buffer[2] === 0x44 && buffer[3] === 0x46 // %PDF
  }
  // doc/docx: OLE compound document or ZIP container
  const isOle =
    buffer[0] === 0xd0 && buffer[1] === 0xcf && buffer[2] === 0x11 && buffer[3] === 0xe0
  const isZip = buffer[0] === 0x50 && buffer[1] === 0x4b && buffer[2] === 0x03 && buffer[3] === 0x04
  return isOle || isZip
}

// Public: submit a job application (CV upload + routed to department email)
export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request)
    if (!checkRateLimit(`apply:${ip}`, 10, 10 * 60_000)) {
      return NextResponse.json({ error: 'طلبات كثيرة، حاول لاحقاً' }, { status: 429 })
    }

    const formData = await request.formData()
    const str = (k: string) => {
      const v = formData.get(k)
      return typeof v === 'string' ? v.trim() : ''
    }
    const name = str('name').slice(0, 120)
    const email = str('email').slice(0, 200)
    const phone = str('phone').slice(0, 40)
    const specialization = str('specialization').slice(0, 200)
    const jobId = str('jobId').slice(0, 60)
    const file = formData.get('cv')

    if (!name || !email || !phone || !specialization || !(file instanceof File)) {
      return NextResponse.json({ error: 'الاسم والبريد والهاتف والتخصص والسيرة الذاتية مطلوبة' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'البريد الإلكتروني غير صالح' }, { status: 400 })
    }
    if (file.size <= 0 || file.size > MAX_CV_BYTES) {
      return NextResponse.json({ error: 'السيرة الذاتية يجب أن تكون أقل من 5MB' }, { status: 400 })
    }
    const ext = (file.name.split('.').pop() || '').toLowerCase()
    if (!ALLOWED_CV[ext]) {
      return NextResponse.json({ error: 'صيغة السيرة الذاتية يجب أن تكون pdf أو doc أو docx' }, { status: 400 })
    }
    const buffer = Buffer.from(await file.arrayBuffer())
    if (!isValidCv(buffer, ext)) {
      return NextResponse.json({ error: 'محتوى الملف لا يطابق صيغته' }, { status: 400 })
    }

    let job: { id: string; titleAr: string; titleEn: string | null; departmentEn: string | null; isActive: boolean } | null = null
    if (jobId) {
      job = await db.jobListing.findUnique({ where: { id: jobId } })
      if (!job || !job.isActive) {
        return NextResponse.json({ error: 'الوظيفة غير متاحة' }, { status: 400 })
      }
    }

    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadsDir, { recursive: true })
    const filename = `cv-${Date.now()}-${randomBytes(8).toString('hex')}.${ext}`
    await writeFile(join(uploadsDir, filename), buffer)

    // Resolve the responsible department email
    let department: { nameEn: string; email: string } | null = null
    if (job?.departmentEn) {
      department = await db.department.findFirst({
        where: { nameEn: job.departmentEn, isActive: true },
      })
    }
    department ??= await db.department.findFirst({
      where: { nameEn: 'Recruitment', isActive: true },
    })

    const application = await db.jobApplication.create({
      data: {
        jobId: job?.id ?? undefined,
        name,
        email,
        phone,
        specialization,
        cvPath: `/uploads/${filename}`,
        departmentEn: department?.nameEn ?? job?.departmentEn ?? undefined,
      },
    })

    if (department) {
      await sendMail({
        to: department.email,
        subject: `طلب توظيف جديد — ${name}${job ? ` (${job.titleAr})` : ''}`,
        text: [
          `اسم المتقدم: ${name}`,
          `الهاتف: ${phone}`,
          `البريد: ${email}`,
          `التخصص: ${specialization}`,
          job ? `الوظيفة: ${job.titleAr}${job.titleEn ? ` / ${job.titleEn}` : ''}` : 'تقديم عام (بدون وظيفة محددة)',
          `القسم: ${department.nameEn}`,
          `السيرة الذاتية مرفقة.`,
        ]
          .filter(Boolean)
          .join('\n'),
        attachments: [{ filename: `cv-${name}.${ext}`, path: join(uploadsDir, filename) }],
      })
    }

    return NextResponse.json({ success: true, id: application.id }, { status: 201 })
  } catch (error) {
    console.error('Error submitting application:', error)
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}

// Admin: list applications
export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'غير مصرح بالوصول' }, { status: 401 })
  }
  try {
    const applications = await db.jobApplication.findMany({
      orderBy: { createdAt: 'desc' },
      include: { job: { select: { titleAr: true, titleEn: true } } },
    })
    return NextResponse.json(applications)
  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 })
  }
}
