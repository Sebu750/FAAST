-- ==========================================
-- ADD STATUS COLUMN TO DESIGNERS TABLE
-- ==========================================
-- Run this in Supabase SQL Editor to add
-- the status column for draft/pending/published workflow
-- ==========================================

ALTER TABLE designers ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft';

-- Set existing rows to 'draft' if they don't have a status
UPDATE designers SET status = 'draft' WHERE status IS NULL;
