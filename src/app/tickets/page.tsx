'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { TabBar } from '@/components/ui/TabBar';
import { Badge } from '@/components/ui/Badge';
import { useApp } from '@/context/AppContext';
import { mockTickets, ticketHistory } from '@/lib/mockData';
import { formatPrice } from '@/lib/pricing';

type TicketTab = 'my-tickets' | 'buy';

export default function TicketsPage() {
  const router = useRouter();
  const { tickets } = useApp();
  const [activeTab, setActiveTab] = useState<TicketTab>('my-tickets');

  const allTickets = [...tickets, ...mockTickets];

  return (
    <AppShell>
      <PageHeader title="Tickets" />
      <div className="px-4">
        <TabBar
          tabs={[
            { id: 'my-tickets' as const, label: 'My Tickets' },
            { id: 'buy' as const, label: 'Buy' },
          ]}
          activeTab={activeTab}
          onChange={(tab) => {
            if (tab === 'buy') {
              router.push('/tickets/buy');
            } else {
              setActiveTab(tab);
            }
          }}
        />

        <div className="mt-4 space-y-4">
          {allTickets.filter((t) => t.status === 'valid' || t.status === 'active').map((ticket) => (
            <div key={ticket.id} className="bg-indigo rounded-2xl p-5 text-cream-light">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-cream-light/70">
                  {ticket.status === 'valid' ? 'Active ticket' : 'Monthly pass'}
                </span>
                <Badge>
                  {ticket.status === 'valid' ? 'Valid' : 'Active'}
                </Badge>
              </div>
              <h3 className="font-serif text-xl font-bold mb-1">
                {ticket.from.name} → {ticket.to.name}
              </h3>
              <p className="text-sm text-cream-light/60">
                {ticket.ticketClass === 'first' ? 'First' : 'Second'} class - {ticket.ticketType === 'single' ? 'Single journey' : 'Monthly pass'}
              </p>

              {ticket.ticketType === 'single' && (
                <>
                  <div className="bg-white rounded-xl p-6 my-4 flex items-center justify-center">
                    <div className="w-32 h-32 bg-indigo/10 rounded flex items-center justify-center">
                      <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                        <rect x="10" y="10" width="80" height="80" rx="4" stroke="#1F3A5F" strokeWidth="2"/>
                        <rect x="20" y="20" width="8" height="8" fill="#1F3A5F"/>
                        <rect x="30" y="20" width="8" height="8" fill="#1F3A5F"/>
                        <rect x="40" y="20" width="8" height="8" fill="#1F3A5F"/>
                        <rect x="20" y="30" width="8" height="8" fill="#1F3A5F"/>
                        <rect x="50" y="30" width="8" height="8" fill="#1F3A5F"/>
                        <rect x="60" y="20" width="8" height="8" fill="#1F3A5F"/>
                        <rect x="70" y="20" width="8" height="8" fill="#1F3A5F"/>
                        <rect x="20" y="60" width="8" height="8" fill="#1F3A5F"/>
                        <rect x="20" y="70" width="8" height="8" fill="#1F3A5F"/>
                        <rect x="60" y="60" width="8" height="8" fill="#1F3A5F"/>
                        <rect x="70" y="60" width="8" height="8" fill="#1F3A5F"/>
                        <rect x="60" y="70" width="8" height="8" fill="#1F3A5F"/>
                        <rect x="70" y="70" width="8" height="8" fill="#1F3A5F"/>
                        <rect x="40" y="40" width="8" height="8" fill="#1F3A5F"/>
                        <rect x="50" y="50" width="8" height="8" fill="#1F3A5F"/>
                      </svg>
                    </div>
                  </div>
                  <p className="text-center text-sm text-marigold">
                    Valid until {new Date(ticket.validUntil).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true })} today
                  </p>
                </>
              )}

              {ticket.ticketType === 'monthly' && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-cream-light/60 mb-1.5">
                    <span>Expires {new Date(ticket.validUntil).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className="h-2 bg-cream-light/20 rounded-full overflow-hidden">
                    <div className="h-full bg-marigold rounded-full" style={{ width: '53%' }} />
                  </div>
                  <p className="text-right text-xs text-cream-light/60 mt-1">16 days left</p>
                </div>
              )}
            </div>
          ))}

          <div className="mt-6">
            <h3 className="text-xs font-semibold tracking-wider text-charcoal-light uppercase mb-3">
              History
            </h3>
            {ticketHistory.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-cream last:border-0">
                <div>
                  <div className="font-medium text-charcoal">{item.from} → {item.to}</div>
                  <div className="text-xs text-charcoal-light">{item.date} - {item.type}</div>
                </div>
                <div className="font-semibold text-charcoal">{formatPrice(item.price)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
