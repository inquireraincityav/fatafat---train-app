'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { CrowdBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

function JourneyInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { confidenceMode } = useApp();

  const from = searchParams.get('from') || 'Andheri';
  const to = searchParams.get('to') || null;
  const trainId = searchParams.get('train');
  const isCommuter = confidenceMode === 'commuter';
  const hasDestination = !!to;

  return (
    <div className="min-h-dvh bg-cream flex flex-col">
      <header className="px-4 pt-[env(safe-area-inset-top)]">
        <div className="flex items-center gap-2 pt-3 pb-2">
          <button onClick={() => router.back()} className="p-1 -ml-1" aria-label="Go back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F3A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <h1 className="font-serif text-[18px] font-bold text-indigo">
            {hasDestination ? `${from} to ${to}` : `8:16 fast – ${from}`}
          </h1>
        </div>
      </header>

      <div className="px-4 flex-1">
        {/* Train info card */}
        <div className="bg-cream-light border border-[#d8cebc] rounded-2xl p-4 mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[14px] font-semibold text-charcoal">
              {hasDestination ? '8:16 fast · Platform 2' : 'Platform 2'}
            </span>
            <CrowdBadge crowd="moderate" />
          </div>
          {!isCommuter && (
            <p className="text-[12px] text-charcoal-light leading-[17px]">
              Fast train – check it stops at your station
            </p>
          )}
        </div>

        {/* Bus connection or add destination */}
        {hasDestination ? (
          <div className="bg-cream-light border border-[#d8cebc] rounded-2xl p-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-[16px]">🚌</span>
              <span className="text-[14px] text-charcoal">BEST 221 waiting at Bandra</span>
            </div>
          </div>
        ) : (
          <div className="bg-cream-light/50 border border-dashed border-[#d8cebc] rounded-2xl p-4 mb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] text-charcoal-light">No destination set – bus connection unknown</p>
                {!isCommuter && (
                  <p className="text-[12px] text-[#a09890] mt-0.5">
                    Add where you&rsquo;re going for the full journey, including your last-mile bus
                  </p>
                )}
              </div>
              <button
                onClick={() => router.push('/station-picker?field=to&returnTo=/journey')}
                className="text-[13px] text-indigo font-semibold ml-3 flex-shrink-0"
              >
                + Add
              </button>
            </div>
          </div>
        )}

        {/* Spacer to push button to bottom */}
        <div className="flex-1" />
      </div>

      {/* I'm on this train button */}
      <div className="px-4 pb-6 pt-4">
        {!isCommuter && (
          <p className="text-[12px] text-charcoal-light text-center mb-2 leading-[17px]">
            Tap once you&rsquo;ve boarded – tracks your stop and helps others see live crowd &amp; delays
          </p>
        )}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => router.push(`/on-board?from=${from}${to ? `&to=${to}` : ''}`)}
        >
          I&rsquo;m on this train
        </Button>
        {!isCommuter && (
          <p className="text-[11px] text-[#a09890] text-center mt-2">
            Your location is only shared while riding
          </p>
        )}
      </div>
    </div>
  );
}

export default function JourneyPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-cream" />}>
      <JourneyInner />
    </Suspense>
  );
}
