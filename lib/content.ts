/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export const translations = {
    ar: {
        mainTitle: "الهوية الرقمية",
        appTitle: "اصنع هويتك الرقمية الاحترافية",
        appSubtitle: "حمّل صورتك الشخصية واحصل على صور احترافية بالزي السعودي الرسمي، معززة بالذكاء الاصطناعي.",
        uploadButton: "حمّل صورتك الآن",
        yourPhoto: "صورتك الحالية",
        changePhotoButton: "تغيير الصورة",
        generateButton: "إنشاء الصور",
        generatingTitle: "جاري إنشاء هويتك...",
        generatingSubtitle: "نعمل على إتقان مظهرك السعودي الاحترافي...",
        downloadAlbumButton: "تحميل الألبوم كاملًا",
        creatingAlbumButton: "جاري إنشاء الألبوم...",
        startOverButton: "ابدأ من جديد",
        regenerateAllButton: "إعادة إنشاء الكل",
        albumWaitError: "يرجى الانتظار حتى تكتمل جميع الصور قبل تحميل الألبوم.",
        albumCreationError: "عذرًا، حدث خطأ أثناء إنشاء الألبوم. يرجى المحاولة مرة أخرى.",
        albumTitle: "هويتي الرقمية الاحترافية",
        albumSubtitle: "تم إنشاؤها بواسطة Google AI Studio",
        geminiPrompt: "Create a cinematic, ultra-realistic corporate headshot of the person in this photo. Their identity, face, and skin tone must be perfectly preserved. Perform professional skin cleanup and enhance facial clarity, sharpness, and color balance for a studio-grade look. Dress them in {styleDescription}. The attire must be 100% authentic Saudi style only, with no elements from other GCC/regional cultures. The background should be {backgroundDescription}. The final image must have clean edges, soft shadows, and be high-resolution (at least 2048px on the longest edge), suitable for a professional profile or print."
    },
    en: {
        mainTitle: "Digital Identity",
        appTitle: "Create Your Professional Digital Identity",
        appSubtitle: "Upload your photo and get professional-grade images in official Saudi attire, enhanced by AI.",
        uploadButton: "Upload Your Photo",
        yourPhoto: "Your Photo",
        changePhotoButton: "Change Photo",
        generateButton: "Generate Images",
        generatingTitle: "Generating Your Identity...",
        generatingSubtitle: "Perfecting your professional Saudi look...",
        downloadAlbumButton: "Download Full Album",
        creatingAlbumButton: "Creating Album...",
        startOverButton: "Start Over",
        regenerateAllButton: "Regenerate All",
        albumWaitError: "Please wait for all images to finish generating before downloading the album.",
        albumCreationError: "Sorry, there was an error creating your album. Please try again.",
        albumTitle: "My Professional Digital Identity",
        albumSubtitle: "Generated on Google AI Studio",
        geminiPrompt: "Create a cinematic, ultra-realistic corporate headshot of the person in this photo. Their identity, face, and skin tone must be perfectly preserved. Perform professional skin cleanup and enhance facial clarity, sharpness, and color balance for a studio-grade look. Dress them in {styleDescription}. The attire must be 100% authentic Saudi style only, with no elements from other GCC/regional cultures. The background should be {backgroundDescription}. The final image must have clean edges, soft shadows, and be high-resolution (at least 2048px on the longest edge), suitable for a professional profile or print."
    }
};

export const STYLES = [
    {
        key: 'executive-thobe',
        name: { ar: 'الثوب التنفيذي', en: 'Executive Thobe' }
    },
    {
        key: 'formal-bisht',
        name: { ar: 'البشت الرسمي', en: 'Formal Bisht' }
    },
    {
        key: 'modern-shemagh',
        name: { ar: 'الشماغ العصري', en: 'Modern Shemagh' }
    },
    {
        key: 'classic-ghutra',
        name: { ar: 'الغترة الكلاسيكية', en: 'Classic Ghutra' }
    },
    {
        key: 'subtle-luxury',
        name: { ar: 'الفخامة الهادئة', en: 'Subtle Luxury' }
    },
    {
        key: 'visionary-leader',
        name: { ar: 'نظرة قيادية', en: 'Visionary Leader' }
    }
];

