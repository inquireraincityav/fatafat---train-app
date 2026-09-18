'use client';

import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { QRCodeSVG } from 'qrcode.react';

export default function TicketsPage() {
  const router = useRouter();
  const { tickets, hydrated } = useApp();

  if (!hydrated) return <AppShell><div className="min-h-dvh bg-cream" /></AppShell>;

  const activeTickets = tickets.filter((t) => t.isActive);
  const pastTickets = tickets.filter((t) => !t.isActive);

  return (
    <AppShell>
      <PageHeader title="My tickets" />

      <div className="px-4 mt-2">
        <Button fullWidth variant="primary" size="lg" onClick={() => router.push('/tickets/buy')} className="mb-4">
          Buy a ticket
        </Button>

        {activeTickets.length > 0 && (
          <div className="mb-4">
            <p className="text-[11px] font-semibold tracking-[0.8px] text-[#a09890] uppercase mb-2">Active</p>
            <div className="space-y-3">
              {activeTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-cream-light border border-[#d8cebc] rounded-2xl p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-[15px] font-semibold text-charcoal">
                        {ticket.from} &rarr; {ticket.to}
                      </p>
                      <p className="text-[12px] text-charcoal-light mt-0.5">
                        {ticket.fareType === 'single' ? 'Single' : ticket.fareType === 'return' ? 'Return' : ticket.fareType === 'monthly' ? 'Monthly pass' : 'Quarterly pass'}
                        {' · '}{ticket.ticketClass === 'first' ? 'First' : 'Second'} class
                      </p>
                      {ticket.expiresAt && (
                        <p className="text-[11px] text-marigold mt-1">
                          Expires {new Date(ticket.expiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </p>
                      )}
                    </div>
                    <span className="text-[16px] font-bold text-indigo">
                      ₹{ticket.price}
                    </span>
                  </div>
                  <div className="flex justify-center py-2">
                    <QRCodeSVG
                      value={`fatafat://ticket/${ticket.id}`}
                      size={120}
                      bgColor="#FBF7EF"
                      fgColor="#1F3A5F"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {pastTickets.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold tracking-[0.8px] text-[#a09890] uppercase mb-2">History</p>
            <div className="space-y-2">
              {pastTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-cream-light/60 border border-[#ede5d8] rounded-xl px-4 py-3 opacity-70"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[14px] text-charcoal">
                        {ticket.from} &rarr; {ticket.to}
                      </p>
                      <p className="text-[11px] text-[#a09890]">
                        {new Date(ticket.purchasedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        {' · '}{ticket.ticketClass === 'first' ? 'First' : 'Second'} class
                      </p>
                    </div>
                    <span className="text-[14px] text-charcoal-light">₹{ticket.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tickets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[14px] text-charcoal-light">No tickets yet</p>
            <p className="text-[12px] text-[#a09890] mt-1">Buy your first ticket to get started</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
