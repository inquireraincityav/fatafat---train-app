import { Departure, SavedRoute, Ticket, BusConnection } from './types';

export const mockDepartures: Departure[] = [
  {
    id: '1',
    time: '8:12',
    speed: 'slow',
    platform: 4,
    crowd: 'crowded',
    destination: 'Churchgate',
    minutesAway: 3,
  },
  {
    id: '2',
    time: '8:16',
    speed: 'fast',
    platform: 2,
    crowd: 'moderate',
    destination: 'Churchgate',
    minutesAway: 7,
  },
  {
    id: '3',
    time: '8:24',
    speed: 'slow',
    platform: 4,
    crowd: 'light',
    destination: 'Churchgate',
    minutesAway: 15,
  },
  {
    id: '4',
    time: '8:29',
    speed: 'fast',
    platform: 2,
    crowd: 'crowded',
    destination: 'Churchgate',
    minutesAway: 20,
  },
];

export const mockSavedRoutes: SavedRoute[] = [
  { id: '1', from: 'Andheri', to: 'Churchgate', line: 'western' },
  { id: '2', from: 'Bandra', to: 'BKC', line: 'western' },
];

export const mockTickets: Ticket[] = [
  {
    id: 'tkt-1',
    from: 'Andheri',
    to: 'Churchgate',
    fareType: 'single',
    ticketClass: 'second',
    price: 15,
    purchasedAt: '2026-09-18T08:00:00Z',
    isActive: true,
  },
  {
    id: 'tkt-2',
    from: 'Andheri',
    to: 'Churchgate',
    fareType: 'monthly',
    ticketClass: 'second',
    price: 305,
    purchasedAt: '2026-09-01T08:00:00Z',
    expiresAt: '2026-10-01T08:00:00Z',
    isActive: true,
  },
  {
    id: 'tkt-3',
    from: 'Dadar',
    to: 'CSMT',
    fareType: 'single',
    ticketClass: 'first',
    price: 50,
    purchasedAt: '2026-09-15T10:00:00Z',
    isActive: false,
  },
];

export const mockBusConnections: BusConnection[] = [
  { route: 'BEST 221', stop: 'Bandra', waitMinutes: 4 },
  { route: 'BEST 220', stop: 'Bandra', waitMinutes: 2 },
];
