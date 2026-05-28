-- FAAST Database Setup Script
-- Run this in your Supabase SQL Editor

-- 1. Newsletter Subscriptions Table
CREATE TABLE newsletter_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Contact Inquiries Table
CREATE TABLE contact_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Partnership Inquiries Table
CREATE TABLE partnership_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Spotlight Applications Table
CREATE TABLE spotlight_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  brand_name VARCHAR(255) NOT NULL,
  portfolio_url VARCHAR(500),
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnership_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE spotlight_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (insert only)
CREATE POLICY "Allow public insert on newsletter_subscriptions"
  ON newsletter_subscriptions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public insert on contact_inquiries"
  ON contact_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public insert on partnership_inquiries"
  ON partnership_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public insert on spotlight_applications"
  ON spotlight_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policies for authenticated admin access (select all)
CREATE POLICY "Allow authenticated select on newsletter_subscriptions"
  ON newsletter_subscriptions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated select on contact_inquiries"
  ON contact_inquiries
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated select on partnership_inquiries"
  ON partnership_inquiries
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated select on spotlight_applications"
  ON spotlight_applications
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX idx_newsletter_created_at ON newsletter_subscriptions(created_at DESC);
CREATE INDEX idx_contact_created_at ON contact_inquiries(created_at DESC);
CREATE INDEX idx_partnership_created_at ON partnership_inquiries(created_at DESC);
CREATE INDEX idx_spotlight_created_at ON spotlight_applications(created_at DESC);
