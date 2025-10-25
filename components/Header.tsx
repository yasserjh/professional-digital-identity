/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Logo from './ui/Logo';

interface HeaderProps {
    setPage: (page: 'home' | 'privacy' | 'terms' | 'bank') => void;
    credits: number;
}

const LocaleSwitch: React.FC = () => {
    const { i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';

    const toggleLanguage = () => {
        const newLang = isArabic ? 'en' : 'ar';
        i18n.changeLanguage(newLang);
    };

    return (
        <button 
            onClick={toggleLanguage}
            className="text-sm font-semibold text-neutral-600 hover:text-black transition-colors duration-100 px-3 py-1.5 rounded-lg border border-neutral-300 hover:border-neutral-400"
            aria-label={isArabic ? 'Switch to English' : 'التبديل إلى العربية'}
        >
            {isArabic ? 'English' : 'العربية'}
        </button>
    );
};

const Header: React.FC<HeaderProps> = ({ setPage, credits }) => {
    const { t } = useTranslation();

    return (
        <header className="w-full bg-white/80 backdrop-blur-sm border-b border-neutral-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
                <motion.button 
                    onClick={() => setPage('home')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2"
                    aria-label="Home"
                >
                    <Logo className="h-8 w-8 text-[#008080]" />
                    <span className="text-xl font-bold text-[#1B1B1B] hidden sm:inline">{t('header.title')}</span>
                </motion.button>

                <div className="flex items-center gap-4">
                    <div className="text-sm font-semibold bg-neutral-100 text-[#1B1B1B] px-3 py-1.5 rounded-lg">
                        {t('header.credits', { count: credits })}
                    </div>
                    <LocaleSwitch />
                </div>
            </div>
        </header>
    );
};

export default Header;
