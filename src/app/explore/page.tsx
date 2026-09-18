'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { RailLine } from '@/lib/types';
import { lineColors, lineLabels } from '@/lib/tokens';

type Tab = 'plan' | 'network' | 'basics';

export default function ExplorePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('plan');
  const [timeMode, setTimeMode] = useState<'depart' | 'reach'>('depart');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'plan', label: 'Plan' },
    { id: 'network', label: 'Network' },
    { id: 'basics', label: 'Basics' },
  ];

  return (
    <AppShell>
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-[env(safe-area-inset-top)] pb-1">
        <h1 className="font-serif text-[22px] font-bold text-indigo pt-3">Explore</h1>
        <button
          onClick={() => router.push('/settings')}
          className="w-[32px] h-[32px] rounded-full bg-cream-light border border-[#d8cebc] flex items-center justify-center mt-3"
          aria-label="Settings"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1F3A5F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </header>

      {/* Tab bar */}
      <div className="flex px-4 mt-2 mb-4 gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 text-[13px] font-medium rounded-full transition-colors ${
              activeTab === tab.id
                ? 'bg-cream-light border border-[#d8cebc] text-charcoal shadow-sm'
                : 'text-charcoal-light'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Plan tab */}
      {activeTab === 'plan' && (
        <div className="flex-1 flex flex-col">
          {/* Empty state */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
            <span className="text-[40px] mb-3">🗺️</span>
            <h2 className="font-serif text-[20px] font-bold text-indigo mb-2">Where to?</h2>
            <p className="text-[13px] text-charcoal-light text-center leading-[18px]">
              Pick a start and destination below to see routes, times, and fares.
            </p>
          </div>

          {/* Station inputs at bottom */}
          <div className="bg-cream-light border-t border-[#d8cebc] px-4 pt-4 pb-2">
            <div className="space-y-0">
              <button
                onClick={() => router.push('/station-picker?field=from&returnTo=/explore')}
                className="w-full flex items-center gap-3 py-3 border-b border-[#ede5d8]"
              >
                <div className="w-2.5 h-2.5 rounded-full border-2 border-charcoal-light" />
                <span className="text-[14px] text-[#a09890]">Starting station</span>
              </button>
              <button
                onClick={() => router.push('/station-picker?field=to&returnTo=/explore')}
                className="w-full flex items-center gap-3 py-3"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-charcoal-light" />
                <span className="text-[14px] text-[#a09890]">Destination station</span>
              </button>
            </div>

            {/* Time mode + Pick stations */}
            <div className="flex items-center gap-2 mt-2 mb-2">
              <button
                onClick={() => setTimeMode('depart')}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium border transition-colors ${
                  timeMode === 'depart' ? 'bg-charcoal text-cream-light border-charcoal' : 'bg-transparent border-[#d8cebc] text-charcoal-light'
                }`}
              >
                Depart
              </button>
              <button
                onClick={() => setTimeMode('reach')}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium border transition-colors ${
                  timeMode === 'reach' ? 'bg-charcoal text-cream-light border-charcoal' : 'bg-transparent border-[#d8cebc] text-charcoal-light'
                }`}
              >
                Reach by
              </button>
              <button className="px-3.5 py-1.5 rounded-full text-[12px] font-medium border border-[#d8cebc] text-charcoal-light ml-auto">
                Pick stations
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Network tab */}
      {activeTab === 'network' && (
        <div className="px-4">
          <div className="bg-[#1a2332] rounded-2xl overflow-hidden mb-3">
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
              </svg>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
            {(['western', 'central', 'harbour', 'metro-1'] as RailLine[]).map((line) => (
              <div key={line} className="flex items-center gap-1.5">
                <div className="w-4 h-1 rounded-full" style={{ backgroundColor: lineColors[line] }} />
                <span className="text-[11px] text-charcoal-light">{lineLabels[line]}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => router.push('/network-map')}
            className="w-full bg-cream-light border border-[#d8cebc] text-charcoal font-medium text-[14px] py-3 rounded-xl active:bg-[#ede5d8] transition-colors"
          >
            View full map
          </button>
        </div>
      )}

      {/* Basics tab */}
      {activeTab === 'basics' && (
        <div className="px-4">
          <p className="text-[13px] text-charcoal-light mb-4">
            Everything you need to ride Mumbai&rsquo;s trains &ndash; revisit anytime.
          </p>

          <div className="space-y-3">
            {[
              { title: 'Fast vs. slow trains', desc: 'Which train gets you there, and when to use each', topic: 'fast-vs-slow', emoji: '🚆' },
              { title: 'Compartments', desc: 'Ladies’ coaches, general, and first class explained', topic: 'compartments', emoji: '🚃' },
              { title: 'Fares & tickets', desc: 'Prices, passes, and where to buy', topic: 'fares', emoji: '🎫' },
            ].map((item) => (
              <button
                key={item.topic}
                onClick={() => router.push(`/basics/${item.topic}`)}
                className="w-full bg-cream-light border border-[#d8cebc] rounded-2xl px-4 py-4 text-left active:bg-[#f0e8da] transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="text-[24px] flex-shrink-0">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-semibold text-indigo leading-[20px]">{item.title}</h3>
                    <p className="text-[13px] text-charcoal-light leading-[18px] mt-0.5">{item.desc}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a09890" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-1">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </AppShell>
  );
}
