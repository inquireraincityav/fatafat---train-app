'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RailLine } from '@/lib/types';
import { lineColors, lineLabels } from '@/lib/tokens';

const filters: { id: RailLine | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'western', label: 'Western' },
  { id: 'central', label: 'Central' },
  { id: 'harbour', label: 'Harbour' },
  { id: 'metro-1', label: 'Metro 1' },
];

export default function NetworkMapPage() {
  const router = useRouter();
  const [selectedLine, setSelectedLine] = useState<RailLine | 'all'>('all');

  return (
    <div className="min-h-dvh bg-[#1a2332] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-[env(safe-area-inset-top)]">
        <div className="flex items-center gap-3 pt-3 pb-2">
          <button onClick={() => router.back()} className="p-1 -ml-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F4EDE0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <h1 className="font-serif text-[20px] font-bold text-cream-light">Network map</h1>
        </div>
        <button
          onClick={() => router.push('/settings')}
          className="w-[32px] h-[32px] rounded-full bg-[#253f5f] flex items-center justify-center mt-1"
          aria-label="Settings"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F4EDE0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </header>

      {/* Line filter pills */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto hide-scrollbar">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedLine(f.id)}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
              selectedLine === f.id
                ? 'bg-marigold text-indigo'
                : 'bg-[#253f5f] text-cream-light/70'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Map area */}
      <div className="flex-1 relative min-h-[400px]">
        <svg width="100%" height="100%" viewBox="0 0 400 600" fill="none" preserveAspectRatio="xMidYMid slice">
          <rect width="400" height="600" fill="#1a2332" />
          {/* Western line - blue */}
          {(selectedLine === 'all' || selectedLine === 'western') && (
            <path d="M120 0 L120 160 L115 400 L110 600" stroke="#1B3A6B" strokeWidth="3" />
          )}
          {/* Central line - red */}
          {(selectedLine === 'all' || selectedLine === 'central') && (
            <path d="M320 0 L280 100 L240 200 L200 350 L170 500 L150 600" stroke="#C0392B" strokeWidth="3" />
          )}
          {/* Harbour line - green */}
          {(selectedLine === 'all' || selectedLine === 'harbour') && (
            <path d="M350 300 L300 380 L240 430 L160 480 L100 550 L60 600" stroke="#27AE60" strokeWidth="3" />
          )}
          {/* Metro 1 - purple */}
          {(selectedLine === 'all' || selectedLine === 'metro-1') && (
            <path d="M50 160 L120 160 L200 170 L280 160" stroke="#8B5CF6" strokeWidth="2.5" />
          )}
          {/* Station labels & dots */}
          <circle cx="120" cy="60" r="4" fill="white" opacity="0.6" />
          <text x="130" y="64" fill="white" opacity="0.5" fontSize="9" fontFamily="sans-serif">Virar</text>
          <circle cx="120" cy="160" r="5" fill="#E8A63C" />
          <text x="130" y="165" fill="white" opacity="0.7" fontSize="9" fontFamily="sans-serif">Andheri</text>
          <circle cx="240" cy="200" r="4" fill="white" opacity="0.6" />
          <text x="250" y="205" fill="white" opacity="0.5" fontSize="9" fontFamily="sans-serif">Ghatkopar</text>
          <circle cx="200" cy="280" r="4" fill="white" opacity="0.6" />
          <text x="210" y="284" fill="white" opacity="0.5" fontSize="9" fontFamily="sans-serif">Kurla</text>
          <circle cx="160" cy="340" r="4" fill="white" opacity="0.6" />
          <text x="100" y="344" fill="white" opacity="0.5" fontSize="9" fontFamily="sans-serif">Bandra</text>
          <circle cx="200" cy="400" r="4" fill="white" opacity="0.6" />
          <text x="210" y="404" fill="white" opacity="0.5" fontSize="9" fontFamily="sans-serif">Chembur</text>
          <circle cx="150" cy="450" r="4" fill="white" opacity="0.6" />
          <text x="100" y="454" fill="white" opacity="0.5" fontSize="9" fontFamily="sans-serif">Dadar</text>
          <circle cx="160" cy="560" r="4" fill="white" opacity="0.6" />
          <text x="170" y="564" fill="white" opacity="0.5" fontSize="9" fontFamily="sans-serif">Wadala</text>
        </svg>
      </div>

      {/* Legend + CTA */}
      <div className="px-4 pt-3 pb-6 bg-[#1a2332]">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-4">
          {(['western', 'central', 'harbour', 'metro-1'] as RailLine[]).map((line) => (
            <div key={line} className="flex items-center gap-1.5">
              <div className="w-5 h-[3px] rounded-full" style={{ backgroundColor: lineColors[line] }} />
              <span className="text-[11px] text-cream-light/60">{lineLabels[line]}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-[3px] rounded-full bg-marigold" />
            <span className="text-[11px] text-cream-light/60">Your route</span>
          </div>
        </div>

        <button
          onClick={() => router.push('/explore')}
          className="w-full bg-marigold text-indigo font-semibold text-[15px] py-3.5 rounded-xl active:brightness-95 transition-all"
        >
          Plan a journey on this network
        </button>
      </div>
    </div>
  );
}
