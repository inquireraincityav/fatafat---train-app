export type ConfidenceMode = 'commuter' | 'new-rider';

export type RailLine = 'western' | 'central' | 'harbour' | 'metro-1';

export type CrowdLevel = 'light' | 'moderate' | 'crowded';

export type TrainSpeed = 'fast' | 'slow';

export type TicketClass = 'second' | 'first';

export type FareType = 'single' | 'return' | 'monthly' | 'quarterly';

export type PaymentMethod = 'google-pay' | 'apple-pay' | 'card';

export type Station = {
  id: string;
  name: string;
  lines: RailLine[];
};

export type Departure = {
  id: string;
  line: RailLine;
  origin: string;
  destination: string;
  speed: TrainSpeed;
  platform: number;
  crowd: CrowdLevel;
  minutesAway: number;
  totalMinutes: number;
  busConnection?: string;
};

export type SavedRoute = {
  id: string;
  from: string;
  to: string;
  line: RailLine;
};

export type Ticket = {
  id: string;
  from: string;
  to: string;
  fareType: FareType;
  ticketClass: TicketClass;
  price: number;
  purchasedAt: string;
  expiresAt?: string;
  isActive: boolean;
};

export type BusConnection = {
  route: string;
  stop: string;
  waitMinutes: number;
};
