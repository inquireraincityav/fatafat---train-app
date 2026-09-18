'use client';

import { Departure } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { lineColors, lineAbbreviations } from '@/lib/tokens';

type DepartureCardProps = {
  departure: Departure;
  compact?: boolean;
  origin?: string;
};

export function DepartureCard({ departure, compact = false, origin = 'Andheri' }: DepartureCardProps) {
  const lineColor = lineColors[departure.line];
  const lineAbbr = lineAbbreviations[departure.line];

  return (
    <div className="flex items-center justify-between py-3.5 px-1 border-b border-cream last:border-0">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ backgroundColor: lineColor }}
        >
          {lineAbbr}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-charcoal truncate">
            {origin} - {departure.destination.name}
          </div>
          <div className="text-xs text-charcoal-light flex items-center gap-1">
            <span>{departure.trainType === 'fast' ? 'Fast' : 'Slow'}</span>
            <span>·</span>
            <span>P{departure.platform}</span>
            {departure.busConnection && (
              <>
                <span className="mx-0.5">·</span>
                <span className="inline-flex items-center gap-0.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 6v6M16 6v6M2 12h20M6 18h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2zM6 18l-2 2M18 18l2 2" />
                  </svg>
                  BEST {departure.busConnection}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <div className="text-right">
          <div className="flex items-center gap-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-marigold mb-auto mt-0.5" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-2xl font-bold text-indigo">{departure.minutesAway}</span>
            <span className="text-sm text-charcoal-light">{departure.nextAfter}</span>
          </div>
          <span className="text-xs text-charcoal-light">min</span>
        </div>
        <Badge variant="crowd" crowdLevel={departure.crowdLevel}>
          {departure.crowdLevel.charAt(0).toUpperCase() + departure.crowdLevel.slice(1)}
        </Badge>
      </div>
    </div>
  );
}
