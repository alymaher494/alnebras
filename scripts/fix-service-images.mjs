// One-off: point production services to the new real webp photos (by order).
// Run: node scripts/fix-service-images.mjs
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const mapping = {
  1: '/images/services/real-fm-01.webp',
  2: '/images/services/real-fm-02.webp',
  3: '/images/services/real-fm-03.webp',
  4: '/images/services/real-fm-04.webp',
  5: '/images/services/real-fm-05.webp',
  6: '/images/services/real-fm-06.webp',
  7: '/images/services/real-fm-07.webp',
  8: '/images/services/real-fm-08.webp',
  9: '/images/services/real-fm-09.webp',
  10: '/images/services/real-fm-10.webp',
  11: '/images/services/real-fm-11.webp',
  12: '/images/services/real-fm-12.webp',
  13: '/images/services/real-gc-2.webp',
  14: '/images/services/real-gc-3.webp',
  15: '/images/services/real-fm-03.webp',
  16: '/images/services/real-fm-02.webp',
}

async function main() {
  for (const [order, image] of Object.entries(mapping)) {
    const r = await prisma.service.updateMany({ where: { order: Number(order) }, data: { image } })
    console.log(`order ${order}: updated ${r.count}`)
  }
}
main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
