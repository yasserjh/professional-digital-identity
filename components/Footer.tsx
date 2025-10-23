/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

const Footer = () => {
    return (
        <footer className="relative w-full bg-[#0B3D2C]/90 backdrop-blur-sm p-3 z-50 text-[#F5F5DC] text-xs sm:text-sm">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 px-4 text-center">
                <div className="flex items-center gap-4 text-neutral-300 whitespace-nowrap">
                    <p>
                        Developed by Yasir Aljohani
                    </p>
                    <span className="text-neutral-500" aria-hidden="true">|</span>
                    <p>Powered by Gemini 2.5 Flash Image</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;