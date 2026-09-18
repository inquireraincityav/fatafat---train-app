export type ConfidenceMode = 'new-rider' | 'commuter';

export type RailLine = 'western' | 'central' | 'harbour' | 'metro-1';

export type Station = {
  id: string;
  name: string;
  lines: RailLine[];
  coordinates: [number, number];
};

export type CrowdLevel = 'light' | 'moderate' | 'crowded';

export type Departure = {
  id: string;
  destination: Station;
  line: RailLine;
  trainType: 'fast' | 'slow';
  platform: string;
  minutesAway: number;
  nextAfter: number;
  crowdLevel: CrowdLevel;
  busConnection?: string;
};

export type TicketClass = 'second' | 'first';
export type TicketType = 'single' | 'return' | 'monthly' | 'quarterly';
export type TicketStatus = 'valid' | 'active' | 'expired' | 'used';

export type Ticket = {
  id: string;
  from: Station;
  to: Station;
  ticketClass: TicketClass;
  ticketType: TicketType;
  price: number;
  status: TicketStatus;
  purchasedAt: string;
  validUntil: string;
};

export type PaymentMethod = 'google-pay' | 'apple-pay' | 'card';

export type NotificationSettings = {
  alertBeforeExit: boolean;
  delayNotifications: boolean;
  crowdLevelUpdates: boolean;
  lastBusAlert: boolean;
};

export type BasicsTopic = 'fast-vs-slow' | 'compartments' | 'fares';
