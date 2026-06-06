-- Row Level Security Policies

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_coups ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE party_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ligue_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Users: read all profiles, update own
CREATE POLICY "Users are viewable by authenticated users"
  ON users FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

-- User photos
CREATE POLICY "Photos viewable by authenticated"
  ON user_photos FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users manage own photos"
  ON user_photos FOR ALL TO authenticated
  USING (auth.uid() = user_id);

-- User coups
CREATE POLICY "Coups viewable by authenticated"
  ON user_coups FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users manage own coups"
  ON user_coups FOR ALL TO authenticated
  USING (auth.uid() = user_id);

-- Matches
CREATE POLICY "Users see own matches"
  ON matches FOR SELECT TO authenticated
  USING (auth.uid() = user_a_id OR auth.uid() = user_b_id);

CREATE POLICY "Users create matches"
  ON matches FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_a_id OR auth.uid() = user_b_id);

CREATE POLICY "Users update own matches"
  ON matches FOR UPDATE TO authenticated
  USING (auth.uid() = user_a_id OR auth.uid() = user_b_id);

-- Parties: public read, creator manages
CREATE POLICY "Parties viewable by authenticated"
  ON parties FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users create parties"
  ON parties FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators update parties"
  ON parties FOR UPDATE TO authenticated
  USING (auth.uid() = creator_id);

-- Party players
CREATE POLICY "Party players viewable"
  ON party_players FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users join parties"
  ON party_players FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own party status"
  ON party_players FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

-- Conversations
CREATE POLICY "Users see own conversations"
  ON conversations FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM matches m
      WHERE m.id = conversations.match_id
      AND (m.user_a_id = auth.uid() OR m.user_b_id = auth.uid())
    )
  );

-- Messages
CREATE POLICY "Users see conversation messages"
  ON messages FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM conversations c
      JOIN matches m ON m.id = c.match_id
      WHERE c.id = messages.conversation_id
      AND (m.user_a_id = auth.uid() OR m.user_b_id = auth.uid())
    )
  );

CREATE POLICY "Users send messages"
  ON messages FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = sender_id);

-- Ligue scores: public read
CREATE POLICY "Ligue scores viewable"
  ON ligue_scores FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users update own score"
  ON ligue_scores FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own score"
  ON ligue_scores FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Coaches: public read
CREATE POLICY "Coaches viewable"
  ON coaches FOR SELECT TO authenticated USING (true);

CREATE POLICY "Coaches manage own profile"
  ON coaches FOR ALL TO authenticated
  USING (auth.uid() = user_id);

-- Clubs: public read
CREATE POLICY "Clubs viewable"
  ON clubs FOR SELECT TO authenticated USING (true);

-- Subscriptions: own only
CREATE POLICY "Users see own subscriptions"
  ON subscriptions FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users manage own subscriptions"
  ON subscriptions FOR ALL TO authenticated
  USING (auth.uid() = user_id);
