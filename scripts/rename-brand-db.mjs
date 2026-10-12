// One-off: prefix standalone النبراس with شركة across DB text content (idempotent).
// Run: node scripts/rename-brand-db.mjs
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const fix = (v) =>
  typeof v === 'string' ? v.replace(/(?<!شركة )النبراس/g, 'شركة النبراس') : v

async function sweep(model, fields, idField = 'id') {
  const rows = await model.findMany()
  let changed = 0
  for (const row of rows) {
    const data = {}
    for (const f of fields) {
      if (typeof row[f] === 'string' && row[f].includes('النبراس')) {
        const next = fix(row[f])
        if (next !== row[f]) data[f] = next
      }
    }
    if (Object.keys(data).length > 0) {
      await model.update({ where: { [idField]: row[idField] }, data })
      changed++
    }
  }
  console.log(`${model.name || 'model'}: ${changed}/${rows.length} rows updated`)
}

async function main() {
  await sweep(prisma.siteSetting, ['value', 'label'], 'id')
  await sweep(prisma.service, ['titleAr', 'titleEn', 'descriptionAr', 'descriptionEn'])
  await sweep(prisma.partner, ['name'])
  await sweep(prisma.branch, ['countryAr', 'cityAr', 'address', 'addressAr', 'description', 'descriptionAr'])
  await sweep(prisma.newsArticle, ['titleAr', 'titleEn', 'contentAr', 'contentEn', 'summaryAr', 'summaryEn'])
  await sweep(prisma.event, ['titleAr', 'titleEn', 'descriptionAr', 'descriptionEn', 'locationAr', 'locationEn'])
  await sweep(prisma.jobListing, ['titleAr', 'titleEn', 'departmentAr', 'departmentEn', 'locationAr', 'locationEn', 'descriptionAr', 'descriptionEn', 'requirementsAr', 'requirementsEn'])
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