export const STYLE_PROMPTS: Record<string, { prompt: { ar: string, en: string }, background: { ar: string, en: string }}> = {
    'executive-thobe': {
        prompt: {
            ar: "ثوب أبيض ناصع بقصّة تنفيذية أنيقة وخطوط نظيفة، مع ياقة مرتفعة قليلاً. قد يتضمن إكسسوارات بسيطة مثل قلم محبرة في الجيب أو أزرار أكمام فاخرة.",
            en: "a pristine white thobe with a sharp, executive cut and clean lines, featuring a slightly high collar. May include subtle accessories like a pen clipped to the pocket or elegant cufflinks."
        },
        background: {
            ar: "خلفية استوديو بلون رمادي فاتح أو أوف-وايت سادة، مع إضاءة احترافية وناعمة.",
            en: "a solid, light grey or off-white studio background with professional, soft lighting."
        }
    },
    'formal-bisht': {
        prompt: {
            ar: "بشت أسود فاخر بتطريز ذهبي دقيق على الأطراف، فوق ثوب أبيض ناصع وغترة بيضاء.",
            en: "a luxurious black bisht with fine golden embroidery (zari) on the trim, worn over a crisp white thobe and a white ghutra."
        },
        background: {
            ar: "خلفية بلون فحمي داكن سادة مع ملمس خفيف، وإضاءة استوديو درامية تبرز فخامة الزي الرسمي.",
            en: "a solid, deep charcoal grey background, subtly textured, with dramatic studio lighting to complement the formal attire."
        }
    },
    'modern-shemagh': {
        prompt: {
            ar: "ثوب رمادي فاتح بقماش فاخر، مع شماغ أحمر وأبيض ملفوف بطريقة 'الكوبرا' العصرية.",
            en: "a light grey thobe made from premium fabric, paired with a red-and-white shemagh folded in a modern 'cobra' style."
        },
        background: {
            ar: "خلفية بلون رمادي متوسط سادة ونظيفة، مع إضاءة عصرية متساوية لتسليط الضوء على تفاصيل الزي.",
            en: "a clean, solid medium-grey background with even, modern lighting to highlight the details of the attire."
        }
    },
    'classic-ghutra': {
        prompt: {
            ar: "ثوب أبيض كلاسيكي، مع غترة بيضاء نقية مطوية بطريقة رسمية ومتوازنة (طية الميزان).",
            en: "a classic white thobe, with a pure white ghutra folded in a formal, balanced Saudi style (butterfly fold)."
        },
        background: {
            ar: "خلفية بلون أوف-وايت ناعم أو بيج فاتح جداً سادة، مع إضاءة طبيعية وناعمة.",
            en: "a soft, off-white or very light beige solid background with natural, soft lighting."
        }
    },
    'subtle-luxury': {
        prompt: {
            ar: "ثوب بلون بيج أو كريمي بقماش فاخر، مع ساعة يد راقية تظهر بشكل واضح.",
            en: "a beige or cream-colored thobe from a luxurious fabric, with a high-end watch clearly visible."
        },
        background: {
            ar: "خلفية بلون بني داكن دافئ (توب) سادة، مع تدرج لوني خفيف وإضاءة مركزة.",
            en: "a solid, warm-toned dark taupe background with a subtle gradient and focused lighting."
        }
    },
    'visionary-leader': {
        prompt: {
            ar: "ثوب كحلي داكن بقصة عصرية، مع شماغ أبيض ملفوف بإحكام.",
            en: "a dark navy blue thobe with a modern cut, paired with a neatly wrapped white shemagh."
        },
        background: {
            ar: "خلفية بلون أزرق أردوازي بارد أو رمادي داكن سادة، مع إضاءة احترافية ونظيفة.",
            en: "a solid, cool-toned slate blue or dark grey background with clean, professional lighting."
        }
    }
};