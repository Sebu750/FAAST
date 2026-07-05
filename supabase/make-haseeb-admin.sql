-- Make haseeb.49251@gmail.com an admin
-- Run this in Supabase SQL Editor

-- Step 1: Add to admin_users table
INSERT INTO public.admin_users (email, is_active)
VALUES ('haseeb.49251@gmail.com', TRUE)
ON CONFLICT (email) DO UPDATE SET is_active = TRUE;

-- Step 2: Verify
SELECT * FROM public.admin_users WHERE email = 'haseeb.49251@gmail.com';

-- Step 3: After logging in, test admin access
-- SELECT public.is_admin();  -- Should return true
