'use client';

import { useRouter } from 'next/navigation';
import { DepartureCard } from './DepartureCard';
import { mockDepartures } from '@/lib/mockData';

export function CommuterHome() {
  const router = useRouter();

  return (
    <div className="px-4">
      <div className="relative h-56 rounded-2xl overflow-hidden mb-4 bg-[#1a2332]">
        <div className="absolute inset-0">
          <svg width="100%" height="100%" viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="280" fill="#1a2332"/>
            <path d="M180 0 L180 280" stroke="#1B3A6B" strokeWidth="2.5" opacity="0.7"/>
            <path d="M220 0 L200 100 L210 180 L230 280" stroke="#C0392B" strokeWidth="2.5" opacity="0.7"/>
            <path d="M280 40 L250 100 L220 160 L200 200 L160 280" stroke="#27AE60" strokeWidth="2.5" opacity="0.7"/>
            <path d="M100 120 L180 120" stroke="#8B5CF6" strokeWidth="2" opacity="0.5"/>
            <path d="M100 200 L300 200" stroke="#E8A63C" strokeWidth="1.5" opacity="0.3"/>
            <circle cx="180" cy="120" r="6" fill="#E8A63C" stroke="#E8A63C" strokeWidth="3" opacity="0.8"/>
            <circle cx="180" cy="120" r="12" fill="none" stroke="#E8A63C" strokeWidth="1" opacity="0.4"/>
            <circle cx="220" cy="160" r="3" fill="white" opacity="0.5"/>
            <circle cx="180" cy="200" r="3" fill="white" opacity="0.5"/>
            <circle cx="200" cy="260" r="3" fill="white" opacity="0.5"/>
          </svg>
        </div>
      </div>

      <button
        onClick={() => router.push('/station-picker?field=to')}
        className="w-full flex items-center justify-between bg-cream-light rounded-xl border border-[#d8cebc] px-4 py-3 mb-2"
      >
        <div className="flex items-center gap-2.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a09890" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <span className="text-[14px] text-[#a09890]">Where to?</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-marigold" />
          <span className="text-[11px] text-[#6b6760]">Live</span>
        </div>
      </button>

      <div className="flex items-center justify-between mb-1 mt-2">
        <h2 className="text-[12px] font-semibold tracking-[0.84px] text-[#a09890] uppercase">
          Daily commute
        </h2>
        <button className="text-[12px] text-[#a09890] hover:text-charcoal">
          All routes
        </button>
      </div>

      <div>
        {mockDepartures.map((departure) => (
          <DepartureCard
            key={departure.id}
            departure={departure}
            origin={departure.id === '3' ? 'Dadar' : 'Andheri'}
          />
        ))}
      </div>
    </div>
  );
}
