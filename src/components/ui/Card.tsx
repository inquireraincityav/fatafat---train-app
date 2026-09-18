'use client';

type CardProps = {
  variant?: 'default' | 'elevated' | 'indigo' | 'selected';
  padding?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const variantStyles = {
  default: 'bg-cream-light border border-cream',
  elevated: 'bg-white shadow-sm border border-cream',
  indigo: 'bg-indigo text-cream-light',
  selected: 'bg-indigo text-cream-light shadow-md',
};

const paddingStyles = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5',
};

export function Card({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  onClick,
}: CardProps) {
  const Component = onClick ? 'button' : 'div';
  return (
    <Component
      className={`rounded-xl ${variantStyles[variant]} ${paddingStyles[padding]} ${
        onClick ? 'cursor-pointer active:scale-[0.98] transition-transform w-full text-left' : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}
