-- ============================================
-- DESIGNERS SYSTEM - COMPLETE SCHEMA
-- ============================================
-- Created: 2026-06-18
-- Tables: designers, designer_collections, designer_education,
--         designer_achievements, designer_skills, designer_certifications,
--         designer_social_links
-- ============================================

-- ============================================
-- 1. DESIGNERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS designers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  location TEXT,
  nationality TEXT,
  languages TEXT,
  experience TEXT,
  specialization TEXT,
  category TEXT,
  gender TEXT,
  bio TEXT,
  short_bio TEXT,
  philosophy TEXT,
  image_url TEXT,
  cover_image_url TEXT,
  availability TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for designers
CREATE INDEX IF NOT EXISTS idx_designers_slug ON designers(slug);
CREATE INDEX IF NOT EXISTS idx_designers_category ON designers(category);
CREATE INDEX IF NOT EXISTS idx_designers_active_featured ON designers(is_active, is_featured);

-- ============================================
-- 2. DESIGNER COLLECTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS designer_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  designer_id UUID NOT NULL REFERENCES designers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  season TEXT,
  description TEXT,
  inspiration TEXT,
  looks INTEGER,
  cover_image_url TEXT,
  images TEXT[],
  is_latest BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for collections
CREATE INDEX IF NOT EXISTS idx_collections_designer_id ON designer_collections(designer_id);
CREATE INDEX IF NOT EXISTS idx_collections_is_latest ON designer_collections(is_latest);

-- ============================================
-- 3. DESIGNER EDUCATION TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS designer_education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  designer_id UUID NOT NULL REFERENCES designers(id) ON DELETE CASCADE,
  institution TEXT NOT NULL,
  degree TEXT,
  year TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_education_designer_id ON designer_education(designer_id);

-- ============================================
-- 4. DESIGNER ACHIEVEMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS designer_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  designer_id UUID NOT NULL REFERENCES designers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  detail TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_achievements_designer_id ON designer_achievements(designer_id);

-- ============================================
-- 5. DESIGNER SKILLS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS designer_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  designer_id UUID NOT NULL REFERENCES designers(id) ON DELETE CASCADE,
  skill TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_skills_designer_id ON designer_skills(designer_id);

-- ============================================
-- 6. DESIGNER CERTIFICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS designer_certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  designer_id UUID NOT NULL REFERENCES designers(id) ON DELETE CASCADE,
  certification TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_certifications_designer_id ON designer_certifications(designer_id);

-- ============================================
-- 7. DESIGNER SOCIAL LINKS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS designer_social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  designer_id UUID UNIQUE NOT NULL REFERENCES designers(id) ON DELETE CASCADE,
  instagram TEXT,
  facebook TEXT,
  tiktok TEXT,
  pinterest TEXT,
  linkedin TEXT,
  behance TEXT,
  email TEXT,
  website TEXT,
  shop TEXT,
  portfolio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_social_designer_id ON designer_social_links(designer_id);

-- ============================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to designers table
DROP TRIGGER IF EXISTS designers_updated_at ON designers;
CREATE TRIGGER designers_updated_at
  BEFORE UPDATE ON designers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE designers ENABLE ROW LEVEL SECURITY;
ALTER TABLE designer_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE designer_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE designer_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE designer_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE designer_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE designer_social_links ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES - PUBLIC READ ACCESS
-- ============================================

-- Designers: Public can read active designers
CREATE POLICY "designers_select_public" ON designers
  FOR SELECT
  USING (is_active = TRUE);

-- Collections: Public can read collections for active designers
CREATE POLICY "collections_select_public" ON designer_collections
  FOR SELECT
  USING (
    designer_id IN (SELECT id FROM designers WHERE is_active = TRUE)
  );

-- Education: Public can read education for active designers
CREATE POLICY "education_select_public" ON designer_education
  FOR SELECT
  USING (
    designer_id IN (SELECT id FROM designers WHERE is_active = TRUE)
  );

-- Achievements: Public can read achievements for active designers
CREATE POLICY "achievements_select_public" ON designer_achievements
  FOR SELECT
  USING (
    designer_id IN (SELECT id FROM designers WHERE is_active = TRUE)
  );

-- Skills: Public can read skills for active designers
CREATE POLICY "skills_select_public" ON designer_skills
  FOR SELECT
  USING (
    designer_id IN (SELECT id FROM designers WHERE is_active = TRUE)
  );

-- Certifications: Public can read certifications for active designers
CREATE POLICY "certifications_select_public" ON designer_certifications
  FOR SELECT
  USING (
    designer_id IN (SELECT id FROM designers WHERE is_active = TRUE)
  );

-- Social Links: Public can read social links for active designers
CREATE POLICY "social_links_select_public" ON designer_social_links
  FOR SELECT
  USING (
    designer_id IN (SELECT id FROM designers WHERE is_active = TRUE)
  );

-- ============================================
-- RLS POLICIES - ADMIN WRITE ACCESS
-- ============================================
-- Note: Admin write policies require authentication
-- These will be configured when Supabase Auth is set up
-- For now, we create placeholder policies for service role

-- Designers: Full access for authenticated admins
CREATE POLICY "designers_all_admin" ON designers
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Collections: Full access for authenticated admins
CREATE POLICY "collections_all_admin" ON designer_collections
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Education: Full access for authenticated admins
CREATE POLICY "education_all_admin" ON designer_education
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Achievements: Full access for authenticated admins
CREATE POLICY "achievements_all_admin" ON designer_achievements
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Skills: Full access for authenticated admins
CREATE POLICY "skills_all_admin" ON designer_skills
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Certifications: Full access for authenticated admins
CREATE POLICY "certifications_all_admin" ON designer_certifications
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Social Links: Full access for authenticated admins
CREATE POLICY "social_links_all_admin" ON designer_social_links
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================
COMMENT ON TABLE designers IS 'Main designer profiles with all core information';
COMMENT ON TABLE designer_collections IS 'Fashion collections by designers';
COMMENT ON TABLE designer_education IS 'Educational background of designers';
COMMENT ON TABLE designer_achievements IS 'Awards and achievements of designers';
COMMENT ON TABLE designer_skills IS 'Skills and expertise of designers';
COMMENT ON TABLE designer_certifications IS 'Professional certifications of designers';
COMMENT ON TABLE designer_social_links IS 'Social media and contact links for designers';
