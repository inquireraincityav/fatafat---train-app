'use client';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-marigold text-indigo font-semibold hover:bg-marigold-light active:brightness-95',
  secondary: 'bg-indigo text-cream-light font-semibold hover:bg-indigo-light active:brightness-95',
  outline: 'border-2 border-charcoal-light text-charcoal bg-transparent font-medium hover:bg-cream',
  ghost: 'text-charcoal bg-transparent hover:bg-cream',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-6 py-4 text-lg rounded-xl',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center transition-all duration-150
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        disabled:opacity-50 disabled:pointer-events-none
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
