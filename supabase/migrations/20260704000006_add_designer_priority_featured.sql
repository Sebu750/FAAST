-- ============================================
-- ADD PRIORITY AND FEATURED TO DESIGNERS TABLE
-- ============================================

-- Add priority column (lower numbers appear first)
ALTER TABLE public.designers
ADD COLUMN IF NOT EXISTS priority INTEGER DEFAULT 0;

-- Add is_featured column (max 6 featured designers)
ALTER TABLE public.designers
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;

-- Create index for priority sorting
CREATE INDEX IF NOT EXISTS idx_designers_priority ON public.designers(priority ASC NULLS LAST);

-- Create index for featured designers
CREATE INDEX IF NOT EXISTS idx_designers_featured ON public.designers(is_featured, priority ASC NULLS LAST)
WHERE is_featured = TRUE;

-- ============================================
-- FUNCTION: CHECK FEATURED LIMIT
-- ============================================

CREATE OR REPLACE FUNCTION public.check_featured_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  featured_count INTEGER;
BEGIN
  -- Only check when is_featured is being set to TRUE
  IF NEW.is_featured = TRUE THEN
    -- Count existing featured designers (excluding current if updating)
    SELECT COUNT(*) INTO featured_count
    FROM public.designers
    WHERE is_featured = TRUE
    AND (TG_OP = 'INSERT' OR id != NEW.id);

    -- Check if limit exceeded
    IF featured_count >= 6 THEN
      RAISE EXCEPTION 'Featured slots are full. Please unfeature an existing designer before adding a new one.';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- Create trigger for featured limit enforcement
DROP TRIGGER IF EXISTS trg_check_featured_limit ON public.designers;
CREATE TRIGGER trg_check_featured_limit
  BEFORE INSERT OR UPDATE ON public.designers
  FOR EACH ROW
  EXECUTE FUNCTION public.check_featured_limit();

-- ============================================
-- UPDATE EXISTING RLS POLICIES
-- ============================================

-- Ensure priority and is_featured are included in update policies
-- (Already covered by existing admin policies)

-- ============================================
-- SET DEFAULT PRIORITY FOR EXISTING DESIGNERS
-- ============================================

-- Set priority based on created_at order for existing designers
UPDATE public.designers
SET priority = subquery.row_num
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) as row_num
  FROM public.designers
) AS subquery
WHERE public.designers.id = subquery.id
AND public.designers.priority = 0;
