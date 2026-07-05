-- ============================================
-- DESIGNER OPPORTUNITIES SYSTEM
-- Replaces designer_events with expanded functionality
-- Supports: Jobs, Internships, Competitions, Grants, Open Calls, Fashion Events
-- ============================================

-- Main opportunities table
CREATE TABLE IF NOT EXISTS opportunities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  
  -- Opportunity type
  opportunity_type TEXT NOT NULL DEFAULT 'fashion_event',
  -- job, internship, competition, grant, open_call, fashion_event
  
  -- Dates
  start_date DATE,
  end_date DATE,
  application_deadline DATE,
  
  -- Location (for physical opportunities)
  location TEXT,
  city TEXT,
  is_remote BOOLEAN DEFAULT FALSE,
  
  -- Media
  cover_image_url TEXT,
  banner_image_url TEXT,
  
  -- Status & visibility
  status TEXT DEFAULT 'draft',
  -- draft, published, archived, expired
  
  -- Application settings
  is_open_for_applications BOOLEAN DEFAULT TRUE,
  application_method TEXT DEFAULT 'internal',
  -- internal (apply on platform), external (redirect to URL)
  external_application_url TEXT,
  max_applications INTEGER,
  
  -- Job/Internship specific
  salary_range TEXT,
  employment_type TEXT,
  -- full_time, part_time, contract, freelance, internship
  experience_level TEXT,
  -- entry, mid, senior, executive
  
  -- Competition/Grant specific
  prize_amount TEXT,
  eligibility TEXT,
  requirements TEXT,
  benefits TEXT,
  
  -- Fashion Event specific
  event_format TEXT,
  -- in_person, virtual, hybrid
  max_participants INTEGER,
  
  -- Metadata
  tags TEXT[],
  category TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  
  -- Stats
  views_count INTEGER DEFAULT 0,
  applications_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Applications table
CREATE TABLE IF NOT EXISTS opportunity_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  opportunity_id UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
  designer_id TEXT NOT NULL REFERENCES designers(id) ON DELETE CASCADE,
  
  -- Application content
  cover_letter TEXT,
  portfolio_url TEXT,
  application_data JSONB,
  
  -- Status
  status TEXT DEFAULT 'submitted',
  -- submitted, under_review, shortlisted, rejected, withdrawn
  
  -- Admin notes
  admin_notes TEXT,
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(opportunity_id, designer_id)
);

-- Saved opportunities table
CREATE TABLE IF NOT EXISTS saved_opportunities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  opportunity_id UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
  designer_id TEXT NOT NULL REFERENCES designers(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(opportunity_id, designer_id)
);

-- Opportunity categories table
CREATE TABLE IF NOT EXISTS opportunity_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_opportunities_type ON opportunities(opportunity_type);
CREATE INDEX IF NOT EXISTS idx_opportunities_status ON opportunities(status);
CREATE INDEX IF NOT EXISTS idx_opportunities_deadline ON opportunities(application_deadline);
CREATE INDEX IF NOT EXISTS idx_opportunities_city ON opportunities(city);
CREATE INDEX IF NOT EXISTS idx_opportunities_featured ON opportunities(is_featured);
CREATE INDEX IF NOT EXISTS idx_applications_opportunity ON opportunity_applications(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_applications_designer ON opportunity_applications(designer_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON opportunity_applications(status);
CREATE INDEX IF NOT EXISTS idx_saved_opportunities_designer ON saved_opportunities(designer_id);

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_opportunities_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER opportunities_updated_at BEFORE UPDATE ON opportunities
  FOR EACH ROW EXECUTE FUNCTION update_opportunities_updated_at();

CREATE TRIGGER opportunity_applications_updated_at BEFORE UPDATE ON opportunity_applications
  FOR EACH ROW EXECUTE FUNCTION update_opportunities_updated_at();

-- Enable RLS
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunity_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunity_categories ENABLE ROW LEVEL SECURITY;

-- Public read for published opportunities
CREATE POLICY "opportunities_select_public" ON opportunities
  FOR SELECT TO anon, authenticated
  USING (status = 'published' OR auth.uid() IS NOT NULL);

-- Admin can manage opportunities
CREATE POLICY "opportunities_insert_admin" ON opportunities
  FOR INSERT TO authenticated
  WITH CHECK (TRUE);

CREATE POLICY "opportunities_update_admin" ON opportunities
  FOR UPDATE TO authenticated
  USING (TRUE);

CREATE POLICY "opportunities_delete_admin" ON opportunities
  FOR DELETE TO authenticated
  USING (TRUE);

-- Designers can read their own applications
CREATE POLICY "applications_select_own" ON opportunity_applications
  FOR SELECT TO authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

-- Designers can create their own applications
CREATE POLICY "applications_insert_own" ON opportunity_applications
  FOR INSERT TO authenticated
  WITH CHECK (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

-- Designers can update their own applications
CREATE POLICY "applications_update_own" ON opportunity_applications
  FOR UPDATE TO authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

-- Designers can delete their own applications
CREATE POLICY "applications_delete_own" ON opportunity_applications
  FOR DELETE TO authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

-- Admin can manage all applications
CREATE POLICY "applications_manage_admin" ON opportunity_applications
  FOR ALL TO authenticated
  USING (TRUE);

-- Designers can read their own saved opportunities
CREATE POLICY "saved_select_own" ON saved_opportunities
  FOR SELECT TO authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

-- Designers can save opportunities
CREATE POLICY "saved_insert_own" ON saved_opportunities
  FOR INSERT TO authenticated
  WITH CHECK (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

-- Designers can unsave opportunities
CREATE POLICY "saved_delete_own" ON saved_opportunities
  FOR DELETE TO authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

-- Public read for categories
CREATE POLICY "categories_select_public" ON opportunity_categories
  FOR SELECT TO anon, authenticated
  USING (TRUE);

-- Admin can manage categories
CREATE POLICY "categories_manage_admin" ON opportunity_categories
  FOR ALL TO authenticated
  USING (TRUE);

-- Insert default categories
INSERT INTO opportunity_categories (name, slug, description, display_order) VALUES
  ('Jobs', 'jobs', 'Full-time and part-time positions', 1),
  ('Internships', 'internships', 'Learning opportunities for emerging designers', 2),
  ('Competitions', 'competitions', 'Design competitions and awards', 3),
  ('Grants', 'grants', 'Funding and financial support', 4),
  ('Open Calls', 'open-calls', 'Calls for submissions and participation', 5),
  ('Fashion Events', 'fashion-events', 'Fashion weeks, exhibitions, and shows', 6)
ON CONFLICT (slug) DO NOTHING;

-- Migrate existing events data (if any)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'designer_events') THEN
    IF EXISTS (SELECT 1 FROM designer_events LIMIT 1) THEN
      INSERT INTO opportunities (
        title, slug, description, opportunity_type, start_date, end_date,
        application_deadline, location, city, cover_image_url, banner_image_url,
        status, is_open_for_applications, requirements, benefits, max_participants,
        created_at, updated_at
      )
      SELECT
        title, slug, description, 'fashion_event' as opportunity_type,
        start_date, end_date, application_deadline, location, city,
        cover_image_url, banner_image_url,
        CASE WHEN status = 'upcoming' THEN 'published' ELSE status END as status,
        is_open_for_applications, requirements, benefits, max_participants,
        created_at, updated_at
      FROM designer_events
      ON CONFLICT (slug) DO NOTHING;
    END IF;
  END IF;
END $$;
