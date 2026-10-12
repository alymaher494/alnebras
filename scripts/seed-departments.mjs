// One-off safe seed for departments (upsert — never deletes). Run: node scripts/seed-departments.mjs
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const departments = [
  { nameEn: 'Human Resources', email: 'hr-department@alnebras.com.sa', order: 1 },
  { nameEn: 'Recruitment', email: 'hr-job@alnebras.com.sa', order: 2 },
  { nameEn: 'HR Coordination', email: 'hr-cord@alnebras.com.sa', order: 3 },
  { nameEn: 'Payroll', email: 'hr-payroll@alnebras.com.sa', order: 4 },
  { nameEn: 'Projects Management', email: 'pm-department@alnebras.com.sa', order: 5 },
  { nameEn: 'Projects Manager', email: 'pm-manager@alnebras.com.sa', order: 6 },
  { nameEn: 'Information Technology', email: 'it-dep@alnebras.com.sa', order: 7 },
  { nameEn: 'Legal Affairs', email: 'legal-dep@alnebras.com.sa', order: 8 },
  { nameEn: 'Finance', email: 'finance-dep@alnebras.com.sa', order: 9 },
  { nameEn: 'Executive Office', email: 'm.almogbly@alnebras.com.sa', order: 10 },
]

async function main() {
  for (const d of departments) {
    await prisma.department.upsert({
      where: { nameEn: d.nameEn },
      update: {},
      create: d,
    })
  }
  console.log(`Seeded ${departments.length} departments`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
