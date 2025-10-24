/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { useTranslation } from 'react-i18next';

interface FooterProps {
    setPage: (page: 'home' | 'privacy' | 'terms') => void;
}

const Footer: React.FC<FooterProps> = ({ setPage }) => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    const linkClasses = "hover:text-black transition-colors duration-100";

    return (
        <footer className="w-full bg-white border-t border-neutral-200 p-4 sm:p-6 text-sm text-neutral-500">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
                <p>
                    &copy; {currentYear} Egal. {t('footer.developedBy')}
                </p>
                <div className="flex items-center gap-4 sm:gap-6">
                    <button onClick={() => setPage('privacy')} className={linkClasses}>{t('footer.privacy')}</button>
                    <button onClick={() => setPage('terms')} className={linkClasses}>{t('footer.terms')}</button>
                    <a href="mailto:contact@egal-app.com" className={linkClasses}>{t('footer.contact')}</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
