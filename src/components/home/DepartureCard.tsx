'use client';

import { Departure } from '@/lib/types';
import { lineColors, lineAbbreviations } from '@/lib/tokens';

type DepartureCardProps = {
  departure: Departure;
  compact?: boolean;
  origin?: string;
};

const crowdStyles: Record<string, { bg: string; text: string }> = {
  light: { bg: '#d4f4f2', text: '#1a7a76' },
  moderate: { bg: '#fdf0d5', text: '#9a6a10' },
  crowded: { bg: '#fbddd7', text: '#8b2a1a' },
};

export function DepartureCard({ departure, compact = false, origin = 'Andheri' }: DepartureCardProps) {
  const lineColor = lineColors[departure.line];
  const lineAbbr = lineAbbreviations[departure.line];
  const crowd = crowdStyles[departure.crowdLevel];
  const isThirdRow = departure.id === '3';

  return (
    <div className="flex items-center gap-[12px] px-[16px] py-[10px] bg-[#f4ede0] border-b-[1.119px] border-[#ede5d8]">
      <div
        className="flex items-center justify-center px-[5px] py-[1px] rounded-[4px] shrink-0"
        style={{ backgroundColor: lineColor }}
      >
        <span className="text-[9px] font-semibold leading-[13.5px] tracking-[0.27px] text-white">
          {lineAbbr}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-semibold text-[14px] leading-[17.5px] text-[#1f3a5f] truncate">
          {origin} - {departure.destination.name}
        </div>
        <div className="flex items-center gap-[6px] pt-[2px]">
          <span className="text-[11px] leading-[16.5px] text-[#a09890]">
            {departure.trainType === 'fast' ? 'Fast' : 'Slow'} · P{departure.platform}
          </span>
          {departure.busConnection && (
            <>
              <span className="text-[11px] leading-[16.5px] text-[#d8cebc]">·</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#a09890" strokeWidth="2">
                <path d="M8 6v6M16 6v6M2 12h20M6 18h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2zM6 18l-2 2M18 18l2 2" />
              </svg>
              <span className="text-[11px] leading-[16.5px] text-[#a09890]">
                BEST {departure.busConnection}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="relative h-[54px] shrink-0 flex items-start gap-0">
        <div className="flex flex-col items-center pt-[8px]">
          <div className="pb-[2px]">
            {isThirdRow ? (
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#a09890" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            ) : (
              <div className="relative w-[6px] h-[6px]">
                <div className="absolute -left-[2.22px] -top-[2.22px] w-[10.43px] h-[10.43px] rounded-full bg-[#e8a63c] opacity-20" />
                <div className="absolute left-0 top-0 w-[6px] h-[6px] rounded-full bg-[#e8a63c]" />
              </div>
            )}
          </div>
          <span
            className="font-serif text-[22px] font-semibold leading-[22px] text-[#1f3a5f]"
            style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
          >
            {departure.minutesAway}
          </span>
          <span className="text-[10px] leading-[15px] text-[#a09890] pt-[1px]">min</span>
        </div>

        <div className="flex flex-col items-center pt-[5px] ml-[5px]">
          <div className="h-[9px] pb-[2px]" />
          <span
            className="font-serif text-[15px] font-normal leading-[22.5px] text-[#c8bfb0]"
            style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
          >
            {departure.nextAfter}
          </span>
        </div>

        <div
          className="flex items-center px-[8px] py-[2px] rounded-full ml-[5px]"
          style={{ backgroundColor: crowd.bg }}
        >
          <span
            className="text-[11px] font-medium leading-[16.5px]"
            style={{ color: crowd.text }}
          >
            {departure.crowdLevel.charAt(0).toUpperCase() + departure.crowdLevel.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
