/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, ChangeEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateStyledImage } from './services/geminiService';
import PolaroidCard from './components/PolaroidCard';
import { createAlbumPage } from './lib/albumUtils';
import Footer from './components/Footer';
import { translations, STYLES, STYLE_PROMPTS } from './lib/content';

type ImageStatus = 'pending' | 'done' | 'error';
interface GeneratedImage {
    status: ImageStatus;
    url?: string;
    error?: string;
}

const primaryButtonClasses = "font-bold text-lg text-center text-white bg-[#0B3D2C] py-3 px-8 rounded-md transition-all duration-300 hover:bg-[#1A5943] shadow-lg";
const secondaryButtonClasses = "font-bold text-lg text-center text-[#0B3D2C] bg-transparent border-2 border-[#0B3D2C] py-3 px-8 rounded-md transition-all duration-300 hover:bg-[#0B3D2C] hover:text-white";
const tertiaryButtonClasses = "font-bold text-lg text-center text-neutral-600 bg-transparent py-3 px-8 rounded-md transition-all duration-300 hover:bg-neutral-200";

function App() {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [generatedImages, setGeneratedImages] = useState<Record<string, GeneratedImage>>({});
    const [isDownloading, setIsDownloading] = useState<boolean>(false);
    const [appState, setAppState] = useState<'idle' | 'image-uploaded' | 'generating' | 'results-shown'>('idle');
    const [language, setLanguage] = useState<'ar' | 'en'>('en');

    const t = (key: keyof typeof translations.en) => translations[language][key];

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result as string);
                setAppState('image-uploaded');
                setGeneratedImages({});
            };
            reader.readAsDataURL(file);
        }
    };

    const startGeneration = async () => {
        if (!uploadedImage) return;

        setAppState('generating');
        const initialImages: Record<string, GeneratedImage> = {};
        STYLES.forEach(style => {
            initialImages[style.key] = { status: 'pending' };
        });
        setGeneratedImages(initialImages);

        const concurrencyLimit = 2;
        const stylesQueue = [...STYLES];

        const processStyle = async (styleKey: string) => {
            try {
                const styleDetails = STYLE_PROMPTS[styleKey];
                const prompt = t('geminiPrompt')
                    .replace('{styleDescription}', styleDetails.prompt[language])
                    .replace('{backgroundDescription}', styleDetails.background[language]);
                
                const resultUrl = await generateStyledImage(uploadedImage, prompt);
                setGeneratedImages(prev => ({
                    ...prev,
                    [styleKey]: { status: 'done', url: resultUrl },
                }));
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
                setGeneratedImages(prev => ({
                    ...prev,
                    [styleKey]: { status: 'error', error: errorMessage },
                }));
                console.error(`Failed to generate image for ${styleKey}:`, err);
            }
        };

        const workers = Array(concurrencyLimit).fill(null).map(async () => {
            while (stylesQueue.length > 0) {
                const style = stylesQueue.shift();
                if (style) {
                    await processStyle(style.key);
                }
            }
        });

        await Promise.all(workers);
        setAppState('results-shown');
    };
    
    const handleReset = () => {
        setUploadedImage(null);
        setGeneratedImages({});
        setAppState('idle');
    };

    const handleDownloadIndividualImage = (styleKey: string) => {
        const image = generatedImages[styleKey];
        if (image?.status === 'done' && image.url) {
            const link = document.createElement('a');
            link.href = image.url;
            link.download = `professional-attire-${styleKey}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleDownloadAlbum = async () => {
        setIsDownloading(true);
        try {
            const imageData = STYLES.reduce((acc, style) => {
                const image = generatedImages[style.key];
                if (image?.status === 'done' && image.url) {
                    acc[style.name[language]] = image.url;
                }
                return acc;
            }, {} as Record<string, string>);

            if (Object.keys(imageData).length < STYLES.length) {
                alert(t('albumWaitError'));
                return;
            }

            const albumDataUrl = await createAlbumPage(imageData, t('albumTitle'), t('albumSubtitle'));
            const link = document.createElement('a');
            link.href = albumDataUrl;
            link.download = 'professional-attire-album.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Failed to create or download album:", error);
            alert(t('albumCreationError'));
        } finally {
            setIsDownloading(false);
        }
    };
    
    const toggleLanguage = () => {
        setLanguage(prev => (prev === 'ar' ? 'en' : 'ar'));
    };

    const geometricBackground = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230B3D2C' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

    return (
        <main className="bg-[#F5F5DC] text-[#333] min-h-screen w-full flex flex-col items-center justify-between p-4 font-tajawal relative" style={{ backgroundImage: geometricBackground }}>
            <header className="w-full max-w-7xl mx-auto flex justify-between items-center p-4 z-10">
                <h1 className="text-2xl font-extrabold text-[#0B3D2C]">{t('mainTitle')}</h1>
                <button onClick={toggleLanguage} className="font-bold text-lg text-[#0B3D2C] border-2 border-[#0B3D2C] px-4 py-1 rounded-md hover:bg-[#0B3D2C] hover:text-white transition-colors">
                    {language === 'ar' ? 'English' : 'العربية'}
                </button>
            </header>
            
            <div className="z-10 flex flex-col items-center justify-center w-full flex-1 min-h-0 text-center px-4">
                
                {appState === 'idle' && (
                    <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.8 }}
                         className="flex flex-col items-center"
                    >
                        <h2 className="text-4xl md:text-6xl font-extrabold text-[#0B3D2C] max-w-3xl leading-tight">{t('appTitle')}</h2>
                        <p className="text-xl text-neutral-600 mt-4 max-w-2xl">{t('appSubtitle')}</p>
                        <label htmlFor="file-upload" className={`cursor-pointer mt-10 ${primaryButtonClasses}`}>
                            {t('uploadButton')}
                        </label>
                        <input id="file-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleImageUpload} />
                    </motion.div>
                )}

                {appState === 'image-uploaded' && uploadedImage && (
                     <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex flex-col items-center gap-6"
                        >
                             <PolaroidCard 
                                imageUrl={uploadedImage} 
                                caption={t('yourPhoto')}
                                status="done"
                             />
                             <div className="flex items-center gap-4 mt-4">
                                <button onClick={handleReset} className={secondaryButtonClasses}>
                                    {t('changePhotoButton')}
                                </button>
                                <button onClick={startGeneration} className={primaryButtonClasses}>
                                    {t('generateButton')}
                                </button>
                             </div>
                        </motion.div>
                    </AnimatePresence>
                )}

                {(appState === 'generating' || appState === 'results-shown') && (
                     <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col items-center">
                        <AnimatePresence>
                            {appState === 'generating' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center mb-8"
                                >
                                    <h2 className="text-3xl font-bold text-[#0B3D2C]">{t('generatingTitle')}</h2>
                                    <p className="text-lg text-neutral-600 mt-2">{t('generatingSubtitle')}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                            {STYLES.map((style, index) => (
                                <motion.div
                                    key={style.key}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ type: 'spring', stiffness: 100, damping: 20, delay: index * 0.1 }}
                                >
                                    <PolaroidCard
                                        caption={style.name[language]}
                                        status={generatedImages[style.key]?.status || 'pending'}
                                        imageUrl={generatedImages[style.key]?.url}
                                        error={generatedImages[style.key]?.error}
                                        onDownload={() => handleDownloadIndividualImage(style.key)}
                                    />
                                </motion.div>
                            ))}
                        </div>
                         
                         <div className="py-8 flex items-center justify-center">
                            {appState === 'results-shown' && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    className="flex flex-col sm:flex-row items-center gap-4"
                                >
                                    <button onClick={handleReset} className={tertiaryButtonClasses}>
                                        {t('startOverButton')}
                                    </button>
                                     <button onClick={startGeneration} className={secondaryButtonClasses}>
                                        {t('regenerateAllButton')}
                                    </button>
                                    <button 
                                        onClick={handleDownloadAlbum} 
                                        disabled={isDownloading} 
                                        className={`${primaryButtonClasses} disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        {isDownloading ? t('creatingAlbumButton') : t('downloadAlbumButton')}
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}

export default App;