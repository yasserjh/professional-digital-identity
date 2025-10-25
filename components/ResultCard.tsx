/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from './ui/Loader';
import { ImageStatus } from '../lib/types';
import Button from './ui/Button';

interface ResultCardProps {
    status: ImageStatus;
    imageUrl?: string;
    caption: string;
}

const ErrorDisplay: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="flex items-center justify-center h-full text-center flex-col p-4 text-neutral-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <p className="font-semibold text-sm">{t('results.generatingError')}</p>
            <p className="text-xs">{t('results.tryAgain')}</p>
        </div>
    );
};

const ResultCard: React.FC<ResultCardProps> = ({ status, imageUrl, caption }) => {
    const { t } = useTranslation();

    const handleDownload = () => {
        if (!imageUrl) return;
        const link = document.createElement('a');
        link.href = imageUrl;
        const filename = `egal-${caption.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.jpg`;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-white flex flex-col aspect-[3/4] w-full rounded-2xl shadow-md overflow-hidden relative group border border-neutral-200 transition-all duration-300 hover:shadow-xl hover:border-neutral-300">
            <div className="w-full bg-neutral-100 flex-grow relative overflow-hidden">
                <AnimatePresence>
                    {status === 'pending' && (
                        <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center">
                            <Loader />
                        </motion.div>
                    )}
                    {status === 'error' && (
                        <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                            <ErrorDisplay />
                        </motion.div>
                    )}
                    {status === 'done' && imageUrl && (
                        <motion.img
                            key={imageUrl}
                            src={imageUrl}
                            alt={caption}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="w-full h-full object-cover"
                        />
                    )}
                </AnimatePresence>
            </div>
            
            <div className="w-full text-center p-3 bg-white flex justify-between items-center">
                <p className="font-semibold text-sm text-[#1B1B1B] truncate">
                    {caption}
                </p>
                {status === 'done' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Button
                            onClick={handleDownload}
                            size="sm"
                            variant="secondary"
                            aria-label={`${t('results.download')} ${caption}`}
                        >
                            {t('results.download')}
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ResultCard;
