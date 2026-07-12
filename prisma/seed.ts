import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ─── Site Settings ───────────────────────────────────────────────
  const settings = [
    { key: 'company_name_ar', value: 'النبراس لإدارة المرافق', label: 'اسم الشركة (عربي)' },
    { key: 'company_name_en', value: 'Alnebras Facilities Management', label: 'Company Name (English)' },
    {
      key: 'about_text_ar',
      value: 'بصفنا شركة وطنية رائدة، مقرها المملكة العربية السعودية، نتخصص في إدارة المرافق وعملياتها وصيانتها عبر مجموعة واسعة من القطاعات. ملتزمون بالتميز، يقدم فريقنا حلولاً احترافية وعملية مدعومة بأنظمة إدارة جودة متطورة وتقنيات ذكية. يعمل خبراؤنا عن كثب مع عملائنا لتقييم المتطلبات الفريدة لكل مشروع. بدايةً من التحليل المتعمق ووصولاً إلى تخطيط الموارد، نطور استراتيجيات مُحسّنة لضمان الأداء والموثوقية والفعالية من حيث التكلفة.',
      label: 'نبذة عن الشركة',
    },
    {
      key: 'vision_ar',
      value: 'أن نكون الخيار الأول للمؤسسات الكبرى في مختلف القطاعات عبر حلول ذكية ومتقدمة في إدارة المرافق وفق أعلى المعايير العالمية.',
      label: 'الرؤية',
    },
    {
      key: 'mission_ar',
      value: 'الوصول إلى عملائنا وفهم احتياجاتهم وتلبيتها بأقل تكلفة وبأحدث الأساليب والتقنيات.',
      label: 'المهمة',
    },
    {
      key: 'goals_ar',
      value: 'تعزيز ورفع مبادئ الجودة والاستدامة وإدارة المخاطر في جميع مشاريعنا|التعاون مع العملاء لتصميم استراتيجيات مخصصة تعكس طبيعة كل مشروع ومتطلباته الفريدة|تحسين منهجيات خدمة الدعم بشكل مستمر لتقديم جودة فائقة بتكاليف مثالية|توظيف وتمكين المواهب المتعلمة والمهنية وذات الخبرة لمواكبة التطورات الحديثة وتحقيق تطلعات عملائنا',
      label: 'الأهداف',
    },
    {
      key: 'values_ar',
      value: 'الجودة|السلامة والأمان|روح الفريق والتواصل|النزاهة والالتزام|التطوير والتحسين|التخطيط الاستراتيجي|الإبداع والابتكار|الاستدامة',
      label: 'القيم',
    },
    {
      key: 'ceo_message_ar',
      value: 'في النبراس، نؤمن بأن إدارة المرافق ليست مجرد خدمة، بل هي شراكة حقيقية نسعى من خلالها إلى تحقيق التميز والاستدامة لعملائنا. نلتزم بأعلى معايير الجودة ونستخدم أحدث التقنيات بما في ذلك الروبوتات والذكاء الاصطناعي لتقديم حلول مبتكرة ومتطورة.',
      label: 'كلمة الرئيس التنفيذي',
    },
    {
      key: 'hero_title_ar',
      value: 'حلول ذكية لإدارة المرافق',
      label: 'عنوان البطل',
    },
    {
      key: 'hero_subtitle_ar',
      value: 'نرفع كفاءة منشأتك ونضمن استمرارية أعمالك بأعلى معايير الجودة والاحترافية',
      label: 'عنوان فرعي للبطل',
    },
    { key: 'social_instagram', value: 'https://instagram.com/alnebras_fm', label: 'انستغرام' },
    { key: 'social_tiktok', value: 'https://tiktok.com/@alnebras_fm', label: 'تيك توك' },
    { key: 'social_facebook', value: 'https://facebook.com/alnebras_fm', label: 'فيسبوك' },
  ]

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value, label: setting.label },
      create: setting,
    })
  }
  console.log(`✅ Seeded ${settings.length} site settings`)

  // ─── Services ────────────────────────────────────────────────────
  const services = [
    {
      titleAr: 'خدمات التنظيف',
      titleEn: 'Cleaning Services',
      descriptionAr: 'نقدم خدمات تنظيف شاملة ومتخصصة للمنشآت التجارية والصناعية باستخدام أحدث المعدات والمنظفات البيئية لضمان بيئة نظيفة وصحية.',
      icon: 'Sparkles',
      order: 1,
    },
    {
      titleAr: 'خدمات الضيافة',
      titleEn: 'Hospitality Services',
      descriptionAr: 'نوفر فرق ضيافة محترفة ومدربة لتقديم خدمات استقبال وتنظيم متكاملة تعكس صورة احترافية لعملائنا وزوارهم.',
      icon: 'Users',
      order: 2,
    },
    {
      titleAr: 'خدمات البستنة وتنسيق الحدائق',
      titleEn: 'Landscaping Services',
      descriptionAr: 'نصمم وننفذ حلول البستنة وتنسيق الحدائق الداخلية والخارجية لتحسين المظهر الجمالي والبيئة المحيطة بالمنشآت.',
      icon: 'TreePine',
      order: 3,
    },
    {
      titleAr: 'خدمات مكافحة الآفات والقوارض',
      titleEn: 'Pest Control Services',
      descriptionAr: 'نطبق برامج متكاملة لمكافحة الآفات والقوارض باستخدام أحدث التقنيات والمبيدات الآمنة بيئياً لحماية المنشآت.',
      icon: 'Bug',
      order: 4,
    },
    {
      titleAr: 'خدمات تنظيف واجهات المباني',
      titleEn: 'Building Facade Cleaning',
      descriptionAr: 'نقدم خدمات تنظيف الواجهات الزجاجية والخرسانية باستخدام تقنيات الوصول المتخصص لضمان مظهر لامع ونظيف للمباني.',
      icon: 'Building2',
      order: 5,
    },
    {
      titleAr: 'الأنظمة الكهربائية',
      titleEn: 'Electrical Systems',
      descriptionAr: 'نوفر صيانة وإصلاح الأنظمة الكهربائية Preventive والطارئة لضمان استمرارية التشغيل وسلامة المنشأة.',
      icon: 'Zap',
      order: 6,
    },
    {
      titleAr: 'أنظمة التدفئة والتهوية وتكييف الهواء',
      titleEn: 'HVAC Systems',
      descriptionAr: 'نقدم صيانة شاملة لأنظمة التدفئة والتهوية وتكييف الهواء لتحسين جودة الهواء الداخلي وكفاءة استهلاك الطاقة.',
      icon: 'Wind',
      order: 7,
    },
    {
      titleAr: 'أنظمة السباكة',
      titleEn: 'Plumbing Systems',
      descriptionAr: 'نتعامل مع جميع أعمال السباكة من صيانة وإصلاح وتركيب لضمان تشغيل سلس للأنظمة المائية والصرف الصحي.',
      icon: 'Droplets',
      order: 8,
    },
    {
      titleAr: 'أنظمة السلامة والمصاعد والسلالم المتحركة',
      titleEn: 'Safety, Elevators & Escalators',
      descriptionAr: 'نوفر صيانة دورية لأنظمة السلامة والمصاعد والسلالم المتحركة وفقاً للمعايير والمتطلبات الفنية المعتمدة.',
      icon: 'Shield',
      order: 9,
    },
    {
      titleAr: 'حمامات السباحة',
      titleEn: 'Swimming Pools',
      descriptionAr: 'نقدم خدمات صيانة وتنظيف حمامات السباحة ومعالجة المياه للحفاظ على نظافة وسلامة البيئة المائية.',
      icon: 'Waves',
      order: 10,
    },
    {
      titleAr: 'كاميرات المراقبة والاتصالات',
      titleEn: 'Surveillance & Communications',
      descriptionAr: 'نقوم بتركيب وصيانة أنظمة المراقبة بالكاميرات وشبكات الاتصالات لضمان الأمن والحماية الشاملة للمنشآت.',
      icon: 'Camera',
      order: 11,
    },
    {
      titleAr: 'التفتيش والتصوير الحراري',
      titleEn: 'Thermal Inspection',
      descriptionAr: 'نستخدم تقنيات التصوير الحراري المتقدمة لاكتشاف الأعطال الخفية في الأنظمة الكهربائية والميكانيكية قبل تفاقمها.',
      icon: 'Thermometer',
      order: 12,
    },
    {
      titleAr: 'الهياكل والدهانات والأرضيات والأسقف',
      titleEn: 'Structures, Paints, Floors & Ceilings',
      descriptionAr: 'نقدم حلول متكاملة لصيانة الهياكل الإنشائية والدهانات والأرضيات والأسقف مع استخدام مواد عالية الجودة.',
      icon: 'Paintbrush',
      order: 13,
    },
    {
      titleAr: 'أعمال الحديد والنجارة',
      titleEn: 'Metal & Carpentry Works',
      descriptionAr: 'ننفذ أعمال الحديد والنجارة بمهارة عالية تشمل التصنيع والتركيب والإصلاح لجميع متطلبات المنشأة.',
      icon: 'Hammer',
      order: 14,
    },
    {
      titleAr: 'أنظمة الري',
      titleEn: 'Irrigation Systems',
      descriptionAr: 'نصمم ونثبت ونصنع أنظمة الري الذكية والآلية لضمان الري الفعال والموفر للمياه في المساحات الخضراء.',
      icon: 'Droplet',
      order: 15,
    },
    {
      titleAr: 'معطرات المباني',
      titleEn: 'Building Fragrance',
      descriptionAr: 'نوفر حلول تعطير احترافية للمنشآت التجارية والفندقية لخلق بيئة مريحة ومرحبة للزوار والموظفين.',
      icon: 'SprayCan',
      order: 16,
    },
  ]

  for (const service of services) {
    await prisma.service.create({ data: service })
  }
  console.log(`✅ Seeded ${services.length} services`)

  // ─── Partners ────────────────────────────────────────────────────
  const partners = [
    { name: 'وزارة الدفاع', logo: '/logo.png', order: 1 },
    { name: 'أرامكو السعودية', logo: '/logo.png', order: 2 },
    { name: 'سابك', logo: '/logo.png', order: 3 },
    { name: 'الراجحي', logo: '/logo.png', order: 4 },
    { name: 'العليان', logo: '/logo.png', order: 5 },
    { name: 'نيوم', logo: '/logo.png', order: 6 },
  ]

  for (const partner of partners) {
    await prisma.partner.create({ data: partner })
  }
  console.log(`✅ Seeded ${partners.length} partners`)

  // ─── Branches ────────────────────────────────────────────────────
  const branches = [
    {
      country: 'Saudi Arabia',
      countryAr: 'المملكة العربية السعودية',
      city: 'Jeddah',
      cityAr: 'جدة',
      address: 'Al-Ruwais, Al-Madina Road, Al-Mohammadiya Plaza Building 31, 3rd Floor, Office 4963',
      addressAr: 'حي الرويس، طريق المدينة، مبني المحمدية بلازا 31، الطابق الثالث، مكتب رقم 4963',
      phone: '920028911',
      email: 'info@alnebras.com.sa',
      image: '/images/hero-bg.jpg',
      order: 1,
    },
    {
      country: 'Egypt',
      countryAr: 'مصر',
      city: 'Cairo',
      cityAr: 'القاهرة',
      address: '8 Al-Hidaya Street - Embassies District - Nasr City',
      addressAr: '٨ شارع الهداية - حي السفارات - مدينة نصر',
      phone: '2011731149',
      email: 'info@alnebras.com.sa',
      image: '/images/facility.jpg',
      order: 2,
    },
  ]

  for (const branch of branches) {
    await prisma.branch.create({ data: branch })
  }
  console.log(`✅ Seeded ${branches.length} branches`)

  // ─── News Article ────────────────────────────────────────────────
  await prisma.newsArticle.create({
    data: {
      titleAr: 'النبراس توقع اتفاقية شراكة استراتيجية جديدة',
      titleEn: 'Alnebras Signs New Strategic Partnership Agreement',
      summaryAr:
        'وقعت شركة النبراس لإدارة المرافق اتفاقية شراكة استراتيجية مع إحدى الشركات الرائدة لتعزيز حلول إدارة المرافق الذكية في المملكة.',
      summaryEn:
        'Alnebras Facilities Management has signed a strategic partnership agreement with a leading company to enhance smart facilities management solutions in the Kingdom.',
      contentAr:
        'وقعت شركة النبراس لإدارة المرافق اتفاقية شراكة استراتيجية مع إحدى الشركات الرائدة في القطاع لتعزيز حلول إدارة المرافق الذكية في المملكة العربية السعودية. تأتي هذه الاتفاقية في إطار حرص الشركة على تطوير خدماتها وتقديم أحدث التقنيات بما في ذلك الروبوتات والذكاء الاصطناعي في مجال إدارة المرافق. وستسهم هذه الشراكة في توسيع نطاق الخدمات المقدمة وتحسين جودة المخرجات بما يخدم رؤية المملكة 2030.',
      contentEn:
        'Alnebras Facilities Management has signed a strategic partnership agreement with a leading company in the sector to enhance smart facilities management solutions in Saudi Arabia. This agreement comes as part of the company\'s commitment to developing its services and providing the latest technologies including robotics and artificial intelligence in facilities management.',
      image: '/images/office.jpg',
      publishDate: new Date('2025-01-15'),
    },
  })
  console.log('✅ Seeded 1 news article')

  // ─── Event ───────────────────────────────────────────────────────
  await prisma.event.create({
    data: {
      titleAr: 'معرض المستقبل للمرافق 2025',
      titleEn: 'Future Facilities Exhibition 2025',
      descriptionAr:
        'تشارك النبراس في معرض المستقبل للمرافق لعرض أحدث حلول إدارة المرافق الذكية والروبوتات المتطورة.',
      descriptionEn:
        'Alnebras participates in the Future Facilities Exhibition to showcase the latest smart facilities management solutions and advanced robotics.',
      eventDate: new Date('2025-03-15T00:00:00.000Z'),
      locationAr: 'رياض، المملكة العربية السعودية',
      locationEn: 'Riyadh, Saudi Arabia',
      image: '/images/facility.jpg',
    },
  })
  console.log('✅ Seeded 1 event')

  console.log('\n🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })