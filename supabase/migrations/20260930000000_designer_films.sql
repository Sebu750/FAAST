-- ============================================
-- DESIGNER FILMS TABLE
-- ============================================
-- YouTube video embeds for designer collection
-- films, lookbooks, and behind-the-scenes content.
-- ============================================

CREATE TABLE IF NOT EXISTS designer_films (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  designer_id TEXT NOT NULL REFERENCES designers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  youtube_url TEXT NOT NULL,
  thumbnail_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_films_designer_id ON designer_films(designer_id);
CREATE INDEX IF NOT EXISTS idx_films_display_order ON designer_films(display_order);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE designer_films ENABLE ROW LEVEL SECURITY;

-- Public can read films for active designers
CREATE POLICY "films_select_public" ON designer_films
  FOR SELECT
  USING (
    designer_id IN (SELECT id FROM designers WHERE is_active = TRUE)
  );

-- Authenticated admins have full access
CREATE POLICY "films_all_admin" ON designer_films
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Admin DELETE policy (required for saveRelatedData delete-and-reinsert pattern)
CREATE POLICY "films_delete_admin" ON designer_films
  FOR DELETE
  USING (auth.role() = 'authenticated');

COMMENT ON TABLE designer_films IS 'YouTube video embed for designer collections and films';
