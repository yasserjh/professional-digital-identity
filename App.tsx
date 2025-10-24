/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

import { AppConfig } from './config';
import useLocalStorage from './lib/hooks/useLocalStorage';
import { GeneratedImage } from './lib/types';
import { STYLES } from './lib/prompts';

import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ResultsGrid from './components/ResultsGrid';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import TermsOfService from './components/pages/TermsOfService';

type AppState = 'idle' | 'image-uploaded' | 'generating' | 'results-shown';
type Page = 'home' | 'privacy' | 'terms';

function App() {
    const { i18n } = useTranslation();
    const [page, setPage] = useState<Page>('home');
    const [appState, setAppState] = useState<AppState>('idle');
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [generatedImages, setGeneratedImages] = useState<Record<string, GeneratedImage>>({});
    const [credits, setCredits] = useLocalStorage('egal-credits', AppConfig.PAYMENT.INITIAL_CREDITS);
    const [generationKey, setGenerationKey] = useState(Date.now()); // Used to trigger re-generation

    // Set document language and direction
    useEffect(() => {
        document.documentElement.lang = i18n.language;
        document.documentElement.dir = i18n.dir();
    }, [i18n, i18n.language]);

    const handleReset = () => {
        setUploadedImage(null);
        setGeneratedImages({});
        setAppState('idle');
    };
    
    const handleRegenerateAll = () => {
        if (credits > 0) {
            setCredits(prev => prev - 1);
            setAppState('generating');
            const initialImages: Record<string, GeneratedImage> = {};
            STYLES.forEach(style => {
                initialImages[style.key] = { status: 'pending' };
            });
            setGeneratedImages(initialImages);
            setGenerationKey(Date.now()); // Trigger useEffect in ResultsGrid
        }
    };

    const renderPage = () => {
        switch (page) {
            case 'privacy': return <PrivacyPolicy />;
            case 'terms': return <TermsOfService />;
            case 'home':
            default:
                return (
                    <AnimatePresence mode="wait">
                        {appState === 'idle' && (
                            <motion.div
                                key="hero"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Hero
                                    onImageUploaded={(dataUrl) => {
                                        setUploadedImage(dataUrl);
                                        setAppState('image-uploaded');
                                    }}
                                />
                            </motion.div>
                        )}
                        {(appState === 'image-uploaded' || appState === 'generating' || appState === 'results-shown') && uploadedImage && (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-full"
                            >
                               <ResultsGrid
                                    key={generationKey}
                                    appState={appState}
                                    setAppState={setAppState}
                                    uploadedImage={uploadedImage}
                                    generatedImages={generatedImages}
                                    setGeneratedImages={setGeneratedImages}
                                    handleReset={handleReset}
                                    handleRegenerateAll={handleRegenerateAll}
                                    credits={credits}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                );
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col bg-white text-[#1B1B1B]">
            <Header setPage={setPage} credits={credits} />
            <main className="w-full max-w-7xl mx-auto flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
                {renderPage()}
            </main>
            <Footer setPage={setPage} />
        </div>
    );
}

export default App;
