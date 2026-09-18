'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { ConfidenceMode, Ticket, NotificationSettings, Station } from '@/lib/types';

type AppState = {
  confidenceMode: ConfidenceMode;
  setConfidenceMode: (mode: ConfidenceMode) => void;
  hasOnboarded: boolean;
  completeOnboarding: (mode: ConfidenceMode) => void;
  tickets: Ticket[];
  addTicket: (ticket: Ticket) => void;
  recentStations: Station[];
  addRecentStation: (station: Station) => void;
  starredStations: Station[];
  toggleStarredStation: (station: Station) => void;
  notifications: NotificationSettings;
  setNotifications: (settings: NotificationSettings) => void;
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [confidenceMode, setConfidenceModeState] = useState<ConfidenceMode>('commuter');
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [recentStations, setRecentStations] = useState<Station[]>([]);
  const [starredStations, setStarredStations] = useState<Station[]>([]);
  const [notifications, setNotifications] = useState<NotificationSettings>({
    alertBeforeExit: true,
    delayNotifications: true,
    crowdLevelUpdates: false,
    lastBusAlert: true,
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('fatafat-state');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.confidenceMode) setConfidenceModeState(parsed.confidenceMode);
        if (parsed.hasOnboarded) setHasOnboarded(parsed.hasOnboarded);
        if (parsed.tickets) setTickets(parsed.tickets);
        if (parsed.recentStations) setRecentStations(parsed.recentStations);
        if (parsed.starredStations) setStarredStations(parsed.starredStations);
        if (parsed.notifications) setNotifications(parsed.notifications);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        'fatafat-state',
        JSON.stringify({
          confidenceMode,
          hasOnboarded,
          tickets,
          recentStations,
          starredStations,
          notifications,
        })
      );
    } catch {}
  }, [confidenceMode, hasOnboarded, tickets, recentStations, starredStations, notifications, hydrated]);

  const setConfidenceMode = useCallback((mode: ConfidenceMode) => {
    setConfidenceModeState(mode);
  }, []);

  const completeOnboarding = useCallback((mode: ConfidenceMode) => {
    setConfidenceModeState(mode);
    setHasOnboarded(true);
  }, []);

  const addTicket = useCallback((ticket: Ticket) => {
    setTickets((prev) => [ticket, ...prev]);
  }, []);

  const addRecentStation = useCallback((station: Station) => {
    setRecentStations((prev) => {
      const filtered = prev.filter((s) => s.id !== station.id);
      return [station, ...filtered].slice(0, 10);
    });
  }, []);

  const toggleStarredStation = useCallback((station: Station) => {
    setStarredStations((prev) => {
      const exists = prev.find((s) => s.id === station.id);
      if (exists) return prev.filter((s) => s.id !== station.id);
      return [...prev, station];
    });
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        confidenceMode,
        setConfidenceMode,
        hasOnboarded,
        completeOnboarding,
        tickets,
        addTicket,
        recentStations,
        addRecentStation,
        starredStations,
        toggleStarredStation,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
