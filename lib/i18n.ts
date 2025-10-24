/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Header & Footer
      "header.title": "Egal",
      "header.credits": "Credits: {{count}}",
      "footer.developedBy": "Developed by Yasir Aljohani.",
      "footer.privacy": "Privacy Policy",
      "footer.terms": "Terms of Use",
      "footer.contact": "Contact",

      // Hero Section
      "hero.tagline": "Wear your identity — digitally.",
      "hero.description": "Upload a clear, front-facing photo to generate your professional Saudi digital identity. Your photo is processed once and never stored.",
      "hero.cta": "Upload Photo",
      
      // Upload Validation
      "upload.error.title": "Upload Error",
      "upload.error.size": "File is too large. Please upload an image under {{maxSize}}MB.",
      "upload.error.format": "Unsupported format. Please upload a JPEG or PNG image.",
      "upload.error.generic": "Something went wrong. Please try again.",

      // Results Section
      "results.generating": "Perfecting your Saudi look…",
      "results.regenerate": "Regenerate",
      "results.download": "Download",
      "results.downloadAll": "Download All",
      "results.startOver": "Start Over",
      "results.generatingError": "Generation Failed",
      "results.tryAgain": "Please try again.",
      "results.noCredits": "No credits remaining.",
      "results.redeemCode": "Redeem Code",
      "results.enterCode": "Enter code...",
      "results.redeem": "Redeem",

      // General
      "common.loading": "Loading...",
    }
  },
  ar: {
    translation: {
      // Header & Footer
      "header.title": "عقال",
      "header.credits": "الرصيد: {{count}}",
      "footer.developedBy": "تطوير ياسر الجهني.",
      "footer.privacy": "سياسة الخصوصية",
      "footer.terms": "شروط الاستخدام",
      "footer.contact": "اتصل بنا",

      // Hero Section
      "hero.tagline": "ارتدِ هويتك — رقميًا.",
      "hero.description": "حمّل صورة شخصية واضحة للحصول على هويتك الرقمية السعودية الاحترافية. تتم معالجة صورتك لمرة واحدة فقط ولا يتم تخزينها.",
      "hero.cta": "حمّل الصورة",

      // Upload Validation
      "upload.error.title": "خطأ في التحميل",
      "upload.error.size": "حجم الملف كبير جدًا. الرجاء تحميل صورة أصغر من {{maxSize}} ميجابايت.",
      "upload.error.format": "صيغة غير مدعومة. الرجاء تحميل صورة بصيغة JPEG أو PNG.",
      "upload.error.generic": "حدث خطأ ما. الرجاء المحاولة مرة أخرى.",

      // Results Section
      "results.generating": "نعمل على إتقان مظهرك السعودي...",
      "results.regenerate": "إعادة الإنشاء",
      "results.download": "تحميل",
      "results.downloadAll": "تحميل الكل",
      "results.startOver": "البدء من جديد",
      "results.generatingError": "فشل الإنشاء",
      "results.tryAgain": "الرجاء المحاولة مرة أخرى.",
      "results.noCredits": "لا يوجد رصيد متبقي.",
      "results.redeemCode": "استخدام الرمز",
      "results.enterCode": "أدخل الرمز...",
      "results.redeem": "استخدام",

      // General
      "common.loading": "جاري التحميل...",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('egal-lang') || 'en', // Persist language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

i18n.on('languageChanged', (lng) => {
    localStorage.setItem('egal-lang', lng);
});

export default i18n;
