import { Departure, Ticket } from './types';
import { getStation } from './stations';

export const mockDepartures: Departure[] = [
  {
    id: '1',
    destination: getStation('churchgate')!,
    line: 'western',
    trainType: 'fast',
    platform: '2',
    minutesAway: 2,
    nextAfter: 9,
    crowdLevel: 'moderate',
  },
  {
    id: '2',
    destination: getStation('bandra')!,
    line: 'harbour',
    trainType: 'slow',
    platform: '4',
    minutesAway: 5,
    nextAfter: 17,
    crowdLevel: 'crowded',
    busConnection: '221',
  },
  {
    id: '3',
    destination: getStation('csmt')!,
    line: 'central',
    trainType: 'fast',
    platform: '5',
    minutesAway: 7,
    nextAfter: 21,
    crowdLevel: 'light',
  },
];

export const mockTickets: Ticket[] = [
  {
    id: 'ticket-1',
    from: getStation('andheri')!,
    to: getStation('churchgate')!,
    ticketClass: 'second',
    ticketType: 'single',
    price: 15,
    status: 'valid',
    purchasedAt: new Date().toISOString(),
    validUntil: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'ticket-2',
    from: getStation('andheri')!,
    to: getStation('churchgate')!,
    ticketClass: 'second',
    ticketType: 'monthly',
    price: 305,
    status: 'active',
    purchasedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    validUntil: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const ticketHistory = [
  { from: 'Andheri', to: 'Churchgate', date: 'Sep 15', type: 'Single', price: 15 },
  { from: 'Andheri', to: 'CST', date: 'Sep 14', type: 'Single', price: 20 },
  { from: 'Churchgate', to: 'Bandra', date: 'Sep 14', type: 'Single', price: 13 },
];
