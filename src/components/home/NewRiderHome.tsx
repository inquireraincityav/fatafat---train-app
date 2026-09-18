'use client';

import { useRouter } from 'next/navigation';

export function NewRiderHome() {
  const router = useRouter();

  return (
    <div className="px-4">
      {/* Route input form */}
      <div className="bg-cream-light border border-[#d8cebc] rounded-2xl p-4 mb-3">
        <button
          onClick={() => router.push('/station-picker?field=from')}
          className="w-full flex items-center gap-3 pb-3 border-b border-[#ede5d8]"
        >
          <span className="w-2.5 h-2.5 rounded-full border-2 border-charcoal-light" />
          <span className="text-[14px] text-[#a09890]">Where are you starting from?</span>
        </button>
        <button
          onClick={() => router.push('/station-picker?field=to')}
          className="w-full flex items-center gap-3 pt-3"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-marigold" />
          <span className="text-[14px] text-[#a09890]">Where are you going?</span>
        </button>
      </div>

      {/* New to Mumbai trains? card */}
      <div className="bg-cream-light border border-[#d8cebc] rounded-2xl p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-serif text-[16px] font-bold text-indigo leading-[22px]">
            New to Mumbai trains?
          </h3>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B6860" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </div>
        <p className="text-[13px] text-charcoal-light leading-[18px] mb-3">
          Fast vs. slow trains, compartments, and fares &ndash; a few basics before your first ride.
        </p>
        <div className="flex gap-2">
          {[
            { label: 'Compartments', topic: 'compartments' },
            { label: 'Fast vs slow', topic: 'fast-vs-slow' },
            { label: 'Fares', topic: 'fares' },
          ].map((item) => (
            <button
              key={item.topic}
              onClick={() => router.push(`/basics/${item.topic}`)}
              className="bg-cream border border-[#d8cebc] rounded-lg px-3 py-1.5 text-[12px] text-charcoal font-medium active:bg-[#ede5d8]"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Crowd/platform widget placeholder */}
      <div className="mt-3 bg-cream-light border border-dashed border-[#d8cebc] rounded-2xl p-4 text-center">
        <p className="text-[13px] text-[#a09890] leading-[18px]">
          Crowd &amp; platform info appears after you pick a route
        </p>
      </div>
    </div>
  );
}
