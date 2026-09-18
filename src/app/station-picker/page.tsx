'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { stations, searchStations } from '@/lib/stations';
import { Station, RailLine } from '@/lib/types';
import { lineColors, lineAbbreviations } from '@/lib/tokens';

function LineBadge({ line }: { line: RailLine }) {
  return (
    <span
      className="inline-flex items-center justify-center w-5 h-5 rounded text-[10px] font-bold text-white"
      style={{ backgroundColor: lineColors[line] }}
    >
      {lineAbbreviations[line]}
    </span>
  );
}

function StationPickerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { recentStations, starredStations, addRecentStation, toggleStarredStation } = useApp();
  const [query, setQuery] = useState('');

  const returnTo = searchParams.get('returnTo') || '/home';
  const field = searchParams.get('field') || 'to';

  const results = query.length > 0 ? searchStations(query) : [];
  const isSearching = query.length > 0;

  const handleSelect = (station: Station) => {
    addRecentStation(station);
    router.push(`${returnTo}?${field}=${station.name}`);
  };

  const isStarred = (station: Station) => starredStations.some((s) => s.id === station.id);

  const renderStationRow = (station: Station) => (
    <button
      key={station.id}
      onClick={() => handleSelect(station)}
      className="w-full flex items-center justify-between py-3 px-1 border-b border-cream last:border-0 text-left hover:bg-cream/50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {station.lines.map((line) => (
            <LineBadge key={line} line={line} />
          ))}
        </div>
        <span className="font-medium text-charcoal">{station.name}</span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleStarredStation(station);
        }}
        className="p-1"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={isStarred(station) ? '#E8A63C' : 'none'}
          stroke={isStarred(station) ? '#E8A63C' : '#6B6860'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </button>
    </button>
  );

  return (
    <div className="min-h-dvh bg-cream flex flex-col">
      <header className="px-4 pt-12 pb-3">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => router.back()} className="p-1 -ml-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1F3A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <h1 className="font-serif text-xl font-bold text-indigo">
            {field === 'from' ? 'Starting station' : 'Destination station'}
          </h1>
        </div>

        <div className="relative">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6B6860"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3.5 top-1/2 -translate-y-1/2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stations"
            className="w-full bg-cream-light border border-cream rounded-xl pl-10 pr-4 py-3 text-charcoal placeholder:text-charcoal-light focus:outline-none focus:border-marigold transition-colors"
            autoFocus
          />
        </div>
      </header>

      <div className="flex-1 px-4 overflow-y-auto">
        {isSearching ? (
          <div>
            <h2 className="text-xs font-semibold tracking-wider text-charcoal-light uppercase mb-2">
              Results
            </h2>
            {results.length > 0 ? (
              results.map(renderStationRow)
            ) : (
              <p className="text-sm text-charcoal-light py-4">No stations found</p>
            )}
          </div>
        ) : (
          <>
            {starredStations.length > 0 && (
              <div className="mb-4">
                <h2 className="text-xs font-semibold tracking-wider text-charcoal-light uppercase mb-2">
                  Starred
                </h2>
                {starredStations.map(renderStationRow)}
              </div>
            )}

            {recentStations.length > 0 && (
              <div className="mb-4">
                <h2 className="text-xs font-semibold tracking-wider text-charcoal-light uppercase mb-2">
                  Recent
                </h2>
                {recentStations.map(renderStationRow)}
              </div>
            )}

            <div>
              <h2 className="text-xs font-semibold tracking-wider text-charcoal-light uppercase mb-2">
                All stations
              </h2>
              {stations.slice(0, 20).map(renderStationRow)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function StationPickerPage() {
  return (
    <Suspense>
      <StationPickerContent />
    </Suspense>
  );
}
