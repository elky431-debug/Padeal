-- PADEAL Database Schema
-- Enable PostGIS for geolocation
CREATE EXTENSION IF NOT EXISTS postgis;

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  nom TEXT NOT NULL DEFAULT '',
  prenom TEXT NOT NULL DEFAULT '',
  age INTEGER CHECK (age >= 16 AND age <= 99),
  sexe TEXT CHECK (sexe IN ('homme', 'femme', 'autre')),
  ville TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  location GEOGRAPHY(POINT, 4326),
  niveau INTEGER CHECK (niveau >= 1 AND niveau <= 7) DEFAULT 3,
  fft_ranking TEXT,
  fip_ranking TEXT,
  style_jeu TEXT CHECK (style_jeu IN ('attaquant', 'defenseur', 'polyvalent')),
  main_dominante TEXT CHECK (main_dominante IN ('droite', 'gauche')),
  cote_prefere TEXT CHECK (cote_prefere IN ('revers', 'drive', 'indifferent')),
  palmares TEXT,
  is_coach BOOLEAN DEFAULT FALSE,
  is_premium BOOLEAN DEFAULT FALSE,
  onboarding_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_location ON users USING GIST (location);
CREATE INDEX idx_users_niveau ON users (niveau);
CREATE INDEX idx_users_ville ON users (ville);

-- Auto-update location from lat/lng
CREATE OR REPLACE FUNCTION update_user_location()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.lat IS NOT NULL AND NEW.lng IS NOT NULL THEN
    NEW.location = ST_SetSRID(ST_MakePoint(NEW.lng, NEW.lat), 4326)::geography;
  END IF;
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_location
  BEFORE INSERT OR UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_user_location();

-- User photos
CREATE TABLE user_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_photos_user ON user_photos (user_id);

-- User coups (special shots)
CREATE TABLE user_coups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  coup TEXT NOT NULL,
  UNIQUE(user_id, coup)
);

-- Matches (swipe matching)
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_a_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  user_b_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  score NUMERIC(5,2),
  status TEXT CHECK (status IN ('pending', 'matched', 'rejected')) DEFAULT 'pending',
  user_a_action TEXT CHECK (user_a_action IN ('like', 'pass', NULL)),
  user_b_action TEXT CHECK (user_b_action IN ('like', 'pass', NULL)),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_a_id, user_b_id)
);

CREATE INDEX idx_matches_users ON matches (user_a_id, user_b_id);

-- Parties (game sessions)
CREATE TABLE parties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  titre TEXT NOT NULL,
  description TEXT,
  lieu TEXT NOT NULL,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  location GEOGRAPHY(POINT, 4326),
  date_heure TIMESTAMPTZ NOT NULL,
  niveau_min INTEGER DEFAULT 1,
  niveau_max INTEGER DEFAULT 7,
  max_joueurs INTEGER DEFAULT 4,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_parties_date ON parties (date_heure);
CREATE INDEX idx_parties_location ON parties USING GIST (location);

-- Party players
CREATE TABLE party_players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  party_id UUID NOT NULL REFERENCES parties(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'declined')) DEFAULT 'pending',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(party_id, user_id)
);

-- Conversations
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_conversation ON messages (conversation_id, created_at);

-- Ligue scores (ELO)
CREATE TABLE ligue_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  elo INTEGER DEFAULT 1000,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  rank TEXT CHECK (rank IN ('bronze', 'silver', 'gold', 'platinum', 'diamond', 'elite')) DEFAULT 'bronze',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ligue_elo ON ligue_scores (elo DESC);

-- Coaches
CREATE TABLE coaches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  bio TEXT NOT NULL DEFAULT '',
  tarif_horaire NUMERIC(6,2) NOT NULL DEFAULT 50.00,
  note NUMERIC(3,2) DEFAULT 0,
  nb_avis INTEGER DEFAULT 0,
  disponibilites JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clubs
CREATE TABLE clubs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom TEXT NOT NULL,
  adresse TEXT NOT NULL,
  ville TEXT NOT NULL,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  location GEOGRAPHY(POINT, 4326),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan TEXT CHECK (plan IN ('player_annual', 'coach_monthly')) NOT NULL,
  stripe_subscription_id TEXT,
  revenuecat_id TEXT,
  status TEXT CHECK (status IN ('active', 'cancelled', 'expired')) DEFAULT 'active',
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user ON subscriptions (user_id);

-- Enable Realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
