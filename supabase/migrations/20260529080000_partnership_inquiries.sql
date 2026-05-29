-- Partnership Inquiries Database Migration
-- Run this in your Supabase SQL Editor

DROP TABLE IF EXISTS partnership_inquiries CASCADE;

CREATE TABLE partnership_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Contact Information
  contact_name VARCHAR(255) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT NOT NULL,
  
  -- Status tracking
  status VARCHAR(50) DEFAULT 'pending', -- pending, contacted, in_discussion, declined, partnered
  admin_notes TEXT,
  internal_comments TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE partnership_inquiries ENABLE ROW LEVEL SECURITY;

-- Public INSERT policy
CREATE POLICY "Allow public insert on partnership_inquiries"
  ON partnership_inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Authenticated admin policies
CREATE POLICY "Allow authenticated select on partnership_inquiries"
  ON partnership_inquiries FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated update on partnership_inquiries"
  ON partnership_inquiries FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on partnership_inquiries"
  ON partnership_inquiries FOR DELETE TO authenticated USING (true);

-- Create indexes
CREATE INDEX idx_partnership_inquiries_email ON partnership_inquiries(email);
CREATE INDEX idx_partnership_inquiries_status ON partnership_inquiries(status);
CREATE INDEX idx_partnership_inquiries_created_at ON partnership_inquiries(created_at DESC);
CREATE INDEX idx_partnership_inquiries_company ON partnership_inquiries(company_name);

-- Auto-update trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_partnership_inquiries_updated_at
  BEFORE UPDATE ON partnership_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable realtime
ALTER TABLE partnership_inquiries REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE partnership_inquiries;
