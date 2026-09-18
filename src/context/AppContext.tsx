'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { ConfidenceMode, Station, Ticket } from '@/lib/types';
import { mockTickets } from '@/lib/mockData';

type AppState = {
  confidenceMode: ConfidenceMode;
  setConfidenceMode: (mode: ConfidenceMode) => void;
  hasOnboarded: boolean;
  setHasOnboarded: (v: boolean) => void;
  homeStation: Station | null;
  setHomeStation: (s: Station | null) => void;
  recentStations: Station[];
  addRecentStation: (s: Station) => void;
  starredStations: Station[];
  toggleStarredStation: (s: Station) => void;
  tickets: Ticket[];
  addTicket: (t: Ticket) => void;
  hydrated: boolean;
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [confidenceMode, setConfidenceModeRaw] = useState<ConfidenceMode>('new-rider');
  const [hasOnboarded, setHasOnboardedRaw] = useState(false);
  const [homeStation, setHomeStationRaw] = useState<Station | null>(null);
  const [recentStations, setRecentStations] = useState<Station[]>([]);
  const [starredStations, setStarredStations] = useState<Station[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('fatafat-state');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.confidenceMode) setConfidenceModeRaw(parsed.confidenceMode);
        if (parsed.hasOnboarded) setHasOnboardedRaw(true);
        if (parsed.homeStation) setHomeStationRaw(parsed.homeStation);
        if (parsed.recentStations) setRecentStations(parsed.recentStations);
        if (parsed.starredStations) setStarredStations(parsed.starredStations);
        if (parsed.tickets) setTickets(parsed.tickets);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        'fatafat-state',
        JSON.stringify({ confidenceMode, hasOnboarded, homeStation, recentStations, starredStations, tickets })
      );
    } catch {}
  }, [hydrated, confidenceMode, hasOnboarded, homeStation, recentStations, starredStations, tickets]);

  const setConfidenceMode = useCallback((mode: ConfidenceMode) => setConfidenceModeRaw(mode), []);
  const setHasOnboarded = useCallback((v: boolean) => setHasOnboardedRaw(v), []);
  const setHomeStation = useCallback((s: Station | null) => setHomeStationRaw(s), []);

  const addRecentStation = useCallback((s: Station) => {
    setRecentStations((prev) => {
      const filtered = prev.filter((p) => p.id !== s.id);
      return [s, ...filtered].slice(0, 5);
    });
  }, []);

  const toggleStarredStation = useCallback((s: Station) => {
    setStarredStations((prev) => {
      const exists = prev.find((p) => p.id === s.id);
      return exists ? prev.filter((p) => p.id !== s.id) : [...prev, s];
    });
  }, []);

  const addTicket = useCallback((t: Ticket) => {
    setTickets((prev) => [t, ...prev]);
  }, []);

  return (
    <AppContext.Provider
      value={{
        confidenceMode,
        setConfidenceMode,
        hasOnboarded,
        setHasOnboarded,
        homeStation,
        setHomeStation,
        recentStations,
        addRecentStation,
        starredStations,
        toggleStarredStation,
        tickets,
        addTicket,
        hydrated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
