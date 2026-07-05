-- ============================================
-- FIX: ADMIN BYPASS FOR DESIGNER RLS POLICIES
-- Allows admins to update all designer profiles
-- ============================================

-- ============================================
-- 1. HELPER FUNCTION: CHECK IF USER IS ADMIN
-- ============================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  user_email TEXT;
  is_admin BOOLEAN := FALSE;
BEGIN
  -- Get the current user's email
  SELECT email INTO user_email
  FROM auth.users
  WHERE id = auth.uid();

  -- Check if user email is in admin list
  -- Add your admin emails here
  IF user_email IS NOT NULL THEN
    is_admin := (
      user_email = 'admin@adorzia.com'
      OR user_email = 'haseeb.49251@gmail.com'
      OR user_email LIKE '%@adorzia.com'
      OR EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE email = user_email AND is_active = TRUE
      )
    );
  END IF;

  RETURN is_admin;
EXCEPTION
  WHEN OTHERS THEN
    RETURN FALSE;
END;
$$;

-- ============================================
-- 2. CREATE ADMIN USERS TABLE (IF NOT EXISTS)
-- ============================================

CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on admin_users table
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Only admins can see admin_users
DROP POLICY IF EXISTS "admin_users_select_admin" ON public.admin_users;
CREATE POLICY "admin_users_select_admin" ON public.admin_users
  FOR SELECT TO authenticated
  USING (public.is_admin());

-- ============================================
-- 3. DESIGNERS TABLE - ADMIN POLICIES
-- ============================================

-- Admin can select all designers
DROP POLICY IF EXISTS "designers_select_admin" ON designers;
CREATE POLICY "designers_select_admin" ON designers
  FOR SELECT TO authenticated
  USING (public.is_admin());

-- Admin can insert any designer
DROP POLICY IF EXISTS "designers_insert_admin" ON designers;
CREATE POLICY "designers_insert_admin" ON designers
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

-- Admin can update any designer
DROP POLICY IF EXISTS "designers_update_admin" ON designers;
CREATE POLICY "designers_update_admin" ON designers
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Admin can delete any designer
DROP POLICY IF EXISTS "designers_delete_admin" ON designers;
CREATE POLICY "designers_delete_admin" ON designers
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- ============================================
-- 4. COLLECTIONS TABLE - ADMIN POLICIES
-- ============================================

DROP POLICY IF EXISTS "collections_select_admin" ON designer_collections;
CREATE POLICY "collections_select_admin" ON designer_collections
  FOR SELECT TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "collections_insert_admin" ON designer_collections;
CREATE POLICY "collections_insert_admin" ON designer_collections
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "collections_update_admin" ON designer_collections;
CREATE POLICY "collections_update_admin" ON designer_collections
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "collections_delete_admin" ON designer_collections;
CREATE POLICY "collections_delete_admin" ON designer_collections
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- ============================================
-- 5. EDUCATION TABLE - ADMIN POLICIES
-- ============================================

DROP POLICY IF EXISTS "education_select_admin" ON designer_education;
CREATE POLICY "education_select_admin" ON designer_education
  FOR SELECT TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "education_insert_admin" ON designer_education;
CREATE POLICY "education_insert_admin" ON designer_education
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "education_update_admin" ON designer_education;
CREATE POLICY "education_update_admin" ON designer_education
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "education_delete_admin" ON designer_education;
CREATE POLICY "education_delete_admin" ON designer_education
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- ============================================
-- 6. ACHIEVEMENTS TABLE - ADMIN POLICIES
-- ============================================

DROP POLICY IF EXISTS "achievements_select_admin" ON designer_achievements;
CREATE POLICY "achievements_select_admin" ON designer_achievements
  FOR SELECT TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "achievements_insert_admin" ON designer_achievements;
CREATE POLICY "achievements_insert_admin" ON designer_achievements
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "achievements_update_admin" ON designer_achievements;
CREATE POLICY "achievements_update_admin" ON designer_achievements
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "achievements_delete_admin" ON designer_achievements;
CREATE POLICY "achievements_delete_admin" ON designer_achievements
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- ============================================
-- 7. SKILLS TABLE - ADMIN POLICIES
-- ============================================

DROP POLICY IF EXISTS "skills_select_admin" ON designer_skills;
CREATE POLICY "skills_select_admin" ON designer_skills
  FOR SELECT TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "skills_insert_admin" ON designer_skills;
CREATE POLICY "skills_insert_admin" ON designer_skills
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "skills_update_admin" ON designer_skills;
CREATE POLICY "skills_update_admin" ON designer_skills
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "skills_delete_admin" ON designer_skills;
CREATE POLICY "skills_delete_admin" ON designer_skills
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- ============================================
-- 8. CERTIFICATIONS TABLE - ADMIN POLICIES
-- ============================================

DROP POLICY IF EXISTS "certifications_select_admin" ON designer_certifications;
CREATE POLICY "certifications_select_admin" ON designer_certifications
  FOR SELECT TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "certifications_insert_admin" ON designer_certifications;
CREATE POLICY "certifications_insert_admin" ON designer_certifications
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "certifications_update_admin" ON designer_certifications;
CREATE POLICY "certifications_update_admin" ON designer_certifications
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "certifications_delete_admin" ON designer_certifications;
CREATE POLICY "certifications_delete_admin" ON designer_certifications
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- ============================================
-- 9. SOCIAL LINKS TABLE - ADMIN POLICIES
-- ============================================

DROP POLICY IF EXISTS "social_links_select_admin" ON designer_social_links;
CREATE POLICY "social_links_select_admin" ON designer_social_links
  FOR SELECT TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "social_links_insert_admin" ON designer_social_links;
CREATE POLICY "social_links_insert_admin" ON designer_social_links
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "social_links_update_admin" ON designer_social_links;
CREATE POLICY "social_links_update_admin" ON designer_social_links
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "social_links_delete_admin" ON designer_social_links;
CREATE POLICY "social_links_delete_admin" ON designer_social_links
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- ============================================
-- 10. INSERT DEFAULT ADMIN (UPDATE EMAIL)
-- ============================================

-- IMPORTANT: Replace 'admin@adorzia.com' with your actual admin email
INSERT INTO public.admin_users (email, is_active)
VALUES ('admin@adorzia.com', TRUE)
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- END OF MIGRATION
-- ============================================
