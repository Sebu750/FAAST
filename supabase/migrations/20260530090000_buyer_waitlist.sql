-- Create buyer_waitlist table for marketplace early access signups
CREATE TABLE IF NOT EXISTS buyer_waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  buyer_type TEXT NOT NULL,
  interest TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE buyer_waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public waitlist signup)
CREATE POLICY "Allow public insert to buyer_waitlist"
  ON buyer_waitlist
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Only allow service role to read (admin access only)
CREATE POLICY "Allow service role to read buyer_waitlist"
  ON buyer_waitlist
  FOR SELECT
  TO service_role
  USING (true);

-- Create index on email for duplicate checking
CREATE INDEX IF NOT EXISTS idx_buyer_waitlist_email ON buyer_waitlist(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_buyer_waitlist_created_at ON buyer_waitlist(created_at DESC);
