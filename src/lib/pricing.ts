import { FareType, TicketClass } from './types';

export const fares: Record<TicketClass, Record<FareType, number>> = {
  second: {
    single: 15,
    return: 28,
    monthly: 305,
    quarterly: 870,
  },
  first: {
    single: 50,
    return: 95,
    monthly: 960,
    quarterly: 2750,
  },
};

export const fareLabels: Record<FareType, string> = {
  single: 'Single journey',
  return: 'Return',
  monthly: 'Monthly pass',
  quarterly: 'Quarterly pass',
};

export const fareSubLabels: Record<FareType, string | null> = {
  single: null,
  return: null,
  monthly: 'Breaks even at 21 trips',
  quarterly: 'Best value for daily riders',
};
