import { CrowdLevel } from '@/lib/types';
import { crowdColors } from '@/lib/tokens';

type BadgeProps = {
  crowd: CrowdLevel;
  className?: string;
};

const labels: Record<CrowdLevel, string> = {
  light: 'Light',
  moderate: 'Moderate',
  crowded: 'Crowded',
};

export function CrowdBadge({ crowd, className = '' }: BadgeProps) {
  const colors = crowdColors[crowd];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold leading-[16px] ${className}`}
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {labels[crowd]}
    </span>
  );
}
