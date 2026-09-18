'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { ProgressStepper } from '@/components/ui/ProgressStepper';
import { useApp } from '@/context/AppContext';
import { formatPrice } from '@/lib/pricing';
import { getStation } from '@/lib/stations';
import { PaymentMethod, Ticket } from '@/lib/types';

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addTicket } = useApp();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [step, setStep] = useState<'method' | 'success'>('method');

  const from = searchParams.get('from') || 'Andheri';
  const to = searchParams.get('to') || 'Churchgate';
  const ticketClass = searchParams.get('class') || 'second';
  const ticketType = searchParams.get('type') || 'single';
  const price = parseInt(searchParams.get('price') || '15', 10);

  const methods: { id: PaymentMethod; label: string; icon: React.ReactNode }[] = [
    {
      id: 'google-pay',
      label: 'Google Pay',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-white border border-cream flex items-center justify-center text-xs font-bold">
          G<span className="text-[#4285F4]">P</span>
        </div>
      ),
    },
    {
      id: 'apple-pay',
      label: 'Apple Pay',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-charcoal text-white flex items-center justify-center text-lg font-bold">

        </div>
      ),
    },
    {
      id: 'card',
      label: 'Debit / Credit card',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-cream border border-charcoal-light/20 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3D3A34" strokeWidth="2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
            <line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
        </div>
      ),
    },
  ];

  const handlePay = () => {
    const fromStation = getStation(from.toLowerCase().replace(/\s+/g, '-'));
    const toStation = getStation(to.toLowerCase().replace(/\s+/g, '-'));

    const newTicket: Ticket = {
      id: `ticket-${Date.now()}`,
      from: fromStation || { id: 'custom', name: from, lines: ['western'], coordinates: [0, 0] },
      to: toStation || { id: 'custom', name: to, lines: ['western'], coordinates: [0, 0] },
      ticketClass: ticketClass as 'second' | 'first',
      ticketType: ticketType as 'single' | 'return' | 'monthly' | 'quarterly',
      price,
      status: 'valid',
      purchasedAt: new Date().toISOString(),
      validUntil: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    };

    addTicket(newTicket);
    setStep('success');
  };

  if (step === 'success') {
    return (
      <AppShell>
        <PageHeader title="Tickets" showSettings={true} />
        <div className="px-4">
          <ProgressStepper steps={3} currentStep={3} />

          <div className="flex flex-col items-center mt-12 mb-8">
            <div className="w-20 h-20 rounded-full bg-success-light flex items-center justify-center mb-4">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2D8F5E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl font-bold text-charcoal mb-1">Payment successful</h2>
            <p className="text-charcoal-light text-sm">Your {ticketType} journey is now active</p>
          </div>

          <div className="bg-cream-light rounded-xl p-4 space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-charcoal-light">Route</span>
              <span className="font-medium text-charcoal">{from} → {to}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-light">Type</span>
              <span className="font-medium text-charcoal">
                {ticketType.charAt(0).toUpperCase() + ticketType.slice(1)} journey · {ticketClass === 'first' ? 'First' : 'Second'} class
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-light">Paid</span>
              <span className="font-serif font-bold text-charcoal">{formatPrice(price)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-light">Purchased</span>
              <span className="font-medium text-charcoal">
                Today, {new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true })}
              </span>
            </div>
          </div>

          <div className="bg-marigold/10 rounded-xl p-4 flex items-start gap-3 mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8A63C" strokeWidth="2" className="shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <p className="text-sm text-charcoal">
              Your QR code is ready. Show it to the ticket checker (TC) if asked on board.
            </p>
          </div>

          <Button
            variant="secondary"
            size="lg"
            fullWidth
            onClick={() => router.push('/tickets')}
          >
            View my tickets →
          </Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader title="Tickets" showSettings={true} />
      <div className="px-4">
        <ProgressStepper steps={3} currentStep={1} />
        <div className="flex items-center justify-between mt-3 mb-4">
          <div className="flex items-center gap-2">
            <button onClick={() => router.back()} className="p-1 -ml-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1F3A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <h2 className="font-serif text-xl font-bold text-indigo">Payment</h2>
          </div>
          <span className="font-serif text-xl font-bold text-indigo">{formatPrice(price)}</span>
        </div>

        <div className="bg-cream-light rounded-xl px-4 py-2.5 mb-4">
          <span className="text-sm text-charcoal">
            {ticketType.charAt(0).toUpperCase() + ticketType.slice(1)} journey · {ticketClass === 'first' ? 'First' : 'Second'} class
          </span>
          <span className="mx-2 text-charcoal-light">·</span>
          <span className="text-sm text-charcoal">{from} → {to}</span>
        </div>

        <div className="space-y-3 mb-8">
          {methods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full flex items-center gap-4 rounded-xl px-4 py-4 transition-all ${
                selectedMethod === method.id
                  ? 'bg-marigold/10 border-2 border-marigold'
                  : 'bg-cream-light border border-cream hover:bg-cream'
              }`}
            >
              {method.icon}
              <span className="font-medium text-charcoal">{method.label}</span>
            </button>
          ))}
        </div>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={!selectedMethod}
          onClick={handlePay}
          className={!selectedMethod ? 'opacity-50' : ''}
        >
          {selectedMethod ? `Pay ${formatPrice(price)}` : 'Select a payment method'}
        </Button>

        <p className="text-center text-xs text-charcoal-light mt-4 flex items-center justify-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          Secured by Razorpay - PCI DSS compliant
        </p>
      </div>
    </AppShell>
  );
}

export default function PaymentPage() {
  return (
    <Suspense>
      <PaymentContent />
    </Suspense>
  );
}
