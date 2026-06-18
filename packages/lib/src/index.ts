export {
  calculateMatchScore,
  calculateEloChange,
  getDistanceKm,
  getEloK,
  getLigueRank,
  RANK_LABELS,
} from './matching';
export type { MatchCandidate } from './matching';
export { createBrowserClient, createMobileClient } from './supabase';
export type { SupabaseClient } from './supabase';
export {
  DEMO_COUPS,
  DEMO_EMAIL,
  DEMO_LIGUE_SCORE,
  DEMO_PASSWORD,
  DEMO_STATS,
  DEMO_USER,
  isDemoCredentials,
} from './demo';
