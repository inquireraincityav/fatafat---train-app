'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LineFilter } from '@/components/explore/LineFilter';
import { Button } from '@/components/ui/Button';
import { RailLine } from '@/lib/types';
import { lineColors, lineLabels } from '@/lib/tokens';

export default function NetworkMapPage() {
  const router = useRouter();
  const [selectedLine, setSelectedLine] = useState<RailLine | 'all'>('all');

  return (
    <div className="min-h-dvh bg-indigo flex flex-col">
      <header className="flex items-center justify-between px-4 pt-12 pb-3">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-1 -ml-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F4EDE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <h1 className="font-serif text-2xl font-bold text-cream-light">Network map</h1>
        </div>
        <button
          onClick={() => router.push('/settings')}
          className="w-9 h-9 rounded-full bg-indigo-light flex items-center justify-center"
          aria-label="Settings"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#F4EDE0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </header>

      <div className="px-4 mb-3">
        <LineFilter selectedLine={selectedLine} onChange={setSelectedLine} />
      </div>

      <div className="flex-1 relative mx-4 rounded-t-2xl overflow-hidden bg-[#1a2332] min-h-[400px]">
        <svg width="100%" height="100%" viewBox="0 0 400 500" fill="none" preserveAspectRatio="xMidYMid slice">
          <rect width="400" height="500" fill="#1a2332" />
          <path d="M160 0 L160 500" stroke="#1B3A6B" strokeWidth="3" opacity="0.7" />
          <path d="M200 0 L190 140 L195 280 L200 500" stroke="#C0392B" strokeWidth="3" opacity="0.7" />
          <path d="M320 20 L270 120 L220 240 L190 340 L160 500" stroke="#27AE60" strokeWidth="3" opacity="0.7" />
          <path d="M60 180 L160 180" stroke="#8B5CF6" strokeWidth="2.5" opacity="0.5" />
          <circle cx="160" cy="100" r="3" fill="white" opacity="0.5" />
          <circle cx="160" cy="180" r="4" fill="#E8A63C" opacity="0.8" />
          <circle cx="160" cy="250" r="3" fill="white" opacity="0.5" />
          <circle cx="195" cy="200" r="3" fill="white" opacity="0.5" />
          <circle cx="220" cy="240" r="3" fill="white" opacity="0.5" />
          <circle cx="160" cy="360" r="3" fill="white" opacity="0.5" />
          <circle cx="195" cy="420" r="3" fill="white" opacity="0.5" />
        </svg>
      </div>

      <div className="px-4 py-4 bg-indigo">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4">
          {(['western', 'central', 'harbour', 'metro-1'] as RailLine[]).map((line) => (
            <div key={line} className="flex items-center gap-1.5">
              <div className="w-4 h-1 rounded-full" style={{ backgroundColor: lineColors[line] }} />
              <span className="text-xs text-cream-light/70">{lineLabels[line]}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-1 rounded-full bg-marigold" />
            <span className="text-xs text-cream-light/70">Your route</span>
          </div>
        </div>

        <Button variant="primary" size="lg" fullWidth onClick={() => router.push('/explore')}>
          Plan a journey on this network
        </Button>
      </div>
    </div>
  );
}
