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

      <div className="mt-4 rounded-2xl overflow-hidden bg-indigo relative" style={{ height: 400 }}>
        <div className="absolute inset-0 flex items-center justify-center text-cream-light/50 text-sm">
          Map loads with Carto API key
        </div>
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
