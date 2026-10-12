import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const services = await prisma.service.findMany({
    select: { order: true, titleAr: true, image: true },
    orderBy: { order: 'asc' },
  })
  for (const s of services) console.log(`${s.order} | ${s.titleAr} | ${s.image}`)
  const partners = await prisma.partner.findMany({ select: { name: true, logo: true } })
  const badP = partners.filter((p) => p.logo && !p.logo.endsWith('.webp'))
  console.log(`partners non-webp: ${badP.length}`)
  for (const p of badP) console.log(`P | ${p.name} | ${p.logo}`)
}
main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
