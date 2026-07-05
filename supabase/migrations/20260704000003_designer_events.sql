-- ============================================
-- DESIGNER EVENTS SYSTEM
-- ============================================

-- Events table (managed by admin, visible to all designers)
CREATE TABLE IF NOT EXISTS designer_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  event_type TEXT DEFAULT 'fashion_week', -- fashion_week, exhibition, workshop, summit, marketplace, other
  location TEXT,
  city TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  application_deadline DATE,
  cover_image_url TEXT,
  banner_image_url TEXT,
  status TEXT DEFAULT 'upcoming', -- upcoming, ongoing, past
  is_open_for_applications BOOLEAN DEFAULT TRUE,
  max_participants INTEGER,
  requirements TEXT,
  benefits TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event registrations (designer <-> event relationship)
CREATE TABLE IF NOT EXISTS designer_event_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES designer_events(id) ON DELETE CASCADE,
  designer_id TEXT NOT NULL REFERENCES designers(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'registered', -- registered, confirmed, waitlisted, cancelled
  application_note TEXT,
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, designer_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_events_status ON designer_events(status);
CREATE INDEX IF NOT EXISTS idx_events_start_date ON designer_events(start_date);
CREATE INDEX IF NOT EXISTS idx_event_registrations_event ON designer_event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_designer ON designer_event_registrations(designer_id);

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_events_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER designer_events_updated_at BEFORE UPDATE ON designer_events
  FOR EACH ROW EXECUTE FUNCTION update_events_updated_at();

CREATE TRIGGER designer_event_registrations_updated_at BEFORE UPDATE ON designer_event_registrations
  FOR EACH ROW EXECUTE FUNCTION update_events_updated_at();

-- Enable RLS
ALTER TABLE designer_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE designer_event_registrations ENABLE ROW LEVEL SECURITY;

-- Public read for all events
CREATE POLICY "events_select_public" ON designer_events
  FOR SELECT TO anon, authenticated
  USING (TRUE);

-- Admin can manage events (using service role or authenticated)
CREATE POLICY "events_insert_admin" ON designer_events
  FOR INSERT TO authenticated
  WITH CHECK (TRUE);

CREATE POLICY "events_update_admin" ON designer_events
  FOR UPDATE TO authenticated
  USING (TRUE);

CREATE POLICY "events_delete_admin" ON designer_events
  FOR DELETE TO authenticated
  USING (TRUE);

-- Designers can read their own registrations
CREATE POLICY "registrations_select_own" ON designer_event_registrations
  FOR SELECT TO authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

-- Designers can create their own registrations
CREATE POLICY "registrations_insert_own" ON designer_event_registrations
  FOR INSERT TO authenticated
  WITH CHECK (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

-- Designers can update their own registrations
CREATE POLICY "registrations_update_own" ON designer_event_registrations
  FOR UPDATE TO authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

-- Designers can delete their own registrations
CREATE POLICY "registrations_delete_own" ON designer_event_registrations
  FOR DELETE TO authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));
