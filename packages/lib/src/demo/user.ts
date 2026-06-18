import type { LigueScore, User } from '@padeal/types';

export const DEMO_EMAIL = 'demo@padeal.app';
export const DEMO_PASSWORD = 'demo1234';

export const DEMO_USER: User = {
  id: 'demo-user-alex',
  email: DEMO_EMAIL,
  prenom: 'Alex',
  nom: 'Martin',
  age: 25,
  sexe: 'homme',
  ville: 'Paris',
  lat: 48.8566,
  lng: 2.3522,
  niveau: 4,
  fft_ranking: 'P100',
  fip_ranking: null,
  style_jeu: 'attaquant',
  main_dominante: 'droite',
  cote_prefere: 'drive',
  palmares: 'Vainqueur tournoi club Paris 15 · 2025',
  is_coach: false,
  is_premium: false,
  created_at: '2026-01-15T10:00:00.000Z',
};

export const DEMO_COUPS = ['Smash', 'Vibora', 'Bandeja', 'Contre-attaque'] as const;

export const DEMO_LIGUE_SCORE: LigueScore = {
  id: 'demo-ligue-alex',
  user_id: DEMO_USER.id,
  elo: 1285,
  wins: 15,
  losses: 7,
  rank: 'silver',
  updated_at: '2026-06-01T12:00:00.000Z',
};

export const DEMO_STATS = {
  matchs: 12,
  victoires: 15,
  elo: 1285,
} as const;

export function isDemoCredentials(email: string, password: string): boolean {
  return (
    email.trim().toLowerCase() === DEMO_EMAIL &&
    password === DEMO_PASSWORD
  );
}
