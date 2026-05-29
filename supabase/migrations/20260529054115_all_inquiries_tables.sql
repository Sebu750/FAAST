-- Complete Database Migration for All Inquiry Types
-- Run this in your Supabase SQL Editor

-- ==========================================
-- 1. MARKETPLACE SELLER APPLICATIONS
-- ==========================================
DROP TABLE IF EXISTS marketplace_applications CASCADE;

CREATE TABLE marketplace_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Business Information
  brand_name VARCHAR(255) NOT NULL,
  founder_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  website VARCHAR(500),
  
  -- Product Details
  product_category VARCHAR(100) NOT NULL, -- fashion, accessories, textiles, home decor, other
  product_description TEXT NOT NULL,
  price_range VARCHAR(50), -- budget, mid-range, premium, luxury
  years_in_business VARCHAR(50),
  
  -- Marketplace Specific
  product_images TEXT[], -- Array of image URLs
  instagram_handle VARCHAR(255),
  unique_selling_proposition TEXT NOT NULL,
  target_customer TEXT NOT NULL,
  
  -- Status & Metadata
  status VARCHAR(50) DEFAULT 'pending', -- pending, under_review, approved, rejected, active
  admin_notes TEXT,
  internal_comments TEXT,
  approved_at TIMESTAMP WITH TIME ZONE,
  rejected_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 2. STUDIO MEMBERSHIP APPLICATIONS
-- ==========================================
DROP TABLE IF EXISTS studio_applications CASCADE;

CREATE TABLE studio_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Personal Information
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  age INTEGER NOT NULL,
  
  -- Creative Background
  discipline VARCHAR(100) NOT NULL, -- fashion design, textile design, accessories, photography, other
  years_experience VARCHAR(50) NOT NULL,
  portfolio_url VARCHAR(500),
  
  -- Studio Membership
  membership_type VARCHAR(50) NOT NULL, -- part_time, full_time, project_based
  start_date DATE,
  expected_duration VARCHAR(50),
  equipment_needed TEXT,
  project_description TEXT NOT NULL,
  
  -- Additional
  instagram_handle VARCHAR(255),
  why_studio TEXT NOT NULL,
  previous_studio_experience BOOLEAN DEFAULT FALSE,
  
  -- Status & Metadata
  status VARCHAR(50) DEFAULT 'pending', -- pending, under_review, approved, rejected, active_member
  admin_notes TEXT,
  internal_comments TEXT,
  approved_at TIMESTAMP WITH TIME ZONE,
  rejected_at TIMESTAMP WITH TIME ZONE,
  membership_start_date TIMESTAMP WITH TIME ZONE,
  membership_end_date TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 3. HERITAGE CRAFT PROGRAM APPLICATIONS
-- ==========================================
DROP TABLE IF EXISTS heritage_applications CASCADE;

CREATE TABLE heritage_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Artisan Information
  artisan_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  community_name VARCHAR(255),
  
  -- Craft Details
  craft_type VARCHAR(100) NOT NULL, -- embroidery, weaving, block printing, pottery, jewelry, other
  craft_tradition VARCHAR(255) NOT NULL,
  years_practicing VARCHAR(50) NOT NULL,
  learned_from VARCHAR(255), -- family, formal training, self-taught
  certification BOOLEAN DEFAULT FALSE,
  
  -- Program Specific
  current_production_capacity VARCHAR(50),
  products_offered TEXT NOT NULL,
  previous_collaborations TEXT,
  interest_in_modern_design BOOLEAN DEFAULT FALSE,
  willing_to_train BOOLEAN DEFAULT FALSE,
  portfolio_images TEXT[],
  
  -- Heritage Preservation
  preservation_efforts TEXT,
  innovation_examples TEXT,
  community_impact TEXT,
  
  -- Status & Metadata
  status VARCHAR(50) DEFAULT 'pending', -- pending, under_review, accepted, rejected, active_artisan
  admin_notes TEXT,
  internal_comments TEXT,
  accepted_at TIMESTAMP WITH TIME ZONE,
  partnership_level VARCHAR(50), -- starter, growing, established
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 4. INVESTOR DECK REQUESTS
-- ==========================================
DROP TABLE IF EXISTS investor_deck_requests CASCADE;

CREATE TABLE investor_deck_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Contact Information
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  organization VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL, -- investor, partner, media, other
  phone VARCHAR(50),
  
  -- Investment Interest
  investment_focus VARCHAR(100) NOT NULL, -- fashion tech, heritage craft, marketplace, studio, general
  investment_range VARCHAR(50), -- seed, series_a, series_b, strategic
  geographic_interest VARCHAR(255),
  
  -- Request Details
  requested_documents TEXT[], -- deck, financials, roadmap, team, other
  additional_info TEXT,
  how_heard VARCHAR(100),
  
  -- Follow-up
  deck_sent BOOLEAN DEFAULT FALSE,
  deck_sent_at TIMESTAMP WITH TIME ZONE,
  meeting_scheduled BOOLEAN DEFAULT FALSE,
  meeting_date TIMESTAMP WITH TIME ZONE,
  follow_up_status VARCHAR(50), -- not_contacted, contacted, interested, not_interested
  
  -- Status & Metadata
  status VARCHAR(50) DEFAULT 'pending', -- pending, sent, in_discussion, closed
  admin_notes TEXT,
  internal_comments TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 5. PRESS INQUIRIES
-- ==========================================
DROP TABLE IF EXISTS press_inquiries CASCADE;

