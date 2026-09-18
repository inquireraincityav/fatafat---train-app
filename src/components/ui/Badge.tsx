'use client';

import { CrowdLevel } from '@/lib/types';

type BadgeProps = {
  variant?: 'crowd' | 'status' | 'line';
  crowdLevel?: CrowdLevel;
  children: React.ReactNode;
  className?: string;
};

const crowdStyles: Record<CrowdLevel, string> = {
  light: 'text-info-light bg-info-light/10',
  moderate: 'text-marigold bg-marigold/10',
  crowded: 'text-rust bg-rust/10',
};

export function Badge({ variant = 'status', crowdLevel, children, className = '' }: BadgeProps) {
  if (variant === 'crowd' && crowdLevel) {
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${crowdStyles[crowdLevel]} ${className}`}>
        <span className={`w-1.5 h-1.5 rounded-full mr-1 ${
          crowdLevel === 'light' ? 'bg-info-light' :
          crowdLevel === 'moderate' ? 'bg-marigold' :
          'bg-rust'
        }`} />
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
