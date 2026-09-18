'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { FareType, TicketClass } from '@/lib/types';

function SuccessInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addTicket } = useApp();

  const from = searchParams.get('from') || 'Andheri';
  const to = searchParams.get('to') || 'Churchgate';
  const ticketClass = (searchParams.get('class') || 'second') as TicketClass;
  const fare = (searchParams.get('fare') || 'single') as FareType;
  const price = parseInt(searchParams.get('price') || '15', 10);

  useEffect(() => {
    const now = new Date().toISOString();
    addTicket({
      id: `tkt-${Date.now()}`,
      from,
      to,
      fareType: fare,
      ticketClass,
      price,
      purchasedAt: now,
      isActive: true,
    });
  }, []);

  return (
    <div className="min-h-dvh bg-cream flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-[280px]">
        <div className="w-16 h-16 rounded-full bg-success-light flex items-center justify-center mx-auto mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2D8F5E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="font-serif text-[24px] font-bold text-indigo mb-2">Payment successful</h1>
        <p className="text-[14px] text-charcoal-light mb-6">Your ticket is ready</p>

        <div className="bg-cream-light border border-[#d8cebc] rounded-2xl p-4 mb-6 text-left">
          <p className="text-[15px] font-semibold text-charcoal">{from} &rarr; {to}</p>
          <p className="text-[12px] text-charcoal-light mt-1">
            {fare === 'single' ? 'Single' : fare === 'return' ? 'Return' : fare === 'monthly' ? 'Monthly pass' : 'Quarterly pass'}
            {' · '}{ticketClass === 'first' ? 'First' : 'Second'} class
          </p>
          <p className="text-[12px] text-charcoal-light mt-0.5">
            {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
          <p className="text-[18px] font-bold text-indigo mt-2">₹{price}</p>
        </div>

        <Button variant="primary" size="lg" fullWidth onClick={() => router.push('/tickets')}>
          View my tickets
        </Button>
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
