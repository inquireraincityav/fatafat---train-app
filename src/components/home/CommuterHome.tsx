'use client';

import { useRouter } from 'next/navigation';
import { DepartureCard } from './DepartureCard';
import { mockDepartures, mockSavedRoutes } from '@/lib/mockData';

export function CommuterHome() {
  const router = useRouter();

  return (
    <div>
      {/* Map preview */}
      <div className="px-4">
        <div className="relative rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.12)]" style={{ height: 180 }}>
          <div className="absolute inset-0 bg-[#1a2332]">
            <svg width="100%" height="100%" viewBox="0 0 370 180" preserveAspectRatio="xMidYMid slice">
              <rect width="370" height="180" fill="#1a2332" />
              <path d="M150 0 L150 180" stroke="#1B3A6B" strokeWidth="2" opacity="0.6" />
              <path d="M190 0 L185 90 L190 180" stroke="#C0392B" strokeWidth="2" opacity="0.6" />
              <path d="M280 0 L230 90 L150 180" stroke="#27AE60" strokeWidth="2" opacity="0.6" />
              <path d="M60 80 L150 80" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.4" />
              <circle cx="150" cy="80" r="5" fill="#E8A63C" stroke="#E8A63C" strokeWidth="2" opacity="0.8" />
              <circle cx="150" cy="80" r="10" fill="none" stroke="#E8A63C" strokeWidth="0.8" opacity="0.3" />
            </svg>
          </div>
          <button
            onClick={() => router.push('/network-map')}
            className="absolute bottom-2 right-2 bg-cream-light/90 text-[11px] text-indigo font-medium px-2.5 py-1 rounded-lg"
          >
            View map
          </button>
        </div>
      </div>

      {/* "Where to?" search */}
      <div className="px-4 pt-3 pb-2">
        <button
          onClick={() => router.push('/station-picker?field=to')}
          className="w-full flex items-center gap-2.5 bg-cream-light border border-[#d8cebc] rounded-xl px-4 py-3"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a09890" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <span className="text-[14px] text-[#a09890]">Where to?</span>
          <div className="flex-1 flex items-center justify-end gap-1.5">
            <span className="w-2 h-2 rounded-full bg-marigold" />
            <span className="text-[11px] text-charcoal-light">Live</span>
          </div>
        </button>
      </div>

      {/* Quick access chips */}
      <div className="px-4 pb-2">
        <span className="text-[11px] text-[#a09890] font-medium mb-1.5 block">Quick access</span>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {mockSavedRoutes.map((route) => (
            <button
              key={route.id}
              onClick={() => router.push(`/journey?from=${route.from}&to=${route.to}`)}
              className="flex-shrink-0 bg-cream-light border border-[#d8cebc] rounded-lg px-3 py-1.5 text-[12px] text-charcoal font-medium"
            >
              {route.from} to {route.to}
            </button>
          ))}
        </div>
      </div>

      {/* Daily commute departures */}
      <div className="pt-1">
        <div className="flex items-center justify-between px-4 pb-1">
          <span className="text-[11px] font-semibold tracking-[0.8px] text-[#a09890] uppercase">
            Daily commute
          </span>
          <button className="text-[11px] text-[#a09890]">All routes</button>
        </div>
        <div className="border-t border-[#ede5d8]">
          {mockDepartures.slice(0, 3).map((dep) => (
            <DepartureCard key={dep.id} departure={dep} origin="Andheri" />
          ))}
        </div>
      </div>
    </div>
  );
}
