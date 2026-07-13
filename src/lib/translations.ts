export type TranslationKey = keyof typeof translations.ar

export const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    about: 'من نحن',
    services: 'إدارة المرافق',
    contracting: 'المقاولات العامة',
    'media-center': 'المركز الإعلامي',
    careers: 'الوظائف',
    events: 'الفعاليات',
    'supplier-portal': 'بوابة الموردين',
    contact: 'تواصل معنا',
    partners_page: 'شركاؤنا',

    // Hero
    discover_services: 'اكتشف خدماتنا',
    discover_more: 'اكتشف المزيد',

    // Stats
    years_experience: 'سنوات خبرة',
    completed_projects: 'مشروع منجز',
    satisfied_clients: 'عميل راضٍ',
    branches: 'فروعنا',

    // General Button / Actions
    read_more: 'اقرأ المزيد',
    view_all_services: 'عرض جميع الخدمات',
    send: 'إرسال',
    sending: 'جاري الإرسال...',
    upload_file: 'رفع ملف بروفايل الشركة',
    select_file: 'اختر ملفاً',

    // Titles
    vision: 'الرؤية',
    mission: 'الرسالة',
    values: 'قيمنا',
    goals: 'أهدافنا',
    ceo_message: 'رسالة الرئيس التنفيذي',
    ceo_title: 'الرئيس التنفيذي',
    our_services: 'خدماتنا',
    our_services_subtitle: 'حلول متكاملة ومتخصصة لإدارة المرافق وعملياتها وصيانتها',
    partners: 'شركاؤنا في النجاح',
    branches_title: 'فروعنا',
    contact_us: 'تواصل معنا',

    // Contact Form Labels
    name: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    phone: 'رقم الجوال',
    message: 'الرسالة',
    company_name: 'اسم الشركة',
    subject: 'الموضوع',
    send_message: 'إرسال الرسالة',
    message_success: 'تم إرسال رسالتك بنجاح!',
    supplier_success: 'تم تقديم طلب المورد بنجاح!',
    error_fill_fields: 'يرجى ملء جميع الحقول المطلوبة.',

    // Media Center
    news: 'الأخبار',
    photos: 'الصور',
    latest_news: 'آخر الأخبار',
    location: 'الموقع',
    date: 'التاريخ',

    // Supplier Portal Form
    supplier_portal_desc: 'يمكن للشركات التقدم للتسجيل كموردين معتمدين لدينا من خلال ملء النموذج التالي ورفع ملف التعريف الخاص بالشركة.',
    
    // Careers
    careers_title: 'انضم إلينا',
    careers_desc: 'نبحث دائماً عن الكفاءات والمواهب المتميزة للانضمام إلى فريقنا.',
    no_jobs: 'لا توجد وظائف شاغرة حالياً. يرجى مراجعة الصفحة لاحقاً.',
    apply_now: 'تقدم الآن',

    // Contracting Teaser
    contracting_desc: 'نعمل على تقديم خدمات المقاولات العامة والإنشائية بأعلى مستويات الجودة والاحترافية.',
    details_soon: 'التفاصيل قريباً',
  },
  en: {
    // Navigation
    home: 'Home',
    about: 'About Us',
    services: 'Facility Management',
    contracting: 'General Contracting',
    'media-center': 'Media Center',
    careers: 'Careers',
    events: 'Events',
    'supplier-portal': 'Supplier Portal',
    contact: 'Contact Us',
    partners_page: 'Our Partners',

    // Hero
    discover_services: 'Discover Our Services',
    discover_more: 'Discover More',

    // Stats
    years_experience: 'Years of Experience',
    completed_projects: 'Projects Completed',
    satisfied_clients: 'Satisfied Clients',
    branches: 'Branches',

    // General Button / Actions
    read_more: 'Read More',
    view_all_services: 'View All Services',
    send: 'Send Request',
    sending: 'Sending...',
    upload_file: 'Upload Company Profile',
    select_file: 'Select a file',

    // Titles
    vision: 'Vision',
    mission: 'Mission',
    values: 'Our Values',
    goals: 'Our Goals',
    ceo_message: 'CEO Message',
    ceo_title: 'CEO',
    our_services: 'Our Services',
    our_services_subtitle: 'Integrated and specialized solutions for facilities management, operations, and maintenance',
    partners: 'Our Partners in Success',
    branches_title: 'Our Branches',
    contact_us: 'Contact Us',

    // Contact Form Labels
    name: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    message: 'Message',
    company_name: 'Company Name',
    subject: 'Subject',
    send_message: 'Send Message',
    message_success: 'Your message has been sent successfully!',
    supplier_success: 'Supplier request submitted successfully!',
    error_fill_fields: 'Please fill in all required fields.',

    // Media Center
    news: 'News',
    photos: 'Photos',
    latest_news: 'Latest News',
    location: 'Location',
    date: 'Date',

    // Supplier Portal Form
    supplier_portal_desc: 'Companies can register as certified suppliers by filling out the form below and uploading their company profile.',

    // Careers
    careers_title: 'Join Our Team',
    careers_desc: 'We are always looking for outstanding talents and competencies to join our growing team.',
    no_jobs: 'No vacant positions currently. Please check back later.',
    apply_now: 'Apply Now',

    // Contracting Teaser
    contracting_desc: 'We provide general contracting and construction services at the highest levels of quality and professionalism.',
    details_soon: 'Details Coming Soon',
  },
}

export function useTranslation(language: 'ar' | 'en') {
  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations['ar'][key] || String(key)
  }
  return { t, language }
}
