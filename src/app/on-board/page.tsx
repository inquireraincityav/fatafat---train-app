'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';

const stops = ['Andheri', 'Vile Parle', 'Santacruz', 'Bandra'];

function OnBoardInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { confidenceMode } = useApp();

  const from = searchParams.get('from') || 'Andheri';
  const to = searchParams.get('to') || 'Bandra';
  const isCommuter = confidenceMode === 'commuter';
  const currentStopIndex = 1;
  const stopsRemaining = stops.length - currentStopIndex - 1;

  return (
    <div className="min-h-dvh bg-cream flex flex-col">
      <header className="px-4 pt-[env(safe-area-inset-top)]">
        <div className="flex items-center gap-2 pt-3 pb-2">
          <button onClick={() => router.back()} className="p-1 -ml-1" aria-label="Go back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F3A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
          <span className="text-[13px] text-charcoal-light">Tracking your journey</span>
        </div>
      </header>

      <div className="px-4 flex-1 flex flex-col">
        {/* Destination */}
        <div className="text-center mb-4">
          <p className="text-[12px] text-marigold font-medium">Your stop</p>
          <h1 className="font-serif text-[24px] font-bold text-indigo">{to}</h1>
        </div>

        {/* Countdown card */}
        <div className="bg-[#f5efe5] rounded-2xl px-6 py-5 text-center mb-6">
          <p className="text-[13px] text-charcoal-light mb-1">Arriving in</p>
          <p className={`font-serif font-bold text-indigo ${isCommuter ? 'text-[28px]' : 'text-[40px]'}`}>
            {stopsRemaining} stops
          </p>
          <p className="text-[13px] text-charcoal-light">~11 minutes</p>
        </div>

        {/* Stop progress */}
        <div className="space-y-0">
          {stops.map((stop, i) => {
            const isPassed = i < currentStopIndex;
            const isCurrent = i === currentStopIndex;
            const isDestination = i === stops.length - 1;

            return (
              <div key={stop} className="flex items-start gap-3 relative">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-3 h-3 rounded-full border-2 ${
                      isPassed ? 'bg-[#d8cebc] border-[#d8cebc]'
                        : isCurrent ? 'bg-marigold border-marigold'
                        : 'bg-transparent border-[#d8cebc]'
                    }`}
                  />
                  {i < stops.length - 1 && (
                    <div className={`w-0.5 h-8 ${isPassed ? 'bg-[#d8cebc]' : 'bg-[#ede5d8]'}`} />
                  )}
                </div>
                <div className="pb-5 -mt-0.5">
                  <span className={`text-[14px] leading-[18px] ${
                    isPassed ? 'text-[#a09890] line-through'
                      : isCurrent ? 'text-charcoal font-semibold'
                      : isDestination ? 'text-charcoal font-semibold'
                      : 'text-charcoal'
                  }`}>
                    {stop}
                    {isPassed && ' – passed'}
                    {isCurrent && ' – current'}
                    {isDestination && ' – get off here'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Alert promise */}
        {!isCommuter && (
          <div className="bg-cream-light border border-dashed border-[#d8cebc] rounded-xl px-4 py-3 text-center mt-2">
            <p className="text-[13px] text-charcoal-light">
              We will alert you loudly 1 stop before {to}
            </p>
          </div>
        )}

        <div className="flex-1" />

        {/* Bus connection */}
        <div className="bg-cream-light border border-[#d8cebc] rounded-xl px-4 py-3 mb-6 flex items-center gap-2 justify-center">
          <span>🚌</span>
          <span className="text-[13px] text-charcoal">BEST 221 waiting at Bandra &middot; 6 min</span>
        </div>
      </div>
    </div>
  );
}

export default function OnBoardPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-cream" />}>
      <OnBoardInner />
    </Suspense>
  );
}
