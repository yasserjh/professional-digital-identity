/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { cn } from '../../lib/utils';

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'md', className }) => {
    const sizeClasses = {
        sm: 'h-5 w-5 border-2',
        md: 'h-8 w-8 border-4',
        lg: 'h-12 w-12 border-4',
    };
    return (
        <div 
            className={cn(
                'animate-spin rounded-full border-solid border-current border-r-transparent align-[-0.125em] text-[#008080] motion-reduce:animate-[spin_1.5s_linear_infinite]',
                sizeClasses[size],
                className
            )}
            role="status"
        >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
            </span>
        </div>
    );
};

export default Loader;
