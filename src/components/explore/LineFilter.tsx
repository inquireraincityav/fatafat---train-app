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
    <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1">
      {lines.map((line) => {
        const isSelected = selectedLine === line;
        const color = line === 'all' ? '#E8A63C' : lineColors[line];
        return (
          <button
            key={line}
            onClick={() => onChange(line)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              isSelected
                ? 'text-white'
                : 'bg-cream-light text-charcoal border border-cream hover:bg-cream'
            }`}
            style={isSelected ? { backgroundColor: color } : undefined}
          >
            {line === 'all' ? 'All' : lineLabels[line]}
          </button>
        );
      })}
    </div>
  );
}
