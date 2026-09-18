'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { LineFilter } from '@/components/explore/LineFilter';
import { Button } from '@/components/ui/Button';
import { RailLine } from '@/lib/types';
import { lineColors, lineLabels } from '@/lib/tokens';

type Tab = 'plan' | 'network' | 'basics';

export default function ExplorePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('plan');
  const [selectedLine, setSelectedLine] = useState<RailLine | 'all'>('all');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'plan', label: 'Plan' },
    { id: 'network', label: 'Network' },
    { id: 'basics', label: 'Basics' },
  ];

  return (
    <AppShell>
      <PageHeader title="Explore" />

      {/* Tab bar */}
      <div className="flex px-4 mt-1 mb-3 gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 text-[13px] font-medium rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-indigo text-cream-light'
                : 'bg-cream-light text-charcoal-light border border-[#d8cebc]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Plan tab */}
      {activeTab === 'plan' && (
        <div className="px-4">
          <div className="bg-cream-light border border-[#d8cebc] rounded-2xl p-4 mb-3">
            <button
              onClick={() => router.push('/station-picker?field=from&returnTo=/explore')}
              className="w-full flex items-center gap-3 pb-3 border-b border-[#ede5d8]"
            >
              <span className="w-2.5 h-2.5 rounded-full border-2 border-charcoal-light" />
              <span className="text-[14px] text-[#a09890]">Starting station</span>
            </button>
            <button
              onClick={() => router.push('/station-picker?field=to&returnTo=/explore')}
              className="w-full flex items-center gap-3 pt-3"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-marigold" />
              <span className="text-[14px] text-[#a09890]">Destination station</span>
            </button>
          </div>

          {/* Depart at / Reach by toggle */}
          <div className="flex bg-cream-light border border-[#d8cebc] rounded-xl overflow-hidden mb-3">
            <button className="flex-1 py-2.5 text-[13px] font-medium bg-indigo text-cream-light">
              Depart at
            </button>
            <button className="flex-1 py-2.5 text-[13px] font-medium text-charcoal-light">
              Reach by
            </button>
          </div>

          <div className="bg-cream-light border border-[#d8cebc] rounded-xl px-4 py-3 mb-3">
            <span className="text-[13px] text-charcoal-light">Now &middot; {new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
          </div>

          <Button fullWidth variant="primary" size="lg" onClick={() => router.push('/journey?from=Andheri&to=Churchgate')}>
            Find routes
          </Button>
        </div>
      )}

      {/* Network tab */}
      {activeTab === 'network' && (
        <div className="px-4">
          <div className="bg-[#1a2332] rounded-2xl overflow-hidden mb-3">
            <div className="px-3 pt-3 pb-2">
              <LineFilter selectedLine={selectedLine} onChange={setSelectedLine} />
            </div>
            <div className="relative min-h-[320px]">
              <svg width="100%" height="320" viewBox="0 0 370 320" preserveAspectRatio="xMidYMid slice">
                <rect width="370" height="320" fill="#1a2332" />
                <path d="M140 0 L140 320" stroke="#1B3A6B" strokeWidth="2.5" opacity="0.7" />
                <path d="M180 0 L175 120 L180 320" stroke="#C0392B" strokeWidth="2.5" opacity="0.7" />
                <path d="M280 10 L240 100 L200 200 L160 320" stroke="#27AE60" strokeWidth="2.5" opacity="0.7" />
                <path d="M60 120 L140 120" stroke="#8B5CF6" strokeWidth="2" opacity="0.5" />
                <circle cx="140" cy="60" r="3" fill="white" opacity="0.4" />
                <circle cx="140" cy="120" r="4" fill="#E8A63C" opacity="0.8" />
                <circle cx="140" cy="200" r="3" fill="white" opacity="0.4" />
                <circle cx="175" cy="160" r="3" fill="white" opacity="0.4" />
                <circle cx="220" cy="160" r="3" fill="white" opacity="0.4" />
                <circle cx="140" cy="280" r="3" fill="white" opacity="0.4" />
              </svg>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
            {(['western', 'central', 'harbour', 'metro-1'] as RailLine[]).map((line) => (
              <div key={line} className="flex items-center gap-1.5">
                <div className="w-4 h-1 rounded-full" style={{ backgroundColor: lineColors[line] }} />
                <span className="text-[11px] text-charcoal-light">{lineLabels[line]}</span>
              </div>
            ))}
          </div>

          <Button fullWidth variant="secondary" size="lg" onClick={() => router.push('/network-map')}>
            View full map
          </Button>
        </div>
      )}

      {/* Basics tab */}
      {activeTab === 'basics' && (
        <div className="px-4 space-y-3">
          {[
            { title: 'Fast vs. slow trains', desc: 'Which one stops at your station, and when to pick which.', topic: 'fast-vs-slow', icon: '🚄' },
            { title: 'Compartments', desc: 'General, ladies\', first class – where to stand and what to expect.', topic: 'compartments', icon: '🚃' },
            { title: 'Fares & tickets', desc: 'Single, return, passes – what they cost and where to buy.', topic: 'fares', icon: '🎫' },
          ].map((item) => (
            <button
              key={item.topic}
              onClick={() => router.push(`/basics/${item.topic}`)}
              className="w-full bg-cream-light border border-[#d8cebc] rounded-2xl p-4 text-left active:bg-[#f0e8da] transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">{item.icon}</span>
                <div>
                  <h3 className="text-[15px] font-semibold text-charcoal leading-[20px]">{item.title}</h3>
                  <p className="text-[13px] text-charcoal-light leading-[18px] mt-0.5">{item.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </AppShell>
  );
}
