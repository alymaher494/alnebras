import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🧹 Cleaning up database...')
  await prisma.supplierRequest.deleteMany({})
  await prisma.contactMessage.deleteMany({})
  await prisma.jobListing.deleteMany({})
  await prisma.mediaImage.deleteMany({})
  await prisma.event.deleteMany({})
  await prisma.newsArticle.deleteMany({})
  await prisma.branch.deleteMany({})
  await prisma.partner.deleteMany({})
  await prisma.service.deleteMany({})
  await prisma.siteSetting.deleteMany({})
  console.log('🧹 Cleanup completed.')

  console.log('🌱 Seeding database...')

  // ─── Site Settings ───────────────────────────────────────────────
  const settings = [
    { key: 'company_name_ar', value: 'النبراس لإدارة المرافق', label: 'اسم الشركة (عربي)' },
    { key: 'company_name_en', value: 'Alnebras Facilities Management', label: 'Company Name (English)' },
    {
      key: 'about_text_ar',
      value: 'بصفنا شركة وطنية رائدة، مقرها المملكة العربية السعودية، نتخصص في إدارة المرافق وعملياتها وصيانتها عبر مجموعة واسعة من القطاعات. ملتزمون بالتميز، يقدم فريقنا حلولاً احترافية وعملية مدعومة بأنظمة إدارة جودة متطورة وتقنيات ذكية. يعمل خبراؤنا عن كثب مع عملائنا لتقييم المتطلبات الفريدة لكل مشروع. بدايةً من التحليل المتعمق ووصولاً إلى تخطيط الموارد، نطور استراتيجيات مُحسّنة لضمان الأداء والموثوقية والفعالية من حيث التكلفة.',
      label: 'نبذة عن الشركة (عربي)',
    },
    {
      key: 'about_text_en',
      value: 'As a leading national company based in the Kingdom of Saudi Arabia, we specialize in facilities management, operations, and maintenance across a wide range of sectors. Committed to excellence, our team delivers professional and practical solutions backed by advanced quality management systems and smart technologies. Our experts work closely with clients to assess the unique requirements of each project. From deep analysis to resource planning, we develop optimized strategies to ensure performance, reliability, and cost-effectiveness.',
      label: 'About Company (English)',
    },
    {
      key: 'vision_ar',
      value: 'أن نكون الخيار الأول للمؤسسات الكبرى في مختلف القطاعات عبر حلول ذكية ومتقدمة في إدارة المرافق وفق أعلى المعايير العالمية.',
      label: 'الرؤية (عربي)',
    },
    {
      key: 'vision_en',
      value: 'To be the first choice for major organizations in various sectors through smart and advanced facilities management solutions in accordance with the highest international standards.',
      label: 'Vision (English)',
    },
    {
      key: 'mission_ar',
      value: 'الوصول إلى عملائنا وفهم احتياجاتهم وتلبيتها بأقل تكلفة وبأحدث الأساليب والتقنيات.',
      label: 'المهمة (عربي)',
    },
    {
      key: 'mission_en',
      value: 'To reach our clients, understand their needs, and satisfy them with the lowest cost and the latest methods and technologies.',
      label: 'Mission (English)',
    },
    {
      key: 'goals_ar',
      value: 'تعزيز ورفع مبادئ الجودة والاستدامة وإدارة المخاطر في جميع مشاريعنا|التعاون مع العملاء لتصميم استراتيجيات مخصصة تعكس طبيعة كل مشروع ومتطلباته الفريدة|تحسين منهجيات خدمة الدعم بشكل مستمر لتقديم جودة فائقة بتكاليف مثالية|توظيف وتمكين المواهب المتعلمة والمهنية وذات الخبرة لمواكبة التطورات الحديثة وتحقيق تطلعات عملائنا',
      label: 'الأهداف (عربي)',
    },
    {
      key: 'goals_en',
      value: 'Promoting and elevating the principles of quality, sustainability, and risk management in all our projects|Collaborating with clients to design customized strategies reflecting the unique nature of each project|Continuously improving support service methodologies to deliver superior quality at optimal costs|Employing and empowering educated, professional, and experienced talents to keep pace with modern developments and achieve our clients\' aspirations',
      label: 'Goals (English)',
    },
    {
      key: 'values_ar',
      value: 'الجودة|السلامة والأمان|روح الفريق والتواصل|النزاهة والالتزام|التطوير والتحسين|التخطيط الاستراتيجي|الإبداع والابتكار|الاستدامة',
      label: 'القيم (عربي)',
    },
    {
      key: 'values_en',
      value: 'Quality|Safety & Security|Teamwork & Communication|Integrity & Commitment|Development & Improvement|Strategic Planning|Creativity & Innovation|Sustainability',
      label: 'Values (English)',
    },
    {
      key: 'ceo_message_ar',
      value: 'في النبراس، نؤمن بأن إدارة المرافق ليست مجرد خدمة، بل هي شراكة حقيقية نسعى من خلالها إلى تحقيق التميز والاستدامة لعملائنا. نلتزم بأعلى معايير الجودة ونستخدم أحدث التقنيات بما في ذلك الروبوتات والذكاء الاصطناعي لتقديم حلول مبتكرة ومتطورة.',
      label: 'كلمة الرئيس التنفيذي (عربي)',
    },
    {
      key: 'ceo_message_en',
      value: 'At Alnebras, we believe that facilities management is not just a service, but a true partnership through which we seek to achieve excellence and sustainability for our clients. We commit to the highest quality standards and use the latest technologies, including robotics and artificial intelligence, to deliver innovative and advanced solutions.',
      label: 'CEO Message (English)',
    },
    {
      key: 'hero_title_ar',
      value: 'حلول ذكية لإدارة المرافق',
      label: 'عنوان البطل (عربي)',
    },
    {
      key: 'hero_title_en',
      value: 'Smart Facilities Management Solutions',
      label: 'Hero Title (English)',
    },
    {
      key: 'hero_subtitle_ar',
      value: 'نرفع كفاءة منشأتك ونضمن استمرارية أعمالك بأعلى معايير الجودة والاحترافية',
      label: 'عنوان فرعي للبطل (عربي)',
    },
    {
      key: 'hero_subtitle_en',
      value: 'We elevate the efficiency of your facility and ensure your business continuity with the highest standards of quality and professionalism.',
      label: 'Hero Subtitle (English)',
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
      descriptionEn: 'We provide comprehensive and specialized cleaning services for commercial and industrial facilities using the latest equipment and eco-friendly detergents to ensure a clean and healthy environment.',
      icon: 'Sparkles',
      image: '/images/services/facade_cleaning.png',
      order: 1,
    },
    {
      titleAr: 'خدمات الضيافة',
      titleEn: 'Hospitality Services',
      descriptionAr: 'نوفر فرق ضيافة محترفة ومدربة لتقديم خدمات استقبال وتنظيم متكاملة تعكس صورة احترافية لعملائنا وزوارهم.',
      descriptionEn: 'We provide professional and trained hospitality teams to deliver integrated reception and organization services that reflect a professional image for our clients and their visitors.',
      icon: 'Users',
      image: '/images/services/hospitality_reception.png',
      order: 2,
    },
    {
      titleAr: 'خدمات البستنة وتنسيق الحدائق',
      titleEn: 'Landscaping Services',
      descriptionAr: 'نصمم وننفذ حلول البستنة وتنسيق الحدائق الداخلية والخارجية لتحسين المظهر الجمالي والبيئة المحيطة بالمنشآت.',
      descriptionEn: 'We design and implement indoor and outdoor landscaping and gardening solutions to enhance the aesthetic appearance and environment surrounding the facilities.',
      icon: 'TreePine',
      image: '/images/services/landscaping_irrigation.png',
      order: 3,
    },
    {
      titleAr: 'خدمات مكافحة الآفات والقوارض',
      titleEn: 'Pest Control Services',
      descriptionAr: 'نطبق برامج متكاملة لمكافحة الآفات والقوارض باستخدام أحدث التقنيات والمبيدات الآمنة بيئياً لحماية المنشآت.',
      descriptionEn: 'We apply integrated pest and rodent control programs using the latest technologies and environmentally safe pesticides to protect facilities.',
      icon: 'Bug',
      image: '/images/services/pest_control.png',
      order: 4,
    },
    {
      titleAr: 'خدمات تنظيف واجهات المباني',
      titleEn: 'Building Facade Cleaning',
      descriptionAr: 'نقدم خدمات تنظيف الواجهات الزجاجية والخرسانية باستخدام تقنيات الوصول المتخصص لضمان مظهر لامع ونظيف للمباني.',
      descriptionEn: 'We offer glass and concrete facade cleaning services using specialized access techniques to ensure a shiny and clean appearance for buildings.',
      icon: 'Building2',
      image: '/images/services/facade_cleaning.png',
      order: 5,
    },
    {
      titleAr: 'الأنظمة الكهربائية',
      titleEn: 'Electrical Systems',
      descriptionAr: 'نوفر صيانة وإصلاح الأنظمة الكهربائية الوقائية والطارئة لضمان استمرارية التشغيل وسلامة المنشأة.',
      descriptionEn: 'We provide preventive and emergency electrical systems maintenance and repair to ensure operation continuity and facility safety.',
      icon: 'Zap',
      image: '/images/services/integrated_facility.png',
      order: 6,
    },
    {
      titleAr: 'أنظمة التدفئة والتهوية وتكييف الهواء',
      titleEn: 'HVAC Systems',
      descriptionAr: 'نقدم صيانة شاملة لأنظمة التدفئة والتهوية وتكييف الهواء لتحسين جودة الهواء الداخلي وكفاءة استهلاك الطاقة.',
      descriptionEn: 'We offer comprehensive maintenance for HVAC systems to improve indoor air quality and energy consumption efficiency.',
      icon: 'Wind',
      image: '/images/services/technical_maintenance.png',
      order: 7,
    },
    {
      titleAr: 'أنظمة السباكة',
      titleEn: 'Plumbing Systems',
      descriptionAr: 'نتعامل مع جميع أعمال السباكة من صيانة وإصلاح وتركيب لضمان تشغيل سلس للأنظمة المائية والصرف الصحي.',
      descriptionEn: 'We handle all plumbing works from maintenance, repair, and installation to ensure smooth operation of water and sanitation systems.',
      icon: 'Droplets',
      image: '/images/services/plumbing.png',
      order: 8,
    },
    {
      titleAr: 'أنظمة السلامة والمصاعد والسلالم المتحركة',
      titleEn: 'Safety, Elevators & Escalators',
      descriptionAr: 'نوفر صيانة دورية لأنظمة السلامة والمصاعد والسلالم المتحركة وفقاً للمعايير والمتطلبات الفنية المعتمدة.',
      descriptionEn: 'We provide regular maintenance for safety systems, elevators, and escalators in accordance with approved standards and technical requirements.',
      icon: 'Shield',
      image: '/images/services/page3_img16.jpg',
      order: 9,
    },
    {
      titleAr: 'حمامات السباحة',
      titleEn: 'Swimming Pools',
      descriptionAr: 'نقدم خدمات صيانة وتنظيف حمامات السباحة ومعالجة المياه للحفاظ على نظافة وسلامة البيئة المائية.',
      descriptionEn: 'We offer swimming pools maintenance, cleaning, and water treatment services to preserve the cleanliness and safety of the aquatic environment.',
      icon: 'Waves',
      image: '/images/services/page3_img17.jpg',
      order: 10,
    },
    {
      titleAr: 'كاميرات المراقبة والاتصالات',
      titleEn: 'Surveillance & Communications',
      descriptionAr: 'نقوم بتركيب وصيانة أنظمة المراقبة بالكاميرات وشبكات الاتصالات لضمان الأمن والحماية الشاملة للمنشآت.',
      descriptionEn: 'We install and maintain CCTV surveillance systems and communication networks to ensure security and comprehensive protection for facilities.',
      icon: 'Camera',
      image: '/images/services/security_surveillance.png',
      order: 11,
    },
    {
      titleAr: 'التفتيش والتصوير الحراري',
      titleEn: 'Thermal Inspection',
      descriptionAr: 'نستخدم تقنيات التصوير الحراري المتقدمة لاكتشاف الأعطال الخفية في الأنظمة الكهربائية والميكانيكية قبل تفاقمها.',
      descriptionEn: 'We use advanced thermal imaging technologies to detect hidden faults in electrical and mechanical systems before they escalate.',
      icon: 'Thermometer',
      image: '/images/services/thermal_inspection.jpg',
      order: 12,
    },
    {
      titleAr: 'الهياكل والدهانات والأرضيات والأسقف',
      titleEn: 'Structures, Paints, Floors & Ceilings',
      descriptionAr: 'نقدم حلول متكاملة لصيانة الهياكل الإنشائية والدهانات والأرضيات والأسقف مع استخدام مواد عالية الجودة.',
      descriptionEn: 'We offer integrated solutions for the maintenance of structures, painting, flooring, and ceilings using high-quality materials.',
      icon: 'Paintbrush',
      image: '/images/services/structure_finishing.png',
      order: 13,
    },
    {
      titleAr: 'أعمال الحديد والنجارة',
      titleEn: 'Metal & Carpentry Works',
      descriptionAr: 'ننفذ أعمال الحديد والنجارة بمهارة عالية تشمل التصنيع والتركيب والإصلاح لجميع متطلبات المنشأة.',
      descriptionEn: 'We perform steel and carpentry works with high skill, including fabrication, installation, and repair for all facility requirements.',
      icon: 'Hammer',
      image: '/images/services/metal_carpentry.jpg',
      order: 14,
    },
    {
      titleAr: 'أنظمة الري',
      titleEn: 'Irrigation Systems',
      descriptionAr: 'نصمم ونثبت ونصنع أنظمة الري الذكية والآلية لضمان الري الفعال والموفر للمياه في المساحات الخضراء.',
      descriptionEn: 'We design, install, and construct smart and automatic irrigation systems to ensure efficient and water-saving irrigation in green spaces.',
      icon: 'Droplet',
      image: '/images/services/landscaping_irrigation.png',
      order: 15,
    },
    {
      titleAr: 'معطرات المباني',
      titleEn: 'Building Fragrance',
      descriptionAr: 'نوفر حلول تعطير احترافية للمنشآت التجارية والفندقية لخلق بيئة مريحة ومرحبة للزوار والموظفين.',
      descriptionEn: 'We provide professional scenting solutions for commercial and hospitality facilities to create a comfortable and welcoming environment for visitors and employees.',
      icon: 'SprayCan',
      image: '/images/services/facade_cleaning.png',
      order: 16,
    },
  ]

  for (const service of services) {
    await prisma.service.create({ data: service })
  }
  console.log(`✅ Seeded ${services.length} services`)

  // ─── Partners ────────────────────────────────────────────────────
  const partners = [
    // Saudi Partners
    { name: 'وزارة الدفاع', logo: '/images/partners/الشركة السعودية.png', country: 'KSA', order: 1 },
    { name: 'أرامكو السعودية', logo: '/images/partners/الرياض.png', country: 'KSA', order: 2 },
    { name: 'اليمامة', logo: '/images/partners/اليمامة.png', country: 'KSA', order: 3 },
    { name: 'دار الرياض', logo: '/images/partners/دار الرياض.png', country: 'KSA', order: 4 },
    { name: 'فقيه', logo: '/images/partners/فقيه.png', country: 'KSA', order: 5 },
    { name: 'الزيني', logo: '/images/partners/الزيني.png', country: 'KSA', order: 6 },
    { name: 'عبد اللطيف جميل', logo: '/images/partners/عبد اللطيف جميل .png', country: 'KSA', order: 7 },
    { name: 'جمعية البر', logo: '/images/partners/حمعية البر.png', country: 'KSA', order: 8 },
    
    // Egypt Partners
    { name: 'Developer X', logo: '/images/partners/DEVLOPER X.png', country: 'Egypt', order: 9 },
    { name: 'Living Yards', logo: '/images/partners/LIVING YARDS.png', country: 'Egypt', order: 10 },
    { name: 'A B M', logo: '/images/partners/A B M.png', country: 'Egypt', order: 11 },
    { name: 'Lexus', logo: '/images/partners/LEXUS.png', country: 'Egypt', order: 12 },
    { name: 'King\'s', logo: '/images/partners/KING\'S.png', country: 'Egypt', order: 13 },
    { name: 'RG Fit', logo: '/images/partners/RG FIT.png', country: 'Egypt', order: 14 },
    { name: 'Saba', logo: '/images/partners/SABA.png', country: 'Egypt', order: 15 },
    { name: 'RPC', logo: '/images/partners/RPC.png', country: 'Egypt', order: 16 },
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
      image: '/images/branches/jeddah_branch.png',
      latitude: 21.5433,
      longitude: 39.1728,
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
      image: '/images/branches/cairo_branch.png',
      latitude: 30.0444,
      longitude: 31.2357,
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