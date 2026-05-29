-- Spotlight Applications Database Migration
-- Run this in your Supabase SQL Editor to create the spotlight_applications table

-- Drop existing table if it exists (this will delete existing data)
DROP TABLE IF EXISTS spotlight_applications CASCADE;

-- Create spotlight_applications table with all form fields
CREATE TABLE spotlight_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Personal Information
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  age INTEGER NOT NULL,
  hear_about VARCHAR(100) NOT NULL, -- Instagram, word of mouth, Adorzia website, press coverage, a friend or mentor, other
  
  -- Creative Background
  discipline VARCHAR(100) NOT NULL, -- fashion design, textile and heritage craft, fashion entrepreneurship, accessories design, mixed or interdisciplinary, other
  years_experience VARCHAR(50) NOT NULL, -- less than one year, one to three years, three to five years, five or more years
  formal_education VARCHAR(50) NOT NULL, -- yes, no, currently studying
  institution_name VARCHAR(255), -- optional
  
  -- Your Work
  creative_practice TEXT NOT NULL, -- minimum 100 words
  portfolio_url VARCHAR(500), -- optional
  images TEXT[], -- Array of image URLs (up to 8 images, JPG or PNG, max 5MB each)
  
  -- Your Vision
  vision_description TEXT NOT NULL, -- minimum 150 words
  biggest_obstacle TEXT NOT NULL,
  why_now TEXT NOT NULL,
  
  -- Heritage and Identity (optional section)
  heritage_craft VARCHAR(50), -- yes, no
  heritage_description TEXT, -- optional
  
  -- Final Question (optional)
  additional_info TEXT,
  
  -- Declaration (all checkboxes required)
  declaration_original_work BOOLEAN NOT NULL DEFAULT FALSE,
  declaration_pakistan_age BOOLEAN NOT NULL DEFAULT FALSE,
  declaration_presentations BOOLEAN NOT NULL DEFAULT FALSE,
  declaration_terms BOOLEAN NOT NULL DEFAULT FALSE,
  
  -- Metadata
  status VARCHAR(50) DEFAULT 'pending', -- pending, under_review, shortlisted, rejected, finalist, winner
  admin_notes TEXT,
  internal_comments TEXT,
  
  -- Shortlist & Finalist Tracking
  shortlisted_at TIMESTAMP WITH TIME ZONE,
  finalist_at TIMESTAMP WITH TIME ZONE,
  presentation_scheduled BOOLEAN DEFAULT FALSE,
  presentation_scheduled_date TIMESTAMP WITH TIME ZONE,
  presentation_confirmed BOOLEAN DEFAULT FALSE,
  presentation_completed BOOLEAN DEFAULT FALSE,
  
  -- Winner Tracking
  winner_at TIMESTAMP WITH TIME ZONE,
  investment_amount DECIMAL(10, 2),
  investment_details TEXT,
  partnership_status VARCHAR(50), -- not_started, in_progress, completed
  brand_building_progress TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE spotlight_applications ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert (anyone can submit an application)
CREATE POLICY "Allow public insert on spotlight_applications"
  ON spotlight_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy for authenticated admin access (select, update, delete)
CREATE POLICY "Allow authenticated select on spotlight_applications"
  ON spotlight_applications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated update on spotlight_applications"
  ON spotlight_applications
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on spotlight_applications"
  ON spotlight_applications
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX idx_spotlight_email ON spotlight_applications(email);
CREATE INDEX idx_spotlight_status ON spotlight_applications(status);
CREATE INDEX idx_spotlight_created_at ON spotlight_applications(created_at DESC);
CREATE INDEX idx_spotlight_discipline ON spotlight_applications(discipline);
CREATE INDEX idx_spotlight_location ON spotlight_applications(location);
CREATE INDEX idx_spotlight_age ON spotlight_applications(age);
CREATE INDEX idx_spotlight_city ON spotlight_applications(location);
CREATE INDEX idx_spotlight_shortlisted ON spotlight_applications(shortlisted_at DESC) WHERE shortlisted_at IS NOT NULL;
CREATE INDEX idx_spotlight_finalist ON spotlight_applications(finalist_at DESC) WHERE finalist_at IS NOT NULL;
CREATE INDEX idx_spotlight_winner ON spotlight_applications(winner_at DESC) WHERE winner_at IS NOT NULL;

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_spotlight_applications_updated_at
  BEFORE UPDATE ON spotlight_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create view for admin dashboard (summary view)
CREATE OR REPLACE VIEW spotlight_applications_admin AS
SELECT 
  id,
  name,
  email,
  phone,
  location,
  age,
  discipline,
  years_experience,
  formal_education,
  portfolio_url,
  status,
  admin_notes,
  created_at,
  updated_at,
  shortlisted_at,
  finalist_at,
  winner_at,
  partnership_status
FROM spotlight_applications
ORDER BY created_at DESC;

-- Note: Views inherit RLS policies from the underlying table
-- No additional policy needed for the view

-- Enable realtime for spotlight_applications table
ALTER TABLE spotlight_applications REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE spotlight_applications;
