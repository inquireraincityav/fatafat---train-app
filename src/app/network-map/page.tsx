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
          className="p-2"
          aria-label="Settings"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F4EDE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        </button>
      </header>

      <div className="px-4 mb-3">
        <LineFilter selectedLine={selectedLine} onChange={setSelectedLine} />
      </div>

      <div className="flex-1 relative mx-4 rounded-t-2xl overflow-hidden bg-indigo-light min-h-[400px]">
        <div className="absolute inset-0 flex items-center justify-center text-cream-light/50 text-sm">
          Full interactive map loads with Carto API key
        </div>
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

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => router.push('/explore')}
        >
          Plan a journey on this network
        </Button>
      </div>
    </div>
  );
}
