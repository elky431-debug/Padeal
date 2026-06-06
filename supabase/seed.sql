-- Seed data for development (Île-de-France clubs + sample users)

INSERT INTO clubs (nom, adresse, ville, lat, lng) VALUES
  ('Padel Horizon Paris 15', '12 Rue de la Procession, 75015 Paris', 'Paris', 48.8422, 2.2994),
  ('Urban Padel Boulogne', '45 Avenue du Général Leclerc, 92100 Boulogne', 'Boulogne-Billancourt', 48.8356, 2.2417),
  ('Forest Hill Versailles', '1 Avenue de Paris, 78000 Versailles', 'Versailles', 48.8049, 2.1204),
  ('Padel 91 Massy', '8 Rue de l''Orme, 91300 Massy', 'Massy', 48.7308, 2.2714),
  ('Tennis Club de Neuilly', '3 Boulevard du Château, 92200 Neuilly', 'Neuilly-sur-Seine', 48.8847, 2.2689);

-- Function to calculate matching score
CREATE OR REPLACE FUNCTION calculate_match_score(
  p_niveau_a INTEGER,
  p_niveau_b INTEGER,
  p_distance_km NUMERIC,
  p_style_a TEXT,
  p_style_b TEXT,
  p_cote_a TEXT,
  p_cote_b TEXT
) RETURNS NUMERIC AS $$
DECLARE
  niveau_score NUMERIC;
  distance_score NUMERIC;
  style_score NUMERIC;
  cote_score NUMERIC;
BEGIN
  -- Niveau: closer levels = higher score (max 40)
  niveau_score := GREATEST(0, 40 - ABS(p_niveau_a - p_niveau_b) * 8);

  -- Distance: closer = higher (max 30), 0km=30, 50km+=0
  distance_score := GREATEST(0, 30 - (p_distance_km / 50.0 * 30));

  -- Style: complementary styles score higher
  IF p_style_a = p_style_b THEN
    style_score := 10;
  ELSIF (p_style_a = 'attaquant' AND p_style_b = 'defenseur') OR
        (p_style_a = 'defenseur' AND p_style_b = 'attaquant') THEN
    style_score := 20;
  ELSE
    style_score := 15;
  END IF;

  -- Cote: complementary preferred
  IF p_cote_a = 'indifferent' OR p_cote_b = 'indifferent' THEN
    cote_score := 10;
  ELSIF p_cote_a != p_cote_b THEN
    cote_score := 10;
  ELSE
    cote_score := 5;
  END IF;

  RETURN niveau_score + distance_score + style_score + cote_score;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to get ELO K factor based on level
CREATE OR REPLACE FUNCTION get_elo_k(p_niveau INTEGER)
RETURNS INTEGER AS $$
BEGIN
  IF p_niveau <= 3 THEN RETURN 32;
  ELSIF p_niveau <= 5 THEN RETURN 24;
  ELSE RETURN 16;
  END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to determine ligue rank from ELO
CREATE OR REPLACE FUNCTION get_ligue_rank(p_elo INTEGER)
RETURNS TEXT AS $$
BEGIN
  IF p_elo >= 2000 THEN RETURN 'elite';
  ELSIF p_elo >= 1800 THEN RETURN 'diamond';
  ELSIF p_elo >= 1600 THEN RETURN 'platinum';
  ELSIF p_elo >= 1400 THEN RETURN 'gold';
  ELSIF p_elo >= 1200 THEN RETURN 'silver';
  ELSE RETURN 'bronze';
  END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;
