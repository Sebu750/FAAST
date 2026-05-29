-- Fix Contact Form - Create missing tables
-- Run this in Supabase SQL Editor

-- Create contact_inquiries table if it doesn't exist
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create newsletter_subscriptions table if it doesn't exist
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public insert on contact_inquiries" ON contact_inquiries;
DROP POLICY IF EXISTS "Allow public insert on newsletter_subscriptions" ON newsletter_subscriptions;
DROP POLICY IF EXISTS "Allow authenticated select on contact_inquiries" ON contact_inquiries;
DROP POLICY IF EXISTS "Allow authenticated select on newsletter_subscriptions" ON newsletter_subscriptions;

-- Create policies
CREATE POLICY "Allow public insert on contact_inquiries"
  ON contact_inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow public insert on newsletter_subscriptions"
  ON newsletter_subscriptions FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated select on contact_inquiries"
  ON contact_inquiries FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated select on newsletter_subscriptions"
  ON newsletter_subscriptions FOR SELECT TO authenticated USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_created_at ON newsletter_subscriptions(created_at DESC);

-- Enable realtime
ALTER TABLE contact_inquiries REPLICA IDENTITY FULL;
ALTER TABLE newsletter_subscriptions REPLICA IDENTITY FULL;