CREATE TABLE press_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Journalist Information
  journalist_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  publication VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL, -- journalist, editor, blogger, influencer, other
  phone VARCHAR(50),
  
  -- Inquiry Details
  article_type VARCHAR(100) NOT NULL, -- feature, interview, review, news, opinion
  topic VARCHAR(255) NOT NULL,
  deadline DATE,
  publication_date DATE,
  
  -- Requirements
  interview_type VARCHAR(50), -- in_person, phone, video_call, email
  spokesperson_requested VARCHAR(255), -- founder, designer, artisan, team_member
  images_requested BOOLEAN DEFAULT FALSE,
  additional_requirements TEXT,
  
  -- Press Kit
  press_kit_sent BOOLEAN DEFAULT FALSE,
  press_kit_sent_at TIMESTAMP WITH TIME ZONE,
  interview_scheduled BOOLEAN DEFAULT FALSE,
  interview_date TIMESTAMP WITH TIME ZONE,
  
  -- Status & Metadata
  status VARCHAR(50) DEFAULT 'pending', -- pending, in_progress, published, declined
  published_url VARCHAR(500),
  admin_notes TEXT,
  internal_comments TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- ENABLE ROW LEVEL SECURITY
-- ==========================================
ALTER TABLE marketplace_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE studio_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE heritage_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE investor_deck_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE press_inquiries ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- PUBLIC INSERT POLICIES
-- ==========================================
CREATE POLICY "Allow public insert on marketplace_applications"
  ON marketplace_applications FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow public insert on studio_applications"
  ON studio_applications FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow public insert on heritage_applications"
  ON heritage_applications FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow public insert on investor_deck_requests"
  ON investor_deck_requests FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow public insert on press_inquiries"
  ON press_inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);

-- ==========================================
-- AUTHENTICATED ADMIN POLICIES
-- ==========================================
-- Marketplace
CREATE POLICY "Allow authenticated select on marketplace_applications"
  ON marketplace_applications FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated update on marketplace_applications"
  ON marketplace_applications FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on marketplace_applications"
  ON marketplace_applications FOR DELETE TO authenticated USING (true);

-- Studio
CREATE POLICY "Allow authenticated select on studio_applications"
  ON studio_applications FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated update on studio_applications"
  ON studio_applications FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on studio_applications"
  ON studio_applications FOR DELETE TO authenticated USING (true);

-- Heritage
CREATE POLICY "Allow authenticated select on heritage_applications"
  ON heritage_applications FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated update on heritage_applications"
  ON heritage_applications FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on heritage_applications"
  ON heritage_applications FOR DELETE TO authenticated USING (true);

-- Investor Deck
CREATE POLICY "Allow authenticated select on investor_deck_requests"
  ON investor_deck_requests FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated update on investor_deck_requests"
  ON investor_deck_requests FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on investor_deck_requests"
  ON investor_deck_requests FOR DELETE TO authenticated USING (true);

-- Press
CREATE POLICY "Allow authenticated select on press_inquiries"
  ON press_inquiries FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated update on press_inquiries"
  ON press_inquiries FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on press_inquiries"
  ON press_inquiries FOR DELETE TO authenticated USING (true);

-- ==========================================
-- CREATE INDEXES
-- ==========================================
-- Marketplace
CREATE INDEX idx_marketplace_status ON marketplace_applications(status);
CREATE INDEX idx_marketplace_created_at ON marketplace_applications(created_at DESC);
CREATE INDEX idx_marketplace_category ON marketplace_applications(product_category);

-- Studio
CREATE INDEX idx_studio_status ON studio_applications(status);
CREATE INDEX idx_studio_created_at ON studio_applications(created_at DESC);
CREATE INDEX idx_studio_discipline ON studio_applications(discipline);
CREATE INDEX idx_studio_membership_type ON studio_applications(membership_type);

-- Heritage
CREATE INDEX idx_heritage_status ON heritage_applications(status);
CREATE INDEX idx_heritage_created_at ON heritage_applications(created_at DESC);
CREATE INDEX idx_heritage_craft_type ON heritage_applications(craft_type);

-- Investor Deck
CREATE INDEX idx_investor_status ON investor_deck_requests(status);
CREATE INDEX idx_investor_created_at ON investor_deck_requests(created_at DESC);
CREATE INDEX idx_investor_focus ON investor_deck_requests(investment_focus);

-- Press
CREATE INDEX idx_press_status ON press_inquiries(status);
CREATE INDEX idx_press_created_at ON press_inquiries(created_at DESC);
CREATE INDEX idx_press_article_type ON press_inquiries(article_type);

-- ==========================================
-- AUTO-UPDATE TRIGGERS
-- ==========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_marketplace_updated_at BEFORE UPDATE ON marketplace_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_studio_updated_at BEFORE UPDATE ON studio_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_heritage_updated_at BEFORE UPDATE ON heritage_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_investor_updated_at BEFORE UPDATE ON investor_deck_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_press_updated_at BEFORE UPDATE ON press_inquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- ENABLE REALTIME
-- ==========================================
ALTER TABLE marketplace_applications REPLICA IDENTITY FULL;
ALTER TABLE studio_applications REPLICA IDENTITY FULL;
ALTER TABLE heritage_applications REPLICA IDENTITY FULL;
ALTER TABLE investor_deck_requests REPLICA IDENTITY FULL;
ALTER TABLE press_inquiries REPLICA IDENTITY FULL;

ALTER PUBLICATION supabase_realtime ADD TABLE marketplace_applications;
ALTER PUBLICATION supabase_realtime ADD TABLE studio_applications;
ALTER PUBLICATION supabase_realtime ADD TABLE heritage_applications;
ALTER PUBLICATION supabase_realtime ADD TABLE investor_deck_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE press_inquiries;
