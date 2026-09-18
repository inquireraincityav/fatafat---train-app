'use client';

import { RailLine } from '@/lib/types';
import { lineColors, lineLabels } from '@/lib/tokens';

type LineFilterProps = {
  selectedLine: RailLine | 'all';
  onChange: (line: RailLine | 'all') => void;
};

const lines: (RailLine | 'all')[] = ['all', 'western', 'central', 'harbour', 'metro-1'];

export function LineFilter({ selectedLine, onChange }: LineFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar">
      {lines.map((line) => {
        const active = selectedLine === line;
        const color = line === 'all' ? '#E8A63C' : lineColors[line];
        const label = line === 'all' ? 'All lines' : lineLabels[line];
        return (
          <button
            key={line}
            onClick={() => onChange(line)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
              active
                ? 'text-white'
                : 'bg-cream-light/10 text-cream-light/70 border border-cream-light/20'
            }`}
            style={active ? { backgroundColor: color } : undefined}
          >
            {!active && line !== 'all' && (
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            )}
            {label}
          </button>
        );
      })}
    </div>
  );
}
