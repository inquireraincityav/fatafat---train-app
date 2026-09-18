import { RailLine } from '@/lib/types';
import { lineColors } from '@/lib/tokens';

const shortLabels: Record<RailLine, string> = {
  western: 'W',
  central: 'C',
  harbour: 'H',
  'metro-1': 'M1',
};

type LineBadgeProps = {
  line: RailLine;
  size?: 'sm' | 'md';
};

export function LineBadge({ line, size = 'sm' }: LineBadgeProps) {
  const s = size === 'sm' ? 'w-[20px] h-[16px] text-[9px]' : 'w-[24px] h-[18px] text-[10px]';
  return (
    <span
      className={`inline-flex items-center justify-center rounded-[3px] font-bold text-white ${s}`}
      style={{ backgroundColor: lineColors[line] }}
    >
      {shortLabels[line]}
    </span>
  );
}
