'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { TicketClass, FareType } from '@/lib/types';
import { fares, fareLabels, fareSubLabels } from '@/lib/pricing';

export default function BuyTicketPage() {
  const router = useRouter();
  const [from] = useState('Andheri');
  const [to] = useState('Churchgate');
  const [ticketClass, setTicketClass] = useState<TicketClass>('second');
  const [selectedFare, setSelectedFare] = useState<FareType>('single');

  const price = fares[ticketClass][selectedFare];

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
          <h1 className="font-serif text-[18px] font-bold text-indigo">Buy ticket</h1>
        </div>
      </header>

      <div className="px-4 flex-1">
        {/* Route display */}
        <div className="bg-cream-light border border-[#d8cebc] rounded-2xl p-4 mb-3">
          <button
            onClick={() => router.push('/station-picker?field=from&returnTo=/tickets/buy')}
            className="w-full flex items-center gap-3 pb-3 border-b border-[#ede5d8]"
          >
            <span className="w-2.5 h-2.5 rounded-full border-2 border-charcoal-light" />
            <span className="text-[14px] text-charcoal">{from}</span>
          </button>
          <button
            onClick={() => router.push('/station-picker?field=to&returnTo=/tickets/buy')}
            className="w-full flex items-center gap-3 pt-3"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-marigold" />
            <span className="text-[14px] text-charcoal">{to}</span>
          </button>
        </div>

        {/* Class toggle */}
        <div className="flex bg-cream-light border border-[#d8cebc] rounded-xl overflow-hidden mb-3">
          <button
            onClick={() => setTicketClass('second')}
            className={`flex-1 py-2.5 text-[13px] font-medium transition-colors ${
              ticketClass === 'second' ? 'bg-indigo text-cream-light' : 'text-charcoal-light'
            }`}
          >
            Second class
          </button>
          <button
            onClick={() => setTicketClass('first')}
            className={`flex-1 py-2.5 text-[13px] font-medium transition-colors ${
              ticketClass === 'first' ? 'bg-indigo text-cream-light' : 'text-charcoal-light'
            }`}
          >
            First class
          </button>
        </div>

        {/* Fare options */}
        <div className="space-y-2 mb-4">
          {(['single', 'return', 'monthly', 'quarterly'] as FareType[]).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedFare(type)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-colors ${
                selectedFare === type
                  ? 'bg-cream-light border-marigold ring-1 ring-marigold'
                  : 'bg-cream-light border-[#d8cebc]'
              }`}
            >
              <div>
                <span className="text-[14px] font-medium text-charcoal">{fareLabels[type]}</span>
                {fareSubLabels[type] && (
                  <p className="text-[11px] text-charcoal-light mt-0.5">{fareSubLabels[type]}</p>
                )}
              </div>
              <span className="text-[16px] font-bold text-indigo">₹{fares[ticketClass][type]}</span>
            </button>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="bg-[#f5efe5] rounded-xl px-4 py-3 mb-4">
          <p className="text-[12px] text-charcoal-light leading-[17px]">
            Buy and validate at the station counter or ATVM – this app doesn&rsquo;t sell tickets directly
          </p>
        </div>
      </div>

      <div className="px-4 pb-6">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => router.push(`/tickets/payment?from=${from}&to=${to}&class=${ticketClass}&fare=${selectedFare}&price=${price}`)}
        >
          Continue &middot; ₹{price}
        </Button>
      </div>
    </div>
  );
}
