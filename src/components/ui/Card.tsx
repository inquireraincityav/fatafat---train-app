import { type ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function Card({ children, className = '', onClick }: CardProps) {
  const Component = onClick ? 'button' : 'div';
  return (
    <Component
      onClick={onClick}
      className={`bg-cream-light border border-[#d8cebc] rounded-[12px] ${onClick ? 'text-left w-full active:bg-[#f5efe5] transition-colors' : ''} ${className}`}
    >
      {children}
    </Component>
  );
}
