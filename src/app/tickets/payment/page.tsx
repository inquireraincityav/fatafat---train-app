'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { PaymentMethod } from '@/lib/types';

const methods: { id: PaymentMethod; label: string; icon: string }[] = [
  { id: 'google-pay', label: 'Google Pay', icon: 'G' },
  { id: 'apple-pay', label: 'Apple Pay', icon: '' },
  { id: 'card', label: 'Debit / Credit card', icon: '💳' },
];

function PaymentInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<PaymentMethod>('google-pay');

  const from = searchParams.get('from') || 'Andheri';
  const to = searchParams.get('to') || 'Churchgate';
  const ticketClass = searchParams.get('class') || 'second';
  const fare = searchParams.get('fare') || 'single';
  const price = searchParams.get('price') || '15';

  function handlePay() {
    router.push(`/tickets/success?from=${from}&to=${to}&class=${ticketClass}&fare=${fare}&price=${price}`);
  }

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
          <h1 className="font-serif text-[18px] font-bold text-indigo">Payment</h1>
        </div>
      </header>

      <div className="px-4 flex-1">
        {/* Order summary */}
        <div className="bg-cream-light border border-[#d8cebc] rounded-2xl p-4 mb-4">
          <p className="text-[14px] font-semibold text-charcoal">{from} &rarr; {to}</p>
          <p className="text-[12px] text-charcoal-light mt-0.5">
            {fare === 'single' ? 'Single' : fare === 'return' ? 'Return' : fare === 'monthly' ? 'Monthly pass' : 'Quarterly pass'}
            {' · '}{ticketClass === 'first' ? 'First' : 'Second'} class
          </p>
          <p className="text-[20px] font-bold text-indigo mt-2">₹{price}</p>
        </div>

        {/* Payment methods */}
        <p className="text-[11px] font-semibold tracking-[0.8px] text-[#a09890] uppercase mb-2">Pay with</p>
        <div className="space-y-2">
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelected(m.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-colors ${
                selected === m.id
                  ? 'bg-cream-light border-marigold ring-1 ring-marigold'
                  : 'bg-cream-light border-[#d8cebc]'
              }`}
            >
              <span className="w-8 h-8 rounded-lg bg-cream flex items-center justify-center text-[14px] font-bold">
                {m.icon}
              </span>
              <span className="text-[14px] font-medium text-charcoal">{m.label}</span>
              <div className="flex-1 flex justify-end">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selected === m.id ? 'border-marigold' : 'border-[#d8cebc]'
                }`}>
                  {selected === m.id && <div className="w-2.5 h-2.5 rounded-full bg-marigold" />}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pb-6">
        <Button variant="primary" size="lg" fullWidth onClick={handlePay}>
          Pay ₹{price}
        </Button>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-cream" />}>
      <PaymentInner />
    </Suspense>
  );
}
