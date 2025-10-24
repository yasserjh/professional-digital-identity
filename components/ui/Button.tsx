/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
// FIX: Import HTMLMotionProps and use it to type the button component to avoid type conflicts.
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';
import Loader from './Loader';

interface ButtonProps extends HTMLMotionProps<'button'> {
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled,
    ...props
}) => {
    const baseClasses = "relative font-semibold rounded-2xl transition-all duration-100 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center";

    const variantClasses = {
        primary: 'bg-[#008080] text-white hover:bg-[#006666] focus:ring-[#008080] disabled:bg-teal-300',
        secondary: 'bg-white text-[#1B1B1B] border border-neutral-300 hover:bg-neutral-100 focus:ring-[#008080] disabled:bg-neutral-100 disabled:text-neutral-400',
    };

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    const isDisabled = isLoading || disabled;

    return (
        <motion.button
            whileHover={{ scale: isDisabled ? 1 : 1.03 }}
            whileTap={{ scale: isDisabled ? 1 : 0.98 }}
            className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
            disabled={isDisabled}
            {...props}
        >
            <span className={cn('transition-opacity duration-100', { 'opacity-0': isLoading })}>
                {children}
            </span>

            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Loader size="sm" />
                </div>
            )}
        </motion.button>
    );
};

export default Button;