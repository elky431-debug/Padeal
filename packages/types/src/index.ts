export type Sexe = 'homme' | 'femme' | 'autre';
export type StyleJeu = 'attaquant' | 'defenseur' | 'polyvalent';
export type MainDominante = 'droite' | 'gauche';
export type CotePrefere = 'revers' | 'drive' | 'indifferent';
export type LigueRank = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'elite';

export interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  age: number;
  sexe: Sexe;
  ville: string;
  lat: number | null;
  lng: number | null;
  niveau: number;
  fft_ranking: string | null;
  fip_ranking: string | null;
  style_jeu: StyleJeu | null;
  main_dominante: MainDominante | null;
  cote_prefere: CotePrefere | null;
  palmares: string | null;
  is_coach: boolean;
  is_premium: boolean;
  created_at: string;
}

export interface UserPhoto {
  id: string;
  user_id: string;
  url: string;
  position: number;
  created_at: string;
}

export interface UserCoup {
  id: string;
  user_id: string;
  coup: string;
}

export interface Match {
  id: string;
  user_a_id: string;
  user_b_id: string;
  score: number;
  status: 'pending' | 'matched' | 'rejected';
  created_at: string;
}

export interface Party {
  id: string;
  creator_id: string;
  titre: string;
  description: string | null;
  lieu: string;
  lat: number | null;
  lng: number | null;
  date_heure: string;
  niveau_min: number;
  niveau_max: number;
  max_joueurs: number;
  created_at: string;
}

export interface PartyPlayer {
  id: string;
  party_id: string;
  user_id: string;
  status: 'pending' | 'confirmed' | 'declined';
  joined_at: string;
}

export interface Conversation {
  id: string;
  match_id: string;
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  read_at: string | null;
  created_at: string;
}

export interface LigueScore {
  id: string;
  user_id: string;
  elo: number;
  wins: number;
  losses: number;
  rank: LigueRank;
  updated_at: string;
}

export interface Coach {
  id: string;
  user_id: string;
  bio: string;
  tarif_horaire: number;
  note: number;
  nb_avis: number;
  disponibilites: string | null;
  created_at: string;
}

export interface Club {
  id: string;
  nom: string;
  adresse: string;
  ville: string;
  lat: number | null;
  lng: number | null;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: 'player_annual' | 'coach_monthly';
  stripe_subscription_id: string | null;
  revenuecat_id: string | null;
  status: 'active' | 'cancelled' | 'expired';
  expires_at: string | null;
  created_at: string;
}

export interface OnboardingData {
  prenom: string;
  nom: string;
  age: number;
  sexe: Sexe;
  ville: string;
  niveau: number;
  fft_ranking?: string;
  fip_ranking?: string;
  style_jeu: StyleJeu;
  main_dominante: MainDominante;
  cote_prefere: CotePrefere;
  coups: string[];
  photos: string[];
  palmares?: string;
}

export const COUPS_GENIE = [
  'Vibora',
  'Bandeja',
  'Smash',
  'Lob',
  'Volée',
  'Contre-attaque',
  'Défense mur',
  'Chiquita',
  'Bajada',
  'Globo',
] as const;

export const NIVEAUX = [1, 2, 3, 4, 5, 6, 7] as const;
