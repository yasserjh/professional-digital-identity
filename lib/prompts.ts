/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

/**
 * The main prompt template sent to the Gemini API.
 * It's designed for high-quality, culturally authentic results.
 */
export const GEMINI_MAIN_PROMPT = `
Create a cinematic, ultra-realistic corporate headshot of the person in this photo. Their identity, face, and skin tone must be perfectly preserved. 
Perform professional skin cleanup and enhance facial clarity, sharpness, and color balance for a studio-grade look.
Dress them in {styleDescription}. The attire must be 100% authentic Saudi style only, with no elements from other GCC/regional cultures.
The background should be {backgroundDescription}.
The final image must have clean edges, soft shadows, and be high-resolution (at least 2048px on the longest edge), suitable for a professional profile or print.
`.trim();


/**
 * A curated list of authentic Saudi styles for generation.
 * Each style has a unique key and a detailed description for the AI model.
 */
export const STYLES = [
    {
        key: 'executive-thobe',
        styleDescription: "a pristine white thobe with a sharp, executive cut and clean lines, featuring a slightly high collar. May include subtle accessories like a pen clipped to the pocket or elegant cufflinks.",
        backgroundDescription: "a solid, light grey or off-white studio background with professional, soft lighting."
    },
    {
        key: 'formal-bisht',
        styleDescription: "a luxurious black bisht with fine golden embroidery (zari) on the trim, worn over a crisp white thobe and a white ghutra.",
        backgroundDescription: "a solid, deep charcoal grey background, subtly textured, with dramatic studio lighting to complement the formal attire."
    },
    {
        key: 'modern-shemagh',
        styleDescription: "a light grey thobe made from premium fabric, paired with a red-and-white shemagh folded in a modern, sharp Saudi style.",
        backgroundDescription: "a clean, solid medium-grey background with even, modern lighting to highlight the details of the attire."
    },
    {
        key: 'classic-ghutra',
        styleDescription: "a classic white thobe, with a pure white ghutra folded in a formal, balanced Saudi style (butterfly fold).",
        backgroundDescription: "a soft, off-white or very light beige solid background with natural, soft lighting."
    },
    {
        key: 'subtle-luxury',
        styleDescription: "a beige or cream-colored thobe from a luxurious fabric, with a high-end watch clearly visible.",
        backgroundDescription: "a solid, warm-toned dark taupe background with a subtle gradient and focused lighting."
    },
    {
        key: 'visionary-leader',
        styleDescription: "a dark navy blue thobe with a modern cut, paired with a neatly wrapped white shemagh.",
        backgroundDescription: "a solid, cool-toned slate blue or dark grey background with clean, professional lighting."
    }
];
