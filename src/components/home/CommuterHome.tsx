'use client';

import { useRouter } from 'next/navigation';
import { DepartureCard } from './DepartureCard';
import { mockDepartures } from '@/lib/mockData';

export function CommuterHome() {
  const router = useRouter();

  return (
    <div>
      {/* Map preview */}
      <div className="px-4">
        <div className="relative rounded-2xl overflow-hidden" style={{ height: 220 }}>
          <div className="absolute inset-0 bg-[#1a2332]">
            <svg width="100%" height="100%" viewBox="0 0 370 220" preserveAspectRatio="xMidYMid slice">
              <rect width="370" height="220" fill="#1a2332" />
              <text x="185" y="20" textAnchor="middle" fill="#555" fontSize="8" fontFamily="sans-serif">THANE</text>
              {/* Western line - blue */}
              <path d="M120 0 L120 100 L115 220" stroke="#1B3A6B" strokeWidth="2.5" fill="none" />
              {/* Central line - red */}
              <path d="M280 0 L240 80 L200 140 L160 220" stroke="#C0392B" strokeWidth="2.5" fill="none" />
              {/* Harbour line - green */}
              <path d="M320 120 L260 160 L180 200 L100 220" stroke="#27AE60" strokeWidth="2.5" fill="none" />
              {/* Metro line - purple */}
              <path d="M60 80 L120 80 L200 100 L280 80" stroke="#8B5CF6" strokeWidth="2" fill="none" />
              {/* User location */}
              <circle cx="120" cy="80" r="6" fill="#E8A63C" />
              <circle cx="120" cy="80" r="10" fill="none" stroke="#E8A63C" strokeWidth="1" opacity="0.4" />
              {/* Station dots */}
              <circle cx="200" cy="140" r="3" fill="white" opacity="0.5" />
              <circle cx="240" cy="80" r="3" fill="white" opacity="0.5" />
              <circle cx="160" cy="170" r="3" fill="white" opacity="0.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* "Where to?" search bar */}
      <div className="px-4 pt-3 pb-1">
        <button
          onClick={() => router.push('/station-picker?field=to')}
          className="w-full flex items-center gap-2.5 bg-cream-light border border-[#d8cebc] rounded-xl px-4 py-3"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a09890" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <span className="text-[14px] text-[#a09890]">Where to?</span>
          <div className="flex-1 flex items-center justify-end gap-1.5">
            <span className="w-2 h-2 rounded-full bg-marigold" />
            <span className="text-[12px] text-charcoal-light">Live</span>
          </div>
        </button>
      </div>

      {/* Daily commute */}
      <div className="pt-2">
        <div className="flex items-center justify-between px-4 pb-1.5">
          <span className="text-[11px] font-semibold tracking-[0.8px] text-charcoal-light uppercase">
            Daily commute
          </span>
          <button className="text-[11px] text-charcoal-light">All routes</button>
        </div>
        <div>
          {mockDepartures.map((dep) => (
            <DepartureCard key={dep.id} departure={dep} />
          ))}
        </div>
      </div>
    </div>
  );
}
