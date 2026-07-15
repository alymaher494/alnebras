import { db } from './db'

export async function checkAndAutoSeed() {
  try {
    const settingsCount = await db.siteSetting.count()
    if (settingsCount > 0) {
      return // Already seeded
    }

    console.log('🌱 Database is empty. Running auto-seeding...')

    // 1. Seed Site Settings
    const settings = [
      { key: 'company_name_ar', value: 'النبراس لإدارة المرافق' },
      { key: 'company_name_en', value: 'Alnebras Facilities Management' },
      { key: 'about_text_ar', value: 'شركة وطنية رائدة متخصصة في تقديم خدمات متكاملة لإدارة المرافق والتشغيل والصيانة.' },
      { key: 'about_text_en', value: 'A leading national company specializing in providing integrated facilities management, operation, and maintenance services.' },
      { key: 'vision_ar', value: 'الريادة والتميز في تقديم خدمات إدارة المرافق والحلول الذكية والمتكاملة.' },
      { key: 'vision_en', value: 'Leadership and excellence in providing facilities management services and smart, integrated solutions.' },
      { key: 'mission_ar', value: 'تقديم خدمات تفوق تطلعات عملائنا باستخدام أحدث التقنيات وأفضل الكفاءات المهنية.' },
      { key: 'mission_en', value: 'Providing services that exceed our clients\' expectations using the latest technologies and best professional competencies.' },
      { key: 'goals_ar', value: 'تعزيز ورفع مبادئ الجودة والاستدامة|التعاون مع العملاء لتصميم استراتيجيات مخصصة|تحسين منهجيات خدمة الدعم بشكل مستمر' },
      { key: 'goals_en', value: 'Promoting and elevating quality and sustainability|Collaborating with clients to design customized strategies|Continuously improving support service methodologies' },
      { key: 'values_ar', value: 'الجودة|السلامة والأمان|روح الفريق|النزاهة|الابتكار' },
      { key: 'values_en', value: 'Quality|Safety & Security|Teamwork|Integrity|Innovation' },
      { key: 'ceo_message_ar', value: 'في النبراس، نؤمن بأن إدارة المرافق ليست مجرد خدمة، بل هي شراكة حقيقية نسعى من خلالها إلى تحقيق التميز والاستدامة لعملائنا.' },
      { key: 'ceo_message_en', value: 'At Alnebras, we believe that facilities management is not just a service, but a true partnership through which we seek to achieve excellence and sustainability.' },
      { key: 'hero_title_ar', value: 'حلول ذكية لإدارة المرافق' },
      { key: 'hero_title_en', value: 'Smart Facilities Management Solutions' },
      { key: 'hero_subtitle_ar', value: 'نرفع كفاءة منشأتك ونضمن استمرارية أعمالك بأعلى معايير الجودة والاحترافية' },
      { key: 'hero_subtitle_en', value: 'We elevate the efficiency of your facility and ensure your business continuity with the highest standards of quality and professionalism.' },
    ]

    await db.siteSetting.createMany({ data: settings })

    // 2. Seed Services
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
    ]

    await db.service.createMany({ data: services })

    // 3. Seed Partners
    const partners = [
      { name: 'وزارة الدفاع', logo: '/images/partners/الشركة السعودية.png', country: 'KSA', order: 1 },
      { name: 'أرامكو السعودية', logo: '/images/partners/الرياض.png', country: 'KSA', order: 2 },
      { name: 'اليمامة', logo: '/images/partners/اليمامة.png', country: 'KSA', order: 3 },
      { name: 'Developer X', logo: '/images/partners/DEVLOPER X.png', country: 'Egypt', order: 9 },
      { name: 'Living Yards', logo: '/images/partners/LIVING YARDS.png', country: 'Egypt', order: 10 },
      { name: 'A B M', logo: '/images/partners/A B M.png', country: 'Egypt', order: 11 },
    ]

    await db.partner.createMany({ data: partners })

    // 4. Seed Branches
    const branches = [
      {
        country: 'Saudi Arabia',
        countryAr: 'المملكة العربية السعودية',
        city: 'Jeddah',
        cityAr: 'جدة',
        address: 'Al-Ruwais, Al-Madina Road, Al-Mohammadiya Plaza Building 31, 3rd Floor, Office 4963',
        addressAr: 'حي الرويس، طريق المدينة، مبني المحمدية بلازا 31، الطابق الثالث، مكتب رقم 4963',
        phone: '966543272271',
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
        phone: '201117311149',
        email: 'info@alnebras.com.sa',
        image: '/images/branches/cairo_branch.png',
        latitude: 30.0444,
        longitude: 31.2357,
        order: 2,
      },
    ]

    await db.branch.createMany({ data: branches })
    console.log('✅ Auto-seeding completed successfully!')
  } catch (err) {
    console.error('Error during auto-seeding:', err)
  }
}
