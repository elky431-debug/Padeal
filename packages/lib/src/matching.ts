import { matchingWeights, elo } from '@padeal/config/tokens';
import type { StyleJeu, CotePrefere, LigueRank } from '@padeal/types';

export interface MatchCandidate {
  niveau: number;
  lat: number;
  lng: number;
  style_jeu: StyleJeu | null;
  cote_prefere: CotePrefere | null;
}

/** Haversine distance in km */
export function getDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function niveauScore(a: number, b: number): number {
  return Math.max(0, 100 - Math.abs(a - b) * 15);
}

function distanceScore(km: number): number {
  return Math.max(0, 100 - (km / 50) * 100);
}

function styleScore(a: StyleJeu | null, b: StyleJeu | null): number {
  if (!a || !b) return 50;
  if (a === b) return 50;
  if (
    (a === 'attaquant' && b === 'defenseur') ||
    (a === 'defenseur' && b === 'attaquant')
  )
    return 100;
  return 75;
}

function coteScore(a: CotePrefere | null, b: CotePrefere | null): number {
  if (!a || !b) return 50;
  if (a === 'indifferent' || b === 'indifferent') return 100;
  if (a !== b) return 100;
  return 50;
}

/** Matching algorithm: niveau×40% + distance×30% + style×20% + côté×10% */
export function calculateMatchScore(
  user: MatchCandidate,
  candidate: MatchCandidate
): number {
  const dist = getDistanceKm(user.lat, user.lng, candidate.lat, candidate.lng);

  const score =
    niveauScore(user.niveau, candidate.niveau) * matchingWeights.niveau +
    distanceScore(dist) * matchingWeights.distance +
    styleScore(user.style_jeu, candidate.style_jeu) * matchingWeights.style +
    coteScore(user.cote_prefere, candidate.cote_prefere) * matchingWeights.cote;

  return Math.round(score * 100) / 100;
}

export function getEloK(niveau: number): number {
  if (niveau <= 3) return elo.kLow;
  if (niveau <= 5) return elo.kMid;
  return elo.kHigh;
}

export function calculateEloChange(
  playerElo: number,
  opponentElo: number,
  won: boolean,
  niveau: number
): number {
  const K = getEloK(niveau);
  const expected = 1 / (1 + Math.pow(10, (opponentElo - playerElo) / 400));
  const actual = won ? 1 : 0;
  return Math.round(K * (actual - expected));
}

export function getLigueRank(eloRating: number): LigueRank {
  if (eloRating >= 2000) return 'elite';
  if (eloRating >= 1800) return 'diamond';
  if (eloRating >= 1600) return 'platinum';
  if (eloRating >= 1400) return 'gold';
  if (eloRating >= 1200) return 'silver';
  return 'bronze';
}

export const RANK_LABELS: Record<LigueRank, string> = {
  bronze: 'Bronze',
  silver: 'Silver',
  gold: 'Gold',
  platinum: 'Platinum',
  diamond: 'Diamond',
  elite: 'Elite',
};
