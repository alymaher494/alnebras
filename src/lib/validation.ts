import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

/** Shared input validation for public + admin write routes. */
const shortText = (max: number) =>
  z.string().trim().min(1).max(max)

const optionalText = (max: number) =>
  z.string().trim().max(max).optional().nullable()

const imageRef = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === '' || v.startsWith('/') || /^https?:\/\//i.test(v), {
    message: 'Invalid image reference',
  })
  .optional()
  .nullable()

export const loginSchema = z.object({
  password: z.string().min(1).max(200),
})

export const contactSchema = z.object({
  name: shortText(120),
  email: z.string().trim().email().max(200),
  phone: optionalText(40),
  subject: optionalText(200),
  message: shortText(5000),
})

export const supplierSchema = z.object({
  name: shortText(120),
  company: shortText(200),
  phone: shortText(40),
  email: z.string().trim().email().max(200),
  message: optionalText(5000),
  fileUrl: imageRef,
})

export const serviceWriteSchema = z.object({
  titleAr: shortText(200),
  titleEn: optionalText(200),
  descriptionAr: shortText(20000),
  descriptionEn: optionalText(20000),
  image: imageRef,
  icon: shortText(60).optional().nullable(),
  order: z.coerce.number().int().min(0).max(100000).optional(),
  isActive: z.coerce.boolean().optional(),
})

export const partnerWriteSchema = z.object({
  name: shortText(200),
  logo: imageRef,
  country: shortText(60).optional(),
  order: z.coerce.number().int().min(0).max(100000).optional(),
  isActive: z.coerce.boolean().optional(),
})

const dateString = z
  .string()
  .trim()
  .max(60)
  .refine((v) => v === '' || !Number.isNaN(Date.parse(v)), { message: 'Invalid date' })
  .optional()
  .nullable()

export const newsWriteSchema = z.object({
  titleAr: shortText(300),
  titleEn: optionalText(300),
  contentAr: optionalText(50000),
  contentEn: optionalText(50000),
  summaryAr: optionalText(2000),
  summaryEn: optionalText(2000),
  image: imageRef,
  publishDate: dateString,
  isActive: z.coerce.boolean().optional(),
})

export const eventWriteSchema = z.object({
  titleAr: shortText(300),
  titleEn: optionalText(300),
  descriptionAr: optionalText(50000),
  descriptionEn: optionalText(50000),
  image: imageRef,
  eventDate: dateString,
  locationAr: optionalText(300),
  locationEn: optionalText(300),
  isActive: z.coerce.boolean().optional(),
})

export const jobWriteSchema = z.object({
  titleAr: shortText(300),
  titleEn: optionalText(300),
  departmentAr: optionalText(200),
  departmentEn: optionalText(200),
  locationAr: optionalText(200),
  locationEn: optionalText(200),
  type: optionalText(100),
  descriptionAr: optionalText(50000),
  descriptionEn: optionalText(50000),
  requirementsAr: optionalText(50000),
  requirementsEn: optionalText(50000),
  isActive: z.coerce.boolean().optional(),
})

export const branchWriteSchema = z.object({
  country: shortText(120),
  countryAr: shortText(120),
  city: shortText(120),
  cityAr: shortText(120),
  address: shortText(2000),
  addressAr: shortText(2000),
  phone: optionalText(40),
  email: z.string().trim().email().max(200).optional().nullable(),
  image: imageRef,
  description: optionalText(10000),
  descriptionAr: optionalText(10000),
  latitude: z.coerce.number().min(-90).max(90).optional().nullable(),
  longitude: z.coerce.number().min(-180).max(180).optional().nullable(),
  order: z.coerce.number().int().min(0).max(100000).optional(),
  isActive: z.coerce.boolean().optional(),
})

export const settingsWriteSchema = z.record(z.string().min(1).max(120), z.string().max(20000)).refine(
  (obj) => Object.keys(obj).length > 0 && Object.keys(obj).length <= 200,
  { message: 'Invalid settings payload' }
)
