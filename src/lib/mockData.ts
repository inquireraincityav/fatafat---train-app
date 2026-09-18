import { Departure, SavedRoute, Ticket, BusConnection } from './types';

export const mockDepartures: Departure[] = [
  {
    id: '1',
    line: 'western',
    origin: 'Andheri',
    destination: 'Churchgate',
    speed: 'fast',
    platform: 2,
    crowd: 'moderate',
    minutesAway: 2,
    totalMinutes: 9,
  },
  {
    id: '2',
    line: 'harbour',
    origin: 'Andheri',
    destination: 'Bandra',
    speed: 'slow',
    platform: 4,
    crowd: 'crowded',
    minutesAway: 5,
    totalMinutes: 17,
    busConnection: 'BEST 221',
  },
  {
    id: '3',
    line: 'central',
    origin: 'Dadar',
    destination: 'CSMT',
    speed: 'fast',
    platform: 5,
    crowd: 'light',
    minutesAway: 7,
    totalMinutes: 21,
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
];

export const mockBusConnections: BusConnection[] = [
  { route: 'BEST 221', stop: 'Bandra', waitMinutes: 4 },
  { route: 'BEST 220', stop: 'Bandra', waitMinutes: 2 },
];
