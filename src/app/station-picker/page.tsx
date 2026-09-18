'use client';

import { useState, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { searchStations } from '@/lib/stations';
import { LineBadge } from '@/components/ui/LineBadge';

function StationPickerInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { recentStations, starredStations, addRecentStation, toggleStarredStation } = useApp();
  const [query, setQuery] = useState('');

  const returnTo = searchParams.get('returnTo') || '/home';
  const field = searchParams.get('field') || 'to';

  const results = useMemo(() => searchStations(query), [query]);
  const hasQuery = query.trim().length > 0;

  function selectStation(name: string) {
    const station = results.find((s) => s.name === name) || { id: name.toLowerCase(), name, lines: [] as any[] };
    addRecentStation(station as any);
    const url = new URL(returnTo, 'http://x');
    url.searchParams.set(field, name);
    router.push(`${url.pathname}?${url.searchParams.toString()}`);
  }

  return (
    <div className="min-h-dvh bg-cream flex flex-col">
      {/* Header with back + search */}
      <div className="px-4 pt-[env(safe-area-inset-top)]">
        <div className="flex items-center gap-2 pt-3 pb-2">
          <button onClick={() => router.back()} className="p-1 -ml-1" aria-label="Go back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F3A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a station"
            autoFocus
            className="flex-1 bg-cream-light border border-[#d8cebc] rounded-xl px-4 py-2.5 text-[14px] text-charcoal placeholder:text-[#a09890] outline-none focus:border-marigold"
          />
        </div>
      </div>

      {/* Use current location */}
      {!hasQuery && (
        <button className="mx-4 mb-3 bg-cream-light border border-[#d8cebc] rounded-xl px-4 py-3 flex items-center justify-center gap-2 active:bg-[#f0e8da]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1F3A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="3" fill="#1F3A5F" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          </svg>
          <span className="text-[14px] font-medium text-indigo">Use current location</span>
        </button>
      )}

      <div className="flex-1 overflow-y-auto">
        {/* Recent stations */}
        {!hasQuery && recentStations.length > 0 && (
          <div className="mb-2">
            <p className="px-4 text-[11px] font-semibold tracking-[0.8px] text-[#a09890] uppercase mb-1">Recent</p>
            {recentStations.map((s) => (
              <button
                key={s.id}
                onClick={() => selectStation(s.name)}
                className="w-full flex items-center gap-3 px-4 py-2.5 border-b border-[#ede5d8] active:bg-[#f0e8da]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a09890" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="text-[14px] text-charcoal flex-1 text-left">{s.name}</span>
                <div className="flex gap-1">
                  {s.lines.map((l) => <LineBadge key={l} line={l} />)}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Starred stations */}
        {!hasQuery && starredStations.length > 0 && (
          <div className="mb-2">
            <p className="px-4 text-[11px] font-semibold tracking-[0.8px] text-[#a09890] uppercase mb-1">Starred</p>
            {starredStations.map((s) => (
              <button
                key={s.id}
                onClick={() => selectStation(s.name)}
                className="w-full flex items-center gap-3 px-4 py-2.5 border-b border-[#ede5d8] active:bg-[#f0e8da]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#E8A63C" stroke="#E8A63C" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span className="text-[14px] text-charcoal flex-1 text-left">{s.name}</span>
                <div className="flex gap-1">
                  {s.lines.map((l) => <LineBadge key={l} line={l} />)}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* All stations / search results */}
        <div>
          {!hasQuery && (
            <p className="px-4 text-[11px] font-semibold tracking-[0.8px] text-[#a09890] uppercase mb-1">All stations</p>
          )}
          {results.map((s) => (
            <button
              key={s.id}
              onClick={() => selectStation(s.name)}
              className="w-full flex items-center justify-between px-4 py-2.5 border-b border-[#ede5d8] active:bg-[#f0e8da]"
            >
              <span className="text-[14px] text-charcoal">{s.name}</span>
              <div className="flex gap-1">
                {s.lines.map((l) => <LineBadge key={l} line={l} />)}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function StationPickerPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-cream" />}>
      <StationPickerInner />
    </Suspense>
  );
}
