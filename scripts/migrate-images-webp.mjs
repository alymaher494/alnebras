// One-off safe migration: partners/branches image paths .png -> .webp (only when the .webp file exists on disk).
// Run: node scripts/migrate-images-webp.mjs
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')

async function migrate(model, field) {
  const rows = await model.findMany({ select: { id: true, [field]: true } })
  let updated = 0
  for (const row of rows) {
    const value = row[field]
    if (typeof value !== 'string' || !value.endsWith('.png')) continue
    if (!value.startsWith('/images/')) continue
    const webpUrl = value.slice(0, -4) + '.webp'
    const diskPath = join(root, ...webpUrl.split('/').filter(Boolean))
    if (!existsSync(diskPath)) {
      console.log(`SKIP (no webp on disk): ${value}`)
      continue
    }
    await model.update({ where: { id: row.id }, data: { [field]: webpUrl } })
    updated++
  }
  console.log(`${field}: updated ${updated}/${rows.length}`)
}

async function main() {
  await migrate(prisma.partner, 'logo')
  await migrate(prisma.branch, 'image')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
