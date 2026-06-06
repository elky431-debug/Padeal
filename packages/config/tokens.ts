/** PADEAL Design Tokens — Blanc + Vert + Noir */

export const colors = {
  white: '#FFFFFF',
  surface: '#F5F9F5',
  border: '#C0DD97',
  greenLight: '#EAF3DE',
  greenMid: '#639922',
  greenDark: '#3B6D11',
  greenDeep: '#27500A',
  black: '#111111',
  gray: '#555555',
  grayLight: '#EEEEEE',
  danger: '#D32F2F',
  gold: '#F9A825',
} as const;

export const typography = {
  hero: {
    fontFamily: 'Boldonse',
    fontSize: 64,
    lineHeight: 1.0,
    letterSpacing: -1.5,
  },
  h1: {
    fontFamily: 'Boldonse',
    fontSize: 40,
    lineHeight: 1.05,
    letterSpacing: -0.8,
  },
  h2: {
    fontFamily: 'Boldonse',
    fontSize: 28,
    lineHeight: 1.1,
    letterSpacing: -0.5,
  },
  h3: {
    fontFamily: 'Boldonse',
    fontSize: 20,
    lineHeight: 1.15,
    letterSpacing: 0,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontWeight: 600,
    fontSize: 16,
  },
  body: {
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: 15,
    lineHeight: 1.6,
  },
  small: {
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: 13,
  },
  mono: {
    fontFamily: 'JetBrains Mono',
    fontSize: 14,
  },
} as const;

export const radii = {
  card: 16,
  input: 12,
  swipe: 20,
  pill: 999,
  toast: 12,
} as const;

export const spacing = {
  touchMin: 44,
  buttonPaddingY: 14,
  buttonPaddingX: 28,
  cardPadding: 20,
} as const;

export const pricing = {
  playerAnnual: 14.99,
  coachMonthly: 29.99,
} as const;

export const elo = {
  kLow: 32,
  kMid: 24,
  kHigh: 16,
} as const;

export const matchingWeights = {
  niveau: 0.4,
  distance: 0.3,
  style: 0.2,
  cote: 0.1,
} as const;
