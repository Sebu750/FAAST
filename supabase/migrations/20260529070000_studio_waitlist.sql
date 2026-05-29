-- Studio Waitlist Database Migration
-- Run this in your Supabase SQL Editor

DROP TABLE IF EXISTS studio_waitlist CASCADE;

CREATE TABLE studio_waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Personal Information
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50) NOT NULL,
  
  -- Location Preference
  preferred_city VARCHAR(100) NOT NULL, -- lahore, islamabad, karachi, other
  current_city VARCHAR(255) NOT NULL,
  
  -- Creative Background
  discipline VARCHAR(100) NOT NULL, -- fashion design, textile design, accessories, photography, other
  years_experience VARCHAR(50) NOT NULL, -- less than 1 year, 1-3 years, 3-5 years, 5+ years
  
  -- Membership Interest
  membership_type VARCHAR(50) NOT NULL, -- part_time, full_time, project_based
  intended_start_date VARCHAR(50), -- immediately, within 3 months, 3-6 months, 6+ months
  
  -- Additional Information
  portfolio_url VARCHAR(500),
  instagram_handle VARCHAR(255),
  why_studio TEXT NOT NULL,
  current_workspace VARCHAR(100), -- home studio, shared space, no workspace, other
  
  -- Metadata
  status VARCHAR(50) DEFAULT 'waiting', -- waiting, contacted, tour_scheduled, enrolled, declined
  admin_notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE studio_waitlist ENABLE ROW LEVEL SECURITY;

-- Public INSERT policy
CREATE POLICY "Allow public insert on studio_waitlist"
  ON studio_waitlist FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Authenticated admin policies
CREATE POLICY "Allow authenticated select on studio_waitlist"
  ON studio_waitlist FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated update on studio_waitlist"
  ON studio_waitlist FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on studio_waitlist"
  ON studio_waitlist FOR DELETE TO authenticated USING (true);

-- Create indexes
CREATE INDEX idx_studio_waitlist_email ON studio_waitlist(email);
CREATE INDEX idx_studio_waitlist_city ON studio_waitlist(preferred_city);
CREATE INDEX idx_studio_waitlist_status ON studio_waitlist(status);
CREATE INDEX idx_studio_waitlist_created_at ON studio_waitlist(created_at DESC);
CREATE INDEX idx_studio_waitlist_discipline ON studio_waitlist(discipline);

-- Auto-update trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_studio_waitlist_updated_at
  BEFORE UPDATE ON studio_waitlist
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable realtime
ALTER TABLE studio_waitlist REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE studio_waitlist;
