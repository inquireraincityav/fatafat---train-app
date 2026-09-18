'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { FareType, TicketClass } from '@/lib/types';

function SuccessInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addTicket } = useApp();

  const from = searchParams.get('from') || 'Andheri';
  const to = searchParams.get('to') || 'Churchgate';
  const ticketClass = (searchParams.get('class') || 'first') as TicketClass;
  const fare = (searchParams.get('fare') || 'single') as FareType;
  const price = parseInt(searchParams.get('price') || '50', 10);

  useEffect(() => {
    addTicket({
      id: `tkt-${Date.now()}`,
      from,
      to,
      fareType: fare,
      ticketClass,
      price,
      purchasedAt: new Date().toISOString(),
      isActive: true,
    });
  }, []);

  const fareLabel = fare === 'single' ? 'Single journey' : fare === 'return' ? 'Return' : fare === 'monthly' ? 'Monthly pass' : 'Quarterly pass';
  const classLabel = ticketClass === 'first' ? 'First class' : 'Second class';

  return (
    <div className="min-h-dvh bg-cream flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-[370px]">
        {/* Success icon */}
        <div className="flex justify-center mb-4">
          <div className="w-[56px] h-[56px] rounded-full bg-[#d1f5e0] flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D8F5E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        <h1 className="font-serif text-[24px] font-bold text-indigo text-center mb-1">
          Payment successful
        </h1>
        <p className="text-[14px] text-charcoal-light text-center mb-6">
          Your {fare === 'single' ? 'single journey' : fareLabel.toLowerCase()} is now active
        </p>

        {/* Details card */}
        <div className="bg-cream-light border border-[#d8cebc] rounded-2xl overflow-hidden mb-4">
          {[
            { label: 'Route', value: `${from} → ${to}` },
            { label: 'Type', value: `${fareLabel} · ${classLabel}` },
            { label: 'Paid', value: `₹${price}`, bold: true },
            { label: 'Purchased', value: `Today, ${new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true })}` },
          ].map((row, i) => (
            <div key={row.label} className={`flex items-center justify-between px-4 py-3 ${i < 3 ? 'border-b border-[#ede5d8]' : ''}`}>
              <span className="text-[13px] text-charcoal-light">{row.label}</span>
              <span className={`text-[14px] text-charcoal ${row.bold ? 'font-bold text-[16px]' : 'font-medium'}`}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* QR note */}
        <div className="bg-[#fef9e7] border border-[#f5e6a3] rounded-xl px-4 py-3 mb-6 flex items-start gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9a6a10" strokeWidth="2" className="flex-shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <p className="text-[13px] text-charcoal leading-[18px]">
            Your QR code is ready. Show it to the ticket checker (TC) if asked on board.
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() => router.push('/tickets')}
          className="w-full bg-indigo text-cream-light font-semibold text-[15px] py-3.5 rounded-xl flex items-center justify-center gap-2 active:brightness-110 transition-all"
        >
          View my tickets <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-cream" />}>
      <SuccessInner />
    </Suspense>
  );
}
