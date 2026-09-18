'use client';

import { CrowdLevel } from '@/lib/types';

type BadgeProps = {
  variant?: 'crowd' | 'status' | 'line';
  crowdLevel?: CrowdLevel;
  children: React.ReactNode;
  className?: string;
};

const crowdStyles: Record<CrowdLevel, string> = {
  light: 'text-[#1a7a76] bg-[#d4f4f2]',
  moderate: 'text-[#9a6a10] bg-[#fdf0d5]',
  crowded: 'text-[#8b2a1a] bg-[#fbddd7]',
};

export function Badge({ variant = 'status', crowdLevel, children, className = '' }: BadgeProps) {
  if (variant === 'crowd' && crowdLevel) {
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${crowdStyles[crowdLevel]} ${className}`}>
        {children}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-success text-white ${className}`}>
      {children}
    </span>
  );
}
