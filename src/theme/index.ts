export const colors = {
  // Voice states
  voiceIdle: '#3A3A3A',
  voiceListening: '#5EA1F4',
  voiceThinking: '#8AA7FF',
  voiceSpeaking: '#4CC9F0',

  // Background
  background: '#000000',
  surface: '#1A1A1A',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#CCCCCC',

  // Actions
  actionPrimary: '#FFFFFF',
  actionHover: '#F0F0F0',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radii = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  full: 9999,
};

export const elevations = {
  none: 0,
  sm: 2,
  md: 4,
  lg: 8,
  xl: 16,
};

export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const theme = {
  colors,
  spacing,
  radii,
  elevations,
  typography,
};

export type Theme = typeof theme;

