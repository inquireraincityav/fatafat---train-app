'use client';

import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/layout/PageHeader';
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
        {/* Active tickets */}
        {activeTickets.length > 0 && (
          <div className="space-y-4 mb-4">
            {activeTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-indigo rounded-2xl p-5 text-cream-light"
              >
                <div className="flex items-start justify-between mb-1">
                  <span className="text-[12px] text-cream-light/60">Active ticket</span>
                  <span className="bg-marigold text-indigo text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    Valid
                  </span>
                </div>
                <h3 className="font-serif text-[20px] font-bold text-cream-light leading-[26px] mb-0.5">
                  {ticket.from} &rarr; {ticket.to}
                </h3>
                <p className="text-[13px] text-cream-light/60 mb-4">
                  {ticket.ticketClass === 'first' ? 'First' : 'Second'} class &middot;{' '}
                  {ticket.fareType === 'single' ? 'Single journey' : ticket.fareType === 'return' ? 'Return' : ticket.fareType === 'monthly' ? 'Monthly pass' : 'Quarterly pass'}
                </p>

                {/* QR code */}
                <div className="flex justify-center py-3">
                  <div className="bg-white rounded-xl p-4">
                    <QRCodeSVG
                      value={`fatafat://ticket/${ticket.id}`}
                      size={140}
                      bgColor="#ffffff"
                      fgColor="#1F3A5F"
                    />
                  </div>
                </div>

                <p className="text-center text-[13px] text-marigold mt-3">
                  Valid until 4:30 PM today
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Buy ticket button */}
        <button
          onClick={() => router.push('/tickets/buy')}
          className="w-full bg-marigold text-indigo font-semibold text-[15px] py-3.5 rounded-xl mb-4 active:brightness-95 transition-all"
        >
          Buy a ticket
        </button>

        {/* Past tickets */}
        {pastTickets.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold tracking-[0.8px] text-charcoal-light uppercase mb-2">
              History
            </p>
            <div className="space-y-2">
              {pastTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-cream-light border border-[#d8cebc] rounded-xl px-4 py-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[14px] font-medium text-charcoal">
                        {ticket.from} &rarr; {ticket.to}
                      </p>
                      <p className="text-[11px] text-charcoal-light">
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
            <p className="text-[12px] text-charcoal-light/60 mt-1">Buy your first ticket to get started</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
