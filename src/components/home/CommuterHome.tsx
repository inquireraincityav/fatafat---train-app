'use client';

import { useRouter } from 'next/navigation';
import { DepartureCard } from './DepartureCard';
import { mockDepartures } from '@/lib/mockData';

export function CommuterHome() {
  const router = useRouter();

  return (
    <div>
      <div className="px-[16px]">
        <div className="relative rounded-[16px] overflow-hidden shadow-[0px_2px_16px_0px_rgba(0,0,0,0.18)]" style={{ height: 419 }}>
          <div className="absolute inset-0 bg-[#ddd]">
            <svg width="100%" height="100%" viewBox="0 0 370 419" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
              <rect width="370" height="419" fill="#1a2332"/>
              <path d="M150 0 L150 419" stroke="#1B3A6B" strokeWidth="2.5" opacity="0.7"/>
              <path d="M190 0 L180 140 L185 280 L190 419" stroke="#C0392B" strokeWidth="2.5" opacity="0.7"/>
              <path d="M280 20 L240 100 L200 200 L170 300 L150 419" stroke="#27AE60" strokeWidth="2.5" opacity="0.7"/>
              <path d="M80 160 L150 160" stroke="#8B5CF6" strokeWidth="2" opacity="0.5"/>
              <path d="M80 260 L280 260" stroke="#E8A63C" strokeWidth="1.5" opacity="0.3"/>
              <circle cx="150" cy="160" r="6" fill="#E8A63C" stroke="#E8A63C" strokeWidth="3" opacity="0.8"/>
              <circle cx="150" cy="160" r="12" fill="none" stroke="#E8A63C" strokeWidth="1" opacity="0.4"/>
              <circle cx="200" cy="200" r="3" fill="white" opacity="0.5"/>
              <circle cx="150" cy="260" r="3" fill="white" opacity="0.5"/>
              <circle cx="185" cy="340" r="3" fill="white" opacity="0.5"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-[#f4ede0] pt-[10px]">
        <div className="px-[16px] pb-[8px]">
          <button
            onClick={() => router.push('/station-picker?field=to')}
            className="w-full flex items-center gap-[10px] bg-[#fbf7ef] border-[1.119px] border-[#d8cebc] rounded-[12px] px-[16px] py-[12px]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a09890" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <span className="text-[14px] leading-[21px] text-[#a09890]">Where to?</span>
            <div className="flex-1 flex items-center justify-end gap-[6px]">
              <span className="w-[8px] h-[8px] rounded-full bg-[#e8a63c]" />
              <span className="text-[11px] leading-[16.5px] text-[#6b6760]">Live</span>
            </div>
          </button>
        </div>

        <div className="flex items-center justify-between px-[16px] pb-[4px]">
          <span className="text-[12px] font-semibold leading-[16px] tracking-[0.84px] text-[#a09890] uppercase">
            Daily commute
          </span>
          <button className="text-[12px] leading-[16px] text-[#a09890]">
            All routes
          </button>
        </div>

        <div className="border-t-[1.119px] border-[#ede5d8]">
          {mockDepartures.map((departure) => (
            <DepartureCard
              key={departure.id}
              departure={departure}
              origin={departure.id === '3' ? 'Dadar' : 'Andheri'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
