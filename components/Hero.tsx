/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { validateFile, processImageBeforeUpload } from '../lib/validation';
import { AppConfig } from '../config';

interface HeroProps {
    onImageUploaded: (dataUrl: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onImageUploaded }) => {
    const { t } = useTranslation();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsLoading(true);
        setError(null);

        const validation = validateFile(file);
        if (!validation.isValid) {
            const errorKey = validation.error === 'size' 
                ? t('upload.error.size', { maxSize: AppConfig.VALIDATION.MAX_FILE_SIZE_MB })
                : t('upload.error.format');
            setError(errorKey);
            setIsLoading(false);
            return;
        }

        try {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const originalDataUrl = e.target?.result as string;
                    const processedDataUrl = await processImageBeforeUpload(originalDataUrl);
                    onImageUploaded(processedDataUrl);
                } catch (procError) {
                    setError(t('upload.error.generic'));
                    console.error("Image processing failed:", procError);
                } finally {
                    setIsLoading(false);
                }
            };
            reader.onerror = () => {
                setError(t('upload.error.generic'));
                setIsLoading(false);
            };
            reader.readAsDataURL(file);

        } catch (err) {
            setError(t('upload.error.generic'));
            setIsLoading(false);
            console.error("File handling failed:", err);
        }
    };

    return (
        <div className="text-center flex flex-col items-center justify-center py-16 px-4">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-6xl font-bold text-[#1B1B1B] max-w-3xl leading-tight"
            >
                {t('hero.tagline')}
            </motion.h1>
            
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-neutral-600 mt-4 max-w-xl"
            >
                {t('hero.description')}
            </motion.p>
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-10"
            >
                <Button
                    onClick={handleUploadClick}
                    isLoading={isLoading}
                    size="lg"
                >
                    {t('hero.cta')}
                </Button>
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept={AppConfig.VALIDATION.SUPPORTED_FORMATS.join(',')}
                    onChange={handleFileChange}
                />
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-4 text-sm text-neutral-500"
            >
                {t('hero.samplePrompt')}{' '}
                <a
                    href="/demo/sample-headshot.svg"
                    className="text-[#008080] underline font-medium"
                    target="_blank"
                    rel="noreferrer"
                >
                    {t('hero.sampleLink')}
                </a>
            </motion.p>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-red-600 bg-red-100 border border-red-300 p-3 rounded-lg"
                >
                    <p className="font-semibold">{t('upload.error.title')}</p>
                    <p>{error}</p>
                </motion.div>
            )}
        </div>
    );
};

export default Hero;
