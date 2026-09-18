'use client';

import { useRouter } from 'next/navigation';
import { Departure } from '@/lib/types';
import { CrowdBadge } from '@/components/ui/Badge';

type DepartureCardProps = {
  departure: Departure;
  origin: string;
  compact?: boolean;
};

export function DepartureCard({ departure, origin, compact }: DepartureCardProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/journey?train=${departure.id}`)}
      className="w-full flex items-center justify-between px-4 py-3 border-b border-[#ede5d8] text-left active:bg-[#f0e8da] transition-colors"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-semibold text-charcoal leading-[20px]">
            {departure.time} {departure.speed} &middot; P{departure.platform}
          </span>
          {departure.minutesAway != null && departure.minutesAway <= 5 && (
            <span className="text-[11px] text-marigold font-medium">+{departure.minutesAway}m</span>
          )}
        </div>
        {!compact && (
          <span className="text-[12px] text-charcoal-light leading-[17px]">
            {origin} to {departure.destination}
          </span>
        )}
      </div>
      <CrowdBadge crowd={departure.crowd} />
    </button>
  );
}
