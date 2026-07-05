-- ============================================
-- CREATE DEFAULT ADMIN ACCOUNT
-- Email: admin@adorzia.com
-- Password: Adorzia@Admin2026! (change after first login)
-- ============================================

-- Step 1: Ensure admin_users table exists
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 2: Add admin to admin_users table (for RLS bypass)
INSERT INTO public.admin_users (email, is_active)
VALUES ('admin@adorzia.com', TRUE),
       ('haseeb.49251@gmail.com', TRUE)
ON CONFLICT (email) DO UPDATE SET is_active = TRUE;

-- Step 3: Verify the admin was added
SELECT * FROM public.admin_users;

-- ============================================
-- STEP 4: CREATE AUTH USER (REQUIRED!)
-- ============================================
-- The admin account MUST be created in Supabase Auth.
-- Choose ONE of these methods:

-- METHOD A: Via Supabase Dashboard (Easiest)
-- 1. Go to https://supabase.com/dashboard/project/YOUR_PROJECT/auth/users
-- 2. Click "Add User" → "Create New User"
-- 3. Enter:
--    Email: admin@adorzia.com
--    Password: Adorzia@Admin2026!
--    ✓ Check "Auto Confirm User"
-- 4. Click "Create User"

-- METHOD B: Via SQL (if you have service_role access)
-- Note: This requires calling the Auth API, not direct SQL

-- ============================================
-- STEP 5: VERIFY ADMIN ACCESS
-- ============================================
-- After creating the auth user, run these checks:

-- Check 1: Verify admin_users has the email
SELECT email, is_active FROM public.admin_users WHERE email = 'admin@adorzia.com';

-- Check 2: Test is_admin() function (must be logged in as admin)
SELECT public.is_admin() AS is_admin_result;

-- Check 3: List all auth users to confirm admin exists
-- SELECT id, email, created_at FROM auth.users;

-- ============================================
-- LOGIN CREDENTIALS
-- ============================================
-- URL: https://your-domain.com/admin/login
-- Email: admin@adorzia.com
-- Password: Adorzia@Admin2026!

-- ============================================
-- TROUBLESHOOTING
-- ============================================
-- If is_admin() returns false:
-- 1. Make sure you're logged in as admin@adorzia.com
-- 2. Check admin_users table has the email:
--    SELECT * FROM public.admin_users;
-- 3. Check auth.users has the user:
--    SELECT email FROM auth.users WHERE email = 'admin@adorzia.com';
-- 4. Try logging out and back in

-- SECURITY: Change password after first login!
