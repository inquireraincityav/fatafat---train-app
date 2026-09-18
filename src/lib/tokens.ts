export const colors = {
  marigold: '#E8A63C',
  indigo: '#1F3A5F',
  rust: '#C1502E',
  cream: '#F4EDE0',
  'cream-light': '#FBF7EF',
  charcoal: '#3D3A34',
  'charcoal-light': '#6B6860',
  success: '#2D8F5E',
  'info-light': '#5EC4D4',
  white: '#FFFFFF',
} as const;

export const lineColors = {
  western: '#3B82F6',
  central: '#EF4444',
  harbour: '#22C55E',
  'metro-1': '#8B5CF6',
  route: '#E8A63C',
} as const;

export const crowdColors = {
  light: '#5EC4D4',
  moderate: '#E8A63C',
  crowded: '#C1502E',
} as const;

export const lineLabels: Record<string, string> = {
  western: 'Western',
  central: 'Central',
  harbour: 'Harbour',
  'metro-1': 'Metro 1',
};

export const lineAbbreviations: Record<string, string> = {
  western: 'W',
  central: 'C',
  harbour: 'H',
  'metro-1': 'M',
};
