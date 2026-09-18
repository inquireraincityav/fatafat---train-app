'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { DepartureCard } from '@/components/home/DepartureCard';
import { CrowdBadge } from '@/components/ui/Badge';
import { mockDepartures, mockBusConnections } from '@/lib/mockData';
import { CrowdLevel } from '@/lib/types';

export default function LiveStatusPage() {
  const router = useRouter();
  const { confidenceMode, hydrated } = useApp();
  const [station, setStation] = useState('Andheri');
  const [destination, setDestination] = useState<string | null>(null);
  const isCommuter = confidenceMode === 'commuter';

  if (!hydrated) return <AppShell><div className="min-h-dvh bg-cream" /></AppShell>;

  return (
    <AppShell>
      <PageHeader title="Live status" />

      <div className="px-4 mt-2">
        {/* Station selector */}
        <button
          onClick={() => router.push('/station-picker?field=station&returnTo=/live-status')}
          className="w-full flex items-center gap-2.5 bg-cream-light border border-[#d8cebc] rounded-xl px-4 py-3 mb-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B6860" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-[14px] text-charcoal">
            {isCommuter ? station : 'Which station are you at?'}
          </span>
        </button>

        {/* Destination (optional upgrade) */}
        {destination ? (
          <div className="flex items-center gap-2.5 bg-cream-light border border-[#d8cebc] rounded-xl px-4 py-3 mb-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E8A63C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" y1="22" x2="4" y2="15" />
            </svg>
            <span className="text-[14px] text-charcoal flex-1">Going to: {destination}</span>
            <button onClick={() => setDestination(null)} className="text-[12px] text-charcoal-light font-medium">
              Change
            </button>
          </div>
        ) : (
          <button
            onClick={() => router.push('/station-picker?field=destination&returnTo=/live-status')}
            className="w-full flex items-center gap-2.5 bg-cream-light/50 border border-dashed border-[#d8cebc] rounded-xl px-4 py-3 mb-3"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a09890" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" y1="22" x2="4" y2="15" />
            </svg>
            <span className="text-[13px] text-[#a09890]">Add destination for bus connections</span>
          </button>
        )}

        {/* Departures list */}
        <div className="bg-cream-light border border-[#d8cebc] rounded-2xl overflow-hidden">
          {mockDepartures.map((dep) => (
            <div key={dep.id}>
              <button
                onClick={() => router.push(`/journey?train=${dep.id}`)}
                className="w-full px-4 py-3 border-b border-[#ede5d8] text-left active:bg-[#f0e8da] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[14px] font-semibold text-charcoal">
                      {dep.time} &middot; Platform {dep.platform}
                    </span>
                    {dep.minutesAway != null && dep.minutesAway <= 5 && (
                      <span className="text-[11px] text-marigold font-medium ml-2">+{dep.minutesAway}m</span>
                    )}
                  </div>
                  <CrowdBadge crowd={dep.crowd} />
                </div>
                {!isCommuter && (
                  <p className="text-[12px] text-charcoal-light mt-0.5">
                    {dep.speed === 'fast' ? 'Fast train – skips smaller stations, check it stops at yours' : 'Slow train – stops at every station'}
                  </p>
                )}
                {destination && mockBusConnections[0] && (
                  <p className="text-[12px] text-charcoal-light mt-1 flex items-center gap-1">
                    <span>🚌</span>
                    {mockBusConnections[0].route} at {mockBusConnections[0].stop} &middot; {mockBusConnections[0].waitMinutes} min wait
                  </p>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Crowd legend for new riders */}
        {!isCommuter && (
          <div className="mt-3 bg-[#fdf0d5] border border-[#e8d5a8] rounded-xl px-4 py-3">
            <p className="text-[12px] text-[#9a6a10] leading-[17px]">
              <span className="font-semibold">⚠ Crowded</span> = hard to board comfortably. <span className="font-semibold">Light</span> = plenty of room.
            </p>
          </div>
        )}

        {/* Wait or board recommendation */}
        <div className="mt-3 bg-cream-light border border-[#d8cebc] rounded-xl px-4 py-3 mb-4">
          <h3 className="text-[14px] font-semibold text-charcoal mb-1">Wait or board now?</h3>
          <p className="text-[13px] text-charcoal-light leading-[18px]">
            Wait for the 8:16 fast &ndash; it&rsquo;s less crowded and only 4 minutes later.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
