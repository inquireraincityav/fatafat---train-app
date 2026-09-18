import { RailLine, CrowdLevel } from './types';

export const lineColors: Record<RailLine, string> = {
  western: '#1B3A6B',
  central: '#C0392B',
  harbour: '#27AE60',
  'metro-1': '#8B5CF6',
};

export const lineLabels: Record<RailLine, string> = {
  western: 'Western',
  central: 'Central',
  harbour: 'Harbour',
  'metro-1': 'Metro Line 1',
};

export const crowdColors: Record<CrowdLevel, { bg: string; text: string }> = {
  light: { bg: '#d4f4f2', text: '#1a7a76' },
  moderate: { bg: '#fdf0d5', text: '#9a6a10' },
  crowded: { bg: '#fbddd7', text: '#8b2a1a' },
};
