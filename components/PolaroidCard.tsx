/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

type ImageStatus = 'pending' | 'done' | 'error';

interface CardProps {
    imageUrl?: string;
    caption: string;
    status: ImageStatus;
    error?: string;
    onDownload?: () => void;
}

const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-full">
        <svg className="animate-spin h-8 w-8 text-neutral-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);

const ErrorDisplay = () => (
    <div className="flex items-center justify-center h-full text-center flex-col p-4">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="mt-2 text-sm text-neutral-600">Generation failed. Please try again.</p>
    </div>
);


const PremiumCard: React.FC<CardProps> = ({ imageUrl, caption, status, error, onDownload }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        if (status !== 'pending') {
           setIsImageLoaded(false);
        }
    }, [imageUrl, status]);


    return (
        <div className="bg-white flex flex-col items-center justify-start aspect-[3/4] w-full rounded-lg shadow-xl overflow-hidden relative group transition-all duration-300 hover:shadow-2xl">
            <div className="w-full bg-neutral-200 flex-grow relative">
                 <AnimatePresence>
                    {status === 'pending' && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0"><LoadingSpinner /></motion.div>}
                    {status === 'error' && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0"><ErrorDisplay /></motion.div>}
                </AnimatePresence>

                {status === 'done' && imageUrl && (
                    <>
                        <div className={cn(
                            "absolute top-3 right-3 z-20 flex flex-col gap-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100",
                        )}>
                            {onDownload && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); onDownload(); }}
                                    className="p-2 bg-black/60 rounded-full text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white"
                                    aria-label={`Download image for ${caption}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </button>
                            )}
                        </div>
                        
                        <motion.img
                            key={imageUrl}
                            src={imageUrl}
                            alt={caption}
                            onLoad={() => setIsImageLoaded(true)}
                            initial={{ opacity: 0, filter: 'blur(10px)' }}
                            animate={{ opacity: isImageLoaded ? 1 : 0, filter: isImageLoaded ? 'blur(0px)' : 'blur(10px)' }}
                            transition={{ duration: 0.8 }}
                            className="w-full h-full object-cover"
                        />
                    </>
                )}
            </div>
            <div className="w-full text-center p-4 bg-white border-t border-neutral-200">
                <p className="font-bold text-lg text-[#0B3D2C] truncate">
                    {caption}
                </p>
            </div>
        </div>
    );
};

export default PremiumCard;