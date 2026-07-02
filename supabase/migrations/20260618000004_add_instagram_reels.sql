-- Add instagram_reels column to designers table
ALTER TABLE designers ADD COLUMN IF NOT EXISTS instagram_reels TEXT[];

-- Add RLS policy for instagram_reels (same as other columns)
-- No additional policy needed as it uses the same table permissions
