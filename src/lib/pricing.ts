import { TicketClass, TicketType } from './types';

const prices: Record<TicketClass, Record<TicketType, number>> = {
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
    quarterly: 2730,
  },
};

export function getPrice(ticketClass: TicketClass, ticketType: TicketType): number {
  return prices[ticketClass][ticketType];
}

export const ticketTypeLabels: Record<TicketType, { label: string; description: string }> = {
  single: { label: 'Single journey', description: 'One way, valid same day' },
  return: { label: 'Return', description: 'Both ways, same day' },
  monthly: { label: 'Monthly pass', description: 'Breaks even at 21 trips' },
  quarterly: { label: 'Quarterly pass', description: 'Best value for regulars' },
};

export const ticketTypeLabelsFirstClass: Record<TicketType, { label: string; description: string }> = {
  single: { label: 'Single journey', description: 'One way, first class' },
  return: { label: 'Return', description: 'Both ways, same day' },
  monthly: { label: 'Monthly pass', description: 'Breaks even at 20 trips' },
  quarterly: { label: 'Quarterly pass', description: '3-month first class' },
};

export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
