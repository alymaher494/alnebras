import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { randomBytes } from 'crypto'
import { checkAuth } from '@/lib/auth'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

const MAX_FILE_BYTES = 5 * 1024 * 1024 // 5 MB

// Extension -> allowed MIME types
const ALLOWED_TYPES: Record<string, string[]> = {
  jpg: ['image/jpeg'],
  jpeg: ['image/jpeg'],
  png: ['image/png'],
  webp: ['image/webp'],
  gif: ['image/gif'],
  pdf: ['application/pdf'],
}

export async function POST(request: NextRequest) {
  try {
    if (!checkAuth(request)) {
      return NextResponse.json({ error: 'غير مصرح بالوصول' }, { status: 401 })
    }

    const ip = getClientIp(request)
    if (!checkRateLimit(`upload:${ip}`, 20, 10 * 60_000)) {
      return NextResponse.json({ error: 'طلبات كثيرة، حاول لاحقاً' }, { status: 429 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    if (file.size <= 0 || file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: 'File must be between 1 byte and 5 MB' }, { status: 400 })
    }

    const rawExt = (file.name.split('.').pop() || '').toLowerCase()
    const allowedMimes = ALLOWED_TYPES[rawExt]
    if (!allowedMimes || !allowedMimes.includes(file.type)) {
      return NextResponse.json({ error: 'File type not allowed (jpg, png, webp, gif, pdf)' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Magic-byte check for common image types (defense in depth)
    if (rawExt !== 'pdf' && !isKnownImageMagic(buffer)) {
      return NextResponse.json({ error: 'File content does not match its type' }, { status: 400 })
    }

    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadsDir, { recursive: true })

    const filename = `${Date.now()}-${randomBytes(8).toString('hex')}.${rawExt}`
    const filepath = join(uploadsDir, filename)

    await writeFile(filepath, buffer)

    return NextResponse.json({ path: `/uploads/${filename}`, url: `/uploads/${filename}`, filename }, { status: 201 })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}

function isKnownImageMagic(buffer: Buffer): boolean {
  if (buffer.length < 12) return false
  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return true
  // PNG: 89 50 4E 47
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) return true
  // GIF: GIF8
  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x38) return true
  // WEBP: RIFF....WEBP
  if (
    buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
    buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50
  ) return true
  return false
}
