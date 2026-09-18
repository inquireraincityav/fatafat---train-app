'use client';

import { useRouter } from 'next/navigation';
import { DepartureCard } from './DepartureCard';
import { mockDepartures } from '@/lib/mockData';

export function CommuterHome() {
  const router = useRouter();

  return (
    <div className="px-4">
      <div className="relative h-56 rounded-2xl overflow-hidden mb-4 bg-indigo">
        <div className="absolute inset-0 flex items-center justify-center text-cream-light/50 text-sm">
          Map loads with Carto API key
        </div>
      </div>

      <button
        onClick={() => router.push('/station-picker?field=to')}
        className="w-full flex items-center justify-between bg-cream-light rounded-xl border border-cream px-4 py-3.5 mb-4"
      >
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B6860" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <span className="text-charcoal-light">Where to?</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-marigold" />
          <span className="text-sm font-medium text-charcoal">Live</span>
        </div>
      </button>

      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xs font-semibold tracking-wider text-charcoal-light uppercase">
          Daily commute
        </h2>
        <button className="text-xs text-charcoal-light hover:text-charcoal">
          All routes
        </button>
      </div>

      <div>
        {mockDepartures.map((departure) => (
          <DepartureCard key={departure.id} departure={departure} />
        ))}
      </div>
    </div>
  );
}
