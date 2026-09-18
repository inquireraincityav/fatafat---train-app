'use client';

import { type ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-marigold text-indigo font-semibold hover:brightness-105 active:brightness-95',
  secondary: 'bg-cream-light text-charcoal border border-[#d8cebc] font-medium hover:bg-cream active:bg-[#ede5d8]',
  ghost: 'bg-transparent text-charcoal-light hover:bg-cream active:bg-[#ede5d8]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-[13px] rounded-[8px]',
  md: 'px-4 py-2.5 text-[14px] rounded-[10px]',
  lg: 'px-5 py-3 text-[15px] rounded-[12px]',
};

export function Button({ variant = 'primary', size = 'md', fullWidth, className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center transition-all ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
