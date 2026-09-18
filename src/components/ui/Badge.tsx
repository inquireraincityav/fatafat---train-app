'use client';

import { CrowdLevel } from '@/lib/types';

type BadgeProps = {
  variant?: 'crowd' | 'status' | 'line';
  crowdLevel?: CrowdLevel;
  children: React.ReactNode;
  className?: string;
};

const crowdStyles: Record<CrowdLevel, string> = {
  light: 'text-info-light bg-transparent',
  moderate: 'text-marigold bg-transparent',
  crowded: 'text-white bg-rust',
};

export function Badge({ variant = 'status', crowdLevel, children, className = '' }: BadgeProps) {
  if (variant === 'crowd' && crowdLevel) {
    const isHighlighted = crowdLevel === 'crowded';
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${crowdStyles[crowdLevel]} ${className}`}>
        {!isHighlighted && (
          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
            crowdLevel === 'light' ? 'bg-info-light' : 'bg-marigold'
          }`} />
        )}
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
