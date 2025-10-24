/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            aria-label="Egal Logo"
            {...props}
        >
            <g fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
                {/* Agal Ring */}
                <path d="M50 20 A30 30 0 0 1 50 80 A30 30 0 0 1 50 20 Z" />
                {/* Abstract Head Silhouette */}
                <path d="M50 40 C 40 40, 35 50, 35 60 L 65 60 C 65 50, 60 40, 50 40 Z" />
            </g>
        </svg>
    );
};

export default Logo;
