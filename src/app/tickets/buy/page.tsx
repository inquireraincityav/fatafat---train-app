'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { TabBar } from '@/components/ui/TabBar';
import { Button } from '@/components/ui/Button';
import { TicketClass, TicketType } from '@/lib/types';
import { getPrice, formatPrice, ticketTypeLabels, ticketTypeLabelsFirstClass } from '@/lib/pricing';

export default function BuyTicketPage() {
  const router = useRouter();
  const [fromStation, setFromStation] = useState('Andheri');
  const [toStation, setToStation] = useState('Churchgate');
  const [ticketClass, setTicketClass] = useState<TicketClass>('second');
  const [ticketType, setTicketType] = useState<TicketType>('single');

  const price = getPrice(ticketClass, ticketType);
  const labels = ticketClass === 'first' ? ticketTypeLabelsFirstClass : ticketTypeLabels;

  const ticketTypes: TicketType[] = ['single', 'return', 'monthly', 'quarterly'];

  return (
    <AppShell>
      <PageHeader title="Tickets" />
      <div className="px-4">
        <TabBar
          tabs={[
            { id: 'my-tickets' as const, label: 'My Tickets' },
            { id: 'buy' as const, label: 'Buy' },
          ]}
          activeTab="buy"
          onChange={(tab) => {
            if (tab === 'my-tickets') router.push('/tickets');
          }}
        />

        <div className="mt-4 space-y-4">
          <div className="bg-cream-light rounded-xl border-l-4 border-l-charcoal-light/20 p-4">
            <div className="text-xs text-charcoal-light uppercase tracking-wider mb-3">Route</div>
            <button
              onClick={() => router.push('/station-picker?field=from&returnTo=/tickets/buy')}
              className="flex items-center gap-3 mb-3 w-full text-left"
            >
              <div className="w-3 h-3 rounded-full border-2 border-charcoal-light" />
              <span className="font-medium text-charcoal">{fromStation}</span>
            </button>
            <button
              onClick={() => router.push('/station-picker?field=to&returnTo=/tickets/buy')}
              className="flex items-center gap-3 w-full text-left"
            >
              <div className="w-3 h-3 rounded-full border-2 border-marigold bg-marigold/30">
                <div className="w-1 h-1 rounded-full bg-marigold mx-auto mt-[2px]" />
              </div>
              <span className="font-medium text-charcoal">{toStation}</span>
            </button>
          </div>

          <TabBar
            tabs={[
              { id: 'second' as const, label: 'Second class' },
              { id: 'first' as const, label: 'First class' },
            ]}
            activeTab={ticketClass}
            onChange={(cls) => setTicketClass(cls as TicketClass)}
          />

          <div className="space-y-2">
            {ticketTypes.map((type) => {
              const isSelected = ticketType === type;
              const typePrice = getPrice(ticketClass, type);
              return (
                <button
                  key={type}
                  onClick={() => setTicketType(type)}
                  className={`w-full flex items-center justify-between rounded-xl px-4 py-4 transition-all ${
                    isSelected
                      ? 'bg-indigo text-cream-light'
                      : 'bg-cream-light border border-cream hover:bg-cream'
                  }`}
                >
                  <div className="text-left">
                    <div className={`font-semibold ${isSelected ? 'text-cream-light' : 'text-charcoal'}`}>
                      {labels[type].label}
                    </div>
                    <div className={`text-sm ${isSelected ? 'text-cream-light/60' : 'text-charcoal-light'}`}>
                      {labels[type].description}
                    </div>
                  </div>
                  <div className={`font-serif text-2xl font-bold ${isSelected ? 'text-marigold-light' : 'text-indigo'}`}>
                    {formatPrice(typePrice)}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-cream-light rounded-xl p-4 flex items-start gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B6860" strokeWidth="2" className="shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <p className="text-sm text-charcoal-light">
              Ticket is valid for the Mumbai Western Suburban Railway, {fromStation} to {toStation} section.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => {
              const params = new URLSearchParams({
                from: fromStation,
                to: toStation,
                class: ticketClass,
                type: ticketType,
                price: price.toString(),
              });
              router.push(`/tickets/payment?${params.toString()}`);
            }}
          >
            Proceed to pay · {formatPrice(price)}
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
