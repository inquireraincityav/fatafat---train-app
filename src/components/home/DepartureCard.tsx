'use client';

import { useRouter } from 'next/navigation';
import { Departure, RailLine } from '@/lib/types';
import { lineColors } from '@/lib/tokens';

const lineLetters: Record<RailLine, string> = {
  western: 'W',
  central: 'C',
  harbour: 'H',
  'metro-1': 'M',
};

const crowdStyles: Record<string, { bg: string; text: string; label: string }> = {
  light: { bg: '#d4f4f2', text: '#1a7a76', label: 'Light' },
  moderate: { bg: '#fdf0d5', text: '#9a6a10', label: 'Moderate' },
  crowded: { bg: '#fbddd7', text: '#8b2a1a', label: 'Crowded' },
};

export function DepartureCard({ departure }: { departure: Departure }) {
  const router = useRouter();
  const crowd = crowdStyles[departure.crowd];

  return (
    <button
      onClick={() => router.push(`/journey?from=${departure.origin}&to=${departure.destination}`)}
      className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-[#ede5d8] text-left active:bg-[#f0e8da] transition-colors"
    >
      {/* Line badge circle */}
      <div
        className="w-[28px] h-[28px] rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: lineColors[departure.line] }}
      >
        <span className="text-[11px] font-bold text-white leading-none">
          {lineLetters[departure.line]}
        </span>
      </div>

      {/* Route info */}
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-charcoal leading-[20px]">
          {departure.origin} &ndash; {departure.destination}
        </p>
        <p className="text-[12px] text-charcoal-light leading-[17px]">
          {departure.speed === 'fast' ? 'Fast' : 'Slow'} &middot; P{departure.platform}
          {departure.busConnection && (
            <> &middot; 🚌 {departure.busConnection}</>
          )}
        </p>
      </div>

      {/* Time */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a09890" strokeWidth="1.5" className="mt-0.5">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span className="text-[20px] font-bold text-indigo leading-none">{departure.minutesAway}</span>
        <span className="text-[13px] text-charcoal-light leading-none">{departure.totalMinutes}</span>
      </div>

      {/* min label */}
      <div className="flex flex-col items-start -ml-1">
        <span className="text-[10px] text-charcoal-light leading-none">min</span>
      </div>

      {/* Crowd badge */}
      <span
        className="flex-shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold leading-none"
        style={{ backgroundColor: crowd.bg, color: crowd.text }}
      >
        {crowd.label}
      </span>
    </button>
  );
}
