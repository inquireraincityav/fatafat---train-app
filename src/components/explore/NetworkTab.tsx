'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LineFilter } from './LineFilter';
import { Button } from '@/components/ui/Button';
import { RailLine } from '@/lib/types';
import { lineColors, lineLabels } from '@/lib/tokens';

export function NetworkTab() {
  const router = useRouter();
  const [selectedLine, setSelectedLine] = useState<RailLine | 'all'>('all');

  return (
    <div>
      <LineFilter selectedLine={selectedLine} onChange={setSelectedLine} />

      <div className="mt-4 rounded-2xl overflow-hidden bg-[#1a2332] relative" style={{ height: 400 }}>
        <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="400" fill="#1a2332"/>
          <path d="M160 0 L160 400" stroke="#1B3A6B" strokeWidth="3" opacity="0.7"/>
          <path d="M200 0 L190 120 L195 240 L200 400" stroke="#C0392B" strokeWidth="3" opacity="0.7"/>
          <path d="M300 20 L260 100 L220 200 L190 300 L160 400" stroke="#27AE60" strokeWidth="3" opacity="0.7"/>
          <path d="M60 160 L160 160" stroke="#8B5CF6" strokeWidth="2.5" opacity="0.5"/>
          <circle cx="160" cy="100" r="3" fill="white" opacity="0.5"/>
          <circle cx="160" cy="200" r="3" fill="white" opacity="0.5"/>
          <circle cx="195" cy="160" r="3" fill="white" opacity="0.5"/>
          <circle cx="220" cy="200" r="3" fill="white" opacity="0.5"/>
          <circle cx="160" cy="300" r="3" fill="white" opacity="0.5"/>
        </svg>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 px-1">
        {(['western', 'central', 'harbour', 'metro-1'] as RailLine[]).map((line) => (
          <div key={line} className="flex items-center gap-1.5">
            <div className="w-4 h-1 rounded-full" style={{ backgroundColor: lineColors[line] }} />
            <span className="text-xs text-charcoal-light">{lineLabels[line]}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-1 rounded-full bg-marigold" />
          <span className="text-xs text-charcoal-light">Your route</span>
        </div>
      </div>

      <div className="mt-4">
        <Button
          variant="secondary"
          size="lg"
          fullWidth
          onClick={() => router.push('/network-map')}
        >
          Open full interactive map →
        </Button>
      </div>
    </div>
  );
}
