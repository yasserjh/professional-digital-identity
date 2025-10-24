/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useEffect, Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

import { generateStyledImage } from '../services/geminiClient';
import { STYLES } from '../lib/prompts';
import { GeneratedImage } from '../lib/types';
import Button from './ui/Button';
import ResultCard from './ResultCard';

type AppState = 'image-uploaded' | 'generating' | 'results-shown';

interface ResultsGridProps {
    appState: AppState;
    setAppState: Dispatch<SetStateAction<AppState>>;
    uploadedImage: string;
    generatedImages: Record<string, GeneratedImage>;
    setGeneratedImages: Dispatch<SetStateAction<Record<string, GeneratedImage>>>;
    handleReset: () => void;
    handleRegenerateAll: () => void;
    credits: number;
}

const ResultsGrid: React.FC<ResultsGridProps> = ({
    appState,
    setAppState,
    uploadedImage,
    generatedImages,
    setGeneratedImages,
    handleReset,
    handleRegenerateAll,
    credits
}) => {
    const { t } = useTranslation();

    useEffect(() => {
        const startGeneration = async () => {
            if (appState === 'image-uploaded' || appState === 'generating') {
                if (appState === 'image-uploaded') {
                    setAppState('generating');
                }
                
                const initialImages: Record<string, GeneratedImage> = {};
                STYLES.forEach(style => {
                    initialImages[style.key] = { status: 'pending' };
                });
                setGeneratedImages(initialImages);

                const concurrencyLimit = 2;
                const stylesQueue = [...STYLES];

                const processStyle = async (style: typeof STYLES[0]) => {
                    try {
                        const resultUrl = await generateStyledImage(uploadedImage, style);
                        setGeneratedImages(prev => ({
                            ...prev,
                            [style.key]: { status: 'done', url: resultUrl },
                        }));
                    } catch (err) {
                        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
                        setGeneratedImages(prev => ({
                            ...prev,
                            [style.key]: { status: 'error', error: errorMessage },
                        }));
                        console.error(`Failed to generate image for ${style.key}:`, err);
                    }
                };

                const workers = Array(concurrencyLimit).fill(null).map(async () => {
                    while (stylesQueue.length > 0) {
                        const style = stylesQueue.shift();
                        if (style) {
                            await processStyle(style);
                        }
                    }
                });

                await Promise.all(workers);
                setAppState('results-shown');
            }
        };

        startGeneration();
    }, [uploadedImage, appState, setAppState, setGeneratedImages]);

    const handleDownloadAll = () => {
        // This is a simplified version. A real implementation might zip files.
        Object.values(generatedImages).forEach(image => {
            if (image.status === 'done' && image.url) {
                const link = document.createElement('a');
                link.href = image.url;
                link.download = `egal-${Date.now()}.jpg`;
                link.click();
            }
        });
    };

    return (
        <div className="w-full flex flex-col items-center">
            <AnimatePresence>
                {appState === 'generating' && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-2xl font-semibold text-[#1B1B1B]">{t('results.generating')}</h2>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {STYLES.map((style, index) => {
                    const styleName = t(`styles.${style.key}`, style.key); // Fallback to key
                    return (
                        <motion.div
                            key={style.key}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            <ResultCard
                                status={generatedImages[style.key]?.status || 'pending'}
                                imageUrl={generatedImages[style.key]?.url}
                                caption={styleName}
                            />
                        </motion.div>
                    );
                })}
            </div>

            <div className="py-8 mt-4 flex items-center justify-center w-full">
                {appState === 'results-shown' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md"
                    >
                        <Button onClick={handleReset} variant="secondary" className="w-full sm:w-auto">{t('results.startOver')}</Button>
                        <Button onClick={handleRegenerateAll} disabled={credits <= 0} className="w-full sm:w-auto">{t('results.regenerate')}</Button>
                        <Button onClick={handleDownloadAll} className="w-full sm:w-auto">{t('results.downloadAll')}</Button>
                    </motion.div>
                )}
            </div>

            {appState === 'results-shown' && credits <= 0 && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center p-4 border border-neutral-300 rounded-lg bg-neutral-50 w-full max-w-md"
                >
                    <p className="font-semibold text-lg">{t('results.noCredits')}</p>
                    <div className="mt-4 flex gap-2">
                        <input type="text" placeholder={t('results.enterCode')} className="flex-grow p-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-[#008080] focus:outline-none" />
                        <Button size="sm" variant="secondary">{t('results.redeem')}</Button>
                    </div>
                </motion.div>
            )}

        </div>
    );
};

export default ResultsGrid;
